import { auth } from "./firebase.js";
import { showToast } from "./toast.js";

const checkoutBtn =
  document.getElementById("checkoutBtn");

const cartContainer =
  document.getElementById("cartContainer");

const cartTotal =
  document.getElementById("cartTotal");

let cart =
  JSON.parse(
    localStorage.getItem("cart")
  ) || [];

function loadCart(){

  cartContainer.innerHTML = "";

  let total = 0;

  if(cart.length === 0){

    cartContainer.innerHTML =
      "<h2>Cart is Empty</h2>";

    cartTotal.innerHTML =
      "Total: ₹0";

    return;

  }

  cart.forEach((item,index)=>{

    total +=
      item.price * item.quantity;

    cartContainer.innerHTML += `

      <div class="cart-item">

        <img src="${item.image}" />

        <div class="cart-info">

          <h3>${item.title}</h3>

          <p>₹${item.price}</p>

          <p>
            Quantity:
            ${item.quantity}
          </p>

          <button
          onclick="removeItem(${index})">

            Remove

          </button>

        </div>

      </div>

    `;

  });

  cartTotal.innerHTML =
    `Total: ₹${total}`;

}

window.removeItem =
function(index){

  cart.splice(index,1);

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  loadCart();

}

loadCart();

/* CHECKOUT */

checkoutBtn.addEventListener(
"click",
async()=>{

  const user =
    auth.currentUser;

  if(!user){

    showToast(
      "Please Login First",
      "error"
    );

    window.location.href =
      "login.html";

    return;

  }

  if(cart.length === 0){

    showToast(
      "Cart is Empty",
      "error"
    );

    return;

  }

  let total = 0;

  cart.forEach(item=>{

    total +=
      item.price *
      item.quantity;

  });

  try{

    // Send Order To Express

    const response =
    await fetch(
    "http://localhost:5000/api/orders",
    {

      method:"POST",

      headers:{
        "Content-Type":
        "application/json"
      },

      body:JSON.stringify({

        userId:user.uid,

        items:cart,

        totalPrice:total

      })

    });

    const data =
      await response.json();

    console.log(data);

    // Clear Cart

    localStorage.removeItem(
      "cart"
    );

    cart = [];

    loadCart();

    showToast(
      "Order Placed Successfully"
    );

  }
  catch(error){

    console.log(error);

    showToast(
      "Order Failed",
      "error"
    );

  }

});