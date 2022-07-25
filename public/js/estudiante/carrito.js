var token;
const listadoVacio = document.querySelector("#listadoVacio");
const listado = document.querySelector("#listado");
const totalFactura = document.querySelector("#totalFactura");
const nombreCompleto = document.querySelector("#nombreCompleto");
const Nit = document.querySelector("#Nit");
const contenido = document.querySelector("#contenido");

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Estudiante");
    ObtenerCarrito();
    ObtenerEstudiante();
})

document.addEventListener('click', e => {
    if (e.target.matches(".borrar-curso")) {
        setTimeout(() => {
            ObtenerCarrito();
        }, 500);   
    }
})

function ObtenerCarrito(){
    fetch(url_carrito, {
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
        ImprimirCarrito(Data)
    });
}

function ImprimirCarrito(cursos){
    let total = 0;

    if(cursos.length === 0){
        listadoVacio.textContent = "No se han agregado cursos al carrito";

        if(!contenido.classList.contains("hidden")){
            contenido.classList.add("hidden");
        }

        return;
    }

    if(contenido.classList.contains("hidden")){
        contenido.classList.remove("hidden");
    }

    limpiarCarrito();

    cursos.forEach(curso => {
        total = total + curso.costo;

        const fila = document.createElement("tr");
        fila.classList.add("text-gray-600", "border-b-2", "border-b-gray-600")

        const nombre = document.createElement("td");
        nombre.classList.add("px-5", "py-2", "text-gray-900", "font-semibold", "text-center");
        nombre.textContent = curso.nombre;

        const costo = document.createElement("td");
        costo.classList.add("px-5", "py-2", "text-gray-900", "font-semibold", "text-center");
        costo.textContent = curso.costo;

        const acciones = document.createElement("td");
        acciones.classList.add("px-5", "py-2", "items-center", "text-center");

        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("px-5", "py-1", "bg-red-600", "my-2", "text-white", "rounded", "font-semibold", "borrar");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
            EliminarCurso(curso.idCurso);
        })

        acciones.appendChild(btnEliminar);
        fila.appendChild(nombre);
        fila.appendChild(costo);
        fila.appendChild(acciones);
        listado.appendChild(fila);
    });

    totalFactura.textContent = total;
}

function limpiarCarrito(){
    while(listado.firstChild){
        listado.removeChild(listado.firstChild);
    }
}

function ObtenerEstudiante(){
    fetch(url_estudiante, {
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
        ImprimirCliente(Data)
    });
}

function ImprimirCliente(estudiante){
    nombreCompleto.textContent = estudiante.nombres + " " + estudiante.apellidos;
    Nit.textContent = estudiante.nit;
}

function EliminarCurso(id){
    fetch(url_carrito+"/"+id, {
        method: "DELETE",
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
        ObtenerCarrito();
    });
}

function ConfirmarCompra(){
    fetch(url_compra, {
        method: "PUT",
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
    });

    window.location.href = './miscursos.html';
}