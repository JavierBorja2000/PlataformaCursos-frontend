var token;
var id_editar;

document.addEventListener('DOMContentLoaded', e => {
    var url = new URL(window.location.href.toLowerCase());
    id_editar = localStorage.getItem("idEditar");
    ValidarToken("Instructor");

    if(id_editar != null){
        ObtenerCurso();
    }
});

// Datos del curso
const nombre = document.querySelector("#nombre");
const descripcion = document.querySelector("#descripcion");
const costo = document.querySelector("#costo");

function ObtenerCurso() {
    fetch(url_cursoInstructor + "/" + id_editar, {
        method: "GET",
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
            console.log(response);
        }
    }).then(function (Data) {
        MostrarDatos(Data[0]);
    });
}

function MostrarDatos(Curso){
    nombre.value = Curso.nombre;
    descripcion.value = Curso.descripcion;
    costo.value = parseFloat(Curso.costo).toFixed(2);
};

function DeterminarAccion(){
    if(id_editar != null){
        EditarCurso();
    }else{
        GuardarCurso();
    }
}

function EditarCurso(){
    fetch(url_cursoInstructor, {
        method: "PUT",
        body: JSON.stringify({
            idCurso: id_editar,
            nombre: nombre.value,
            descripcion: descripcion.value,
            costo: costo.value
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
            console.log(response)
        }
    }).then(function (Data) {
        localStorage.removeItem("idEditar");
        window.location.href = "/public/pages_instructor/curso_individual.html";
    });
};

function GuardarCurso(){
    fetch(url_cursoInstructor, {
        method: "POST",
        body: JSON.stringify({
            nombre: nombre.value,
            descripcion: descripcion.value,
            costo: costo.value
        }),
        headers:{
            "Authorization": `Bearer ${token}`,
            'Accept' : "application/json",
            "Content-Type":"application/json",
        }
    }).then(function(response){
        if (response.ok) {
            return response.json();
        }
        else {
            console.log(response)
        }
    }).then(function(Data){
        console.log(Data);
        window.location.href = "/public/pages_instructor/miscursos.html";
    })
};

function Validar(){
    if (nombre.value.trim() === "" || descripcion.value.trim() === "" || costo.value.trim("") === "") {
        Alerta({
            msg: "Todos los campos son obligatorios",
            error: true
        })
        return;
    }else if(costo.value < 1){
        Alerta({
            msg: "El costo no debe tener un valor negativo",
            error: true
        })
    }
    else{
        DeterminarAccion();
    }
}

function Alerta(respuesta) {
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