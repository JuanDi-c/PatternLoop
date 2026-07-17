const token = localStorage.getItem("token");
const usuario = JSON.parse(localStorage.getItem("usuario"));

const nav = document.getElementById("navActions");

if (token && usuario) {

    nav.innerHTML = `

        <div class="user-menu">

            <button class="user-button" id="userButton">

<div class="user-avatar">
    ${usuario.nombre.charAt(0).toUpperCase()}
</div>

<span>${usuario.nombre}</span>

                <i class="fa-solid fa-chevron-down"></i>

            </button>

            <div class="dropdown" id="dropdown">

                <a href="screens/nuevopatron.html">
                    <i class="fa-solid fa-plus"></i>
                    Publicar patrón
                </a>

                <a href="screens/mispublicaciones.html">
                    <i class="fa-solid fa-book"></i>
                    Mis publicaciones
                </a>

                <a href="screens/favoritos.html">
                    <i class="fa-solid fa-heart"></i>
                    Favoritos
                </a>

                <button id="logoutBtn">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    Cerrar sesión
                </button>

            </div>

        </div>

    `;

    const boton = document.getElementById("userButton");
    const menu = document.getElementById("dropdown");

    boton.addEventListener("click", () => {

        menu.classList.toggle("show");

    });

document.getElementById("logoutBtn").addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    sessionStorage.setItem("logoutExitoso", "true");

    window.location.reload();

});

    document.addEventListener("click", (e) => {

        if (!e.target.closest(".user-menu")) {

            menu.classList.remove("show");

        }

    });

}