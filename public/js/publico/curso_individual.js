import filtrarBusquedas from "../funcionalidades/filtrar_busquedas.js";
import menuDesplegable from "../funcionalidades/menu_hamburguesa.js";
import iniciandoCarritoCompras from "../funcionalidades/carrito_compras.js";

let idCursoSolicitado

document.addEventListener('DOMContentLoaded', e => {
    menuDesplegable(".panel-btn", ".panel-m", ".menulink")
    filtrarBusquedas("#filtrar_curso", ".card_curso")
    iniciandoCarritoCompras()

    idCursoSolicitado = localStorage.getItem("idCursoSolicitado") || 0

    try{
        if(getCookie("token")){
            console.log("hay un token");
        }else{
            getDatosCursoPublico()
        }
    }catch(ex){
        console.log(`Error ${ex.message}`);
    }

    document.addEventListener('click', e => {
        if(e.target.matches("#card_leccion")){
            if(e.target.disabled){
                console.log("no esta comprado");
            }else(
                console.log("Esta comprado")
            )
        }
    })
})

function getDatosCursoPublico(){
    fetch(`https://localhost:7188/api/CursoPublico/${idCursoSolicitado}`)
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