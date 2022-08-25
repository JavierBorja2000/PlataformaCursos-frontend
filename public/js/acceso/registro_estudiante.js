var url="https://localhost:7188/api/Estudiante";

//Se obtienen los inputs
const campoNombres = document.querySelector('#nombres');
const campoApellidos = document.querySelector('#apellidos');
const campoTelefono = document.querySelector('#telefono');
const campoEmail = document.querySelector('#correo');
const campoClave1 = document.querySelector('#clave');
const campoClave2 = document.querySelector('#clave2');
const campoNIT = document.querySelector('#nit');
const campoTarjeta = document.querySelector('#numTarjeta');

//Eventos en los inputs
campoNombres.addEventListener('blur',() => {
    restaurarCampo("nombres");
});

campoApellidos.addEventListener('blur',() => {
    restaurarCampo("apellidos");
});

campoTelefono.addEventListener('blur',() => {
    restaurarCampo("telefono");
});

campoEmail.addEventListener('blur',() => {
    restaurarCampo("correo");
});

campoNIT.addEventListener('blur',() => {
    restaurarCampo("nit");
});

campoTarjeta.addEventListener('blur',() => {
    restaurarCampo("numTarjeta");
});

campoClave1.addEventListener('blur',() => {
    restaurarCampo("clave");
    ValidarPassword();
});

campoClave2.addEventListener('blur',() => {
    restaurarCampo("clave2");
    ValidarPassword();
});



function Post()
{
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            nombres: document.getElementById("nombres").value,
            apellidos: document.getElementById("apellidos").value,
            telefono: document.getElementById("telefono").value,
            nit: document.getElementById("nit").value,
            correo: document.getElementById("correo").value,
            clave: document.getElementById("clave").value,
            numTarjeta: document.getElementById("numTarjeta").value}),
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

    if(document.getElementById("telefono").value == "")
    {
        MensajeCamposVacios("telefono");
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
    
    if(document.getElementById("nit").value == "")
    {
        MensajeCamposVacios("nit");
        valido = false;
    }

    if(document.getElementById("numTarjeta").value == "")
    {
        MensajeCamposVacios("numTarjeta");
        valido = false;
    }
    
    if(valido == true){
        Post();
    }
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
    document.getElementById("message_form").innerHTML = "Todos los campos son obligatorios";
}

function restaurarCampo(id)
{
    document.getElementById("message_form").innerHTML = "";
}
