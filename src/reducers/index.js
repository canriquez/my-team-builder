import { combineReducers } from 'redux';
import account from './account';
import signup from './signup';
import secure from './secure';
import admin from './admin';
import mainFilter from './mainFilter';

// root reducer here

export default combineReducers({
  account,
  signup,
  secure,
  admin,
  mainFilter,
});
