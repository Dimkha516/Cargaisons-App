// import * as jsonServer from "json-server";
// import { createProxyMiddleware } from "http-proxy-middleware";
// const server = jsonServer.create();
// const middlewares = jsonServer.defaults();
//module import 
function generateRandomString() {
    var randomDigits = Math.floor(Math.random() * 100);
    var randomLetters = String.fromCharCode(97 + Math.floor(Math.random() * 26)) +
        String.fromCharCode(97 + Math.floor(Math.random() * 26));
    return "".concat(randomDigits, "-").concat(randomLetters);
}
var randomCode = generateRandomString();
// POINTAGE DES VARIABLES DU FORMULAIRE:
var addCargForm = document.querySelector(".addCargaisonForm");
var cargPoids = document.getElementById("poidsCarg");
var cargType = document.querySelector(".cargaisonType");
var cargStartZone = document.getElementById("depart");
var cargEndZone = document.getElementById("arrivee");
var cargDistance = document.getElementById("cargDistance");
// POINTAGE DES MESSAGES D'ERREUR:
// const cargError = document.querySelector(".cargError") as HTMLElement;
var poidsError = document.querySelector(".poidsError");
var typeError = document.querySelector(".typeError");
var startZoneError = document.querySelector(".startZoneError");
var endZoneError = document.querySelector(".endZoneError");
// ETAT DES ERREURS:
var validPoids, validType, validStartZone, validEndZone;
addCargForm === null || addCargForm === void 0 ? void 0 : addCargForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (cargPoids.value === "") {
        poidsError.style.display = "block";
        poidsError.innerHTML = "Entrez le poids max de la cargaison !";
        validPoids = false;
    }
    else {
        poidsError.style.display = "none";
        poidsError.innerHTML = "";
        validPoids = true;
    }
    if (cargType.value !== "terre" &&
        cargType.value !== "mer" &&
        cargType.value !== "aire") {
        typeError.style.display = "block";
        typeError.innerHTML = "Vous devez définir le type de la cargaison !";
        validType = false;
    }
    else {
        typeError.style.display = "none";
        typeError.innerHTML = "";
        validType = true;
    }
    if (cargStartZone.value === "") {
        startZoneError.style.display = "block";
        startZoneError.innerHTML = "Zone de départ invalide";
        validStartZone = false;
    }
    else {
        startZoneError.style.display = "none";
        startZoneError.innerHTML = "";
        validStartZone = true;
    }
    if (cargEndZone.value === "") {
        endZoneError.style.display = "block";
        endZoneError.innerHTML = "Destination colis invalide";
        validEndZone = false;
    }
    else {
        endZoneError.style.display = "none";
        endZoneError.innerHTML = "";
        validEndZone = true;
    }
    if (validPoids && validType && validStartZone && validEndZone) {
        alert("Validée");
        var newCarg = {
            numero: randomCode,
            type: cargType.value,
            poids: cargPoids.value,
            colis: [{}],
            montant: 0,
            lieu_depart: cargStartZone.value,
            destination: cargEndZone.value,
            progression: "En attente",
            etat: "Ouvert",
        };
        console.log(newCarg);
    }
});
// server.use(
//   '/api',
//   createProxyMiddleware({
//     target: 'http://localhost/index.php',
//     changeOrigin: true,
//     pathRewrite:{
//       '^/api': '',
//     },
//   })
// )
// server.use(middlewares); 
// server.listen(3000, () => {
//   console.log("Running");
// })
console.log("skj");
