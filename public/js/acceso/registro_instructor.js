var url="https://localhost:7188/api/Instructor";

//Se obtienen los inputs
const campoNombres = document.querySelector('#nombres');
const campoApellidos = document.querySelector('#apellidos');
const campoEmail = document.querySelector('#correo');
const campoClave1 = document.querySelector('#clave');
const campoClave2 = document.querySelector('#clave2');
const campoEstudios = document.querySelector('#estudios');
const campoNumCuenta = document.querySelector('#numCuenta');
const campoBanco = document.querySelector('#banco');
const campoNomCuenta = document.querySelector('#nomCuenta');
const campoTipo = document.querySelector('#tipoCuenta');

//Eventos en los inputs
campoNombres.addEventListener('blur',() => {
    restaurarCampo("nombres");
});

campoApellidos.addEventListener('blur',() => {
    restaurarCampo("apellidos");
});

campoEmail.addEventListener('blur',() => {
    restaurarCampo("correo");
});

campoClave1.addEventListener('blur',() => {
    restaurarCampo("clave");
    ValidarPassword();
});

campoClave2.addEventListener('blur',() => {
    restaurarCampo("clave2");
    ValidarPassword();
});

campoEstudios.addEventListener('blur',() => {
    restaurarCampo("estudios");
});

campoNumCuenta.addEventListener('blur',() => {
    restaurarCampo("numCuenta");
});

campoBanco.addEventListener('blur',() => {
    restaurarCampo("banco");
});

campoNomCuenta.addEventListener('blur',() => {
    restaurarCampo("nomCuenta");
});

campoTipo.addEventListener('blur',() => {
    restaurarCampo("tipoCuenta");
});

function ValidarForm()
{
    const valido = true;

    if(document.getElementById("nombres").value == "")
    {
        MensajeCamposVacios("nombres");
        valido = false;
    }
    
    if(document.getElementById("apellidos").value == "")
    {
        MensajeCamposVacios("apellidos");
        valido = false;
    }
    
    if(document.getElementById("correo").value == "")
    {
        MensajeCamposVacios("correo");
        valido = false;
    }
    
    if(document.getElementById("clave").value == "")
    {
        MensajeCamposVacios("clave");
        valido = false;
    }
    
    if(document.getElementById("clave2").value == "")
    {
        MensajeCamposVacios("clave2");
        valido = false;
    }

    ValidarPassword();
    
    if(document.getElementById("estudios").value == "")
    {
        MensajeCamposVacios("estudios");
        valido = false;
    }

    if(document.getElementById("numCuenta").value == "")
    {
        MensajeCamposVacios("numCuenta");
        valido = false;
    }

    if(document.getElementById("banco").value == "")
    {
        MensajeCamposVacios("banco");
        valido = false;
    }

    if(document.getElementById("nomCuenta").value == "")
    {
        MensajeCamposVacios("nomCuenta");
        valido = false;
    }

    if(document.getElementById("tipoCuenta").value == "")
    {
        MensajeCamposVacios("tipoCuenta");
        valido = false;
    }
    
    if(valido == true){
        Post();
    }
}

function Post()
{
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            correo: document.getElementById("correo").value,
            clave: document.getElementById("clave").value, 
            nombres: document.getElementById("nombres").value, 
            apellidos: document.getElementById("apellidos").value, 
            certificaciones: document.getElementById("certificaciones").value, 
            nivelEstudios: document.getElementById("estudios").value, 
            experiencia: document.getElementById("experiencia").value, 
            numCuenta: document.getElementById("numCuenta").value, 
            nomBanco: document.getElementById("banco").value, 
            nomCuenta: document.getElementById("nomCuenta").value,
            tipoCuenta: document.getElementById("tipoCuenta").value}),
        headers:{
            'Accept' : "application/json",
            "Content-Type":"application/json",
        }
    }).then(function(response){

        return response.json();
    
    }).then(function(Data){
        console.log(Data);

        if(Data.msg && Data.error)
        {
            document.getElementById("message_form").style.color = "red";
            document.getElementById("message_form").innerHTML = Data.msg;
        }else{
            document.getElementById("message_form").style.color = "green";
            document.getElementById("message_form").innerHTML = Data.msg;
            window.location.href = "/public/access_pages/login.html";
        }
    })
}

function ValidarPassword(){

    var ingreso1 = document.getElementById("clave").value;
    var ingreso2 = document.getElementById("clave2").value;

    if(ingreso1 != ingreso2)
    {
        document.getElementById("message_form").style.color = "red";
        document.getElementById("message_form").innerHTML = "Las contraseñas no coinciden";
        document.getElementById("clave").style.borderColor = "red";
        document.getElementById("clave2").style.borderColor = "red";
    }
    else if(ingreso1 == "" || ingreso2 == "")
    {
        document.getElementById("clave").style.borderColor = "red";
        document.getElementById("clave2").style.borderColor = "red";
        document.getElementById("message_form").style.color = "red";
        document.getElementById("message_form").innerHTML = "Los campos * no pueden estar vacíos";
    }
    else
    {
        document.getElementById("clave").style.borderColor = "green";
        document.getElementById("clave2").style.borderColor = "green";
    }

}

function MensajeCamposVacios(id)
{
    document.getElementById("message_form").style.color = "red";
    document.getElementById("message_form").innerHTML = "Los campos * no pueden estar vacíos";
}

function restaurarCampo(id)
{
    document.getElementById("message_form").innerHTML = "";
}


