var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var TodoApp = require('todoApp');
var Login = require('login');
var SignIn = require('signin')
//Load foundation
$(document).foundation();

//App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="todos" component={TodoApp}/>
      <Route path="signin" component={SignIn}/>
      <IndexRoute component={Login}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
