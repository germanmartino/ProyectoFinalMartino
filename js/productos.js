let contenedorShop = document.getElementsByClassName("shop-content");

const zapatillas = [
    { id: 1, marca: Nike, precio: 25000, img: "img/hombre/1.webp"},
    { id: 2, marca: Nike, precio: 25000, img: "img/hombre/2.webp"},
    { id: 3, marca: Nike, precio: 25000, img: "img/hombre/3.webp"},
];

function cargar (zapatillas){
    zapatillas.forEach(zapatilla => {
        const div = document.createElement("div")
        div.classList.add("producto-box");
        div.innerHTML = `
            <img src="img/hombre/1.webp" alt="" class="producto-img">
            <h2 class="producto-titulo"> ${zapatilla.marca}</h2>
            <span class="precio">${zapatilla.precio}</span>
            <i class='bx bx-shopping-bag add-cart'></i>
        </div>
        `   ;
        contenedorShop.appendchild(div);
    });

}

cargar(zapatillas);


<div class="producto-box">
                <img src="img/product1.jpg" alt="" class="producto-img">
                <h2 class="producto-titulo">Nike</h2>
                <span class="precio">$25</span>
                <i class='bx bx-shopping-bag add-cart'></i>
            </div>
            <div class="producto-box">
                <img src="img/product2.jpg" alt="" class="producto-img">
                <h2 class="producto-titulo">WIRELESS EARBUDS</h2>
                <span class="precio">$25</span>
                <i class='bx bx-shopping-bag add-cart'></i>
            </div>
            <div class="producto-box">
                <img src="img/product3.jpg" alt="" class="producto-img">
                <h2 class="producto-titulo">HOODE PARKA</h2>
                <span class="precio">$25</span>
                <i class='bx bx-shopping-bag add-cart'></i>
            </div>
            <div class="producto-box">
                <img src="img/product4.jpg" alt="" class="producto-img">
                <h2 class="producto-titulo">STRAW METAL BOTTLE</h2>
                <span class="precio">$25</span>
                <i class='bx bx-shopping-bag add-cart'></i>
            </div>
            <div class="producto-box">
                <img src="img/product5.jpg " alt="" class="producto-img">
                <h2 class="producto-titulo">SILVER METAL</h2>
                <span class="precio">$25</span>
                <i class='bx bx-shopping-bag add-cart'></i>
            </div>
            <div class="producto-box">
                <img src="img/product6.jpg " alt="" class="producto-img">
                <h2 class="producto-titulo">BACK HAT</h2>
                <span class="precio">$25</span>
                <i class='bx bx-shopping-bag add-cart'></i>
            </div>
            <div class="producto-box">
                <img src="img/product7.jpg " alt="" class="producto-img">
                <h2 class="producto-titulo">BACKPACK</h2>
                <span class="precio">$25</span>
                <i class='bx bx-shopping-bag add-cart'></i>
            </div>
            <div class="producto-box">
                <img src="img/product8.jpg " alt="" class="producto-img">
                <h2 class="producto-titulo">ULTRABOOST 22</h2>
                <span class="precio">$25</span>
                <i class='bx bx-shopping-bag add-cart'></i>
            </div>