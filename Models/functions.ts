export function message():void{
    console.log("WELCOME");
}

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