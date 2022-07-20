var token;

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Estudiante");

    var facturas = [
        {
            id: 1,
            fecha: '10/10/2022',
            total: 120
        },
        {
            id: 2,
            fecha: '12/10/2022',
            total: 50
        }
    ]

    ImprimirFacturas(facturas);
})

function ObtenerFacturas(){
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

function ImprimirFacturas(facturas){
    console.log(facturas)
}