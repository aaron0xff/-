let loginForm = document.getElementById("..."); 
let emailInput = document.getElementById("..."); 
let passwordInput = document.getElementById("..."); 
loginForm.addEventListener("submit", function(e) { 
e.preventDefault(); 
const email = emailInput.value.trim(); 
const password = passwordInput.value; 
const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+(\d{2})?@e-uvt\.ro$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$/;
if (!emailRegex.test(email)) { 
alert("Email invalid!"); 
return; 
} 
if (!passwordRegex.test(password)) { 
alert("Parola invalidă!"); 
return; 
}
alert("Login reușit!"); 
window.location.href = "..."; 
}); 
