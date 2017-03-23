import React from 'react';
var {Link, IndexLink, hashHistory} = require('react-router');

var UserAPI = require('userAPI');

var Login = React.createClass({
  getInitialState(){
    return {
      email: UserAPI.getLocalUser() ? UserAPI.getLocalUser().email : '',
      password: UserAPI.getLocalUser() ? UserAPI.getLocalUser().password : '',
      remember: true
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
    })
  },
  onFormSubmit: function (e) {
    e.preventDefault();
    var email = this.state.email;
    var password = this.state.password;

    if (email && password.length > 5 && password) {
      if (this.state.remember) {
        UserAPI.rememberUser(email, password);
      } else {
        window.localStorage.removeItem('userLocal');
      }
      var that = this;
      UserAPI.logIn(email, password).then(function (res) {
        console.log('Sucess! You are logged in');
      }).catch(function (error) {
        throw error;
      });

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
                    <a href="#"><p>Forgot password?</p></a>
                  </div>
                </div>
              <button type="submit" className="button expanded">Login</button>
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
