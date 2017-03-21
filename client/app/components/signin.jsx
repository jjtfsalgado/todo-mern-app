import React from 'react';
var {Link, IndexLink, hashHistory} = require('react-router');
import { Button, FormGroup, FormControl, Form, ControlLabel, Checkbox} from 'react-bootstrap';

var UserAPI = require('userAPI');

var SignIn = React.createClass({
  getInitialState(){
    return {
      email: '',
      password: ''
    };
  },
  handleChange(e){
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    })
  },
  onFormSubmit: function (e) {
    e.preventDefault();
    var email = this.state.email;
    var password = this.state.password;
    if (email.length > 0 && password.length > 0) {
      var that = this;
      UserAPI.signIn(email, password).then(function (res) {
        console.log('Sucess! You are signed in');
      }).catch(function (error) {
        throw error;
      });
      window.localStorage.removeItem('userLocal');

      this.state.email = '';
      this.state.password = '';

    }else if (password.length <= 5) {
      this.refs.passwordText.focus();
    }else{
      this.refs.emailText.focus();
    }
  },
  componentDidMount: function () {
    if (this.state.email == '') {
      this.refs.emailText.focus();
    }
  },
  render() {
    return (
      <div>
        <h1 className="page-title">ToDo</h1>
        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <p>Sign in into ToDo</p>
            <form className="callout callout-auth" onSubmit={this.onFormSubmit}>
              <input className="form-control" type="email" ref="emailText" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
              <input className="form-control" type="password" ref="passwordText" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
              <button type="submit" className="button expanded">Sign In</button>
            </form>
            <div className="columns small-centered signin">
              <IndexLink to="/">Login</IndexLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SignIn;
