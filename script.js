//------------------------------------: Shop 
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

function init_shop()
{
  $('#project-type').html('');
  projectTypes.forEach((s) =>
  { 
      console.log(s);
      $('#project-type').append($('<li/>').attr('value' , s.id).html(s.name)) ;
  });
}

init_shop()

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
