import { combineReducers } from "redux";
import account from "./account";
import signup from "./signup";

//root reducer here

export default combineReducers({
  account,
  signup,
});
