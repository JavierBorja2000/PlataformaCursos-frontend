var token;
let idCursoSolicitado

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Administrador");

    var url = new URL(window.location.href.toLowerCase());
    idCursoSolicitado = url.searchParams.get("id");

    getDatosCurso(url_curso_publico)

    document.addEventListener('click', e => {
        if (e.target.matches("#card_leccion")) {
            localStorage.setItem("nomInstructor", document.querySelector("#instructor_nombre").textContent)
            location.href = "../pages_admin/leccion.html?id="+e.target.dataset.idLeccion
        }
        if (e.target.matches("#btn-bloquearCurso") || e.target.matches("#btn-bloquearCurso *")) {
            cambiarEstado();
        }
        if (e.target.matches("#btn-eliminarCurso") || e.target.matches("#btn-eliminarCurso *")) {
            var res = confirm("¿Seguro que desea eliminar este curso?");

            if(res)  eliminarCurso();
        }
    })
})

function getDatosCurso(url) {
    fetch(`${url}/${idCursoSolicitado}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(response => {
        if(response.ok){
            return response.json()
        }
        else{
            if(response.status === 404){
                window.location.href = "./cursos.html"
            }
        }
        
    }).then(response => JSON.parse(JSON.stringify(response)))
        .then(response => completarPagina(response))
}

function completarPagina(data) {
    document.querySelector("#curso_titulo").textContent = data.nombre
    document.querySelector("#curso_descripcion").textContent = data.descripcion
    document.querySelector("#instructor_nombre").textContent = `${data.instructor.nombres} ${data.instructor.apellidos}`

    if(data.estado === "I"){
        var estado = document.querySelector("#estado");
        var btnBloquear = document.querySelector("#btn-bloquearCurso");
        var icono = document.querySelector("#icono-lock");

        estado.textContent = "Desbloquear";
        btnBloquear.classList.remove("bg-red-600");
        btnBloquear.classList.remove("xl:hover:w-36");

        btnBloquear.classList.add("bg-green-600");
        btnBloquear.classList.add("xl:hover:w-44");
        icono.innerHTML = `<path d="M144 192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80V144C80 64.47 144.5 0 224 0C281.5 0 331 33.69 354.1 82.27C361.7 98.23 354.9 117.3 338.1 124.9C322.1 132.5 303.9 125.7 296.3 109.7C283.4 82.63 255.9 64 224 64C179.8 64 144 99.82 144 144L144 192z"/>`;
    }

    //listar lecciones
    const $listadoLecciones = document.querySelector("#listado_lecciones")
    const $templateCard = document.querySelector("#card_leccion-template").content
    const fragment = document.createDocumentFragment()

    data.lecciones.forEach(leccion => {
        const clone = $templateCard.cloneNode(true);

        clone.querySelector("#card_leccion").dataset.idLeccion = leccion.idLeccion
        clone.querySelector("#leccion_titulo").textContent = leccion.titulo
        clone.querySelector("#leccion_horas").textContent = leccion.duracionHoras
        clone.querySelector("#leccion_min").textContent = leccion.duracionMinutos

        clone.querySelector("#card_leccion").disabled = false

        fragment.appendChild(clone)
    });

    $listadoLecciones.appendChild(fragment)
}

function eliminarCurso(){
    fetch(`${url_curso_instructor}/${idCursoSolicitado}`, {
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
                window.location.href = "./cursos.html"
            }
        })
}

function cambiarEstado(){
    fetch(`${url_curso_admin}/${idCursoSolicitado}`, {
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