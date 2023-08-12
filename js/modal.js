import * as DomElements from "./domElements.js";

export function activarModal(){
    DomElements.modalCarrito.classList.toggle("modal-active");
}

DomElements.modalCarrito.addEventListener('click', (e) =>{
    if(e.target == DomElements.modalCarrito){
        activarModal()
    }    
})
