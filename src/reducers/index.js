import { combineReducers } from "redux";
import account from "./account";
import signup from "./signup";
import secure from "./secure";

//root reducer here

export default combineReducers({
  account,
  signup,
  secure,
});
