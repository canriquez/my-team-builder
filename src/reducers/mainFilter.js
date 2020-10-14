import { FILTER_UPDATE } from '../helpers/help';

const mainFilter = (state = 'all', action) => {
  switch (action.type) {
    case FILTER_UPDATE:
      // eslint-disable-next-line
      return action.filter;

    default:
      return state;
  }
};

export default mainFilter;
