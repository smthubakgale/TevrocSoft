//------------------------------------: Shop 
 // Initialize EmailJS

//----------------------------:
 // Add event listeners to add buttons
  document.getElementById('add-ip').addEventListener('click', addIp);
  document.getElementById('add-browser').addEventListener('click', addBrowser);
  document.getElementById('add-project').addEventListener('click', addProject);
  document.getElementById('add-anc').addEventListener('click', addAnc);
  document.getElementById('add-file').addEventListener('click', addFile);
  document.getElementById('add-temp').addEventListener('click', addTemp);
  document.getElementById('add-sql').addEventListener('click', addSql);
  document.getElementById('add-ui-api').addEventListener('click', addUiApi);
  document.getElementById('add-social-auth').addEventListener('click', addSocialAuth);

  // Functions to add new fields
  function addIp() {
    const ipsContainer = document.getElementById('ips-container');
    const newIp = document.createElement('div');
    newIp.innerHTML = `
      <input type="text" name="ips[]" placeholder="Enter IP">
      <button type="button" class="remove-ip">Remove</button>
    `;
    ipsContainer.appendChild(newIp);
    newIp.querySelector('.remove-ip').addEventListener('click', removeIp);
  }

  function addBrowser() {
    const browsersContainer = document.getElementById('browsers-container');
    const newBrowser = document.createElement('div');
    newBrowser.innerHTML = `
      <input type="text" name="browsers[]" placeholder="Enter browser">
      <button type="button" class="remove-browser">Remove</button>
    `;
    browsersContainer.appendChild(newBrowser);
    newBrowser.querySelector('.remove-browser').addEventListener('click', removeBrowser);
  }
    function addProject() {
    const projectsContainer = document.getElementById('projects-container');
    const newProject = document.createElement('div');
    newProject.innerHTML = `
      <input type="text" name="projects[]" placeholder="Enter project">
      <button type="button" class="remove-project">Remove</button>
    `;
    projectsContainer.appendChild(newProject);
    newProject.querySelector('.remove-project').addEventListener('click', removeProject);
  }

  function addAnc() {
    const ancsContainer = document.getElementById('ancs-container');
    const newAnc = document.createElement('div');
    newAnc.innerHTML = `
      <h2>ANC</h2>
      <label for="anc-id">ID:</label>
      <input type="text" id="anc-id" name="ancs[id][]">
      <label for="anc-users">Users:</label>
      <input type="text" id="anc-users" name="ancs[users][]">
      <label for="anc-not">Not:</label>
      <input type="checkbox" id="anc-not" name="ancs[not][]">
      <button type="button" class="remove-anc">Remove</button>
    `;
    ancsContainer.appendChild(newAnc);
    newAnc.querySelector('.remove-anc').addEventListener('click', removeAnc);
  }

  function addFile() {
    const filesContainer = document.getElementById('files-container');
    const newFile = document.createElement('div');
    newFile.innerHTML = `
      <h2>File</h2>
      <label for="file-p">P:</label>
      <input type="text" id="file-p" name="files[p][]">
      <label for="file-u">U:</label>
      <input type="text" id="file-u" name="files[u][]">
      <button type="button" class="remove-file">Remove</button>
    `;
    filesContainer.appendChild(newFile);
    newFile.querySelector('.remove-file').addEventListener('click', removeFile);
  }

  function addTemp() {
    const tempsContainer = document.getElementById('temps-container');
    const newTemp = document.createElement('div');
    newTemp.innerHTML = `
      <h2>Temp</h2>
      <label for="temp-p">P:</label>
      <input type="text" id="temp-p" name="temps[p][]">
      <label for="temp-u">U:</label>
      <input type="text" id="temp-u" name="temps[u][]">
      <button type="button" class="remove-temp">Remove</button>
    `;
    tempsContainer.appendChild(newTemp);
    newTemp.querySelector('.remove-temp').addEventListener('click', removeTemp);
  }

  function addSql() {
    const sqlContainer = document.getElementById('sql-container');
    const newSql = document.createElement('div');
    newSql.innerHTML = `
      <h2>SQL</h2>
      <label for="sql-type">Type:</label>
      <input type="text" id="sql-type" name="sql[type][]">
      <label for="sql-encrypt">Encrypt:</label>
      <input type="text" id="sql-encrypt" name="sql[encrypt][]">
      <button type="button" class="remove-sql">Remove</button>
    `;
    sqlContainer.appendChild(newSql);
    newSql.querySelector('.remove-sql').addEventListener('click', removeSql);
  }

  function addUiApi() {
    const uiApiContainer = document.getElementById('ui-api-container');
    const newUiApi = document.createElement('div');
    newUiApi.innerHTML = `
      <h2>UI API</h2>
      <label for="ui-api-client-id">Client ID:</label>
      <input type="text" id="ui-api-client-id" name="ui_api[client_id][]">
      <label for="ui-api-project-id">Project ID:</label>
      <input type="text" id="ui-api-project-id" name="ui_api[project_id][]">
      <button type="button" class="remove-ui-api">Remove</button>
    `;
    uiApiContainer.appendChild(newUiApi);
    newUiApi.querySelector('.remove-ui-api').addEventListener('click', removeUiApi);
  }

  function addSocialAuth() {
    const socialAuthContainer = document.getElementById('social-auth-container');
    const newSocialAuth = document.createElement('div');
    newSocialAuth.innerHTML = `
      <h2>Social Auth</h2>
      <label for="social-auth-provider">Provider:</label>
      <input type="text" id="social-auth-provider" name="social_auth[provider][]">
      <label for="social-auth-client-id">Client ID:</label>
      <input type="text" id="social-auth-client-id" name="social_auth[client_id][]">
      <button type="button" class="remove-social-auth">Remove</button>
    `;
    socialAuthContainer.appendChild(newSocialAuth);
    newSocialAuth.querySelector('.remove-social-auth').addEventListener('click', removeSocialAuth);
  }

  // Functions to remove fields
  function removeIp(event) {
    const ip = event.target.parentNode;
    ip.parentNode.removeChild(ip);
  }

  function removeBrowser(event) {
    const browser = event.target.parentNode;
    browser.parentNode.removeChild(browser);
  }

  function removeProject(event) {
    const project = event.target.parentNode;
    project.parentNode.removeChild(project);
  }

  function removeAnc(event) {
    const anc = event.target.parentNode;
    anc.parentNode.removeChild(anc);
  }

  function removeFile(event) {
    const file = event.target.parentNode;
    file.parentNode.removeChild(file);
  }

  function removeTemp(event) {
    const temp = event.target.parentNode;
    temp.parentNode.removeChild(temp);
  }

  function removeSql(event) {
    const sql = event.target.parentNode;
    sql.parentNode.removeChild(sql);
  }

  function removeUiApi(event) {
    const uiApi = event.target.parentNode;
    uiApi.parentNode.removeChild(uiApi);
  }

  function removeSocialAuth(event) {
    const socialAuth = event.target.parentNode;
    socialAuth.parentNode.removeChild(socialAuth);
  }

  // Function to handle form submission
  document.getElementById('json-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const jsonData = {};
    for (const [key, value] of formData) {
      if (!jsonData[key]) {
        jsonData[key] = value;
      } else if (Array.isArray(jsonData[key])) {
        jsonData[key].push(value);
      } else {
        jsonData[key] = [jsonData[key], value];
      }
    }
    console.log(jsonData);
    // Send the JSON data to your server or API
  });
