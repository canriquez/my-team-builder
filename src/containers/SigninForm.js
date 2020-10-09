/* eslint-disable  camelcase, jsx-a11y/label-has-associated-control */
import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { backendSigninAction, checkApiEmail } from '../actions/index';
import {
  validEmail,
  validPassword,
  enableSubmit,
  disableSubmit,
} from '../helpers/componentHelp';
import styles from '../styles/SigninForm.module.css';

class SigninForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      valid_email: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {
    const formEmail = document.getElementById('emailValue').value;
    const formPassword = document.getElementById('passwordValue').value;
    const valid_email = validEmail(formEmail);

    this.setState({
      email: formEmail,
      valid_email,
      password: formPassword,
    });

    if (formEmail.length > 5 && valid_email) {
      enableSubmit('submit-btn');
    } else {
      disableSubmit('submit-btn');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { fireBackendSignin } = this.props;

    const signInData = {
      ...this.state,
    };
    this.setState({
      email: '',
      valid_email: false,
      password: '',
    });

    fireBackendSignin(signInData);

    // If signin successfull. We store the token and
    // we send back to homepage for later go to index page
  }

  render() {
    const { email, password } = this.state;
    const { secure } = this.props;

    // eslint-disable-next-line
    const { signup } = this.props.signup;
    return (
      <div className={styles.formblock}>
        <div className={styles.formwrap}>
          <div className={styles.demoAccess}>
            <p>Admin role: admin1@gmail.com | pass: 12345</p>
          </div>
          <div className={styles.formtitle}>
            <h1>Sign in</h1>
            <h3>Hi there, signin to your account</h3>
          </div>
          <form
            className={styles.formfields}
            action="#"
            onSubmit={this.handleSubmit}
          >
            <label htmlFor="emailValue">Your email</label>
            <div className={styles.emailInputWrap}>
              <input
                className="emailValue"
                type="text"
                onChange={this.handleChange}
                value={email}
                id="emailValue"
                autoComplete="username"
              />
            </div>

            <label htmlFor="passwordValue">
              password
              {!validPassword(password) ? ' (5 or more characters)' : ''}
            </label>
            <div className={styles.passInputWrap}>
              <input
                className="passwordValue"
                type="password"
                onChange={this.handleChange}
                value={password}
                id="passwordValue"
                autoComplete="new-password"
              />
            </div>
            <button
              id="submit-btn"
              className="Rectangle-2 submit-btn base-button submit-disabled"
              type="submit"
            >
              Sign In
            </button>
            {secure.id ? <Redirect to="/" /> : ''}
            {signup === 'api_error' ? <Redirect to="/messages/2" /> : ''}
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fireBackendSignin: accountData => {
    dispatch(backendSigninAction(accountData));
  },
  checkBackendEmail: email => {
    dispatch(checkApiEmail(email));
  },
});

const mapStateToProps = state => ({
  account: state.account,
  secure: state.secure,
  signup: state.signup,
});

SigninForm.propTypes = {
  admin: PropTypes.shape({
    index_report: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
      .isRequired,
  }).isRequired,
  secure: PropTypes.shape({
    id: PropTypes.number.isRequired,
    now: PropTypes.string.isRequired,
    then: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
  fireBackendSignin: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);
