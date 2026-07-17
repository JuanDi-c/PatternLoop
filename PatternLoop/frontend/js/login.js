const formulario = document.getElementById("loginForm");

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const correo = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        const respuesta = await fetch(`${API_URL}/usuarios/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                correo,
                password
            })

        });

        const data = await respuesta.json();

        if (respuesta.ok) {

            localStorage.setItem("token", data.token);
            localStorage.setItem("usuario", JSON.stringify(data.usuario));

            mostrarToast(
                "¡Bienvenido! 🧶",
                `Hola ${data.usuario.nombre}, disfruta explorando nuevos patrones.`
            );

            setTimeout(() => {

                window.location.href = "../index.html";

            }, 2000);

        } else {

            mostrarToast(
                "Error al iniciar sesión",
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