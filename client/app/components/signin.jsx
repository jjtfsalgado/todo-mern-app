import React from 'react';
var {Link, IndexLink, hashHistory} = require('react-router');
import { Button, FormGroup, FormControl, Form, ControlLabel, Checkbox} from 'react-bootstrap';

var UserAPI = require('userAPI');

var SignIn = React.createClass({
  getInitialState(){
    return {
      email: '',
      password1:'',
      password2:''
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
    var password1 = this.state.password1;
    var password2 = this.state.password2;
    if (email.length > 0 && password1.length > 5 && password1==password2) {
      var that = this;

      UserAPI.signIn(email, password).then(function (res) {
        console.log('Confirm email');
        window.localStorage.removeItem('userLocal');
        UserAPI.rememberUser(email);

      }).catch(function (error) {
        throw error;
      });

      this.state.email = '';
      this.state.password1 = '';
      this.state.password2 = '';

    }else if (password1.length <= 5) {
      console.log('password length error');
      this.setState({
        password1:'',
        password2:''
      })
      this.refs.password1.focus();
    }else{
      console.log('error');
      this.setState({
        password1:'',
        password2:''
      })
      this.refs.emailText.focus();
    }
  },
  componentDidMount: function () {
    if (this.state.email == '') {
      this.refs.emailText.focus();
    }
  },
  render() {
    if (this.state.password1.length < 6) {
      return (
        <div>
          <h1 className="page-title">ToDo</h1>
          <div className="row">
            <div className="columns small-centered small-10 medium-6 large-4">
              <p>Sign in into ToDo</p>
              <form className="callout callout-auth" onSubmit={this.onFormSubmit}>
                <input className="form-control" type="email" ref="emailText" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                <input className="form-control" type="password" ref="password1" name="password1" value={this.state.password1} onChange={this.handleChange} placeholder="Password" />
                <button type="submit" className="button expanded">Sign In</button>
              </form>
              <div className="columns small-centered signin">
                <IndexLink to="/">Login</IndexLink>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1 className="page-title">ToDo</h1>
          <div className="row">
            <div className="columns small-centered small-10 medium-6 large-4">
              <p>Sign in into ToDo</p>
              <form className="callout callout-auth" onSubmit={this.onFormSubmit}>
                <input className="form-control" type="email" ref="emailText" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                <input className="form-control" type="password" ref="password1" name="password1" value={this.state.password1} onChange={this.handleChange} placeholder="Password" />
                <input className="form-control" type="password" ref="password2" name="password2" value={this.state.password2} onChange={this.handleChange} placeholder="Confirm Password" />
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
  }
});

module.exports = SignIn;
