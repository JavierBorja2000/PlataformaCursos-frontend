import menu_desplegable from "../funcionalidades/menu_hamburguesa.js";

let urlCursoPublico = "http://25.52.127.25/api/CursoPublico/"
let idCursoSolicitado
let token

document.addEventListener('DOMContentLoaded', e => {
    menu_desplegable(".panel-btn", ".panel-m", ".menulink")

    idCursoSolicitado = localStorage.getItem("idCursoSolicitado") || 0
    token = getCookie("token")
    try{
        if(token){
            getDatosCurso(urlCursoPublico)
        }else{
           location.href = "../pages_publico/home.html"
        }
    }catch(ex){
        console.log(`Error ${ex.message}`);
    }

    document.addEventListener('click', e => {
        if(e.target.matches("#card_leccion")){

            localStorage.setItem("idLeccionSolicitado", e.target.dataset.idLeccion) 
            localStorage.setItem("nomInstructor", document.querySelector("#instructor_nombre").textContent)
            //location.href = "../pages_instructor/leccion.html"   
        }
        if(e.target.matches("#btn-editarCurso")  || e.target.matches("#btn-editarCurso *")){
            //location.href = "../pages_instructor/editarCurso.html"   
        }
        if(e.target.matches("#btn-eliminarCurso") || e.target.matches("#btn-eliminarCurso *")){
            alert("el curso tiene estudiantes asignados")   
        }
    })
})

function getDatosCurso(url){
    fetch(`${url}${idCursoSolicitado}`)
        .then(response => response.json())
        .then(response => JSON.parse(JSON.stringify(response)))
        .then(response => completarPagina(response))
}

function completarPagina(data){
    console.log(data);
    document.querySelector("#curso_titulo").textContent = data.curso.nombre
    document.querySelector("#curso_descripcion").textContent = data.curso.descripcion
    document.querySelector("#instructor_nombre").textContent = `${data.curso.instructor.nombres} ${data.curso.instructor.apellidos}`

    // //boton
    // document.querySelector("#agregar_carrito").dataset.idCurso = data.curso.idCurso

    //listar lecciones
    const $listadoLecciones = document.querySelector("#listado_lecciones")
    const $templateCard = document.querySelector("#card_leccion-template").content
    const fragment = document.createDocumentFragment()

    data.curso.lecciones.forEach(leccion => {
        const clone = $templateCard.cloneNode(true);

        clone.querySelector("#card_leccion").dataset.idLeccion = leccion.idLeccion
        clone.querySelector("#leccion_titulo").textContent = leccion.titulo
        clone.querySelector("#leccion_horas").textContent = leccion.duracionHoras
        clone.querySelector("#leccion_min").textContent = leccion.duracionMinutos

        fragment.appendChild(clone)
    });

    $listadoLecciones.appendChild(fragment)
}