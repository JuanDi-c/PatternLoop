const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const imagenPrincipal = document.getElementById("imagenPrincipal");
const miniaturas = document.getElementById("miniaturas");

const titulo = document.getElementById("titulo");
const autor = document.getElementById("autor");
const categoria = document.getElementById("categoria");
const dificultad = document.getElementById("dificultad");
const descripcion = document.getElementById("descripcion");
const materiales = document.getElementById("materiales");
const pasos = document.getElementById("pasos");

cargarPublicacion();

async function cargarPublicacion() {

    try {

        const respuesta = await fetch(`${API_URL}/publicaciones/${id}`);

        const publicacion = await respuesta.json();

        titulo.textContent = publicacion.titulo;

        autor.textContent = publicacion.autor.nombre;

        categoria.textContent = publicacion.categoria;

        dificultad.textContent = publicacion.dificultad;

        descripcion.textContent = publicacion.descripcion;

        /* =====================
           IMAGEN PRINCIPAL
        ====================== */

        if (publicacion.imagenes.length > 0) {

            imagenPrincipal.src =
                `http://localhost:3000/uploads/${publicacion.imagenes[0]}`;

            publicacion.imagenes.forEach(imagen => {

                const img = document.createElement("img");

                img.src = `http://localhost:3000/uploads/${imagen}`;

                img.addEventListener("click", () => {

                    imagenPrincipal.src = img.src;

                });

                miniaturas.appendChild(img);

            });

        }

        /* =====================
           MATERIALES
        ====================== */

        materiales.innerHTML = "";

        publicacion.materiales.forEach(material => {

            materiales.innerHTML += `

                <li>

                    <strong>${material.nombre}</strong>

                    ${material.cantidad}

                </li>

            `;

        });

        /* =====================
           PASOS
        ====================== */

        pasos.innerHTML = "";

        publicacion.instrucciones.forEach(instruccion => {

            pasos.innerHTML += `

                <div class="paso">

                    <h3>

                        Paso ${instruccion.paso}

                    </h3>

                    <p>

                        ${instruccion.descripcion}

                    </p>

                </div>

            `;

        });

    } catch (error) {

        console.error(error);

        document.body.innerHTML = `

            <h1 style="text-align:center;margin-top:80px">

                Error cargando la publicación

            </h1>

        `;

    }

}