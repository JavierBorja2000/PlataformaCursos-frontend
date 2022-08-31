
let idCursoSolicitado

let urlCursoPublico = "http://25.52.127.25/api/CursoPublico/"
let urlCursoComprado = "http://25.52.127.25/api/CursoComprado/"

let token

document.addEventListener('DOMContentLoaded', e => {
    idCursoSolicitado = localStorage.getItem("idCursoSolicitado") || 0
    token = getCookie("token")
    try{
        if(token){
            const options = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }

            getDatosCurso(urlCursoComprado, options)
        }else{
            getDatosCurso(urlCursoPublico)
        }
    }catch(ex){
        console.log(`Error ${ex.message}`);
    }

    document.addEventListener('click', e => {
        if(e.target.matches("#card_leccion")){
            if(e.target.disabled) return 

            localStorage.setItem("idLeccionSolicitado", e.target.dataset.idLeccion) 
            localStorage.setItem("nomInstructor", document.querySelector("#instructor_nombre").textContent)
            location.href = "../pages_estudiante/leccion.html"
            
        }
    })
})

function getDatosCurso(url, options = null){
    fetch(`${url}${idCursoSolicitado}`, options)
        .then(response => response.json())
        .then(response => JSON.parse(JSON.stringify(response)))
        .then(response => completarPagina(response))
}

function completarPagina(data){
    console.log(data);
    document.querySelector("#curso_titulo").textContent = data.curso.nombre
    document.querySelector("#curso_descripcion").textContent = data.curso.descripcion
    document.querySelector("#instructor_nombre").textContent = `${data.curso.instructor.nombres} ${data.curso.instructor.apellidos}`

    //boton
    document.querySelector("#agregar_carrito").dataset.idCurso = data.curso.idCurso
    document.querySelector("#agregar_carrito").dataset.nombre = data.curso.nombre
    document.querySelector("#agregar_carrito").dataset.costo = data.curso.costo

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

        if(data.facturado) clone.querySelector("#card_leccion").disabled = false
        fragment.appendChild(clone)
    });

    $listadoLecciones.appendChild(fragment)

    if(data.facturado) document.querySelector("#contenedor_agregarcarrito").classList.add("hidden")
}