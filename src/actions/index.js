import { UPDATE_ACCOUNT_DATA, UPDATE_EMAIL_AVAILABLE } from "../helpers/help";
import { backEndSignup, backendCheckEmail } from "../apis/my-team-api";

/* Actions for Sync Store */

const updateAccountData = (accountData) => ({
  type: UPDATE_ACCOUNT_DATA,
  accountData,
});

const updateSignupEmail = (email) => ({
  type: UPDATE_EMAIL_AVAILABLE,
  email,
});

/* Thunk thenable creators to manage Async requests (my-team-api.js API) */

const backendSignupAction = (signUpData) => (dispatch, getState) =>
  backEndSignup(signUpData)
    .then((result) => {
      console.log(result);
      return result;
      //dispatch(updateAccountData({update object}));
    })
    .catch((error) => {
      throw error;
    });

const checkApiEmail = (email) => (dispatch, getState) =>
  backendCheckEmail(email)
    .then((result) => {
      const email = result["message"].split(" ");
      console.log(email[0]);
      const payload = {
        email_available: email[0],
      };
      dispatch(updateSignupEmail(payload));
    })
    .catch((error) => {
      throw error;
    });

export {
  updateAccountData,
  backendSignupAction,
  updateSignupEmail,
  checkApiEmail,
};
