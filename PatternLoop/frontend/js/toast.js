function mostrarToast(titulo, mensaje, tipo = "success"){

    let contenedor = document.querySelector(".toast-container");

    if(!contenedor){

        contenedor = document.createElement("div");

        contenedor.className = "toast-container";

        contenedor.style.zIndex = "999999";

        contenedor.style.pointerEvents = "none";

        document.body.appendChild(contenedor);

    }

    const toast = document.createElement("div");

    toast.className = `toast ${tipo}`;

    toast.innerHTML = `

        <i class="fa-solid ${
            tipo==="success"
            ? "fa-circle-check"
            : "fa-circle-xmark"
        }"></i>

        <div>

            <h4>${titulo}</h4>

            <p>${mensaje}</p>

        </div>

    `;

    contenedor.appendChild(toast);

    setTimeout(()=>{

        toast.style.pointerEvents = "auto";

        toast.classList.add("hide");

        setTimeout(()=>{

            toast.remove();

        },350);

    },3000);

}

window.mostrarToast = mostrarToast;