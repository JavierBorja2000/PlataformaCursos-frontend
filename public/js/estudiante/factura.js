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

    ObtenerFactura();
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

    NumFactura.textContent = factura.idPedido;
    factura.fecha = new Date(factura.fecha);
    const offset = factura.fecha.getTimezoneOffset();
    factura.fecha = new Date(factura.fecha.getTime() - (offset * 60 * 1000));
    Fecha.textContent = factura.fecha.toISOString().split('T')[0];
    Nit.textContent = factura.nit;
    Nombres.textContent = factura.nombres;
    Apellidos.textContent = factura.apellidos;
    Total.textContent = factura.total;

    factura.cursos_detalle.forEach(curso => {
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