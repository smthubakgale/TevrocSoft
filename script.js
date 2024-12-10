import { 
  formConfig , formConfig2 , projectTypes , templates , complexityMultipliers , 
  projectTypeMultipliers , projectPhases ,projectPhaseMultipliers , projectDurationMultipliers 
  } from './configs.js';

//------------------------------------: Shop 
 // Initialize EmailJS 
 // load project types dynamically from the JSON array
  var projectTypeSelect = document.getElementById('project-type');
  const templateGroupsContainer = document.querySelector('.template-groups');
  const featuresContainer = document.getElementById('features-container');
  const planSelect = document.getElementById('plan-select');  
  const templatePageIframe = document.getElementById('template-page-iframe'); 
  const discountAmountInput = document.getElementById('discount-request-amount');
  const quoteAmountValue = document.getElementById('quote-amount-value');
  const projectPhasesList = document.getElementById('project-phases');
  
  // Template  header toggle
	document.querySelectorAll('#shop .template-group-header').forEach(header => {
	  header.addEventListener('click', () => {
		const content = header.nextElementSibling;
		content.style.display = content.style.display === 'none' ? 'block' : 'none';
	  });
	});
  //
class FormGenerator {
  constructor(form, importButton, fileInput, formConfig, fname , callback) {
    this.form = form;
    this.importButton = importButton;
    this.fileInput = fileInput;
    this.formConfig = formConfig;
    this.callback = callback;

    this.renderForm(fname);
    this.addEventListeners();
    this.loadFormDataFromLocalStorage();
  }
  createDescription(field){
      let description;
 
      if(field.title && field.seemore == true){
	description = document.createElement('div');
	const spanTitle = document.createElement('span');
	const span1 = document.createElement('span');
	const div2 = document.createElement('div');
	
        description.style.fontSize = "12px";
        description.style.paddingBottom = "4px";     
	spanTitle.textContent = field.title;
	spanTitle.style.color = "gray";
	span1.textContent = 'more';
	span1.style.color = '#007bff'; // blueish color
	span1.style.cursor = 'pointer' 
	div2.style.display = 'none'; 
        //div2.innerHTML = field.description;
	
	span1.addEventListener('click', () => {
	  if (div2.style.display === 'none') {
	    div2.style.display = 'block';
	    span1.textContent = 'less';
	    div2.innerHTML = field.description;
	  } else {
	    div2.style.display = 'none'; 
	    span1.textContent = 'more';
	    div2.innerHTML = "";
	  }
	});
	
	description.appendChild(spanTitle);
	description.appendChild(span1);
	description.appendChild(div2);
      }
      else {  
	description = document.createElement("small");
        description.innerHTML = field.description;
        description.style.color = "gray";
        description.style.fontSize = "12px";	    
      }
        
      return description;
  }
  checkNested(field , index){
      var ret = index + 0;
      if(field.optgroups)
      {  
        ret = index + 1;
	field.optgroups.forEach((optgroup)=>
        { 
	   var rf = this.checkNested(optgroup , ret);
           if(rf > ret)
	   {
	     ret = rf;
	   }
	}); 
      }
      return ret;
  }
  createAutoComplete(inputElement , textElement , suggestions)
  { 
	  
     function getNextDatalistId() {
	  window.dataListIds = window.dataListIds || [];
	  const nextId = window.dataListIds.length + 1;
	  window.dataListIds.push(nextId);
	  return `datalist-${nextId}`;
	}
     const datalistId = getNextDatalistId();
	  
     const datalist = document.createElement('datalist');
     datalist.id = datalistId;
     datalist.classList.add('dynamiclist');

    textElement.setAttribute('list', datalistId)
 
     inputElement.appendChild(datalist); 
     // Populate the datalist with suggestions
	suggestions = [...new Set(suggestions)].sort();
	  
	suggestions.forEach(suggestion => {
	  const option = document.createElement('option');
	  option.value = suggestion;
	  datalist.appendChild(option);
	}); 
      // 
  }
  createCheckboxButtons(field, parentElement, parentName) 
  {
     function getNextCheckboxId() {
	 window.checkboxIds = window.checkboxIds || [];
	 const nextId = window.checkboxIds.length + 1;
	 window.checkboxIds.push(nextId);
	 return `checkbox-${nextId}`;
     }

     const checkboxId = getNextCheckboxId();
 
     if(field.options){ 
	   field.options.forEach((option) => {
		let inputElement = document.createElement("input");
		inputElement.type = "checkbox";
		inputElement.name = `${parentName}_${field.name}`;
		inputElement.value = option.value;
		inputElement.required = field.required;
		inputElement.style.marginRight = '5px';
		inputElement.style.width = '15px';  
		
		const dv = document.createElement("div");
		dv.style.display = 'flex';
		const dv1 = document.createElement("div");
		dv1.append(inputElement);
		const dv2 = document.createElement("div"); 
		dv.style.flex = 1;

		dv2.innerHTML = option.value;
		dv2.style.paddingLeft = "10px";
		dv2.style.paddingTop = "7px";

		dv.appendChild(dv1);
		dv.appendChild(dv2);

		const lastChild = parentElement.children.length > 0 ? parentElement.children[parentElement.children.length - 1] : null;
		if(lastChild){
		   lastChild.style.marginBottom = "-25px"; 
		}
		 
		parentElement.appendChild(dv);
	      });   
     } 
     if(field.route)
     { 
	window.checkboxRefs = window.checkboxRefs || [];
	// 
	if(field.observe == "subform")
	{ 
		function createCheckboxButton(node , subform) {
		   
		        let inputElement = document.createElement("input");
			inputElement.type = "checkbox";
			inputElement.name = `${parentName}_${field.name}`;
			inputElement.value = node.value;
			inputElement.required = field.required;
			inputElement.style.marginRight = '5px';
			inputElement.style.width = '15px';  
			
			const dv = document.createElement("div");
			dv.style.display = 'flex';
			const dv1 = document.createElement("div");
			dv1.append(inputElement);
			const dv2 = document.createElement("div"); 
			dv.style.flex = 1;

			var tx = node.value;
			tx = (field.pre) ? field.pre + tx : tx;
			tx = (field.post) ? tx + field.post : tx;
			dv2.innerHTML = tx;
			dv2.style.paddingLeft = "10px";
			dv2.style.paddingTop = "7px";

			dv.appendChild(dv1);
			dv.appendChild(dv2);

			const lastChild = parentElement.children.length > 0 ? parentElement.children[parentElement.children.length - 1] : null;
			if(lastChild){
			   lastChild.style.marginBottom = "-25px"; 
			}
			 
		        parentElement.appendChild(dv);
			
		        checkboxRefs.push({ id : checkboxId , node: node  , ref : inputElement });

			if(field.routeref){
			   var descendants = subform.querySelectorAll("*");
		     
			   descendants.forEach(function(descendant) {
			       if (descendant.getAttribute('name') === field.routeref && !descendant.hasAttribute(checkboxId) ) { 
				   descendant.setAttribute(checkboxId, 'true'); 
				   if(descendant.value){ dv2.innerHTML = descendant.value; }
				   descendant.addEventListener('change', function() {
					if(descendant.value){ dv2.innerHTML = descendant.value; }
				   });
			       }
			   });
			}
		}
 
		// Create a MutationObserver instance
		  var observer2 = new MutationObserver(function(mutations)
                  {
		       mutations.forEach(function(mutation) 
		       {
		         if (mutation.addedNodes) 
		         {
		            mutation.addedNodes.forEach(function(node)
		            {
			       //:  
			       var subforms = document.querySelectorAll(".subform");  
			       subforms.forEach(function(subform)
			       { 
			           var descendants = subform.querySelectorAll("*");
			     
			           descendants.forEach(function(descendant) {
			               if (descendant.getAttribute('name') === field.route && !descendant.hasAttribute(checkboxId) ) {  
					   descendant.setAttribute(checkboxId, 'true'); 
					   createCheckboxButton(descendant , subform);
			               }
			           });
			       }); 
			       //:
		            });
		         }
	              });
	           }); 	  
		// Observe the document body for changes
		  observer2.observe(document.body, {
		     childList: true,
		     subtree: true
		  });     
	        // 
	}
     }
  }

