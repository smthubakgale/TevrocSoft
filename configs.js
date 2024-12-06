
//----------------: Shop
//: Specifications
 export const formConfig = {
	 "fields": [ 
	        {
		   group:"Document",
		   label: "Members",
		   name: "members",
		   type: "subform", 
	           button: "Member",
		   multiple:true ,
		   description: "Specify all the members involved " ,
		   fields: [
			{
			  "label": "Member Id",
			  "type": "number",
			  "name": "id",
			  "required": true ,
			   readonly:true ,
			   description:"it will auto generate thus readonly"
			},
			{
			  "label": "Email Address",
			  "type": "email",
			  "name": "email",
			  "required": true ,
			  description: "Enter the Member's Email Address"
			},
			{
			  "label": "First Name",
			  "type": "text",
			  "name": "fname",
			  "required": true ,
			  description: "Enter the Member's First Name"
			},
			{
			  "label": "Middle Name",
			  "type": "text",
			  "name": "mname",
			  "required": false ,
			   description: "Enter Member's middle name (Optional)"
			},
			{
			   "label": "Last Name",
			   "type": "text",
			   "name": "lname",
			   "required": true ,
			   description:"Enter Member's Last Name"
			},
			{
			  "label": "Github Username",
			  "type": "text",
			  "name": "github",
			  "required": true,
			   description:"Enter Member's Github Username"
			}
		  ]
		},
	        {
		   group:"Document" ,
		   label: "Development Tools" ,
		   name: "dev",
		   type: "subform",  
		   description: "Specify the development tools needed " ,
		   fields: [
			{
			  "label": "Programming Language",
			  "type": "subform",
			  "name": "lang",
		           multiple:true ,
			   button: "Language",
			   description:"Specify the programming languages" ,
			   fields : [
			      {
				 label : "Language ID" ,
				 type : "number" ,
				 readonly:true , 
				 autoincrement: true , 
				 name : "id" ,
				 description : "it will auto generate thus readonly" 
			      } ,
			      {
				 label : "Name" ,
				 type : "text" ,
				 name : "name" ,
				 description : "Enter the programming language of your choice",
				 autocomplete:true ,
				 suggestions : [ "" ]
			      } 
			   ]
			},
			{
			  "label": "Development Framework",
			  "type": "subform",
			  "name": "framework", 
		           multiple:true , 
			   button: "Framework",
			   description: "Specify the different frameworks",
			   fields : [
			      {
				 label : "Framework ID" ,
				 type : "number" ,
				 name : "id" ,
				 autoincrement: true , 
				 readonly:true , 
				 description : "it will auto generate thus readonly"
			      } ,
			      {
				 label : "Name" ,
				 type : "text" ,
				 name : "name" ,
				 description : "Enter the framework of your choice",
				 autocomplete:true ,
				 suggestions : [ "" ]
			      } ,
			      {
				 label : "Author" ,
				 type : "text" ,
				 name : "author" ,
				 description : "Enter the author details "
			      } ,
			      {
				 label : "Description" ,
				 type : "text" ,
				 name : "desc" ,
				 description : "Enter the framework description"
			      } 
			   ]
			},
			{
			  "label": "Integrated Development Environment (IDE) ",
			  "type": "subform",
			  "name": "ide", 
		           multiple:true , 
			   button: "IDE",
			   description: "Specify the different ides",
			   fields : [
			      {
				 label : "IDE ID" ,
				 type : "number" ,
				 name : "id" ,
				 autoincrement: true , 
				 readonly:true , 
				 description : "it will auto generate thus readonly"
			      } ,
			      {
				 label : "Name" ,
				 type : "text" ,
				 name : "name" ,
				 description : "Enter the ide of your choice",
				 autocomplete:true ,
				 suggestions : [ "" ]
			      } 
			   ]
			},
			{
			  "label": "Software Development Kit (SDK)",
			  "type": "subform",
			  "name": "sdk", 
		           multiple:true , 
			   button: "SDK",
			   description: "Specify the different sdks",
			   fields : [
			      {
				 label : "SDK ID" ,
				 type : "number" ,
				 name : "id" ,
				 readonly:true , 
				 autoincrement: true , 
				 description : "it will auto generate thus readonly"
			      } ,
			      {
				 label : "Name" ,
				 type : "text" ,
				 name : "name" ,
				 description : "Enter the sdk of your choice",
				 autocomplete:true ,
				 suggestions : [ "" ]
			      } 
			   ]
			} 
		  ]
		},
	        {
		   group : "Development" ,
		   label: "Application Logo",
		   name: "logo_png",
		   type: "file",
		   accept:".png" ,
		   description: "Upload your icon in .png format"
		},
		{
		   group : "Development" ,
		   label: "Apprication Icon",
		   name: "logo_ico",
		   type: "file",
		   accept:".ico" ,
		   description: "Upload your icon in .ico format"
		},
		{
		  "label": "Password",
		  "type": "password",
		  "name": "password",
		  "required": true
		},
		{
		  "label": "IPs",
		  "type": "subform",
		  "name": "ips",
		  "fields": [
			{
			  "label": "IP",
			  "type": "text",
			  "name": "ip",
			  "required": true
			}
		  ]
		},
		{
		  "label": "Browsers",
		  "type": "subform",
		  "name": "browsers",
		  "fields": [
			{
			  "label": "Browser",
			  "type": "text",
			  "name": "browser",
			  "required": true
			}
		  ]
		},
		{
		  "label": "Projects",
		  "type": "subform",
		  "name": "projects",
		  "fields": [
			{
			  "label": "Project",
			  "type": "text",
			  "name": "project",
			  "required": true
			}
		  ]
		},
		{
		  "label": "ANCs",
		  "type": "subform",
		  "name": "ancs",
		  "fields": [
			{
			  "label": "ANC",
			  "type": "text",
			  "name": "anc",
			  "required": true
			}
		  ]
		},
		{
		  "label": "Type",
		  "type": "text",
		  "name": "type",
		  "required": true
		},
		{
		  "label": "Files",
		  "type": "subform",
		  "name": "files",
		  "fields": [
			{
			  "label": "File",
			  "type": "text",
			  "name": "file",
			  "required": true
			}
		  ]
		},
		{
		  "label": "Temps",
		  "type": "subform",
		  "name": "temps",
		  "fields": [
			{
			  "label": "Temp",
			  "type": "text",
			  "name": "temp",
			  "required": true
			}
		  ]
		},
		{
		  "label": "SQL",
		  "type": "subform",
		  "name": "sql",
		  "fields": [
			{
			  "label": "SQL",
			  "type": "text",
			  "name": "sql",
			  "required": true
			}
		  ]
		},
		{
		  "label": "UI API",
		  "type": "subform",
		  "name": "ui_api",
		  "fields": [
			{
			  "label": "UI API",
			  "type": "text",
			  "name": "ui_api",
			  "required": true
			}
		  ]
		},
		 {
		  "label": "Social Auth",
		  "type": "subform",
		  "name": "social_auth",
		  "fields": [
			{
			  "label": "Social Auth",
			  "type": "text",
			  "name": "social_auth",
			  "required": true
			}
		  ]
		}
	  ]
	};
