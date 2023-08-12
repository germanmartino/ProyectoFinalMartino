import { botonCotizacion } from "./domElements.js";
import { cargarDom } from "./funcionProductos.js"

//Obtiene el codigo del DOM del tipo de cotizacion
export let divisa = () => {
    let codigo = localStorage.getItem('divisa')
    !codigo ? codigo = 'AR$' : codigo = botonCotizacion.innerHTML
    localStorage.setItem('divisa',codigo) 
    return codigo;
}

export let stockZapatillas = [];
export let cotDolar;

//Promesas, obtener el listado de zapatillas y la cotizacion del dolar
const promesas = [
    fetch("./js/zapatillas.json")
    .then(response => response.json()),

    fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    .then(response => response.json())    
]

//Carga las promesas, la idea es obtener primero la cotizacion del dolar
//y despues cargar en un nuevo array de objetos las zapatillas con la 
//cotizacion del dolar
Promise.allSettled(promesas)
.then(data => {
    agregarPrecioDolar(data[0].value, data[1].value[0].casa.venta)
    cargarDom(stockZapatillas, data[1].value[0].casa.venta, divisa())
})

//Agrega la el precio del dolar al nuevo array de zapatillas
function agregarPrecioDolar (zapatillas, precioDolar){
    for (const zapatilla of zapatillas ){
        zapatilla.precioDolar = zapatilla.precio / parseInt(precioDolar)
        stockZapatillas.push(zapatilla)
    }
}