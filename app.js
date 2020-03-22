const form = new FormTool(document.querySelector('form'));

form.fillFields({ data: 'sample', data2: 'cheese' });

console.log(form.grabValues());

form.clearForm();
