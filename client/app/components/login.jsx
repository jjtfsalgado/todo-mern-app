import React from 'react';
var {Link, IndexLink} = require('react-router');
import { Button, FormGroup, FormControl, Form, ControlLabel, Checkbox} from 'react-bootstrap';


var Login = React.createClass({
  render() {
    return (
      <div>
        <h1 className="page-title">Todo App</h1>
        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <p>Login into your account</p>
            <div className="callout callout-auth">
              <FormGroup>
                <FormControl type="email" placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <FormControl type="password" placeholder="Password" />
              </FormGroup>
              <FormGroup>
                <Checkbox>Remember me</Checkbox>
              </FormGroup>
              <Link to="/todos">
                <Button type="submit" className="button expanded">Login</Button>
              </Link>
            </div>
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
