var token;

const listadoVacio = document.querySelector("#listadoVacio");
const tabla = document.querySelector("#tabla");
const listado = document.querySelector("#listado");

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Estudiante");
    ObtenerFacturas();
})

function ObtenerFacturas() {
    fetch(url_facturas, {
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
        ImprimirFacturas(Data)
    });
}

function ImprimirFacturas(facturas) {
    if (facturas.length === 0) {
        listadoVacio.textContent = "No hay facturas todavía";
        return;
    }

    tabla.classList.remove("hidden");

    facturas.forEach(factura => {
        const fila = document.createElement("tr");
        fila.classList.add("border-y", "border-violet-500", "text-center");

        const numero = document.createElement("td");
        numero.classList.add("px-3", "py-2");
        numero.textContent = factura.idPedido;

        const fecha = document.createElement("td");
        fecha.classList.add("px-3", "py-2");

        factura.fecha = new Date(factura.fecha);
        const offset = factura.fecha.getTimezoneOffset();
        factura.fecha = new Date(factura.fecha.getTime() - (offset * 60 * 1000));
        fecha.textContent = factura.fecha.toISOString().split('T')[0];

        const total = document.createElement("td");
        total.classList.add("px-3", "py-2");
        total.textContent = factura.total;

        const acciones = document.createElement("td");
        acciones.classList.add("py-2", "text-center");

        const btnVerDetalles = document.createElement("button");
        btnVerDetalles.textContent = "Ver detalles";
        btnVerDetalles.classList.add("text-center", "text-violet-600", "hover:text-violet-700", "font-bold");
        btnVerDetalles.addEventListener("click", () => {
            VerDetalles(factura.idPedido);
        });

        acciones.appendChild(btnVerDetalles);

        fila.appendChild(numero);
        fila.appendChild(fecha);
        fila.appendChild(total);
        fila.appendChild(acciones);
        listado.appendChild(fila);
    });
}

function VerDetalles(id) {
    window.location.href = "./factura.html?id=" + id;
}