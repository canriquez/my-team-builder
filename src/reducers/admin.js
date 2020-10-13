/* eslint-disable  camelcase */
import { UPDATE_INDEX_REPORT, KILL_INDEX_REPORT } from '../helpers/help';

// CHANGE DUMMY INDEX_REPORT TO NULL for final testing
const defaultState = {
  index_report: [{}],
};

const admin = (state = defaultState, action) => {
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
