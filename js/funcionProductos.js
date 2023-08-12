import * as DomElements from "./domElements.js";
import { toastify } from "./toastify.js";
import { activarModal } from "./modal.js";

export let carrito = [];
export let cotDolar;

//carga las zapatillas
export function cargarDom (zapatillas, precioDolar, divisa){
    for(const zapatilla of zapatillas)  { 
        zapatilla.precioDolar = zapatilla.precio / parseInt(precioDolar)
        zapatilla.push
        const div = document.createElement("div")
        div.classList.add("producto-box");
        div.innerHTML = `
            <img src=${zapatilla.img} alt="" class="producto-img">
            <h2 class="producto-titulo"> ${zapatilla.marca}</h2>
            <h4>${zapatilla.descripcion}</h4>
            <span class="precio">${divisa} ${precioArreglado(divisa == "AR$" ? zapatilla.precio : zapatilla.precioDolar)}</span>
            <i class="bx bx-shopping-bag add-cart" id="agregar-carrito${zapatilla.id}"></i>
        </div>
        `;
        DomElements.contenedor.appendChild(div);
        const botonAgregar = document.getElementById(`agregar-carrito${zapatilla.id}`)
        botonAgregar.addEventListener('click', ()=> {
            agregarAlCarrito(zapatilla.id, zapatillas);
        })
    };
    localStorage.setItem('precioDolar',precioDolar)
}

function agregarAlCarrito (prodId, zapatillas)  {
    //PARA AUMENTAR LA CANTIDAD Y QUE NO SE REPITA
    toastify("agregado");
    const existe = carrito.some ((prod) => prod.id === prodId); 
    if (existe){ 
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++;
            }
        })
    } else { //EN CASO DE QUE NO ESTE SE AGREGA AL CARRITO
        const item = zapatillas.find((prod) => prod.id === prodId);
        item.cantidad = 1;
        carrito.push(item);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizarContadorCarrito();
}    

export function cargarCarrito () {
    if (carrito.length > 0) {
        DomElements.carritoVacio.classList.add("disabled");
        DomElements.vaciarCarrito.classList.remove("disabled");
        DomElements.botonComprar.classList.remove("disabled");
    } else {
        DomElements.carritoVacio.classList.remove("disabled");
        DomElements.vaciarCarrito.classList.add("disabled");
        DomElements.botonComprar.classList.add("disabled");
    }
    DomElements.carritoContenido.innerHTML = "";
    carrito.forEach(producto => {
        let codigo = localStorage.getItem('divisa')
        const div = document.createElement ("div");
        div.classList.add("carrito-box");
        div.innerHTML = `
        <img src="${producto.img}" alt="" class="carrito-img">
        <div class="detail-box">
            <div class="cart-product-title">${producto.marca}</div>
            <div class="carrito-producto-descripcion">${producto.descripcion}</div>
            <div class="cantidad">
                <i class='bx bx-minus-circle restar-cantidad' id="restar-cantidad${producto.id}"></i>
                <div class="cart-quatity">${producto.cantidad} </div>
                <i class='bx bx-plus-circle sumar-cantidad' id="sumar-cantidad${producto.id}"></i> 
            </div>   
            <div class="cart-price" id"producto-precio">${codigo} ${precioArreglado((codigo == 'AR$'? (producto.precio) : (producto.precioDolar))  * (producto.cantidad))}</div>
        </div>
        <i class='bx bx-trash carrito-remover' id="eliminar-producto${producto.id}"></i>
        </div>
        `;
        DomElements.carritoContenido.append(div);
        const botonRestar = document.getElementById(`restar-cantidad${producto.id}`);
        botonRestar.addEventListener('click', ()=> {
            restarDelCarrito(producto.id, producto.cantidad);
        })
        const botonSumar = document.getElementById(`sumar-cantidad${producto.id}`);
        botonSumar.addEventListener('click', ()=> {
            sumarDelCarrito(producto.id);
        })
        const botonEliminar = document.getElementById(`eliminar-producto${producto.id}`);
        botonEliminar.addEventListener('click', ()=> {
            eliminarDelCarrito(producto.id)
        })
        actualizarTotal();
        actualizarContadorCarrito();
})
}

function restarDelCarrito (productoId, productoCantidad){
    if(productoCantidad >1){
        const prod = carrito.map (prod => { 
            if (prod.id === productoId){
                prod.cantidad--;
            }
        })    
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizarTotal();
    actualizarContadorCarrito();
    cargarCarrito ();
}

function sumarDelCarrito (productoId) {
    const prod = carrito.map (prod => { 
        if (prod.id === productoId){
            prod.cantidad++;
        }
    })
    localStorage.setItem('carrito', JSON.stringify(carrito))
    cargarCarrito ();
    actualizarTotal();
    actualizarContadorCarrito();
}

function eliminarDelCarrito (productoId) {
    const item = carrito.find((prod) => prod.id === productoId)
    const indice = carrito.indexOf(item) //Busca el elemento q yo le pase y nos devuelve su indice.
    carrito.splice(indice, 1) //Le pasamos el indice de mi elemento ITEM y borramos 
    // un elemento 
    //actualizarCarrito() //LLAMAMOS A LA FUNCION QUE CREAMOS EN EL TERCER PASO. CADA VEZ Q SE 
    //MODIFICA EL CARRITO
    toastify("eliminado");
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
    actualizarTotal();
    actualizarContadorCarrito();
}

function actualizarTotal() {
    let codigo = localStorage.getItem('divisa')
    const totalCalculado = carrito.reduce((acc, producto) => acc + ((codigo == 'AR$'? (producto.precio) : (producto.precioDolar)) * producto.cantidad), 0);
    DomElements.precioTotalCarrito.innerText = `${codigo} ${precioArreglado(totalCalculado)}`;
}

function precioArreglado (num) {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
};

export function borrarCarrito() {
    carrito.length = 0
    localStorage.setItem('carrito', JSON.stringify(carrito))
    cargarCarrito();
    actualizarTotal();
    actualizarContadorCarrito(); 
}

function actualizarContadorCarrito (){
    if (carrito.length > 0) {
        const span = document.createElement("span");
        span.classList.add("circulo-carrito");
        span.innerHTML= `${carrito.length}`
        DomElements.carritoIcono.appendChild(span)
    } else {
        while (DomElements.carritoIcono.firstChild) {
            DomElements.carritoIcono.removeChild(DomElements.carritoIcono.firstChild);
          }
    }
}

export function mensajeVaciarCarrito() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: `Tenés ${carrito.length} ${carrito.length > 1 ? "productos" : "producto"} en el carrito.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado',
            'Su carrito ha sido eliminado.',
            'success'            
          )
          borrarCarrito();
        }
      })
}

export function mensajeFinalizarCompra() {
    Swal.fire(
        'Sera redirigido al medio de pago',
        'Gracias por comprar en BiriBiri-Shop',
        'success'
    )
    borrarCarrito();
    activarModal();
}
/*
export function cargarCotizacion(cotizacion){
    return (cotizacion[0].casa.venta);
}
*/