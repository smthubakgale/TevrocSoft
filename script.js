import { 
  formConfig , formConfig2 , projectTypes , templates , complexityMultipliers , 
  projectTypeMultipliers , projectDurationMultipliers 
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
  constructor(form, importButton, fileInput, formConfig, callback) {
    this.form = form;
    this.importButton = importButton;
    this.fileInput = fileInput;
    this.formConfig = formConfig;
    this.callback = callback;

    this.renderForm();
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
	spanTitle.style.fontWeight = 'bold';
	span1.textContent = 'more';
	span1.style.color = '#007bff'; // blueish color
	span1.style.cursor = 'pointer'
	div2.innerHTML = field.description;
	div2.style.display = 'none';
	
	span1.addEventListener('click', () => {
	  if (div2.style.display === 'none') {
	    div2.style.display = 'block';
	    span1.textContent = 'less';
	  } else {
	    div2.style.display = 'none';
	    span1.textContent = 'more';
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
  createSelect(field , inputElement , nested = false , parentElement)
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
  renderForm() {
    const fields = this.formConfig.fields;
    const parentElement = this.form;
    const parentName = "myForm";
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
	      if(field.readonly && field.autoincrement)
	      {
		 inputElement.value = field.start ? field.start : 1;
	      }
              break;
            case "checkbox":
              inputElement = document.createElement("input");
              inputElement.type = "checkbox";
              inputElement.name = `${parentName}_${field.name}`;
              inputElement.required = field.required;
              break;
            case "radio":
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
              return;
            case "subform":
              const fieldSet = document.createElement("fieldset");
	      const legend = document.createElement("legend");
	      legend.textContent = field.label;
	      fieldSet.appendChild(legend);
		      
              fieldSet.style.border = "1px solid #ccc";
              fieldSet.style.padding = "10px";
              fieldSet.style.marginBottom = "20px";

              if(field.multiple)
	      {  
                 const addButton = document.createElement("button");
                 addButton.type = "button";
                 addButton.textContent = "Add new " + (field.button ? field.button : field.label);
                 addButton.classList.add("add-button");
                 fieldSet.appendChild(addButton);
		      
	         addButton.addEventListener("click", () => {
		   ts.addButtonEvent(fieldSet, subFormElement);
	         });
	      }

              const subFormElement = this.renderSubForm(fieldSet, field.fields, parentName + "_" + field.name);
              fieldSet.appendChild(subFormElement);


              parentElement.appendChild(fieldSet);
              return;
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

          let description = this.createDescription(field);

          let inputElement;

          switch (field.type) {
            case "select": 
              inputElement = document.createElement("div");
              let selectElement = document.createElement("select");
              selectElement.name = `${parentName}_${field.name}`;
              selectElement.required = field.required;

              this.createSelect(field , selectElement , false , inputElement);
	      inputElement.prepend(selectElement);
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
	      if(field.readonly && field.autoincrement)
	      {
		 inputElement.value = field.start ? field.start : 1;
	      }
              break;
            case "checkbox":
              inputElement = document.createElement("input");
              inputElement.type = "checkbox";
              inputElement.name = `${parentName}_${field.name}`;
              inputElement.required = field.required;
              break;
            case "radio":
              field.options.forEach((option) => {
                inputElement = document.createElement("input");
                inputElement.type = "radio";
                inputElement.name = `${parentName}_${field.name}`;
                inputElement.value = option.value;
                inputElement.required = field.required;

                const labelElement = document.createElement("label");
                labelElement.textContent = option.label;
                labelElement.appendChild(inputElement);

                fieldSet.appendChild(labelElement);
              });
              return;
            case "subform":
	      label = null;
              const fieldSet = document.createElement("fieldset");
	      const legend = document.createElement("legend");
	      legend.textContent = field.label;
	      fieldSet.appendChild(legend);
		      
              fieldSet.style.border = "1px solid #ccc";
              fieldSet.style.padding = "10px";
              fieldSet.style.marginBottom = "20px";

              if(field.multiple)
	      {  
                 const addButton = document.createElement("button");
                 addButton.type = "button";
                 addButton.textContent = "Add new " + (field.button ? field.button : field.label);
                 addButton.classList.add("add-button");
                 fieldSet.appendChild(addButton);
		      
	         addButton.addEventListener("click", () => {
		   ts.addButtonEvent(fieldSet, subFormElement);
	         });
	      }

              const subFormElement = this.renderSubForm(fieldSet, field.fields , parentName + "_" + field.name);
              fieldSet.appendChild(subFormElement);
  
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
	      if(field.readonly && field.autoincrement)
	      {
		 inputElement.value = field.start ? field.start : 1;
	      }
              break;
        case "checkbox":
          inputElement = document.createElement("input");
          inputElement.type = "checkbox";
          inputElement.name = `${parentName}_${field.name}`;
          inputElement.required = field.required;
          inputElement.accept = field.accept;
          break;
                case "radio":
          field.options.forEach((option) => {
            inputElement = document.createElement("input");
            inputElement.type = "radio";
            inputElement.name = `${parentName}_${field.name}`;
            inputElement.value = option.value;
            inputElement.required = field.required;

            const labelElement = document.createElement("label");
            labelElement.textContent = option.label;
            labelElement.appendChild(inputElement);

            subFormElement.appendChild(labelElement);
          });
          return;
            case "subform":
              const fieldSet = document.createElement("fieldset");
	      const legend = document.createElement("legend");
	      legend.textContent = field.label;
	      fieldSet.appendChild(legend);
		      
              fieldSet.style.border = "1px solid #ccc";
              fieldSet.style.padding = "10px";
              fieldSet.style.marginBottom = "20px";

              if(field.multiple)
	      {  
                 const addButton = document.createElement("button");
                 addButton.type = "button";
                 addButton.textContent = "Add new " + (field.button ? field.button : field.label);
                 addButton.classList.add("add-button");
                 fieldSet.appendChild(addButton);
		      
	         addButton.addEventListener("click", () => {
		   ts.addButtonEvent(fieldSet, subFormElement);
	         });
	      }

              const subFormElement = this.renderSubForm(fieldSet, field.fields, parentName + "_" + field.name);
              fieldSet.appendChild(subFormElement);
 
              parentElement.appendChild(fieldSet);
              return;
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
	  const newSubForm = subFormElement.cloneNode(true);
	  newSubForm.id = 'cloned-subform'; 
	
	  // Find all elements with class "subform" in fieldSet
           let subforms = fieldSet.querySelectorAll('.subform');

	  // Initialize current subform index
	  let currentSubformIndex = subforms.length - 1; 
	  // Function to create buttons
	  function createButtons() 
	  {
	    if (fieldSet.querySelector('div.setnav')) { return; }
	    // Create a new div element with class "setnav"
		const setnavDiv = document.createElement('div');
		setnavDiv.classList.add('setnav'); ; 
	    // Create Next and Previous buttons
	    const nextButton = document.createElement('button');
	    nextButton.textContent = 'Next';
	    nextButton.onclick = (e) => {
		e.preventDefault();
		subforms = fieldSet.querySelectorAll('.subform'); 
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
	      subforms = fieldSet.querySelectorAll('.subform');
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
	      subforms = fieldSet.querySelectorAll('.subform');
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
	      subforms = fieldSet.querySelectorAll('.subform');
		    
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
		const addButton = fieldSet.querySelector('button.add-button');
		
		// Insert setnavDiv after the add button
		fieldSet.insertBefore(setnavDiv, addButton.nextSibling); 
	  }
	
	  // Call the function to create buttons
	  createButtons();
	
	  // Reset Form 
	  const inputs = newSubForm.querySelectorAll("input, select, textarea");
	
	  inputs.forEach((input) => 
	  {
	    if(input.type == "number")
	    { 
		console.log(input.getAttribute('autoincrement') == "true" && input.readOnly);
		    
		if(input.getAttribute('autoincrement') == "true" && input.readOnly)    
		{
		    var n = input.step && input.step != "undefined" ? parseInt(input.step) : 1;
		    let m = fieldSet.querySelectorAll('.subform').length + 1;
		    var c = m*n;
		    console.log(input.step , n , m , c);
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
	   
	  // Loop through all subforms
	   subforms.forEach((subform, index) => {
		   if (index === subforms.length - 1) {
		    // Last subform, display block
		    subform.style.display = 'block';
		   } else {
		    // Other subforms, display none
		    subform.style.display = 'none';
		   }
           });
	   // Update subfield Nav 
	   if (fieldSet.querySelector('.setnav')) 
	   {
	      let subforms = fieldSet.querySelectorAll('.subform');
	      let subformCounterText = fieldSet.querySelector('.setnav span');
	      let formNumberInput = fieldSet.querySelector('.setnav input');
		    
	      subformCounterText.textContent = `${subforms.length - 1}/${subforms.length}`;
	      formNumberInput.value = currentSubformIndex + 1;
	      formNumberInput.min = 1;
	      formNumberInput.max = subforms.length;
	   }
	  
	 removeButton.addEventListener("click", () => {
	    newSubForm.remove();
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

	const form = document.getElementById("myForm");
	const importButton = document.getElementById("import-button");
	const fileInput = document.getElementById("file-input"); 
        new FormGenerator(form, importButton, fileInput , formConfig ,
	  (formData) => {
		console.log(formData);
	  });
       //

const formGenerator = new FormGenerator(
  document.getElementById("myForm2"),
  document.getElementById("import-button2"),
  document.getElementById("file-input2"),
  formConfig2,
  (formData) => {
    console.log(formData);
  }
);
  //
 function adjustPrice(basePrice, complexity, projectType, platform, projectDurationDays) {
	  const complexityMultiplier = complexityMultipliers[platform][complexity];
	  const projectTypeMultiplier = projectTypeMultipliers[platform][projectType];
	  const projectDurationMultiplier = projectDurationMultipliers(projectDurationDays);

	  const adjustedPrice = basePrice * complexityMultiplier * projectTypeMultiplier * projectDurationMultiplier;
	  return adjustedPrice;
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
   
  
  function updateQuoteResult(){
     
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

		const adjustedPrice = adjustPrice(basePrice, complexity, projectType, platform, projectDurationDays);
		console.log(`Adjusted price: R ${adjustedPrice.toFixed(2)}`);
	// Determine project phases
	  const phases = [];
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
