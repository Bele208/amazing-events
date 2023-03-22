// ////////////////-----------EVENTOS PASADOS----------///////////////////

let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function traerDatos() {
  try {

    //FUNCION DEL LOADER
    function mostrarLoader() {
      document.getElementById("loader").style.display = "block";
    }
    mostrarLoader()

    function ocultarLoader() {
      document.getElementById("loader").style.display = "none";
    }

    let response = await fetch(urlApi)

    let datos = await response.json()

    // FILTRAR LAS CARDS Y MOSTRAR LOS EVENTOS FUTUROS
    let eventosPasados = []
    function compararFechas(elEvento) {
      for (elEvento of datos.events) {
        if (datos.currentDate > elEvento.date) {
          eventosPasados.push(elEvento)
        }
      }
      return eventosPasados;
    }

    compararFechas(eventosPasados)

    // AGREGAR CATEGORIAS
    let categorias = []
    let category = document.getElementById("form-category")
    datos.events.forEach(evento => {
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

    let checkBoton = document.querySelectorAll("input[type='checkbox']")
    let eventsChecked = []

    checkBoton.forEach(boton => boton.addEventListener('change', verificado))
    function verificado() {
      eventsChecked = []
      let seleccionar = Array.from(checkBoton).filter(check => check.checked)
      for (const event of eventosPasados) {
        seleccionar.forEach(input => {
          if (event.category == input.value) {
            eventsChecked.push(event)
          }
        });
      }
      if (eventsChecked.length > 0) {
        crearCard(eventsChecked, ".cards")
      } else {
        crearCard(eventosPasados, ".cards")
      }
    };

    crearCard(eventosPasados, ".cards")
    ocultarLoader()
        //---------------------- B U S C A D O R ---------------------------//

        let botonEnviar = document.getElementById("enviar");

        botonEnviar.addEventListener("click", function(event){
          event.preventDefault();
          let searchInput = document.getElementById("search").value.toLowerCase();

          eventsChecked = eventosPasados.filter(function(evento){
            return evento.name.toLowerCase().includes(searchInput) || evento.description.toLowerCase().includes(searchInput);
          });
          if (eventsChecked.length === 0) {
            let cardsContainer = document.querySelector(".cards");
            cardsContainer.innerHTML = "<p>No results found. Try another word, for example: food.</p>";
          } else {
            crearCard(eventsChecked, ".cards");
          }
        });
        
        inputSearch = document.getElementById("search");
        
        inputSearch.addEventListener("input", function () {
          let searchInput = inputSearch.value.toLowerCase();
          if (searchInput === "") {
            crearCard(eventosPasados, ".cards");
          }
        });
        
        //----------------------F I N   B U S C A D O R ---------------------------//
        
  }
  catch {
    console.log("Ha ocurrido un error, espere un instante y vuelva a recargar la página")
  }
}

traerDatos()

//////////////////-----------CARDS-----------/////////////////////
const queryString = location.search
const params = new URLSearchParams(queryString)

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