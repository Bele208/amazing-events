let query = location.search

let parametros = new URLSearchParams(query)

let id = parametros.get("id")

let eventos = data.events
let eventDetail = eventos.find(eventDetail => eventDetail._id == id)


let contDetails = document.querySelector(".cards-details")

    contDetails.innerHTML = `<div class="details">
        <img src="${eventDetail.image}" alt="${eventDetail.name}">
        <div id="details-text">
            <h3>${eventDetail.name}</h3>
            <p>${eventDetail.description}</p>
            <div>
            <p>Date: ${eventDetail.date}</p>
            <p>Category: ${eventDetail.category}</p>
            <p>Place: ${eventDetail.place}</p>
            <p>Capacity: ${eventDetail.capacity}</p>
            <p>Price: U$s${eventDetail.price}</p>
            </div>
        </div>
</div>`

