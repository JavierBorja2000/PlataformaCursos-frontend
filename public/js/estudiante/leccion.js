let URLLeccion = "http://25.52.127.25/api/Leccion/"
let URLPreguntas = "http://25.52.127.25/api/Pregunta"
let idLeccion;

const $ = selector => document.querySelector(selector)
const $formPregunta = $("#formPregunta")


document.addEventListener('DOMContentLoaded', e => {
    idLeccion = localStorage.getItem("idLeccionSolicitado")
    cargarInfoLeccion()
    cargarInfoPreguntas()

    $formPregunta.addEventListener('submit', e => {
        e.preventDefault()

        const nuevaPregunta = {
            idLeccion: idLeccion,
            contenido: e.target.pregunta.value
        }
        
        agregarPublicacion(nuevaPregunta);
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

async function agregarPublicacion(publicacion){
    fetch(`${URLPreguntas}`,{
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