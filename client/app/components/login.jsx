import React from 'react';
var {Link, IndexLink, hashHistory} = require('react-router');
var {Alert} = require("react-bootstrap");

var UserAPI = require('UserAPI');

var Login = React.createClass({
  getInitialState(){
    return {
      email: UserAPI.getLocalUser() ? UserAPI.getLocalUser().email : '',
      password: UserAPI.getLocalUser() ? UserAPI.getLocalUser().password : '',
      remember: true,
      validation: undefined
    };
  },
  handleCheck: function() {
    this.setState({
      remember: this.refs.showCompleted.checked
    })
  },
  handleChange(e){
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
      validation: undefined
    })
  },
  onFormSubmit: function (e) {
    e.preventDefault();
    var email = this.state.email;
    var password = this.state.password;

    if (email && password) {
      if (this.state.remember) {
        UserAPI.rememberUser(email, password);
      } else {
        window.localStorage.removeItem('userLocal');
      }
      var that = this;
      UserAPI.logIn(email, password).then(function (res) {
        console.log('Sucess! You are logged in');
      }).catch(function (error) {
        that.setState({
          validation: false,
          password: ''
        })
        throw error;
      });
    }else{
      this.refs.emailText.focus();
      this.setState({
        validation: false,
        password: ''
      })
    }

  },
  componentDidMount: function () {
    if (this.state.email == '') {
      this.refs.emailText.focus();
    }
  },
  render() {

    if (this.state.validation == false) {
      var alert = (
        <Alert bsStyle="warning">
          <strong>Couldn't login</strong> Please try again.
        </Alert>
      )
    }

    return (
      <div>
        <h1 className="page-title">ToDo</h1>
        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <p>Login into your account</p>
            <form className="callout callout-auth" onSubmit={this.onFormSubmit}>
                <input className="form-control" type="email" ref="emailText" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                <input className="form-control" type="password" ref="passwordText" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                <div className="row">
                  <label className="col1">
                    <input type="checkbox" ref="showCompleted" defaultChecked="true" onClick={this.handleCheck}/>
                    Remember me
                  </label>
                  <div className="col2">
                    <Link to="/password">Forgot password?</Link>
                  </div>
                </div>
              <button type="submit" className="button expanded">Login</button>
            </form>
            <div className="columns small-centered signin">
              <Link to="/signup">Sign Up</Link>
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
  }
});

module.exports = Login;
