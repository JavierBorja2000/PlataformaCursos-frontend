var token;

// Campos de perfil
const nombresInput = document.querySelector("#nombresInput");
const apellidosInput = document.querySelector("#apellidosInput");
const nivelEstudiosInput = document.querySelector("#nivelEstudiosInput");
const certificacionesInput = document.querySelector("#certificacionesInput");
const experienciaInput = document.querySelector("#experienciaInput");
const numCuentaInput = document.querySelector("#numCuentaInput");
const nomBancoInput = document.querySelector("#nomBancoInput");
const nomCuentaInput = document.querySelector("#nomCuentaInput");
const tipoCuentaInput = document.querySelector("#tipoCuentaInput");

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Instructor");
    ObtenerDatos();
})

function ObtenerDatos() {
    fetch(url_instructor, {
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

function LlenarDatos(instructor) {
    const { 
        nombres,
        apellidos,
        nivelEstudios,
        certificaciones,
        experiencia,
        numCuenta,
        nomBanco,
        nomCuenta,
        tipoCuenta,
     } = instructor;

    nombresInput.value = nombres;
    apellidosInput.value = apellidos;
    nivelEstudiosInput.value = nivelEstudios;
    certificacionesInput.value = certificaciones;
    experienciaInput.value = experiencia;
    numCuentaInput.value = numCuenta;
    nomBancoInput.value = nomBanco;
    nomCuentaInput.value = nomCuenta;
    tipoCuentaInput.value = tipoCuenta;
}

function Put(){
    fetch(url_instructor, {
        method: "PUT",
        body: JSON.stringify({
            Nombres: nombresInput.value,
            Apellidos: apellidosInput.value,
            nivelEstudios: nivelEstudiosInput.value,
            certificaciones: certificacionesInput.value,
            experiencia: experienciaInput.value,
            numCuenta: parseInt(numCuentaInput.value),
            nomBanco: nomBancoInput.value,
            nomCuenta: nomCuentaInput.value,
            tipoCuenta: tipoCuentaInput.value,
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
        }
        else {
            console.log(Data)
        }
    });
}