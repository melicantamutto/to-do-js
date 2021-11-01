/* -------------------------------------------------------------------------- */
/*                       General Variables and Functions                      */
/* -------------------------------------------------------------------------- */

const REGISTER_URL = BASE_URL+ '/users';

/* -------------------------------------------------------------------------- */
/*                        Main event and functionality                        */
/* -------------------------------------------------------------------------- */
getId("new-submit").addEventListener("click", (e) => {
  e.preventDefault();
  const newUser = {
    firstName: validateRegexName(getId("new-name").value.trim()),
    lastName: validateRegexName(getId("new-last-name").value.trim()),
    email: validateRegexEmail(getId("new-email").value.toLowerCase().trim()),
    password: validateRegexPassword(getId("new-pass").value.trim()),
    password2: validateRegexPassword(getId("new-pass-two").value.trim()),
  };
  if (validateForm(newUser)) {
    delete newUser.password2;
    const payload = JSON.stringify(newUser);
    const config = {
      method: "POST",
      body: payload,
      headers: {
        "Content-type": "application/json",
      },
    };
    fetchForm(REGISTER_URL, config);
  } else {
    alert("Formulario inválido");
  }
});
