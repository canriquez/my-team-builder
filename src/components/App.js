/*  eslint-disable  camelcase */
import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { PropTypes } from 'prop-types';
import SignupForm from '../containers/SignupForm';
import SigninForm from '../containers/SigninForm';
import styles from '../styles/App.module.css';

import HomePage from '../containers/HomePage';
import ApplicationDetails from './AppicationDetails';
import ActionMessage from './ActionMessage';

class App extends React.Component {
  constructor(props) {
    super(props);

    const { index_report, secure, account } = props;

    this.index_report = index_report;
    this.secure = secure;
    this.account = account;

    console.log('[[[[[[ HERE AT APP CHECK THE PROPS ]]]]]]]');
    console.log(this.index_report);
    console.log(this.secure);
    console.log(this.account);
  }

  render() {
    return (
      <Router>
        <div className={styles.appContainer}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            {/*          <Route exact path='/asset' component={AssetDetails} /> */}
            <Route path="/signin" render={() => <SigninForm />} />
            <Route path="/signup" render={() => <SignupForm />} />
            <Route
              path="/applications/:id"
              render={props => (
                <ApplicationDetails
                  // eslint-disable-next-line
                  {...props}
                />
              )}
            />
            <Route
              path="/messages/:id"
              render={props => (
                <ActionMessage
                  validCall
                  // eslint-disable-next-line
                  {...props}
                />
              )}
            />
            <Route path={'/*'} render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account,
  secure: state.secure,
  index_report: state.admin.index_report,
});

App.propTypes = {
  index_report: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
  account: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    tokenExpired: PropTypes.bool.isRequired,
    tokenPresent: PropTypes.bool.isRequired,
  }).isRequired,
  secure: PropTypes.shape({
    id: PropTypes.number.isRequired,
    now: PropTypes.string.isRequired,
    then: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, null)(App);
