// Cotizador Constructor
class Insurance {
  constructor(brand, year, type){
    this.brand = brand;
    this.year = year;
    this.type = type;
  }

  quoteInsurance() {
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

    // Si el seguro es básico se múltiplica por 30% mas
    if (this.type === 'basico') {
      quantity *= 1.30;
    } else {
      quantity *= 1.50;
    }

    console.log(quantity);
    console.log(yearDiff);

    return quantity;
  }
}

// lo que muestro
class Interfaz {

  showMessage(message, type) {
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
    }, 1500);
  }

  showResults(insurance, total) {
    const boxResults = document.getElementById('resultado');
    let brand;

    switch (insurance.brand) {
      case '1':
        brand = 'Americano';
        break;
      case '2':
        brand = 'Asiatico';
        break;
      case '3':
        brand = 'Europeo';
        break;
    }

    const div = document.createElement('div');

    div.innerHTML = `
      <p class="header">Tu resumen</p>
      Marca: ${brand} <br>
      Año: ${insurance.year} <br>
      Tipo: ${insurance.type} <br>
      Total: $ ${total}
    `

    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';

    setTimeout(function () {
      spinner.style.display = 'none';
      boxResults.appendChild(div);
    }, 1500);


    console.log(brand);

  }
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
    interfaz.showMessage('Faltan datos, revisa e intenta de nuevo', 'error')
  } else {
    // Limpiar resultados anteriores
    const resultBox = document.querySelector('#resultado div');
    if (resultBox != null) {
      resultBox.remove();
    }
    // Instanciar seguro y mostrar interfaz
    const insurance = new Insurance(selectedBrand, selectedYear, type);
    // Cotizar el seguro
    const quantity = insurance.quoteInsurance();
    interfaz.showResults(insurance, quantity);
    interfaz.showMessage('Cotizando...', 'correcto')
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
