import { UPDATE_EMAIL_AVAILABLE } from "../helpers/help";

const defaultState = {
  email_available: "",
};

const signup = (state = defaultState, action) => {
  console.log(" ||| in reducer now ||");
  console.log(action);

  switch (action.type) {
    case UPDATE_EMAIL_AVAILABLE:
      // eslint-disable-next-line
      return {
        ...state,
        ...action.email,
      };
    default:
      return state;
  }
};

export default signup;
