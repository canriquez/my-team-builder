import React from "react";
import SignupForm from "../containers/SignupForm";
import styles from "../styles/App.module.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import HomePage from "./HomePage";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    /*     return (
      <div className={styles.appContainer}>
        <div>logo</div>
        <SignupForm />
      </div>
    ); */
    return (
      <Router>
        <div className={styles.appContainer}>
          <h1 className={styles.brand}>My Team Builder</h1>
          <Switch>
            <Route exact path="/" component={HomePage} />
            {/*          <Route exact path='/asset' component={AssetDetails} /> */}
            <Route path="/signup" render={(props) => <SignupForm />} />
            <Route path={"/*"} render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
