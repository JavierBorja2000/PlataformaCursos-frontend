import filtrarBusquedas from "../funcionalidades/filtrar_busquedas.js";
import iniciandoCarritoCompras from "../funcionalidades/carrito_compras.js";

document.addEventListener('DOMContentLoaded', e => {
    filtrarBusquedas("#filtrar_curso", ".card_curso")
    iniciandoCarritoCompras()
})
