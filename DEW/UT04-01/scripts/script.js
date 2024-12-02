const DOM = {
    form: document.getElementById("formulario"),
    aficiones1: document.getElementById("aficiones-1").querySelectorAll("input"),
    aficiones2: document.getElementById("aficiones-2").querySelectorAll("input"),
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

let checks = false;
let nombres = [];
const DOMvalues = Object.values(DOM).slice(3);

const select = document.getElementById("birth-year");

for (let year = 2010; year >= 1950; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    select.appendChild(option);
}

function cuenta(elemento)
{
    const span = elemento.nextElementSibling;
    const maxLength = elemento.getAttribute('maxlength');
    const currentLength = elemento.value.length;
    span.textContent = `${currentLength}/${maxLength}`;
}

document.getElementById("opciondni").addEventListener("change", function () {
    const inputDniNie = document.getElementById("dninie");

    if (this.value === "DNI") {
        inputDniNie.disabled = false;
        inputDniNie.placeholder = "DNI (Ej: 12345678A)";
        inputDniNie.pattern = "[0-9]{8}[A-Z]{1}"
    } else if (this.value === "NIE") {
        inputDniNie.disabled = false;
        inputDniNie.placeholder = "NIE (Ej: X1234567L)";
        inputDniNie.pattern = "[A-Z]{1}[0-9]{7}[A-Z]{1}"
    }
});

document.getElementById("show-password").addEventListener("change", function () {
    const passwordInput = document.getElementById("password");

    if (this.checked) {
        passwordInput.type = "text";
    }
    
    else {
        passwordInput.type = "password";
    }
});

DOM.form.addEventListener("submit", (e) => {
    DOM.aficiones1.forEach(input => {
        input.checked === true ? checks = true : null
    })

    DOM.aficiones2.forEach(input => {
        input.checked === true ? checks = true : null
    })

    if (checks === false) {
        e.preventDefault();
        alert("No has marcado ninguna afición.")
    }

    DOMvalues.forEach(v => {
        v.validationMessage != "" ? nombres.push(v.id) : null;
    })

    if (nombres.length > 0) {
        e.preventDefault();
        alert(`Quedan campos por rellenar: \n` + nombres.join(`\n`));
        nombres = [];
    }
})