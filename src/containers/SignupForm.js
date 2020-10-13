/* eslint-disable  camelcase, jsx-a11y/label-has-associated-control */
import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { backendSignupAction, checkApiEmail, updateSignupState } from '../actions/index';
import {
  validEmail,
  validName,
  validPassword,
  enableSubmit,
  disableSubmit,
} from '../helpers/componentHelp';
import styles from '../styles/SignupForm.module.css';
import okIcon from '../assets/icons/ok.svg';
import exitIcon from '../assets/icons/exit.svg';
import warningIcon from '../assets/icons/warning.svg';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      role: '',
      avatar: '',
      password: '',
      password_repeat: '',
      valid_email: false,
      password_match: false,
    };

    this.roles = ['admin', 'user'];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {cleanSignupState} = this.props;
    cleanSignupState();
  }


  handleChange() {
    const { checkBackendEmail, new_email } = this.props;
    const formName = document.getElementById('nameValue').value;
    const formEmail = document.getElementById('emailValue').value;
    const formPassword = document.getElementById('passwordValue').value;
    const formPasswordRepeat = document.getElementById('passwordRepeatValue')
      .value;
    const select = document.getElementById('role').value;
    const valid_email = validEmail(formEmail);
    const valid_password = formPassword === formPasswordRepeat && formPassword !== '';

    this.setState({
      name: formName,
      role: this.roles[select],
      email: formEmail,
      avatar: 'http://fronEndRole.com',
      password: formPassword,
      password_repeat: formPasswordRepeat,
      valid_email,
      password_match: valid_password,
    });

    if (valid_email && formEmail !== new_email && formEmail !== '') {
      //checkBackendEmail({ email: formEmail });
    }
    if (
      formEmail.length > 5
      && valid_email
      && valid_password
      //&& formEmail === new_email
    ) {
      enableSubmit('submit-btn');
    } else {
      disableSubmit('submit-btn');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { fireBackendSignup } = this.props;

    const signupData = {
      ...this.state,
    };

    fireBackendSignup(signupData);
  }

  render() {
    const {
      name,
      email,
      password,
      password_repeat,
      password_match,
      valid_email
    } = this.state;
    const { new_email, history } = this.props;

    // eslint-disable-next-line
    const { signup } = this.props;
    const {action, emailVal} = signup 
    return (
      <section className={styles.formblock}>
        <article className={styles.formwrap}>
        <div className={styles.exitIcon}>
        <Link to="/" className={styles.exitBtn}>
        <img
          className={styles.exitSvg}
          src={exitIcon}
          alt="exit icon"
          id="exit-icon"
        />
        </Link>
        </div>
          <div className={styles.formtitle}>
            <h1>Sign up</h1>
            <h3>Hi there, create a new account with us</h3>
          </div>
          <form
            className={styles.formfields}
            action="#"
            onSubmit={this.handleSubmit}
          >
            <label htmlFor="namelValue">
              Your name
              {!validName(name) ? ' (5 or more characters)' : ''}
            </label>
            <div className={styles.nameInputWrap}>
              <input
                className="nameValue"
                type="text"
                onChange={this.handleChange}
                value={name}
                id="nameValue"
              />
              <img
                className={
                  styles.formIcons + (validName(name) ? ' show' : ' hide')
                }
                src={okIcon}
                alt="Logo"
                id="ok-icon"
              />
            </div>
            <label htmlFor="emailValue">email 
            {
              emailVal ? 
              <span className={styles.valError}>{" | "}{emailVal}</span>
              :
              ""
            }
            </label>
            <div className={styles.emailInputWrap}>
              <input
                className={(emailVal ? ' emailVal' : '')}
                type="text"
                onChange={this.handleChange}
                value={email}
                id="emailValue"
                autoComplete="username"
              />
              <img
                className={
                  styles.formIcons
                  + (valid_email && email !== '' ? ' show' : ' hide')
                }
                src={okIcon}
                alt="Logo"
                id="ok-icon"
              />
              <img
                className={
                  styles.waringIcon
                  + (new_email === 'taken' ? ' show' : ' hide')
                }
                src={warningIcon}
                alt="Logo"
                id="warning-icon"
              />
            </div>
            <label htmlFor="role">Your role (*only for demo)</label>
            <select
              className="role"
              name="role"
              id="role"
              onChange={this.handleChange}
            >
              {this.roles.map((cat, id) => (
                <option key={`opt_${id * 2}`} value={id}>
                  {cat}
                </option>
              ))}
            </select>

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
              <img
                className={
                  styles.formIcons
                  + (validPassword(password) ? ' show' : ' hide')
                }
                src={okIcon}
                alt="Logo"
                id="ok-icon"
              />
            </div>

            <label htmlFor="passwordRepeatValue">repeat password</label>
            <div className={styles.passRepeatInputWrap}>
              <input
                className="passwordRepeatValue"
                type="password"
                onChange={this.handleChange}
                value={password_repeat}
                id="passwordRepeatValue"
                autoComplete="new-password"
              />
              <img
                className={
                  styles.formIcons + (password_match ? ' show' : ' hide')
                }
                src={okIcon}
                alt="Logo"
                id="ok-icon"
              />
            </div>
            <button
              id="submit-btn"
              className="Rectangle-2 submit-btn base-button submit-disabled"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          {action === 'success' ? <Redirect to="/messages/0" /> : ''}
          {action === 'error' ? <Redirect to="/messages/1" /> : ''}
          {action === 'api_error' ? <Redirect to="/messages/2" /> : ''}
        </article>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fireBackendSignup: newAccountData => {
    dispatch(backendSignupAction(newAccountData));
  },
  checkBackendEmail: email => {
    dispatch(checkApiEmail(email));
  },
  cleanSignupState: (payload)=>{
    dispatch(updateSignupState({newSignup: 'pending'}))
  }
});

const mapStateToProps = state => ({
  new_email: state.signup.email_available,
  signup: state.signup,
});

SignupForm.propTypes = {
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
  new_email: PropTypes.string.isRequired,
  checkBackendEmail: PropTypes.func.isRequired,
  fireBackendSignup: PropTypes.func.isRequired,
  signup: PropTypes.shape({
    email_available: PropTypes.string.isRequired,
    signup: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
