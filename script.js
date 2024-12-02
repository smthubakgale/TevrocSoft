//------------------------------------: Shop 
// Project type select element
const projectTypeSelect = $('#project-type');

// Plan select element
const planSelect = $('#plan');

// Project estimation input element
const projectEstimationInput = $('#project-estimation');

// Template select elements
const templateSelect = $('input[name="template"]');

// Page checkboxes
const pageCheckboxes = $('.page-checkbox');

// Feature checkboxes
const featureCheckboxes = $('.feature-checkbox');

// Discount request checkbox
const discountRequestCheckbox = $('#discount-request-checkbox');

// Discount amount input
const discountAmountInput = $('#discount-amount-input');

// Quote result elements
const quoteAmountValue = $('#quote-amount-value');
const templatePrice = $('#template-price');
const pagePrices = $('#page-prices');
const featurePrices = $('#feature-prices');
const totalAmount = $('#total-amount');

// Plans data
const plansData = {
  website: [
    { id: 1, name: 'Basic', price: 1000, pages: 5, features: ['Responsive Design', 'Customizable'] },
    { id: 2, name: 'Premium', price: 3000, pages: 10, features: ['Responsive Design', 'Customizable', 'SEO Optimized'] },
    { id: 3, name: 'Enterprise', price: 5000, pages: 20, features: ['Responsive Design', 'Customizable', 'SEO Optimized', 'Secure', 'Scalable'] }
  ],
  application: [
    { id: 4, name: 'Basic', price: 2000, pages: 5, features: ['Responsive Design', 'Customizable'] },
    { id: 5, name: 'Premium', price: 5000, pages: 10, features: ['Responsive Design', 'Customizable', 'SEO Optimized'] },
    { id: 6, name: 'Enterprise', price: 10000, pages: 20, features: ['Responsive Design', 'Customizable', 'SEO Optimized', 'Secure', 'Scalable'] }
  ],
  software: [
    { id: 7, name: 'Basic', price: 5000, pages: 5, features: ['Responsive Design', 'Customizable'] },
    { id: 8, name: 'Premium', price: 10000, pages: 10, features: ['Responsive Design', 'Customizable', 'SEO Optimized'] },
    { id: 9, name: 'Enterprise', price: 20000, pages: 20, features: ['Responsive Design', 'Customizable', 'SEO Optimized', 'Secure', 'Scalable'] }
  ]
};

// Function to update plan options
function updatePlanOptions() {
  const projectType = projectTypeSelect.val();
  const plans = plansData[projectType];

  planSelect.empty();

  $.each(plans, (index, plan) => {
    planSelect.append(`<option value="${plan.id}">${plan.name} ($${plan.price})</option>`);
  });

  updateQuoteResult();
}

// Function to update quote result
function updateQuoteResult() {
  const projectType = projectTypeSelect.val();
  const planId = planSelect.val();
  const projectEstimation = parseFloat(projectEstimationInput.val());
  const templatePriceValue = parseFloat(templateSelect.val());
  const pagePricesValue = getPagePrices();
  const featurePricesValue = getFeaturePrices();
  const discountRequest = discountRequestCheckbox.is(':checked');
  const discountAmount = parseFloat(discountAmountInput.val());

  const plan = getPlan(projectType, planId);

  if (plan) {
    const quoteAmount = calculateQuoteAmount(plan, projectEstimation, templatePriceValue, pagePricesValue, featurePricesValue);
    const total = calculateTotal(quoteAmount, discountRequest, discountAmount);

    quoteAmountValue.text(`$${quoteAmount.toFixed(2)}`);
    templatePrice.text(`$${templatePriceValue.toFixed(2)}`);
    pagePrices.text(`$${pagePricesValue.toFixed(2)}`);
    featurePrices.text(`$${featurePricesValue.toFixed(2)}`);
    totalAmount.text(`$${total.toFixed(2)}`);
  }
}

// Function to get plan
function getPlan(projectType, planId) {
  const plans = plansData[projectType];

  return plans.find((plan) => plan.id === parseInt(planId));
}

// Function to calculate quote amount
function calculateQuoteAmount(plan, projectEstimation, templatePriceValue, pagePricesValue, featurePricesValue) {
  return plan.price + projectEstimation + templatePriceValue + pagePricesValue + featurePricesValue;
}

// Function to calculate total
function calculateTotal(quoteAmount, discountRequest, discountAmount) {
  if (discountRequest) {
    return quoteAmount - discountAmount;
      } else {
    return quoteAmount;
  }
}

// Function to get page prices
function getPagePrices() {
  let pagePrices = 0;

  pageCheckboxes.each((index, checkbox) => {
    if ($(checkbox).is(':checked')) {
      pagePrices += parseFloat($(checkbox).val());
    }
  });

  return pagePrices;
}

// Function to get feature prices
function getFeaturePrices() {
  let featurePrices = 0;

  featureCheckboxes.each((index, checkbox) => {
    if ($(checkbox).is(':checked')) {
      featurePrices += parseFloat($(checkbox).val());
    }
  });

  return featurePrices;
}

// Initialize plan options
$(document).ready(() => {
  updatePlanOptions();
});

// Update plan options on project type change
projectTypeSelect.change(updatePlanOptions);

// Update quote result on plan change
planSelect.change(updateQuoteResult);

// Update quote result on project estimation change
projectEstimationInput.keyup(updateQuoteResult);

// Update quote result on template change
templateSelect.change(updateQuoteResult);

// Update quote result on page checkbox change
pageCheckboxes.change(updateQuoteResult);

// Update quote result on feature checkbox change
featureCheckboxes.change(updateQuoteResult);

// Update quote result on discount request checkbox change
discountRequestCheckbox.change(updateQuoteResult);

// Update quote result on discount amount input change
discountAmountInput.keyup(updateQuoteResult);
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
