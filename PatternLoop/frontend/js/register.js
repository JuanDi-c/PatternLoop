const form = document.getElementById("registerForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const nombreError = document.getElementById("nombreError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    nombreError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";

    let valido = true;

    // Nombre
    if (nombre === "") {
        nombreError.textContent = "El nombre es obligatorio.";
        valido = false;
    }

    // Correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "El correo es obligatorio.";
        valido = false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = "Ingrese un correo válido.";
        valido = false;
    }

    // Contraseña fuerte
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

    if (password === "") {
        passwordError.textContent = "La contraseña es obligatoria.";
        valido = false;
    } else if (!passwordRegex.test(password)) {
        passwordError.textContent =
            "Debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";
        valido = false;
    }

    if (valido) {
        alert("Formulario enviado correctamente");
        form.submit();
    }

});