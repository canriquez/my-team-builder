import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import "./index.css";

const store = createStore(rootReducer, applyMiddleware(thunk));

const Main = () => {
  React.useEffect(() => {
    document.title = "My Team Builder";
  });
  return <App />;
};

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("root")
);
