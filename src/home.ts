//-----------------------------------------------------FONCTION POUR GÉNÉRER UN CODE ALEATOIRE
function generateRandomString(): string {
  const randomDigits = Math.floor(Math.random() * 100);
  const randomLetters =
    String.fromCharCode(97 + Math.floor(Math.random() * 26)) +
    String.fromCharCode(97 + Math.floor(Math.random() * 26));

  return `${randomDigits}-${randomLetters}`;
}
const randomCode = generateRandomString();
//************************************************************************************************/ 


//--------------------------------------------FONCTION POUR VÉRIFIER SI UNE VALEUR EST DE TYPE DATE:
function isDate(value: any): boolean {
  return value instanceof Date && !isNaN(value.getTime());
}
//************************************************************************************************/


//--------------------------------------------FONCTION POUR CONVERTIR UN INPUT DATE EN DATE:
function convertToDate(dateString: string): Date | null {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}
//************************************************************************************************/



//--------------------------------------FONCTION POUR COMPARER DEUX INPUT DATE DEJAS CONVERTIES EN DATE:
function compareDates(dateString1: string, dateString2: string): number | null {
  const date1 = convertToDate(dateString1);
  const date2 = convertToDate(dateString2);

  if (date1 === null || date2 === null) {
      return null; // Une des dates est invalide
  }

  if (date1 < date2) {
      return -1; // date1 est antérieure à date2
  } else if (date1 > date2) {
      return 1; // date1 est postérieure à date2
  } else {
      return 0; // Les deux dates sont égales
  }
}
//************************************************************************************************/


// POINTAGE DES VARIABLES DU FORMULAIRE:
const addCargForm = document.querySelector(".addCargaisonForm");
const cargPoids = document.getElementById("poidsCarg") as HTMLInputElement;
const cargType = document.querySelector(".cargaisonType") as HTMLSelectElement;
const cargStartZone = document.getElementById("depart") as HTMLInputElement;
const cargEndZone = document.getElementById("arrivee") as HTMLInputElement;
const cargDistance = document.getElementById("cargDistance") as HTMLInputElement; //
const cargStartDate = document.getElementById("dateDepart") as HTMLInputElement;
const cargEndDate = document.getElementById("dateArrivee") as HTMLInputElement;

// POINTAGE DES MESSAGES D'ERREUR:
// const cargError = document.querySelector(".cargError") as HTMLElement;
const poidsError = document.querySelector(".poidsError") as HTMLElement;
const typeError = document.querySelector(".typeError") as HTMLElement;
const startZoneError = document.querySelector(".startZoneError") as HTMLElement;
const endZoneError = document.querySelector(".endZoneError") as HTMLElement;
const startDateError = document.querySelector(".startDateError") as HTMLElement;
const endDateError = document.querySelector(".endDateError") as HTMLElement;
const dateError = document.querySelector(".cargDateError") as HTMLElement;

// ETAT DES ERREURS:
let validPoids: boolean,
  validType: boolean,
  validStartZone,
  validEndZone: boolean,
  validStartDate:boolean,
  validEndDate:boolean,
  validDate:boolean;

