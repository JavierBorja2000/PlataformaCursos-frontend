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
    console.log(data);
    document.querySelector("#curso_titulo").textContent = data.nombre
    document.querySelector("#curso_descripcion").textContent = data.descripcion
    document.querySelector("#instructor_nombre").textContent = `${data.instructor.nombres} ${data.instructor.apellidos}`

    if(data.estado === "I"){
        var estado = document.querySelector("#estado");
        estado.textContent = "Desbloquear";
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
            alert(response.msg)
            if(response.error === false){
                location.reload();
            }
        })
}