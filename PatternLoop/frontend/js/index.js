if (sessionStorage.getItem("logoutExitoso")) {

    mostrarToast(
        "¡Hasta pronto! 🧶",
        "Has cerrado sesión correctamente."
    );

    sessionStorage.removeItem("logoutExitoso");

}

const grid = document.getElementById("patternsGrid");
console.log(grid);

cargarPublicaciones();

async function cargarPublicaciones(){

    try{

        const respuesta = await fetch(`${API_URL}/publicaciones`);

        const publicaciones = await respuesta.json();

        mostrarPublicaciones(publicaciones);

    }catch(error){

        console.error(error);

    }

}

function mostrarPublicaciones(publicaciones){

    grid.innerHTML = "";

    publicaciones.forEach(publicacion=>{

        const imagen = publicacion.imagenes.length
    ? `${API_URL.replace("/api","")}/uploads/${publicacion.imagenes[0]}`
    : "images/no-image.png";

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

                        ${publicacion.descripcion.substring(0,90)}...

                    </p>

                    <div class="pattern-footer">

                        <span>

                            👤 ${publicacion.autor.nombre}

                        </span>

                        <span>

                            ❤️ ${publicacion.likes}

                        </span>

                    </div>

                </div>

            </article>

        `;

    });

}