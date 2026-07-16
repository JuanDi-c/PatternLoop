const formulario = document.getElementById("registerForm");

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        const respuesta = await fetch(`${API_URL}/usuarios/register`, {

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

            alert(data.mensaje);

            formulario.reset();

            window.location.href = "login.html";

        } else {

            alert(data.mensaje);

        }

    } catch (error) {

        console.error(error);

        alert("No se pudo conectar con el servidor.");

    }

});