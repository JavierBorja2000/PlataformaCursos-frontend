var token;

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Estudiante");
    ObtenerCursos();
})

function ObtenerCursos(){
    fetch(url_curso, {
        method: "POST",
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
        console.log(Data)
    });
}