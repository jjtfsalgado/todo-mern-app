import React from 'react';
var {Link, IndexLink, hashHistory} = require('react-router');
var jwtDecode = require('jwt-decode');

var UserAPI = require('userAPI');

var Password = React.createClass({
  getInitialState(){
    return {
      email: '',
      tokenCode: false,
      password2:''
    };
  },
  componentWillMount:function () {
    if (this.props.location.query.id) {
      var token = this.props.location.query.id;
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
    this.setState({
      [name]: e.target.value,
    })
  },
  onFormSubmit: function (e) {
    e.preventDefault();
    var email = this.state.email;
    var password2 = this.state.password2;
    if (!password2) {
      UserAPI.resetPassword(email, password2).then(function () {
        console.log('Sucess! Email was sent');
      }).catch(function (error) {
        throw error;
      });
    } else {
      UserAPI.resetPassword(email, password2).then(function () {
        console.log('Sucess! reseted password');
      }).then(function () {
        UserAPI.logIn(email, password2);
      }).catch(function (error) {
        throw error;
      });
    }
  },
  render() {
    if (!this.state.tokenCode) {
      return (
        <div>
          <h1 className="page-title">ToDo</h1>
          <div className="row">
            <div className="columns small-centered small-10 medium-6 large-4">
              <p>Insert your email</p>
              <form className="callout callout-auth" onSubmit={this.onFormSubmit}>
                <input className="form-control" type="email" ref="emailText" value={this.state.email} onChange={this.handleChange} name="email" placeholder="Email" />
                <button type="submit" className="button expanded">Reset Password</button>
              </form>
              <div className="columns small-centered signin">
                <Link to="/">Login</Link>
              </div>
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
                <input className="form-control" type="password" ref="password1" name="password1" value={this.state.password1} onChange={this.handleChange} placeholder="Password" />
                <input className="form-control" type="password" ref="password2" name="password2" value={this.state.password2} onChange={this.handleChange} placeholder="Confirm Password" />
                <button type="submit" className="button expanded">Change Password</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
});

module.exports = Password;