  createRadioButtons(field, parentElement, parentName) 
  {
     function getNextRadioId() {
	 window.radioIds = window.radioIds || [];
	 const nextId = window.radioIds.length + 1;
	 window.radioIds.push(nextId);
	 return `radio-${nextId}`;
     }

     const radioId = getNextRadioId();
 
     if(field.options){
	   if(field.options.length == 0){ 
		let dv = document.createElement("div"); 
		dv.name = `${parentName}_${field.name}_empty`;
		parentElement.appendChild(dv);
	   }
	   field.options.forEach((option) => {
		inputElement = document.createElement("input");
		inputElement.type = "radio";
		inputElement.name = `${parentName}_${field.name}`;
		inputElement.value = option.value;
		inputElement.required = field.required;
	
		const labelElement = document.createElement("label");
		labelElement.textContent = option.label;
		labelElement.appendChild(inputElement);
	
		parentElement.appendChild(labelElement);
	      });   
     } 
     if(field.route)
     { 
	window.radioRefs = window.radioRefs || [];
	// 
	if(field.observe == "subform")
	{ 
		function createRadioButton(node , subform) {
		      
		       let inputElement = document.createElement("input");
			inputElement.type = "radio";
			inputElement.name = `${parentName}_${field.name}`;
			inputElement.value = node.value;
			inputElement.required = field.required;
			inputElement.style.marginRight = '5px';
			inputElement.style.width = '15px';  
			
			const dv = document.createElement("div");
			dv.style.display = 'flex';
			const dv1 = document.createElement("div");
			dv1.append(inputElement);
			const dv2 = document.createElement("div"); 
			dv.style.flex = 1; 

			var tx = node.value;
			tx = (field.pre) ? field.pre + tx : tx;
			tx = (field.post) ? tx + field.post : tx;
			dv2.innerHTML = tx;
			dv2.style.paddingLeft = "10px";
			dv2.style.paddingTop = "7px";

			dv.appendChild(dv1);
			dv.appendChild(dv2);
			
			const lastChild = parentElement.children.length > 0 ? parentElement.children[parentElement.children.length - 1] : null;
			if(lastChild){
			   lastChild.style.marginBottom = "-25px"; 
			}
		        parentElement.appendChild(dv);
			
		        radioRefs.push({ id : radioId , node: node  , ref : inputElement });
			
			if(field.routeref){
			   var descendants = subform.querySelectorAll("*");
		     
			   descendants.forEach(function(descendant) {
			       if (descendant.getAttribute('name') === field.routeref && !descendant.hasAttribute(radioId) ) { 
				   descendant.setAttribute(radioId, 'true'); 
				   if(descendant.value){ dv2.innerHTML = descendant.value; }
				   descendant.addEventListener('change', function() {
					if(descendant.value){ dv2.innerHTML = descendant.value; }
				   });
			       }
			   });
			}
		}
 
		// Create a MutationObserver instance
		  var observer2 = new MutationObserver(function(mutations)
                  {
		       mutations.forEach(function(mutation) 
		       {
		         if (mutation.addedNodes) 
		         {
		            mutation.addedNodes.forEach(function(node)
		            {
			       //:  
			       var subforms = document.querySelectorAll(".subform");  
			       subforms.forEach(function(subform)
			       { 
			           var descendants = subform.querySelectorAll("*");
			     
			           descendants.forEach(function(descendant) {
			               if (descendant.getAttribute('name') === field.route && !descendant.hasAttribute(radioId) ) { 
					   descendant.setAttribute(radioId, 'true'); 
					   createRadioButton(descendant , subform);
			               }
			           });
			       }); 
			       //:
		            });
		         }
	              });
	           }); 	  
		// Observe the document body for changes
		  observer2.observe(document.body, {
		     childList: true,
		     subtree: true
		  });     
	        // 
	}
     }
  }
  createSelect(field , inputElement , nested = false , parentElement)
  {
      function getNextSelectId() {
	 window.selectIds = window.selectIds || [];
	 const nextId = window.selectIds.length + 1;
	 window.selectIds.push(nextId);
	 return `select-${nextId}`;
     }

     const selectId = getNextSelectId();
      if(field.route)
      {
        window.selectRefs = window.selectRefs || [];
	// 
	if(field.observe == "subform")
	{ 
		function createSelectButton(node , subform) {
		      
		       let optionElement = document.createElement("option"); 
			optionElement.value = node.Value;
			var tx = node.value;
			tx = (field.pre) ? field.pre + tx : tx;
			tx = (field.post) ? tx + field.post : tx;
			optionElement.innerHTML = tx; 

			inputElement.appendChild(optionElement);
 
		        selectRefs.push({ id : selectId , node: node  , ref : optionElement });
			
			if(field.routeref){
			   var descendants = subform.querySelectorAll("*");
		     
			   descendants.forEach(function(descendant) {
			       if (descendant.getAttribute('name') === field.routeref && !descendant.hasAttribute(selectId) ) { 
				   descendant.setAttribute(selectId, 'true'); 
				   if(descendant.value){ optionElement.innerHTML = descendant.value; }
				   descendant.addEventListener('change', function() {
					if(descendant.value){ optionElement.innerHTML = descendant.value; }
				   });
			       }
			   });
			}
		}
 
		// Create a MutationObserver instance
		  var observer2 = new MutationObserver(function(mutations)
                  {
		       mutations.forEach(function(mutation) 
		       {
		         if (mutation.addedNodes) 
		         {
		            mutation.addedNodes.forEach(function(node)
		            {
			       //:  
			       var subforms = document.querySelectorAll(".subform");  
			       subforms.forEach(function(subform)
			       { 
			           var descendants = subform.querySelectorAll("*");
			     
			           descendants.forEach(function(descendant) {
			               if (descendant.getAttribute('name') === field.route && !descendant.hasAttribute(selectId) ) {  
					   descendant.setAttribute(selectId, 'true'); 
					   createSelectButton(descendant , subform);
			               }
			           });
			       }); 
			       //:
		            });
		         }
	              });
	           }); 	  
		// Observe the document body for changes
		  observer2.observe(document.body, {
		     childList: true,
		     subtree: true
		  });     
	        // 
	}	      
      }
      else
      {
	      var sn = (nested) ? false : this.checkNested(field , 0) > 1;
		  var ts = this;
	     
	      if(sn)
	      {
		   parentElement.classList.add('nested-dropdown');
		   // Generate main select options
		    field.optgroups.forEach(optgroup => {
		      const option = document.createElement('option');
		      option.value = optgroup.label;
		      option.text = optgroup.label;
		      inputElement.appendChild(option);
		    });
		
		    // Add event listener to main select
		       function removeSiblingsAfter(element) {
			  let sibling = element.nextSibling;
			  while (sibling) {
			    sibling.remove();
			    sibling = element.nextSibling;
			  }
			}
		    function createNext(init = true)
		    {
			 //
			 removeSiblingsAfter(inputElement); 
			 //  
		         const selectedValue = init ? field.optgroups[0].label : inputElement.value;
		         const selectedOptgroup = field.optgroups.find(optgroup => optgroup.label === selectedValue)
	 
			 let selectElement = document.createElement("select");
			 selectElement.name = `${field.name}_${selectedOptgroup.label}`;
			 selectElement.required = field.required;
		         
			 ts.createSelect(selectedOptgroup , selectElement , false , parentElement);
			 if(init)
			 {
			    parentElement.prepend(selectElement);  
			 }
			 else{
			    parentElement.appendChild(selectElement);    
			  }
			 
			 // 
		    }
		    createNext();
		    inputElement.addEventListener('change', () => {
		       createNext(false);
		    }); 
	      }
	      else
	      {
		    if(field.options)
		     {
			field.options.forEach((option) => {
			  const selectElement = document.createElement("option");
			  selectElement.value = option.value;
			  selectElement.textContent = option.label;
			  inputElement.appendChild(selectElement);
		       });  
		     }
		     if(field.optgroups)
		     { 
			var ts = this;
			field.optgroups.forEach((optgroup) => {
			    let optgroupElement = document.createElement(nested ? "div": "optgroup"); 
			    
			    if(nested){ 
				const selectElement = document.createElement("option"); 
				selectElement.disabled = true; 
			        selectElement.textContent = optgroup.label;
				    
				optgroupElement.style.paddingLeft = "20px";
				inputElement.appendChild(selectElement);
			    }
			    else{
				optgroupElement.setAttribute('label', optgroup.label);    
			    }
			    ts.createSelect(optgroup , optgroupElement, true);
			    inputElement.prepend(optgroupElement);
		        }); 
		     }	  
	       } 	      
      }

  }
  createSetter(inputElement , setter)
  { 
        function getEventSetterId() {
	  window.eventSetterIds = window.eventSetterIds || [];
	  const nextId = window.eventSetterIds.length + 1;
	  window.eventSetterIds.push(nextId);
	  return `setter-${nextId}`;
	}
	let setterId = getEventSetterId();
	let proc = true;
	inputElement.setAttribute( setterId , "true");
	// Create a MutationObserver instance
	var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
	    if (mutation.addedNodes) {
	      mutation.addedNodes.forEach(function(node) {
		  //: 
		  var subforms = document.querySelectorAll(".subform");  
		  subforms.forEach(function(subform) { 
		    var descendants = subform.querySelectorAll("*");
		     
		    descendants.forEach(function(descendant) {
		      if (descendant.hasAttribute(setterId) && proc) {  
			 proc = false;
		         try{
		             setter(subform , inputElement);  
			 }
		         catch(e){
			      console.error(e);
		         }
	                 observer.disconnect();
		      }
		    });
		    //:
		  }); 
	      });
	    }
	  });
	});
	
	// Observe the document body for changes
	observer.observe(document.body, {
	  childList: true,
	  subtree: true
	});
  }
  renderForm(fname = "myForm") {
    const fields = this.formConfig.fields;
    const parentElement = this.form;
    const parentName = fname;
    const ts = this;

    const groupedFields = fields.reduce((acc, field) => {
      if (field.group) {
        if (!acc[field.group]) {
          acc[field.group] = [];
        }
        acc[field.group].push(field);
      } else {
        if (!acc['standalone']) {
          acc['standalone'] = [];
        }
        acc['standalone'].push(field);
      }
      return acc;
    }, {});

    Object.keys(groupedFields).forEach((group) => {
      if (group === 'standalone') {
        groupedFields[group].forEach((field) => {
          const label = document.createElement("label");
          label.textContent = field.label;
          label.htmlFor = `${parentName}_${field.name}`;

          const description = ts.createDescription(field);

          let inputElement;

          switch (field.type) {
            case "select":
              inputElement = document.createElement("div");
              let selectElement = document.createElement("select");
              selectElement.name = `${parentName}_${field.name}`;
              selectElement.required = field.required;

              this.createSelect(field , selectElement , false , inputElement);
	      inputElement.prepend(selectElement);
 
	      if(field.setter){
		 ts.createSetter(inputElement , field.setter); 
	      }
              break;
            case "datetime-local":
              inputElement = document.createElement("input");
              inputElement.type = "datetime-local";
              inputElement.name = `${parentName}_${field.name}`;
              inputElement.required = field.required;
              
	      if(field.setter){
		 ts.createSetter(inputElement , field.setter); 
	      }
              break;
            case "textarea":
              inputElement = document.createElement("textarea"); 
              inputElement.name = `${parentName}_${field.name}`;
              inputElement.required = field.required; 
              break;
            case "file":
              inputElement = document.createElement("input");
              inputElement.type = "file";
              inputElement.name = `${parentName}_${field.name}`;
              inputElement.required = field.required;
              inputElement.accept = field.accept;
              break;
            case "email":
              inputElement = document.createElement("input");
              inputElement.type = "email";
              inputElement.name = `${parentName}_${field.name}`; 
              inputElement.required = field.required;
              break;
	    case "text":
              inputElement = document.createElement("div");
			  
              let textElement = document.createElement("input");
              textElement.name = `${parentName}_${field.name}`;
              textElement.type = "text";
              textElement.required = field.required;

	      if(field.autocomplete && Array.isArray(field.suggestions))
	      {
		 ts.createAutoComplete(inputElement , textElement , field.suggestions)
	      }
			  
	      if(field.setter){
		 ts.createSetter(textElement , field.setter); 
	      }

	      inputElement.prepend(textElement); 
	      break;
            case "number":
              inputElement = document.createElement("input");
              inputElement.type = "number";
              inputElement.name = `${parentName}_${field.name}`; 
              inputElement.required = field.required; 
              inputElement.min = field.min; 
              inputElement.max = field.max; 
              inputElement.readOnly = field.readonly;
              inputElement.setAttribute('autoincrement', field.autoincrement); 
              inputElement.step = field.step;  
              inputElement.value = 1; 
			  
	      if(field.readonly){ inputElement.style.outline = 'none'; }
	      if(field.readonly && field.autoincrement) { inputElement.value = field.start ? field.start : 1; }
			  
              break;
            case "checkbox":
              inputElement = document.createElement("div");
              ts.createCheckboxButtons(field, inputElement , parentName);  
              break;
            case "radio":  
              inputElement = document.createElement("div");
              ts.createRadioButtons(field, inputElement , parentName);  
              break;
            case "subform":
              const fieldSet = document.createElement("fieldset");
	      const legend = document.createElement("legend");
	      legend.textContent = field.label;
	      fieldSet.appendChild(legend);
		      
              fieldSet.style.border = "1px solid #ccc";
              fieldSet.style.padding = "10px";
              fieldSet.style.marginBottom = "20px";

	      let subFormElement;
              if(field.multiple)
	      {  
                 // Create a new div
		const viewNavDiv = document.createElement('div');
		viewNavDiv.className = 'viewnav';
		 // Create a view button
		 const viewButton = document.createElement('button');
		 viewButton.textContent = 'View';
		 viewButton.className = 'view-button';
		 viewButton.style.display = "none";
		 // Create an add button    
                 const addButton = document.createElement("button");
                 addButton.type = "button";
                 addButton.textContent = "Add new " + (field.button ? field.button : field.label);
                 addButton.classList.add("add-button");
		 // Append the view and add buttons to the div
		 viewNavDiv.appendChild(viewButton);
		 viewNavDiv.appendChild(addButton);
		 //
                 fieldSet.appendChild(viewNavDiv);
		      
	         addButton.addEventListener("click", () => {
		   let subFormElement2 = this.renderSubForm(fieldSet, field.fields, parentName + "_" + field.name); 
                   subFormElement2.setAttribute("name" , `${parentName}_${field.name}`); 
		   ts.addButtonEvent(fieldSet, subFormElement2);
	         });
	      }
			  
              if(field.empty != true){ 
                 subFormElement = this.renderSubForm(fieldSet, field.fields, parentName + "_" + field.name);
                 subFormElement.setAttribute("name" , `${parentName}_${field.name}`);  
	         fieldSet.appendChild(subFormElement);
	      }
  
              inputElement = document.createElement("div"); 
	      inputElement.appendChild(fieldSet);
              break;
            default:
              inputElement = document.createElement("input");
              inputElement.type = field.type;
              inputElement.name = `${parentName}_${field.name}`;
              inputElement.required = field.required;
          }

          const fieldSetElement = document.createElement("div");
          fieldSetElement.appendChild(label);
          fieldSetElement.appendChild(description);
          fieldSetElement.appendChild(inputElement);

          parentElement.appendChild(fieldSetElement);
        });
      } else {
        const fieldSet = document.createElement("fieldset");
        const legend = document.createElement("legend");
        legend.textContent = group;
	fieldSet.appendChild(legend);

        groupedFields[group].forEach((field) => {
          let label = document.createElement("label");
          label.textContent = field.label;
          label.htmlFor = `${parentName}_${field.name}`;

          let description = ts.createDescription(field);

          let inputElement;

          switch (field.type) {
            case "select": 
              inputElement = document.createElement("div");
              let selectElement = document.createElement("select");
              selectElement.name = `${parentName}_${field.name}`;
              selectElement.required = field.required;

              this.createSelect(field , selectElement , false , inputElement);
	      inputElement.prepend(selectElement);
			  
	      if(field.setter){
		 ts.createSetter(inputElement , field.setter); 
	      }
              break;
            case "datetime-local":
              inputElement = document.createElement("input");
              inputElement.type = "datetime-local";
              inputElement.name = `${parentName}_${field.name}`;
              inputElement.required = field.required;
              
	      if(field.setter){
		 ts.createSetter(inputElement , field.setter); 
	      }
              break;
            case "textarea":
              inputElement = document.createElement("textarea"); 
              inputElement.name = `${parentName}_${field.name}`;
              inputElement.required = field.required; 
              break;
            case "file":
              inputElement = document.createElement("input");
              inputElement.type = "file";
              inputElement.name = `${parentName}_${field.name}`;
              inputElement.required = field.required;
              inputElement.accept = field.accept;
              break;
            case "email":
              inputElement = document.createElement("input");
              inputElement.type = "email";
              inputElement.name = `${parentName}_${field.name}`; 
              inputElement.required = field.required;
              break;
	    case "text":
              inputElement = document.createElement("div");
			  
              let textElement = document.createElement("div");
              textElement.name = `${parentName}_${field.name}`;
              textElement.type = "text";
              textElement.required = field.required;

	      if(field.autocomplete && Array.isArray(field.suggestions))
	      {
		 ts.createAutoComplete(inputElement , textElement , field.suggestions)
	      }
			  
	      if(field.setter){
		 ts.createSetter(textElement , field.setter); 
	      }

	      inputElement.prepend(textElement);
	      break; 
            case "number":
              inputElement = document.createElement("input");
              inputElement.type = "number";
              inputElement.name = `${parentName}_${field.name}`; 
              inputElement.required = field.required; 
              inputElement.min = field.min; 
              inputElement.max = field.max; 
              inputElement.readOnly = field.readonly;
              inputElement.setAttribute('autoincrement', field.autoincrement); 
              inputElement.step = field.step; 
              inputElement.value = 1; 
	      
	      if(field.readonly){ inputElement.style.outline = 'none'; }
	      if(field.readonly && field.autoincrement) { inputElement.value = field.start ? field.start : 1; }
			  
              break;
            case "checkbox":
              inputElement = document.createElement("div");
              ts.createCheckboxButtons(field, inputElement , parentName);  
              break;
            case "radio":
              inputElement = document.createElement("div");
              ts.createRadioButtons(field, inputElement , parentName);  
              break;
            case "subform":
	      label = null;
              const fieldSet = document.createElement("fieldset");
	      const legend = document.createElement("legend");
	      legend.textContent = field.label;
	      fieldSet.appendChild(legend);
		      
              fieldSet.style.border = "1px solid #ccc";
              fieldSet.style.padding = "10px";
              fieldSet.style.marginBottom = "20px";

	      let subFormElement;
              if(field.multiple)
	      {  
                 // Create a new div
		const viewNavDiv = document.createElement('div');
		viewNavDiv.className = 'viewnav';
		 // Create a view button
		 const viewButton = document.createElement('button');
		 viewButton.textContent = 'View';
		 viewButton.className = 'view-button';
		 viewButton.style.display = "none";
		 // Create an add button    
                 const addButton = document.createElement("button");
                 addButton.type = "button";
                 addButton.textContent = "Add new " + (field.button ? field.button : field.label);
                 addButton.classList.add("add-button");
		 // Append the view and add buttons to the div
		 viewNavDiv.appendChild(viewButton);
		 viewNavDiv.appendChild(addButton);
		 //
                 fieldSet.appendChild(viewNavDiv);
		      
	         addButton.addEventListener("click", () => {
		   let subFormElement2 = this.renderSubForm(fieldSet, field.fields, parentName + "_" + field.name);  
                   subFormElement2.setAttribute("name" , `${parentName}_${field.name}`); 
		   ts.addButtonEvent(fieldSet, subFormElement2);
	         });
	      }
              if(field.empty != true){ 
	         subFormElement = this.renderSubForm(fieldSet, field.fields , parentName + "_" + field.name);
                 subFormElement.setAttribute("name" , `${parentName}_${field.name}`); 
	         fieldSet.appendChild(subFormElement);
	      }
  
              inputElement = document.createElement("div"); 
	      inputElement.appendChild(fieldSet);
              break;
            default:
              inputElement = document.createElement("input");
              inputElement.type = field.type;
              inputElement.name = `${parentName}_${field.name}`;
              inputElement.required = field.required;
          }

          const fieldSetElement = document.createElement("div");
          if(label){ fieldSetElement.appendChild(label); }
          fieldSetElement.appendChild(description);
          fieldSetElement.appendChild(inputElement);

          fieldSet.appendChild(fieldSetElement);
        });

        parentElement.appendChild(fieldSet);
      }
    });
    
    const buttonContainer = document.createElement("div"); 
    buttonContainer.classList.add("button-container");
    parentElement.appendChild(buttonContainer);

    const jsonButton = document.createElement("button");
    jsonButton.textContent = "Convert to JSON";
    jsonButton.classList.add("json-button");

    buttonContainer.appendChild(jsonButton);

    jsonButton.addEventListener("click", () => {
      const formData = {};
      const formElements = this.form.elements;

      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        const name = element.name;
        const value = element.value;

        if (name.includes("_")) {
          const parentName = name.split("_")[0];
          const childName = name.split("_")[1];

          if (parentName === "myForm") {
            formData[childName] = value;
          } else {
            if (!formData[parentName]) {
              formData[parentName] = {};
            }

            formData[parentName][childName] = value;
          }
        } else {
          formData[name] = value;
        }
      }

      this.callback(formData);
    });

    const downloadButton = document.createElement("button");
    downloadButton.textContent = "Download";
    downloadButton.classList.add("download-button");

    buttonContainer.appendChild(downloadButton);

    downloadButton.addEventListener("click", () => {
      const formData = {};
      const formElements = this.form.elements;

      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        const name = element.name;
        const value = element.value;

        if (name.includes("_")) {
          const parentName = name.split("_")[0];
          const childName = name.split("_")[1];

          if (parentName === "myForm") {
            formData[childName] = value;
          } else {
            if (!formData[parentName]) {
              formData[parentName] = {};
            }

            formData[parentName][childName] = value;
          }
        } else {
          formData[name] = value;
        }
      }

      const json = JSON.stringify(formData, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "form_data.json";
      a.click();
    });
  }

  renderSubForm(parentElement, fields, parentName) {
    const subFormElement = document.createElement("div");
    subFormElement.classList.add("subform"); 
    var ts = this; 

    fields.forEach((field) => {
      const label = document.createElement("label");
      label.textContent = field.label;
      label.htmlFor = `${parentName}_${field.name}`;

      const description = this.createDescription(field);
      
      let inputElement;

      switch (field.type) {
        case "select":
           inputElement = document.createElement("div");
          let selectElement = document.createElement("select");
          selectElement.name = `${parentName}_${field.name}`;
          selectElement.required = field.required;

          this.createSelect(field , selectElement , false , inputElement);
          inputElement.prepend(selectElement);
		      
         if(field.setter){
	    ts.createSetter(inputElement , field.setter); 
         }
          break;
            case "datetime-local":
              inputElement = document.createElement("input");
              inputElement.type = "datetime-local";
              inputElement.name = `${parentName}_${field.name}`;
              inputElement.required = field.required;
              
	      if(field.setter){ 
		 ts.createSetter(inputElement , field.setter); 
	      }
              break;
            case "textarea":
              inputElement = document.createElement("textarea"); 
              inputElement.name = `${parentName}_${field.name}`;
              inputElement.required = field.required; 
              break;
            case "file":
              inputElement = document.createElement("input");
              inputElement.type = "file";
              inputElement.name = `${parentName}_${field.name}`;
              inputElement.required = field.required;
              break;
            case "email":
              inputElement = document.createElement("input");
              inputElement.type = "email";
              inputElement.name = `${parentName}_${field.name}`; 
              inputElement.required = field.required;
              break;
	    case "text":
              inputElement = document.createElement("div");
			  
              let textElement = document.createElement("input");
              textElement.name = `${parentName}_${field.name}`;
              textElement.type = "text";
              textElement.required = field.required;

	      if(field.autocomplete && Array.isArray(field.suggestions))
	      {
		 ts.createAutoComplete(inputElement , textElement , field.suggestions)
	      }
			  
	      if(field.setter){
		 ts.createSetter(textElement , field.setter); 
	      }

	      inputElement.prepend(textElement);
	      break; 
            case "number":
              inputElement = document.createElement("input");
              inputElement.type = "number";
              inputElement.name = `${parentName}_${field.name}`; 
              inputElement.required = field.required; 
              inputElement.min = field.min; 
              inputElement.max = field.max; 
              inputElement.readOnly = field.readonly;
              inputElement.setAttribute('autoincrement', field.autoincrement); 
              inputElement.step = field.step; 
              inputElement.value = 1; 
	      
	      if(field.readonly){ inputElement.style.outline = 'none'; }
	      if(field.readonly && field.autoincrement) { inputElement.value = field.start ? field.start : 1; }
			  
              break;
        case "checkbox":
          inputElement = document.createElement("div");
              ts.createCheckboxButtons(field, inputElement , parentName);  
              break;
        case "radio":
          inputElement = document.createElement("div");
          ts.createRadioButtons(field, inputElement , parentName);  
          break;
            case "subform":
              const fieldSet = document.createElement("fieldset");
	      const legend = document.createElement("legend");
	      legend.textContent = field.label;
	      fieldSet.appendChild(legend);
		      
              fieldSet.style.border = "1px solid #ccc";
              fieldSet.style.padding = "10px";
              fieldSet.style.marginBottom = "20px";

	      let subFormElement;
              if(field.multiple)
	      {  
		 // Create a new div
		const viewNavDiv = document.createElement('div');
		viewNavDiv.className = 'viewnav';
		 // Create a view button
		 const viewButton = document.createElement('button');
		 viewButton.textContent = 'View';
		 viewButton.className = 'view-button';
		 viewButton.style.display = "none";
		 // Create an add button    
                 const addButton = document.createElement("button");
                 addButton.type = "button";
                 addButton.textContent = "Add new " + (field.button ? field.button : field.label);
                 addButton.classList.add("add-button");
		 // Append the view and add buttons to the div
		 viewNavDiv.appendChild(viewButton);
		 viewNavDiv.appendChild(addButton);
		 //
                 fieldSet.appendChild(viewNavDiv);
		      
	         addButton.addEventListener("click", () => {
		   let subFormElement2 = this.renderSubForm(fieldSet, field.fields, parentName + "_" + field.name);  
                   subFormElement2.setAttribute("name" , `${parentName}_${field.name}`); 
		   ts.addButtonEvent(fieldSet, subFormElement2);
	         });
	      }
		      
              if(field.empty != true){
		 subFormElement = this.renderSubForm(fieldSet, field.fields, parentName + "_" + field.name);
                 subFormElement.setAttribute("name" , `${parentName}_${field.name}`); 
                 fieldSet.appendChild(subFormElement);   
	      }
              
              inputElement = document.createElement("div"); 
	      inputElement.appendChild(fieldSet);
              break;
        default:
          inputElement = document.createElement("input");
          inputElement.type = field.type;
          inputElement.name = `${parentName}_${field.name}`;
          inputElement.required = field.required;
      }

      const fieldSetElement = document.createElement("div");
      fieldSetElement.appendChild(label);
      fieldSetElement.appendChild(description);
      fieldSetElement.appendChild(inputElement);

      subFormElement.appendChild(fieldSetElement);
    });

    return subFormElement;
  }
	
  addButtonEvent(fieldSet, subFormElement) 
  {
	  // Clone the original subform
	  const newSubForm = subFormElement;
	  newSubForm.id = 'cloned-subform'; 
	
	  // Find all elements with class "subform" in fieldSet
	     let fieldtags = fieldSet.children;
             let subforms = Array.from(fieldtags).filter(child => child.classList.contains('subform'));  
	  // Initialize current subform index
	  let currentSubformIndex = subforms.length - 1; 
	  // Function to create buttons
	  function createButtons() 
	  {
	    if (Array.from(fieldSet.children).filter(child => child.classList.contains('setnav')).length > 0) { return; }
	    const viewButton = fieldSet.querySelector('.viewnav .view-button');
	    viewButton.style.display = "block";
	    // Create a new div element with class "setnav"
		const setnavDiv = document.createElement('div');
		setnavDiv.classList.add('setnav'); ; 
	    // Create Next and Previous buttons
	    const nextButton = document.createElement('button');
	    nextButton.textContent = 'Next';
	    nextButton.onclick = (e) => {
		e.preventDefault();

		fieldtags = fieldSet.children;
                let subnav = Array.from(fieldtags).filter(child => child.classList.contains('setnav'))[0];
                subforms = Array.from(fieldtags).filter(child => child.classList.contains('subform'));
	         
	        let idx = subnav.getAttribute("index");
	        idx = (idx && idx != "undefined") ? parseInt(idx) : currentSubformIndex; 
	        if(idx != currentSubformIndex){ currentSubformIndex = idx; subnav.removeAttribute("index"); }
		    
	        subforms[currentSubformIndex].style.display = 'none';
		    
	      // Hide current subform
	      subforms[currentSubformIndex].style.display = 'none';
	
	      // Show next subform
	      currentSubformIndex++;
	      if (currentSubformIndex >= subforms.length) {
	        currentSubformIndex = 0;
	      }
	      subforms[currentSubformIndex].style.display = 'block';
	
	      // Update the subform counter text
	      updateSubformCounterText();
	    };
	
	    const prevButton = document.createElement('button');
	    prevButton.textContent = 'Previous';
	    prevButton.onclick = (e) => {
		e.preventDefault();
	      fieldtags = fieldSet.children;
              let subnav = Array.from(fieldtags).filter(child => child.classList.contains('setnav'))[0];
              subforms = Array.from(fieldtags).filter(child => child.classList.contains('subform'));
		    
	      let idx = subnav.getAttribute("index");
	      idx = (idx && idx != "undefined") ? parseInt(idx) : currentSubformIndex; 
	      if(idx != currentSubformIndex){ currentSubformIndex = idx; subnav.removeAttribute("index"); }
		    
	      // Hide current subform 
	        subforms[currentSubformIndex].style.display = 'none';
	
	      // Show previous subform
	      currentSubformIndex--;
	      if (currentSubformIndex < 0) {
	        currentSubformIndex = subforms.length - 1;
	      }
	      subforms[currentSubformIndex].style.display = 'block';
	
	      // Update the subform counter text
	      updateSubformCounterText();
	    };
	
	    // Create input type number to show a specific form
	    const formNumberInput = document.createElement('input');
	    formNumberInput.type = 'number';
	    formNumberInput.min = subforms.length;
	    formNumberInput.max = subforms.length + 1;
	    formNumberInput.value = currentSubformIndex + 1;
	    formNumberInput.onchange = () => {
		    
	      fieldtags = fieldSet.children;
              let subnav = Array.from(fieldtags).filter(child => child.classList.contains('setnav'))[0];
              subforms = Array.from(fieldtags).filter(child => child.classList.contains('subform'));
		    
	      let idx = subnav.getAttribute("index");
	      idx = (idx && idx != "undefined") ? parseInt(idx) : currentSubformIndex; 
	      if(idx != currentSubformIndex){ currentSubformIndex = idx; subnav.removeAttribute("index"); }
		    
	      const newIndex = parseInt(formNumberInput.value) - 1;
	      if (newIndex >= 0 && newIndex < subforms.length) {
	        subforms[currentSubformIndex].style.display = 'none';
	        currentSubformIndex = newIndex;
	        subforms[currentSubformIndex].style.display = 'block';
	        updateSubformCounterText();
	      }
	    };
	
	    // Create subform counter text element
	    const subformCounterText = document.createElement('span');
	    subformCounterText.textContent = `${subforms.length}/${subforms.length + 1}`;
	
	    // Function to update the subform counter text
	    function updateSubformCounterText() {
	      fieldtags = fieldSet.children; 
              subforms = Array.from(fieldtags).filter(child => child.classList.contains('subform'));
		    
	      subformCounterText.textContent = `${currentSubformIndex + 1}/${subforms.length}`;
	      formNumberInput.value = currentSubformIndex + 1;
	      formNumberInput.min = 1;
	      formNumberInput.max = subforms.length;
	    }
	
	    // Add elements to the setnavDiv
		setnavDiv.appendChild(prevButton);
		setnavDiv.appendChild(nextButton);
		setnavDiv.appendChild(formNumberInput);
		setnavDiv.appendChild(subformCounterText);
		
		// Get the add button
		const viewNav = fieldSet.querySelector('.viewnav');
		
		// Insert setnavDiv after the add button
		fieldSet.insertBefore(setnavDiv, viewNav.nextSibling); 
	  }
	
	  // Call the function to create buttons
	  createButtons();
	
	  // Reset Form 
	  const inputs = newSubForm.querySelectorAll("input, select, textarea , datalist");
	
	  inputs.forEach((input) => 
	  {
	     Array.prototype.slice.call(input.attributes).forEach((attribute) => {
	        if (attribute.name.includes('radio-') || attribute.name.includes('checkbox-') || attribute.name.includes('select-')) 
		{
	            input.removeAttribute(attribute.name);
	        }
	    });
	    if(input.tagName.toLowerCase() === "datalist"){
		input.remove();
	    }
	    else if(input.type == "number")
	    {  
		if(input.getAttribute('autoincrement') == "true" && input.readOnly)    
		{
		    var n = input.step && input.step != "undefined" ? parseInt(input.step) : 1;
		    // Get the last subform in the fieldSet
                    const lastSubform = fieldSet.querySelectorAll('.subform').item(fieldSet.querySelectorAll('.subform').length - 1);
		    const lastSubformInput = lastSubform.querySelector(`input[name="${input.name}"]`); 
		    //  
		    var c = parseInt(lastSubformInput.value) + n;
			
		    input.value = c;
		}
		    else{
			input.value = "";    
		    }
	    }
	    else {
		    input.value = "";
	    }
	  });
	
	  // Remove Button 
	  const removeButton = document.createElement("button");
	  removeButton.textContent = "Remove";
	  removeButton.classList.add("remove-button");
	  newSubForm.appendChild(removeButton);
	  fieldSet.appendChild(newSubForm);
	  // Get all subforms
           const subforms2 = fieldSet.querySelectorAll('.subform'); 
	   subforms2.forEach((subform, index) => { subform.style.display = 'none';  });
	   newSubForm.style.display = "block";
	   let sIndex = subforms2.length;
	   //
	   // Update subfield Nav 
	   if (Array.from(fieldSet.children).filter(child => child.classList.contains('setnav')).length > 0) 
	   { 
	      review();
	   }

	   function review(){
	      let fieldtags = fieldSet.children; 
	      let subnav = Array.from(fieldtags).filter(child => child.classList.contains('setnav'))[0];
	      let viewnav = Array.from(fieldtags).filter(child => child.classList.contains('viewnav'))[0];
              let subforms = Array.from(fieldtags).filter(child => child.classList.contains('subform'));
		     
	      let subformCounterText = subnav.querySelector('span');
	      let formNumberInput = subnav.querySelector('input');
		    
	      subformCounterText.textContent = `${subforms.length}/${subforms.length}`;
	      formNumberInput.value = subforms.length;
	      formNumberInput.min = 1;
	      formNumberInput.max = subforms.length;
	      subnav.setAttribute("index" , subforms.length - 1);

	      if(subforms.length == 0){
		 subnav.style.display = "none";
		 viewnav.querySelector('.view-button').style.display = "none";
	      }
	      else{
		 subnav.style.display = "flex";
		 viewnav.querySelector('.view-button').style.display = "flex";
	      }
	   }
	  
	 removeButton.addEventListener("click", (e) =>
	 { 
	   e.preventDefault();
           const subforms3 = fieldSet.querySelectorAll('.subform');  
	   let sLength = subforms3.length;

	   if(sIndex == sLength && subforms3[sIndex - 2]){
		subforms3[sIndex - 2].style.display = "block";  
	   }
	   if(sIndex < sLength && subforms3[sIndex]){
		 subforms3[sIndex].style.display = "block";    
	   }
	    newSubForm.remove();
	    review();
	  });
}

  addEventListeners() {
    this.importButton.addEventListener("click", () => {
      this.fileInput.click();
    });

    this.fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", (event) => {
        const jsonData = JSON.parse(event.target.result);
        this.fillFormFields(jsonData);
      });

      reader.readAsText(file);
    });

    this.form.addEventListener("input", (event) => {
      this.saveFormDataToLocalStorage();
    });
  }

  fillFormFields(data) {
    const formElements = this.form.elements;

    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
      const name = element.name;
      const value = data[name];

      if (value) {
        element.value = value;
      }
    }
  }

  saveFormDataToLocalStorage() {
    const formData = {};
    const formElements = this.form.elements;

    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
      const name = element.name;
      const value = element.value;

      if (name.includes("_")) {
        const parentName = name.split("_")[0];
        const childName = name.split("_")[1];

        if (parentName === "myForm") {
          formData[childName] = value;
        } else {
          if (!formData[parentName]) {
            formData[parentName] = {};
          }

          formData[parentName][childName] = value;
        }
      } else {
        formData[name] = value;
      }
    }

    localStorage.setItem("form_data", JSON.stringify(formData));
  }

  loadFormDataFromLocalStorage() {
    const storedFormData = localStorage.getItem("form_data");

    if (storedFormData) {
      const formData = JSON.parse(storedFormData);
      this.fillFormFields(formData);
    }
  }

  downloadFormData() {
    const formData = {};
    const formElements = this.form.elements;

    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
      const name = element.name;
      const value = element.value;

      if (name.includes("_")) {
        const parentName = name.split("_")[0];
        const childName = name.split("_")[1];

        if (parentName === "myForm") {
          formData[childName] = value;
        } else {
          if (!formData[parentName]) {
            formData[parentName] = {};
          }

          formData[parentName][childName] = value;
        }
      } else {
        formData[name] = value;
      }
    }

    const json = JSON.stringify(formData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "form_data.json";
    a.click();
  }
} 
	//
