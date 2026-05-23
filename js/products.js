import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const productsContainer =
  document.getElementById("productsContainer");

async function loadProducts(){

  const querySnapshot =
    await getDocs(collection(db, "products"));

  productsContainer.innerHTML = "";

  querySnapshot.forEach((doc) => {

    const product = doc.data();

    productsContainer.innerHTML += `

      <div class="product-card">

<img
  src="${product.image}"
  onerror="this.src='https://via.placeholder.com/300'"
/>

        <div class="product-info">

          <h3>${product.title}</h3>

          <p>₹${product.price}</p>

<button onclick="viewProduct('${doc.id}')">
  View Details
</button>

        </div>

      </div>

    `;

  });

}

loadProducts();
window.viewProduct = function(id){

  window.location.href =
    `product.html?id=${id}`;

}