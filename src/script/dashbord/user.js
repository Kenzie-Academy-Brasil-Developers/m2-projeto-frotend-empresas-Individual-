import { clickLogout } from "../global/hearder.js";
import {
  getUserDetals,
  requestTypeUser,
  editProfile,
  getColleagues,
} from "../home/request.js";
import { renderModalEditProfile } from "../dashbord/modal.js";
import { messageAlert } from "../global/message.js";

async function typeUser() {
  let isAdmin = await requestTypeUser();

  if (isAdmin.is_admin) {
    window.location.replace("/src/pages/dashbordAdm.html");
  }
}

function eventClickLogout() {
  const buttonLogout = document.querySelector(".nav--button-1");

  buttonLogout.addEventListener("click", () => {
    localStorage.removeItem("Token");
    setTimeout(() => clickLogout(), 500);
  });
}

async function getUserDetalsAndRender() {
  let userDetals = await getUserDetals();

  const divProfileDetals = document.querySelector(".profile--detals");

  const username = document.createElement("h3");
  const divDetals = document.createElement("div");
  const spanEmail = document.createElement("span");
  const spanLevel = document.createElement("span");
  const spanModality = document.createElement("span");

  username.innerText = userDetals.username;
  spanEmail.innerText = `Email: ${userDetals.email}`;
  spanLevel.innerText = userDetals.professional_level;
  spanModality.innerText = "Home Office";

  username.classList.add("username");

  divDetals.append(spanEmail, spanLevel, spanModality);
  divProfileDetals.append(username, divDetals);
}

async function renderColleagues() {
  const sectionUser = document.querySelector(".container__sector__user");

  const userDetals = await getUserDetals();
  const colleagues = await getColleagues();

  if (userDetals.department_uuid === null) {
    const p = document.createElement("p");

    p.innerText = "Você ainda não foi contratado";

    sectionUser.appendChild(p);
  } else {
    sectionUser.insertAdjacentHTML(
      "beforeend",
      `
      <h2>${colleagues[0].name} - ${colleagues[0].description} </h2>
        <div class="colleagues"></div>
      `
    );
    colleagues[0].users.forEach((user) => {
      const divColleagues = document.querySelector(".colleagues");

      divColleagues.insertAdjacentHTML(
        "beforeend",
        `
        <div class="classmate">
         <h3>${user.username}</h3>
         <span>${user.professional_level}</span>
        </div>
        `
      );
    });
  }
}

function eventRenderModalEditProfile() {
  const edit = document.querySelector(".edit");

  edit.addEventListener("click", () => {
    renderModalEditProfile();

    const submitEditProfile = document.querySelector(".submit--edit__profile");

    const name = document.querySelector(".name");
    const email = document.querySelector(".email");
    const password = document.querySelector(".password");

    submitEditProfile.addEventListener("click", async (e) => {
      e.preventDefault();

      await editProfile({
        username: name.value,
        passaword: password.value,
        email: email.value,
      });

      messageAlert("Perfil editado com sucesso", "green")

      setTimeout(
        () => window.location.replace("/src/pages/dashbordUser.html"),
        2000
      );
    });

    const closeModal = document.querySelector(".close__modal--edit__profile");

    closeModal.addEventListener("click", () => {
      const modal = document.querySelector(".container__modal");

      modal.remove();
    });
  });
}

typeUser();
eventClickLogout();
getUserDetalsAndRender();
renderColleagues();
eventRenderModalEditProfile();
