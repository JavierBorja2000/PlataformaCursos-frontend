function Guardar(){
    if (nombresInput.value.trim() === "" || apellidosInput.value.trim() === "" || telefonoInput.value.trim("") === "" || numTarjetaInput.value.trim("") === "") {
        ImprimirAlerta({
            msg: "Todos los campos son obligatorios",
            error: true
        })
        return;
    }

    if(isNaN(parseInt(telefonoInput.value)))
    {
        ImprimirAlerta({
            msg: "El teléfono no es válido",
            error: true
        })
        return;
    }

    if(isNaN(parseInt(numTarjetaInput.value)))
    {
        ImprimirAlerta({
            msg: "El número de tarjeta no es válido",
            error: true
        })
        return;
    }

    Put();
}