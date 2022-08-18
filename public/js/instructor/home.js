import menu_desplegable from "../funcionalidades/menu_hamburguesa.js";
var token

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Instructor");
    menu_desplegable(".panel-btn", ".panel-m", ".menulink")
})