var token;

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Estudiante");
    cargarCursos()

    document.addEventListener('click', e => {
        if(e.target.matches("#curso_titulo")){
            e.preventDefault()
            localStorage.setItem("idCursoSolicitado", e.target.dataset.id) 
            location.href = "curso_individual.html"
        }
    })
})

function cargarCursos() {
    fetch(url_home, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(response => response.json())
        .then(response => {
            imprimirCursos(response)
        })
}


function imprimirCursos(data) {
    limpiarListadoCursos()

    const $listadoCursos = document.querySelector("#listado_cursos")
    const $templateCard = document.querySelector("#card_curso-template").content
    const fragment = document.createDocumentFragment()

    data.forEach(curso => {
        const clone = $templateCard.cloneNode(true);

        clone.querySelector("#curso_titulo").dataset.id = curso.idCurso
        clone.querySelector("#curso_titulo").textContent = curso.nombre
        clone.querySelector("#curso_instructor").textContent = `${curso.instructor.nombres} ${curso.instructor.apellidos}`

        if (curso.estado === 'N') {
            clone.querySelector("#curso_precio").textContent = curso.costo

            //datos para el carrito de compras (en caso de ser agregado)
            clone.querySelector("#agregar_carrito").dataset.idCurso = curso.idCurso
            clone.querySelector("#agregar_carrito").dataset.nombre = curso.nombre
            clone.querySelector("#agregar_carrito").dataset.costo = curso.costo
        }
        else {
            clone.querySelector("#precio").textContent = " ";
            clone.querySelector("#agregar_carrito").remove();
        }
        fragment.appendChild(clone)
    });

    $listadoCursos.appendChild(fragment)
}


//limpia listado de cursos
function limpiarListadoCursos() {
    const $listadoCursos = document.querySelector("#listado_cursos")

    while ($listadoCursos.firstChild) {
        $listadoCursos.removeChild($listadoCursos.firstChild);
    }
}
