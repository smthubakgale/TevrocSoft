import JSZip from 'jszip';
import { parseStringPromise } from 'xml2js';

/**
 * Convert DOCX Base64 to HTML with styles, nested lists, tables, images, formatting
 * @param {string} base64Docx - DOCX file as Base64 string
 * @returns {Promise<string>} - HTML string
 */
async function docxToHtml(base64Docx) {
    const binary = Uint8Array.from(atob(base64Docx), c => c.charCodeAt(0));
    const zip = await JSZip.loadAsync(binary);

    const docXml = await zip.file('word/document.xml').async('text');
    const parsedXml = await parseStringPromise(docXml, { explicitArray: false });
    const body = parsedXml['w:document']['w:body'];

    // Map image relationships
    let relsMap = {};
    const relsFile = zip.file('word/_rels/document.xml.rels');
    if (relsFile) {
        const relsXml = await relsFile.async('text');
        const relsParsed = await parseStringPromise(relsXml, { explicitArray: false });
        const rels = relsParsed.Relationships.Relationship;
        (Array.isArray(rels) ? rels : [rels]).forEach(r => {
            relsMap[r['$'].Id] = r['$'].Target;
        });
    }

    function getText(run) {
        if (!run) return '';
        if (!Array.isArray(run)) run = [run];

        return run.map(r => {
            let text = '';
            if (r['w:t']) text = r['w:t'];
            if (r['w:br']) text += '<br>';

            let styles = '';

            if (r['w:rPr']) {
                const props = r['w:rPr'];
                if (props['w:b']) text = `<b>${text}</b>`;
                if (props['w:i']) text = `<i>${text}</i>`;
                if (props['w:u']) text = `<u>${text}</u>`;

                if (props['w:color']?.['$']?.['w:val']) {
                    styles += `color:#${props['w:color']['$']['w:val']};`;
                }
                if (props['w:sz']?.['$']?.['w:val']) {
                    const sizePt = parseInt(props['w:sz']['$']['w:val'], 10) / 2;
                    styles += `font-size:${sizePt}pt;`;
                }
                if (props['w:highlight']?.['$']?.['w:val']) {
                    styles += `background-color:${props['w:highlight']['$']['w:val']};`;
                }
            }

            if (r['w:hyperlink'] && r['w:hyperlink']['w:r']) {
                const linkText = getText(r['w:hyperlink']['w:r']);
                const href = r['w:hyperlink']['$']?.['r:id'] || '#';
                text = `<a href="${href}" style="${styles}">${linkText}</a>`;
            } else if (styles) {
                text = `<span style="${styles}">${text}</span>`;
            }

            return text;
        }).join('');
    }

    async function parseDrawing(drawing) {
        const blip = drawing['a:blip']?.['$']?.['r:embed'];
        if (!blip) return '';
        const imgPath = relsMap[blip];
        if (!imgPath) return '';

        const imgFile = zip.file(`word/${imgPath}`);
        if (!imgFile) return '';

        const imgData = await imgFile.async('base64');
        const ext = imgPath.split('.').pop();
        return `<img src="data:image/${ext};base64,${imgData}" />`;
    }

    let listStack = [];

    async function parseParagraph(p) {
        let html = '';
        const runs = p['w:r'];
        if (runs) {
            if (Array.isArray(runs)) {
                for (const r of runs) {
                    if (r['w:drawing']) html += await parseDrawing(r['w:drawing']);
                    else html += getText([r]);
                }
            } else {
                const r = runs;
                if (r['w:drawing']) html += await parseDrawing(r['w:drawing']);
                else html += getText([r]);
            }
        }

        // Heading
        const pStyle = p['w:pPr']?.['w:pStyle']?.['$']?.['w:val'];
        if (pStyle && pStyle.startsWith('Heading')) {
            return `<h${pStyle.replace('Heading', '')}>${html}</h${pStyle.replace('Heading', '')}>`;
        }

        // Lists
        const numPr = p['w:pPr']?.['w:numPr'];
        if (numPr) {
            const numId = numPr['w:numId']?.['$']?.['w:val'] || '0';
            const ilvl = parseInt(numPr['w:ilvl']?.['$']?.['w:val'] || '0', 10);
            const isOrdered = parseInt(numId) % 2 === 0;

            while (listStack.length > ilvl) {
                const tag = listStack.pop();
                html = `</${tag}>${html}`;
            }

            if (listStack.length < ilvl + 1) {
                const tag = isOrdered ? 'ol' : 'ul';
                listStack.push(tag);
                html = `<${tag}>${html}`;
            }

            return `<li>${html}</li>`;
        } else {
            while (listStack.length) {
                const tag = listStack.pop();
                html = `</${tag}>${html}`;
            }
        }

        return `<p>${html}</p>`;
    }

    async function parseTable(tbl) {
        let html = '<table border="1">';
        const rows = tbl['w:tr'];
        if (!rows) return '';
        const rowArray = Array.isArray(rows) ? rows : [rows];
        for (const row of rowArray) {
            html += '<tr>';
            const cells = row['w:tc'];
            const cellArray = Array.isArray(cells) ? cells : [cells];
            for (const cell of cellArray) {
                const paras = cell['w:p'];
                let cellHtml = '';
                if (paras) {
                    if (Array.isArray(paras)) {
                        for (const p of paras) cellHtml += await parseParagraph(p);
                    } else {
                        cellHtml += await parseParagraph(paras);
                    }
                }
                html += `<td>${cellHtml}</td>`;
            }
            html += '</tr>';
        }
        html += '</table>';
        return html;
    }

    let html = '';
    const elements = [
        ...(body['w:tbl'] ? (Array.isArray(body['w:tbl']) ? body['w:tbl'] : [body['w:tbl']]) : []),
        ...(body['w:p'] ? (Array.isArray(body['w:p']) ? body['w:p'] : [body['w:p']]) : [])
    ];

    for (const el of elements) {
        if (el['w:tr'] || el['w:tc']) html += await parseTable(el);
        else html += await parseParagraph(el);
    }

    while (listStack.length) {
        const tag = listStack.pop();
        html += `</${tag}>`;
    }

    return html;
}

// Usage example:
// const html = await docxToHtml(base64Docx);
// console.log(html);
