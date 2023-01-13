import { clickMenu, clickHome, clickLogin } from "../global/hearder.js";
import { newUser } from "./request.js";
import { messageAlert } from "../global/message.js";

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

function eventClickLogin() {
  const buttonLogin = document.querySelector(".nav--button-2");

  buttonLogin.addEventListener("click", () => {
    clickLogin();
  });
}

function register() {
  const buttonRegistration = document.querySelector(".register");
  const inputName = document.querySelector(".name");
  const inputEmail = document.querySelector(".email");
  const inputPassword = document.querySelector(".password");
  const selectProfissional = document.querySelector(".select");

  buttonRegistration.addEventListener("click", async (e) => {
    e.preventDefault();
    
    let registration = {
      username: inputName.value,
      password: inputPassword.value,
      email: inputEmail.value,
      professional_level: selectProfissional.value,
    };

    let user = await newUser(registration);

    if (!user.error) {
      messageAlert("Cadastro realizado com sucesso!", "blue");
      setTimeout(() => {
        window.location.replace("/src/pages/login.html");
      }, 2500);
    } else {
      messageAlert(user.error, "red");
      setTimeout(() => {
        const message = document.querySelector(".message");

        message.remove();
      }, 5000);
    }
  });
};

function returnHome () {
  const button = document.querySelector(".return");

  button.addEventListener("click", (e) => {
    e.preventDefault();

    window.location.replace("/");
  });
};

eventClickMenu();
eventClickHome();
eventClickLogin();
register();
returnHome();
