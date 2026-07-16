const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    emailError.textContent = "";
    passwordError.textContent = "";

    let valido = true;

    // Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "El correo es obligatorio.";
        valido = false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = "Ingrese un correo válido.";
        valido = false;
    }

    // Validar contraseña
    if (password === "") {
        passwordError.textContent = "La contraseña es obligatoria.";
        valido = false;
    } else if (password.length < 8) {
        passwordError.textContent =
            "La contraseña debe tener al menos 8 caracteres.";
        valido = false;
    }

    if (valido) {
        console.log("Login correcto");

        // Aquí iría la petición al backend
        // form.submit();
    }
});