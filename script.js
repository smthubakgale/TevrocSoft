//------------------------------------: Shop 
// Initialize EmailJS
(function() {
  emailjs.init('OiMEAcHFuztUoVBi0');
})();

// Get form elements
const form = document.getElementById('shop-form');
const projectNameInput = document.getElementById('project-name');
const projectEmailInput = document.getElementById('project-email');
const projectTypeSelect = document.getElementById('project-type');
const planSelect = document.getElementById('plan');
const projectEstimationInput = document.getElementById('project-estimation');
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const templateSelect = document.getElementById('template-group-content');
const quoteAmountValue = document.getElementById('quote-amount-value');
const discountAmountInput = document.getElementById('discount-request-amount');
const formStatus = document.getElementById('form-status');
const submitButton = document.getElementById('submit-quote');
const projectPhasesList = document.getElementById('project-phases');
const featuresList = document.getElementById('features-list');

// Project types
const projectTypes = [
  {
    id: 'website',
    name: 'Website',
    multiplier: 1,
    plans: [
      { id: 'basic', name: 'Basic', price: 500 },
      { id: 'premium', name: 'Premium', price: 2000 },
      { id: 'enterprise', name: 'Enterprise', price: 5000 },
    ],
  },
  {
    id: 'application',
    name: 'Application',
    multiplier: 3,
    plans: [
      { id: 'basic', name: 'Basic', price: 1500 },
      { id: 'premium', name: 'Premium', price: 6000 },
      { id: 'enterprise', name: 'Enterprise', price: 15000 },
    ],
  },
  {
    id: 'software',
    name: 'Software',
    multiplier: 6,
    plans: [
      { id: 'basic', name: 'Basic', price: 3000 },
      { id: 'premium', name: 'Premium', price: 12000 },
      { id: 'enterprise', name: 'Enterprise', price: 30000 },
    ],
  },
];

// Template pages with prices
const templatePages = [
  {
    id: 1,
    name: 'Template 1',
    price: 2000,
    pages: [
      { name: 'Home', price: 500, url: 'https://example.com/home' },
      { name: 'About', price: 300, url: 'https://example.com/about' },
      { name: 'Contact', price: 200, url: 'https://example.com/contact' },
    ],
  },
  {
    id: 2,
    name: 'Template 2',
    price: 3500,
    pages: [
      { name: 'Home', price: 700, url: 'https://example.com/home' },
      { name: 'Services', price: 500, url: 'https://example.com/services' },
      { name: 'Portfolio', price: 800, url: 'https://example.com/portfolio' },
    ],
  },
];

// Features with prices
const features = [
  { id: 1, name: 'Responsive Design', price: 500 },
  { id: 2, name: 'Customizable', price: 1000 },
  { id: 3, name: 'SEO Optimized', price: 800 },
  { id: 4, name: 'Secure', price: 1200 },
  { id: 5, name: 'Scalable', price: 1500 },
];

// Function to update quote result
function updateQuoteResult() {
  const projectType = projectTypeSelect.value;
  const plan = planSelect.value;
  const projectEstimation = projectEstimationInput.value;
  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);
  const selectedTemplate = templateSelect.querySelector('.select-button:checked');
  const templateId = selectedTemplate ? selectedTemplate.getAttribute('data-template') : null;
  const templatePrice = templatePages.find((t) => t.id === parseInt(templateId)).price;
  const selectedPages = templateSelect.querySelectorAll('.page-checkbox:checked');
  const selectedFeatures = featuresList.querySelectorAll('.feature-checkbox:checked');

  let quoteAmount = 0;
  let discountAmount = 0;
  let totalAmount = 0;
  let pagePrices = 0;
  let featurePrices = 0;

  // Calculate quote amount based on plan and project estimation
  if (plan === 'basic') {
    quoteAmount = projectEstimation * 100;
  } else if (plan === 'premium') {
    quoteAmount = projectEstimation * 200;
  } else if (plan === 'enterprise') {
    quoteAmount = projectEstimation * 500;
  }

  // Calculate page prices
  selectedPages.forEach((page) => {
    const pagePrice = templatePages.find((t) => t.id === parseInt(templateId)).pages.find((p) => p.name === page.value).price;
    pagePrices += pagePrice;
  });

  // Calculate feature prices
  selectedFeatures.forEach((feature) => {
    const featurePrice = features.find((f) => f.id === parseInt(feature.value)).price;
    featurePrices += featurePrice;
  });

  // Apply discount if requested
  const discountRequestCheckbox = document.getElementById('discount-request-checkbox');
  const discountRequestAmount = discountAmountInput;
  if (discountRequestCheckbox.checked) {
    discountAmount = (quoteAmount * discountRequestAmount.value) / 100;
    totalAmount = quoteAmount - discountAmount + templatePrice + pagePrices + featurePrices;
  } else {
    totalAmount = quoteAmount + templatePrice + pagePrices + featurePrices;
  }

  // Update quote result HTML
  quoteAmountValue.textContent = quoteAmount.toFixed(2);
  discountAmountInput.value = discountRequestAmount.value;
  document.getElementById('template-price').textContent = templatePrice.toFixed(2);
  document.getElementById('page-prices').textContent = pagePrices.toFixed(2);
  document.getElementById('feature-prices').textContent = featurePrices.toFixed(2);
  document.getElementById('total-amount').textContent = totalAmount.toFixed(2);

  // Determine project phases
  const phases = [];
  const estimatedDays = Math.ceil(projectEstimation / 8);
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
}

