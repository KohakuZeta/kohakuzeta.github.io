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
    } else if (this.value === "NIE") {
        inputDniNie.disabled = false;
        inputDniNie.placeholder = "NIE (Ej: X1234567L)";
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