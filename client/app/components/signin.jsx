import React from 'react';
import validator from 'validator';
import SetTimeoutMixin from 'mixins/settimeout';
var {FormGroup, FormControl, Alert} = require("react-bootstrap");
import {FaCircle, FaCheck, FaTimesCircle} from 'react-icons/lib/fa';
var {Link, IndexLink, hashHistory} = require('react-router');

var UserAPI = require('userAPI');

var SignIn = React.createClass({
  mixins: [SetTimeoutMixin],
  getInitialState(){
    return {
      username: '',
      password1:'',
      password2:'',
      validationEmail: undefined,
      error: undefined,
      validationPassword1: undefined,
      validationPassword2: undefined,
      user: undefined
    };
  },
  handleChange(e){
    e.target.classList.add('active');
    const name = e.target.name;
    var that = this;
    var textInput = document.getElementById(`${name}`);

    this.setState({
      [name]: e.target.value,
      error: false
    })

    this.clearTimeouts();
    this.setTimeout(function () {
      that.formValidation(name)
    },700)
  },
  onFormSubmit: function (e) {
    e.preventDefault();
    var email = this.state.validationEmail;
    var password1 = this.state.validationPassword1;
    var password2 = this.state.validationPassword2;

    if (email == 'success' || 'success'== password1 || password2 == 'success') {
      var that = this;

      UserAPI.signIn(this.state.username, this.state.password2).then(function (res) {
        console.log('Confirm email');
        window.localStorage.removeItem('userLocal');
        UserAPI.rememberUser(that.state.username);

      }).catch(function (error) {
        throw error;
      });

      this.state.email = '';
      this.state.password1 = '';
      this.state.password2 = '';

    }else{

      this.setState({
        error: true,
        password1:'',
        password2:''
      })

      this.refs.username.focus();
    }
  },
  componentDidMount: function () {
    if (this.state.email == '') {
      this.refs.username.focus();
    }
  },
  formValidation: function (targetName) {
    const errorUser = document.getElementById(`usernameError`);
    const errorPass1 = document.getElementById(`password1Error`);
    const errorPass2 = document.getElementById(`password2Error`);

    if (targetName == 'username') {

      if (this.state.username == '') {
        errorUser.textContent = `Email is a required field`;
        this.setState({validationEmail: 'error'});
      } else if (!validator.isEmail(this.state.username)) {
        errorUser.textContent = `Should be a valid email address`;
        this.setState({validationEmail: 'error'});
      } else if(validator.isEmail(this.state.username)){
        var that = this;
        UserAPI.checkEmailExist(this.state.username).then(function (res) {
          if (res.length === 0) {
            errorUser.textContent = '';
            that.setState({validationEmail: 'success'});
          } else {
            errorUser.textContent = `Your email already exists`;
            that.setState({validationEmail: 'error'});
          }
        }).catch(function (error) {
          throw error;
        });
      }else {
        errorUser.textContent = '';
        this.setState({validationEmail: 'success'});
      }
    } else if (targetName == 'password1') {
      if (this.state.password1.length < 6) {
        errorPass1.textContent = 'Password must have min 6 characters';
        this.setState({validationPassword1: 'error'});
      } else if ((this.state.password2 != '') && (this.state.password1 != this.state.password2)) {
        errorPass2.textContent = "Passwords didn't match";
        this.setState({
          validationPassword1: 'error',
          validationPassword2: undefined,
          password2: ''
        });
      }else {
        errorPass1.textContent = '';
        this.setState({validationPassword1: 'success'});
      }
    } else if (targetName == 'password2') {
      if (this.state.password1 != this.state.password2) {
        errorPass2.textContent = "Passwords didn't match";
        this.setState({validationPassword2: 'error'});
      } else {
        errorPass2.textContent = '';
        this.setState({validationPassword2: 'success'});
      }
    }
  },
  render() {
    var validationIcon = (
      <FormControl.Feedback>
        <FaCheck/>
      </FormControl.Feedback>
    )

    if (this.state.error) {
      var error = (
        <Alert bsStyle="warning">
          <strong>Couldn't submit</strong> Please fullfill the form again.
        </Alert>
      )
    }

    if (this.state.validationEmail == 'success') {
      var emailIcon = validationIcon;
    }

    if (this.state.validationPassword1 == 'success') {
      var password1Icon = validationIcon;
    }

    if (this.state.validationPassword2 == 'success'){
      var password2Icon = validationIcon;
    }

    if (this.state.password1.length > 5) {
      var confirmPassword = (
        <FormGroup validationState={this.state.validationPassword2}>
          <input className="form-control"
            type="password"
            ref="password2"
            name="password2"
            value={this.state.password2}
            onChange={this.handleChange}
            placeholder="Confirm password"
            required/>
            {password2Icon}
            <div className="error" id="password2Error"></div>
          </FormGroup>
        )
    }

      return (
        <div>
          <h1 className="page-title">ToDo</h1>
          <div className="row">
            <div className="columns small-centered small-10 medium-6 large-4">
              <p>Sign in into ToDo</p>
              <form className="callout callout-auth">
                <FormGroup validationState={this.state.validationEmail}>
                  <input className="form-control"
                    type="email"
                    name="username"
                    ref="username"
                    id="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    placeholder="Email"
                    required/>
                    {emailIcon}
                    <div className="error" id="usernameError"></div>
                </FormGroup>
                <FormGroup validationState={this.state.validationPassword1}>
                  <input className="form-control"
                     type="password"
                     ref="password1"
                     name="password1"
                     value={this.state.password1}
                     onChange={this.handleChange}
                     placeholder="Password"
                     required/>
                     {password1Icon}
                     <div className="error" id="password1Error"></div>
                   </FormGroup>
                {confirmPassword}
                <button type="submit" className="button expanded" onClick={this.onFormSubmit}>Sign In</button>
              </form>
              <div className="columns small-centered signin">
                <IndexLink to="/" className="route-button">Login</IndexLink>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="columns small-centered small-10 medium-6 large-4">
              {error}
            </div>
          </div>
        </div>
      );
  }
});

module.exports = SignIn;
