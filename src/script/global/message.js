export function messageAlert(message, color) {
  const body = document.querySelector("body");

  const divMessage = document.createElement("div");
  const pMessage = document.createElement("p");

  divMessage.classList.add("message");

  divMessage.style.backgroundColor = color;
  pMessage.innerText = message;

  divMessage.appendChild(pMessage);
  body.appendChild(divMessage);
}
