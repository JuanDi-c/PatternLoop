const upload = document.getElementById("imageUpload");
const inputImagenes = document.getElementById("imagenes");
const preview = document.getElementById("previewImagenes");

const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const categoria = document.getElementById("categoria");
const dificultad = document.getElementById("dificultad");

const publicarBtn = document.getElementById("publicarBtn");

let imagenesSeleccionadas = [];
let materiales = [];
let instrucciones = [];

/* ==========================
   MATERIALES
========================== */

const listaMateriales = document.getElementById("listaMateriales");

const materialNombre = document.getElementById("materialNombre");

const materialCantidad = document.getElementById("materialCantidad");

const agregarMaterialBtn = document.getElementById("agregarMaterial");

agregarMaterialBtn.addEventListener("click", () => {

    const nombre = materialNombre.value.trim();

    const cantidad = materialCantidad.value.trim();

    if (nombre === "" || cantidad === "") {

        mostrarToast(
            "Campos incompletos",
            "Escribe el material y la cantidad.",
            "error"
        );

        return;

    }

    materiales.push({

        nombre,
        cantidad

    });

    materialNombre.value = "";
    materialCantidad.value = "";

    pintarMateriales();

});

function pintarMateriales() {

    listaMateriales.innerHTML = "";

    materiales.forEach((material, index) => {

        listaMateriales.innerHTML += `

            <div class="material-item">

                <span>

                    <strong>${material.nombre}</strong>

                    - ${material.cantidad}

                </span>

                <button
                    type="button"
                    onclick="eliminarMaterial(${index})">

                    <i class="fa-regular fa-trash-can"></i>

                </button>

            </div>

        `;

    });

}

function eliminarMaterial(index) {

    materiales.splice(index, 1);

    pintarMateriales();

}

/* ==========================
   PASO A PASO
========================== */

const listaPasos = document.getElementById("listaPasos");

const descripcionPaso = document.getElementById("descripcionPaso");

document
.getElementById("agregarPaso")
.addEventListener("click", agregarPaso);

function agregarPaso(){

    const descripcion = descripcionPaso.value.trim();

    if(descripcion===""){

        mostrarToast(
            "Campo vacío",
            "Escribe la descripción del paso.",
            "error"
        );

        return;

    }

    instrucciones.push({

        paso: instrucciones.length + 1,

        descripcion

    });

    descripcionPaso.value="";

    pintarPasos();

}

function pintarPasos(){

    listaPasos.innerHTML="";

    instrucciones.forEach((paso,index)=>{

        listaPasos.innerHTML += `

            <div class="paso-card">

                <div class="paso-header">

                    <h3>Paso ${paso.paso}</h3>

                    <button
                        type="button"
                        onclick="eliminarPaso(${index})">

                        <i class="fa-regular fa-trash-can"></i>

                    </button>

                </div>

                <p>

                    ${paso.descripcion}

                </p>

            </div>

        `;

    });

}

function eliminarPaso(index){

    instrucciones.splice(index,1);

    instrucciones = instrucciones.map((paso,i)=>({

        paso:i+1,

        descripcion:paso.descripcion

    }));

    pintarPasos();

}

upload.addEventListener("click", () => {

    inputImagenes.click();

});

inputImagenes.addEventListener("change", () => {

    imagenesSeleccionadas = [...inputImagenes.files];

    preview.innerHTML = "";

    imagenesSeleccionadas.forEach(imagen => {

        const reader = new FileReader();

        reader.onload = e => {

            preview.innerHTML += `

                <img
                    src="${e.target.result}"
                    class="preview-img">

            `;

        };

        reader.readAsDataURL(imagen);

    });

});

publicarBtn.addEventListener("click", async () => {

    const token = localStorage.getItem("token");

    if(!token){

        mostrarToast(
            "Debes iniciar sesión",
            "Inicia sesión para publicar.",
            "error"
        );

        return;

    }

    const formData = new FormData();

    formData.append("titulo", titulo.value);

    formData.append("descripcion", descripcion.value);

    formData.append("categoria", categoria.value);

    formData.append("dificultad", dificultad.value);

    formData.append(
        "materiales",
        JSON.stringify(materiales)
    );

    formData.append(
        "instrucciones",
        JSON.stringify(instrucciones)
    );

    imagenesSeleccionadas.forEach(img=>{

        formData.append("imagenes",img);

    });

    try{

        const respuesta = await fetch(`${API_URL}/publicaciones`,{

            method:"POST",

            headers:{
                Authorization:`Bearer ${token}`
            },

            body:formData

        });

        const data = await respuesta.json();

        if(respuesta.ok){

            mostrarToast(
                "¡Patrón publicado!",
                "Tu publicación ya está disponible."
            );

            setTimeout(()=>{

                window.location.href="../index.html";

            },1800);

        }else{

            mostrarToast(
                "Error",
                data.mensaje,
                "error"
            );

        }

    }catch(error){

        console.error(error);

        mostrarToast(
            "Servidor",
            "No fue posible conectar.",
            "error"
        );

    }

});