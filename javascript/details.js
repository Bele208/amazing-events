console.log([document])
let query = location.search

let parametros = new URLSearchParams(query)

const id = parametros.get("id")

let eventos = data.events
let eventito = eventos.find(eventito => eventito._id == id)
console.log(eventos)

let contDetails = document.getElementById('cards-details')

    contDetails.innerHTML += `
        <div class="details">
        <img src="${eventito.image}" alt="Imagen Evento">
        <div id="details-text">
            <h3>${eventito.name}</h3>
            <p>${eventito.description}</p>
            <div>
            <p>Date: ${eventito.date}</p>
            <p>Category: ${eventito.category}</p>
            <p>Place: ${eventito.place}</p>
            <p>Capacity: ${eventito.capacity}</p>
            <p>Price: U$s${eventito.price}</p>
            </div>
        </div>
</div>
        
        `


// {}