
//------------------------------------: Bidge
function onReady(selector, eventName, callback) {
    selector = selector.trim();

    // Map to keep track of which elements already have the listener
    const addedElements = new WeakSet();

    // Support custom " parent" selector
    function resolveSelectorAll(sel) {
        if (sel.endsWith(" parent")) {
            const base = sel.replace(/ parent$/, "").trim();
            const el = document.querySelector(base);
            return el ? [el.parentNode] : [];
        }
        return Array.from(document.querySelectorAll(sel));
    }

    function addListeners(elements) {
        elements.forEach(el => {
            if (!addedElements.has(el)) {
                el.addEventListener(eventName, callback);
                addedElements.add(el);
            }
        });
    }

    // Try to resolve immediately
    let elements = resolveSelectorAll(selector);
    if (elements.length > 0) {
        addListeners(elements);
    }

    // Observe DOM for new elements
    const observer = new MutationObserver(() => {
        elements = resolveSelectorAll(selector);
        if (elements.length > 0) {
            addListeners(elements);
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
}
function onLoad(selector, callback) {
    selector = selector.trim();

    // Check if the element already exists
    const existing = document.querySelector(selector);
    if (existing) {
        callback(existing);
        return;
    }

    // Otherwise, observe the DOM for additions
    const observer = new MutationObserver((mutations, obs) => {
        const el = document.querySelector(selector);
        if (el) {
            callback(el);
            obs.disconnect(); // Stop observing once found
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
}
//------------------------------------: Shop 
 // Initialize EmailJS  

function sendEmail(_name, _message, _email, formStatus, form, _subject = "Missing Subject") {
  const url = 'https://tevrocsoft-api.vercel.app/send-email';

  // Prepare the JSON payload
  const payload = {
    name: _name,
    email: _email,
    subject: _subject,
    message: _message
  };

  console.log('Sending email with payload:', payload);

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Optionally include CORS headers for certain setups
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload),
    // Include credentials if your server expects them (cookies, auth)
    // credentials: 'include'
  })
  .then(response => response.text())
  .then(data => {
    console.log('Response:', data);
    formStatus.innerHTML = 'Message sent successfully!';
    form.reset();
  })
  .catch(error => {
    console.error('Email send failed:', error);
    formStatus.innerHTML = 'Error sending message. Please try again.';
  });
}

onReady('#quote-form' , 'submit', (e) => 
{  
     e.preventDefault();

	 var fm1 = document.getElementById("send-email-1").parentNode;

     var formStatus = document.getElementById("form-status-1");
     var name = fm1.querySelector('#name').value;
     var message = ` <h2> Project Type : ${ fm1.querySelector('#project-type2').value} </h2> 
`;       message += `Project Description :
`;       message += ` ${ CKEDITOR.instances.editor.getData() } `;
     
     var email = fm1.querySelector("#email").value;

     console.log(name , email , message , fm1 , formStatus);

      sendEmail(name , message , email , formStatus , fm1 , "Custome Quote Request");
});

onReady('#quote-form2','submit', (e) => 
{  
     e.preventDefault();

	 var fm2 = document.getElementById("send-email-2").parentNode;

     var formStatus = document.getElementById("form-status-2");
     var quote = document.getElementById("quote-amount-value").parentNode.parentNode;
     var phase = document.getElementById("project-phases");
     var plans = document.getElementById("payment-plans"); 
     var type = document.getElementById("project-type"); 
     var plan = document.getElementById("plan-select");  
     var comp = document.getElementById("complexity"); 
	
     var name = fm2.querySelector('#name2').value;
     var email = fm2.querySelector("#email2").value;

     var message = ` <h2> Advanced Project Quote : </h2> 
`;       message += `<h4><i> Client Details : </i></h4>
`;       message += ` Name : ${ name } <br/>
`;       message += ` Email Address : ${ email } <br/>
`;       message += `<h4><i> Project Type : </i></h4>
`;       message += ` ${ type.options[type.selectedIndex].innerHTML } 
`;       message += `<h4><i> Project Plan : </i></h4>
`;       message += ` ${ plan.value } 
`;       message += `<h4><i> Project Complexity : </i></h4>
`;       message += ` ${ comp.value } 
`;       message += `<h4><i> Project Description : </i></h4>
`;       message += ` ${ CKEDITOR.instances.editor2.getData() } 
`;       message += `<h4><i> Quote Result : </i></h4>
`;       message += ` ${ quote.innerHTML } 
`;       message += `<h4><i> Project Phases : </i></h4>
`;       message += ` ${ phase.innerHTML } 
`;       message += `<h4><i> Payment Plans : </i></h4>
`;       message += ` ${ plans.innerHTML }
`;
     
     console.log(name , email , message , fm2 , formStatus);

      sendEmail(name , message , email , formStatus , fm2 , "Custome Quote Request");
});

onReady('#get-quote', 'click', async (e) => {
    e.preventDefault();

    const fm2 = document.getElementById("send-email-2").parentNode;
    const clientName = fm2.querySelector('#name2').value;
    const clientEmail = fm2.querySelector("#email2").value;
    const type = document.getElementById("project-type").options[document.getElementById("project-type").selectedIndex].innerText;
    const plan = document.getElementById("plan-select").value;
    const comp = document.getElementById("complexity").value;
    const projectDesc = CKEDITOR.instances.editor2.getData();

    const companyName = "Tevroc Soft";
    const companyEmail = "smthubakgale@gmail.com";
    const companyPhone = "+27 66 253 1653";
    const companyAddress = "Mankweng, Polokwane, South Africa";

    // --- Extract totals ---
    const quoteAmount = parseFloat(document.getElementById('quote-amount-value').innerText.replace(/,/g, '')) || 0;
    const pagePrices = parseFloat(document.getElementById('page-prices').innerText.replace(/,/g, '')) || 0;
    const featurePrices = parseFloat(document.getElementById('feature-prices').innerText.replace(/,/g, '')) || 0;
    const discountRate = parseFloat(document.getElementById('discount').innerText) || 0;
    const principalAmount = parseFloat(document.getElementById('principal-amount').innerText.replace(/,/g, '')) || 0;
    const discountAmount = parseFloat(document.getElementById('discount-amount').innerText.replace(/,/g, '')) || 0;
    const totalAmount = parseFloat(document.getElementById('total-amount').innerText.replace(/,/g, '')) || 0;
    const adjustedAmount = parseFloat(document.getElementById('adjusted-price').innerText.replace(/,/g, '')) || 0;
    const vatRate = 0.05;
    const vatAmount = totalAmount * vatRate;

    // --- Logo as Base64 ---
    const logoBase64 = await fetch('/logo.png')
        .then(res => res.blob())
        .then(blob => new Promise(resolve => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        }));

    // --- Project Phases Table ---
    const phasesHtml = document.querySelector('#project-phases');
    const phaseRows = [];
    let phaseCount = 1;
    phasesHtml.querySelectorAll('li').forEach(phaseLi => {
        const title = phaseLi.querySelector('h4')?.innerText || '';
        const duration = phaseLi.querySelector('p')?.innerText || '';
        const tasks = Array.from(phaseLi.querySelectorAll('ul li')).map(li => li.innerText);

        tasks.forEach((task, index) => {
            if (index === 0) {
                phaseRows.push(`<tr>
                    <td rowspan="${tasks.length}">${phaseCount}</td>
                    <td rowspan="${tasks.length}">${title}</td>
                    <td rowspan="${tasks.length}">${duration}</td>
                    <td>${task}</td>
                </tr>`);
            } else {
                phaseRows.push(`<tr><td>${task}</td></tr>`);
            }
        });

        phaseCount++;
    });

    // --- Payment Plans Table ---
    const plansHtml = document.querySelector('#payment-plans table');
    const planRows = [];
    const rows = Array.from(plansHtml.querySelectorAll('tr'));
    rows.slice(1).forEach(row => { // skip header
        const cells = row.querySelectorAll('td');
        if (cells.length === 3) {
            planRows.push(`<tr>
                <td>${cells[0].innerText}</td>
                <td>${cells[1].innerText}</td>
                <td>${cells[2].innerText}</td>
            </tr>`);
        } else {
            planRows.push(`<tr>
                <td colspan="2">${cells[0]?.innerText || ''}</td>
                <td>${cells[2]?.innerText || ''}</td>
            </tr>`);
        }
    });

    // --- Totals Section ---
    const totalsHtml = `
    <div class="total-section" style="text-align:right; margin-top:20px; font-weight:bold;">
        <p>Sub Total: R ${principalAmount.toFixed(2)}</p>
        <p>Discount (${discountRate}%): R ${discountAmount.toFixed(2)}</p>
        <p>VAT (${vatRate*100}%): R ${vatAmount.toFixed(2)}</p>
        <p><strong>Total Amount:</strong> R ${(totalAmount + vatAmount).toFixed(2)}</p>
    </div>`;

    // --- Construct HTML ---
    const html = `
    <html>
    <head>
        <title>Quotation</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background: #f0f0f0; }
            h3 { margin-top: 20px; color: #405189; }
            .logo { max-height: 60px; margin-bottom:10px; }
        </style>
    </head>
    <body>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid #ddd; padding-bottom:10px;">
            <div>
                <img src="${logoBase64}" class="logo" />
                <p>${companyAddress}</p>
            </div>
            <div style="text-align:right;">
                <h5>Invoice #INV${Math.floor(Math.random()*10000)}</h5>
                <p>Created: ${new Date().toLocaleDateString()}</p>
                <p>Due: ${new Date(Date.now() + 15*24*60*60*1000).toLocaleDateString()}</p>
            </div>
        </div>

        <div style="display:flex; justify-content:space-between; margin-bottom:20px; border-bottom:1px solid #ddd; padding-bottom:10px;">
            <div>
                <p><strong>From</strong></p>
                <h4>${companyName}</h4>
                <p>${companyAddress}</p>
                <p>Email: ${companyEmail}</p>
                <p>Phone: ${companyPhone}</p>
            </div>
            <div>
                <p><strong>To</strong></p>
                <h4>${clientName}</h4>
                <p>Email: ${clientEmail}</p>
            </div>
            <div style="text-align:right;">
                <p><strong>Payment Status</strong></p>
                <span style="display:inline-block; background-color:#f5625d; color:white; padding:5px 10px; border-radius:4px;">Due</span>
            </div>
        </div>

        <p><strong>Invoice For:</strong> ${type} – ${plan}</p>
        <table>
            <thead>
                <tr><th>Job Description</th><th>Qty</th><th>Cost (R)</th><th>Discount (R)</th><th>Total (R)</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>${type} – ${plan}</td>
                    <td>1</td>
                    <td>${quoteAmount.toFixed(2)}</td>
                    <td>${discountAmount.toFixed(2)}</td>
                    <td>${totalAmount.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>

        <h3>Project Phases</h3>
        <table>
            <thead>
                <tr><th>#</th><th>Phase</th><th>Duration</th><th>Task</th></tr>
            </thead>
            <tbody>${phaseRows.join('')}</tbody>
        </table>

        <h3>Payment Plans</h3>
        <table>
            <thead>
                <tr><th>Phase</th><th>Payment Date</th><th>Payment Amount</th></tr>
            </thead>
            <tbody>${planRows.join('')}</tbody>
        </table>

        ${totalsHtml}
    </body>
    </html>`;

    printHtml(html);

	function printHtml(html) {
		const iframe = document.createElement('iframe');
		iframe.style.position = 'fixed';
		iframe.style.right = '0';
		iframe.style.bottom = '0';
		iframe.style.width = '0';
		iframe.style.height = '0';
		iframe.style.border = '0';
		document.body.appendChild(iframe);

		const doc = iframe.contentWindow.document;
		doc.open();
		doc.write(html);
		doc.close();

		setTimeout(()=>{
	        iframe.contentWindow.focus();
			iframe.contentWindow.print();

			// Remove iframe after printing
			setTimeout(() => document.body.removeChild(iframe), 1000);
		
		},300)
			
	}

});

onReady('#contact-form','submit', (e) => 
{  
     e.preventDefault();
	 
	  var fm3 = document.getElementById("send-email-3").parentNode;
 
     var formStatus = document.getElementById("form-status-3");
     var name = fm3.querySelector('#name3').value;
     var message = fm3.querySelector("#text3").value; 
     var email = fm3.querySelector("#email3").value;

     console.log(name , email , message , fm3 , formStatus);

     sendEmail(name , message , email , formStatus , fm3 , "Custome Quote Request");
}); 
// 
async function loadHtml(elementId, url) {
    const targetSection = document.getElementById(elementId);
    console.log('Loading:', elementId, url);

    // Clear all other sections except target
    sections.forEach(section => {
        section.classList.remove('active');
        if (section !== targetSection) section.innerHTML = '';
    });
    targetSection.classList.add('active');

    let payment = '';

    // Load payment snippet if needed
    if (url.includes("blogs/")) {
        try {
            payment = await fetchHtml('payments/yoco.html');
        } catch (err) {
            console.error('Error loading payment snippet:', err);
        }
    }

    // Load main HTML
    let mainHtml = '';
    try {
        mainHtml = await fetchHtml(url);
    } catch (err) {
        console.error('Error loading main HTML:', err);
        return;
    }

	let scripts = [];

    // --- Insert main HTML into target section (without scripts) ---
    const mainDiv = document.createElement('div');
    mainDiv.innerHTML = mainHtml;
    const mainScripts = extractScripts(mainDiv);
	
    for (const script of mainScripts) {
        scripts.push(script.cloneNode(true));
    }

    mainScripts.forEach(s => s.remove()); // remove scripts from HTML
    targetSection.innerHTML = mainDiv.innerHTML;

    // --- Append payment HTML to target section (without scripts) ---
    let paymentScripts = [];
    if (payment) {
        const paymentDiv = document.createElement('div');
        paymentDiv.innerHTML = payment;
        paymentScripts = extractScripts(paymentDiv);
		
		for (const script of paymentScripts) {
			scripts.push(script.cloneNode(true));
		}

		paymentScripts.forEach(s => s.remove());
        targetSection.insertAdjacentHTML('beforeend', paymentDiv.innerHTML);
    }

    for (const script of scripts) {
		try
		{
			if(script.src){
               await loadScriptSequentially(script);
			}
			else{
			  loadScriptSequentially(script);
			}
			//
		} 
		catch(es) {
		   console.error(es)
		}
    }

    // Close mobile nav if open
    if (sideNav) sideNav.classList.remove('mob-nav');
}

// --- Helper: fetch HTML ---
function fetchHtml(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = () => xhr.status === 200 ? resolve(xhr.responseText) : reject(new Error(`${xhr.status} ${xhr.statusText}`));
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.send();
    });
}

