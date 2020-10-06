import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import account from "./account";
import signup from "./signup";
import secure from "./secure";

//using connected-react-router

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    account,
    signup,
    secure,
  });

export default createRootReducer;

/* //root reducer here

export default combineReducers({
  account,
  signup,
  secure,
}); */
