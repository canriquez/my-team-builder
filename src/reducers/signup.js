import { UPDATE_EMAIL_AVAILABLE, UPDATE_SIGNUP_STATE } from '../helpers/help';

const defaultState = {
  email_available: '',
  signup: '',
};

const signup = (state = defaultState, action) => {
  console.log(' ||| in reducer now ||');
  console.log(action);

  switch (action.type) {
    case UPDATE_EMAIL_AVAILABLE:
      // eslint-disable-next-line
      return {
        ...state,
        ...action.email,
      };

    case UPDATE_SIGNUP_STATE:
      // eslint-disable-next-line
      return {
        ...state,
        ...action.state,
      };
    default:
      return state;
  }
};

export default signup;
