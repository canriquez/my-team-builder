import {
  UPDATE_ACCOUNT_DATA,
  UPDATE_EMAIL_AVAILABLE,
  UPDATE_AUTH_KEY,
  UPDATE_INDEX_REPORT,
  KILL_INDEX_REPORT,
} from "../helpers/help";
import {
  backEndSignup,
  backendCheckEmail,
  backEndSignin,
  backendAdHome,
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

const updateAdmIndexReport = (payload) => ({
  type: UPDATE_INDEX_REPORT,
  payload,
});

const killAdmIndexReport = () => ({
  type: KILL_INDEX_REPORT,
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

        if (result["user"][0]["role"] === "admin") {
          console.log("-----| Fetching Admin Info |-----");
          dispatch(backendAdHome(result["auth_token"])).then((result) => {
            console.log(result);
          });
        }

        //dispatch action to load full report

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
  updateAdmIndexReport,
  killAdmIndexReport,
};
