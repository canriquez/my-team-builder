import { UPDATE_ACCOUNT_DATA } from '../helpers/help';

const accountDefault = {
  email: '',
  name: '',
  id: 0,
  role: '',
  evals: [{}],
  avatar: '',
  loggedIn: false,
  tokenPresent: false,
  tokenExpired: false,
  admin: {
    index_report: [{}],
  },
};

const account = (state = accountDefault, action) => {
  switch (action.type) {
    case UPDATE_ACCOUNT_DATA:
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
