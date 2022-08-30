import menu_desplegable from "../funcionalidades/menu_hamburguesa.js";

let urlCursoPublico = "http://25.52.127.25/api/CursoPublico/"
let idCursoSolicitado
let token

const $ = selector => document.querySelector(selector)

const $formLeccion = $("#formLeccion")

document.addEventListener('DOMContentLoaded', e => {
    menu_desplegable(".panel-btn", ".panel-m", ".menulink")
    localStorage.removeItem("idEditar");
    idCursoSolicitado = localStorage.getItem("idCursoSolicitado") || 0
    
    //VALIDAMOS TOKEN Y CARGAMOS INFORMACION
    ValidarToken("Instructor");
    token = getCookie("token")
    getDatosCurso(urlCursoPublico)

    //EVENTOS
    $formLeccion.addEventListener('submit', e => {
        e.preventDefault()
        
        if(e.target.idLeccion.value === ""){
            //Creando Leccion
            const nuevaLeccion = {
                titulo: e.target.titulo.value ,
                descripcion: e.target.descripcion.value,
                duracionHoras: parseInt(e.target.duracionHoras.value),
                duracionMinutos: parseInt(e.target.duracionMinutos.value),
                url: e.target.url.value,
                idCurso: parseInt(idCursoSolicitado)
            }
            
            mantenimientoLeccion(nuevaLeccion, "POST")

        }else{
            //Editando Leccion
            const leccionEditada = {
                idLeccion: parseInt(e.target.idLeccion.value),
                titulo: e.target.titulo.value ,
                descripcion: e.target.descripcion.value,
                duracionHoras: parseInt(e.target.duracionHoras.value),
                duracionMinutos: parseInt(e.target.duracionMinutos.value),
                url: e.target.url.value,
                idCurso: parseInt(idCursoSolicitado)
            }

            mantenimientoLeccion(leccionEditada, "PUT")
        }
    })

    document.addEventListener('click', e => {
        if(e.target.matches("#card_leccion")){

            localStorage.setItem("idLeccionSolicitado", e.target.dataset.idLeccion) 
            localStorage.setItem("nomInstructor", document.querySelector("#instructor_nombre").textContent)
            location.href = "../pages_instructor/leccion.html"   
        }
        if(e.target.matches("#btn-editarCurso")  || e.target.matches("#btn-editarCurso *")){
            localStorage.setItem("idEditar", idCursoSolicitado);
            window.location.href = "../pages_instructor/informacionCurso.html";
        }
        if(e.target.matches("#btn-eliminarCurso") || e.target.matches("#btn-eliminarCurso *")){
            var res = confirm("¿Seguro que desea eliminar este curso?");
            if(res)  eliminarCurso();  
        }

        //Mantenimiento leciones formLeccion__btnClose
        if(e.target.matches("#btn-crearLeccion")){
            $formLeccion.classList.remove("hidden")
            $formLeccion.reset()

            let tituloForm = $("#formLeccion__title").textContent
            if(tituloForm !== "Crear Leccion") $("#formLeccion__title").textContent = "Crear Leccion"

        }
        if(e.target.matches("#btn-editLeccion") || e.target.matches("#btn-editLeccion *")){
            $formLeccion.classList.remove("hidden")
            $formLeccion.reset()

            let tituloForm = $("#formLeccion__title").textContent
            if(tituloForm !== "Editar Leccion") $("#formLeccion__title").textContent = "Editar Leccion"

            //llenando formulario
            let btnEditar = e.target.closest("#btn-editLeccion")

            $formLeccion.idLeccion.value = btnEditar.dataset.idLeccion
            $formLeccion.titulo.value = btnEditar.dataset.titulo
            $formLeccion.descripcion.value = btnEditar.dataset.descripcion
            $formLeccion.duracionHoras.value = btnEditar.dataset.duracionHoras
            $formLeccion.duracionMinutos.value = btnEditar.dataset.duracionMinutos
            $formLeccion.url.value = btnEditar.dataset.url
        }
        if(e.target.matches("#btn-delLeccion") || e.target.matches("#btn-delLeccion *")){
            let respuesta =confirm("¿Seguro que desea eliminar esta leccion?")

            if(respuesta){
                let btnEliminar = e.target.closest("#btn-delLeccion")
                let idLeccion = parseInt(btnEliminar.dataset.idLeccion)
                eliminarLeccion(idLeccion)
            }
                
        }
        if(e.target.matches("#formLeccion__btnClose") || e.target.matches("#formLeccion__btnClose *")){
            $formLeccion.reset()
            $formLeccion.classList.add("hidden")
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

    limpiarListadoLecciones()
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

        //botones mantenimiento lecciones
        //Editar Leccion
        clone.querySelector("#btn-editLeccion").dataset.idLeccion = leccion.idLeccion
        clone.querySelector("#btn-editLeccion").dataset.titulo = leccion.titulo
        clone.querySelector("#btn-editLeccion").dataset.descripcion = leccion.descripcion
        clone.querySelector("#btn-editLeccion").dataset.duracionHoras = leccion.duracionHoras
        clone.querySelector("#btn-editLeccion").dataset.duracionMinutos = leccion.duracionMinutos
        clone.querySelector("#btn-editLeccion").dataset.url = leccion.url

        //Eliminar Leccion
        clone.querySelector("#btn-delLeccion").dataset.idLeccion = leccion.idLeccion

        fragment.appendChild(clone)
    });

    $listadoLecciones.appendChild(fragment)
}

function eliminarCurso(){
    fetch(url_cursoInstructor + "/" + idCursoSolicitado, {
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
                window.location.href = "../pages_instructor/miscursos.html"
            }
        })
}

// Mantenimiento de Lecciones
function mantenimientoLeccion(dataLeccion, accion){
    const options = {
        method: accion,
        body: JSON.stringify(dataLeccion),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }

    fetch(url_leccionInstructor, options)
        .then(response => response.json())
        .then(response => {
            getDatosCurso(urlCursoPublico)
            $formLeccion.classList.add("hidden")
        })
        .catch(err => console.log(err))
}

function eliminarLeccion(idLeccion){
    const options = {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }

    fetch(`${url_leccionInstructor}/${idLeccion}` , options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            getDatosCurso(urlCursoPublico)
            $formLeccion.classList.add("hidden")
        })
        .catch(err => console.log(err))
}

//limpia listado de cursos
function limpiarListadoLecciones() {
    const $listadoLecciones = document.querySelector("#listado_lecciones")

    while ($listadoLecciones.firstChild) {
        $listadoLecciones.removeChild($listadoLecciones.firstChild);
    }
}