type Produit = {
  id: string;
  code_colis: string;
  etat: string;
  type_produit: string;
  voie: string;
  nombre_produit: string;
  poids: string;
  prix: number;
  nom_client: string;
  prenom_client: string;
  tel_client: string;
  adress_client: string;
  email_client: string;
  nom_destinataire: string;
  prenom_destinataire: string;
  email_destinataire: string;
  tel_destinataire: string;
};

const infosProdBox = document.querySelector(
  ".foundedProdInfos"
) as HTMLDivElement;
const unfoundedCode = document.querySelector(".unfoundedCode") as HTMLElement;
const foundedProdClient = document.querySelector(
  ".foundedProd-client"
) as HTMLElement;
const foundedProdDestinataire = document.querySelector(
  ".foundedProd-destinataire"
) as HTMLElement;

const foundedProdNombre = document.querySelector(
  ".foundedProd-nombre"
) as HTMLElement;

const foundedProdPoids = document.querySelector(
  ".foundedProd-poids"
) as HTMLElement;

const foundedProdMontant = document.querySelector(
  ".foundedProd-montant"
) as HTMLElement;
const foundedProdVoie = document.querySelector(
  ".foundedProd-voie"
) as HTMLElement;
const foundedProdEtat = document.querySelector(
  ".foundedProd-etat"
) as HTMLElement;

async function isFoundedCode(code_colis: string): Promise<void> {
  try {
    const response = await fetch("http://localhost:3000/produits");
    if (!response) {
      throw new Error("Accès aux données impossible");
    }

    const produits: Produit[] = await response.json();
    const foundedProd = produits.filter(
      (prod) => prod.code_colis === code_colis
    );

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
    } else {
      infosProdBox.style.display = "none";
      unfoundedCode.style.display = "block";
    }
  } catch (error) {
    console.log("Error fetching", error);
  }
}

const searchProdForm = document.querySelector(
  ".searchProdForm"
) as HTMLFormElement;
searchProdForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchedCode = document.getElementById(
    "simple-search"
  ) as HTMLInputElement;
  isFoundedCode(searchedCode.value);
});
