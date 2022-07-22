import filtrarBusquedas from "../funcionalidades/filtrar_busquedas.js";
import menuDesplegable from "../funcionalidades/menu_hamburguesa.js";
import iniciandoCarritoCompras from "../funcionalidades/carrito_compras.js";

let URLCursosPublicos = "https://localhost:7188/api/CursoPublico"

document.addEventListener('DOMContentLoaded', e => {
    menuDesplegable(".panel-btn", ".panel-m", ".menulink")
    filtrarBusquedas("#filtrar_curso", ".card_curso")
    iniciandoCarritoCompras()
    cargarCursos(URLCursosPublicos)

    document.addEventListener('click', e => {
        if(e.target.matches("#curso_titulo")){
            e.preventDefault()
            localStorage.setItem("idCursoSolicitado", e.target.dataset.id) 
            location.href = "http://127.0.0.7:5500/public/pages_publico/curso_individual.html"
        }
    })

})

function cargarCursos(url){
    fetch(url)
        .then(response => response.json())
        .then(response => {
            imprimirCursos(response)
        })
}


function imprimirCursos(data){
    limpiarListadoCursos()

    const $listadoCursos = document.querySelector("#listado_cursos")
    const $templateCard = document.querySelector("#card_curso-template").content
    const fragment = document.createDocumentFragment()

    data.forEach(curso => {
        const clone = $templateCard.cloneNode(true);
        
        clone.querySelector("#curso_titulo").dataset.id = curso.idCurso
        clone.querySelector("#curso_titulo").textContent = curso.nombre
        clone.querySelector("#curso_instructor").textContent = `${curso.nombres} ${curso.apellidos}`
        clone.querySelector("#curso_precio").textContent = curso.costo

        //datos para el carrito de compras (en caso de ser agregado)
        clone.querySelector("#agregar_carrito").dataset.idCurso = curso.idCurso
        clone.querySelector("#agregar_carrito").dataset.nombre = curso.nombre
        clone.querySelector("#agregar_carrito").dataset.costo = curso.costo

        fragment.appendChild(clone)
    });

    $listadoCursos.appendChild(fragment)
}


//limpia listado de cursos
function limpiarListadoCursos(){
    const $listadoCursos = document.querySelector("#listado_cursos")

    while ($listadoCursos.firstChild) {
        $listadoCursos.removeChild($listadoCursos.firstChild);
    }
}


