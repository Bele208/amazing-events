//////////////////-----------CARDS-----------/////////////////////
const queryString = location.search
const params = new URLSearchParams(queryString)


let events = data.events

let fragmento = document.createDocumentFragment()

function crearCard(arr, contenedor) {
  let cards2 = document.querySelector(contenedor)
  cards2.innerHTML = ""
  for (events of arr) {
    let imagen = document.createElement('img')
    imagen.className = "imagen-card"
    imagen.src = events.image
    fragmento.appendChild(imagen)

    let titulo = document.createElement('h3')
    titulo.className = "titulo-card"
    titulo.textContent = events.name
    fragmento.appendChild(titulo)

    let parrafo = document.createElement('p')
    parrafo.className = "p-card"
    parrafo.textContent = events.description
    fragmento.appendChild(parrafo)

    let priceP = document.createElement('p')
    priceP.className = "priceP"
    priceP.textContent = "Price: U$S" + events.price

    let verMas = document.createElement('a')
    verMas.className = "verMas"
    verMas.innerHTML = `
    <a href="./details.html?id=${events._id}">Ver Más</a>`

    let divPrice = document.createElement('div')
    divPrice.className = "price"
    divPrice.appendChild(priceP)
    divPrice.appendChild(verMas)

    let divCont = document.createElement('div')
    divCont.className = "conteiner-cards"
    divCont.appendChild(imagen)
    divCont.appendChild(titulo)
    divCont.appendChild(parrafo)
    divCont.appendChild(divPrice)
    fragmento.appendChild(divCont)
  }

  cards2.appendChild(fragmento)
}
crearCard(events, ".cards")
///////////////////--------TASK3----------///////////////////////

let categorias = [];

let category = document.getElementById("form-category")
data.events.forEach(evento => {
  if (!categorias.includes(evento.category)) {
    categorias.push(evento.category)
    category.innerHTML += `
          <div id="content-cat">
              <label class="checkbox">
                  <input type="checkbox" name="category" id="${evento.category}" value="${evento.category}">
                  <span>${evento.category}</span>
              </label>
          </div>`
  }
});

//------------- FILTRO CATEGORÍA -------------//
let checkBoton = document.querySelectorAll("input[type='checkbox']")
let eventsChecked = []
// console.log(events)

checkBoton.forEach(boton => boton.addEventListener('change', verificado))
function verificado() {
  eventsChecked = []
  let seleccionar = Array.from(checkBoton).filter(check => check.checked)
  // console.log(seleccionar)
  for (const event of data.events) {
    seleccionar.forEach(input => {
      if (event.category == input.value) {
        eventsChecked.push(event)
      }
    });
  }
  // console.log(eventsChecked)
  if (eventsChecked.length > 0) {
    crearCard(eventsChecked, ".cards")
  } else {
    crearCard(data.events, ".cards")
  }
};


//--------------------BUSCADOR--------------------//