// Form submission handler
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const projectName = projectNameInput.value;
  const projectEmail = projectEmailInput.value;
  const projectType = projectTypeSelect.value;
  const plan = planSelect.value;
  const projectEstimation = projectEstimationInput.value;
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;
  const templateId = templateSelect.querySelector('.select-button:checked')?.getAttribute('data-template');
  const selectedPages = templateSelect.querySelectorAll('.page-checkbox:checked');
  const selectedFeatures = featuresList.querySelectorAll('.feature-checkbox:checked');
  const quoteAmount = quoteAmountValue.textContent;
  const discountAmount = discountAmountInput.value;
  const templatePrice = document.getElementById('template-price').textContent;
  const pagePrices = document.getElementById('page-prices').textContent;
  const featurePrices = document.getElementById('feature-prices').textContent;
  const projectPhases = projectPhasesList.innerHTML;

  const quoteRequest = {
    from_name: projectName,
    message: `
      Project Type: ${projectType}
      Plan: ${plan}
      Project Estimation: ${projectEstimation} hours
      Start Date: ${startDate}
      End Date: ${endDate}
      Template ID: ${templateId}
      Selected Pages: ${Array.from(selectedPages).map((page) => page.value).join(', ')}
      Selected Features: ${Array.from(selectedFeatures).map((feature) => feature.value).join(', ')}
      Quote Amount: R${quoteAmount}
      Discount Amount: ${discountAmount}%
      Template Price: R${templatePrice}
      Page Prices: R${pagePrices}
      Feature Prices: R${featurePrices}
      Total Amount: R${document.getElementById('total-amount').textContent}
      Project Phases: ${projectPhases}
    `,
    from_email: projectEmail,
    reply_to: projectEmail,
  };

  // Send quote request using EmailJS
  emailjs.send("service_44zo6pj", "template_m3vjj5x", quoteRequest)
    .then(() => {
      console.log('SUCCESS!');
      formStatus.innerHTML = 'Quote sent successfully!';
      submitButton.disabled = true;
    }, (error) => {
      console.log('FAILED...', error);
      formStatus.innerHTML = 'Error sending quote. Please try again.';
    });
});

// Update quote result on input change
projectTypeSelect.addEventListener('change', updateQuoteResult);


planSelect.addEventListener('change', ()=>{
  var v = this.value;
  projectTypes.forEach((s)=>
  {  
     if(s.id == v)
     {
         var html2 = `<option value="">Select Plan</option>`;
         s.plan.forEach((s2 , k2)=>
         {
            html2 += `<option value="` + s2.id + (k2 == 0 ? "selected " : "" ) + `">` + s2.name + `</option>`;
         }); 
       
         planSelect.innerHTML = html2;
     }
  });
  updateQuoteResult();
});
projectEstimationInput.addEventListener('input', updateQuoteResult);
startDateInput.addEventListener('input', updateQuoteResult);
endDateInput.addEventListener('input', updateQuoteResult);
templateSelect.addEventListener('change', updateQuoteResult);
featuresList.addEventListener('change', updateQuoteResult);

// Initialize quote result
document.addEventListener('DOMContentLoaded', () => {
  
  // Initialize Project Type and Plan  
  var html = `<option value="">Select Project Type</option>`; 
  
  projectTypes.forEach((s , k)=>
  { 
     html += `<option value="` + s.id + (k == 0 ? "selected " : "" ) + `">` + s.name + `</option>`;

     if(k == 0){
         var html2 = `<option value="">Select Plan</option>`;
         s.plan.forEach((s2 , k2)=>
         {
            html2 += `<option value="` + s2.id + (k2 == 0 ? "selected " : "" ) + `">` + s2.name + `</option>`;
         });
         planSelect.innerHTML = html2;
     }
  });
  
  projectTypeSelect.innerHTML = html;
  //:
  // Initialize template pages and features
  templatePages.forEach((template) => {
    const templateHTML = `
      <div class="template-option">
        <input type="radio" id="template-${template.id}" name="template" value="${template.id}" data-template="${template.id}">
        <label for="template-${template.id}">${template.name}</label>
        <div class="template-pages">
          ${template.pages.map((page) => `
            <div class="page-option">
              <input type="checkbox" id="page-${page.name}" name="page" value="${page.name}" data-price="${page.price}">
              <label for="page-${page.name}">${page.name}</label>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    templateSelect.innerHTML += templateHTML;
  });

  features.forEach((feature) => {
    const featureHTML = `
      <div class="feature-option">
        <input type="checkbox" id="feature-${feature.id}" name="feature" value="${feature.id}" data-price="${feature.price}">
        <label for="feature-${feature.id}">${feature.name}</label>
      </div>
    `;
    featuresList.innerHTML += featureHTML;
  });
  //
  updateQuoteResult();
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