//----------------------------:
  // load project types dynamically from the JSON array
  var projectTypeSelect = document.getElementById('project-type');
  const templateGroupsContainer = document.querySelector('.template-groups');
  const featuresContainer = document.getElementById('features-container');
  const planSelect = document.getElementById('plan-select');  
  const templatePageIframe = document.getElementById('template-page-iframe'); 
  const discountAmountInput = document.getElementById('discount-request-amount');
  const quoteAmountValue = document.getElementById('quote-amount-value');
  const projectPhasesList = document.getElementById('project-phases');
  
  // Template group header toggle
	document.querySelectorAll('#shop .template-group-header').forEach(header => {
	  header.addEventListener('click', () => {
		const content = header.nextElementSibling;
		content.style.display = content.style.display === 'none' ? 'block' : 'none';
	  });
	});

  const projectTypes = [
    {
      "id": 1,
      "name": "Web Development",
	  "type": "web" ,
      "description": "Web development projects",
      "features": [
        {
          "id": 1,
          "name": "Responsive design",
          "price": 1000
        },
        {
          "id": 2,
          "name": "Customizable layout",
          "price": 1500
        },
        {
          "id": 3,
          "name": "Interactive elements",
          "price": 2000
        }
      ],
      "plans": [
        {
          "name": "Standard",
          "price": 2000
        },
        {
          "name": "Enterprise",
          "price": 5000
        },
        {
          "name": "Premium",
          "price": 8000
        }
      ]
    },
    {
      "id": 2,
      "name": "Mobile App Development",
	  "type": "mobile" ,
      "description": "Mobile app development projects",
      "features": [
        {
          "id": 4,
          "name": "Native app development",
          "price": 3000
        },
        {
          "id": 5,
          "name": "Cross-platform development",
          "price": 4000
        },
        {
          "id": 6,
          "name": "App store optimization",
          "price": 2000
        }
      ],
      "plans": [
        {
          "name": "Basic",
          "price": 5000
        },
        {
          "name": "Pro",
          "price": 10000
        },
        {
          "name": "Enterprise",
          "price": 15000
        }
      ]
    },
    {
      "id": 3,
      "name": "E-commerce Development",
	  "type": "desktop" ,
      "description": "E-commerce development projects",
      "features": [
        {
          "id": 7,
          "name": "Customizable storefront",
          "price": 2500
        },
        {
          "id": 8,
          "name": "Payment gateway integration",
          "price": 2000
        },
        {
          "id": 9,
          "name": "Inventory management",
          "price": 1500
        }
      ],
      "plans": [
        {
          "name": "Starter",
          "price": 3000
        },
        {
          "name": "Business",
          "price": 6000
        },
        {
          "name": "Enterprise",
          "price": 10000
        }
      ]
    }
  ];

  const templates = [
    {
      "name": "Basic Website Template",
      "pages": [
        {
          "name": "Home Page",
          "price": 1000,
          "link": "https://example.com/home-page-template"
        },
        {
          "name": "About Page",
          "price": 500,
          "link": "https://example.com/about-page-template"
        },
		        {
          "name": "Contact Page",
          "price": 500,
          "link": "https://example.com/contact-page-template"
        }
      ]
    },
    {
      "name": "E-commerce Website Template",
      "pages": [
        {
          "name": "Product Page",
          "price": 2000,
          "link": "https://example.com/product-page-template"
        },
        {
          "name": "Shopping Cart Page",
          "price": 1500,
          "link": "https://example.com/shopping-cart-page-template"
        },
        {
          "name": "Checkout Page",
          "price": 1000,
          "link": "https://example.com/checkout-page-template"
        }
      ]
    }
  ];

  // Price Adjustments
	const complexityMultipliers = {
	  web: {
		low: 0.6,
		medium: 1.0,
		high: 1.4,
	  },
	  desktop: {
		low: 0.5,
		medium: 1.0,
		high: 1.5,
	  },
	  mobile: {
		low: 0.7,
		medium: 1.0,
		high: 1.3,
	  },
	};

	const projectTypeMultipliers = {
	  web: {
		basic: 0.8,
		premium: 1.0,
		enterprise: 1.2,
	  },
	  desktop: {
		basic: 0.7,
		premium: 1.0,
		enterprise: 1.3,
	  },
	  mobile: {
		basic: 0.8,
		premium: 1.0,
		enterprise: 1.2,
	  },
	};

	const projectDurationMultipliers = (days) => {
	  if (days <= 30) {
		return 1.5; // very short-term (less than 1 month)
	  } else if (days <= 90) {
		return 1.2; // short-term (1-3 months)
	  } else if (days <= 180) {
		return 1.0; // medium-term (3-6 months)
	  } else if (days <= 365) {
		return 0.9; // long-term (6-12 months)
	  } else if (days <= 730) {
		return 0.8; // very long-term (1-2 years)
	  } else if (days <= 1460) {
		return 0.7; // extremely long-term (2-4 years)
	  } else if (days <= 2920) {
		return 0.6; // ultra-long-term (4-6 years)
	  } else if (days <= 3650) {
		return 0.5; // maximum long-term (6-10 years)
	  } else {
		return 0.4; // beyond maximum long-term (> 10 years)
	  }
	};

	function adjustPrice(basePrice, complexity, projectType, platform, projectDurationDays) {
	  const complexityMultiplier = complexityMultipliers[platform][complexity];
	  const projectTypeMultiplier = projectTypeMultipliers[platform][projectType];
	  const projectDurationMultiplier = projectDurationMultipliers(projectDurationDays);

	  const adjustedPrice = basePrice * complexityMultiplier * projectTypeMultiplier * projectDurationMultiplier;
	  return adjustedPrice;
	}
	  //
  
  projectTypes.forEach(projectType => {
    const projectTypeOption = document.createElement('option');
    projectTypeOption.value = projectType.id;
    projectTypeOption.textContent = projectType.name;
    projectTypeSelect.appendChild(projectTypeOption);
  });

  // select the first project type by default
  projectTypeSelect.selectedIndex = 0;

  // load the first project type's features and plans
  const firstProjectType = projectTypes[0];

  const projectTypeHtml = `
    <div class="form-group">
      <h4 class="pname">${firstProjectType.name}</h4>
      <p class="pdesc">${firstProjectType.description}</p>
    </div>
  `;
   
  const featuresHtml = firstProjectType.features.map(feature => `
    <div class="form-group">
      <div class="checkbox">
        <label>
          <input onchange="updateQuoteResult()" type="checkbox" name="${feature.name}" value="${feature.price}"> ${feature.name} - R${feature.price}
        </label>
      </div>
    </div>
  `).join('');

  const plansHtml = firstProjectType.plans.map(plan => `
    <option value="${plan.name}">${plan.name} - R${plan.price}</option>
  `).join('');

 const templateGroupsHtml = templates.map(template => `
  
  <div class="template-group-header">
      <h4> ${template.name} <i class="fas fa-caret-down"></i></h4>
  </div>
  <ul class="template-group-content" style="display: none;">
  ${template.pages.map(page => `
  
      <li>
		<input  onchange="updateQuoteResult()" type="checkbox" id="template-contact" name="${page.name}" value="${page.price}">
		<label for="template-contact"> ${page.name} - R${page.price} </label>
		<button class="preview-button" data-link="${page.link}">Preview</button>
	  </li>   
    </div>
  `).join('')}
  </ul>
`).join('');
 

 templateGroupsContainer.innerHTML = templateGroupsHtml;
