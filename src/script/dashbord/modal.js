import {
  getUserAdm,
  getAllUserAdm,
  requestSectors,
  getDepartmentsAdm,
  toHire,
  dismissDepartment,
} from "../home/request.js";

export async function renderModalUsersDepartment(obj, index) {
  const body = document.querySelector("body");

  const company = await getDepartmentsAdm();

  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <div class="container__modal">
        <div class="sticky">
          <section class="modal">
            <img class="close__modal" src="../img/close.svg" alt="" />
            <h2>${obj.name}</h2>
            <section class="section--top">
              <div class="top__department">
                <p>${obj.description}</p>
                <span>${obj.company}</span>
              </div>
              <div class="get__user">
                <select id="select__user">
                  <option value="">Selecionar usuário</option>
                </select>
                <button class="button__toHire">Contratar</button>
              </div>
            </section>
              <div></div>
            <section class="section--bottom">
              <div></div>
            </section>
        </div>
      </div>
      `
  );

  const users = await getUserAdm();
  const select = document.querySelector("#select__user");
  const buttonToHire = document.querySelector(".button__toHire");

  users.forEach((user) => {
    const option = document.createElement("option");

    option.innerText = user.username;
    option.value = user.username;

    select.append(option);
  });

  buttonToHire.addEventListener("click", () => {
    users.forEach((user) => {
      if (user.username === select.value) {
        toHire({
          user_uuid: user.uuid,
          department_uuid: company[index].uuid,
        });
      }
    });
  });

  const allUsers = await getAllUserAdm();

  allUsers.forEach((user, i) => {
    const companyId = company[index].uuid;
    const companyName = company[index].name;

    function renderUsersHired() {
      if (user.department_uuid === companyId) {
        const sectionBottom = document.querySelector(".section--bottom > div");

        sectionBottom.insertAdjacentHTML(
          "beforeend",
          `
            <div class="users users--modal">
              <h3>${user.username}</h3>
              <p>${user.professional_level}</p>
              <span>${companyName}</span>
              <div>
                <button class="dismiss">Desligar</button>
              </div>
            </div>
            `
        );

        setTimeout(() => {
          const buttonDismiss = document.querySelectorAll(".dismiss");

          buttonDismiss.forEach((button) => {
            button.addEventListener("click", async () => {
              dismissDepartment(user.uuid);

              button.innerText = "Demitido";
              button.classList.remove("dismiss");
              button.classList.add("toHire");
            });
          }, 100);
        });
      }
    }

    buttonToHire.addEventListener("click", () => {
      const divSectionBottom = document.querySelector(".section--bottom > div");

      divSectionBottom.innerHTML = ""
      renderUsersHired();
    });

    renderUsersHired();
  });
}

export async function renderModalCreateDepartment() {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="container__modal">
     <section class="modal__create">
      <img class="close" src="../img/close.svg" alt="">
      <h2>Criar Departamentos</h2>
      <form class="create__department--form">
        <input class="create__department--department__name" type="text" placeholder="Nome do departamento">
        <input class="create__department--department__description" type="text" placeholder="Descrição">
        <select id="create__department--select">
          <option value="">Selecionar empresa</option>
        </select>
        <button class="create__department--submit">Criar o departamento</button>
      </form>
     </section>
    </div>
    `
  );

  const selectCompany = document.querySelector("#create__department--select");

  let companies = await requestSectors();

  companies.forEach((company) => {
    const optionCompany = document.createElement("option");

    optionCompany.innerText = company.name;
    optionCompany.value = company.name;

    selectCompany.appendChild(optionCompany);
  });
}

export function renderModalEditDepartment(value) {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="container__modal">
      <section class="modal--edit__department">
        <img class="close__edit" src="../img/close.svg" alt="">
        <h2>Editar Departamento</h2>
        <textarea class="description__edit" id="" cols="30" rows="8" placeholder="Volores anteriores da descrição">${value}</textarea>
        <button class="submit__save">Salvar alterações</button>
      </section>
    </div>
    `
  );
}

export function renderModalDeleteDepartment(name) {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="container__modal">
      <section class="modal__delete">
        <img class="close__delete" src="../img/close.svg" alt="" />
        <h2>
          Realmente deseja deletar o Departamento ${name} e demitir seus
          funcionários?
        </h2>
        <button class="submit__delete">Confirmar</button>
      </section>
    </div>
    `
  );
}

export function renderModalEditUser() {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="container__modal">
      <section class="modal--edit__user">
        <img class="close--edit__user" src="../img/close.svg" alt="">
        <h2>Editar Usuário</h2>
        <form class="form--select">
          <select id="select__modality__of__work">
            <option value="">Selecionar modalidade de trabalho</option>
            <option value="home office">Home Ofice</option>
            <option value="hibrido">Hibrido</option>
            <option value="presencial">Presencial</option>
          </select>
            <select id="select__professional__level">
            <option value="">Selecionar nível proficional</option>
            <option value="estágio">Estágio</option>
            <option value="júnior">Júnior</option>
            <option value="pleno">Pleno</option>
            <option value="sênior">Sênior</option>
          </select>
          <button class="button__edit">Editar</button>
        </form>
      </section>
    </div>
    `
  );
}

export function renderModalDeleteUser(name, index) {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="container__modal">
      <section class="modal--delete__user">
        <img class="close__delete__user" src="../img/close.svg" alt="">
        <h2>Realmente deseja remover o usuátio ${name}?</h2>
        <button class="delete">Deletar</button>
      </section>
    </div>
    `
  );
}

// user

export function renderModalEditProfile() {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="container__modal">
      <section class="container__edit__profile">
        <img class="close__modal--edit__profile" src="../img/close.svg" alt="">
        <h2>Editar Perfil</h2>
        <form class="form__edit__profile">
          <input class="name" type="text" placeholder="Seu nome">
          <input class="email" type="email" placeholder="Seu e-mail">
          <input class="password" type="password" placeholder="Sua senha">
          <button class="submit--edit__profile">Editar perfil</button>
        </form>
      </section>
    </div>
    `
  );
}