document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById("myForm");
	const importButton = document.getElementById("import-button");
	const fileInput = document.getElementById("file-input"); 
        new FormGenerator(form, importButton, fileInput , formConfig , "spec" ,
	  (formData) => {
		console.log(formData);
	  });
       //
});

document.addEventListener('DOMContentLoaded', () => {
	const formGenerator = new FormGenerator(
	  document.getElementById("myForm2"),
	  document.getElementById("import-button2"),
	  document.getElementById("file-input2"),
	  formConfig2,
	  "spec" ,
	  (formData) => {
	    console.log(formData);
	  }
	);
});
  //
 function adjustPrice(basePrice, complexity, projectType, platform, projectDurationDays) {
   const complexityMultiplier = complexityMultipliers[platform][complexity];
   const projectTypeMultiplier = projectTypeMultipliers[platform][projectType];
   const projectDurationMultiplier = projectDurationMultipliers(projectDurationDays);

   const adjustedPrice = basePrice * complexityMultiplier * projectTypeMultiplier * projectDurationMultiplier;
   return adjustedPrice;
}
function estimatePhases(complexity, projectType, platform, projectDurationDays)
{  
    var start = 0;
    const estimatedPhase = Object.keys(projectPhaseMultipliers[projectType]).map(phase => 
    { 
	const projectPhaseMultiplier = projectPhaseMultipliers[projectType][phase];
	const complexityMultiplier = complexityMultipliers[platform][complexity];
	const projectTypeMultiplier = projectTypeMultipliers[platform][projectType];
	const projectDurationMultiplier = projectDurationMultipliers(projectDurationDays);
			
	let estimatedDuration =  (projectPhaseMultiplier * projectTypeMultiplier * complexityMultiplier * projectDurationMultiplier).toFixed(0);
	estimatedDuration = isNaN(estimatedDuration) ? null : parseInt(estimatedDuration);
	    
	const ret = 
	{
	   name: phase.charAt(0).toUpperCase() + phase.slice(1),
	   start: start ,
	   end : estimatedDuration ? start + estimatedDuration : "Ongoing" ,
	   estimatedDuration: estimatedDuration ?`${estimatedDuration} days` : "Ongoing" ,
	   activities: projectPhases[phase]
	};

	start += (estimatedDuration ? estimatedDuration : 0);

	return ret;
   });

   return estimatedPhase;
}
 //
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
   
  const featuresHtml = firstProjectType.features.map(feature => `
    <div class="form-group">
      <div class="checkbox">
        <label>
          <input onchange="updateQuoteResult()" type="checkbox" name="${feature.name}" value="${feature.price}"> ${feature.name} - R${feature.price}
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
		<input  onchange="updateQuoteResult()" type="checkbox" id="template-contact" name="${page.name}" value="${page.price}">
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
    event.preventDefault();
	const popupElement = document.querySelector('.popup');
	if (popupElement) {
	  popupElement.remove();
	}
	const url = button.getAttribute('data-link');
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    popup.style.background = 'rgba(0, 0, 0, 0.5)';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.zIndex = '1000'; 
    popup.innerHTML = `
	  <div class="popup-content" style="width:100%;  height:100%" >
		<iframe src="${url}" frameborder="0" width="100%" height="100%"></iframe>
		<button class="close-button" style="left:calc(100% - 80px); top:calc(100% - 46px); position:absolute;" >Close</button>
	  </div> 
    `;
	
    document.body.style.overflow = 'hidden';
    document.body.appendChild(popup);

    document.querySelector('.close-button').addEventListener('click', () => {
      popup.remove();
	  document.body.style.overflow = 'auto';
    });
  });
});

  projectTypeSelect.parentNode.innerHTML += projectTypeHtml;
  projectTypeSelect = document.getElementById('project-type');
  featuresContainer.innerHTML = featuresHtml;
  planSelect.innerHTML = plansHtml;

  projectTypeSelect.addEventListener('change', (event) => {
    const selectedProjectTypeId = event.target.value;
    const selectedProjectType = projectTypes.find(projectType => projectType.id == selectedProjectTypeId);
	  
    if (selectedProjectType) {
		
	  const pname = document.querySelector('.pname');
	  const pdesc = document.querySelector('.pdesc');
	  
	  pname.innerHTML = selectedProjectType.name;
	  pdesc.innerHTML = selectedProjectType.description; 
	  
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
              <input  onchange="updateQuoteResult()" type="checkbox" name="${feature.name}" value="${feature.price}"> ${feature.name} - R${feature.price}
            </label>
          </div>
        </div>
      `).join('');

      const plansHtml = selectedProjectType.plans.map(plan => `
        <option value="${plan.name}">${plan.name} - R${plan.price}</option>
      `).join('');
 
      featuresContainer.innerHTML = featuresHtml;
      planSelect.innerHTML = plansHtml;
	  
	  updateQuoteResult()
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
  