// --- Helper: extract all scripts recursively ---
function extractScripts(container) {
    const scripts = [];
    const nodes = Array.from(container.querySelectorAll('script'));
    nodes.forEach(node => scripts.push(node));
    return scripts;
}

// --- Helper: clone & append script sequentially ---
function loadScriptSequentially(script) {
    return new Promise((resolve, reject) => {
        const newScript = document.createElement('script');

        if (script.src)
	    { 
			newScript.src = script.src; 
		}
        else
		{
		   newScript.textContent = script.textContent;
		}

        if (script.id) newScript.id = script.id;
        if (script.className) newScript.className = script.className;
        if (script.async) newScript.async = script.async;
        if (script.defer) newScript.defer = script.defer;
        if (script.type) newScript.type = script.type;
        if (script.nomodule) newScript.nomodule = true;

        newScript.onload = () => resolve();
        newScript.onerror = err => reject(err);

        document.body.appendChild(newScript);
    });
}


document.addEventListener("DOMContentLoaded", function() {  
    // Parse query parameters
    const params = new URLSearchParams(window.location.search);
    let page = params.get('page');   // e.g., "shop"
    let path = params.get('path');   // e.g., "sections/shop.html"
    let fill = params.get('fill');   // optional parameter

    if (page) {
        
		if (fill) console.log('Fill:', fill);

		page = page ? decodeURIComponent(page) : page;
		path = path ? decodeURIComponent(path) : path;

        loadHtml('main', `${path || sections}/${page}.html`);
    } else {
        console.log('No query parameters found, loading default home');
        loadHtml('main', 'sections/home.html');
    }
});

