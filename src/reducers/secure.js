import { UPDATE_AUTH_KEY } from "../helpers/help";

const defaultState = {
  id: null,
  now: null,
  then: null,
  token: null,
};

const secure = (state = defaultState, action) => {
  console.log(" ||| in auth reducer now ||");
  console.log(action);

  switch (action.type) {
    case UPDATE_AUTH_KEY:
      // eslint-disable-next-line
      return {
        token: action.token,
        id: action.id,
        now: action.now,
        then: action.then,
      };
    default:
      return state;
  }
};

export default secure;
