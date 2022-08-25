var token;

const listadoVacio = document.querySelector("#listadoVacio");
const tabla = document.querySelector("#tabla");
const listado = document.querySelector("#listado");

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Instructor");
    localStorage.removeItem("idEditar");
    ObtenerCursos();
})

function ObtenerCursos() {
    fetch(url_cursoInstructor, {
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
        ImprimirCursos(Data)
    });
}

function ImprimirCursos(cursos) {
    if (cursos.length === 0) {
        listadoVacio.textContent = "Aún no has creado ningún curso";
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
        
        const acciones = document.createElement("td");
        acciones.classList.add("py-2", "text-center");

        const btnVerCurso = document.createElement("button");
        btnVerCurso.textContent = "Ir al curso";
        btnVerCurso.classList.add("text-center", "text-violet-600", "hover:text-violet-700", "font-bold");

        btnVerCurso.addEventListener("click", () => {
            localStorage.setItem("idCursoSolicitado", curso.idCurso) 
            window.location.href = "/public/pages_instructor/curso_individual.html";
        });

        if(curso.estado == 'A'){
            estado.textContent = "Activo";
            estado.style.color = "green";
            acciones.appendChild(btnVerCurso);
        }else{
            estado.textContent = "Inactivo";
            estado.style.color = "red";
        }

        //fila.appendChild(id_curso);
        fila.appendChild(nombre);
        fila.appendChild(costo);
        fila.appendChild(estado);
        fila.appendChild(acciones);
        listado.appendChild(fila);
    });
}