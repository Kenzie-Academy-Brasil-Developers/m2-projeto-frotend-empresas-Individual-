import {
  requestTypeUser,
  getDepartmentsAdm,
  getAllUserAdm,
  getUserAdm,
  requestSectors,
  createDepartment,
  deleteDepartment,
  editDepartment,
  editUser,
  deleteUser,
} from "../home/request.js";
import { clickLogout } from "../global/hearder.js";
import {
  renderModalUsersDepartment,
  renderModalCreateDepartment,
  renderModalEditDepartment,
  renderModalDeleteDepartment,
  renderModalEditUser,
  renderModalDeleteUser,
} from "./modal.js";
import { messageAlert } from "../global/message.js";

async function typeUser() {
  let isAdmin = await requestTypeUser();

  if (!isAdmin.is_admin) {
    window.location.replace("/src/pages/dashbordUser.html");
  }
}

function eventClickLogout() {
  const buttonLogout = document.querySelector(".nav--button-1");

  buttonLogout.addEventListener("click", () => {
    localStorage.removeItem("Token");
    setTimeout(() => clickLogout(), 500);
  });
}

async function renderDepartments() {
  const sectionDepartment = document.querySelector(".section__department");
  const selectCompany = document.querySelector("#select__company");
  const sectionDespartment = document.querySelector(".section__department");

  let departments = await getDepartmentsAdm();

  departments.forEach((department, index) => {
    const option = document.createElement("option");

    option.innerText = department.name;
    option.value = department.name;

    selectCompany.appendChild(option);

    selectCompany.addEventListener("change", () => {
      if (index === 0) {
        sectionDespartment.innerHTML = "";
      }

      if (
        department.name === selectCompany.value ||
        selectCompany.value === "select"
      ) {
        sectionDepartment.insertAdjacentHTML(
          "beforeend",
          `
          <div class="department">
            <h3>${department.name}</h3>
            <p class="description">${department.description}</p>
            <span>${department.companies.name}</span>
            <div>
              <img class="visibility__company" src="../img/visibility.svg" alt="" />
              <img class="edit__company" src="../img/edit-1.svg" alt="" />
              <img class="delete__company" src="../img/delete.svg" alt="" />
          </div>
        </div>
          `
        );
      }
    });
    if (
      department.name === selectCompany.value ||
      selectCompany.value === "select"
    ) {
      sectionDepartment.insertAdjacentHTML(
        "beforeend",
        `
        <div class="department">
          <h3>${department.name}</h3>
          <p class="description">${department.description}</p>
          <span>${department.companies.name}</span>
          <div>
            <img class="visibility__company" src="../img/visibility.svg" alt="" />
            <img class="edit__company" src="../img/edit-1.svg" alt="" />
            <img class="delete__company" src="../img/delete.svg" alt="" />
        </div>
      </div>
        `
      );
    }
  });
}

async function renderUsers() {
  const sectionUser = document.querySelector(".section__user");

  let users = await getAllUserAdm();

  users.forEach((user) => {
    sectionUser.insertAdjacentHTML(
      "beforeend",
      `
    <div class="users">
      <h3>${user.username}</h3>
      <p class="capitalized">${user.professional_level}</p>
      <span>${user.department_uuid}</span>
      <div>
        <img class="edit__user" src="../img/edit-2.svg" alt="" />
        <img class="delete__user" src="../img/delete.svg" alt="" />
      </div>
    </div>
    `
    );

    const department = document.querySelectorAll(".users > span");

    department.forEach((name) => {
      if (name.innerText === "null") {
        name.innerText = "Sem departamento";
      }
    });
  });
}

function eventRenderModalUsersDepartment() {
  const visibilitys = document.querySelectorAll(".visibility__company");
  const department = document.querySelectorAll(".department");

  visibilitys.forEach((visibility, index) => {
    visibility.addEventListener("click", async () => {
      await renderModalUsersDepartment(
        {
          name: department[index].children[0].innerText,
          description: department[index].children[1].innerText,
          company: department[index].children[2].innerText,
        },
        index
      );

      const close = document.querySelector(".close__modal");

      close.addEventListener("click", () => {
        const modal = document.querySelector(".container__modal");

        modal.remove();

        window.location.replace("/src/pages/dashbordAdm.html")
      });
    });
  });
}

function eventRenderModalCreateDepartment() {
  const buttonCreate = document.querySelector(".create");

  buttonCreate.addEventListener("click", () => {
    renderModalCreateDepartment();

    const createDepartmentSubmit = document.querySelector(
      ".create__department--submit"
    );

    createDepartmentSubmit.addEventListener("click", async (e) => {
      e.preventDefault();

      const inputName = document.querySelector(
        ".create__department--department__name"
      );
      const inputDescruption = document.querySelector(
        ".create__department--department__description"
      );
      const selectCompany = document.querySelector(
        "#create__department--select"
      );

      const companies = await requestSectors();

      let companyFilter = companies.filter(
        (company) => company.name === selectCompany.value
      );

      let creator = {
        name: inputName.value,
        description: inputDescruption.value,
        company_uuid: companyFilter[0].uuid,
      };

      await createDepartment(creator);

      messageAlert("Departamento adicionado com sucesso!", "green");
      setTimeout(() => {
        document.querySelector(".container__modal").remove();

        window.location.replace("/src/pages/dashbordAdm.html");
      }, 3000);
    });

    const close = document.querySelector(".close");

    close.addEventListener("click", () => {
      const modal = document.querySelector(".container__modal");

      modal.remove();
    });
  });
}

