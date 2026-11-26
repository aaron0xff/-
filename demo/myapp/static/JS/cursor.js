// Creeaza un element div care va fi cursorul personalizat 
var cursor = document.createElement("div");
// Seteaza un ID pentru acest element ca sa putem aplica stiluri CSS usor cursor.id = "cursor"; 
// Adauga elementul creat in corpul documentului, astfel incat sa fie vizibil pe pagina 
document.body.appendChild(cursor);
cursor.id = "cursor";
// Este nevoie sa initializezi variabila pentru nuanta culorii la 0 
// Asculta evenimentul de miscare a mouse-ului pe intreaga pagina 
document.addEventListener("mousemove", function (e) {
    cursor.style.left = "".concat(e.clientX, "px"); // coordonata X 
    cursor.style.top = "".concat(e.clientY, "px"); // coordonata Y 
});
// Functie care schimba culoarea cursorului ciclic pentru efect curcubeu function animateColor() { 
var hue = 0;
function animateColor() {
    // Este nevoie sa cresti nuanta cu 1 si sa nu uiti sa o mentinem intre 0 si 359
    hue = (hue + 1) % 360;
    // Seteaza culoarea de fundal a cursorului folosind HSL (Hue, Saturation, Lightness)
    cursor.style.backgroundColor = "hsl(".concat(hue, ", 100%, 50%)");
    // Adauga un efect de glow (umbra) la cursor cu aceeasi culoare
    cursor.style.boxShadow = "0 0 15px hsl(".concat(hue, ", 100%, 50%)");
    // Reapeleaza functia la urmatorul frame pentru animatie continua
    requestAnimationFrame(animateColor);
}
// Este nevoie sa pornesti animatia de schimbare a culorii
animateColor();
