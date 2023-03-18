let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function traerNumeros() {
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
        console.log(datos.currentDate);
        console.log(datos.events[0].capacity)
        ocultarLoader()
    }
    catch {
        console.log("Ha ocurrido un error, espere un instante y vuelva a recargar la página")
    }

}

traerNumeros()

console.log("Hola");