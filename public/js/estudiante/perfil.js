var token;

// Campos de perfil
const nombresInput = document.querySelector("#nombresInput");
const apellidosInput = document.querySelector("#apellidosInput");
const telefonoInput = document.querySelector("#telefonoInput");
const nitInput = document.querySelector("#nitInput");
const correoInput = document.querySelector("#correoInput");
const numTarjetaInput = document.querySelector("#numTarjetaInput");

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Estudiante");
    // ObtenerDatos();
    const estudiante = {
        nombres: "Lesly",
        apellidos: "Dubón",
        telefono: 2130138,
        nit: 138137,
        correo: "lkdubonc2@gmail.com",
        numTarjeta: 3410
    }

    LlenarDatos(estudiante)
})

function ObtenerDatos() {
    fetch(url_estudiante, {
        method: "GET",
        body: JSON.stringify({
            Correo: getCookie("correo")
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
        LlenarDatos(Data);
    });
}

function LlenarDatos(estudiante) {
    const { nombres,
        apellidos,
        telefono,
        nit,
        correo,
        numTarjeta } = estudiante;

    nombresInput.value = nombres;
    apellidosInput.value = apellidos;
    telefonoInput.value = telefono;
    nitInput.value = nit;
    correoInput.value = correo;
    numTarjetaInput.value = numTarjeta;
}

function Put(){
    fetch(url_estudiante, {
        method: "PUT",
        body: JSON.stringify({
            nombres: nombresInput.value,
            apellidos: apellidosInput.value,
            telefono: parseInt(telefonoInput.value),
            nit: nitInput.value,
            correo: correoInput.value,
            numTarjeta: parseInt(numTarjetaInput.value),
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
            // ObtenerDatos();
        }
        else {
            console.log(Data)
        }
    });
}