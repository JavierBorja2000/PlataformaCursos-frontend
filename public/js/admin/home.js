import menu_desplegable from "../funcionalidades/menu_hamburguesa.js";
var token

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Administrador");
    menu_desplegable(".panel-btn", ".panel-m", ".menulink")
})