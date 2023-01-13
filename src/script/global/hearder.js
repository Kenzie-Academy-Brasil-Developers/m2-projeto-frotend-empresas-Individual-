export function clickMenu(menu, nav) {
  if (menu.classList.value.includes("menu")) {
    menu.src = "/src/img/close.svg";
    menu.classList.remove("menu");

    nav.style.display = "flex";
  } else {
    menu.src = "/src/img/menu.svg";
    menu.classList.add("menu");

    nav.style.display = "none";
  }
}

export function clickLogin() {
  window.location.replace("/src/pages/login.html");
}

export function clickRegistration() {
  window.location.replace("/src/pages/registration.html");
}

export function clickHome() {
  window.location.replace("/");
}

export function clickLogout() {
  window.location.replace("/src/pages/login.html");
}
