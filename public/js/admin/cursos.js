var token;

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Administrador");
    ObtenerDatos();
})

function ObtenerDatos() {
    fetch(url_curso_admin, {
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

function ImprimirDatos(cursos){
    if (cursos.length === 0) {
        listadoVacio.textContent = "No hay cursos creados";
        return;
    }

    tabla.classList.remove("hidden");

    cursos.forEach(curso => {
        const fila = document.createElement("tr");
        fila.classList.add("border-y", "px-6");

        const id_curso = document.createElement("td");
        id_curso.classList.add("px-3", "py-2", "font-bold");
        id_curso.textContent = curso.idCurso;

        const nombre = document.createElement("td");
        nombre.classList.add("px-3", "py-2");
        nombre.textContent = curso.nombre;

        const costo = document.createElement("td");
        costo.classList.add("px-3", "py-2");
        costo.textContent = "Q. "+curso.costo;

        const estado = document.createElement("td");
        estado.classList.add("px-3", "py-2", "font-medium");

        const celda = document.createElement("td");
        celda.classList.add("px-1", "py-2");

        const href = document.createElement("a");
        href.href = "./estudiantes_curso.html?id=" + curso.idCurso;
        const div = document.createElement("div");
        div.classList.add("flex", "items-center", "justify-center", "gap-1", "mt-2.5");

        const numAlumnos = document.createElement("span");
        numAlumnos.textContent = curso.numAlumnos;

        const icono = document.createElement("div")
        icono.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z"/></svg>`;
        
        div.appendChild(numAlumnos);
        div.appendChild(icono);
        href.appendChild(div)
        celda.appendChild(href);
        
        const acciones = document.createElement("td");
        acciones.classList.add("py-2", "text-center");

        const btnVerCurso = document.createElement("button");
        btnVerCurso.textContent = "Ir al curso";
        btnVerCurso.classList.add("text-center", "text-violet-600", "hover:text-violet-700", "font-bold");
        btnVerCurso.addEventListener("click", () => {
            VerCurso(curso.idCurso);
        });

        if(curso.estado == 'A'){
            estado.textContent = "Activo";
            estado.style.color = "green";
            
        }else{
            estado.textContent = "Inactivo";
            estado.style.color = "red";
        }
        acciones.appendChild(btnVerCurso);

        fila.appendChild(id_curso);
        fila.appendChild(nombre);
        fila.appendChild(costo);
        fila.appendChild(estado);
        fila.appendChild(celda);
        fila.appendChild(acciones);
        listado.appendChild(fila);
    });
}

function VerCurso(id) {
    window.location.href = "./curso_individual.html?id=" + id;
}