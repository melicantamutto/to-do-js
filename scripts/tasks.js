/* ----------------------------- Page variables ----------------------------- */
if (!getStorage("token")) window.location.href = "../index.html";

const configForGet = {
  method: "GET",
  headers: {
    authorization: getStorage("token"),
    "Content-type": "application/json",
  },
};

const stringifyDate = (date) => new Date(date).toLocaleDateString("en-GB");

const generateCard = (id, description, date, completed) => `
<li class="tarea" id=${id}>
<div ${
  completed
    ? "class='done'"
    : "onclick='handlerDone(this)' class='not-done change'"
}></div>
<div class="descripcion">
  <p class="nombre">${description}</p>
  ${
    !completed
      ? ` <p class="timestamp"><i class="far
  fa-calendar-alt"></i>Creada: ${date}</p>`
      : `<div>
  <button type="button" onclick="handlerDone(this)"><i class="fas
  fa-undo-alt change"></i></button>
  <button type="button" onclick="handlerDelete(this)"><i class="far
  fa-trash-alt"></i></button>
  </div>`
  }
 
</div>
</li>
`;

/* ----------------------------- Fetch functions ---------------------------- */
const fetchUser = () =>
  fetchFromURL(BASE_URL + "/users/getMe", configForGet).then((resp) => {
    printUser(resp);
    fetchTasks();
  });

const fetchTasks = () =>
  fetchFromURL(BASE_URL + "/tasks", configForGet).then((resp) => {
    getOne(".tareas-pendientes").innerHTML = "";
    getOne(".tareas-terminadas").innerHTML = "";
    if (resp.length !== 0) printTasks(resp);

    console.log(resp);
    return resp;
  });

/* ----------------------------- Print functions ---------------------------- */
const printUser = (user) => (getId("username").innerText = user.firstName);

const postNewTask = () => {
  const newTask = {
    description: getId("nuevaTarea").value,
    completed: false,
  };
  const payload = JSON.stringify(newTask);
  const config = {
    method: "POST",
    body: payload,
    headers: {
      authorization: getStorage("token"),
      "Content-type": "application/json",
    },
  };
  fetchFromURL(BASE_URL + "/tasks", config).then((resp) => {
    console.log(resp);
    printNewTask(resp);
    console.log(resp);
  });

};

const printTasks = (tasksArr) => {
  setTimeout(() => {
    tasksArr.forEach((task) => {
      const container = task.completed
        ? getOne(".tareas-terminadas")
        : getOne(".tareas-pendientes");
      container.insertAdjacentHTML(
        "afterbegin",
        generateCard(
          task.id,
          task.description,
          stringifyDate(task.createdAt),
          task.completed
        )
      );
    });
  }, 300);
};

const printNewTask = (task) => {
  const container = task.completed
    ? getOne(".tareas-terminadas")
    : getOne(".tareas-pendientes");
  container.insertAdjacentHTML(
    "afterbegin",
    generateCard(
      task.id,
      task.description,
      stringifyDate(task.createdAt),
      task.completed
    )
  );
};

/* ------------------------------ Handler done ------------------------------ */
const handlerDone = (event) => {
  const e = event instanceof HTMLButtonElement ? event.parentNode.parentNode.parentNode : event.parentNode;

  const payload = {
    description: e.children[1].firstChild.innerText,
    completed: e.children[0].classList.contains("not-done") ? true : false,
  };
  const configurations = {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      authorization: getStorage("token"),
      "Content-type": "application/json",
    },
  };
  fetchFromURL(`${BASE_URL}/tasks/${e.id}`, configurations).then((resp) => {
    if(e.children[0].classList.contains("not-done")){
      e.children[0].classList.add("done");
      e.children[0].classList.remove("not-done");
    }else{
      e.children[0].classList.remove("done");
      e.children[0].classList.add("not-done");
    }
    e.remove();
    printNewTask(resp);
  });
};

const handlerDelete = (event) =>{
  const e = event.parentNode.parentNode.parentNode;
  const configurations = {
    method: "DELETE",
    headers: {
      authorization: getStorage("token"),
      "Content-type": "application/json",
    },
  };
  fetchFromURL(`${BASE_URL}/tasks/${e.id}`, configurations).then((resp) => {
    console.log(resp);
    e.remove();
  });
}

/* ------------------------- Executing the functions ------------------------ */
fetchUser();
getId("new-task").addEventListener("submit", (e) => {
  e.preventDefault();
  postNewTask();
});
getId("closeApp").addEventListener("click", () => {
  setStorage("token", "");
  window.location.href = "../index.html";
});
