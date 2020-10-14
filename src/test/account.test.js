import deepFreeze from 'deep-freeze';
import account from '../reducers/account';
import { updateAccountData } from '../actions/index';

it('updates account data', () => {
  const stateBefore = {
    email: 'test@test.com',
    name: 'Carlo Tester',
    role: 'admin',
    avatar: 'https://myavatart.com',
    loggedIn: false,
    tokenPresent: false,
    tokenExpired: false,
  };
  const payload = {
    tokenExpired: true,
  };
  const stateAfter = {
    email: 'test@test.com',
    name: 'Carlo Tester',
    role: 'admin',
    avatar: 'https://myavatart.com',
    loggedIn: false,
    tokenPresent: false,
    tokenExpired: true,
  };

  /* inmmutability check */
  deepFreeze(stateBefore); // makes sure reducer is pure function
  deepFreeze(updateAccountData); // makes sure reducer is pure function

  expect(account(stateBefore, updateAccountData(payload))).toEqual(stateAfter);
});