//------------------------------: Pricing
// Replace textarea with CKEditor
var editor = {
    height: 200,
    toolbar: [
      { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord' ] },
      { name: 'editing', items: [ 'Find', 'Replace', 'SelectAll' ] },
      { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
      '/',
      { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'RemoveFormat' ] },
      { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', 'Outdent', 'Indent', 'Blockquote', 'CreateDiv', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'BidiLtr', 'BidiRtl' ] },
      { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
      { name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak' ] },
      '/',
      { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
      { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
      { name: 'tools', items: [ 'Maximize', 'ShowBlocks', 'About' ] }
    ],
    disableSecurityWarning: true
  };

onLoad("#editor" , ()=>{ CKEDITOR.replace('editor', editor);  });
onLoad("#editor2" , ()=>{ CKEDITOR.replace('editor2', editor); });

//-----------------------------: Layout 
// Get elements
const topNav = document.querySelector('.top-nav');
const sideNav = document.querySelector('.side-nav');
const docsNav = document.querySelector('.docs-nav');
const mainContent = document.querySelector('.main-content'); 
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const subNavTriggers = document.querySelectorAll('.dropdown');
const subNavs = document.querySelectorAll('.sub-nav');
const modals = document.querySelectorAll('.modal');
const accordionTriggers = document.querySelectorAll('.accordion');
const alertCloseButtons = document.querySelectorAll('.alert .close-button');
const asideToggle = document.querySelector('.aside-toggle'); 
// Add event listeners
onReady('.nav-link','click', handleNavLinkClick);
onReady('.dropdown' , 'mouseover', handleSubNavTrigger);
onReady('.dropdown' , 'mouseout', handleSubNavTrigger); 
onReady('.accordion' , 'click', handleAccordionTrigger);
onReady('.alert .close-button' , 'click', handleAlertClose);

// Functions  
function handleNavLinkClick(event) {
    event.preventDefault();
 
    let page = encodeURIComponent(event.target.getAttribute('href').substring(1));
    let path = encodeURIComponent(event.target.getAttribute('path') || `sections`);
 
    let fill = 'none'; 

    let url = `${window.location.pathname}?page=${encodeURIComponent(page)}&path=${encodeURIComponent(path)}&fill=${encodeURIComponent(fill)}`;
    window.location.href = url;
}


function handleSubNavTrigger(event) {
const subNav = event.target.querySelector('.sub-nav');
if (event.type === 'mouseover') {
subNav.style.display = 'block';
} else {
subNav.style.display = 'none';
}
}

function handleAccordionTrigger(event) {
const accordionContent = event.target.nextElementSibling;
accordionContent.classList.toggle('show');
}

function handleAlertClose() {
const alert = event.target.parentElement;
alert.remove();
}

// Initialize modals
onReady('.modal .close-button' , 'click', () => modal.style.display = 'none');
// Initialize tooltips
onReady('.tooltip .tooltip-trigger' , 'mouseover', () => tooltip.classList.add('show'));
onReady('.tooltip .tooltip-trigger' , 'mouseout', () => tooltip.classList.remove('show'));
//

asideToggle.addEventListener('click', () => { 
   if(sideNav.classList.contains('mob-nav')){
      sideNav.classList.remove('mob-nav');
      document.body.classList.remove('mobs-nav');
   }
   else{
      sideNav.classList.add('mob-nav');
      document.body.classList.add('mobs-nav');
   }
});

document.addEventListener('click', (event) => { 
  if (!docsNav.contains(event.target) && sideNav.contains(event.target)) { 
    sideNav.classList.remove('mob-nav');
    document.body.classList.remove('mobs-nav');
  }
});

// Check if mobile device
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
