import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";

const Main = () => {
  React.useEffect(() => {
    document.title = "My Team Builder";
  });
  return <App />;
};

ReactDOM.render(<Main />, document.getElementById("root"));
