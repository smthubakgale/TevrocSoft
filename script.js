//------------------------------------: Shop 
 // Initialize EmailJS
  // load project types dynamically from the JSON array
  const projectTypeSelect = document.getElementById('project-type');
  const templateGroupsContainer = document.querySelector('.template-groups');
  const featuresContainer = document.getElementById('features-container');
  const planSelect = document.getElementById('plan-select'); 
  const quoteContainer = document.getElementById('quote-container');
  const templatePageIframe = document.getElementById('template-page-iframe'); 

  const projectTypes = [
    {
      "id": 1,
      "name": "Web Development",
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
  
  projectTypeSelect.addEventListener('change', (event) => {
	  const selectedValue = event.target.value;
	  const selectedProjectType = projectTypes.find((projectType) => projectType.id === selectedValue);

	  projectTypeSelect.parentNode.querySelector('.pname').innerHTML = selectedProjectType.name;
	  projectTypeSelect.parentNode.querySelector('.pdesc').innerHTML = selectedProjectType.description; 
  });

  const featuresHtml = firstProjectType.features.map(feature => `
    <div class="form-group">
      <div class="checkbox">
        <label>
          <input type="checkbox" name="${feature.name}" value="${feature.price}"> ${feature.name} - R${feature.price}
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
		<input type="checkbox" id="template-contact" name="${page.name}" value="${page.price}">
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
	const popupElement = document.querySelector('.popup');
	if (popupElement) {
	  popupElement.remove();
	}
	const url = button.getAttribute('data-url');
    const popup = document.createElement('div');
    popup.classList.add('popup'); 
    popup.innerHTML = `
	  <div class="popup-content">
		<iframe src="${url}" frameborder="0" width="100%" height="100%"></iframe>
		<button class="close-button" >Close</button>
	  </div> 
    `;

    document.body.appendChild(popup);

    document.querySelector('.close-button').addEventListener('click', () => {
      popup.remove();
    });
  });
});

  projectTypeSelect.parentNode.innerHTML += projectTypeHtml;
  featuresContainer.innerHTML = featuresHtml;
  planSelect.innerHTML = plansHtml;

  projectTypeSelect.addEventListener('change', (event) => {
    const selectedProjectTypeId = event.target.value;
    const selectedProjectType = projectTypes.find(projectType => projectType.id == selectedProjectTypeId);
    
    if (selectedProjectType) {
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
              <input type="checkbox" name="${feature.name}" value="${feature.price}"> ${feature.name} - R${feature.price}
            </label>
          </div>
        </div>
      `).join('');

      const plansHtml = selectedProjectType.plans.map(plan => `
        <option value="${plan.name}">${plan.name} - R${plan.price}</option>
      `).join('');

      projectTypeSelect.parentNode.innerHTML = projectTypeHtml;
      featuresContainer.innerHTML = featuresHtml;
      planSelect.innerHTML = plansHtml;
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
   
   // Update quote result with project timeline estimation
	function updateQuoteResult(quoteAmount, quoteBreakdown, projectTimelineEstimation) {
	  document.getElementById('quote-amount').innerHTML = `Quote Amount: $${quoteAmount}`;
	  document.getElementById('quote-breakdown').innerHTML = quoteBreakdown;
	  document.getElementById('project-timeline-estimation').innerHTML = `Project Timeline Estimation: ${projectTimelineEstimation}`;
	}
	
  document.getElementById('custom-quote-form').addEventListener('submit', (e) => {
    
	e.preventDefault();
	// Amount
    const selectedProjectType = projectTypes.find(projectType => projectType.id == projectTypeSelect.value);
    const selectedTemplatePages = Array.from(templateGroupsContainer.querySelectorAll('input[type="checkbox"]:checked')).map(templatePage => templatePage.value);
    const selectedFeatures = Array.from(featuresContainer.querySelectorAll('input[type="checkbox"]:checked')).map(feature => feature.value);
    const selectedPlan = planSelect.value;

    const totalPrice = selectedTemplatePages.reduce((acc, price) => acc + parseInt(price), 0) +
                        selectedFeatures.reduce((acc, price) => acc + parseInt(price), 0) +
                        selectedProjectType.plans.find(plan => plan.name == selectedPlan).price;

    const quoteHtml = `
      <p>Your quote is: R${totalPrice}</p>
    `;

    quoteContainer.innerHTML = quoteHtml;
	// Time 
	const startDate = new Date(document.getElementById('start-date').value);
    const endDate = new Date(document.getElementById('end-date').value);

    const projectTimelinePhases = calculateProjectTimelinePhases(startDate, endDate);
	const projectTimelineEstimation = `
    Discovery Phase: ${projectTimelinePhases.discoveryPhase} days
    Design Phase: ${projectTimelinePhases.designPhase} weeks
    Development Phase: ${projectTimelinePhases.developmentPhase} weeks
    Testing Phase: ${projectTimelinePhases.testingPhase} weeks
    Launch Phase: ${projectTimelinePhases.launchPhase} weeks
  `;

    updateQuoteResult(10000, "Breakdown: ...", projectTimelineEstimation);
	// 
	
  }); 
//------------------------------------: Pricing
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
