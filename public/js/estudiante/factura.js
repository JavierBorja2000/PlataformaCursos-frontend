var token;

document.addEventListener('DOMContentLoaded', e => {
    ValidarToken("Estudiante");
    var url = new URL (window.location.href.toLowerCase());
    var id = url.searchParams.get("id");

    console.log(id)
})