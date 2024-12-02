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
// Function to calculate project estimation
function calculateProjectEstimation() {
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');
  const projectEstimationInput = document.getElementById('project-estimation');

  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);

  // Calculate date difference in hours
  const dateDifference = endDate.getTime() - startDate.getTime();
  const hoursDifference = dateDifference / (1000 * 3600);

  // Update project estimation input field
  projectEstimationInput.value = hoursDifference;
}

// Event listeners for start and end date inputs
document.getElementById('start-date').addEventListener('change', calculateProjectEstimation);
document.getElementById('end-date').addEventListener('change', calculateProjectEstimation);
// Function to update quote result
function updateQuoteResult() {
  const projectType = projectTypeSelect.value;
  const plan = planSelect.value;
  const projectEstimation = projectEstimationInput.value;
  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);
  const selectedTemplate = templateSelect.querySelector('.select-button:checked');
  const templateId = selectedTemplate ? selectedTemplate.getAttribute('data-template') : null;
  const discountRequestCheckbox = document.getElementById('discount-request-checkbox');
  const discountRequestAmount = discountAmountInput;

  let quoteAmount = 0;
  let discountAmount = 0;
  let totalAmount = 0;

  // Calculate quote amount based on plan and project estimation
  if (plan === 'basic') {
    quoteAmount = projectEstimation * 100;
  } else if (plan === 'premium') {
    quoteAmount = projectEstimation * 200;
  } else if (plan === 'enterprise') {
    quoteAmount = projectEstimation * 500;
  }
  console.log(quoteAmount);

  // Apply discount if requested
  if (discountRequestCheckbox.checked) {
    discountAmount = (quoteAmount * discountRequestAmount.value) / 100;
    totalAmount = quoteAmount - discountAmount;
  } else {
    totalAmount = quoteAmount;
  }
  console.log(quoteAmount);

  // Update quote result HTML
  quoteAmountValue.textContent = quoteAmount.toFixed(2);
  discountAmountInput.value = discountRequestAmount.value;
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
  const quoteAmount = quoteAmountValue.textContent;
  const discountAmount = discountAmountInput.value;
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
      Quote Amount: R${quoteAmount}
      Discount Amount: ${discountAmount}%
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
planSelect.addEventListener('change', updateQuoteResult);
projectEstimationInput.addEventListener('input', updateQuoteResult);
startDateInput.addEventListener('input', updateQuoteResult);
endDateInput.addEventListener('input', updateQuoteResult);
templateSelect.addEventListener('change', updateQuoteResult);
discountAmountInput.addEventListener('input', updateQuoteResult);

// Initialize quote result
updateQuoteResult();

  
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
