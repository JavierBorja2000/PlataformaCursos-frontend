import menu_desplegable from "../funcionalidades/menu_hamburguesa.js";
import iniciandoCarritoCompras from "../funcionalidades/carrito_compras.js";

document.addEventListener('DOMContentLoaded', e => {
    menu_desplegable(".panel-btn", ".panel-m", ".menulink")
    iniciandoCarritoCompras()
})