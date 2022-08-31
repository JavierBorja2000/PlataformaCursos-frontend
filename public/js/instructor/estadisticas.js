var token;

const listadoVacio = document.querySelector("#listadoVacio");
const tabla = document.querySelector("#tabla");
const listado = document.querySelector("#listado");

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Instructor");

    ObtenerEstadisticas();
})

function ObtenerEstadisticas() {
    fetch(url_estadisticas, {
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
        ImprimirEstadisticas(Data)
    });
}

function ImprimirEstadisticas(estadisticas) {
    if (estadisticas.length === 0) {
        listadoVacio.textContent = "No ha añadido cursos todavía";
        return;
    }

    tabla.classList.remove("hidden");

    estadisticas.forEach(estadistica => {
        const fila = document.createElement("tr");
        fila.classList.add("border-y", "px-6");;

        const nombre = document.createElement("td");
        nombre.classList.add("px-3", "py-2");
        nombre.textContent = estadistica.nombre;

        const numAlumnos = document.createElement("td");
        numAlumnos.classList.add("px-3", "py-2");
        numAlumnos.textContent = estadistica.numAlumnos;

        const ingresos = document.createElement("td");
        ingresos.classList.add("px-3", "py-2");
        ingresos.textContent = `Q${estadistica.ingresos}`;

        fila.appendChild(nombre);
        fila.appendChild(numAlumnos);
        fila.appendChild(ingresos);
        listado.appendChild(fila);
    });
}