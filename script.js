//------------------------------------: Shop 
// Template data
const templateData = {
  website: [
    {
      id: 1,
      name: 'Template 1',
      price: 2000,
      pages: [
        { id: 1, name: 'Home', price: 500 },
        { id: 2, name: 'About', price: 300 },
        { id: 3, name: 'Contact', price: 200 }
      ]
    },
    {
      id: 2,
      name: 'Template 2',
      price: 3500,
      pages: [
        { id: 1, name: 'Home', price: 700 },
        { id: 2, name: 'Services', price: 500 },
        { id: 3, name: 'Portfolio', price: 800 }
      ]
    }
  ],
  application: [
    {
      id: 3,
      name: 'Template 3',
      price: 3000,
      pages: [
        { id: 1, name: 'Home', price: 600 },
        { id: 2, name: 'About', price: 400 },
        { id: 3, name: 'Contact', price: 300 }
      ]
    },
    {
      id: 4,
      name: 'Template 4',
      price: 4500,
      pages: [
        { id: 1, name: 'Home', price: 800 },
        { id: 2, name: 'Services', price: 600 },
        { id: 3, name: 'Portfolio', price: 900 }
      ]
    }
  ],
  software: [
    {
      id: 5,
      name: 'Template 5',
      price: 5000,
      pages: [
        { id: 1, name: 'Home', price: 1000 },
        { id: 2, name: 'About', price: 800 },
        { id: 3, name: 'Contact', price: 600 }
      ]
    },
    {
      id: 6,
      name: 'Template 6',
      price: 6000,
      pages: [
        { id: 1, name: 'Home', price: 1200 },
        { id: 2, name: 'Services', price: 1000 },
        { id: 3, name: 'Portfolio', price: 1400 }
      ]
    }
  ]
};

// Feature data
const featureData = {
  website: [
    { id: 1, name: 'Responsive Design', price: 100 },
    { id: 2, name: 'Customizable', price: 200 },
    { id: 3, name: 'SEO Optimized', price: 300 }
  ],
  application: [
    { id: 4, name: 'Secure', price: 400 },
    { id: 5, name: 'Scalable', price: 500 },
    { id: 6, name: 'Load Balancing', price: 600 }
  ],
  software: [
    { id: 7, name: 'Cloud Hosting', price: 700 },
    { id: 8, name: 'Database Management', price: 800 },
    { id: 9, name: 'API Integration', price: 900 }
  ]
};

// Project type select element
const projectTypeSelect = $('#project-type');

// Template container element
const templateContainer = $('#template-container');

// Feature container element
const featureContainer = $('#feature-container');

// Function to update template options
function updateTemplateOptions() {
  const projectType = projectTypeSelect.val();
  const templates = templateData[projectType];

  templateContainer.empty();

  $.each(templates, (index, template) => {
    const templateHtml = `
      <div class="template">
        <h4>${template.name}</h4>
        <p>Price: $${template.price}
          <ul>
          ${template.pages.map((page) => `
            <li>
              <input type="checkbox" class="page-checkbox" value="${page.price}" />
              <span>${page.name}</span>
              <span>($${page.price})</span>
            </li>
          `).join('')}
        </ul>
        <button class="view-template" data-template="${template.id}" data-url="https://example.com/template/${template.id}">View Template</button>
        <input type="radio" name="template" class="select-button" data-template="${template.id}" value="${template.price}" />
      </div>
    `;

    templateContainer.append(templateHtml);
  });

  updateQuoteResult();
}

// Function to update feature options
function updateFeatureOptions() {
  const projectType = projectTypeSelect.val();
  const features = featureData[projectType];

  featureContainer.empty();

  $.each(features, (index, feature) => {
    const featureHtml = `
      <label>
        ${feature.name}:
        <input type="checkbox" class="feature-checkbox" value="${feature.price}" />
      </label>
    `;

    featureContainer.append(featureHtml);
  });

  updateQuoteResult();
}

// Function to update quote result
function updateQuoteResult() {
  const projectType = projectTypeSelect.val();
  const templatePrice = parseFloat($('input[name="template"]:checked').val());
  const pagePrices = getPagePrices();
  const featurePrices = getFeaturePrices();
  const discountRequest = $('#discount-request-checkbox').is(':checked');
  const discountAmount = parseFloat($('#discount-amount-input').val());

  const quoteAmount = calculateQuoteAmount(templatePrice, pagePrices, featurePrices);
  const total = calculateTotal(quoteAmount, discountRequest, discountAmount);

  $('#quote-amount-value').text(`$${quoteAmount.toFixed(2)}`);
  $('#template-price').text(`$${templatePrice.toFixed(2)}`);
  $('#page-prices').text(`$${pagePrices.toFixed(2)}`);
  $('#feature-prices').text(`$${featurePrices.toFixed(2)}`);
  $('#total-amount').text(`$${total.toFixed(2)}`);
}

// Function to get page prices
function getPagePrices() {
  let pagePrices = 0;

  $('.page-checkbox:checked').each((index, checkbox) => {
    pagePrices += parseFloat($(checkbox).val());
  });

  return pagePrices;
}

// Function to get feature prices
function getFeaturePrices() {
  let featurePrices = 0;

  $('.feature-checkbox:checked').each((index, checkbox) => {
    featurePrices += parseFloat($(checkbox).val());
  });

  return featurePrices;
}

// Function to calculate quote amount
function calculateQuoteAmount(templatePrice, pagePrices, featurePrices) {
  return templatePrice + pagePrices + featurePrices;
}

// Function to calculate total
function calculateTotal(quoteAmount, discountRequest, discountAmount) {
  if (discountRequest) {
    return quoteAmount - discountAmount;
  } else {
    return quoteAmount;
  }
}

// Initialize template and feature options
$(document).ready(() => {
  updateTemplateOptions();
  updateFeatureOptions();
});

// Update template and feature options on project type change
projectTypeSelect.change(() => {
  updateTemplateOptions();
  updateFeatureOptions();
});
// Update quote result on template change
$('input[name="template"]').change(updateQuoteResult);

// Update quote result on page checkbox change
$('.page-checkbox').change(updateQuoteResult);

// Update quote result on feature checkbox change
$('.feature-checkbox').change(updateQuoteResult);

// Update quote result on discount request checkbox change
$('#discount-request-checkbox').change(updateQuoteResult);

// Update quote result on discount amount input change
$('#discount-amount-input').keyup(updateQuoteResult);
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
