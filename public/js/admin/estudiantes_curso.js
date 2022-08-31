var token;
var id;

const listadoVacio = document.querySelector("#listadoVacio");
const tabla = document.querySelector("#tabla");
const listado = document.querySelector("#listado");

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Administrador");

    var url = new URL(window.location.href.toLowerCase());
    id = url.searchParams.get("id");

    ObtenerEstudiantes();
})

function ObtenerEstudiantes() {
    fetch(url_curso_admin+ "/" + id, {
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
            console.log(response)
        }
    }).then(function (Data) {
        console.log(Data)
        ImprimirEstudiantes(Data)
    });
}

function ImprimirEstudiantes(estudiantes){
    if (estudiantes.length === 0) {
        listadoVacio.textContent = "No hay estudiantes que hayan comprado este curso todavía";
        return;
    }

    tabla.classList.remove("hidden");

    estudiantes.forEach(estudiante => {
        const fila = document.createElement("tr");
        fila.classList.add("border-y", "px-6");

        const id_estudiante = document.createElement("td");
        id_estudiante.classList.add("px-3", "py-2", "font-bold");
        id_estudiante.textContent = estudiante.idCurso;

        const nombre = document.createElement("td");
        nombre.classList.add("px-3", "py-2");
        nombre.textContent = estudiante.nombres + " " + estudiante.apellidos;

        const telefono = document.createElement("td");
        telefono.classList.add("px-3", "py-2");
        telefono.textContent = estudiante.telefono;

        const correo = document.createElement("td");
        correo.classList.add("px-3", "py-2");
        correo.textContent = estudiante.correo;

        fila.appendChild(id_estudiante);
        fila.appendChild(nombre);
        fila.appendChild(telefono);
        fila.appendChild(correo);
        listado.appendChild(fila);
    });
}