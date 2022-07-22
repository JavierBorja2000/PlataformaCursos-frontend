//carrito compras
let carritoComprasLS = []
let carritoCompras = []
let idCursos = []

export default function iniciandoCarritoCompras() {
    carritoComprasLS = JSON.parse(localStorage.getItem('carrito')) || []

    if (carritoComprasLS.length === 0) {
        ObtenerCarrito();
    }
    else {
        SolicitarCarrito();
    }

    document.addEventListener('click', e => {
        if (e.target.matches("#agregar_carrito")) {
            leerDatosCurso(e)
        }
        if (e.target.matches(".borrar-curso")) {
            eliminarDeCarrito(e)
        }
        if(e.target.matches(".borrar")){
            setTimeout(() => {
                ObtenerCarrito();
            }, 500);            
        }
    })
}

//CARRITO COMPRAS
// Obtiene carrito de bd
function ObtenerCarrito() {
    carritoCompras = []
    fetch(url_carrito, {
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
        carritoCompras = Data;
        console.log(carritoCompras)
        carritoHTML();
    });
}

// Obtiene carrito de bd
function SolicitarCarrito() {
    idCursos = [];
    carritoComprasLS.forEach(curso => {
        idCursos = [...idCursos, curso.idCurso]
    })

    fetch(url_carrito, {
        method: "POST",
        body: JSON.stringify({
            IdCursos: idCursos
        }),
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
        localStorage.removeItem("carrito");
        if (!Data.conflicto) {
            if (Data.cursos) {
                carritoCompras = Data.cursos;
                carritoHTML();
            }
        }
        else {
            var respuesta = confirm("Había dejado algunos cursos en su carrito durante su sesión anterior, ¿desea reemplazar su contenido con los que agregó antes de iniciar sesión?");

            if (respuesta) {
                ReemplazarCarrito();
            }
            else {
                if (Data.cursos) {
                    carritoCompras = Data.cursos;
                    carritoHTML();
                }
            }
        }
    });
}

function ReemplazarCarrito(){
    fetch(url_carrito, {
        method: "PUT",
        body: JSON.stringify({
            IdCursos: idCursos
        }),
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
        if(Data.msg){
            alert(Data.msg);
        }
        if(Data.cursos){
            carritoCompras = Data.cursos;
            carritoHTML();
        }
    })
}

// Muestra el curso seleccionado en el Carrito
function leerDatosCurso(e) {
    const infoCurso = {
        idCurso: parseInt(e.target.dataset.idCurso),
        nombre: e.target.dataset.nombre,
        costo: e.target.dataset.costo
    }

    let cursoRepetido = carritoCompras.some(curso => curso.idCurso === infoCurso.idCurso)

    if (!cursoRepetido) {
        carritoCompras = [...carritoCompras, infoCurso]
    }

    fetch(url_carrito+"/"+infoCurso.idCurso, {
        method: "PUT",
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
        carritoHTML()
    })
}

function carritoHTML() {
    const $contenedorCarrito = document.querySelector("#lista-carrito tbody")
    limpiarCarritoCompras();

    carritoCompras.forEach(curso => {
        const row = document.createElement('tr');
        row.classList.add("border-b", "border-inherit")
        row.innerHTML = `
              <td class="w-2/5 p-4 font-semibold text-xs">${curso.nombre}</td>
              <td class="w-2/5 p-4">Q${curso.costo}</td>
              <td class="w-1/5 p-4">
                   <button class="borrar-curso" data-id="${curso.idCurso}">X</button>
              </td>
         `;
        $contenedorCarrito.appendChild(row);
    });

    // verificarCantidadCarrrito()
}

function eliminarDeCarrito(e) {
    let cursoAEliminar = parseInt(e.target.dataset.id)

    const carritoComprasFiltrado = carritoCompras.filter(curso => curso.idCurso !== cursoAEliminar)
    carritoCompras = [...carritoComprasFiltrado]

    fetch(url_carrito+"/"+cursoAEliminar, {
        method: "DELETE",
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
        carritoHTML();
    });    
}

//limpia carrito de compras
function limpiarCarritoCompras() {
    const $contenedorCarrito = document.querySelector("#lista-carrito tbody")
    while ($contenedorCarrito.firstChild) {
        $contenedorCarrito.removeChild($contenedorCarrito.firstChild);
    }
}