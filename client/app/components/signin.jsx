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
        hashHistory.push('/');
      }).catch(function (error) {
        throw error;
      });

      this.state.email = '';
      this.state.password = '';
    }else{
      this.refs.todoText.focus();
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
              <FormGroup>
                <FormControl type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <FormControl type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
              </FormGroup>
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
