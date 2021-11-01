/* -------------------------------------------------------------------------- */
/*                              Token Validation                              */
/* -------------------------------------------------------------------------- */
if (getStorage("token")) window.location.href = "../mis-tareas.html";

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