//-------------------------------------------------AFFICHAGE CARD CARGAISONS AERIENNES
async function showAirCard() {
  const response = await fetch("http://localhost:3000/cargaisons");
  const data = await response.json();

  const airDatas = document.querySelector(".airDatas") as HTMLTableRowElement;
  const parent = airDatas.parentNode as HTMLTableSectionElement;

  data.forEach((item: any) => {
    const row = document.createElement("tr") as HTMLTableRowElement;
    if (item.type === "aire") {
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
showRouteCard();
showAirCard();
showMerCard();

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

  if(cargStartDate.value === ""){
    startDateError.style.display = "block";
    startDateError.innerHTML = "Date de départ non définie";
    validStartDate = false;
  } else{
    startDateError.style.display = "none";
    startDateError.innerHTML = "";
    validStartDate = true;
  }

  if(cargEndDate.value === ""){
    endDateError.style.display = "block";
    endDateError.innerHTML = "Date de d'arrivée non définie";
    validEndDate = false;
  } else{
    endDateError.style.display = "none";
    endDateError.innerHTML = "";
    validEndDate = true;
  }

  if(compareDates(cargStartDate.value, cargEndDate.value)===1){
    dateError.style.display = "block";
    dateError.innerHTML = "Date départ inférieure à date d'arrivée";
    validDate = false;
  }
  else if(compareDates(cargStartDate.value, cargEndDate.value)=== -1){
    dateError.style.display = "none";
    dateError.innerHTML = "";
    validDate = true;
  }


  if (validPoids && validType && validStartZone && validEndZone && validStartDate && validEndDate && validDate) {
    alert("Validée");
    

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
    } catch (error) {
      console.log("Error", error);
    }
  }
});

//--------------FONCTIONS D'AFFICHAGE DE TOUTES LES CARGAISONS AVEC FILTRE ET PAGINATION-------------------
let currentPage = 1;
const itemsPerPage = 3;
async function fetchCargaisons(): Promise<any[]> {
  const response = await fetch("http://localhost:3000/cargaisons");
  return await response.json();
}

function getStatusColor(status: string): string {
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



function filterData(data: any[], searchTerm: string) {
  const lowerCaseSearchTerm = searchTerm.toLocaleLowerCase();

  return data.filter((item) => {
    const numero = item.numero?.toString().toLocaleLowerCase() || "";
    const type = item.type?.toString().toLocaleLowerCase() || "";
    const lieu_depart = item.lieu_depart?.toString().toLocaleLowerCase() || "";
    const destination = item.destination?.toString().toLocaleLowerCase() || "";

    return (
      numero.includes(lowerCaseSearchTerm) ||
      type.includes(lowerCaseSearchTerm) ||
      lieu_depart.includes(lowerCaseSearchTerm) ||
      destination.includes(lowerCaseSearchTerm)
    );
  });
}

function renderData(data: any[]) {
  const allCargs = document.querySelector(".allCargs") as HTMLTableSectionElement;
  allCargs.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginateData = data.slice(startIndex, endIndex);

  paginateData.forEach((item) => {
    const row = document.createElement("tr") as HTMLTableRowElement;
    const statusColor = getStatusColor(item.status);
    row.innerHTML = `
      <th class="text-base">${item.numero}</th>
      <td class="text-base">${item.type}</td>
      <td class="text-base">${item.poids} Kg</td>
      <td class="text-base">${item.lieu_depart}</td>
      <td class="text-base">${item.destination}</td>
      <td class="text-base">${item.montant} Fr</td>
      <td class="text-base">${item.colis.length}</td>
      <td style="color: ${statusColor};">${item.status}</td>
      <td class="text-base">${item.progression}</td>
      <td class="text-base">
        <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Modifier</button>
        <input type="checkbox" /> 
      </td>
    `;
    allCargs.appendChild(row);
  });
  renderPagination(data.length);
}

function renderPagination(totalItems:number){
  const pagination = document.querySelector(".paginationDiv") as HTMLDivElement;
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for(let i = 1; i<= totalPages; i++){
    const button = document.createElement("button");
    button.textContent = i.toString();
    button.classList.add("pagination-button");
    if(i === currentPage){
      button.classList.add('active');
    }
    button.addEventListener("click", () => {
      currentPage = i;
      showAllCargs((document.getElementById('default-search') as HTMLInputElement).value);
    })
    pagination.appendChild(button);
  }
}


async function showAllCargs(searchTerm: string = "") {
  const data = await fetchData();
  const filteredData = filterData(data, searchTerm);
  renderData(filteredData);
}

document
  .getElementById("default-search")
  ?.addEventListener("input", (event) => {
    const searchTerm = (event.target as HTMLInputElement).value;
    showAllCargs(searchTerm);
  });
showAllCargs();

















