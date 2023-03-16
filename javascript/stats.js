let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function traerNumeros(){
    try{

    let response = await fetch(urlApi)

    let datos = await response.json()
    console.log(datos.currentDate);

    }
    catch {
        console.log("Ha ocurrido un error, espere un instante y vuelva a recargar la página")
      }

}

traerNumeros()

console.log("Hola");