import { UPDATE_ACCOUNT_DATA } from "../helpers/help";
import backEndSignup from "../apis/my-team-api";

/* Actions for Sync Store */

const updateAccountData = (accountData) => ({
  type: UPDATE_ACCOUNT_DATA,
  accountData,
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

export { updateAccountData, backendSignupAction };
