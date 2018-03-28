// Cotizador Constructor
function Insurance(brand, year, type) {
  this.brand = brand;
  this.year = year;
  this.type = type;
}

Insurance.prototype.quoteInsurance = function () {
  let quantity;
  const basicPrice = 2000;

  switch (this.brand) {
    case '1': // americano
      quantity = basicPrice * 1.15;
      break;
    case '2': // asiatico
      quantity = basicPrice * 1.05;
      break;
    case '3': // europeo
      quantity = basicPrice * 1.35;
      break;
  }

  // Lee el año y calcula
  const yearDiff = new Date().getFullYear() - this.year;

  // Cada año de diferencia se reduce 3% el valor del seguro
  quantity -= ((yearDiff * 3) * quantity) / 100;

  console.log(quantity);
  console.log(yearDiff);
}

// lo que muestro
function Interfaz() {}

Interfaz.prototype.showError = function (message, type) {
  const alert = document.createElement('div');
  if (type === 'error') {
    alert.classList.add('mensaje', 'error');
  } else {
    alert.classList.add('mensaje', 'correcto');
  }
  alert.innerHTML = `${message}`
  form.insertBefore(alert, document.querySelector('.form-group'));

  setTimeout(function () {
    document.querySelector('.mensaje').remove();
  }, 3000);
}

// event listeners
const form = document.getElementById('cotizar-seguro');
form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  // Lee la marca seleccionada del select
  const brand = document.getElementById('marca');
  const selectedBrand = brand.options[brand.selectedIndex].value;
  console.log(selectedBrand);

  // Lee el año seleccionado
  const year = document.getElementById('anio');
  const selectedYear = year.options[year.selectedIndex].value;
  console.log(selectedYear);

  // Lee el tipo de seguro seleccionado
  const type = document.querySelector('input[name="tipo"]:checked').value;
  console.log(type);

  // Crea instancia de interfaz
  const interfaz = new Interfaz();

  // Reviso que los campos no estan vacios
  if (selectedBrand === '' || selectedYear === '' || type === '') {
    // Interfaz imprimiendo error
    interfaz.showError('Faltan datos, revisa e intenta de nuevo', 'error')
  } else {
    // Instanciar seguro y mostrar interfaz
    const insurance = new Insurance(selectedBrand, selectedYear, type);

    // Cotizar el seguro
    const calc = insurance.quoteInsurance(insurance);
  }

}


// options de año
const maxYear = new Date().getFullYear(),
      minYear = maxYear - 20;

console.log(maxYear);
console.log(minYear);

const yearSelector = document.getElementById('anio');

for (var i = maxYear; i > minYear; i--) {
  let option = document.createElement('option');
  option.value = i;
  option.innerHTML = i;
  yearSelector.appendChild(option);
}
