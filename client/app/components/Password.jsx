import React from 'react';
import validator from 'validator';
var {Link, IndexLink, hashHistory} = require('react-router');
var {FormGroup, FormControl, Alert} = require("react-bootstrap");
import {FaCircle, FaCheck, FaTimesCircle} from 'react-icons/lib/fa';
var jwtDecode = require('jwt-decode');
import SetTimeoutMixin from 'mixins/settimeout';

var UserAPI = require('UserAPI');

var Password = React.createClass({
  mixins: [SetTimeoutMixin],
  getInitialState(){
    return {
      email: '',
      tokenCode: false,
      password2:'',
      submit:undefined,
      validationPassword1: undefined,
      validationPassword2: undefined,
      validationEmail: undefined
    };
  },
  componentWillMount:function () {
    if (this.props.location.query.verify) {
      var token = this.props.location.query.verify;
      var tokenDecoded = jwtDecode(token);
      if (tokenDecoded.email) {
        this.setState({
          tokenCode: true,
          email: tokenDecoded.email
        })
      }else{
        hashHistory.push('/');
      }
    }
  },
  handleChange(e){
    const name = e.target.name;
    var that = this;
    this.setState({
      [name]: e.target.value,
      submit: undefined
    })

    this.clearTimeouts();
    this.setTimeout(function () {
      that.formValidation(name)
    },700)
  },
  onFormSubmit: function (e) {
    e.preventDefault();
    var that = this;
    var email = this.state.validationEmail;
    var password1 = this.state.validationPassword1;
    var password2 = this.state.validationPassword2;

    if (!password2 && email == 'success') {
      UserAPI.resetPassword(this.state.email, this.state.password2).then(function () {
        console.log('Sucess! Email was sent');
        that.setState({
          submit: 'success'
        })
      }).catch(function (error) {
        throw error;
      });
    } else if ('success'== password1 && password2 == 'success'){
      UserAPI.resetPassword(this.state.email, this.state.password2).then(function () {
        console.log('Sucess! reseted password');
      }).then(function () {
        UserAPI.logIn(that.state.email, that.state.password2);
      }).catch(function (error) {
        throw error;
      });
    } else {
      that.setState({
        submit: 'warning'
      })
    }
  },
  formValidation: function (targetName) {
    const errorUser = document.getElementById(`usernameError`);
    const errorPass1 = document.getElementById(`password1Error`);
    const errorPass2 = document.getElementById(`password2Error`);

    if (targetName == 'email') {

      if (!validator.isEmail(this.state.email)) {
        errorUser.textContent = `Should be a valid email address`;
        this.setState({validationEmail: 'error'});
      } else if(validator.isEmail(this.state.email)){
        var that = this;
        UserAPI.checkEmailExist(this.state.email).then(function (res) {
            if (res.length === 0) {
              errorUser.textContent = `Your email doesn't exist in our records. Please sign in.`;
              that.setState({validationEmail: 'error'});
            } else {
              errorUser.textContent = '';
              that.setState({validationEmail: 'success'});
            }
        }).catch(function (error) {
          throw error;
        });
      }
    } else if (targetName == 'password1') {
      if (this.state.password1.length < 6) {
        errorPass1.textContent = 'Password must have min 6 characters';
        this.setState({
          validationPassword1: 'error',
          password2: '',
          validationPassword2: undefined
        });
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
        this.setState({
          validationPassword2: 'success',
          validationPassword1: 'success'
        });
      }
    }
  },
  render() {
    var validationIcon = (
      <FormControl.Feedback>
        <FaCheck/>
      </FormControl.Feedback>
    )

    if (this.state.submit == 'warning') {
      var alert = (
        <Alert bsStyle={this.state.submit}>
          <strong>Couldn't submit</strong> Please fullfill the form again.
        </Alert>
      )
    }

    if (this.state.submit == 'success') {
      var alert = (
        <Alert bsStyle={this.state.submit}>
          <strong>Success!</strong> Please click on the link sent to your email.
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

    if (!this.state.tokenCode) {
      return (
        <div>
          <h1 className="page-title">ToDo</h1>
          <div className="row">
            <div className="columns small-centered small-10 medium-6 large-4">
              <p>Insert your email</p>
              <form className="callout callout-auth" onSubmit={this.onFormSubmit}>
                <FormGroup validationState={this.state.validationEmail}>
                  <input className="form-control"
                    type="email"
                    name="email"
                    ref="username"
                    id="username"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder="Email"
                    required/>
                    <div className="error" id="usernameError"></div>
                </FormGroup>
                <button type="submit" className="button expanded">Reset Password</button>
              </form>
              <div className="columns small-centered signin">
                <Link to="/">Login</Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="columns small-centered small-10 medium-6 large-4">
              {alert}
            </div>
          </div>
        </div>
      );
    }else {
      return (
        <div>
          <h1 className="page-title">ToDo</h1>
          <div className="row">
            <div className="columns small-centered small-10 medium-6 large-4">
              <p>Insert your new password</p>
              <form className="callout callout-auth" onSubmit={this.onFormSubmit}>
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
                <button type="submit" className="button expanded">Change Password</button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="columns small-centered small-10 medium-6 large-4">
              {alert}
            </div>
          </div>
        </div>
      );
    }
  }
});

module.exports = Password;