window.updateQuoteResult = function(){
     
	// Time  
	const startDate = new Date(document.getElementById('start-date').value);
    const endDate = new Date(document.getElementById('end-date').value);

    const estimatedDays = Math.round(7*(endDate - startDate) / (1000 * 3600 * 24)); 
	// Amount
    const selectedProjectType = projectTypes.find(projectType => projectType.id == projectTypeSelect.value);
    const selectedTemplatePages = Array.from(templateGroupsContainer.querySelectorAll('input[type="checkbox"]:checked')).map(templatePage => templatePage.value);
    const selectedFeatures = Array.from(featuresContainer.querySelectorAll('input[type="checkbox"]:checked')).map(feature => feature.value);
    const selectedPlan = planSelect.value;
	 
    var discountAmount = 0;
    var totalAmount = 0; 

    // Calculate quote amount based on plan and project estimation
	var quoteAmount = selectedProjectType.plans.find(plan => plan.name == selectedPlan).price;
	var pagePrices = selectedTemplatePages.reduce((acc, price) => acc + parseInt(price), 0);
	var featurePrices = selectedFeatures.reduce((acc, price) => acc + parseInt(price), 0) ;
	 
    // Apply discount if requested
	  const discountRequestCheckbox = document.getElementById('discount-request-checkbox');
	  const discountRequestAmount = discountAmountInput;
	  if (discountRequestCheckbox.checked) {
		discountAmount = (quoteAmount * discountRequestAmount.value) / 100;
		totalAmount = quoteAmount - discountAmount + pagePrices + featurePrices;
	  } else {
		totalAmount = quoteAmount + pagePrices + featurePrices;
	  } 
	   
    // Update quote result HTML
	  quoteAmountValue.innerHTML = quoteAmount.toFixed(2);
	  discountAmountInput.value = discountRequestAmount.value;
	  
	  document.getElementById('total-amount').innerHTML = totalAmount.toFixed(2); 
	  document.getElementById('page-prices').innerHTML = pagePrices.toFixed(2);
	  document.getElementById('feature-prices').innerHTML = featurePrices.toFixed(2); 
	// Price Adjustments 
	  const basePrice = totalAmount;
	  const complexity = document.getElementById('complexity').value.toLowerCase();
	  const projectType = selectedPlan.toLowerCase();
	  const platform = 'web';
	  const projectDurationDays = estimatedDays;

	  const adjustedPrice = adjustPrice(basePrice, complexity, projectType, platform, projectDurationDays); // estimatePhases
	  document.getElementById('adjusted-price').innerHTML = adjustedPrice.toFixed(2); 
	// Determine project phases

	const phases = estimatePhases(complexity, projectType, platform, projectDurationDays);
	
	projectPhasesList.innerHTML = '';
	projectPhasesList.innerHTML += `
	  <table>
	    <thead>
	      <tr>
	        <th>Phase</th>
	        <th>Duration</th>
	        <th>Activities</th>
	      </tr>
	    </thead>
	    <tbody>
	`;
	
	phases.forEach((phase) => {
	  projectPhasesList.innerHTML += `
	    <tr>
	      <td>${phase.name}</td>
	      <td>Days ${phase.start} - ${phase.end}</td>
	      <td>
	        <ul>
	  `;
	  phase.activities.forEach((activity) => {
	    projectPhasesList.innerHTML += `
	          <li>${activity}</li>
	    `;
	  });
	  projectPhasesList.innerHTML += `
	        </ul>
	      </td>
	    </tr>
	  `;
	});
	
	projectPhasesList.innerHTML += `
	    </tbody>
	  </table>
	`;
	// 
	
  }

  const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');

const today = new Date();
const endDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

startDateInput.value = formatDate(today, 'yyyy-mm-ddTHH:mm:ss');
endDateInput.value = formatDate(endDate, 'yyyy-mm-ddTHH:mm:ss');

function formatDate(date, format) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  if (format === 'dd-mm-yyyy') {
    return `${day}-${month}-${year}`;
  } else if (format === 'yyyy-mm-dd') {
    return `${year}-${month}-${day}`;
  } else if (format === 'yyyy-mm-ddTHH:mm:ss') {
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  discountAmountInput.value = 30;
  updateQuoteResult();
  
  planSelect.addEventListener('change', updateQuoteResult);
  discountAmountInput.addEventListener('change', updateQuoteResult);
  startDateInput.addEventListener('change', updateQuoteResult);
  endDateInput.addEventListener('change', updateQuoteResult);
  document.getElementById('complexity').addEventListener('change', updateQuoteResult);
  
});
//------------------------------: Pricing
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
    ],
    disableSecurityWarning: true
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
