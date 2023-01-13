import { clickMenu, clickHome, clickRegistration } from "../global/hearder.js";
import { requestLogin, requestTypeUser } from "./request.js";
import { messageAlert } from "../global/message.js"

async function typeUser() {
  let isAdmin = await requestTypeUser()
  
  if(!isAdmin.is_admin) {
    window.location.replace("/src/pages/dashbordUser.html")
  } else if (isAdmin.is_admin) {
    window.location.replace("/src/pages/dashbordAdm.html")
  }

}

function eventClickMenu() {
  const menu = document.querySelector(".menu");
  const buttonMenu = document.querySelector(".container__nav");

  menu.addEventListener("click", () => {
    clickMenu(menu, buttonMenu);
  });
}

function eventClickHome() {
  const buttonHome = document.querySelector(".nav--button-1");

  buttonHome.addEventListener("click", () => {
    clickHome();
  });
}

function eventClickRegistration() {
  const buttonRegistration = document.querySelector(".nav--button-2");
  const buttonRegistrationForm = document.querySelector(".registration");

  buttonRegistration.addEventListener("click", () => {
    clickRegistration();
  });
  buttonRegistrationForm.addEventListener("click", (e) => {
    e.preventDefault();

    clickRegistration();
  });
}

function eventClickLogin() {
  const buttonLogin = document.querySelector(".login");
  const emailValue = document.querySelector(".email");
  const passwordValue = document.querySelector(".password");

  buttonLogin.addEventListener("click", async (e) => {
    e.preventDefault();

    localStorage.removeItem("Token");

    let login = {
      email: emailValue.value,
      password: passwordValue.value,
    };

    let token = await requestLogin(login);

    localStorage.setItem("Token", JSON.stringify(token));

    let isAdm = await requestTypeUser();

    setTimeout(() => {
      if (isAdm.erro) {
        messageAlert("Por favor, verifique seu email e senha", "red")
      } else if (isAdm.is_admin) {
         window.location.replace("/src/pages/dashbordAdm.html");
      } else if (!isAdm.is_admin) {
        window.location.replace("/src/pages/dashbordUser.html");
      }
    }, 500);

    setTimeout(() => {
      const message = document.querySelector(".message");

      message.remove()
    }, 5000)
  });
}

typeUser()
eventClickMenu();
eventClickHome();
eventClickRegistration();
eventClickLogin();
