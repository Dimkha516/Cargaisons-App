function generateRandomString(): string {
  const randomDigits = Math.floor(Math.random() * 100);
  const randomLetters =
    String.fromCharCode(97 + Math.floor(Math.random() * 26)) +
    String.fromCharCode(97 + Math.floor(Math.random() * 26));

  return `${randomDigits}-${randomLetters}`;
}

const randomCode = generateRandomString();

// POINTAGE DES VARIABLES DU FORMULAIRE:
const addCargForm = document.querySelector(".addCargaisonForm");
const cargPoids = document.getElementById("poidsCarg") as HTMLInputElement;
const cargType = document.querySelector(".cargaisonType") as HTMLSelectElement;
const cargStartZone = document.getElementById("depart") as HTMLInputElement;
const cargEndZone = document.getElementById("arrivee") as HTMLInputElement;
const cargDistance = document.getElementById(
  "cargDistance"
) as HTMLInputElement;

// POINTAGE DES MESSAGES D'ERREUR:
// const cargError = document.querySelector(".cargError") as HTMLElement;
const poidsError = document.querySelector(".poidsError") as HTMLElement;
const typeError = document.querySelector(".typeError") as HTMLElement;
const startZoneError = document.querySelector(".startZoneError") as HTMLElement;
const endZoneError = document.querySelector(".endZoneError") as HTMLElement;

// ETAT DES ERREURS:
let validPoids: boolean,
  validType: boolean,
  validStartZone,
  validEndZone: boolean;

//-------------------------------------------------AFFICHAGE CARD CARGAISONS AERIENNES
async function showAirCard() {
  const response = await fetch("http://localhost:3000/cargaisons");
  const data = await response.json();

  const airDatas = document.querySelector(".airDatas") as HTMLTableRowElement;
  const parent = airDatas.parentNode as HTMLTableSectionElement;

  data.forEach((item: any) => {
    const row = document.createElement("tr") as HTMLTableRowElement;
    if (item.type === "air") {
      row.innerHTML = `
      <td class="border border-green-600">${item.numero}</td> 
      <td class="border border-green-600">${item.poids} Kg</td>
      <td class="border border-green-600">${item.montant} Fr</td> 
      <td class="border border-green-600">${item.status}</td>
      <td class="border border-green-600">${item.progression}</td>
      <div>
      <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Modifier</button> 
      <input type="checkbox" />
      </div>
      `;
      parent.appendChild(row);
    }
  });
}

//---------------------------------------------------AFFICHAGE CARD CARGAISONS ROUTIERE
async function showRouteCard() {
  const response = await fetch("http://localhost:3000/cargaisons");
  const data = await response.json();

  const routeDatas = document.querySelector(
    ".routeDatas"
  ) as HTMLTableRowElement;
  const parent = routeDatas.parentNode as HTMLTableSectionElement;

  data.forEach((item: any) => {
    const row = document.createElement("tr") as HTMLTableRowElement;
    if (item.type === "terre") {
      row.innerHTML = `
      <td class="border border-green-600">${item.numero}</td> 
      <td class="border border-green-600">${item.poids} Kg</td>
      <td class="border border-green-600">${item.montant} Fr</td> 
      <td class="border border-green-600">${item.status}</td>
      <td class="border border-green-600">${item.progression}</td> 
      <div>
      <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Modifier</button> 
      <input type="checkbox" />
      </div>
      `;
      parent.appendChild(row);
    }
  });
}
//----------------------------------------------AFFICHAGE CARD CARGAISONS MARITIMES
async function showMerCard() {
  const response = await fetch("http://localhost:3000/cargaisons");
  const data = await response.json();

  const merDatas = document.querySelector(".merDatas") as HTMLTableRowElement;
  const parent = merDatas.parentNode as HTMLTableSectionElement;

  data.forEach((item: any) => {
    const row = document.createElement("tr") as HTMLTableRowElement;
    if (item.type === "mer") {
      row.innerHTML = `
      <td class="border border-green-600">${item.numero}</td> 
      <td class="border border-green-600">${item.poids} Kg</td>
      <td class="border border-green-600">${item.montant} Fr</td> 
      <td class="border border-green-600">${item.status}</td>
      <td class="border border-green-600">${item.progression}</td> 
      <div>
      <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Modifier</button> 
      <input type="checkbox" />
      </div>
      `;
      parent.appendChild(row);
    }
  });
}
showMerCard();
showRouteCard();
showAirCard();

