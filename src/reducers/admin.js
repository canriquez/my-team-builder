import { UPDATE_INDEX_REPORT, KILL_INDEX_REPORT } from "../helpers/help";

const defaultState = {
  index_report: null,
};

const admin = (state = defaultState, action) => {
  console.log(" ||| in admin reducer now ||");
  console.log(action);

  switch (action.type) {
    case UPDATE_INDEX_REPORT:
      // eslint-disable-next-line
      return {
        ...state,
        index_report: action.payload,
      };
    case KILL_INDEX_REPORT:
      // eslint-disable-next-line
      return {
        ...state,
        index_report: null,
      };
    default:
      return state;
  }
};

export default admin;
