import { db } from "./firebase.js";
import { showToast } from "./toast.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Get Product ID
const params =
  new URLSearchParams(window.location.search);

const productId = params.get("id");

const productDetails =
  document.getElementById("productDetails");

async function loadProduct(){

  const docRef =
    doc(db, "products", productId);

  const docSnap =
    await getDoc(docRef);

  if(docSnap.exists()){

    const product = {
      id: docSnap.id,
      ...docSnap.data()
    };

    productDetails.innerHTML = `

      <div class="details-container">

<img
  src="${product.image}"
  onerror="this.src='https://via.placeholder.com/400'"
/>

        <div class="details-info">

          <h1>${product.title}</h1>

          <p>${product.description}</p>

          <h2>₹${product.price}</h2>

          <button id="addToCartBtn">
            Add To Cart
          </button>

        </div>

      </div>

    `;

    // Add To Cart
    const addToCartBtn =
      document.getElementById("addToCartBtn");

    addToCartBtn.addEventListener("click", () => {

      let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

      const existingProduct =
        cart.find(item => item.id === productId);

      if(existingProduct){

        existingProduct.quantity += 1;

      }
      else{

        cart.push({
          ...product,
          quantity:1
        });

      }

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );

      showToast("Added To Cart");

    });

  }
  else{

    productDetails.innerHTML =
      "<h2>Product Not Found</h2>";

  }

}

loadProduct();