"use strict";
//-----------------------------------------AFFICHAGE COLIS PAR TYPESCRIPT AVEC PAGINATION START--------------------------
// RECUPÉRATION DES DONNÉES PRODUITS:
async function fetchProd() {
    const response = await fetch("http://localhost:3000/produits");
    return await response.json();
}
// RECUPÉRATION DES DONNÉES CARGAISONS:
async function fetchCargaisons() {
    const response = await fetch("http://localhost:3000/cargaisons");
    return await response.json();
}
//---------------FONCTION POUR METTRE A JOUR UNE MODIFICATION SUR LE FICHIER---------------
async function applyProdModif(produit) {
    try {
        const response = await fetch(`http://localhost:3000/produits/${produit.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produit),
        });
        if (!response.ok) {
            throw new Error("Error to update product");
        }
    }
    catch (error) {
        console.error("Error updating product:", error);
    }
}
//--------------------------------------------------------------------------------- 
//----------------------------------FONCTION POUR RECUPÉRER LA CARGAISON D'UN PRODUIT:
async function getProdInCarg(id) {
    try {
        const cargData = await fetchCargaisons();
        const prodData = await fetchProd();
        const selectedProd = prodData.find((prod) => prod.code_colis === id);
        if (selectedProd) {
            return selectedProd;
            // console.log(selectedProd);
        }
        else {
            console.log("produit non trouvé");
        }
    }
    catch (error) {
        console.log("Error:", error);
    }
}
const sendEmail = async (emailData) => {
    try {
        const response = await fetch('http://localhost:8089/Cargaisons-App/pages/sendEmail.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
};
//--------------------------------FONCTION POUR MODIFIER PRODUIT--------------------
const closeModal = document.querySelector(".closeModal");
closeModal.addEventListener("click", () => {
    location.reload();
});
async function updateProd(id) {
    const currentUpdatingProd = document.querySelector(".currentUpdatingProd");
    const productState = document.querySelector(".productState");
    const archiveProdBtn = document.querySelector(".archiveProdBtn");
    const annulerProdBtn = document.querySelector(".annulerProdBtn");
    const updateMessage = document.querySelector(".updateMessage");
    try {
        const prodData = await fetchProd();
        const prodToUpdate = prodData.filter((prod) => prod.id === id);
        if (prodData) {
            const mailClient = prodToUpdate[0].email_client;
            const mailDestinataire = prodToUpdate[0].email_destinataire;
            currentUpdatingProd.innerHTML += `Modification du colis: ${prodToUpdate[0].id}`;
            productState.addEventListener("change", async (e) => {
                const target = e.target;
                const selectedOption = target.value;
                if (prodToUpdate[0].etat === "attente") {
                    if (selectedOption === "retard") {
                        const emailData = {
                            clientEmail: `${mailClient}`,
                            destinataireEmail: `${mailDestinataire}`,
                            clientMessage: `Bonjour cher(e) client. Votre colis ${prodToUpdate[0].code_colis} aura un reatard de quelques heures. Merci de votre compréhension`,
                            recipientMessage: `Bonjour cher(e) destinataire. Votre colis ${prodToUpdate[0].code_colis} aura un reatard de quelques heures. Merci de votre compréhension`,
                        };
                        sendEmail(emailData);
                        updateMessage.textContent = "MAJ colis réussie. colis en retard. Mail envoyé au client";
                        prodToUpdate[0].etat = "retard";
                        await applyProdModif(prodToUpdate[0]);
                    }
                    //--------------------
                    if (selectedOption === "recupere") {
                        updateMessage.textContent = "Ce colis n'est pas encore chargé";
                    }
                    //------------------- 
                    if (selectedOption === "encours") {
                        const emailData = {
                            clientEmail: `${mailClient}`,
                            destinataireEmail: `${mailDestinataire}`,
                            clientMessage: `Bonjour cher(e) client. Nous vous informons que votre colis ${prodToUpdate[0].code_colis} destiné à ${prodToUpdate[0].email_destinataire} à été bien chargé et est en cours de transite.`,
                            recipientMessage: `Bonjour cher(e) destinataire. Votre colis ${prodToUpdate[0].code_colis} de la part de ${prodToUpdate[0].nom_client} est en cours de transite. Rendez vous sous peu pour le retrait. `,
                        };
                        sendEmail(emailData);
                        updateMessage.textContent = "MAJ colis réussie colis cours. Mail envoyé au client";
                        prodToUpdate[0].etat = "en cours";
                        await applyProdModif(prodToUpdate[0]);
                    }
                    if (selectedOption === "perdu") {
                        updateMessage.textContent = "Ce colis n'est pas encore chargé";
                    }
                }
                // 
                else if (prodToUpdate[0].etat === "retard") {
                    if (selectedOption === "encours") {
                        const emailData = {
                            clientEmail: `${mailClient}`,
                            destinataireEmail: `${mailDestinataire}`,
                            clientMessage: `Bonjour cher(e) client. Nous vous informons que votre colis ${prodToUpdate[0].code_colis} à été bien chargé et est en cours de transite.`,
                            recipientMessage: `Bonjour cher(e) destinataire. Votre colis ${prodToUpdate[0].code_colis} est en cours de transite. Rendez vous sous peu pour le retrait. `,
                        };
                        sendEmail(emailData);
                        updateMessage.textContent = "MAJ colis réussie colis cours . Mail envoyé au client";
                        prodToUpdate[0].etat = "en cours";
                        await applyProdModif(prodToUpdate[0]);
                    }
                    if (selectedOption === "recupere") {
                        const emailData = {
                            clientEmail: `${mailClient}`,
                            destinataireEmail: `${mailDestinataire}`,
                            clientMessage: `Bonjour cher(e) client. Nous vous informons que votre colis ${prodToUpdate[0].code_colis} à été bien recupéré par le destinataire. Merci de votre confiance et à bientôt`,
                            recipientMessage: `Bonjour cher(e) destinataire. Ce mail confirme votre retait du colis ${prodToUpdate[0].code_colis}. Merci et aurevoir`,
                        };
                        sendEmail(emailData);
                        updateMessage.textContent = "MAJ colis réussie colis recupéré . Mail envoyé au client";
                        prodToUpdate[0].etat = "recupere";
                        await applyProdModif(prodToUpdate[0]);
                    }
                    if (selectedOption === "perdu") {
                        const emailData = {
                            clientEmail: `${mailClient}`,
                            destinataireEmail: `${mailDestinataire}`,
                            clientMessage: `Bonjour cher(e) client. Nous sommes au regrès de vous informer de la perte de votre colis numéro ${prodToUpdate[0].code_colis}. Nous vous contacterons
              dans quelques heures pour les modalités de remboursement et de dédommagement. Encore nos sincères excuses pour cet incident indépendant de notre volonté`,
                            recipientMessage: `Bonjour cher(e) destinataire. Votre colis ${prodToUpdate[0].code_colis} ne pourra malheureusement pas arrivé à destination. Suite à un incident
              il a été perdu. Votre expéditeur sera remboursé au plus vite. Toutes nos sincères excuses.`,
                        };
                        sendEmail(emailData);
                        updateMessage.textContent = "MAJ colis réussie colis perdu. Mail envoyé au client";
                        prodToUpdate[0].etat = "perdu";
                        await applyProdModif(prodToUpdate[0]);
                    }
                }
                //
                else if (prodToUpdate[0].etat === "en cours") {
                    if (selectedOption === "recupere") {
                        const emailData = {
                            clientEmail: `${mailClient}`,
                            destinataireEmail: `${mailDestinataire}`,
                            clientMessage: `Bonjour cher(e) client. Nous vous informons que votre colis ${prodToUpdate[0].code_colis} à été bien recupéré par le destinataire. Merci de votre confiance et à bientôt`,
                            recipientMessage: `Bonjour cher(e) destinataire. Ce mail confirme votre retait du colis ${prodToUpdate[0].code_colis}. Merci et aurevoir`,
                        };
                        sendEmail(emailData);
                        updateMessage.textContent = "MAJ colis réussie colis recupéré . Mail envoyé au client";
                        prodToUpdate[0].etat = "recupere";
                        await applyProdModif(prodToUpdate[0]);
                    }
                    if (selectedOption === "perdu") {
                        const emailData = {
                            clientEmail: `${mailClient}`,
                            destinataireEmail: `${mailDestinataire}`,
                            clientMessage: `Bonjour cher(e) client. Nous sommes au regrès de vous informer de la perte de votre colis numéro ${prodToUpdate[0].code_colis}. Nous vous contacterons
              dans quelques heures pour les modalités de remboursement et de dédommagement. Encore nos sincères excuses pour cet incident indépendant de notre volonté`,
                            recipientMessage: `Bonjour cher(e) destinataire. Votre colis ${prodToUpdate[0].code_colis} ne pourra malheureusement pas arrivé à destination. Suite à un incident
              il a été perdu. Votre expéditeur sera remboursé au plus vite. Toutes nos sincères excuses.`,
                        };
                        sendEmail(emailData);
                        updateMessage.textContent = "MAJ colis réussie colis perdu. Mail envoyé au client";
                        prodToUpdate[0].etat = "perdu";
                        await applyProdModif(prodToUpdate[0]);
                    }
                    if (selectedOption === "retard") {
                        const emailData = {
                            clientEmail: `${mailClient}`,
                            destinataireEmail: `${mailDestinataire}`,
                            clientMessage: `Bonjour cher(e) client. Votre colis ${prodToUpdate[0].code_colis} aura un reatard de quelques heures. Merci de votre compréhension`,
                            recipientMessage: `Bonjour cher(e) destinataire. Votre colis ${prodToUpdate[0].code_colis} aura un reatard de quelques heures. Merci de votre compréhension`,
                        };
                        sendEmail(emailData);
                        updateMessage.textContent = "MAJ colis réussie colis en retard. Mail envoyé au client";
                        prodToUpdate[0].etat = "retard";
                        await applyProdModif(prodToUpdate[0]);
                    }
                }
                // 
            });
        }
    }
    catch (error) {
        console.log("Erreur/Produit introuvable", error);
    }
}
function getStatusColor2(etat) {
    switch (etat.toLowerCase()) {
        case "en cours":
            return "greenyellow";
        case "retard":
            return "red";
        case "attente":
            return "tomato";
        default:
            return "yellow";
    }
}
async function displayData() {
    const data = await fetchProd();
    const tbody = document.querySelector(".allCargs");
    tbody.innerHTML = "";
    const filteredData = data.filter((item) => (item.etat !== 'archive' && item.etat !== 'perdu' && item.etat !== 'recupere'));
    // data.forEach((item: any) => {
    filteredData.forEach((item) => {
        const statusColor = getStatusColor2(item.etat);
        const row = document.createElement("tr");
        row.innerHTML = `
            <th>${item.code_colis}</th>
            <th>${item.type_produit}</th>
            <th>${item.poids} KG</th>
            <th>${item.voie}</th>
            <th>${item.prix} Francs</th>
            <th>${item.nombre_produit}</th>
            <th style="color: ${statusColor};font-size:1.5rem">${item.etat}</th>
            <th>
                <button class='editProdBtn' id=${item.id}>Éditer</button>
                <input type='checkbox' id=${item.id} />
            </th>
        `;
        tbody.appendChild(row);
    });
    //-------------------------------EVENEMENT AU CLIQUE SUR UN BOUTON EDITER POUR UPDATE PRODUIT: 
    const editProdBtn = document.querySelectorAll(".editProdBtn");
    editProdBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const target = e.target;
            my_modal_3.showModal();
            updateProd(target.id);
            // console.log(target.id);
            // sendEmail(emailData);
        });
    });
}
displayData();
//-----------------------------------------AFFICHAGE COLIS PAR TYPESCRIPT AVEC PAGINATION FIN--------------------------
