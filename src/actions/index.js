import {
  UPDATE_ACCOUNT_DATA,
  UPDATE_EMAIL_AVAILABLE,
  UPDATE_AUTH_KEY,
} from "../helpers/help";
import {
  backEndSignup,
  backendCheckEmail,
  backEndSignin,
} from "../apis/my-team-api";
import jwt_decode from "jwt-decode";

/* Actions for Sync Store */

const updateAccountData = (accountData) => ({
  type: UPDATE_ACCOUNT_DATA,
  accountData,
});

const updateSignupEmail = (email) => ({
  type: UPDATE_EMAIL_AVAILABLE,
  email,
});

const updateAuthToken = (payload) => ({
  type: UPDATE_AUTH_KEY,
  token: payload.token,
  id: payload.id,
  now: payload.now,
  then: payload.then,
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

const backendSigninAction = (signUpIn) => (dispatch, getState) =>
  backEndSignin(signUpIn)
    .then((result) => {
      if (result["auth_token"]) {
        console.log("authentication here");

        const decoJwt = jwt_decode(result["auth_token"]);

        const payload = {
          token: result["auth_token"],
          id: decoJwt["user_id"],
          now: decoJwt["now"],
          then: decoJwt["then"],
        };

        console.log(jwt_decode(result["auth_token"]));
        //Fire store token in redux
        dispatch(updateAuthToken(payload));

        // fire update account information
        console.log(result);
        dispatch(updateAccountData(result["user"]["0"]));

        return result;
      }
      //else Show error message

      console.log(result);
      return result;
    })
    .catch((error) => {
      if (error == "TypeError: Failed to fetch") {
        console.log("Server not available error");
      }
      //throw error;
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
  backendSigninAction,
  updateSignupEmail,
  checkApiEmail,
  updateAuthToken,
};
