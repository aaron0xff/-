// Array cu imaginile din folderul ../MEDIA
var images = [
    "../media/g1.jpg",
    "../media/g2.jpg",
    "../media/g3.jpg",
    "../media/g4.jpg"
];
// Obtinem elementul principal din DOM
var mainImage = document.getElementById("carousel-image");
// Verificam daca elementul exista
if (!mainImage)
    throw new Error("Elementul #carousel-image nu a fost găsit în DOM!");
var currentIndex = 0;
// Functie care schimba imaginea mare (cu animatie de zoom/fade pentru Step 12)
function showNextImage() {
    // Pornim animatia de micsorare/estompare inainte de schimbarea imaginii
    mainImage.style.transform = "scale(1.08)";
    mainImage.style.opacity = "0.3";
    setTimeout(function () {
        currentIndex = (currentIndex + 1) % images.length;
        mainImage.src = images[currentIndex];
        // Revenim lin la dimensiunea si opacitatea normala
        mainImage.style.transform = "scale(1)";
        mainImage.style.opacity = "1";
    }, 250);
}
// Slider automat la 3 secunde
setInterval(showNextImage, 3000);
// Step 12: Animatie suplimentara in TypeScript pentru titlul paginii (efect de plutire lina)
var galleryTitle = document.getElementById("gallery-title");
var angle = 0;
function animateTitle() {
    if (galleryTitle) {
        angle += 0.05;
        var offsetY = Math.sin(angle) * 6;
        galleryTitle.style.transform = "translateY(".concat(offsetY, "px)");
    }
    requestAnimationFrame(animateTitle);
}
animateTitle();
