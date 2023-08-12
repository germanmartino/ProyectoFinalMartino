import * as DomElements from "./domElements.js";
import {cargarCarrito, cargarDom, carrito, mensajeVaciarCarrito, mensajeFinalizarCompra } from "./funcionProductos.js";
import {divisa, stockZapatillas } from "./main.js";
import {activarModal} from "./modal.js";

//abre el carrito
DomElements.botonCarrito.addEventListener('click', function(){
    activarModal();
    DomElements.carrito.classList.add("activo");
    cargarCarrito(carrito);
})
//cierra el carrito
DomElements.cerrarCarrito.addEventListener('click', function(){
    activarModal();
    DomElements.carrito.classList.remove("activo");
})
//vacia el carrito
DomElements.vaciarCarrito.addEventListener('click', function(){
    mensajeVaciarCarrito();
})
//cambia la cotizacion de dolar a pesos o pesos a dolar
DomElements.botonCotizacion.addEventListener('click', function(){
    let precioDolar = localStorage.getItem("precioDolar")
    parseInt(precioDolar)
    DomElements.contenedor.innerHTML = ""
    cargarDom(stockZapatillas, precioDolar, divisa())
    DomElements.botonCotizacion.innerHTML =  divisa() == "AR$" ? 'U$D' : 'AR$'
})

DomElements.botonComprar.addEventListener('click', function(){
    mensajeFinalizarCompra()
})