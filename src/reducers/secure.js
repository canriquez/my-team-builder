import { UPDATE_AUTH_KEY, KILL_AUTH_KEY } from '../helpers/help';

const defaultState = {
  id: 0,
  now: '',
  then: '',
  token: '',
};

const secure = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_AUTH_KEY:
      // eslint-disable-next-line
      return {
        token: action.token,
        id: action.id,
        now: action.now,
        then: action.then,
      };
    case KILL_AUTH_KEY:
      // eslint-disable-next-line
      return {};
    default:
      return state;
  }
};

export default secure;
