//----------------------------------------------------CODE DE BOBO:
const map = L.map('map').setView([48.8566, 2.3522], 13); // Paris par défaut
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        let startMarker, endMarker;
        const startInput = document.getElementById('lieu-depart');
        const endInput = document.getElementById('lieu-arrivee');
        const distanceInput = document.getElementById('distance');

        map.on('click', function (e) {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;
            const url = "https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}";

            if (!startMarker || startInput.value === "") {
                // Effacer le marqueur de départ s'il existe
                if (startMarker) {
                    map.removeLayer(startMarker);
                }
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        const cityName = data.address.city || data.address.town || data.address.village || data.address.country || "Lieu inconnu";
                        // startInput.value = cityName;
                    })
                    .catch(error => {
                        console.error(error);
                        // startInput.value = "Erreur de géocodage";
                    });

                startMarker = L.marker(e.latlng, { draggable: true }).addTo(map)
                    .bindPopup('Lieu de Départ')
                    .openPopup();

                startMarker.on('dragend', function () {
                    getCityName(startMarker.getLatLng(), startInput);
                    calculateDistance();
                });

            } else if (!endMarker || endInput.value === "") {
                // Effacer le marqueur d'arrivée s'il existe
                if (endMarker) {
                    map.removeLayer(endMarker);
                }
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        const cityName = data.address.city || data.address.town || data.address.village || data.address.country || "Lieu inconnu";
                        // endInput.value = cityName;
                    })
                    .catch(error => {
                        console.error(error);
                        // endInput.value = "Erreur de géocodage";
                    });

                endMarker = L.marker(e.latlng, { draggable: true }).addTo(map)
                    .bindPopup('Lieu d\'Arrivée')
                    .openPopup();

                endMarker.on('dragend', function () {
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
                // distanceInput.value = distance.toFixed(2) + ' km';
            } else {
                // distanceInput.value = '';
            }
        }

        function getCityName(latlng, inputElement) {
            const url = "https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}";
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const address = data.address;
                    const cityName = address.city || address.town || address.village || address.country || "Lieu inconnu";
                    inputElement.value = cityName;
                })
                .catch(error => {
                    console.error('Error:', error);
                    inputElement.value = "Erreur de géocodage";
                });
}

//------------------------------------------------------DEBUT DE MA PREMIÈRE VERSION------------------------------------- 
document.addEventListener("DOMContentLoaded", () => {
  if (typeof L !== "undefined") {
    // Vérifier que la bibliothèque Leaflet est bien chargée
    console.log("MAP OPENED");
    // Initialiser la carte
    const map = L.map("map").setView([51.505, -0.09], 8);

    // Ajouter une couche de tuiles (carte de base)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const startZone = L.marker([51.5, -0.09], { draggable: true }).addTo(map);
    startZone.bindPopup("Départ").openPopup();
    const endZone = L.marker([51.51, -0.01], { draggable: true }).addTo(map);
    endZone.bindPopup("Destination").openPopup();
    
    let l1:number;
    startZone.on("move", function (e: L.LeafletEvent) {
      let pointDepart = (e as L.LeafletMouseEvent).latlng;
      let lat1 = pointDepart.lat;
      l1 = lat1;
      let long1 = pointDepart.lng;
      console.log(`Coordonnées départ: ${pointDepart}`);
    });

    let pointArrivee;
    endZone.on("move", function (e: L.LeafletEvent) {
      pointArrivee = (e as L.LeafletMouseEvent).latlng;
      let lat2 = pointArrivee.lat;
      let long2 = pointArrivee.lng;
      console.log(`Coordonnées Arrivée: ${pointArrivee}`);
    });
    



    


    //--------------------------------------FONCTION POUR RECUPÉRER LE NOM DU PAYS:----------------------------------------------
    function fetchCountryName(lat: number, lng: number, markerType: string) {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.address && data.address.country) {
            const countryName = data.address.country;
            console.log(`Nom du pays (${markerType}): ${countryName}`);
            // Afficher le nom du pays dans une popup ou ailleurs
            if (markerType === "startZone") {
              startZone.bindPopup(`Départ: ${countryName}`).openPopup();
            } else {
              endZone.bindPopup(`Destination: ${countryName}`).openPopup();
            }
          } else {
            console.log(
              `Impossible de récupérer le nom du pays (${markerType}).`
            );
          }
        })
        .catch((error) => {
          console.error(
            `Erreur lors de la récupération du nom du pays (${markerType}):`,
            error
          );
        });
        
      }
      
      //-------------------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------FONCTION DE CALCUL DE LA DISTANCE:----------------------------------------------------------------
    // CALCUL DE LA DISTANCE EN KM:
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Rayon de la Terre en kilomètres

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance en kilomètres
}

// Exemple d'utilisation
const lati1 = 48.8566;
const longi1 = 2.3522; // Paris
const lati2 = 51.5074;
const longi2 = -0.1278; // Londres

