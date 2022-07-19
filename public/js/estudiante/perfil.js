var token;

// Campos de perfil
const nombresInput = document.querySelector("#nombresInput");
const apellidosInput = document.querySelector("#apellidosInput");
const telefonoInput = document.querySelector("#telefonoInput");
const nitInput = document.querySelector("#nitInput");
const numTarjetaInput = document.querySelector("#numTarjetaInput");

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Estudiante");
    ObtenerDatos();
})

function ObtenerDatos() {
    fetch(url_estudiante + "/" + getCookie("correo"), {
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
        LlenarDatos(Data);
    });
}

function LlenarDatos(estudiante) {
    const { nombres,
        apellidos,
        telefono,
        nit,
        numTarjeta } = estudiante;

    nombresInput.value = nombres;
    apellidosInput.value = apellidos;
    telefonoInput.value = telefono;
    nitInput.value = nit;
    numTarjetaInput.value = numTarjeta;
}

function Put(){
    fetch(url_estudiante, {
        method: "PUT",
        body: JSON.stringify({
            Nombres: nombresInput.value,
            Apellidos: apellidosInput.value,
            Telefono: parseInt(telefonoInput.value),
            Nit: nitInput.value,
            Correo: getCookie("correo"),
            NumTarjeta: parseInt(numTarjetaInput.value),
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
            ImprimirAlerta(Data);
            ObtenerDatos();
        }
        else {
            console.log(Data)
        }
    });
}