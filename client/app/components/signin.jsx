import React from 'react';
var {Link, IndexLink} = require('react-router');
import { Button, FormGroup, FormControl, Form, ControlLabel, Checkbox} from 'react-bootstrap';


var SignIn = React.createClass({
  render() {
    return (
      <div>
        <h1 className="page-title">ToDo</h1>
        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <p>Sign in into ToDo</p>
            <div className="callout callout-auth">
              <FormGroup>
                <FormControl type="email" placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <FormControl type="password" placeholder="Password" />
              </FormGroup>
              <Link to="/login">
                <Button type="submit" className="button expanded">Sign In</Button>
              </Link>
            </div>
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