// const kilometres = haversineDistance(lat1, lon1, lat2, lon2);
// console.log(`La distance est de ${kilometres.toFixed(2)} km.`);
    //-------------------------------------------------------------------------------------------------------------------------------------------
  
  } else {
    console.log("Leaflet library is not loaded.");
  }
});

if (typeof L !== "undefined") {
  console.log("YES");
} else {
  console.log("False");
}

//------------------------------------------------------FIN DE MA PREMIÈRE VERSION------------------------------------- 

// // Importer le module 'fs' de Node.js
// import * as fs from 'fs';

// // Chemin vers le fichier JSON
// const filePath = 'myObject.json';

// // Nouvel objet à ajouter
// const newObject = {
//     name: "Jane Doe",
//     age: 28,
//     email: "janedoe@example.com"
// };

// // Lire le fichier JSON existant
// fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//         console.error('Erreur lors de la lecture du fichier:', err);
//         return;
//     }

//     // Parser le contenu du fichier JSON
//     let jsonArray;
//     try {
//         jsonArray = JSON.parse(data);
//     } catch (parseErr) {
//         console.error('Erreur lors du parsing du fichier JSON:', parseErr);
//         return;
//     }

//     // Vérifier si le fichier JSON contient un tableau
//     if (!Array.isArray(jsonArray)) {
//         console.error('Le contenu du fichier JSON n\'est pas un tableau');
//         return;
//     }

//     // Ajouter le nouvel objet au tableau
//     jsonArray.push(newObject);

//     // Convertir le tableau mis à jour en chaîne JSON
//     const updatedJsonString = JSON.stringify(jsonArray, null, 2); // 'null' pour les remplacements, '2' pour l'indentation

//     // Écrire la chaîne JSON mise à jour dans le fichier
//     fs.writeFile(filePath, updatedJsonString, (writeErr) => {
//         if (writeErr) {
//             console.error('Erreur lors de l\'écriture du fichier:', writeErr);
//         } else {
//             console.log('Objet ajouté avec succès dans myObject.json');
//         }
//     });
// });

// document.addEventListener('DOMContentLoaded', function () {
//     const cargoForm = document.getElementById('cargaisonForm') as HTMLFormElement;
//     const carteButton = document.getElementById('carte-button') as HTMLButtonElement;
//     const carteContainer = document.getElementById('carte-container') as HTMLDivElement;
//     const checkNbreProduits = document.getElementById('check-nbre-produits') as HTMLInputElement;
//     const checkPoids = document.getElementById('check-poids') as HTMLInputElement;
//     const poidsInput = document.getElementById('poids') as HTMLInputElement;
//     const nbreProduitsInput = document.getElementById('nbre-produits') as HTMLInputElement;
//     const errorMessage = document.getElementById('error-message') as HTMLElement;
//     let startPoint: L.LatLng | null = null;
//     let endPoint: L.LatLng | null = null;
//     let distance: number | null = null;
  
//     // Fonction pour générer un numéro unique de 4 chiffres
//     function generateUniqueNumber() {
//       return Math.floor(1000 + Math.random() * 9000);
//     }
  
//     // Gestion des cases à cocher
//     checkNbreProduits.addEventListener('change', function () {
//       if (checkNbreProduits.checked) {
//         checkPoids.checked = false;
//         nbreProduitsInput.disabled = false;
//         poidsInput.disabled = true;
//         poidsInput.value = '';
//       } else {
//         nbreProduitsInput.disabled = true;
//         nbreProduitsInput.value = '';
//       }
//     });
  
//     checkPoids.addEventListener('change', function () {
//       if (checkPoids.checked) {
//         checkNbreProduits.checked = false;
//         poidsInput.disabled = false;
//         nbreProduitsInput.disabled = true;
//         nbreProduitsInput.value = '';
//       } else {
//         poidsInput.disabled = true;
//         poidsInput.value = '';
//       }
//     });
  
//     carteButton.addEventListener('click', function () {
//       carteContainer.style.display = 'block';
  
//       const map = L.map('carte-container').setView([51.505, -0.09], 13);
  
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       }).addTo(map);
  
//       const startMarker = L.marker([51.5, -0.09], { draggable: true }).addTo(map)
//         .bindPopup('Point de départ. Déplacez-moi!')
//         .openPopup();
  
//       const endMarker = L.marker([51.51, -0.1], { draggable: true }).addTo(map)
//         .bindPopup('Point d\'arrivée. Déplacez-moi!')
//         .openPopup();
  
//       startMarker.on('move', function (e: L.LeafletEvent) {
//         startPoint = (e as L.LeafletMouseEvent).latlng;
//         calculateDistance();
//       });
  
//       endMarker.on('move', function (e: any) {
//         endPoint = e.latlng;
//         calculateDistance();
//     });
  
//       function calculateDistance() {
//         if (startPoint && endPoint) {
//           distance = startPoint.distanceTo(endPoint) / 1000;
//           console.log('Distance: ', distance, 'km');
//         }
//       }
//       // OPEN ROOT SERVICE;
//     })

