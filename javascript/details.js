urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function traerDatos() {
    try {
        let response = await fetch(urlApi)

        let datos = await response.json()

        tarjetaDetails(datos.events)
    }
    catch {
        console.log()
    }
}

traerDatos()

let query = location.search
let parametros = new URLSearchParams(query)

let id = parametros.get("id")

function tarjetaDetails(arr) {
    let contDetails = document.querySelector(".cards-details")
    let eventDetail = arr.find(eventDetail => eventDetail._id == id)

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

}


