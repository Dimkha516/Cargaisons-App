const url = "http://localhost:8089/Cargaisons-App/pages/test.php";
let dataArray: any[] = [];

 fetch(url)
  .then((response) => {
    // Vérifier que la réponse est correcte
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json(); // Convertir la réponse en JSON
  })
  .then((data) => {
    // console.log(data);
    if (!data.hasOwnProperty("cargaisons")) {
      throw new Error("No cargaisons key founded");
    }
    const cargaisons = data.cargaisons;
    dataArray = cargaisons;
    console.log("Données reçues :");
    // cargaisons.forEach((cargaisons: any, index: number) => {
    //   console.log(`Carg ${index + 1}:`, cargaisons);
    // })
  })
  .catch((error) => {
    // Gérer les erreurs
    console.error("There was a problem with the fetch operation:", error);
  });