//-------------------------------------------------------CRUD SUR UN FICHIE JSON:
import * as fs from 'fs';

// Chemin vers le fichier JSON
const filePath = 'data.json';

// Fonction pour lire le contenu du fichier JSON
function readData(): any {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Erreur lors de la lecture du fichier JSON:', err);
        return null;
    }
}

// Fonction pour écrire des données dans le fichier JSON
function writeData(data: any): void {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log('Données écrites avec succès dans le fichier JSON.');
    } catch (err) {
        console.error('Erreur lors de l\'écriture dans le fichier JSON:', err);
    }
}

// Fonction pour créer une nouvelle entrée
function createEntry(newEntry: any): void {
    const existingData = readData() || [];
    existingData.push(newEntry);
    writeData(existingData);
}

// Fonction pour lire toutes les entrées
function readAllEntries(): any {
    return readData();
}

// Fonction pour mettre à jour une entrée existante
function updateEntry(index: number, updatedEntry: any): void {
    const existingData = readData();
    if (existingData && existingData[index]) {
        existingData[index] = updatedEntry;
        writeData(existingData);
    } else {
        console.error('Index de l\'entrée à mettre à jour invalide.');
    }
}

// Fonction pour supprimer une entrée
function deleteEntry(index: number): void {
    const existingData = readData();
    if (existingData && existingData[index]) {
        existingData.splice(index, 1);
        writeData(existingData);
    } else {
        console.error('Index de l\'entrée à supprimer invalide.');
    }
}

// Exemples d'utilisation
createEntry({ name: 'John', age: 30 });
createEntry({ name: 'Jane', age: 25 });

console.log('Toutes les entrées:', readAllEntries());

updateEntry(0, { name: 'John Doe', age: 35 });

console.log('Toutes les entrées après la mise à jour:', readAllEntries());

deleteEntry(1);

console.log('Toutes les entrées après la suppression:', readAllEntries());

//------------------------------------------------------------------------------------- 
//-------------------------------------------------AFFICHAGE CARD CARGAISONS AERIENNES:
// async function showAirCard() {

//   const response = await fetch("http://localhost:3000/cargaisons");
//   const data = await response.json();

//   const airDatas = document.querySelector(".airDatas") as HTMLTableRowElement;
//   const parent = airDatas.parentNode as HTMLTableSectionElement;

//   data.forEach((item: any) => {
//     const row = document.createElement("tr") as HTMLTableRowElement;
//     if (item.type === "aire") {
//       row.innerHTML = `
//       <td class="border border-green-600">${item.numero}</td>
//       <td class="border border-green-600">${item.poids} Kg</td>
//       <td class="border border-green-600">${item.montant} Fr</td>
//       <td class="border border-green-600">${item.status}</td>
//       <td class="border border-green-600">${item.progression}</td>
//       <div>
//       <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Modifier</button>
//       <input type="checkbox" />
//       </div>
//       `;
//       parent.appendChild(row);
//     }
//   });
// }

//---------------------------------------------------AFFICHAGE CARD CARGAISONS ROUTIERE
// async function showRouteCard() {
//   const response = await fetch("http://localhost:3000/cargaisons");
//   const data = await response.json();

//   const routeDatas = document.querySelector(
//     ".routeDatas"
//   ) as HTMLTableRowElement;
//   const parent = routeDatas.parentNode as HTMLTableSectionElement;

//   data.forEach((item: any) => {
//     const row = document.createElement("tr") as HTMLTableRowElement;
//     if (item.type === "terre") {
//       row.innerHTML = `
//       <td class="border border-green-600">${item.numero}</td>
//       <td class="border border-green-600">${item.poids} Kg</td>
//       <td class="border border-green-600">${item.montant} Fr</td>
//       <td class="border border-green-600">${item.status}</td>
//       <td class="border border-green-600">${item.progression}</td>
//       <div>
//       <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Modifier</button>
//       <input type="checkbox" />
//       </div>
//       `;
//       parent.appendChild(row);
//     }
//   });
// }
//----------------------------------------------AFFICHAGE CARD CARGAISONS MARITIMES
// async function showMerCard() {
//   const response = await fetch("http://localhost:3000/cargaisons");
//   const data = await response.json();

//   const merDatas = document.querySelector(".merDatas") as HTMLTableRowElement;
//   const parent = merDatas.parentNode as HTMLTableSectionElement;

//   data.forEach((item: any) => {
//     const row = document.createElement("tr") as HTMLTableRowElement;
//     if (item.type === "mer") {
//       row.innerHTML = `
//       <td class="border border-green-600">${item.numero}</td>
//       <td class="border border-green-600">${item.poids} Kg</td>
//       <td class="border border-green-600">${item.montant} Fr</td>
//       <td class="border border-green-600">${item.status}</td>
//       <td class="border border-green-600">${item.progression}</td>
//       <div>
//       <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Modifier</button>
//       <input type="checkbox" />
//       </div>
//       `;
//       parent.appendChild(row);
//     }
//   });
// }
// showRouteCard();
// showAirCard();
// showMerCard();
