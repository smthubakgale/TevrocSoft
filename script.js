//------------------------------------: Shop 
 // Initialize EmailJS
// Template group header toggle
document.querySelectorAll('#shop .template-group-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
  });
});

// Calculate project timeline phases
function calculateProjectTimelinePhases(startDate, endDate) {
  const projectDuration = Math.round((endDate - startDate) / (1000 * 3600 * 24));

  // Estimated phase durations (in weeks)
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

// Form submission handler
document.getElementById('custom-quote-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const startDate = new Date(document.getElementById('start-date').value);
  const endDate = new Date(document.getElementById('end-date').value);

  const projectTimelinePhases = calculateProjectTimelinePhases(startDate, endDate);

  const projectTimelineEstimation = `
    Discovery Phase: ${projectTimelinePhases.discoveryPhase} weeks
    Design Phase: ${projectTimelinePhases.designPhase} weeks
    Development Phase: ${projectTimelinePhases.developmentPhase} weeks
    Testing Phase: ${projectTimelinePhases.testingPhase} weeks
    Launch Phase: ${projectTimelinePhases.launchPhase} weeks
  `;

  updateQuoteResult(10000, "Breakdown: ...", projectTimelineEstimation);
});

// Preview button handler
document.querySelectorAll('#shop .preview-button').forEach(button => {
  button.addEventListener('click', () => {
    const url = button.getAttribute('data-url');
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
      <iframe src="${url}" frameborder="0" width="100%" height="100%"></iframe>
      <button class="close-button">Back</button>
    `;

    document.body.appendChild(popup);

    document.querySelector('.close-button').addEventListener('click', () => {
      popup.remove();
    });
  });
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
