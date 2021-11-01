/* ---------------------------- Global constants ---------------------------- */
const BASE_URL = "https://ctd-todo-api.herokuapp.com/v1";

/* --------------------------- Traer nodos del DOM -------------------------- */
const getId = (id) => document.getElementById(id);
const getOne = (query) => document.querySelector(query);
const getAll = (query) => document.querySelectorAll(query);
/* -------------------------- Traer la fecha actual ------------------------- */
const getDate = () => new Date();

/* -------------------- Traer y guardar en Local Storage -------------------- */
const getStorage = (key) => JSON.parse(localStorage.getItem(key));
const setStorage = (key, array) =>
  localStorage.setItem(key, JSON.stringify(array));

/* ------------------ Validar que el string no este vacíop ------------------ */
const validateString = (str) => str !== "" && str.length !== 0;

/* -- Validar un objeto con todos los valores de los inputs del formulario -- */
const validateInputNotEmpty = (user) => {
  let result = true
  for (const input in user) {
    if (Object.hasOwnProperty.call(user, input)) {
      const value = user[input];
      if(!(value && validateString(value))) result = false;
    }
  }
  return result;
};

/* ---------------------- Validar una contraseña o dos ---------------------- */
const validatePasswords = (pass1, pass2) => {
  if (pass2) {
    if (
      !validateString(pass1) ||
      !validateString(pass2) ||
      pass1 !== pass2 
    )
      return false;
    else return true;
  } else {
    if (pass1 === "") return false;
    else return true;
  }
};

/* --------------------- Validar el formulario completo --------------------- */
const validateForm = (user) =>
  validateInputNotEmpty(user) &&
  validatePasswords(user.password, user.password2 ? user.password2 : false);

/* ------------------------- Hacer un fetch a la URL ------------------------ */
const fetchFromURL = (url, config) =>
  fetch(url, config).then((response) => response.json());

const fetchForm = (url, config) =>
  fetchFromURL(url, config).then((resp) => {
    console.log("Recurso creado:");
    console.log(resp);
    return resp
  });

