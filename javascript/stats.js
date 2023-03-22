let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function creandoTabla() {
    try {
        //-------------Función del loader-----------//
        function mostrarLoader() {
            document.getElementById("loader").style.display = "block";
        }
        mostrarLoader()

        function ocultarLoader() {
            document.getElementById("loader").style.display = "none";
        }
        let response = await fetch(urlApi)

        let datos = await response.json()
        let losEventos = datos.events
        let currentDate = datos.currentDate

        ocultarLoader()

        //----------------tabla 1--------------//

        let asistPorcentaje = losEventos
            .filter(elEvento => elEvento.assistance !== undefined)
            .map(elEvento => {
                return {
                    name: elEvento.name, assistance: elEvento.assistance, capacity: elEvento.capacity,
                    porcentaje: ((elEvento.assistance / elEvento.capacity) * 100).toFixed(2)
                }
            })

        let asistenciaEvent = asistPorcentaje
            .sort((elementoA, elementoB) => elementoB.porcentaje - elementoA.porcentaje)
            .map(elEvento => {
                return `${elEvento.name}`
            })

        let eventosFilt = asistenciaEvent.slice(-3)

        let enventillosPasados = losEventos
            .filter(elEvento => elEvento.date < currentDate)

        let capacidadEvento = enventillosPasados
            .sort((elementoC, elementoD) => elementoD.capacity - elementoC.capacity)
            .map(elEvento => {
                return `${elEvento.name}`
            })

        //----------------creación tabla 1--------------//
        let tabla1 = document.getElementById("primeraTabla")
        tabla1.innerHTML += ` 
        <tr>
          <td>${asistenciaEvent[0]}</td>
          <td>${eventosFilt[2]}</td>
          <td>${capacidadEvento[0]}</td>
        </tr>
      `
        //----------------tabla 2--------------//
        //----------armando la tabla------------//

        let eventosFuturos = losEventos.filter(elEvento => elEvento.date > currentDate)
            .map(elEvento => {
                return {
                    name: elEvento.name, category: elEvento.category, capacity: elEvento.capacity, estimate: elEvento.estimate, price: elEvento.price, revenues: elEvento.price * elEvento.estimate,
                }
            })

        let lasCategorias = eventosFuturos.map((categoriaFut) => categoriaFut.category)

        let upcomingCategory = lasCategorias.filter(
            (item, index) => lasCategorias.indexOf(item) == index)

        function categoriasFuturas(category) {
            let ganancias = 0
            let capacidad = 0
            let asistEstimada = 0
            let catFut = []
            eventosFuturos.forEach(event => {
                if (event.category == category) {
                    ganancias += event.revenues
                    capacidad += event.capacity
                    asistEstimada += event.estimate
                }
            });

            let porcentajeCat = ((asistEstimada / capacidad) * 100).toFixed(2)
            catFut.push(ganancias)
            catFut.push(porcentajeCat)
            return catFut
        }

        function datosUpcoming() {
            upcomingCategory.forEach(category1 => {
                eventFut.push(categoriasFuturas(category1))
            })
        }

        let eventFut = []
        datosUpcoming()

        let tabla2 = document.getElementById("segundaTabla");

        upcomingCategory.forEach((categoria, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${categoria}</td>
            <td>$ ${eventFut[index][0]}</td>
            <td>${eventFut[index][1]} %</td>
        `;
            tabla2.appendChild(row);
        });

        //----------------tabla 3--------------//
        //----------armando la tabla------------//
        let eventosPasados = losEventos.filter(elEvento => elEvento.date < currentDate)
            .map(elEvento => {
                return {
                    name: elEvento.name, category: elEvento.category, capacity: elEvento.capacity,
                    price: elEvento.price, assistance: elEvento.assistance, revenues: elEvento.price * elEvento.assistance,
                }
            })

        let lasCategoriasPast = eventosPasados.map((categoriaPast) => categoriaPast.category)

        let pastCategory = lasCategoriasPast.filter(
            (item, index) => lasCategoriasPast.indexOf(item) == index)

        function categoriasPasadas(category) {
            let ganancias = 0
            let capacidad = 0
            let asistencia = 0
            let catPast = []
            eventosPasados.forEach(event => {
                if (event.category == category) {
                    ganancias += event.revenues
                    capacidad += event.capacity
                    asistencia += event.assistance
                }
            });

            let porcentajeCat = ((asistencia / capacidad) * 100).toFixed(2)
            catPast.push(ganancias)
            catPast.push(porcentajeCat)
            return catPast
        }

        function datosPast() {
            pastCategory.forEach(categoria => {
                eventPast.push(categoriasPasadas(categoria))
            })
        }
        let eventPast = []
        datosPast()

        let tabla3 = document.getElementById("terceraTabla");

        pastCategory.forEach((categoria, index) => {
            const row2 = document.createElement("tr");
            row2.innerHTML = `
            <td>${categoria}</td>
            <td>$ ${eventPast[index][0]}</td>
            <td>${eventPast[index][1]} %</td>
        `;
            tabla3.appendChild(row2);
        });

    }
    catch {
        console.log("Ha ocurrido un error, espere un instante y vuelva a recargar la página")
    }
}

creandoTabla()