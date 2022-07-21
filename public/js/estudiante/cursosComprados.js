var token;

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Estudiante");
    ObtenerCursos();
})

function ObtenerCursos(){
    fetch(url_curso, {
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
        console.log(Data)
    });
}