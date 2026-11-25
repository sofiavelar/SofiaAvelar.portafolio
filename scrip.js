const pages = Array.from(document.querySelectorAll(".page"));

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentPage = 0;

// Ir a una pantalla específica
function goToPage(index) {

    if (index < 0 || index >= pages.length) return;

    currentPage = index;

    pages[index].scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Siguiente pantalla
nextBtn.addEventListener("click", () => {
    goToPage(currentPage + 1);
});

// Pantalla anterior
prevBtn.addEventListener("click", () => {
    goToPage(currentPage - 1);
});

// Detectar qué pantalla está visible
const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {

            currentPage = pages.indexOf(entry.target);

            // Mostrar u ocultar flechas según la posición
            prevBtn.style.opacity = currentPage === 0 ? "0.4" : "1";

            nextBtn.style.opacity =
                currentPage === pages.length - 1 ? "0.4" : "1";
        }

    });

}, {
    threshold: 0.5
});

pages.forEach(page => observer.observe(page));

// Navegación con flechas del teclado
document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowDown") {
        goToPage(currentPage + 1);
    }

    if (event.key === "ArrowUp") {
        goToPage(currentPage - 1);
    }

});

// Navegación del menú
document.querySelectorAll(".navbar nav a, .logo").forEach(link => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || !targetId.startsWith("#")) return;

        const targetPage = document.querySelector(targetId);

        if (targetPage) {
            event.preventDefault();
            goToPage(pages.indexOf(targetPage));
            history.replaceState(null, "", targetId);
        }

    });

});