/* eslint-disable  camelcase */
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import dateFormat from 'dateformat';
import {
  AUTH_RECORD, USER_RECORD, ADM_INDEX_RECORD,
  ADM_EVALS_RECORD,
} from './help';

const validEmail = email => {
  // eslint-disable-next-line
  const emailcheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailcheck.test(email);
};

const validName = name => name.length >= 5;

const validPassword = pass => pass.length >= 5;

const enableSubmit = id => {
  const submitButton = document.getElementById(id);
  submitButton.disabled = false;
  if (submitButton.classList.contains('submit-disabled')) {
    submitButton.classList.remove('submit-disabled');
    submitButton.classList.add('submit-enabled');
  }
};

const disableSubmit = id => {
  const submitButton = document.getElementById(id);
  submitButton.disabled = true;
  if (submitButton.classList.contains('submit-enabled')) {
    submitButton.classList.remove('submit-enabled');
    submitButton.classList.add('submit-disabled');
  }
};

const cardObject = object => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');

  const application_age = timeAgo.format(
    new Date(object.aplication_date),
    'round',
  );
  const job_age = timeAgo.format(new Date(object.jobpost_date), 'round');

  return {
    application_id: object.application_id,
    app_id: object.applicant_id,
    app_name: object.applicant_name,
    app_age: application_age,
    app_date: dateFormat(Date(object.aplication_date)),
    likes: object.eval_like,
    job_id: object.job_id,
    job_name: object.job_name,
    job_date: dateFormat(Date(object.jobpost_date)),
    job_age,
    job_author: object.jobpost_author,
    admin_eval: object.current_admin_evaluation,
    avatar: object.applicant_avatar,
  };
};

const checkEval = (evals, adminId, applicationId, check) => {
  if (!evals) return null;
  const result = evals.filter(
    ev => ev.application_id === applicationId && ev.admin_id === adminId,
  );

  if (result[0]) {
    return result[0].evaluation === check;
  }
  return false;
};

const currentEval = (evals, adminId, applicationId) => {
  if (!evals) return null;
  const result = evals.filter(
    ev => ev.application_id === applicationId && ev.admin_id === adminId,
  );
  if (result[0]) {
    return result[0];
  }
  return null;
};

const checkFilter = (object, filter) => {
  if (filter === 'all') {
    return object;
  }
  if (filter === object.current_admin_evaluation) {
    return object;
  }
  return false;
};

// eslint-disable-next-line
const humanFilter = (filter) => {
  if (filter === 'all') {
    return ' all ';
  }
  if (filter === 0) {
    return ' declined ';
  }
  if (filter === 1) {
    return ' approved ';
  }
};

const filterIndex_list = (list, filter) => {
  const result = list.filter(
    object => object.current_admin_evaluation === filter || filter === 'all',
  );
  return result;
};

const fetchLocalRecord = () => {
  const localAuth = JSON.parse(localStorage.getItem(AUTH_RECORD));
  const localUser = JSON.parse(localStorage.getItem(USER_RECORD));
  const localAdmIndex = JSON.parse(localStorage.getItem(ADM_INDEX_RECORD));
  const localAdmEval = JSON.parse(localStorage.getItem(ADM_EVALS_RECORD));
  if (localAuth) {
    const valThen = new Date(localAuth.then);
    const valNow = new Date();
    return {
      localAuth, localUser, validToken: (valNow < valThen), localAdmIndex, localAdmEval,
    };
  }
  return false;
};

const clearLocalSession = () => {
  localStorage.removeItem(AUTH_RECORD);
  localStorage.removeItem(USER_RECORD);
  localStorage.removeItem(ADM_EVALS_RECORD);
  localStorage.removeItem(ADM_INDEX_RECORD);
  return true;
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
  checkFilter,
  filterIndex_list,
  humanFilter,
  fetchLocalRecord,
  clearLocalSession,
};
