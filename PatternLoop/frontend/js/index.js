if (sessionStorage.getItem("logoutExitoso")) {

    mostrarToast(
        "¡Hasta pronto! 🧶",
        "Has cerrado sesión correctamente."
    );

    sessionStorage.removeItem("logoutExitoso");

}

const grid = document.getElementById("patternsGrid");

cargarPublicaciones();

async function cargarPublicaciones() {

    try {

        const respuesta = await fetch(`${API_URL}/publicaciones`);

        const publicaciones = await respuesta.json();

        await mostrarPublicaciones(publicaciones);

    } catch (error) {

        console.error(error);

    }

}

async function mostrarPublicaciones(publicaciones) {

    grid.innerHTML = "";

    const token = localStorage.getItem("token");

    for (const publicacion of publicaciones) {

        const imagen = publicacion.imagenes.length
            ? `${API_URL.replace("/api", "")}/uploads/${publicacion.imagenes[0]}`
            : "images/no-image.png";

        let esFavorito = false;
        let cantidadFavoritos = 0;

        // Verificar favorito
        if (token) {

            try {

                const respuesta = await fetch(
                    `${API_URL}/favoritos/verificar/${publicacion._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (respuesta.ok) {

                    const data = await respuesta.json();

                    esFavorito = data.favorito;

                }

            } catch (error) {

                console.log(error);

            }

        }

        // Cantidad de favoritos
        try {

            const respuestaCantidad = await fetch(
                `${API_URL}/favoritos/cantidad/${publicacion._id}`
            );

            if (respuestaCantidad.ok) {

                const dataCantidad = await respuestaCantidad.json();

                cantidadFavoritos = dataCantidad.favoritos;

            }

        } catch (error) {

            console.log(error);

        }

        grid.innerHTML += `

            <article class="pattern-card">

                <img
                    src="${imagen}"
                    alt="${publicacion.titulo}">

                <div class="pattern-info">

                    <span class="category">

                        ${publicacion.categoria}

                    </span>

                    <h3>

                        ${publicacion.titulo}

                    </h3>

                    <p>

                        ${publicacion.descripcion.substring(0, 90)}...

                    </p>

                    <div class="pattern-footer">

                        <span>

                            👤 ${publicacion.autor.nombre}

                        </span>

                        <button
                            class="favorite-btn ${esFavorito ? "active" : ""}"
                            data-id="${publicacion._id}">

                            <i class="fa-solid fa-heart"></i>

                            <span>${cantidadFavoritos}</span>

                        </button>

                    </div>

                </div>

            </article>

        `;

    }

    document.querySelectorAll(".favorite-btn").forEach(btn => {

        btn.addEventListener("click", toggleFavorito);

    });

}

async function toggleFavorito(e) {

    const token = localStorage.getItem("token");

    if (!token) {

        mostrarToast(
            "Debes iniciar sesión",
            "Inicia sesión para agregar favoritos.",
            "error"
        );

        return;

    }

    const boton = e.currentTarget;

    const id = boton.dataset.id;

    const activo = boton.classList.contains("active");

    try {

        let respuesta;

        if (activo) {

            respuesta = await fetch(
                `${API_URL}/favoritos/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

        } else {

            respuesta = await fetch(
                `${API_URL}/favoritos`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        publicacion: id
                    })
                }
            );

        }

        if (respuesta.ok) {

            boton.classList.toggle("active");

            const contador = boton.querySelector("span");

            let cantidad = parseInt(contador.textContent);

            contador.textContent = activo
                ? cantidad - 1
                : cantidad + 1;

        } else {

            const data = await respuesta.json();

            mostrarToast(
                "Error",
                data.mensaje,
                "error"
            );

        }

    } catch (error) {

        console.error(error);

    }

}