var url_base = "https://localhost:7188/api/";
var url_estudiante = url_base + "Estudiante";
var url_token = url_base + "Token";
var url_usuario = url_base + "Usuario";
var url_curso = url_base + "CursoEstudiante";

const pagina = document.querySelector("body");

function CerrarSesion() {
    deleteCookie("correo");
    deleteCookie("token");
    window.location.href = "/public/pages_publico/home.html";
}

function ImprimirAlerta(respuesta) {
    const alerta = document.querySelector("#alerta");

    console.log(alerta)

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
        body: JSON.stringify({
            Correo: getCookie("correo")
        }),
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
        
        pagina.classList.remove("oculto");
    });
}