// Add event listener for Template group header toggle
templateGroupsContainer.querySelectorAll('.template-group-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
  });
});

// Add event listener to the dynamically created buttons
templateGroupsContainer.querySelectorAll('.preview-button').forEach(button => {
  button.addEventListener('click', (event) => { 
    event.preventDefault();
	const popupElement = document.querySelector('.popup');
	if (popupElement) {
	  popupElement.remove();
	}
	const url = button.getAttribute('data-link');
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    popup.style.background = 'rgba(0, 0, 0, 0.5)';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.zIndex = '1000'; 
    popup.innerHTML = `
	  <div class="popup-content" style="width:100%;  height:100%" >
		<iframe src="${url}" frameborder="0" width="100%" height="100%"></iframe>
		<button class="close-button" style="left:calc(100% - 80px); top:calc(100% - 46px); position:absolute;" >Close</button>
	  </div> 
    `;
	
    document.body.style.overflow = 'hidden';
    document.body.appendChild(popup);

    document.querySelector('.close-button').addEventListener('click', () => {
      popup.remove();
	  document.body.style.overflow = 'auto';
    });
  });
});

  projectTypeSelect.parentNode.innerHTML += projectTypeHtml;
  projectTypeSelect = document.getElementById('project-type');
  featuresContainer.innerHTML = featuresHtml;
  planSelect.innerHTML = plansHtml;

  projectTypeSelect.addEventListener('change', (event) => {
    const selectedProjectTypeId = event.target.value;
    const selectedProjectType = projectTypes.find(projectType => projectType.id == selectedProjectTypeId);
	  
    if (selectedProjectType) {
		
	  const pname = document.querySelector('.pname');
	  const pdesc = document.querySelector('.pdesc');
	  
	  pname.innerHTML = selectedProjectType.name;
	  pdesc.innerHTML = selectedProjectType.description; 
	  
      const projectTypeHtml = `
        <div class="form-group">
          <h4>${selectedProjectType.name}</h4>
          <p>${selectedProjectType.description}</p>
        </div>
      `;

      const featuresHtml = selectedProjectType.features.map(feature => `
        <div class="form-group">
          <div class="checkbox">
            <label>
              <input  onchange="updateQuoteResult()" type="checkbox" name="${feature.name}" value="${feature.price}"> ${feature.name} - R${feature.price}
            </label>
          </div>
        </div>
      `).join('');

      const plansHtml = selectedProjectType.plans.map(plan => `
        <option value="${plan.name}">${plan.name} - R${plan.price}</option>
      `).join('');
 
      featuresContainer.innerHTML = featuresHtml;
      planSelect.innerHTML = plansHtml;
	  
	  updateQuoteResult()
    }
  });

  document.querySelectorAll('.preview-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const link = button.getAttribute('data-link');
      templatePageIframe.src = link;
      popup.style.display = 'block';
    });
  });
  // Calculate project timeline phases
	function calculateProjectTimelinePhases(startDate, endDate) {
	  const projectDuration = Math.round(7*(endDate - startDate) / (1000 * 3600 * 24));

	  // Estimated phase durations (in days)
	  const discoveryPhase = Math.ceil(projectDuration / 20);
	  const designPhase = Math.ceil(projectDuration / 15);
	  const developmentPhase = Math.ceil(projectDuration / 10);
	  const testingPhase = Math.ceil(projectDuration / 15);
	  const launchPhase = Math.ceil(projectDuration / 20);

	  return {
		discoveryPhase,
		designPhase,
		developmentPhase,
		testingPhase,
		launchPhase,
	  };
   }
   
  
  function updateQuoteResult(){
     
	// Time  
	const startDate = new Date(document.getElementById('start-date').value);
    const endDate = new Date(document.getElementById('end-date').value);

    const estimatedDays = Math.round(7*(endDate - startDate) / (1000 * 3600 * 24)); 
	// Amount
    const selectedProjectType = projectTypes.find(projectType => projectType.id == projectTypeSelect.value);
    const selectedTemplatePages = Array.from(templateGroupsContainer.querySelectorAll('input[type="checkbox"]:checked')).map(templatePage => templatePage.value);
    const selectedFeatures = Array.from(featuresContainer.querySelectorAll('input[type="checkbox"]:checked')).map(feature => feature.value);
    const selectedPlan = planSelect.value;
	 
    var discountAmount = 0;
    var totalAmount = 0; 

    // Calculate quote amount based on plan and project estimation
	var quoteAmount = selectedProjectType.plans.find(plan => plan.name == selectedPlan).price;
	var pagePrices = selectedTemplatePages.reduce((acc, price) => acc + parseInt(price), 0);
	var featurePrices = selectedFeatures.reduce((acc, price) => acc + parseInt(price), 0) ;
	 
    // Apply discount if requested
	  const discountRequestCheckbox = document.getElementById('discount-request-checkbox');
	  const discountRequestAmount = discountAmountInput;
	  if (discountRequestCheckbox.checked) {
		discountAmount = (quoteAmount * discountRequestAmount.value) / 100;
		totalAmount = quoteAmount - discountAmount + pagePrices + featurePrices;
	  } else {
		totalAmount = quoteAmount + pagePrices + featurePrices;
	  } 
	   
    // Update quote result HTML
	  quoteAmountValue.innerHTML = quoteAmount.toFixed(2);
	  discountAmountInput.value = discountRequestAmount.value;
	  
	  document.getElementById('total-amount').innerHTML = totalAmount.toFixed(2); 
	  document.getElementById('page-prices').innerHTML = pagePrices.toFixed(2);
	  document.getElementById('feature-prices').innerHTML = featurePrices.toFixed(2);
	// Price Adjustments 
		const basePrice = totalAmount;
		const complexity = document.getElementById('complexity').value.toLowerCase();
		const projectType = selectedPlan.toLowerCase();
		const platform = 'web';
		const projectDurationDays = estimatedDays;

		const adjustedPrice = adjustPrice(basePrice, complexity, projectType, platform, projectDurationDays);
		console.log(`Adjusted price: R ${adjustedPrice.toFixed(2)}`);
	// Determine project phases
	  const phases = [];
	  if (estimatedDays >= 40) {
		phases.push({ name: 'Deployment', start: 36, end: 40 });
		phases.push({ name: 'Testing', start: 31, end: 35 });
		phases.push({ name: 'Development', start: 16, end: 30 });
		phases.push({ name: 'Design', start: 6, end: 15 });
		phases.push({ name: 'Planning', start: 1, end: 5 });
	  } else if (estimatedDays >= 30) {
		phases.push({ name: 'Testing', start: 26, end: 30 });
		phases.push({ name: 'Development', start: 16, end: 25 });
		phases.push({ name: 'Design', start: 6, end: 15 });
		phases.push({ name: 'Planning', start: 1, end: 5 });
	  } else if (estimatedDays >= 15) {
		phases.push({ name: 'Development', start: 11, end: 15 });
		phases.push({ name: 'Design', start: 6, end: 10 });
		phases.push({ name: 'Planning', start: 1, end: 5 });
	  } else {
		phases.push({ name: 'Planning', start: 1, end: estimatedDays });
	  }

  // Update project phases HTML
	  projectPhasesList.innerHTML = '';
	  phases.forEach((phase) => {
		const phaseHTML = `
		  <li>
			${phase.name} (Days ${phase.start} - ${phase.end})
		  </li>
		`;
		projectPhasesList.innerHTML += phaseHTML;
	  });
	// 
	
  }

  const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');

