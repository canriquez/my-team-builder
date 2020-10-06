import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "../reducers/index";
import thunk from "redux-thunk";

export const history = createBrowserHistory();

export default function configureStore() {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    compose(
      applyMiddleware(
        thunk,
        routerMiddleware(history) // for dispatching history actions
      )
    )
  );
  return store;
}
