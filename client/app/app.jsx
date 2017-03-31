var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory, browserHistory} = require('react-router');
const axios = require('axios');

var TodoApp = require('todoApp');
var Login = require('login');
var SignUp = require('signup')
var Password = require('password');

var token = window.localStorage.getItem('token');

if (token) {
  axios.defaults.headers.common['x-auth'] = token;
}

var requireLogin = (nextState, replace, next) => {
  if (!token) {
    replace('/');
  }
  next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  if (token) {
    replace('/todos');
  }
  next();
};

//Load foundation
$(document).foundation();

//App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="todos" component={TodoApp} onEnter={requireLogin}/>
      <Route path="signup" component={SignUp} />
      <Route path="password" component={Password} onEnter={redirectIfLoggedIn}/>
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
