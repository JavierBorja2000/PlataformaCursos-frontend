import menu_desplegable from "../funcionalidades/menu_hamburguesa.js";
let URLLeccion = "http://25.52.127.25/api/Leccion/"
let URLPreguntas = "http://25.52.127.25/api/Pregunta"
let URLRespuesta = "http://25.52.127.25/api/Respuesta"
let idLeccion;

const $ = selector => document.querySelector(selector)

var token 

document.addEventListener('DOMContentLoaded', e => {
    menu_desplegable(".panel-btn", ".panel-m", ".menulink")

    ValidarToken("Instructor");
    token = getCookie("token")
    idLeccion = localStorage.getItem("idLeccionSolicitado")
    cargarInfoLeccion()
    cargarInfoPreguntas()

    document.addEventListener('submit', e => {
        if(e.target.matches(".formRespuesta")){
            e.preventDefault()

            const nuevaRespuesta = {
                contenido: e.target.respuesta.value,
                idPregunta: e.target.parentElement.dataset.idPregunta,
            }
            
            agregarRespuesta(nuevaRespuesta);
        }
    })

    document.addEventListener('click', e => {
        if(e.target.matches(".btn-responder")){
            const $formRespuesta = e.target.nextElementSibling
            $formRespuesta.classList.toggle("hidden")
        }
    })
})

async function cargarInfoLeccion(){
    //token de autenticacion
    const options = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    try{
        let data = await fetch(`${URLLeccion}${idLeccion}`, options).then(response => response.json())
        console.log(data);
        imprimirInfoLeccion(data);
    }catch(ex){
        console.log(ex.message);
    }
}

async function cargarInfoPreguntas(){
     //token de autenticacion
     const options = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    try{
        let data = await fetch(`${URLPreguntas}/${idLeccion}`, options).then(response => response.json())
        imprimirInfoPreguntas(data);
    }catch(ex){
        console.log(ex.message);
    }
}

async function agregarRespuesta(publicacion){
    fetch(`${URLRespuesta}`,{
        method: 'POST',
        body: JSON.stringify(publicacion),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
        .catch(error => console.error('Error:', error))
        .then(response => {
            cargarInfoPreguntas()
        })
    
}

function imprimirInfoLeccion(data){
    $("#leccion_video").src = data.url
    $("#leccion_titulo").textContent = data.titulo
    $("#leccion_instructor").textContent = localStorage.getItem("nomInstructor")
    $("#leccion_descripcion").textContent = data.descripcion
}

function imprimirInfoPreguntas(data){
    limpiarHTMLPreguntas()

    const $listadoPreguntas = $("#listado_preguntas")
    const $templatePregunta = $("#card_pregunta-template").content
    const $templateRespuesta = $("#card_respuesta-template").content
    const fragment = document.createDocumentFragment()

    data.forEach(objPregunta => {
        const pregunta = $templatePregunta.cloneNode(true);

        pregunta.querySelector(".pregunta").dataset.idPregunta = objPregunta.idPregunta
        pregunta.querySelector(".pregunta_usuario").textContent = `${objPregunta.nombresEstudiante} ${objPregunta.apellidosEstudiante}`
        pregunta.querySelector(".pregunta_contenido").textContent = objPregunta.contenido

        objPregunta.respuestas.forEach(objRespuesta => {
            const respuesta = $templateRespuesta.cloneNode(true)
            respuesta.querySelector(".repuesta_contenido").textContent = objRespuesta.contenido

            //agregando respuesa a pregunta 
            pregunta.querySelector(".pregunta").after(respuesta)
        })

        fragment.appendChild(pregunta)
    });

    // agregando preguntas al HTML
    $listadoPreguntas.appendChild(fragment)
}

function limpiarHTMLPreguntas(){
    const $listadoPreguntas = $("#listado_preguntas")

    while($listadoPreguntas.firstElementChild){
        $listadoPreguntas.removeChild($listadoPreguntas.firstElementChild)
    }
}