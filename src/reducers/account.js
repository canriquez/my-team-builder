import { UPDATES_ACCOUNT_DATA } from "../helpers/help";

const accountDefault = {
  email: null,
  name: null,
  role: null,
  avatar: null,
  loggedIn: false,
};

const account = (state = accountDefault, action) => {
  switch (action.type) {
    case UPDATES_ACCOUNT_DATA:
      // eslint-disable-next-line
      return {
        ...state,
        ...action.accountData,
      };
    default:
      return state;
  }
};

export default account;
