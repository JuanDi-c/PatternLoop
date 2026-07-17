const grid = document.getElementById("patternsGrid");
const buscador = document.getElementById("busqueda");
const buscarBtn = document.getElementById("buscarBtn");
const cantidad = document.getElementById("cantidadPatrones");

cargarPublicaciones();

buscarBtn.addEventListener("click", buscar);

buscador.addEventListener("keyup", (e) => {

    if (e.key === "Enter") {

        buscar();

    }

});

async function buscar() {

    const titulo = buscador.value.trim();

    let url = `${API_URL}/publicaciones`;

    if (titulo !== "") {

        url = `${API_URL}/publicaciones/buscar?titulo=${encodeURIComponent(titulo)}`;

    }

    cargar(url);

}

async function cargarPublicaciones() {

    cargar(`${API_URL}/publicaciones`);

}

async function cargar(url) {

    try {

        const respuesta = await fetch(url);

        const publicaciones = await respuesta.json();

        cantidad.textContent = `${publicaciones.length} patrones encontrados`;

        grid.innerHTML = "";

        if (publicaciones.length === 0) {

            grid.innerHTML = `
                <h2 style="grid-column:1/-1;text-align:center;">
                    No se encontraron publicaciones.
                </h2>
            `;

            return;

        }

        publicaciones.forEach(publicacion => {

            const imagen = publicacion.imagenes.length
                ? `http://localhost:3000/uploads/${publicacion.imagenes[0]}`
                : "https://via.placeholder.com/400x280";

            grid.innerHTML += `

                <article class="pattern-card">

                    <div class="card-image">

                        <img src="${imagen}" alt="${publicacion.titulo}">

                        <button class="favorite">
                            <i class="fa-regular fa-heart"></i>
                        </button>

                        <span class="difficulty">
                            ${publicacion.dificultad}
                        </span>

                    </div>

                    <div class="card-content">

                        <div class="title-row">
                            <h2>${publicacion.titulo}</h2>
                        </div>

                        <p class="author">
                            por ${publicacion.autor.nombre}
                        </p>

                        <div class="tags">
                            <span>${publicacion.categoria}</span>
                        </div>
<div class="tags2">
    <a href="detallepatron.html?id=${publicacion._id}">
        Ver patrón
    </a>
</div>

                    </div>

                </article>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}