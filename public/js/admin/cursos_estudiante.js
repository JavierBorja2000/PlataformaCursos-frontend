var token;
var id;

const listadoVacio = document.querySelector("#listadoVacio");
const tabla = document.querySelector("#tabla");
const listado = document.querySelector("#listado");

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Administrador");

    var url = new URL(window.location.href.toLowerCase());
    id = url.searchParams.get("id");

    ObtenerDatos();
})


function ObtenerDatos() {
    fetch(`${url_estudiante_admin}/${id}`, {
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
        ImprimirDatos(Data)
    });
}

function ImprimirDatos(cursos) {
    if (cursos.length === 0) {
        listadoVacio.textContent = "Aún no ha comprado ningún curso";
        return;
    }

    tabla.classList.remove("hidden");

    cursos.forEach(curso => {
        const fila = document.createElement("tr");
        fila.classList.add("border-y", "px-6");

        const nombre = document.createElement("td");
        nombre.classList.add("px-3", "py-2");
        nombre.textContent = curso.nombre;

        const instructor = document.createElement("td");
        instructor.classList.add("px-3", "py-2");
        instructor.textContent = `${curso.instructor.nombres} ${curso.instructor.apellidos}`;

        fila.appendChild(nombre);
        fila.appendChild(instructor);
        listado.appendChild(fila);
    });
}