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
import {updateAuthToken, updateAdmIndexReport, updateAccountData} from '../actions/index'
import { useEffect } from 'react';
import {fetchLocalRecord} from '../helpers/componentHelp'

const App  = ({
  secure, 
  updateAdminSession,
  updateUserSession,
})=>{

  useEffect(()=> {
    let isMounted = true;
    const {localUser, validToken } = fetchLocalRecord();
    if (!localUser) return
    if (!secure.id && localUser.role === 'admin' && validToken && isMounted) {
      updateAdminSession(fetchLocalRecord());
    }else if(!secure.id && localUser.role === 'user' && validToken && isMounted)
    {
      updateUserSession(fetchLocalRecord())
    }
    return () => { isMounted = false };
  })

    return (
      <Router>
        <main className={styles.appContainer}>
          <Switch>
            <Route exact path="/" component={HomePage} />
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
        </main>
      </Router>
    );
  }


const mapDispatchToProps = dispatch => ({
  fireUpdateAuthToken: (payload) => {
    dispatch(updateAuthToken(payload));
  },
  fireUpdateIndex: (payload) => {
    dispatch(updateAdmIndexReport(payload));
  },
  fireUpdateEvalsData: (payload)=>{
    dispatch(updateAccountData({ evals: payload }))
  },
  updateAdminSession: (payload) =>{
    dispatch(updateAccountData(payload.localUser));
    dispatch(updateAdmIndexReport(payload.localAdmIndex));
    dispatch(updateAuthToken(payload.localAuth));
    dispatch(updateAccountData({evals: payload.localAdmEval}));

  },
  updateUserSession: (payload) =>{
    dispatch(updateAccountData(payload.localUser));
    dispatch(updateAuthToken(payload.localAuth));

  }
});

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
