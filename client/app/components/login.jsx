import React from 'react';
var {Link, IndexLink, hashHistory} = require('react-router');
import { Button, FormGroup, FormControl, Form, ControlLabel, Checkbox} from 'react-bootstrap';

var UserAPI = require('userAPI');

var Login = React.createClass({
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

    if (email.length > 0 && password.length > 5) {
      var that = this;
      UserAPI.logIn(email, password).then(function (res) {
        console.log('Sucess! You are logged in');
        hashHistory.push('/todos');
      }).catch(function (error) {
        throw error;
      });

    }else{
      // this.refs.todoText.focus();
    }
  },
  render() {
    return (
      <div>
        <h1 className="page-title">ToDo</h1>
        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <p>Login into your account</p>
            <form className="callout callout-auth" onSubmit={this.onFormSubmit}>
              <FormGroup>
                <FormControl type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <FormControl type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
              </FormGroup>
              <FormGroup>
                <Checkbox>Remember me</Checkbox>
              </FormGroup>
              <Button type="submit" className="button expanded">Login</Button>
            </form>
            <div className="columns small-centered signin">
              <Link to="/signin">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Login;
