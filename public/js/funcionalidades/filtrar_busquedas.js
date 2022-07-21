export default function filtrarBusquedas(input, selector){
    document.addEventListener('keyup', e => {
        if(e.target.matches(input)){
            let busqueda = e.target.value.toLowerCase()
            const listaCursos = document.querySelectorAll(selector)

            listaCursos.forEach(curso => {
                curso.querySelector("#curso_titulo").textContent.toLowerCase().includes(busqueda)
                    ? curso.classList.remove("hidden")
                    : curso.classList.add("hidden")
            })
        }
    })
}