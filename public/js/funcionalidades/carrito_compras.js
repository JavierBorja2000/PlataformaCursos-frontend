//carrito compras
let carritoCompras = []

export default function iniciandoCarritoCompras(){
    carritoCompras = JSON.parse(localStorage.getItem('carrito')) || []
    carritoHTML()

    document.addEventListener('click', e => {
        if(e.target.matches("#agregar_carrito")){
            leerDatosCurso(e)
        }
        if(e.target.matches(".borrar-curso")){
            eliminarDeCarrito(e)
        }
        
    })
}

//CARRITO COMPRAS
// Muestra el curso seleccionado en el Carrito
function leerDatosCurso(e){
    const infoCurso = {
        idCurso: e.target.dataset.idCurso,
        nombre: e.target.dataset.nombre,
        costo: e.target.dataset.costo
    }

    let cursoRepetido = carritoCompras.some(curso => curso.idCurso === infoCurso.idCurso)
    
    if(!cursoRepetido){
        carritoCompras = [...carritoCompras, infoCurso]
    }

    carritoHTML()
}

function carritoHTML() {
    const $contenedorCarrito = document.querySelector("#lista-carrito tbody")
    limpiarCarritoCompras();

    carritoCompras.forEach(curso => {
         const row = document.createElement('tr');
         row.classList.add("border-b","border-inherit")
         row.innerHTML = `
              <td class="w-2/5 p-4 font-semibold text-xs">${curso.nombre}</td>
              <td class="w-2/5 p-4">Q${curso.costo}</td>
              <td class="w-1/5 p-4">
                   <button class="borrar-curso" data-id="${curso.idCurso}">X</button>
              </td>
         `;
         $contenedorCarrito.appendChild(row);
    });
    
    //Sincronizar el local storage
    sincronizarStorage()

    // verificarCantidadCarrrito()
}

function eliminarDeCarrito(e){
    let cursoAEliminar = e.target.dataset.id

    const carritoComprasFiltrado = carritoCompras.filter(curso => curso.idCurso !== cursoAEliminar)
    carritoCompras = [...carritoComprasFiltrado]
    console.log(carritoCompras);

    carritoHTML()
}

//limpia carrito de compras
function limpiarCarritoCompras(){
    const $contenedorCarrito = document.querySelector("#lista-carrito tbody")
    while ($contenedorCarrito.firstChild) {
        $contenedorCarrito.removeChild($contenedorCarrito.firstChild);
    }
}


//funcion que sincronizara el estado actual de nuestro array de cursos al local Storage
function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(carritoCompras))
}