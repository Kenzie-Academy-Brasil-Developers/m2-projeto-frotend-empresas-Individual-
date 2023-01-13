let authorization;
const url = "http://localhost:6278";
let contentType = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${authorization}`,
};

// lista de empresas

export async function requestSectors() {
  const sectors = await fetch(`${url}/companies`, {
    method: "GET",
    headers: contentType,
  });

  return await sectors.json();
}

// Listar empresas por setor

export async function requestCompanyForSector(sector) {
  const sectorsForSectors = await fetch(`${url}/companies/${sector}`, {
    method: "GET",
    headers: contentType,
  });

  return await sectorsForSectors.json();
}

// cadastro

export async function newUser(register) {
  const postNewUser = await fetch(`${url}/auth/register`, {
    method: "POST",
    headers: contentType,
    body: JSON.stringify(register),
  })
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch((err) => console.log(err));

  return postNewUser;
}

// login do usuario

export async function requestLogin(login) {
  const userLoginToken = await fetch(`${url}/auth/login`, {
    method: "POST",
    headers: contentType,
    body: JSON.stringify(login),
  })
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch((err) => console.log(err));

  return userLoginToken;
}

// tipo de usuario ADM ou USER

export async function requestTypeUser() {
  authorization = JSON.parse(localStorage.getItem("Token")).token;

  const typeUser = await fetch(`${url}/auth/validate_user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authorization}`,
    },
  })
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch((err) => console.log(err));

  return typeUser;
}

// Detales do usuario

export async function getUserDetals() {
  authorization = JSON.parse(localStorage.getItem("Token")).token;

  const getUser = await fetch(`${url}/users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authorization}`,
    },
  })
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch((err) => console.log(err));

  return getUser;
}

// Lista de departamentos - ADM

export async function getDepartmentsAdm() {
  authorization = JSON.parse(localStorage.getItem("Token")).token;

  const getDepartments = await fetch(`${url}/departments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authorization}`,
    },
  })
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch((err) => console.log(err));

  return getDepartments;
}

// Lista de usuarios sem dapartamentos - ADM

export async function getUserAdm() {
  authorization = JSON.parse(localStorage.getItem("Token")).token;

  const getUsers = await fetch(`${url}/admin/out_of_work`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authorization}`,
    },
  })
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch((err) => console.log(err));
  return getUsers;
}

// Listar todos os usuarios

export async function getAllUserAdm() {
  authorization = JSON.parse(localStorage.getItem("Token")).token;

  const getUsers = await fetch(`${url}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authorization}`,
    },
  })
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch((err) => console.log(err));
  return getUsers;
}

// Criação de departamentos

export async function createDepartment(obj) {
  authorization = JSON.parse(localStorage.getItem("Token")).token;

  const create = await fetch(`${url}/departments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authorization}`,
    },
    body: JSON.stringify(obj),
  })
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch((err) => console.log(err));

  return create;
}

// Editar departamentos

export async function editDepartment(obj, id) {
  authorization = JSON.parse(localStorage.getItem("Token")).token;

  const edit = await fetch(`${url}/departments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authorization}`,
    },
    body: JSON.stringify(obj),
  })
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch((err) => console.log(err));

  return edit;
}

// Contratar funcionarios

export async function toHire(obj) {
  authorization = JSON.parse(localStorage.getItem("Token")).token;

  const create = await fetch(`${url}/departments/hire`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authorization}`,
    },
    body: JSON.stringify(obj),
  })
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch((err) => console.log(err));

  return create;
}

// Demitir usuarios

export async function dismissDepartment(id) {
  authorization = JSON.parse(localStorage.getItem("Token")).token;

  const edit = await fetch(`${url}/departments/dismiss/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authorization}`,
    }
  })
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch((err) => console.log(err));

  return edit;
}

// Deletar departamento

export async function deleteDepartment(id) {
  authorization = JSON.parse(localStorage.getItem("Token")).token;

  const edit = await fetch(`${url}/departments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authorization}`,
    }
  })
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch((err) => console.log(err));

  return edit;
}

// Editar usuários

export async function editUser(obj ,id) {
  authorization = JSON.parse(localStorage.getItem("Token")).token;

  const editUsers = await fetch(`${url}/admin/update_user/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authorization}`,
    },
    body: JSON.stringify(obj)
  })
  .then(resp => resp.json())
  .then(resp => resp)
  .catch(err => console.log(err))

  return editUsers;
}

// Deletar usuários

export async function deleteUser(id) {
  authorization = JSON.parse(localStorage.getItem("Token")).token;

  const deleteUsers = await fetch(`${url}/admin/delete_user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authorization}`,
    }
  })
  .then(resp => resp.json())
  .then(resp => resp)
  .catch(err => console.log(err))

  return deleteUsers;
}

// Editar informações do usuario

export async function editProfile(obj) {
  authorization = JSON.parse(localStorage.getItem("Token")).token;

  const editUsers = await fetch(`${url}/users`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authorization}`,
    },
    body: JSON.stringify(obj)
  })
  .then(resp => resp.json())
  .then(resp => resp)
  .catch(err => console.log(err))

  return editUsers;
}

// Listar todo funcionarios de um mesmo departamento

export async function getColleagues() {
  authorization = JSON.parse(localStorage.getItem("Token")).token;

  const getClassmate = await fetch(`${url}/users/departments/coworkers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authorization}`,
    },
  })
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch((err) => console.log(err));
  return getClassmate;
}