export function showToast(message, type="success"){

  const toast =
    document.getElementById("toast");

  const div =
    document.createElement("div");

  div.className =
    `toast-message ${type}`;

  div.innerText = message;

  toast.appendChild(div);

  setTimeout(() => {

    div.remove();

  }, 3000);

}