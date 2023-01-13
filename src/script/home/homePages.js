import { clickMenu, clickLogin, clickRegistration } from "../global/hearder.js";
import {
  requestSectors,
  requestTypeUser,
  requestCompanyForSector,
} from "./request.js";

async function typeUser() {
  let isAdmin = await requestTypeUser();

  if (!isAdmin.is_admin) {
    window.location.replace("/src/pages/dashbordUser.html");
  } else if (isAdmin.is_admin) {
    window.location.replace("/src/pages/dashbordAdm.html");
  }
}

function eventClickMenu() {
  const menu = document.querySelector(".menu");
  const buttonNav = document.querySelector(".container__nav");

  menu.addEventListener("click", () => {
    clickMenu(menu, buttonNav);
  });
}

function eventClickLogin() {
  const buttonLogin = document.querySelector(".nav--button-1");

  buttonLogin.addEventListener("click", () => clickLogin());
}

function eventClickRegistration() {
  const buttonRegistration = document.querySelector(".nav--button-2");

  buttonRegistration.addEventListener("click", () => clickRegistration());
}

async function optionSectors() {
  const selectSector = document.querySelector(".select__sector");

  let sectors = await requestSectors();

  sectors.forEach((sector) => {
    const optionSector = document.createElement("option");

    optionSector.innerText = sector.name;
    optionSector.value = sector.name;

    selectSector.appendChild(optionSector);
  });
}

async function renderSector() {
  const divSectors = document.querySelector(".sectors > div");
  const selectSector = document.querySelector(".select__sector");

  let companys = await requestCompanyForSector(selectSector.value);

  console.log(selectSector.value);

  companys.forEach((company) => {
    if (selectSector.value === company.name || selectSector.value === "") {
      divSectors.insertAdjacentHTML(
        "beforeend",
        `
       <div class="company">
         <h3>${company.name}</h3>
         <div class="company--bottom">
           <span>${company.opening_hours}horas</span>
           <button>${company.sectors.description}</button>
         </div>
       </div>   
      `
      );
    }
  });

  selectSector.addEventListener("change", () => {
    console.log(selectSector.value);
    companys.forEach((company, index) => {
      if (index === 0) {
        divSectors.innerHTML = "";
      }
      if (selectSector.value === company.name || selectSector.value === "") {
        divSectors.insertAdjacentHTML(
          "beforeend",
          `
           <div class="company">
             <h3>${company.name}</h3>
             <div class="company--bottom">
               <span>${company.opening_hours}horas</span>
               <button>${company.sectors.description}</button>
             </div>
           </div>   
          `
        );
      }
    });
  });
}

typeUser();
eventClickMenu();
eventClickLogin();
eventClickRegistration();
await optionSectors();
renderSector();
