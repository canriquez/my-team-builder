const validEmail = (email) => {
  let emailcheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailcheck.test(email);
};

const validName = (name) => {
  return name.length >= 5;
};

const validPassword = (pass) => {
  return pass.length >= 5;
};

const enableSubmit = (id) => {
  const submitButton = document.getElementById(id);
  submitButton.disabled = false;
  if (submitButton.classList.contains("submit-disabled")) {
    submitButton.classList.remove("submit-disabled");
    submitButton.classList.add("submit-enabled");
  }
};

const disableSubmit = (id) => {
  const submitButton = document.getElementById(id);
  submitButton.disabled = true;
  if (submitButton.classList.contains("submit-enabled")) {
    submitButton.classList.remove("submit-enabled");
    submitButton.classList.add("submit-disabled");
  }
};

export { validEmail, enableSubmit, disableSubmit, validName, validPassword };
