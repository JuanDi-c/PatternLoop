const formulario = document.getElementById("registerForm");

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        const respuesta = await fetch(`${API_URL}/usuarios/registro`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nombre,
                correo,
                password
            })

        });

        const data = await respuesta.json();

        if (respuesta.ok) {

            mostrarToast(
                "¡Cuenta creada! 🧶",
                "Ahora puedes iniciar sesión en PatternLoop."
            );

            formulario.reset();

            setTimeout(() => {

                window.location.href = "login.html";

            }, 2000);

        } else {

            mostrarToast(
                "No fue posible registrarte",
                data.mensaje,
                "error"
            );

        }

    } catch (error) {

        console.error(error);

        mostrarToast(
            "Servidor no disponible",
            "No fue posible conectar con el servidor.",
            "error"
        );

    }

});