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
    fetch(`${url_instructor_admin}/${id}`, {
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
        listadoVacio.textContent = "Aún no se ha creado ningún curso";
        return;
    }

    tabla.classList.remove("hidden");

    cursos.forEach(curso => {
        const fila = document.createElement("tr");
        fila.classList.add("border-y", "px-6");

        const id_curso = document.createElement("td");
        id_curso.classList.add("px-3", "py-2");
        id_curso.textContent = curso.idCurso;

        const nombre = document.createElement("td");
        nombre.classList.add("px-3", "py-2");
        nombre.textContent = curso.nombre;

        const costo = document.createElement("td");
        costo.classList.add("px-3", "py-2");
        costo.textContent = "Q. "+curso.costo;

        const estado = document.createElement("td");
        estado.classList.add("px-3", "py-2", "font-medium");

        if(curso.estado == 'A'){
            estado.textContent = "Activo";
            estado.style.color = "green";
        }else{
            estado.textContent = "Inactivo";
            estado.style.color = "red";
        }

        fila.appendChild(id_curso);
        fila.appendChild(nombre);
        fila.appendChild(costo);
        fila.appendChild(estado);
        listado.appendChild(fila);
    });
}