// eslint-disable-next-line
import jwt_decode from "jwt-decode";
import {
  UPDATE_ACCOUNT_DATA,
  UPDATE_EMAIL_AVAILABLE,
  UPDATE_SIGNUP_STATE,
  UPDATE_AUTH_KEY,
  KILL_AUTH_KEY,
  UPDATE_INDEX_REPORT,
  KILL_INDEX_REPORT,
  FILTER_UPDATE,
  AUTH_RECORD,
  USER_RECORD,
  ADM_INDEX_RECORD,
  ADM_EVALS_RECORD,
} from '../helpers/help';
import {
  backEndSignup,
  backendCheckEmail,
  backEndSignin,
  backendAdHome,
  backendAdminEvals,
  backendDestroyLikes,
  backendUpdateLikes,
  backendCreatesLikes,
} from '../apis/my-team-api';

/* Actions for Sync Store */

const updateAccountData = accountData => ({
  type: UPDATE_ACCOUNT_DATA,
  accountData,
});

const updateSignupEmail = email => ({
  type: UPDATE_EMAIL_AVAILABLE,
  email,
});

const updateSignupState = state => ({
  type: UPDATE_SIGNUP_STATE,
  state,
});

const updateAuthToken = payload => ({
  type: UPDATE_AUTH_KEY,
  token: payload.token,
  id: payload.id,
  now: payload.now,
  then: payload.then,
});

const killAuthToken = () => ({
  type: KILL_AUTH_KEY,
});

const updateAdmIndexReport = payload => ({
  type: UPDATE_INDEX_REPORT,
  payload,
});

const killAdmIndexReport = () => ({
  type: KILL_INDEX_REPORT,
});

/*  home page - Filter update */

const filterUpdate = filter => ({
  type: FILTER_UPDATE,
  filter,
});

/* Thunk thenable creators to manage Async requests (my-team-api.js API) */

const backendSignupAction = signUpData => dispatch => backEndSignup(signUpData)
  .then(result => {
    let payload = {};
    if (result.message.includes('Validation failed')) {
      const messages = result.message.substring(19, result.message.length);
      payload = {
        newSignup: 'done',
        signup: 'validation',
        emailVal: messages,
      };
    } else {
      payload = {
        newSignup: 'done',
        action: 'success',
        message: result.message,
      };
    }
    dispatch(updateSignupState(payload));
    return result;
    // dispatch(updateAccountData({update object}));
  })
  .catch(error => {
    const payload = {
      signup: 'error',
    };
    dispatch(updateSignupState(payload));
    throw error;
  });

const backendSigninAction = signUpIn => dispatch => backEndSignin(signUpIn)
  .then(result => {
    if (result.auth_token) {
      const decoJwt = jwt_decode(result.auth_token);

      const payload = {
        token: result.auth_token,
        id: decoJwt.user_id,
        now: decoJwt.now,
        then: decoJwt.then,
      };

      // Update Local Storage auth information

      localStorage.setItem(AUTH_RECORD, JSON.stringify(payload));
      localStorage.setItem(USER_RECORD, JSON.stringify(result.user['0']));

      // Fire store token in redux
      dispatch(updateAuthToken(payload));

      // fire update account information
      dispatch(updateAccountData(result.user['0']));

      // ONLY FOR ADMIN ACTIONS
      if (result.user[0].role === 'admin') {
        backendAdHome(result.auth_token).then(result => {
          dispatch(updateAdmIndexReport(result));
          localStorage.setItem(ADM_INDEX_RECORD, JSON.stringify(result));

          // Load admin's evaluations
          backendAdminEvals({
            id: payload.id,
            auth: payload.token,
          }).then(result => {
            dispatch(updateAccountData({ evals: result }));
            localStorage.setItem(ADM_EVALS_RECORD, JSON.stringify(result));
          });
        });
      }

      // dispatch action to load full report

      return result;
    }
    // else Show error message
    let payload = {};
    if (result.message.includes('Invalid credentials')) {
      const messages = 'Invalid credentials, please try again.';
      payload = {
        newSignup: 'done',
        signup: 'validation',
        signInVal: messages,
      };
    } else {
      payload = {
        newSignup: 'done',
        action: 'success',
        message: result.message,
      };
    }
    dispatch(updateSignupState(payload));

    return result;
  })
  .catch(error => {
    const payload = {
      signup: 'api_error',
    };
    dispatch(updateSignupState(payload));
    throw error;
  });

const backendRefreshAdmin = payload => dispatch => backendAdHome(payload.token)
  .then(result => {
    dispatch(updateAdmIndexReport(result));

    // Load admin's evaluations

    backendAdminEvals({
      id: payload.id,
      auth: payload.token,
    }).then(result => {
      dispatch(updateAccountData({ evals: result }));
      localStorage.setItem(ADM_EVALS_RECORD, JSON.stringify(result));
    });

    // dispatch(updateAccountData({update object}));
  })
  .catch(error => {
    throw error;
  });

const backendLikeDestroyAction = payload => dispatch => backendDestroyLikes(payload)
  .then(() => {
    backendAdminEvals({
      id: payload.user_id,
      auth: payload.token,
    }).then(result => {
      dispatch(updateAccountData({ evals: result }));
    });

    // dispatch(updateAccountData({update object}));
  })
  .catch(error => {
    throw error;
  });

const backendLikeChangeAction = payload => dispatch => backendUpdateLikes(payload)
  .then(() => {
    backendAdminEvals({
      id: payload.user_id,
      auth: payload.token,
    }).then(result => {
      dispatch(updateAccountData({ evals: result }));
    });

    // dispatch(updateAccountData({update object}));
  })
  .catch(error => {
    throw error;
  });

const backendLikeCreateAction = payload => dispatch => backendCreatesLikes(payload)
  .then(() => {
    backendAdminEvals({
      id: payload.user_id,
      auth: payload.token,
    }).then(result => {
      dispatch(updateAccountData({ evals: result }));
    });

    // dispatch(updateAccountData({update object}));
  })
  .catch(error => {
    throw error;
  });

const checkApiEmail = email => dispatch => backendCheckEmail(email)
  .then(result => {
    const email = result.message.split(' ');
    const payload = {
      email_available: email[0],
    };
    dispatch(updateSignupEmail(payload));
  })
  .catch(error => {
    const payload = {
      signup: 'api_error',
    };
    dispatch(updateSignupState(payload));
    throw error;
  });

export {
  updateAccountData,
  backendSignupAction,
  backendSigninAction,
  updateSignupEmail,
  updateSignupState,
  checkApiEmail,
  updateAuthToken,
  updateAdmIndexReport,
  killAdmIndexReport,
  backendLikeDestroyAction,
  backendLikeChangeAction,
  backendLikeCreateAction,
  backendRefreshAdmin,
  filterUpdate,
  killAuthToken,
};