//: Requirements
export const formConfig2 = {
  fields: [
    {
      label: "Application Name",
      name: "--name",
      type: "text",
      description: "Enter the name of the application"
    },
    {
      label: "Development Namespace",
      name: "--group",
      type: "text",
      description: "the namespace or package of the application"
    },
    {
      label: "Organization/Company",
      name: "--company",
      type: "text",
      description: "Enter the group or comany name of the developer(s)"
    },
    {
      label: "Development Team Leader",
      name: "--author",
      type: "text",
      description: "Enter developer or member details"
    },
    {
      label: "Licence",
      name: "--license",
      type: "select",
      seemore : true , 
      title : "Select  one the development licenses ... " ,
      description: (function() {
	    var xhr = new XMLHttpRequest();
	    xhr.open('GET', 'blogs/github-licenses.html', false); // synchronous request
	    xhr.send();
	    return xhr.responseText;
	  })()
,
      options: [
	        {
	          label: 'MIT License',
	          value: 'MIT License',
	        },
	        {
	          label: 'Apache License 2.0',
	          value: 'Apache License 2.0',
	        },
	        {
	          label: 'GNU General Public License v3.0',
	          value: 'GNU General Public License v3.0',
	        },
	        {
	          label: 'BSD 3-Clause "New" or "Revised" License',
	          value: 'BSD 3-Clause "New" or "Revised" License',
	        },
	        {
	          label: 'Mozilla Public License 2.0',
	          value: 'Mozilla Public License 2.0',
	        },
	        {
	          label: 'Unlicense',
	          value: 'Unlicense',
	        },
	        {
	          label: 'GNU Affero General Public License v3.0',
	          value: 'GNU Affero General Public License v3.0',
	        },
	        {
	          label: 'Eclipse Public License 2.0',
	          value: 'Eclipse Public License 2.0',
	        },
	        {
	          label: 'Creative Commons Zero v1.0 Universal',
	          value: 'Creative Commons Zero v1.0 Universal',
	        },
	        {
	          label: 'GNU Lesser General Public License v3.0',
	          value: 'GNU Lesser General Public License v3.0',
	        },
      ],
      required: true, 
    },
    {
      label: "Specification File Location",
      name: "--config",
      type: "text",
      description: "the relative or absolute path of the configuration json file ,  e.g src/configs.json"
    },
    {
      label: "Development Framework",
      name: "--frame",
      type: "select",
      seemore : true , 
      title : "Select  one the platform specific frameworks ... " ,
      description: (function() {
	    var xhr = new XMLHttpRequest();
	    xhr.open('GET', 'blogs/development-frameworks.html', false); // synchronous request
	    xhr.send();
	    return xhr.responseText;
	  })() 
	,
    	"optgroups": [ 
	    {
	      "label": "Web Development",
	      "options": [
	        { "value": "HTML5", "label": "HTML 5" },
	        { "value": "Flask", "label": "Flask" },
	        { "value": "PHP", "label": "PHP" },
	        { "value": "MVC", "label": "MVC" },
	        { "value": "Express", "label": "Express" },
	        { "value": "Spring Boot", "label": "Spring Boot" }
	      ]
	    },
	    {
	      "label": "Mobile App Development",
	      "options": [
	        { "value": "Xamarin.Android", "label": "Xamarin Android" },
	        { "value": "Java.Android", "label": "Java Android" }
	      ]
	    },
	    {
	      "label": "Desktop Application Development",
	      "optgroups": [
	        {
	          "label": "GUI Development",
	          "options": [
	            { "value": "Electron", "label": "Electron" },
	            { "value": "JavaFX", "label": "JavaFX" },
	            { "value": "Owin.Core", "label": "Owin Core" },
	            { "value": "PyWeb", "label": "PyWeb" }
	          ]
	        },
	        {
	          "label": "Console Application Development",
	          "options": [
	            { "value": "Maven", "label": "Maven" },
	            { "value": "C#", "label": "C Sharp" }
	          ]
	        },
	        {
	          "label": "Hybrid Application Development",
	          "options": [
	            { "value": "Tomcat", "label": "Tomcat" },
	            { "value": "Flask.Electron", "label": "Flask Electron" },
	            { "value": "Electron.SpringBoot", "label": "Electron Spring Boot" },
	            { "value": "Owin.Framework", "label": "Owin Framework" },
	            { "value": "Owin.Flask", "label": "Owin Flask" }
	          ]
	        }
	      ]
	    } 
	]
    },
    {
      label: "Interface Design Layouts",
      name: "--layout",
      type: "select",
      seemore : true , 
      title : "Select  one the ui layouts ... " ,
      description: (function() {
	    var xhr = new XMLHttpRequest();
	    xhr.open('GET', 'blogs/ui-layouts.html', false); // synchronous request
	    xhr.send();
	    return xhr.responseText;
	  })()
    ,
   options : [
    { value: "empty", label: "Empty" },
    { value: "horizontal", label: "Horizontal" },
    { value: "detached", label: "Detached" },
    { value: "two-column", label: "Two Column" },
    { value: "vertical", label: "Vertical" },
    { value: "grid", label: "Grid" },
    { value: "masonry", label: "Masonry" },
    { value: "flexbox", label: "Flexbox" },
    { value: "bootstrap", label: "Bootstrap" },
    { value: "material-design", label: "Material Design" },
    { value: "parallax", label: "Parallax" },
    { value: "single-page", label: "Single-Page" },
    { value: "multi-page", label: "Multi-Page" },
    { value: "responsive", label: "Responsive" },
    { value: "adaptive", label: "Adaptive" },
    { value: "liquid", label: "Liquid" },
    { value: "elastic", label: "Elastic" },
    { value: "fixed", label: "Fixed" },
    { value: "sticky", label: "Sticky" },
    { value: "off-canvas", label: "Off-Canvas" },
    { value: "split-screen", label: "Split-Screen" },
    { value: "brick", label: "Brick" },
    { value: "magazine", label: "Magazine" },
    { value: "newspaper", label: "Newspaper" },
    { value: "portfolio", label: "Portfolio" },
    { value: "gallery", label: "Gallery" },
    { value: "carousel", label: "Carousel" },
    { value: "slider", label: "Slider" },
    { value: "accordion", label: "Accordion" },
    { value: "tabbed", label: "Tabbed" },
    { value: "collapsible", label: "Collapsible" },
    { value: "expandable", label: "Expandable" }
  ]},
    {
      label: "Template",
      name: "--template",
      type: "select",
      seemore : true , 
      title : "Select one of the recommended templates ... " ,
      description: (function() {
	    var xhr = new XMLHttpRequest();
	    xhr.open('GET', 'blogs/templates.html', false); // synchronous request
	    xhr.send();
	    return xhr.responseText;
	  })()
     ,
      optgroups:[
        {
	   label:"Admin Templates",
	   options: [
	      { "value": "AdminLTE", "label": "AdminLTE" },
	      { "value": "SB Admin 2", "label": "SB Admin 2" },
	      { "value": "Materialize Admin", "label": "Materialize Admin" },
	      { "value": "Gentelella", "label": "Gentelella" },
	      { "value": "Ample Admin", "label": "Ample Admin" },
	      { "value": "Flat Admin", "label": "Flat Admin" },
	      { "value": "Modern Admin", "label": "Modern Admin" },
	      { "value": "CoreUI", "label": "CoreUI" },
	      { "value": "Tabler", "label": "Tabler" }  
	   ]
        },
        {
	   label:"Web Application Templates",
	   options: [
	      { "value": "Bootstrap Templates", "label": "Bootstrap Templates" },
	      { "value": "HTML5 UP", "label": "HTML5 UP" },
	      { "value": "Templated", "label": "Templated" },
	      { "value": "CSS Templates", "label": "CSS Templates" },
	      { "value": "Free CSS Templates", "label": "Free CSS Templates" },
	      { "value": "W3Layouts", "label": "W3Layouts" },
	      { "value": "TemplateMonster", "label": "TemplateMonster" },
	      { "value": "ThemeForest", "label": "ThemeForest" },
	      { "value": "Creative Market", "label": "Creative Market" }  
	   ]
        },
        {
	   label:"Mobile Application Templates",
	   options: [
	      { "value": "HTML5 Mobile Templates", "label": "HTML5 Mobile Templates" },
	      { "value": "Mobile Bootstrap Templates", "label": "Mobile Bootstrap Templates" },
	      { "value": "Onsen UI Templates", "label": "Onsen UI Templates" },
	      { "value": "Framework7 Templates", "label": "Framework7 Templates" },
	      { "value": "Ionic Templates", "label": "Ionic Templates" },
	      { "value": "React Native Templates", "label": "React Native Templates" },
	      { "value": "Flutter Templates", "label": "Flutter Templates" }  
	   ]
        },
        {
	   label:"Landing Page Templates",
	   options: [
	      { "value": "Landing Page Templates", "label": "Landing Page Templates" },
	      { "value": "One Page Love", "label": "One Page Love" },
	      { "value": "Landkit", "label": "Landkit" },
	      { "value": "Launchkit", "label": "Launchkit" },
	      { "value": "Startup Template", "label": "Startup Template" },
	      { "value": "Landing Template", "label": "Landing Template" },
	      { "value": "OnePage Template", "label": "OnePage Template" },
	      { "value": "TemplateKit", "label": "TemplateKit" }  
	   ]
        },
        {
	   label:"E-commerce Templates" ,
	   options: [
	     { "value": "E-commerce Templates", "label": "E-commerce Templates" },
	     { "value": "OpenCart Templates", "label": "OpenCart Templates" },
	     { "value": "PrestaShop Templates", "label": "PrestaShop Templates" },
	     { "value": "WooCommerce Templates", "label": "WooCommerce Templates" },
	     { "value": "Magento Templates", "label": "Magento Templates" },
	     { "value": "Shopify Templates", "label": "Shopify Templates" },
	     { "value": "BigCommerce Templates", "label": "BigCommerce Templates" }
	   ]
        },
        {
	   label:"Blog Templates",
	   options: [
	     { "value": "Blog Templates", "label": "Blog Templates" },
	     { "value": "WordPress Themes", "label": "WordPress Themes" },
	     { "value": "Blogger Templates", "label": "Blogger Templates" },
	     { "value": "Joomla Templates", "label": "Joomla Templates" },
	     { "value": "Drupal Themes", "label": "Drupal Themes" }   
	   ]
        }
      ]
    }
  ]
};
//: Quotes 
export const projectTypes = [
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

export const templates = [
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
export const complexityMultipliers = {
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

export const projectTypeMultipliers = {
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

export const projectDurationMultipliers = (days) => {
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
//:
//----------------: General 
