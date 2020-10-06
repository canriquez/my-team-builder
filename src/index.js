import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import createRootReducer from "./reducers/index";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./store/configureStore";
import "./index.css";

const store = configureStore(/* provide initial state if any */);
/* const store = createStore(rootReducer, applyMiddleware(thunk)); */

const Main = () => {
  React.useEffect(() => {
    document.title = "My Team Builder";
  });
  return <App />;
};

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Main history={history} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
