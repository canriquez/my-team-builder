import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import dateFormat from "dateformat";

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

const cardObject = (object) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const application_age = timeAgo.format(
    new Date(object.aplication_date),
    "round"
  );
  const job_age = timeAgo.format(new Date(object.jobpost_date), "round");

  return {
    application_id: object.application_id,
    app_id: object.applicant_id,
    app_name: object.applicant_name,
    app_age: application_age,
    app_date: dateFormat(Date(object.aplication_date)),
    likes: object.eval_like,
    dislikes: object.eval_dislike,
    job_id: object.job_id,
    job_name: object.job_name,
    job_date: dateFormat(Date(object.jobpost_date)),
    job_age: job_age,
    job_author: object.jobpost_author,
    avatar: object.applicant_avatar,
  };
};

const checkEval = (evals, adminId, applicationId, check) => {
  if (!evals) return null;
  const result = evals.filter((ev) => {
    return ev.application_id === applicationId && ev.admin_id === adminId;
  });

  if (result[0]) {
    return result[0].evaluation === check;
  } else {
    return false;
  }
};

const currentEval = (evals, adminId, applicationId) => {
  if (!evals) return null;
  const result = evals.filter((ev) => {
    return ev.application_id === applicationId && ev.admin_id === adminId;
  });
  if (result[0]) {
    return result[0];
  } else {
    return null;
  }
};

export {
  validEmail,
  enableSubmit,
  disableSubmit,
  validName,
  validPassword,
  cardObject,
  checkEval,
  currentEval,
};
