/* -------------------------------------------------------------------------- */
/*                       General Variables and Functions                      */
/* -------------------------------------------------------------------------- */

const LOGIN_URL = BASE_URL + "/users/login";

/* -------------------------------------------------------------------------- */
/*                                    Login                                   */
/* -------------------------------------------------------------------------- */

getId("login-submit").addEventListener("click", (e) => {
  e.preventDefault();
  const user = {
    email: validateRegexEmail(getId("login-email").value.toLowerCase().trim())
      ? getId("login-email").value.toLowerCase().trim()
      : null,
    password: getId("login-pass").value.trim(),
  };
  if (validateForm(user)) {
    const payload = JSON.stringify(user);
    const config = {
      method: "POST",
      body: payload,
      headers: {
        "Content-type": "application/json",
      },
    };
    fetchForm(LOGIN_URL, config).then((resp) => {
      setStorage("token", resp.jwt);
      window.location.href = "../mis-tareas.html";
    });
  } else {
    alert("Formulario inválido");
  }
});

/* -------------------------------------------------------------------------- */
/*                                   On load                                  */
/* -------------------------------------------------------------------------- */

window.addEventListener("load", () => {
  const tasksArray = getStorage("tasks") ? getStorage("tasks") : [];
  if (tasksArray !== []) {
    renderCards(tasksArray);
  }
});

/* -------------------------------------------------------------------------- */
/*                                Form control                                */
/* -------------------------------------------------------------------------- */

// getId("task-form").addEventListener("submit", (e) => {
//   e.preventDefault();
//   let tasksArray = getStorage("tasks") ? getStorage("tasks") : [];
//   tasksArray.push({
//     id: uuidv4(),
//     description: e.description,
//     done: false,
//     date: getDate(),
//   });
//   setStorage("tasks", tasksArray);
// });

/* -------------------------------------------------------------------------- */
/*                                 Tasks Cards                                */
/* -------------------------------------------------------------------------- */

function renderCards(tasksArray) {
  tasksArray.forEach((task) => {
    const card = ``;
    getOne(".cards-container").insertAdjacentHTML("beforeend", card);
  });
}

const handlerDone = (e) => {
  let tasksArray = getStorage("tasks");
  tasksArray = tasksArray.map((task) => {
    if (task.id === e.id) {
      !task.done;
    }
  });
};
