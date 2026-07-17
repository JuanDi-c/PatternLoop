document.addEventListener("DOMContentLoaded", () => {

    const API = API_URL;

    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!token || !usuario) {

        window.location.href = "login.html";
        return;

    }

    const nombre = document.getElementById("nombreUsuario");
    const correo = document.getElementById("correoUsuario");
    const avatar = document.getElementById("profileAvatar");

    const cantidadPatrones = document.getElementById("cantidadPatrones");
    const cantidadFavoritos = document.getElementById("cantidadFavoritos");

    const btnPatrones = document.getElementById("btnPatrones");
    const btnFavoritos = document.getElementById("btnFavoritos");

    const grid = document.getElementById("patternsGrid");

    nombre.textContent = usuario.nombre;
    correo.textContent = usuario.correo;
    avatar.textContent = usuario.nombre.charAt(0).toUpperCase();

    cargarMisPublicaciones();

    btnPatrones.addEventListener("click", () => {

        btnPatrones.classList.add("active");
        btnFavoritos.classList.remove("active");

        cargarMisPublicaciones();

    });

    btnFavoritos.addEventListener("click", () => {

        btnFavoritos.classList.add("active");
        btnPatrones.classList.remove("active");

        cargarFavoritos();

    });

    async function cargarMisPublicaciones() {

        try {

            const respuesta = await fetch(`${API}/publicaciones/mis-publicaciones`, {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            const publicaciones = await respuesta.json();

            cantidadPatrones.textContent = publicaciones.length;

            grid.innerHTML = "";

            if (publicaciones.length === 0) {

                grid.innerHTML = `
                    <h2>No has publicado ningún patrón.</h2>
                `;

                return;

            }

            publicaciones.forEach(publicacion => {

                const imagen = publicacion.imagenes.length
                    ? `${API.replace("/api","")}/uploads/${publicacion.imagenes[0]}`
                    : "../images/no-image.png";

                grid.innerHTML += `

                <article class="pattern-card">

                    <img src="${imagen}">

                    <div class="card-body">

                        <div class="title-row">

                            <h2>${publicacion.titulo}</h2>

                            <div class="card-actions">

                                <button
                                    class="delete"
                                    onclick="eliminarPublicacion('${publicacion._id}')">

                                    <i class="fa-regular fa-trash-can"></i>

                                </button>

                            </div>

                        </div>

                        <p>${publicacion.descripcion.substring(0,100)}...</p>

                        <div class="stats-row">

                            <span>${publicacion.categoria}</span>

                            <span>${publicacion.dificultad}</span>

                        </div>

                    </div>

                </article>

                `;

            });

        } catch (error) {

            console.error(error);

        }

    }

    async function cargarFavoritos() {

        try {

            const respuesta = await fetch(`${API}/favoritos`, {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            const favoritos = await respuesta.json();

            cantidadFavoritos.textContent = favoritos.length;

            grid.innerHTML = "";

            if (favoritos.length === 0) {

                grid.innerHTML = `
                    <h2>No tienes favoritos.</h2>
                `;

                return;

            }

            favoritos.forEach(favorito => {

                const p = favorito.publicacion;

                const imagen = p.imagenes.length
                    ? `${API.replace("/api","")}/uploads/${p.imagenes[0]}`
                    : "../images/no-image.png";

                grid.innerHTML += `

                <article class="pattern-card">

                    <img src="${imagen}">

                    <div class="card-body">

                        <div class="title-row">

                            <h2>${p.titulo}</h2>

                            <div class="card-actions">

                                <button
                                    class="favorite"
                                    onclick="quitarFavorito('${p._id}')">

                                    <i class="fa-solid fa-heart"></i>

                                </button>

                            </div>

                        </div>

                        <p>${p.descripcion.substring(0,100)}...</p>

                        <div class="stats-row">

                            <span>${p.autor.nombre}</span>

                            <span>${p.categoria}</span>

                        </div>

                    </div>

                </article>

                `;

            });

        } catch (error) {

            console.error(error);

        }

    }

    window.eliminarPublicacion = async (id) => {

        if (!confirm("¿Eliminar esta publicación?")) return;

        const respuesta = await fetch(`${API}/publicaciones/${id}`, {

            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await respuesta.json();

        if (respuesta.ok) {

            mostrarToast(
                "Publicación eliminada",
                data.mensaje
            );

            cargarMisPublicaciones();

        } else {

            mostrarToast(
                "Error",
                data.mensaje,
                "error"
            );

        }

    };

    window.quitarFavorito = async (id) => {

        const respuesta = await fetch(`${API}/favoritos/${id}`, {

            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await respuesta.json();

        if (respuesta.ok) {

            mostrarToast(
                "Favorito eliminado",
                data.mensaje
            );

            cargarFavoritos();

        } else {

            mostrarToast(
                "Error",
                data.mensaje,
                "error"
            );

        }

    };

});