"use strict";
const infosProdBox = document.querySelector(".foundedProdInfos");
const unfoundedCode = document.querySelector(".unfoundedCode");
const foundedProdClient = document.querySelector(".foundedProd-client");
const foundedProdDestinataire = document.querySelector(".foundedProd-destinataire");
const foundedProdNombre = document.querySelector(".foundedProd-nombre");
const foundedProdPoids = document.querySelector(".foundedProd-poids");
const foundedProdMontant = document.querySelector(".foundedProd-montant");
const foundedProdVoie = document.querySelector(".foundedProd-voie");
const foundedProdEtat = document.querySelector(".foundedProd-etat");
async function isFoundedCode(code_colis) {
    try {
        const response = await fetch("http://localhost:3000/produits");
        if (!response) {
            throw new Error("Accès aux données impossible");
        }
        const produits = await response.json();
        const foundedProd = produits.filter((prod) => prod.code_colis === code_colis);
        if (foundedProd.length > 0) {
            infosProdBox.style.display = "block";
            unfoundedCode.style.display = "none";
            foundedProdClient.innerHTML = `
    Client: ${foundedProd[0].nom_client} ${foundedProd[0].prenom_client}
      `;
            foundedProdDestinataire.innerHTML = `
    Destinataire: ${foundedProd[0].nom_destinataire} ${foundedProd[0].prenom_destinataire}
      `;
            foundedProdNombre.innerHTML = `
        Nombre de produit(s): ${foundedProd[0].nombre_produit}
      `;
            foundedProdPoids.innerHTML = `
        Poids du colis: ${foundedProd[0].poids} KG
      `;
            foundedProdMontant.innerHTML = `
        Montant Coli(s): ${foundedProd[0].prix} Francs   
     `;
            foundedProdVoie.innerHTML = `
    Mode de transport: ${foundedProd[0].voie}
    `;
            foundedProdEtat.innerHTML = `
        Avancement: ${foundedProd[0].etat}
    `;
        }
        else {
            infosProdBox.style.display = "none";
            unfoundedCode.style.display = "block";
        }
    }
    catch (error) {
        console.log("Error fetching", error);
    }
}
const searchProdForm = document.querySelector(".searchProdForm");
searchProdForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchedCode = document.getElementById("simple-search");
    isFoundedCode(searchedCode.value);
});
