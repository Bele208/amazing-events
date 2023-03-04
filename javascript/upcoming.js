////////////////-----------EVENTOS FUTUROS----------///////////////////
let currentDate = data.currentDate

let eventosFuturos = []
function compararFechas(events) {
  
  for(events of events){
  if (currentDate < events.date) {
      eventosFuturos.push(events)
  }
    
}
return eventosFuturos;
}

console.log(compararFechas(data.events))

//////////////////-----------CARDS-----------/////////////////////

let cards2 = document.getElementById("cards")
let fragmento = document.createDocumentFragment()

for (events of eventosFuturos){

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

  ///////////////////--------TASK3----------///////////////////////

  let categorias = [];

  let category = document.getElementById("form-category")
  data.events.forEach(evento => {
    if(!categorias.includes(evento.category)){
      categorias.push(evento.category)
        category.innerHTML += `
          <div id="content-cat">
              <label>
                  <input type="checkbox" name="category1" id="category1">
                  <span>${evento.category}</span>
              </label>
          </div>`
  }
  });
  console.log(categorias)