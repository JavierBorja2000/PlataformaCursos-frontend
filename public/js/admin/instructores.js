var token;

const listadoVacio = document.querySelector("#listadoVacio");
const tabla = document.querySelector("#tabla");
const listado = document.querySelector("#listado");

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Administrador");
    ObtenerDatos();
})

function ObtenerDatos() {
    fetch(url_instructor_admin, {
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

function ImprimirDatos(instructores){
    if (instructores.length === 0) {
        listadoVacio.textContent = "No hay instructores creados";
        return;
    }

    tabla.classList.remove("hidden");

    instructores.forEach(instructor => {
        const fila = document.createElement("tr");
        fila.classList.add("border-y", "px-6");

        const id_instructor = document.createElement("td");
        id_instructor.classList.add("px-3", "py-2", "font-bold");
        id_instructor.textContent = instructor.idInstructor;

        const nombre = document.createElement("td");
        nombre.classList.add("px-3", "py-2");
        nombre.textContent = instructor.nombres + " " + instructor.apellidos;

        const correo = document.createElement("td");
        correo.classList.add("px-3", "py-2");
        correo.textContent = instructor.correo;

        const estado = document.createElement("td");
        estado.classList.add("px-3", "py-2", "font-medium");
        
        const numCuenta = document.createElement("td");
        numCuenta.classList.add("px-3", "py-2");
        numCuenta.textContent = instructor.numCuenta;

        const nomBanco = document.createElement("td");
        nomBanco.classList.add("px-3", "py-2");
        nomBanco.textContent = instructor.nomBanco;

        const celda = document.createElement("td");
        celda.classList.add("px-1", "py-2");

        const href = document.createElement("a");
        href.href = "./cursos_instructor.html?id=" + instructor.idInstructor;
        const div = document.createElement("div");
        div.classList.add("flex", "items-center", "justify-center", "gap-1", "mt-2.5");

        const numCursos = document.createElement("span");
        numCursos.textContent = instructor.numCursos;

        const icono = document.createElement("div")
        icono.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 22V2H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3ZM8 6h8v2H8ZM6 19a1 1 0 0 1 .31-.71A.93.93 0 0 1 7 18h11v2H7a1 1 0 0 1-1-1Z" data-name="Layer 2"/></svg>`;
        
        div.appendChild(icono);
        div.appendChild(numCursos);
        href.appendChild(div)
        celda.appendChild(href);
        
        const acciones = document.createElement("td");
        acciones.classList.add("py-2", "text-center", "lg:text-right");

        const btnBloquear = document.createElement("button");        

        if(instructor.estado == "A"){
            btnBloquear.textContent = "Bloquear";
            btnBloquear.classList.add("text-center", "text-red-600", "hover:text-red-700", "font-bold", "mb-3", "lg:mr-2");
        }
        else{
            btnBloquear.textContent = "Desbloquear";
            btnBloquear.classList.add("text-center", "text-green-700", "hover:text-green-800", "font-bold", "mb-3", "lg:mr-2");
        }
        
        btnBloquear.addEventListener("click", () => {
            Bloquear(instructor.idInstructor);
        });

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("text-center", "text-white", "bg-red-600", "hover:bg-red-700", "font-bold", "px-2", "py-1", "rounded-md", "mr-2");
        btnEliminar.addEventListener("click", () => {
            var res = confirm("¿Seguro que desea eliminar el instructor?");
            if(res) Eliminar(instructor.idInstructor);
        });

        if(instructor.estado == 'A'){
            estado.textContent = "Activo";
            estado.style.color = "green";
            
        }else{
            estado.textContent = "Inactivo";
            estado.style.color = "red";
        }
        acciones.appendChild(btnBloquear);
        acciones.appendChild(btnEliminar);

        fila.appendChild(id_instructor);
        fila.appendChild(nombre);
        fila.appendChild(correo);
        
        fila.appendChild(numCuenta);
        fila.appendChild(nomBanco);
        fila.appendChild(celda);
        fila.appendChild(estado);
        fila.appendChild(acciones);
        listado.appendChild(fila);
    });
}

function Bloquear(id){
    fetch(`${url_instructor_admin}/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(response => response.json())
        .then(response => JSON.parse(JSON.stringify(response)))
        .then(response => {
            if(response.error === false){
                location.reload();
            }
        })
}

function Eliminar(id){
    fetch(`${url_instructor_admin}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(response => response.json())
        .then(response => JSON.parse(JSON.stringify(response)))
        .then(response => {
            alert(response.msg)
            if(response.error === false){
                location.reload();
            }
        })
}