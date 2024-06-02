"use strict";
//----------------------------------------------------CODE DE CODER.H :
//const map = L.map('map').setView([48.8566, 2.3522], 13); // Paris par défaut
const map = L.map("map").setView([51.505, -0.09], 8);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
}).addTo(map);
let startMarker, endMarker;
const startInput = document.getElementById("depart");
const endInput = document.getElementById("arrivee");
const distanceInput = document.getElementById("cargDistance");
map.on("click", function (e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    if (!startMarker || startInput.value === "") {
        // Effacer le marqueur de départ s'il existe
        if (startMarker) {
            map.removeLayer(startMarker);
        }
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
            const cityName = data.address.city ||
                data.address.town ||
                data.address.village ||
                data.address.country ||
                "Lieu inconnu";
            // startInput.value = cityName;
            console.log(cityName);
        })
            .catch((error) => {
            console.error(error);
            // startInput.value = "Erreur de géocodage";
        });
        startMarker = L.marker(e.latlng, { draggable: true })
            .addTo(map)
            .bindPopup("Lieu de Départ")
            .openPopup();
        startMarker.on("dragend", function () {
            getCityName(startMarker.getLatLng(), startInput);
            calculateDistance();
        });
    }
    else if (!endMarker || endInput.value === "") {
        // Effacer le marqueur d'arrivée s'il existe
        if (endMarker) {
            map.removeLayer(endMarker);
        }
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
            const cityName = data.address.city ||
                data.address.town ||
                data.address.village ||
                data.address.country ||
                "Lieu inconnu";
            // endInput.value = cityName;
        })
            .catch((error) => {
            console.error(error);
            endInput.value = "Coordonnées non trouvées";
        });
        endMarker = L.marker(e.latlng, { draggable: true })
            .addTo(map)
            .bindPopup("Lieu d'Arrivée")
            .openPopup();
        endMarker.on("dragend", function () {
            getCityName(endMarker.getLatLng(), endInput);
            calculateDistance();
        });
        calculateDistance();
    }
});
function calculateDistance() {
    if (startMarker && endMarker) {
        const startLatLng = startMarker.getLatLng();
        const endLatLng = endMarker.getLatLng();
        const distance = map.distance(startLatLng, endLatLng) / 1000; // distance en kilomètres
        distanceInput.value = distance.toFixed(2) + " km";
    }
    else {
        // distanceInput.value = '';
    }
}
function getCityName(latlng, inputElement) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
        const address = data.address;
        const cityName = address.city ||
            address.town ||
            address.village ||
            address.country ||
            "Lieu inconnu";
        inputElement.value = cityName;
    })
        .catch((error) => {
        console.error("Error:", error);
        inputElement.value = "Coordonnées non trouvées";
    });
}
//-----------------------------------------------------FONCTION POUR GÉNÉRER UN CODE ALEATOIRE
function generateRandomString() {
    const randomDigits = Math.floor(Math.random() * 100);
    const randomLetters = String.fromCharCode(97 + Math.floor(Math.random() * 26)) +
        String.fromCharCode(97 + Math.floor(Math.random() * 26));
    return `${randomDigits}-${randomLetters}`;
}
const randomCode = generateRandomString();
//************************************************************************************************/
//--------------------------------------------FONCTION POUR VÉRIFIER SI UNE VALEUR EST DE TYPE DATE:
function isDate(value) {
    return value instanceof Date && !isNaN(value.getTime());
}
//************************************************************************************************/
//--------------------------------------------FONCTION POUR CONVERTIR UN INPUT DATE EN DATE:
function convertToDate(dateString) {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
}
//************************************************************************************************/
//--------------------------------------FONCTION POUR COMPARER DEUX INPUT DATE DEJAS CONVERTIES EN DATE:
function compareDates(dateString1, dateString2) {
    const date1 = convertToDate(dateString1);
    const date2 = convertToDate(dateString2);
    if (date1 === null || date2 === null) {
        return null; // Une des dates est invalide
    }
    if (date1 < date2) {
        return -1; // date1 est antérieure à date2
    }
    else if (date1 > date2) {
        return 1; // date1 est postérieure à date2
    }
    else {
        return 0; // Les deux dates sont égales
    }
}
//**************************FONCTION POU VÉRIFIER SI UNE DATE EST ANTÉRIEURE A LA DATE DU JOUR: */
//------------------------------------------------------------------------------------------------
function isBeforeToday(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Réinitialise l'heure à 00:00:00 pour la comparaison
    return date < today;
}
//************************************************************************************************/
//************************************************************************************************/
// POINTAGE DES VARIABLES DU FORMULAIRE:*
const mapZone = document.getElementById("map");
const addCargForm = document.querySelector(".addCargaisonForm");
const cargPoids = document.getElementById("poidsCarg");
const cargType = document.querySelector(".cargaisonType");
//--------------------------------------------AFFICHER / MASQUER MAP:
// cargType.addEventListener("change", () => {
//   mapZone.style.display = "block";
// })
// ------------------------------------------------------------------------------
const cargStartZone = document.getElementById("depart");
const cargEndZone = document.getElementById("arrivee");
const cargDistance = document.getElementById("cargDistance"); //
const cargStartDate = document.getElementById("dateDepart");
const cargEndDate = document.getElementById("dateArrivee");
// POINTAGE DES MESSAGES D'ERREUR:
// const cargError = document.querySelector(".cargError") as HTMLElement;
const poidsError = document.querySelector(".poidsError");
const typeError = document.querySelector(".typeError");
const startZoneError = document.querySelector(".startZoneError");
const endZoneError = document.querySelector(".endZoneError");
const startDateError = document.querySelector(".startDateError");
const endDateError = document.querySelector(".endDateError");
const dateError = document.querySelector(".cargDateError");
// ETAT DES ERREURS:
let validPoids, validType, validStartZone, validEndZone, validStartDate, validEndDate, validDate, validActuelDate;
//-------------------------------------AJOUT NOUVELLE CARGAISON---------------------------------
// FONCITON DE CALCUL DU PRIX D'UN COLIS:
function productPrice(poid, cargaison) {
    if (cargaison === "terre") {
        poid = poid * 5000;
    }
    else if (cargaison === "mer") {
        poid = poid * 8000;
    }
    else {
        poid = poid * 10000;
    }
    if (poid > 10000) {
        return poid;
    }
    else {
        return 10000;
    }
}
async function newCargaison(cargaison) {
    const response = await fetch("http://localhost:3000/cargaisons", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cargaison),
    });
    if (!response.ok) {
        throw new Error("Failed to add cargaison");
    }
    const addedCargaison = await response.json();
    return addedCargaison;
}
addCargForm?.addEventListener("submit", (e) => {
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
    if (cargStartDate.value === "") {
        startDateError.style.display = "block";
        startDateError.innerHTML = "Date de départ non définie";
        validStartDate = false;
    }
    else {
        startDateError.style.display = "none";
        startDateError.innerHTML = "";
        validStartDate = true;
    }
    if (cargEndDate.value === "") {
        endDateError.style.display = "block";
        endDateError.innerHTML = "Date de d'arrivée non définie";
        validEndDate = false;
    }
    else {
        endDateError.style.display = "none";
        endDateError.innerHTML = "";
        validEndDate = true;
    }
    if (compareDates(cargStartDate.value, cargEndDate.value) === 1) {
        dateError.style.display = "block";
        dateError.innerHTML = "Date départ inférieure à date d'arrivée";
        validDate = false;
    }
    else if (compareDates(cargStartDate.value, cargEndDate.value) === -1) {
        dateError.style.display = "none";
        dateError.innerHTML = "";
        validDate = true;
    }
    if (isBeforeToday(convertToDate(cargStartDate.value))) {
        startDateError.style.display = "block";
        startDateError.innerHTML = "Cette date est dépassée!";
        validActuelDate = false;
    }
    else {
        startDateError.style.display = "none";
        startDateError.innerHTML = "";
        validActuelDate = true;
    }
    if (validPoids &&
        validType &&
        validStartZone &&
        validEndZone &&
        validStartDate &&
        validEndDate &&
        validDate &&
        validActuelDate) {
        // alert("Validée");
        const newCarg = {
            numero: randomCode,
            type: cargType.value,
            poids: cargPoids.value,
            colis: [{}],
            montant: 500000,
            lieu_depart: cargStartZone.value,
            destination: cargEndZone.value,
            depart: cargStartDate.value,
            arrivee: cargEndDate.value,
            progression: "En attente",
            status: "Ouvert",
        };
        try {
            const addedCargaison = newCargaison(newCarg);
            console.log(addedCargaison);
            addCargForm.reset();
        }
        catch (error) {
            console.log("Error", error);
        }
    }
});
//------------------------------------FONCTIONS D'AFFICHAGE DE TOUTES LES CARGAISONS AVEC FILTRE ET PAGINATION-------------------
let currentPage = 1;
const itemsPerPage = 3;
// async function fetchCargaisons(): Promise<any[]> {
//   const response = await fetch("http://localhost:3000/cargaisons");
//   return await response.json();
// }
function getStatusColor(status) {
    switch (status.toLowerCase()) {
        case "ferme":
            return "red";
        case "ouvert":
            return "green";
        default:
            return "yellow";
    }
}
async function fetchData() {
    const response = await fetch("http://localhost:3000/cargaisons");
    return await response.json();
}
function filterData(data, searchTerm) {
    // const lowerCaseSearchTerm = searchTerm.toLocaleLowerCase();
    // const lowerCaseSearchTerm = searchTerm.toLocaleLowerCase();
    const searchTerms = searchTerm
        .toLocaleLowerCase()
        .split(",")
        .map((term) => term.trim());
    return data.filter((item) => {
        const numero = item.numero?.toString().toLocaleLowerCase() || "";
        const type = item.type?.toString().toLocaleLowerCase() || "";
        const lieu_depart = item.lieu_depart?.toString().toLocaleLowerCase() || "";
        const destination = item.destination?.toString().toLocaleLowerCase() || "";
        return searchTerms.some((term) => numero.includes(term) ||
            type.includes(term) ||
            lieu_depart.includes(term) ||
            destination.includes(term));
        // return (
        //   numero.includes(lowerCaseSearchTerm) ||
        //   type.includes(lowerCaseSearchTerm) ||
        //   lieu_depart.includes(lowerCaseSearchTerm) ||
        //   destination.includes(lowerCaseSearchTerm)
        // );
    });
}
function renderData(data) {
    const allCargs = document.querySelector(".allCargs");
    allCargs.innerHTML = "";
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginateData = data.slice(startIndex, endIndex);
    paginateData.forEach((item) => {
        const row = document.createElement("tr");
        const statusColor = getStatusColor(item.status);
        row.innerHTML = `
      <th class="text-base">${item.numero}</th>
      <td class="text-base">${item.type}</td>
      <td class="text-base">${item.poids} Kg</td>
      <td class="text-base">${item.lieu_depart}</td>
      <td class="text-base">${item.destination}</td>
      <td class="text-base">${item.montant} Fr</td>
      <td class="text-base">${item.colis.length}</td>
      <td class="text-base" style="color: ${statusColor}; cursor:pointer">${item.status}</td>
      <td class="text-base">${item.progression}</td>
      <td class="text-base">
        <button id="${item.id}" class="modifBtn focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Détails</button>
        <input type="checkbox" id='${item.id}' class="modifCheck" /> 
      </td>
      `;
        allCargs?.appendChild(row);
        // Select the status cell
        const statusCell = row.querySelector("td:nth-child(8)");
        // Add click event listener to the status cell
        statusCell.addEventListener("click", () => {
            if (statusCell.textContent === "Ferme") {
                statusCell.textContent = "Ouvert";
                statusCell.style.color = getStatusColor("Ouvert");
            }
            else if (statusCell.textContent === "Ouvert") {
                statusCell.textContent = "Ferme";
                statusCell.style.color = getStatusColor("Ferme");
            }
        });
    });
    renderPagination(data.length);
}
function renderPagination(totalItems) {
    const pagination = document.querySelector(".paginationDiv");
    pagination.innerHTML = "";
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i.toString();
        button.classList.add("pagination-button");
        if (i === currentPage) {
            button.classList.add("active");
        }
        button.addEventListener("click", () => {
            currentPage = i;
            showAllCargs(document.getElementById("default-search").value);
        });
        pagination.appendChild(button);
    }
}
async function showAllCargs(searchTerm = "") {
    const data = await fetchData();
    const filteredData = filterData(data, searchTerm);
    renderData(filteredData);
}
document
    .getElementById("default-search")
    ?.addEventListener("input", (event) => {
    const searchTerm = event.target.value;
    showAllCargs(searchTerm);
});
showAllCargs();
//---------------------------------------------------AJOUT NOUVEAU PRODUIT DANS TABLEAU PRODUITS--------------------------------:
async function newProduit(produit) {
    const response = await fetch("http://localhost:3000/produits", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(produit),
    });
    if (!response.ok) {
        throw new Error("Failed to add product");
    }
    const addedProduct = await response.json();
    return addedProduct;
}
//-----------------POINTAGE DES ÉLÉMENTS DU FORMULAIRE:
const addProdForm = document.querySelector(".addProdForm");
const nomClient = document.querySelector(".nomClient");
const prenomClient = document.querySelector(".prenomClient");
const phoneClient = document.querySelector(".phoneClient");
const emailClient = document.querySelector(".emailClient");
const adressClient = document.querySelector(".adressClient");
const nomDestinataire = document.querySelector(".nomDestinataire");
const prenomDestinataire = document.querySelector(".prenomDestinataire");
const telDestinataire = document.querySelector(".telDestinataire");
const emailDestinataire = document.querySelector(".emailDestinataire");
const nombreColis = document.querySelector(".nombreColis");
const poidsProduit = document.querySelector(".poidsProduit");
const cargaisonProduit = document.querySelector(".cargaisonProduit");
const typeProduit = document.querySelector(".typeProduit");
const prodPrice = document.querySelector(".prodPrice");
const addCargBtn = document.getElementById("addCargBtn");
const chooseCargBtn = document.getElementById("chooseCargBtn");
//-----------------POINTAGE DES CHAMPS D'ERREURS:
const nomClientError = document.querySelector(".nomClientError");
const prenomClientError = document.querySelector(".prenomClientError");
const phoneClientError = document.querySelector(".phoneClientError");
const emailClientError = document.querySelector(".emailClientError");
const adressClientError = document.querySelector(".adressClientError");
const nomDestinataireError = document.querySelector(".nomDestinataireError");
const prenomDestinataireError = document.querySelector(".prenomDestinataireError");
const telDestinataireError = document.querySelector(".telDestinataireError");
const emailDestinataireError = document.querySelector(".emailDestinataireError");
const nombreColisError = document.querySelector(".nombreColisError");
const poidsProduitError = document.querySelector(".poidsProduitError");
const cargaisonProduitError = document.querySelector(".cargaisonProduitError");
const typeProduitError = document.querySelector(".typeProduitError");
const correpondError = document.querySelector(".correspondError");
//--------------------BOOLEAN DE VALIDITE:
let validnomClient;
let validprenomClient;
let validphoneClient;
// let validemailClient: boolean;
let validadressClient;
let validnomDestinataire;
let validprenomDestinataire;
let validtelDestinataire;
let validemailDestinataire;
let validnombreColis;
let validpoidsProduit;
let validcargaisonProduit;
let validTypeProduit;
let validCorrespond;
//-----------------------FONCITON QUI VÉRIFIE SI UN CHAMP EST VIDE:
function isEmpty(val) {
    // Trim the string to remove any leading or trailing whitespace
    const trimmedStr = val.trim();
    // Check if the trimmed string length is zero
    return trimmedStr === "";
}
//-----FONCTION QUI VÉRIFIE SI UN NUMÉRO COMMENCE PAR 77,78,76,70 OU 33 SUIVI DE 7 chiffres:
function isValidNumber(number) {
    const pattern = /^(77|78|76|70|33)\d{7}$/;
    const convertNumber = number.toString().trim();
    return pattern.test(convertNumber);
}
//------FONCTION DE VALIDATION  D'EMAIL:
function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}
async function fetchItems() {
    try {
        const response = await fetch("http://localhost:3000/cargaisons");
        if (!response.ok) {
            throw new Error("Error to get response");
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error fetching items:", error);
        return [];
    }
}
function createCard(item) {
    const card = document.createElement("div");
    card.className = "card";
    const numero = document.createElement("p");
    const type = document.createElement("p");
    const depart = document.createElement("p");
    const arrivee = document.createElement("p");
    const destination = document.createElement("p");
    numero.textContent = `Numéro:  ${item.numero}`;
    type.textContent = `Cargaison:  ${item.type}`;
    depart.textContent = `Date départ:  ${item.depart}`;
    arrivee.textContent = `Date arrivée:  ${item.arrivee}`;
    destination.textContent = `Destination:  ${item.destination}`;
    card.appendChild(numero);
    card.appendChild(type);
    card.appendChild(depart);
    card.appendChild(arrivee);
    card.appendChild(destination);
    return card;
}
//-------------------FONCTION QUI AJOUTE UN PRODUIT DANS UNE CARGAISON:
async function fetchItems2() {
    try {
        const response = await fetch("http://localhost:3000/cargaisons");
        if (!response.ok) {
            throw new Error("Error fetching cargaisons");
        }
        return await response.json();
    }
    catch (error) {
        console.error("Error fetching cargaisons:", error);
        return [];
    }
}
async function updateCargaisons(cargaison) {
    try {
        const response = await fetch(`http://localhost:3000/cargaisons/${cargaison.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cargaison),
        });
        if (!response.ok) {
            throw new Error("Error to update cargaisons");
        }
    }
    catch (error) {
        console.error("Error updating cargaisons:", error);
    }
}
async function addColis(numero, nouveauColis) {
    try {
        const cargaisons = await fetchItems2();
        const correspondCarg = cargaisons.find((cargaison) => cargaison.numero === numero);
        if (correspondCarg) {
            correspondCarg.colis.push(nouveauColis);
            await updateCargaisons(correspondCarg);
        }
        else {
            console.log("Cargaison non trouvée");
        }
    }
    catch (error) {
        console.error("Error adding colis:", error);
    }
}
const newColis = {
    design: "tomate",
    prix: 200,
};
// addColis("3-ui", newColis)
// async function addColis(numero:string, nouveauColis:any){
//   const cargaisons = await fetchItems();
//   const correspondCarg = cargaisons.find(cargaison => cargaison.numero === numero);
//   if(correspondCarg){
//     correspondCarg.colis.push(nouveauColis)
//     console.log(correspondCarg);
//   } else{
//     console.log("Cargaison non trouvée");
//   }
// }
//-----------------------------------------------------FOMULAIRE D'ENREGISTREMENT PRODUIT-------------------------
addProdForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //----------------------TEST DE VALIDATION DONNÉES:
    //----------------- NOM CLIENT:
    if (isEmpty(nomClient.value)) {
        nomClientError.style.display = "block";
        nomClientError.innerHTML = "Entrez le nom du client";
        validnomClient = false;
    }
    else {
        console.log("Non client Ok");
        nomClientError.style.display = "none";
        nomClientError.innerHTML = "";
        validnomClient = true;
    }
    //-----------------PRÉNOM CLIENT:
    if (isEmpty(prenomClient.value)) {
        prenomClientError.style.display = "block";
        prenomClientError.innerHTML = "Entrez le prénom du client";
        validprenomClient = false;
    }
    else {
        prenomClientError.style.display = "none";
        prenomClientError.innerHTML = "";
        validprenomClient = true;
    }
    //----------------TÉLÉPHONE CLIENT:
    if (!isValidNumber(phoneClient.value)) {
        phoneClientError.style.display = "block";
        phoneClientError.textContent =
            "Entrez un opérateur valide suivi de 7 chiffres";
        validphoneClient = false;
    }
    else {
        phoneClientError.style.display = "none";
        phoneClientError.textContent = "";
        validphoneClient = true;
    }
    // ----------------EMAIL CLIENT:
    if (!isValidEmail(emailClient.value)) {
        emailClientError.style.display = "block";
        emailClientError.textContent =
            "Attention! ceci n'est pas un email(champ facultatif)";
        // validemailClient = false;
    }
    else {
        emailClientError.style.display = "none";
        emailClientError.textContent = "";
        // validemailClient = true;
    }
    //----------------ADRESS CLIENT:
    if (isEmpty(adressClient.value)) {
        adressClientError.style.display = "block";
        adressClientError.innerHTML = "Entrez l'adresse du client!";
        validadressClient = false;
    }
    else {
        adressClientError.style.display = "nobe";
        adressClientError.innerHTML = "";
        validadressClient = true;
    }
    //----------------NOM DESTINATAIRE:
    if (isEmpty(nomDestinataire.value)) {
        nomDestinataireError.style.display = "block";
        nomDestinataireError.innerHTML = "Entrez le nom du destinataire";
        validnomDestinataire = false;
    }
    else {
        nomDestinataireError.style.display = "none";
        nomDestinataireError.innerHTML = "";
        validnomDestinataire = true;
    }
    //----------------PRÉNOM DESTINATAIRE:
    if (isEmpty(prenomDestinataire.value)) {
        prenomDestinataireError.style.display = "block";
        prenomDestinataireError.innerHTML = "Entrez le prénom du destinataire";
        validprenomDestinataire = false;
    }
    else {
        prenomDestinataireError.style.display = "none";
        prenomDestinataireError.innerHTML = "";
        validprenomDestinataire = true;
    }
    //----------------TÉLÉPHONE DESTINATAIRE:
    if (!isValidNumber(telDestinataire.value)) {
        telDestinataireError.style.display = "block";
        telDestinataireError.textContent =
            "Entrez un opérateur valide suivi de 7 chiffres";
        validtelDestinataire = false;
    }
    else {
        telDestinataireError.style.display = "none";
        telDestinataireError.textContent = "";
        validtelDestinataire = true;
    }
    //----------------EMAIL DESTINATAIRE:
    if (!isValidEmail(emailDestinataire.value)) {
        emailDestinataireError.style.display = "block";
        emailDestinataireError.textContent = "Email invalide";
        validemailDestinataire = false;
    }
    else {
        emailDestinataireError.style.display = "";
        emailDestinataireError.textContent = "";
        validemailDestinataire = true;
    }
    //----------------NOMBRE DE COLIS:
    if (isEmpty(nombreColis.value)) {
        nombreColisError.style.display = "block";
        nombreColisError.textContent = "Entrez le nombre de produits";
        validnombreColis = false;
    }
    else {
        nombreColisError.style.display = "none";
        nombreColisError.textContent = "";
        validnombreColis = true;
    }
    //---------------POIDS COLIS:
    if (isEmpty(poidsProduit.value)) {
        poidsProduitError.style.display = "block";
        poidsProduitError.textContent = "Entrez le poids du colis";
        validpoidsProduit = false;
    }
    else {
        poidsProduitError.style.display = "none";
        poidsProduitError.textContent = "";
        validpoidsProduit = true;
    }
    //---------------TYPE DE CARAGAISON:
    if (cargaisonProduit.value !== "terre" &&
        cargaisonProduit.value !== "mer" &&
        cargaisonProduit.value !== "aire") {
        cargaisonProduitError.style.display = "block";
        cargaisonProduitError.textContent = "Type de cargaison invalide !";
        validcargaisonProduit = false;
    }
    else {
        cargaisonProduitError.style.display = "none";
        cargaisonProduitError.textContent = "";
        validcargaisonProduit = true;
    }
    //---------------TYPE DE PRODUITS:
    if (typeProduit.value !== "alimentaire" &&
        typeProduit.value !== "chimic" &&
        typeProduit.value !== "cassable" &&
        typeProduit.value !== "incassable") {
        typeProduitError.style.display = "block";
        typeProduitError.textContent = "Type de produit invalide!";
        validTypeProduit = false;
    }
    else {
        typeProduitError.style.display = "none";
        typeProduitError.textContent = "";
        validTypeProduit = true;
    }
    //--------------CORRESPONDANCE PRODUIT-CARGAISON:
    if (cargaisonProduit.value !== "mer" && typeProduit.value === "chimic") {
        correpondError.style.display = "block";
        correpondError.textContent =
            "un porduit chimic doit transiter par voie maritime";
        validCorrespond = false;
    }
    else if (typeProduit.value === "cassable" &&
        cargaisonProduit.value === "mer") {
        correpondError.style.display = "block";
        correpondError.textContent =
            "un produit cassable ne peut transiter par voie maritime";
        validCorrespond = false;
    }
    else {
        correpondError.style.display = "none";
        correpondError.textContent = "";
        validCorrespond = true;
    }
    if (validTypeProduit && validcargaisonProduit) {
        const price = productPrice(poidsProduit.value, cargaisonProduit.value);
        prodPrice.value = `${price.toString()} Fr`;
    }
    if (validnomClient &&
        validprenomClient &&
        // validphoneClient &&
        validadressClient &&
        validnomDestinataire &&
        validprenomDestinataire &&
        // validtelDestinataire &&
        validemailDestinataire &&
        validnombreColis &&
        validpoidsProduit &&
        validcargaisonProduit &&
        validTypeProduit &&
        validCorrespond) {
        const product = {
            code_colis: randomCode,
            etat: "attente",
            type_produit: typeProduit.value,
            voie: cargaisonProduit.value,
            nombre_produit: nombreColis.value,
            poids: poidsProduit.value,
            prix: productPrice(poidsProduit.value, cargaisonProduit.value),
            nom_client: nomClient.value,
            prenom_client: prenomClient.value,
            tel_client: phoneClient.value,
            adress_client: adressClient.value,
            email_client: emailClient.value,
            email_destinataire: emailDestinataire.value,
            tel_destinataire: telDestinataire.value,
        };
        // const addedProduct = newProduit(product);
        // console.log(addedProduct);
        chooseCargBtn.style.display = "block";
        let comapreType = cargaisonProduit.value;
        async function displayItems() {
            const items = await fetchItems();
            const filteredCarg = items.filter((item) => item.type === comapreType);
            const container = document.getElementById("container");
            if (container) {
                // items.forEach((item) => {
                filteredCarg.forEach((item) => {
                    const card = createCard(item);
                    container.appendChild(card);
                    card.innerHTML += `
            <button id=${item.numero} class="btnCarg">Sélect</button>
          `;
                });
            }
            const btnCarg = document.querySelectorAll(".btnCarg");
            btnCarg.forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    const target = e.target;
                    console.log(target.id);
                    addColis(target.id, product);
                    try {
                        const addedProduct = newProduit(product);
                        console.log(addedProduct);
                    }
                    catch (error) {
                        console.log("Error", error);
                    }
                    addProdForm.reset();
                });
            });
        }
        displayItems();
    }
    //
    else {
        console.log("Des champs nom validés");
    }
});