const today = new Date();
const endDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

startDateInput.value = formatDate(today, 'yyyy-mm-ddTHH:mm:ss');
endDateInput.value = formatDate(endDate, 'yyyy-mm-ddTHH:mm:ss');

function formatDate(date, format) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  if (format === 'dd-mm-yyyy') {
    return `${day}-${month}-${year}`;
  } else if (format === 'yyyy-mm-dd') {
    return `${year}-${month}-${day}`;
  } else if (format === 'yyyy-mm-ddTHH:mm:ss') {
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  discountAmountInput.value = 30;
  updateQuoteResult();
  
  planSelect.addEventListener('change', updateQuoteResult);
  discountAmountInput.addEventListener('change', updateQuoteResult);
  startDateInput.addEventListener('change', updateQuoteResult);
  endDateInput.addEventListener('change', updateQuoteResult);
  document.getElementById('complexity').addEventListener('change', updateQuoteResult);
  
});
//------------------------------: Pricing
// Replace textarea with CKEditor
  CKEDITOR.replace('editor', {
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
    ]
  });
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
navLinks.forEach(link => link.addEventListener('click', handleNavLinkClick));
subNavTriggers.forEach(trigger => trigger.addEventListener('mouseover', handleSubNavTrigger));
subNavTriggers.forEach(trigger => trigger.addEventListener('mouseout', handleSubNavTrigger)); 
accordionTriggers.forEach(trigger => trigger.addEventListener('click', handleAccordionTrigger));
alertCloseButtons.forEach(button => button.addEventListener('click', handleAlertClose));

