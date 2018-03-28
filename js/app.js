// Cotizador Constructor

function Seguro() {

}


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
