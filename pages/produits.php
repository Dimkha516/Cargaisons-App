<?php
$json_data = file_get_contents('../Data/cargaisons.json');
$produits = json_decode($json_data, true)['produits'];
include_once ("../functions/logout.php");

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../dist/style.css">
  <title>Document</title>
</head>

<body>
  <div class="mainProduits">
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
      </div>
      <div class="navbar-center">
        <h1 class="btn btn-ghost text-3xl">Sécure-Transite! LISTE DES COLIS</h1>
        <form method="post" class="deconnexionForm" target="_blank" onsubmit="window.close();">
          <input type="submit" id="logout" class="disconnectInput" name="logout" value=" ↩️Déconnexion">
        </form>
        <!---------------------------------------OPEN & CLOSE MODALS START-------------------------------->

        <!-- POPUP UPDATE PROD START -->
        <!-- <button class="btn" onclick="my_modal_3.showModal()">open modal</button> -->
        <dialog id="my_modal_3" class="modal">
          <div class="modal-box  updateProdModal">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 closeModal">✕</button>
            </form>
            <!-- <h3 class="font-bold text-lg" style="text-decoration:underline; font-size:1.5rem"> Modification informations Colis</h3> -->
            <h3 class="currentUpdatingProd">🥡</h3>
            <div class="overflow-x-auto items">
              <table class="table table-xs">
                <thead>
                  <tr>
                    <th class="text-2xl">Etat Colis</th>
                    <th class="text-2xl">Archiver Colis</th>
                    <th class="text-2xl">Annuler Colis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <select class="productState">
                        <option value="0" disabled selected>Etat Colis</option>
                        <option value="encours">➡️ Colis en cours</option>
                        <option value="recupere">➡️ Colis recupéré</option>
                        <option value="retard">➡️ Colis en retard</option>
                        <option value="perdu">➡️ Colis Perdu</option>

                      </select>
                    </td>
                    <td>
                      <button class="archiveProdBtn">💾 Archiver</button>
                    </td>
                    <td>
                      <button class="annulerProdBtn">❌ Retirer Colis</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p class="updateMessage">MESSAGE</p>
            </div>

          </div>
        </dialog>
        <!-- POPUP UPDATE PROD END -->

        <!---------------------------------------OPEN & CLOSE MODALS END-------------------------------->
      </div>
      <div class="navbar-end">
      </div>
    </div>
    <!---------------------------NAVBAR END------------------------------ -->
  </div>

  <!---------------------------------------------------SERACH PROD INPUT START------------------------------------------------>
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
        placeholder="Code Colis..." />
      <!-- <button type="submit"
          class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> -->
    </div>
  </form>
  <!---------------------------------------------------SERACH PROD INPUT END------------------------------------------------>
  <div class="overflow-x-auto items">
    <table class="table table-xs">
      <thead>
        <tr class="itemsHeads">
          <th class="text-2xl">Code</th>
          <th class="text-2xl">Type</th>
          <th class="text-2xl">Poids</th>
          <th class="text-2xl">Voie</th>
          <th class="text-2xl">Prix</th>
          <th class="text-2xl">Nbr Prod</th>
          <th class="text-2xl">Etat</th>
          <th class="text-2xl">Actions</th>
        </tr>
      </thead>
      <tbody class="allCargs">
        <?php foreach ($produits as $produit): ?>
          <tr>
            <td>
              <?php echo htmlspecialchars($produit["code_colis"]) ?>
            </td>
            <td>
              <?php echo htmlspecialchars($produit["type_produit"]) ?>
            </td>
            <td>
              <?php echo htmlspecialchars($produit["poids"] . "KG") ?>
            </td>
            <td>
              <?php echo htmlspecialchars($produit["etat"]) ?>
            </td>
            <td>
              <?php echo htmlspecialchars($produit["voie"]) ?>
            </td>
            <td>
              <?php echo htmlspecialchars($produit["prix"]) ?>
            </td>
            <td>
              <?php echo htmlspecialchars($produit["nombre_produit"]) ?>
            </td>
            <td>
              <button
                class="modifBtn focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Éditer</button>
              <input type="checkbox" class="modifCheck">
            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
    <tbody id="cargaison-body">
      <!-- Les données seront insérées ici par JavaScript -->
    </tbody>
  </div>
  <!---------------------------PAGINATION START------------------------------ -->
  <div id="pagination-controls" class="join paginationDiv" style="position: relative; left: 70%">
    <button id="prevPage">Précédent</button>
    <span id="pageNumber">1</span>
    <button id="nextPage">Suivant</button>
  </div>
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
</body>
<script type="module" src="../dist/produits.js"></script>

</html>