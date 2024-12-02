//------------------------------------: Shop 
// Project type selection handler
document.getElementById('project-type').addEventListener('change', () => {
  const projectType = document.getElementById('project-type').value;
  const planSelection = document.getElementById('plan-selection');
  planSelection.innerHTML = `
    <label for="plan">Plan:</label>
    <select id="plan" name="plan" required>
      <option value="">Select Plan</option>
    </select>
  `;

  if (projectType === 'web-development') {
    document.getElementById('plan').innerHTML += `
      <option value="basic-web" data-price="5000">Basic (R5,000)</option>
      <option value="premium-web" data-price="25000">Premium (R25,000)</option>
      <option value="enterprise-web" data-price="custom">Enterprise (Custom Quote)</option>
    `;
  } else if (projectType === 'desktop-application') {
    document.getElementById('plan').innerHTML += `
      <option value="basic-desktop" data-price="10000">Basic (R10,000)</option>
      <option value="premium-desktop" data-price="50000">Premium (R50,000)</option>
      <option value="enterprise-desktop" data-price="custom">Enterprise (Custom Quote)</option>
    `;
  } else if (projectType === 'mobile-application') {
    document.getElementById('plan').innerHTML += `
      <option value="basic-mobile" data-price="8000">Basic (R8,000)</option>
      <option value="premium-mobile" data-price="40000">Premium (R40,000)</option>
      <option value="enterprise-mobile" data-price="custom">Enterprise (Custom Quote)</option>
    `;
  }

  planSelection.style.display = 'block';

  // Update quote result
  updateQuoteResult();
});

// Plan selection handler
document.getElementById('plan').addEventListener('change', () => {
  updateQuoteResult();
});

// Discount request checkbox handler
document.getElementById('discount-request-checkbox').addEventListener('change', () => {
  const discountRequestAmount = document.getElementById('discount-request-amount');
  if (document.getElementById('discount-request-checkbox').checked) {
    discountRequestAmount.disabled = false;
  } else {
    discountRequestAmount.disabled = true;
    discountRequestAmount.value = '';
  }

  // Update quote result
  updateQuoteResult();
});

// Discount request amount handler
document.getElementById('discount-request-amount').addEventListener('input', () => {
  updateQuoteResult();
});

// Update quote result function
function updateQuoteResult() {
  const projectType = document.getElementById('project-type').value;
  const plan = document.getElementById('plan').value;
  let quoteAmount = 0;

  const planPrice = document.querySelector(`#plan [value="${plan}"]`).getAttribute('data-price');
  if (planPrice !== 'custom') {
    quoteAmount = parseInt(planPrice);
  } else {
    quoteAmount = 'Custom Quote';
  }

  const discountRequestCheckbox = document.getElementById('discount-request-checkbox');
  const discountRequestAmount = document.getElementById('discount-request-amount');

  if (discountRequestCheckbox.checked && discountRequestAmount.value !== '') {
    const discountAmount = (quoteAmount * parseFloat(discountRequestAmount.value)) / 100;
    quoteAmount -= discountAmount;
  }

  if (quoteAmount === 'Custom Quote') {
    document.getElementById('quote-amount').innerHTML = quoteAmount;
  } else {
    document.getElementById('quote-amount').innerHTML = `Quote Amount: R${quoteAmount.toFixed(2)}`;
  }
}
function updateQuoteResult() {
  
}
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
