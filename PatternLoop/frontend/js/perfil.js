document.addEventListener("DOMContentLoaded", () => {

    const btnPatrones = document.getElementById("btnPatrones");
    const btnFavoritos = document.getElementById("btnFavoritos");
    const grid = document.getElementById("patternsGrid");

    const patronesHTML = `
        <article class="pattern-card">
            <div class="card-image">
                <img src="https://via.placeholder.com/450x300"
                    alt="Suéter Nube de Otoño">

                <span class="badge">Intermedio</span>
            </div>

            <div class="card-body">
                <div class="title-row">
                    <h2>Suéter Nube de Otoño</h2>

                    <div class="card-actions">
                        <button>
                            <i class="fa-solid fa-pen"></i>
                        </button>

                        <button class="delete">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </div>

                <p class="meta">
                    Lana Alpaca Soft · 12/10/2023
                </p>

                <div class="stats-row">
                    <span>♡ 128</span>
                    <span>💬 45</span>
                    <span>👁 890</span>
                </div>
            </div>
        </article>
    `;

    const favoritosHTML = `
        <article class="pattern-card">
            <div class="card-image">
                <img src="https://via.placeholder.com/450x300/ffb6c1/ffffff"
                    alt="Bufanda Rosa Invernal">

                <span class="badge">Principiante</span>
            </div>

            <div class="card-body">
                <div class="title-row">
                    <h2>Bufanda Rosa Invernal</h2>

                    <div class="card-actions">
                        <button>
                            <i class="fa-solid fa-heart"></i>
                        </button>
                    </div>
                </div>

                <p class="meta">
                    Hilo Cotton Dream · 15/01/2024
                </p>

                <div class="stats-row">
                    <span>♡ 320</span>
                    <span>💬 88</span>
                    <span>👁 1500</span>
                </div>
            </div>
        </article>
    `;

    btnFavoritos.addEventListener("click", () => {
        btnFavoritos.classList.add("active");
        btnPatrones.classList.remove("active");

        grid.innerHTML = favoritosHTML;
    });

    btnPatrones.addEventListener("click", () => {
        btnPatrones.classList.add("active");
        btnFavoritos.classList.remove("active");

        grid.innerHTML = patronesHTML;
    });

});