// Functions
window.onload = function() {
  const urlHash = window.location.hash.substring(1);
  const targetSection = document.querySelector(`#${urlHash}`);
  
  if (targetSection) {
    sections.forEach(section => section.classList.remove('active'));
    targetSection.classList.add('active');
    sideNav.classList.remove('mob-nav');
  }
};
function handleNavLinkClick(event) {
  event.preventDefault();
  
  const targetSection = document.querySelector(`#${event.target.getAttribute('href').substring(1)}`);
  sections.forEach(section => section.classList.remove('active'));
  targetSection.classList.add('active');
  sideNav.classList.remove('mob-nav');
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

function init() {
// Initialize modals
modals.forEach(modal => {
const closeButton = modal.querySelector('.close-button');
closeButton.addEventListener('click', () => modal.style.display = 'none');
});

// Initialize tooltips
const tooltips = document.querySelectorAll('.tooltip');
tooltips.forEach(tooltip => {
const trigger = tooltip.querySelector('.tooltip-trigger');
trigger.addEventListener('mouseover', () => tooltip.classList.add('show'));
trigger.addEventListener('mouseout', () => tooltip.classList.remove('show'));
});
}

// Initialize
init();

// Add event listener for window resize
window.addEventListener('resize', () => {
  
  if (window.innerWidth > 768) {
   
  } 
});

asideToggle.addEventListener('click', () => { 
   if(sideNav.classList.contains('mob-nav')){
      sideNav.classList.remove('mob-nav');
   }
   else{
      sideNav.classList.add('mob-nav');
   }
});

document.addEventListener('click', (event) => { 
  if (!docsNav.contains(event.target) && sideNav.contains(event.target)) { 
    sideNav.classList.remove('mob-nav');
  }
});

// Check if mobile device
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