//---------------------------------------------------FONCTION D'AJOUT NOUVELLE CARGAISON:
async function newCargaison(cargaison: any) {
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
  } else {
    poidsError.style.display = "none";
    poidsError.innerHTML = "";
    validPoids = true;
  }

  if (
    cargType.value !== "terre" &&
    cargType.value !== "mer" &&
    cargType.value !== "aire"
  ) {
    typeError.style.display = "block";
    typeError.innerHTML = "Vous devez définir le type de la cargaison !";
    validType = false;
  } else {
    typeError.style.display = "none";
    typeError.innerHTML = "";
    validType = true;
  }

  if (cargStartZone.value === "") {
    startZoneError.style.display = "block";
    startZoneError.innerHTML = "Zone de départ invalide";
    validStartZone = false;
  } else {
    startZoneError.style.display = "none";
    startZoneError.innerHTML = "";
    validStartZone = true;
  }

  if (cargEndZone.value === "") {
    endZoneError.style.display = "block";
    endZoneError.innerHTML = "Destination colis invalide";
    validEndZone = false;
  } else {
    endZoneError.style.display = "none";
    endZoneError.innerHTML = "";
    validEndZone = true;
  }

  if (validPoids && validType && validStartZone && validEndZone) {
    alert("Validée");

    const newCarg = {
      numero: randomCode,
      type: cargType.value,
      poids: cargPoids.value,
      colis: [{}],
      montant: 500000,
      lieu_depart: cargStartZone.value,
      destination: cargEndZone.value,
      progression: "En attente",
      status: "Ouvert",
    };
    try {
      const addedCargaison = newCargaison(newCarg);
      // showAllCargs();
      console.log(addedCargaison);
    } catch (error) {
      console.log("Error", error);
    }
  }
});

//--------------FONCTIONS D'AFFICHAGE DE TOUTES LES CARGAISONS AVEC FILTRE ET PAGINATION-------------------
async function fetchCargaisons(): Promise<any[]> {
  const response = await fetch("http://localhost:3000/cargaisons");
  return await response.json();
}

function renderCargaisons(cargaisons: any[]): void {
  const allCargs = document.querySelector(".allCargs") as HTMLTableRowElement;
  const parent = allCargs.parentNode as HTMLSelectElement;
  parent.innerHTML = "";

  cargaisons.forEach((item: any) => {
    const row = document.createElement("tr") as HTMLTableRowElement;
    row.innerHTML = `
    <th>${item.numero}</th> 
    <td>${item.type}</td>
    <td>${item.poids} Kg</td> 
    <td>${item.lieu_depart}</td>
    <td>${item.destination}</td>
    <td>${item.montant} Fr</td>
    <td>${item.colis.length}</td> 
    <div>
      <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Modifier</button> 
      <input type="checkbox" />
    </div>
    `;
    parent.appendChild(row);
  });
}

async function showAllCargs() {
  const cargaisons = await fetchCargaisons();
  renderCargaisons(cargaisons);
}

async function searchCargByNumber() {
  const searchInput = document.getElementById("default-search") as HTMLInputElement;
  const searchedValue = searchInput.value.trim();
  if(searchedValue === ""){
    showAllCargs();
    return;
  }
  
  const cargaisons = await fetchCargaisons();
  const filteredCagaisons = cargaisons.filter(item => item.numero.includes(searchedValue));
  renderCargaisons(filteredCagaisons);
}
 
document.getElementById("default-search")!.addEventListener("input", searchCargByNumber);
showAllCargs();
// async function showAllCargs() {
//   const response = await fetch("http://localhost:3000/cargaisons");
//   const data = await response.json();

//   const allCargs = document.querySelector(".allCargs") as HTMLTableRowElement;
//   const parent = allCargs.parentNode as HTMLTableSectionElement;

//   data.forEach((item: any) => {
//     const row = document.createElement("tr") as HTMLTableRowElement;
//       row.innerHTML = `
//       <th>${item.numero}</th>
//       <td>${item.type}</td>
//       <td>${item.poids} Kg</td>
//       <td>${item.lieu_depart}</td>
//       <td>${item.destination}</td>
//       <td>${item.montant} Fr</td>
//       <td>${item.colis.length}</td>
//       <div>
//       <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Modifier</button>
//       <input type="checkbox" />
//       </div>
//       `;
//       parent.appendChild(row);

//   });
// }

// showAllCargs();
