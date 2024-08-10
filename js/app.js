/**
 * Procesa el texto ingresado según la operación de encriptación o desencriptación seleccionada.
 * @param operacion - La función de encriptación o desencriptación a aplicar.
 */
function procesarTexto(operacion) {
    const textoInput = document.getElementById("textInput");
    const texto = textoInput.value;

    const textoLimpiado = validarTexto(texto);
    const textoProcesado = operacion === encriptar ? encriptar(textoLimpiado) : desencriptar(textoLimpiado);

    const textOutput = document.getElementById("textOutput");
    textOutput.value = textoProcesado;
    textoInput.value = operacion === encriptar ? "" : textoLimpiado;
    textOutput.style.display = "block";

    const btnCopiar = document.getElementById("btnCopiar");
    btnCopiar.style.display = "inline-block";

    document.querySelector(".encriptador__contenido__resultado__estatico").style.display = "none";
}

/**
 * Función asociada al botón de encriptar que procesa el texto utilizando la función de encriptación.
 */
function btnEncriptar() {
    procesarTexto(encriptar);
}

/**
 * Función asociada al botón de desencriptar que procesa el texto utilizando la función de desencriptación.
 */
function btnDesencriptar() {
    procesarTexto(desencriptar);
}

/**
 * Valida el texto ingresado, mostrando mensajes de error y limpiando el texto si es necesario.
 * @param texto - El texto a validar.
 * @returns El texto limpio si es válido, o false si es inválido.
 */
function validarTexto(texto) {
    if (!texto || !texto.trim()) {
        mostrarMensaje("Debes ingresar un texto.");
        return false;
    }
    else if (texto.match(/[^a-z\s.,!?]/i)) {
        const textoLimpio = limpiarTexto(texto);
        mostrarMensaje("Recuerda que solo debes ingresar letras minúsculas y sin acentos.");
        return textoLimpio;
    }
    return texto;
}

/**
 * Limpia el texto, convirtiéndolo a minúsculas y eliminando acentos.
 * @param texto - El texto a limpiar.
 * @returns El texto limpio.
 */
function limpiarTexto(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Encripta un texto reemplazando las vocales por cadenas encriptadas.
 * @param texto - El texto a encriptar.
 * @returns El texto encriptado.
 */
function encriptar(texto) {
    const encriptaciones = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat'
    };

    const reemplazarVocal = (match) => encriptaciones[match] || match;
    texto = texto.replace(/[aeiou]/g, reemplazarVocal);
    return texto;
}

/**
 * Desencripta un texto encriptado, reemplazando las cadenas encriptadas por las vocales originales.
 * @param textoEncriptado - El texto encriptado a desencriptar.
 * @returns El texto desencriptado.
 */
function desencriptar(textoEncriptado) {
    const desencriptaciones = {
        'ai': 'a',
        'enter': 'e',
        'imes': 'i',
        'ober': 'o',
        'ufat': 'u'
    };

    const reemplazarCadena = (match) => desencriptaciones[match] || match;
    textoEncriptado = textoEncriptado.replace(/(ai|enter|imes|ober|ufat)/g, reemplazarCadena);
    return textoEncriptado;
}

/**
 * Crea un mensaje en un elemento div y lo muestra en la página por un tiempo limitado.
 * @param mensajeTexto - El texto del mensaje a mostrar.
 */

function mostrarMensaje(mensajeTexto) {
    const mensaje = document.createElement("div");
    mensaje.textContent = mensajeTexto;
    mensaje.className = "encriptador__contenido__mensaje";

    document.body.appendChild(mensaje);
    mensaje.style.display = "block";

    setTimeout(() => {
        mensaje.remove();
    }, 2000);
}

/**
 * Función para copiar el contenido de un elemento de texto al portapapeles.
 * También muestra un mensaje de confirmación cuando se copia correctamente.
 */
function btnCopiar() {
    const textOutput = document.getElementById("textOutput");

    textOutput.select();
    textOutput.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(textOutput.value)
    .then(() => {
        mostrarMensaje("¡Texto copiado al portapapeles!");
    })
    .catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
    });
}