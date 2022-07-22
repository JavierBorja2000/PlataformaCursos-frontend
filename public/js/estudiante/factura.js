var token;
var id;

// Datos de factura
const NumFactura = document.querySelector("#NumFactura");
const Fecha = document.querySelector("#Fecha");
const Nit = document.querySelector("#Nit");
const Nombres = document.querySelector("#Nombres");
const Apellidos = document.querySelector("#Apellidos");
const Total = document.querySelector("#Total");
const Listado = document.querySelector("#listado");

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Estudiante");
    var url = new URL(window.location.href.toLowerCase());
    id = url.searchParams.get("id");

    console.log(id)

    var factura = {
        id: 1,
        fecha: '10/10/2022',
        nit: 1028,
        nombres: 'Lesly',
        apellidos: "Dubón",
        cursos: [
            {
                nombre: "A",
                descripcion: "A",
                costo: 30
            },
            {
                nombre: "B",
                descripcion: "B",
                costo: 90
            }
        ],
        total: 120
    }

    // ObtenerFactura();
    ImprimirFactura(factura);
})

function ObtenerFactura() {
    fetch(url_facturas + "/" + id, {
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
        ImprimirFactura(Data)
    });
}

function ImprimirFactura(factura) {
    console.log(factura)

    NumFactura.textContent = factura.id;
    Fecha.textContent = factura.fecha;
    Nit.textContent = factura.nit;
    Nombres.textContent = factura.nombres;
    Apellidos.textContent = factura.apellidos;
    Total.textContent = factura.total;

    factura.cursos.forEach(curso => {
        const fila = document.createElement("tr"); 
        fila.classList.add("border-y", "border-violet-500", "text-center");
        
        const nombreCurso = document.createElement("td"); 
        nombreCurso.classList.add("px-3", "py-1");
        nombreCurso.textContent = curso.nombre;

        const descripcion = document.createElement("td"); 
        descripcion.classList.add("px-3", "py-1");
        descripcion.textContent = curso.descripcion;

        const costo = document.createElement("td"); 
        costo.classList.add("px-3", "py-1");
        costo.textContent = curso.costo;

        fila.appendChild(nombreCurso);
        fila.appendChild(descripcion);
        fila.appendChild(costo);
        Listado.appendChild(fila);
    });
}