function Guardar(){
    if (nombresInput.value.trim() === "" || apellidosInput.value.trim() === "" || nivelEstudiosInput.value.trim() === "" || numCuentaInput.value.trim() === "" || nomBancoInput.value.trim() === "" || nomCuentaInput.value.trim() === "" || tipoCuentaInput.value.trim() === "") {
        ImprimirAlerta({
            msg: "Los campos marcados son obligatorios",
            error: true
        })
        return;
    }

    if(isNaN(parseInt(numCuentaInput.value)))
    {
        ImprimirAlerta({
            msg: "El número de cuenta no es válido",
            error: true
        })
        return;
    }

    Put();
}