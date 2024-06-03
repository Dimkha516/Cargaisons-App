<!-- AJOUT ET RETRAIT PRODUITS DANS CARGAISONS -->
<!-- FERMER ET RÉOUVRIR CARGAISON -->
<!-- TIPS: CRÉER UN FICHIER POUR ENREGISTRER CLIENTS -->

<?php
$json_data = file_get_contents('../Data/cargaisons.json');
$cargaisons = json_decode($json_data, true)['cargaisons'];
?>


<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="../dist/style.css" rel="stylesheet" />
  <title>Documents</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
  <!-- <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" /> -->
  <style>
    .border {
      border: 1px solid green;
    }

    .border-green-600 {
      border-color: #38a169;
      /* Couleur verte spécifique */
    }

    .narrow-column {
      width: 100px;
      /* Vous pouvez ajuster cette valeur à la largeur souhaitée */
    }

    #map {
      height: 60vh;
      width: 100%;
    }

    .card {
      border: 1px solid #ccc;
      padding: 16px;
      margin: 16px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  </style>
</head>

<body>

  <!-- class="bg-hero h-screen" -->
  <!-- <h1 class="text-3xl font-bold underline">Welcomes</h1> -->
  <div class="main">
    <!---------------------------- NAVBAR START------------------------------ -->
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" class="bg-hero h-screen" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a href="index.php?page=home">Cargaisons</a></li>
            <li><a href="index.php?page=produits">Listes des colis</a></li>
            <li><a href="#">Archives</a></li>
          </ul>
        </div>

        <img src="../medias/logo.png" class="w-32 border-4 border-blue-500 rounded-lg" alt="Logo">
      </div>
      <div class="navbar-center">

        <h1 class="btn btn-ghost text-3xl">Sécure-Transite !</h1>
        <!---------------------------------------OPEN & CLOSE MODALS START-------------------------------->

        <!-- BOUTON AJOUT CARGAISON -->
        <button class="btn btn-success" onclick="my_modal_3.showModal()">
          + AJOUTER CARGAISON
        </button>

        <!-- BOUTON AJOUT PRODUIT -->
        <a href="#my_modal_8" class="btn btn-info text-2xl ml-8">+AJOUTER COLIS</a>


        <div class="modal" role="dialog" id="my_modal_8">
          <div class="modal-box">
            <!-----------------------------------ADD PROD FORM START------------------------------->

            <form class="addProdForm max-w-md mx-auto">
              <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="floating_email" id="floating_email"
                  class="nomClient block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" " />
                <label for="floating_email"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nom
                  client</label>
                <span class="nomClientError">Nom Client Err</span>
              </div>
              <!--  -->
              <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="floating_password" id="floating_password"
                  class="prenomClient block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" " />
                <label for="floating_password"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Prénom(s)
                  client</label>
                <span class="prenomClientError">ERROR</span>
              </div>
              <!--  -->
              <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="floating_phone" id="floating_phone"
                  class="phoneClient block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" " />
                <label for="floating_phone"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tél
                  client (771234567)</label>
                <span class="phoneClientError">ERROR</span>
              </div>
              <!--  -->
              <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="repeat_password" id="floating_repeat_password"
                  class="emailClient block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" " />
                <label for="floating_repeat_password"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
                  client (facultatif)</label>
                <span class="emailClientError">ERROR</span>
              </div>
              <!--  -->
              <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="repeat_password" id="floating_repeat_password"
                  class="adressClient block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" " />
                <label for="floating_repeat_password"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adresse
                  client</label>
                <span class="adressClientError">ERROR</span>
              </div>
              <!--  -->
              <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                  <input type="text" name="floating_first_name" id="floating_first_name"
                    class="nomDestinataire block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " />
                  <label for="floating_first_name"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nom
                    destinataire</label>
                  <span class="nomDestinataireError">ERROR</span>
                </div>
                <!--  -->
                <div class="relative z-0 w-full mb-5 group">
                  <input type="text" name="floating_last_name" id="floating_last_name"
                    class="prenomDestinataire block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " />
                  <label for="floating_last_name"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Prénom
                    destinataire</label>
                  <span class="prenomDestinataireError">ERROR</span>
                </div>
                <!--  -->
              </div>
              <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                  <input type="tel" name="floating_phone" id="floating_phone"
                    class="telDestinataire block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " />
                  <label for="floating_phone"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tél
                    destinataire</label>
                  <span class="telDestinataireError">ERROR</span>
                </div>
                <!--  -->
                <div class="relative z-0 w-full mb-5 group">
                  <input type="email name=" floating_company" id="floating_company" class="emailDestinataire block py-2.5 px-0 w-full
                    text-sm text-gray-900 bg-transparent border-0 border-b-2
                    border-gray-300 appearance-none dark:text-white
                    dark:border-gray-600 dark:focus:border-blue-500
                    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label for="floating_company"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
                    destinataire</label>
                  <span class="emailDestinataireError">ERROR</span>
                </div>
                <!--  -->
              </div>
              <!--  -->
              <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                  <input type="number" name="floating_first_name" id="floating_first_name"
                    class="nombreColis block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " />
                  <label for="floating_first_name"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre
                    de produits</label>
                  <span class="nombreColisError">ERROR</span>
                </div>
                <!--  -->
                <div class="relative z-0 w-full mb-5 group">
                  <input type="number" name="floating_last_name" id="floating_last_name"
                    class="poidsProduit block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " />
                  <label for="floating_last_name"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Poids</label>
                  <span class="poidsProduitError">ERROR</span>
                </div>
                <!--  -->
              </div>
              <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                  <div class="mb-5">
                    <select class="cargaisonProduit select select-bordered w-full max-w-xs" id="cargaisonType">
                      <option disabled selected value="0">Type de cargaison</option>
                      <option value="terre">Routière</option>
                      <option value="mer">Maritime</option>
                      <option value="aire">Aérienne</option>
                    </select>
                    <span class="cargaisonProduitError">ERROR</span>
                  </div>
                </div>
                <!--  -->
                <div class="relative z-0 w-full mb-5 group">
                  <div class="mb-5">
                    <select class="typeProduit select select-bordered w-full max-w-xs" id="cargaisonType">
                      <option disabled selected>Type de Produit</option>
                      <option value="alimentaire">Alimentaire</option>
                      <option value="chimic">Chimique</option>
                      <option value="cassable">Fragile</option>
                      <option value="incassable">Incassable</option>
                    </select>
                    <span class="typeProduitError">ERROR</span>
                  </div>
                </div>
                <!--  -->
                <span class="correspondError">ERROR</span>
              </div>
              <!--  -->
              <div class="relative z-0 w-full mb-5 group">
                <input type="text" readonly name="repeat_password" id="floating_repeat_password"
                  class="prodPrice block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" " />
                <label for="floating_repeat_password"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Prix du colis</label>
                <!-- <span class="emailClientError">ERROR</span> -->
              </div>
              <!--  -->
              <button type="submit" id="addCargBtn"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Ajouter
              </button>
            </form>
            <button class="btn text-white bg-blue-700" id="chooseCargBtn" onclick="my_modal_1.showModal()">Choisir
              Cargaison</button>

            <div class="modal-action">
              <a href="#" class="btn">Annuler</a>
            </div>
          </div>
          <!-----------------------------------ADD PROD FORM END---------------------------------->
        </div>

        <dialog id="my_modal_3" class="modal">
          <div class="modal-box">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <p class="py-4">
              Appuyer sur ESC ou cliquer sur ✕ pour fermer annuler
            </p>

            <!----------------------------------------ADD CARGAISON FORM START--------------------------------->
            <form method="POST" class="addCargaisonForm max-w-sm mx-auto">
              <h2>Ajouter cargaison</h2>
              <!-- <h3 class="cargError" style="color: red"></h3> -->

              <div class="mb-5">
                <input type="number" id="poidsCarg"
                  class="shadow-sm bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Poids max" />
                <span class="poidsError">Poids Error</span>
              </div>
              <div class="mb-5">
                <label for="cargaisonType" class="block mb-2 text-3xl text-purple-700 text-opacity-100">Type de
                  cargaison</label>

                <select class="cargaisonType select select-bordered w-full max-w-xs" id="cargaisonType">
                  <option disabled selected>Type de cargaison</option>
                  <option value="terre">Routière</option>
                  <option value="mer">Maritime</option>
                  <option value="aire">Aérienne</option>
                </select>
              </div>
              <span class="typeError">Type Error</span>
              <!--  -->

              <!--  -->

              <!--  -->
              <div class="mb-5">
                <div id="map">
                  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
                </div>
                <label for="depart" class="block mb-2 text-3xl text-purple-700 text-opacity-100">lieu départ</label>
                <input type="text" id="depart"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                <!-- <input type="text" id="place-name" readonly>
                  <div id="map"></div> -->
                <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
                <!-- <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.619337479684!2d-17.288513575217095!3d14.734100785768224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec19ffc5d2b4f0f%3A0x6671824fed8c6097!2sCit%C3%A9%20ASECNA%20Rufisque%2C%20Dakar!5e0!3m2!1sfr!2ssn!4v1716765071488!5m2!1sfr!2ssn"
                width="300" height="100" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe> -->
                <span class="startZoneError">Erreur départ</span>
              </div>
              <div class="mb-5">
                <label for="arrivee" class="block mb-2 text-3xl text-purple-700 text-opacity-100">Destination</label>
                <input type="text" id="arrivee"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                <!-- ; <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.619337479684!2d-17.288513575217095!3d14.734100785768224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec19ffc5d2b4f0f%3A0x6671824fed8c6097!2sCit%C3%A9%20ASECNA%20Rufisque%2C%20Dakar!5e0!3m2!1sfr!2ssn!4v1716765071488!5m2!1sfr!2ssn"
                width="300" height="100" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe> -->
                <span class="endZoneError">End Zone Error</span>
              </div>
              <!--  -->
              <div class="mb-5">
                <label for="cargDistance" class="block mb-2 text-3xl text-purple-700 text-opacity-100">Distance
                  (Km)</label>
                <input type="text" id="cargDistance" readonly
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Distance (20 Km minimum)" />
              </div>
              <!--  -->
              <div class="mb-5">
                <label for="dateDepart" class="block mb-2 text-3xl text-purple-700 text-opacity-100">Date Départ</label>
                <input type="date" id="dateDepart"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                <span class="startDateError"></span>
              </div>
              <!--  -->
              <div class="mb-5">
                <label for="dateArrivee" class="block mb-2 text-3xl text-purple-700 text-opacity-100">Date
                  D'arrivée</label>
                <input type="date" id="dateArrivee"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                <span class="endDateError">End Date Error</span>
                <span class="cargDateError">Carg Date Error</span>
              </div>
              <!--  -->
              <button type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Ajouter
              </button>

            </form>
            <!----------------------------------------ADD CARGAISON FORM END--------------------------------->
          </div>
        </dialog>
        <!----------------------------------------CHOOSE PRODUCT'S CARGAISON BOX START-------------------------------------->
        <dialog id="my_modal_1" class="modal">
          <div class="modal-box" id="boxCargSelect">
            <h2 style="font-size:2rem;">
              🔜 Séléctionner cargaison
            </h2>
            <div id="container">
            </div>

            <!-- <div class="card w-96 bg-base-100 shadow-xl">
              
            </div> -->
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        <!----------------------------------------CHOOSE PRODUCT'S CARGAISON BOX END-------------------------------------->

        <!----------------------------------------CHOW CARGAISON DETAILS START-------------------------------------->
        <button style="display:none" class="btn" onclick="my_modal_5.showModal()">open modal</button>
        <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <!-- <p class="py-4">Press ESC key or click the button below to close</p> -->
            
            <!-- <h3 class="font-bold text-lg">INFORMATIONS CARGAISON</h3> -->
            <div class="infosColis">
              <div>
                <p class="typeInfo">Type cargaison:</p>
                <p class="poidsInfo">Poids:</p>
                <p class="prodInfo">Nbr Colis:</p>
                <p class="montantInfo">Montant:</p>
              </div>
              <div>
                <hr class="separator">
              </div>
              <div>
                <p class="date1Info">Date départ:</p>
                <p class="date2Info">Date d'arrivée:</p>
                <p class="zone1Info">Lieu départ:</p>
                <p class="zone2Info">Destination:</p>
              </div>
              <div>
                <hr class="separator">
              </div>
              <div>
                <p class="stateInfo">Etat:</p>
                <p class="progressInfo">Progression:</p>
                <!-- <p class="zone1Info">Lieu départ</p>
                <p class="zone2Info">Destination</p> -->
              </div>              
              </div>
            <div class="modal-action"> 
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn closeCargInfos">Fermer</button>
              </form>
            </div>
          
          </div>
        </dialog>

        <!----------------------------------------CHOW CARGAISON DETAILS END-------------------------------------->


        <!---------------------------------------OPEN & CLOSE MODALS END-------------------------------->
      </div>
      <div class="navbar-end">
        <form class="flex items-center max-w-sm mx-auto">

          <div class="relative w-full">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <!-- <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
              </svg> -->
            </div>
            <!-- <input type="text" id="simple-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search branch name..." required /> -->
          </div>

        </form>


      </div>
    </div>
    <!---------------------------NAVBAR END------------------------------ -->

    <!---------------------------LISTE TYPES CARGAISONS START-------------------------------->
    <div class="flex flex-row justify-evenly">
      <details class="collapse bg-base-200">
        <summary class="collapse-title text-xl font-medium">
          Cargaisons Aériennes
          <img src="../medias/avion.jpg" class="w-32" />
        </summary>
        <div class="collapse-content">
          <p>content</p>
          <div class="grid grid-flow-col text-center p-2">
            <table class="border-Collapse border border-green-900">
              <thead>
                <tr>
                  <th class="border border-green-600 narrow-column">
                    N°
                  </th>
                  <th class="border border-green-600 narrow-column">
                    Poids
                  </th>
                  <th class="border border-green-600 narrow-column">
                    Montant
                  </th>
                  <th class="border border-green-600 narrow-column">
                    Etat
                  </th>
                  <th class="border border-green-600 narrow-column">
                    Progress
                  </th>
                  <th class="border border-green-600 narrow-column">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="airDatas">
                  <!-- <td class="border border-green-600 airNumero">102</td>
                  <td class="border border-green-600 airePoids">200 KG</td>
                  <td class="border border-green-600 airePrix">300.000 FR</td>
                  <td class="border border-green-600 aireStatus">Ouvert</td>
                  <td class="border border-green-600 aireProgress">En attente</td>
                  <td class="border border-green-600"> -->
                  <!-- <button>Modifier</button> -->
                  <!-- </td> -->
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </details>
      <!--  -->
      <details class="collapse bg-base-200">
        <summary class="collapse-title text-xl font-medium">
          Cargaisons Routières
          <img src="../medias/camion3.jpg" class="w-32" />
        </summary>
        <div class="collapse-content">
          <p>content</p>
          <div class="grid grid-flow-col text-center p-2">
            <!--  -->
            <table class="border-Collapse border border-green-900">
              <thead>
                <tr>
                  <th class="border border-green-600 narrow-column">
                    N°
                  </th>
                  <th class="border border-green-600 narrow-column">
                    Poids
                  </th>
                  <th class="border border-green-600 narrow-column">
                    Montant
                  </th>
                  <th class="border border-green-600 narrow-column">
                    Etat
                  </th>
                  <th class="border border-green-600 narrow-column">
                    Progress
                  </th>
                  <th class="border border-green-600 narrow-column">
                    Modifier
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="routeDatas">
                  <!-- <td class="border border-green-600">102</td>
                  <td class="border border-green-600">200 KG</td>
                  <td class="border border-green-600">300.000 FR</td>
                  <td class="border border-green-600">Ouvert</td>
                  <td class="border border-green-600">En attente</td>
                  <td class="border border-green-600">
                    <button>Modifier</button> -->
                  </td>
                </tr>

              </tbody>
            </table>
            <!--  -->
          </div>
        </div>
      </details>
      <!--  -->
      <details class="collapse bg-base-200">
        <summary class="collapse-title text-xl font-medium">
          Cargaisons Maritimes
          <img src="../medias/bateau.jpg" class="w-32" />
        </summary>
        <div class="collapse-content">
          <p>content</p>
          <div class="grid grid-flow-col text-center p-2">
            <table class="border-Collapse border border-green-900">
              <thead>
                <tr>
                  <th class="border border-green-600 narrow-column">
                    N°
                  </th>
                  <th class="border border-green-600 narrow-column">
                    Poids
                  </th>
                  <th class="border border-green-600 narrow-column">
                    Montant
                  </th>
                  <th class="border border-green-600 narrow-column">
                    Etat
                  </th>
                  <th class="border border-green-600 narrow-column">
                    Progress
                  </th>
                  <th class="border border-green-600 narrow-column">
                    Modifier
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="merDatas">
                  <!-- <td class="border border-green-600">102</td>
                  <td class="border border-green-600">200 KG</td>
                  <td class="border border-green-600">300.000 FR</td>
                  <td class="border border-green-600">Ouvert</td>
                  <td class="border border-green-600">En attente</td>
                  <td class="border border-green-600">
                    <button>Modifier</button> -->
                  <!-- </td> -->
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </details>
      <!--  -->


      <!--  -->
    </div>
    <!---------------------------LISTE TYPES CARGAISONS END------------------------------ -->


    <!-------------------------------------------SEARCH BAR START---------------------------->

    <form class="max-w-md mx-auto">
      <!-- <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label> -->
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input type="search" id="default-search"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Code, Type, Destination..." />
        <!-- <button type="submit"
          class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> -->
      </div>
    </form>

    <!-------------------------------------------SEARCH BAR END------------------------------>

    <!-- AFFICHAGES TOUTES CARGAISONS  START----->
    <div class="overflow-x-auto">
      <table class="table table-xs">
        <thead>
          <tr>
            <th class="text-2xl">Code</th>
            <th class="text-2xl">Type</th>
            <th class="text-2xl">Poids</th>
            <th class="text-2xl">Zone départ</th>
            <th class="text-2xl">Destination</th>
            <th class="text-2xl">Montant</th>
            <th class="text-2xl">Nbr colis</th>
            <th class="text-2xl">Etat</th>
            <th class="text-2xl">Progress</th>
            <th class="text-2xl">Actions</th>
          </tr>
        </thead>
        <tbody class="allCargs">
          <?php foreach ($cargaisons as $cargaison): ?>
          <tr>
            <td>
              <?php echo htmlspecialchars($cargaison["id"]) ?>
            </td>
            <td>
              <?php echo htmlspecialchars($cargaison["type"]) ?>
            </td>
            <td>
              <?php echo htmlspecialchars($cargaison["poids"] . " Kg") ?>
            </td>
            <td>
              <?php echo htmlspecialchars($cargaison["lieu_depart"]) ?>
            </td>
            <td>
              <?php echo htmlspecialchars($cargaison["destination"]) ?>
            </td>
            <td>
              <?php echo htmlspecialchars($cargaison["montant"]) ?>
            </td>
            <td>
              <?php echo htmlspecialchars($cargaison["montant"]) ?>
            </td>
            <td>
              <?php echo htmlspecialchars($cargaison["status"]) ?>
            </td>
            <td>
              <?php echo htmlspecialchars($cargaison["progression"]) ?>
            </td>
            <td>
              <button id=<?php $cargaison["id"] ?>
                class="modifBtn focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4
                focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600
                dark:hover:bg-red-700 dark:focus:ring-red-900">Modifier</button>
              <input type="checkbox" class="modifCheck">
            </td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
      <tbody id="cargaison-body">
        <!-- Les données seront insérées ici par JavaScript -->
      </tbody>
      <div class="pagination">
        <button id="prev-page">Précédent</button>
        <button id="next-page">Suivant</button>
      </div>
    </div>

    <!-- AFFICHAGES TOUTES CARGAISONS END----->

    <!---------------------------PAGINATION START------------------------------ -->
    <div class="join paginationDiv" style="position: relative; left: 70%">
      <!-- <button class="join-item btn">1</button>
      <button class="join-item btn btn-active">2</button>
      <button class="join-item btn">3</button>
      <button class="join-item btn">4</button> -->
    </div>
    <!---------------------------PAGINATION END------------------------------ -->

    <!----------------------------FOOTER START------------------------------>
    <footer class="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <nav class="grid grid-flow-col gap-4">
        <a class="link link-hover">About us</a>
        <a class="link link-hover">Contact</a>
        <a class="link link-hover">Jobs</a>
        <a class="link link-hover">Press kit</a>
      </nav>
      <nav>
        <div class="grid grid-flow-col gap-4">
          <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
              <path
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z">
              </path>
            </svg></a>
          <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
              <path
                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z">
              </path>
            </svg></a>
          <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
              <path
                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z">
              </path>
            </svg></a>
        </div>
      </nav>
      <aside>
        <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
      </aside>
    </footer>
    <!----------------------------FOOTER END-------------------------------->

  </div>
  <script type="module" src="../dist/home.js"></script>
</body>