import React from "react";
import { connect } from "react-redux";
import SignupForm from "../containers/SignupForm";
import SigninForm from "../containers/SigninForm";
import styles from "../styles/App.module.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import HomePage from "../containers/HomePage";
import ApplicationDetails from "../components/AppicationDetails";

class App extends React.Component {
  constructor(props) {
    super(props);

    const { index_report, secure } = props;

    this.index_report = index_report;
    this.secure = secure;
  }

  render() {
    return (
      <Router>
        <div className={styles.appContainer}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            {/*          <Route exact path='/asset' component={AssetDetails} /> */}
            <Route path="/signin" render={(props) => <SigninForm />} />
            <Route path="/signup" render={(props) => <SignupForm />} />
            <Route
              path="/applications/:id"
              render={(props) => (
                <ApplicationDetails
                  secure={this.secure}
                  index_report={this.index_report}
                  // eslint-disable-next-line
                  {...props}
                />
              )}
            />
            <Route path={"/*"} render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  account: state.account,
  secure: state.secure,
  index_report: state.admin.index_report,
});

export default connect(mapStateToProps, null)(App);
