import { db, auth } from "./firebase.js";

import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const ordersContainer =
  document.getElementById("ordersContainer");

async function loadOrders(){

  const user = auth.currentUser;

  if(!user){

    ordersContainer.innerHTML =
      "<h2>Please Login</h2>";

    return;

  }

  const q = query(
    collection(db, "orders"),
    where("userId", "==", user.uid)
  );

  const querySnapshot =
    await getDocs(q);

  if(querySnapshot.empty){

    ordersContainer.innerHTML =
      "<h2>No Orders Found</h2>";

    return;

  }

  querySnapshot.forEach((doc) => {

    const order = doc.data();

    ordersContainer.innerHTML += `

      <div class="order-card">

        <h3>
          Order Total:
          ₹${order.totalPrice}
        </h3>

        <p>
          Items:
          ${order.items.length}
        </p>

      </div>

    `;

  });

}

// Wait For Auth
auth.onAuthStateChanged(() => {

  loadOrders();

});