async function eventRenderModalEditDepartment() {
  const editCompany = document.querySelectorAll(".edit__company");
  const description = document.querySelectorAll(".description");

  let department = await getDepartmentsAdm();

  editCompany.forEach((edit, index) => {
    edit.addEventListener("click", () => {
      renderModalEditDepartment(description[index].innerText);

      const buttonSubmitSave = document.querySelector(".submit__save");

      buttonSubmitSave.addEventListener("click", (e) => {
        e.preventDefault();

        const descriptionEdit = document.querySelector(".description__edit");

        let obj = {
          description: descriptionEdit.value,
        };
        editDepartment(obj, department[index].uuid);

        messageAlert("Departamento editado com sucesso!", "green");

        setTimeout(() => {
          document.querySelector(".container__main").remove();

          window.location.replace("/src/pages/dashbordAdm.html");
        }, 3000);
      });

      const closeModal = document.querySelector(".close__edit");

      closeModal.addEventListener("click", () => {
        const modal = document.querySelector(".container__modal");

        modal.remove();
      });
    });
  });
}

async function eventRenderModalDeleteDepartment() {
  const deleteCompany = document.querySelectorAll(".delete__company");
  const department = document.querySelectorAll(".department");

  const departments = await getDepartmentsAdm()
  
  deleteCompany.forEach((del, index) => {
    del.addEventListener("click", () => {
      console.log(departments[index].uuid)
      renderModalDeleteDepartment(`${department[index].children[0].innerText} - ${department[index].children[1].innerText}`);

      const buttonDelete = document.querySelector(".submit__delete");

      buttonDelete.addEventListener("click", async () => {
        console.log(await deleteDepartment(departments[index].uuid))

        setTimeout(() => window.location.replace("/src/pages/dashbordAdm.html"),500)
      })

      const close = document.querySelector(".close__delete");

      close.addEventListener("click", () => {
        const modal = document.querySelector(".container__modal");

        modal.remove();
      });
    });
  });
}

function eventRenderModalEditUser() {
  const buttonEdit = document.querySelectorAll(".edit__user");
  const userName = document.querySelectorAll(".users > h3");

  buttonEdit.forEach((edit, index) => {
    edit.addEventListener("click", (e) => {
      e.preventDefault();

      renderModalEditUser();

      const closeModal = document.querySelector(".close--edit__user");

      closeModal.addEventListener("click", () => {
        const modal = document.querySelector(".container__modal");

        modal.remove();
      });

      const buttonEdit = document.querySelector(".button__edit");

      buttonEdit.addEventListener("click", async (e) => {
        e.preventDefault();

        const users = await getAllUserAdm();

        users.forEach(async (user) => {
          if (user.username === userName[index].innerText) {
            console.log(user.uuid);

            const selectModality = document.querySelector(
              "#select__modality__of__work"
            );
            const professionalLevel = document.querySelector(
              "#select__professional__level"
            );

            let body = {
              kind_of_work: selectModality.value,
              professional_level: professionalLevel.value,
            };

            await editUser(body, user.uuid);

            setTimeout(
              () => window.location.replace("/src/pages/dashbordAdm.html"),
              500
            );

            console.log(body);
          }
        });
      });
    });
  });
}

function eventRenderModalDeleteUser() {
  const deleteUsers = document.querySelectorAll(".delete__user");
  const name = document.querySelectorAll(".users > h3");

  deleteUsers.forEach((deleteU, index) => {
    deleteU.addEventListener("click", () => {
      renderModalDeleteUser(name[index].innerText, index);

      const closeModal = document.querySelector(".close__delete__user");

      closeModal.addEventListener("click", () => {
        const modal = document.querySelector(".container__modal");

        modal.remove();
      });

      const buttonDelete = document.querySelector(".delete");

      buttonDelete.addEventListener("click", async () => {
        const users = await getAllUserAdm();

        await deleteUser(users[index].uuid);

        setTimeout(() => {
          const modal = document.querySelector(".container__modal");

          modal.remove();

          window.location.replace("/src/pages/dashbordAdm.html");
        }, 1000);
      });
    });
  });
}

typeUser();
eventClickLogout();
await renderDepartments();
await renderUsers();
eventRenderModalUsersDepartment();
eventRenderModalCreateDepartment();
eventRenderModalEditDepartment();
eventRenderModalDeleteDepartment();
eventRenderModalEditUser();
eventRenderModalDeleteUser();
