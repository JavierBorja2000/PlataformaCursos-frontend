var token;
let idLeccion;

const $ = selector => document.querySelector(selector)
const $formPregunta = $("#formPregunta")

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Administrador");

    var url = new URL(window.location.href.toLowerCase());
    idLeccion = url.searchParams.get("id");

    cargarInfoLeccion()
    cargarInfoPreguntas()
})

async function cargarInfoLeccion(){
    //token de autenticacion
    const options = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    try{
        let data = await fetch(`${url_leccion}/${idLeccion}`, options).then(response => response.json())
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
        let data = await fetch(`${url_pregunta}/${idLeccion}`, options).then(response => response.json())

        if(data.length === 0) {
            var msgPreguntas = document.querySelector("#msgPreguntas")
            msgPreguntas.classList.remove("hidden")
        }
        else{
            imprimirInfoPreguntas(data);
        }
        
    }catch(ex){
        console.log(ex.message);
    }
}

function imprimirInfoLeccion(data){
    if(data.status === 404){
        window.location.href = "./cursos.html"
    }

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