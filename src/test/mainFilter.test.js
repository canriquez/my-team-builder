import deepFreeze from 'deep-freeze';
import mainFilter from '../reducers/mainFilter';
import { filterUpdate } from '../actions/index';

it('update filter to new filter', () => {
  const stateBefore = '';

  const filter = 'Approved';
  const stateAfter = 'Approved';

  /* inmmutability check */
  deepFreeze(stateBefore); // makes sure reducer is pure function
  deepFreeze(filterUpdate); // makes sure reducer is pure function

  expect(mainFilter(stateBefore, filterUpdate(filter))).toEqual(stateAfter);
});
