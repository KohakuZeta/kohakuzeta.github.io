const DOM = {
    form: document.getElementById("formulario"),
    aficiones1: document.getElementById("aficiones-1").querySelectorAll("input"),
    aficiones2: document.getElementById("aficiones-2").querySelectorAll("input"),
    aficionesHidden: document.getElementById("aficiones-hidden"),
    select: document.getElementById("birth-year"),
    mensajesError: document.querySelectorAll(".mensajeError"),
    opcion: document.getElementById("opciondni"),
    showPass: document.getElementById("show-password"),

    username: document.getElementById("username"),
    password: document.getElementById("password"),
    name: document.getElementById("name"),
    surname: document.getElementById("surname"),
    phone: document.getElementById("phone"),
    postalCode: document.getElementById("postal-code"),
    dninie: document.getElementById("dninie"),
    birthYear: document.getElementById("birth-year"),
    title: document.getElementById("title"),
    description: document.getElementById("description")
}

let checks = [];
let errores = false;
let aficiones = false;
let dni = false;
const DOMvalues = Object.values(DOM).slice(8);

// Poblamos el select con los años
export function poblarAnios() {
    for (let year = 2010; year >= 1920; year--) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        DOM.select.appendChild(option);
    }
}

// Mostrar la longitud de caracteres en los inputs
export function actualizarCuenta(elemento)
{
    const span = elemento.nextElementSibling.nextElementSibling;
    const maxLength = elemento.getAttribute('maxlength');
    const currentLength = elemento.value.length;
    span.textContent = `${currentLength}/${maxLength}`;
}

DOM.title.addEventListener("input", () => actualizarCuenta(DOM.title));
DOM.description.addEventListener("input", () => actualizarCuenta(DOM.description));

// Configuración del DNI/NIE según la opción seleccionada
export function configurarDniNie() {
    const inputDniNie = document.getElementById("dninie");
    const opcionDni = document.getElementById("opciondni");

    if (opcionDni.value === "DNI") {
        inputDniNie.disabled = false;
        inputDniNie.placeholder = "DNI (Ej: 12345678A)";
        inputDniNie.pattern = "[0-9]{8}[A-Z]{1}"
    } else if (opcionDni.value === "NIE") {
        inputDniNie.disabled = false;
        inputDniNie.placeholder = "NIE (Ej: X1234567L)";
        inputDniNie.pattern = "[X-Z]{1}[0-9]{7}[A-Z]{1}"
    }
}

DOM.opcion.addEventListener("change", configurarDniNie);

// Mostrar u ocultar la contraseña
export function toggleContrasenia() {
    const passwordInput = document.getElementById("password");
    const checkbox = document.getElementById("show-password");

    passwordInput.type = checkbox.checked ? "text" : "password";
}

DOM.showPass.addEventListener("change", toggleContrasenia);

// Comprobar que al menos dos aficiones están seleccionadas
export function comprobarAficiones() {
    checks = [
        ...DOM.aficiones1,
        ...DOM.aficiones2
    ].filter(input => input.checked)
        .map(input => input.value);

    DOM.aficionesHidden.value = checks.join(', ');

    // Comprobamos si la longitud de aficiones es 2 ó más
    aficiones = checks.length <= 1
    // Devolvemos el opuesto: si es 2 ó mayor, será true
    return !aficiones;
}

// Mostrar mensajes de error singulares
export function mostrarMensajesError() {
    let mensajes = [];

    DOM.mensajesError.forEach(span => {
        const input = span.previousElementSibling;

        if (input.checkValidity())
        {
            span.textContent = '';
        }

        else {
            span.textContent = input.validationMessage;
            mensajes.push(`${input.name}: ${input.validationMessage}`);
        }        
    });

    if (aficiones) {
        mensajes.push("Debes seleccionar, al menos, dos aficiones.");
    }

    if (!dni) {
        mensajes.push("La letra del documento no coincide.")
    }

    crearListaError(mensajes);
}

// Mostrar mensajes de error en el DOM
export function crearListaError(mensajes) {
    const listaExistente = document.querySelector("#lista-errores");
    if (listaExistente) listaExistente.remove();

    const div = document.createElement("div");
    div.id = "lista-errores";

    const ul = document.createElement("ul");

    mensajes.forEach(mensaje => {
        const  li = document.createElement("li");
        li.textContent = mensaje;
        ul.appendChild(li);
    });

    div.appendChild(ul);
    document.body.appendChild(div);
}

// Desactivar todas las aficiones (antes de enviar el formulario)
export function desactivarAficiones() {
    [...DOM.aficiones1, ...DOM.aficiones2].forEach(input => {
        input.disabled = true;
    });
}

function comprobarDocumento() {
    let arrayLetras = ['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E'];
    let arrayControl = ['X','Y','Z'];
    let input = DOM.dninie.value;
    let opcion = DOM.opcion;
    let numero;
    let letra;

    if (opcion.value === "DNI") {
        numero = parseInt(input.slice(0, 8));
        letra = input.slice(8, 9);
    }

    else {
        let letraControl = input.slice(0, 1);
        let digitoControl = arrayControl.findIndex(control => control === letraControl);
        numero = digitoControl + input.slice(1, 8);
        console.log(numero);
        console.log(parseInt(numero));
        letra = input.slice(8, 9);
    }

    dni = letra === (arrayLetras[numero % 23]);
    return dni;
}

// Envío del formulario.
DOM.form.addEventListener("submit", (e) => {
    checks = [];

    if (!comprobarAficiones() || !comprobarDocumento())
    {
        e.preventDefault();
        errores = true;
    }

    // Verificar validación de campos
    const nombres = DOMvalues.filter(v => !v.checkValidity()).map(v => v.id);
    if (nombres.length > 0) {
        e.preventDefault();
        errores = true;
    }

    if (errores)
    {
        mostrarMensajesError();
    }

    else {
        desactivarAficiones();
    }
})

poblarAnios();