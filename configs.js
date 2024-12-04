
//----------------: Shop
//: Specifications
 export const formConfig = {
	  "fields": [
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
      description: `
<h1>Github Licenses</h1>
<table border="1" cellpadding="5" cellspacing="0">
  <tr>
    <th>License Name</th>
    <th>Description</th>
    <th>Restrictions</th>
  </tr>
  <tr>
    <td><a href="https://opensource.org/licenses/MIT">MIT License</a></td>
    <td>Permissive license that allows free use, modification, and distribution.</td>
    <td>None</td>
  </tr>
  <tr>
    <td><a href="https://www.apache.org/licenses/LICENSE-2.0">Apache License 2.0</a></td>
    <td>Permissive license that allows free use, modification, and distribution, with some additional provisions for patent grants and trademark usage.</td>
    <td>None</td>
  </tr>
  <tr>
    <td><a href="https://opensource.org/licenses/BSD-3-Clause">BSD 3-Clause License</a></td>
    <td>Permissive license that allows free use, modification, and distribution, with some additional provisions for copyright notices and warranty disclaimers.</td>
    <td>None</td>
  </tr>
  <tr>
    <td><a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GPLv3</a></td>
    <td>Copyleft license that requires users to make any modifications or derivative works available under the same license.</td>
    <td>Restrictive</td>
  </tr>
  <tr>
    <td><a href="https://www.gnu.org/licenses/lgpl-3.0.en.html">LGPLv3</a></td>
    <td>Copyleft license that is similar to GPLv3, but allows for more flexibility in terms of linking with proprietary software.</td>
    <td>Restrictive</td>
  </tr>
  <tr>
    <td><a href="https://www.gnu.org/licenses/agpl-3.0.en.html">AGPLv3</a></td>
    <td>Copyleft license that is similar to GPLv3, but requires users to make any modifications or derivative works available under the same license, even if the software is used over a network.</td>
    <td>Restrictive</td>
  </tr>
  <tr>
    <td><a href="https://unlicense.org/">Unlicense</a></td>
    <td>Public domain license that dedicates your software to the public domain, waiving all copyright and related rights.</td>
    <td>None</td>
  </tr>
  <tr>
    <td><a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0</a></td>
    <td>Public domain license that dedicates your software to the public domain, waiving all copyright and related rights.</td>
    <td>None</td>
  </tr>
  <tr>
    <td><a href="https://www.mozilla.org/en-US/MPL/2.0/">MPL 2.0</a></td>
    <td>License that is similar to the LGPL, but with some additional provisions for patent grants and trademark usage.</td>
    <td>Restrictive</td>
  </tr>
  <tr>
    <td><a href="https://www.eclipse.org/legal/epl-v20.html">EPL 2.0</a></td>
    <td>License that is similar to the LGPL, but with some additional provisions for patent grants and trademark usage.</td>
    <td>Restrictive</td>
  </tr>
</table>      
      `,
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
      description: `
  <h3>Development Expertise</h3>
  <b>1. Web Development</b>
  <ul>
    <li>"html5" - Standard markup framework for web content</li>
    <li>"flask" - Lightweight Python web framework</li>
    <li>"php" - Server-side scripting framework</li>
    <li>"mvc" - Model-View-Controller architectural framework</li>
    <li>"express" - Node.js web application framework</li>
    <li>"springboot" - Java-based web application framework</li>
  </ul>

  <b>2. Mobile App Development</b>
  <ul>
    <li>"xamarin.android" - Cross-platform mobile app framework</li>
    <li>"java.android" - Android mobile app development framework</li>
  </ul>

  <b>3. Desktop Application Development</b>
  <ul>
    <li><i>GUI Development:</i></li>
    <ul>
      <li>"electron" - Cross-platform desktop app framework</li>
      <li>"javafx" - Java-based GUI framework</li>
      <li>"owin.core" - .NET-based web server framework</li>
      <li>"pyweb" - Python-based web framework</li>
    </ul>
    <li><i>Console Application Development:</i></li>
    <ul>
      <li>"maven" - Java-based build automation framework</li>
      <li>"csharp" - Object-oriented programming framework</li>
    </ul>
    <li><i>Hybrid Application Development:</i></li>
    <ul>
      <li>"tomcat" - Java-based web server framework</li>
      <li>"flask.electron" - Cross-platform desktop app framework</li>
      <li>"electron.springboot" - Cross-platform desktop app framework</li>
      <li>"owin.framework" - .NET-based web framework</li>
      <li>"owin.flask" - Cross-platform web framework</li>
    </ul>
  </ul> 
      ` , 
    	options :[
        {
          label: 'HTML5',
          value: 'html5',
        },
        {
          label: 'Flask',
          value: 'flask',
        },
        {
          label: 'PHP',
          value: 'php',
        },
        {
          label: 'MVC',
          value: 'mvc',
        },
        {
          label: 'Express',
          value: 'express',
        },
        {
          label: 'Spring Boot',
          value: 'springboot',
        },
        {
          label: 'Xamarin.Android',
          value: 'xamarin.android',
        },
        {
          label: 'Java.Android',
          value: 'java.android',
        },
        {
          label: 'Electron',
          value: 'electron',
        },
        {
          label: 'JavaFX',
          value: 'javafx',
        },
        {
          label: 'OWIN Core',
          value: 'owin.core',
        },
        {
          label: 'PyWeb',
          value: 'pyweb',
        },
        {
          label: 'Maven',
          value: 'maven',
        },
        {
          label: 'C#',
          value: 'csharp',
        },
        {
          label: 'Tomcat',
          value: 'tomcat',
        },
        {
          label: 'Flask.Electron',
          value: 'flask.electron',
        },
        {
          label: 'Electron.Spring Boot',
          value: 'electron.springboot',
        },
        {
          label: 'OWIN Framework',
          value: 'owin.framework',
        },
        {
          label: 'OWIN Flask',
          value: 'owin.flask',
        },
       ]
    },
    {
      label: "Interface Design Layouts",
      name: "--layout",
      type: "email",
      description: (function() {
	    var xhr = new XMLHttpRequest();
	    xhr.open('GET', 'blog.html', false); // synchronous request
	    xhr.send();
	    return xhr.responseText;
	  })()
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      description: "Enter your email address"
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
