var token;

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Estudiante");
    ObtenerCursos();
})

function ObtenerCursos(){
    fetch(url_curso, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            console.log(response)
        }
    }).then(function (Data) {
        if(Data.length === 0){
            document.querySelector("#listadoVacio").textContent = "No has comprado cursos todavía"
        }
        else {
            imprimirCursos(Data)
        }
    });
}

function imprimirCursos(data) {
    limpiarListadoCursos()

    const $listadoCursos = document.querySelector("#listado_cursos")
    const $templateCard = document.querySelector("#card_curso-template").content
    const fragment = document.createDocumentFragment()

    data.forEach(curso => {
        const clone = $templateCard.cloneNode(true);

        clone.querySelector("#curso_titulo").textContent = curso.nombre
        clone.querySelector("#curso_instructor").textContent = `${curso.instructor.nombres} ${curso.instructor.apellidos}`
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
