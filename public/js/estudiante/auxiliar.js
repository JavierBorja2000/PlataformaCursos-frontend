var url_base = "http://25.52.127.25/api/";
var url_estudiante = url_base + "Estudiante";
var url_token = url_base + "Token";
var url_usuario = url_base + "Usuario";
var url_curso = url_base + "CursoComprado";
var url_facturas = url_base + "Factura";
var url_carrito = url_base + "Carrito";
var url_home = url_base + "CursoEstudiante";
var url_compra = url_base + "ConfirmarCompra";

const pagina = document.querySelector("body");

function CerrarSesion() {
    deleteCookie("token");
    window.location.href = "/public/pages_publico/home.html";
}

function ImprimirAlerta(respuesta) {
    const alerta = document.querySelector("#alerta");

    if (respuesta.error) {
        if (alerta.classList.contains("text-green-600")) {
            alerta.classList.remove("text-green-600");
        }

        alerta.classList.add("text-red-600");
    }
    else {
        if (alerta.classList.contains("text-red-600")) {
            alerta.classList.remove("text-red-600");
        }

        alerta.classList.add("text-green-600");
    }

    alerta.textContent = respuesta.msg;

    setTimeout(() => {
        alerta.textContent = "";
    }, 3000);
}

function ValidarToken(rol) {
    token = getCookie("token");

    if (!token) {
        window.location.href = "../pages_publico/home.html";
    }

    fetch(url_usuario, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            window.location.href = "../pages_publico/home.html";
        }
    }).then (function (Data){
        
        if(!Data.rol || Data.rol !== rol){
            window.location.href = "../pages_publico/home.html";
        }
        
        pagina.classList.remove("hidden");
    });
}