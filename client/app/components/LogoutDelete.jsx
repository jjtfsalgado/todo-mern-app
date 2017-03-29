import React from 'react';
var {Dropdown, ButtonToolbar, MenuItem} = require("react-bootstrap");
import {FaCircle, FaCheck, FaTimesCircle} from 'react-icons/lib/fa';
var {CustomToggle, CustomMenu} = require('Dropdown');
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';

var UserAPI = require('UserAPI');

var LogoutDelete = React.createClass({
  getInitialState: function () {
    return{
      delete: false,
      open:'',
      dropdown: false
    };
  },
  delete: function () {
    this.setState({
      delete: !this.state.delete,
      open: 'open'
    })
  },
  toggleOpenState: function () {
    this.setState({
      dropdown: !this.state.dropdown
    })
  },
  setDropdownFalse: function () {
    this.setState({
      dropdown: false,
      delete: false
    })
  },
  handleSignOut: function () {
    UserAPI.signOut().then(function () {
      console.log('Signed out');
    }).catch(function (error) {
      throw error;
    });
  },
  handleDeleteAccount: function () {
    UserAPI.deleteAccount().then(function () {
      console.log('Deleted account');
    }).catch(function (error) {
      throw error;
    });
  },
  render() {
    if (!this.state.delete) {
      return (
        <div className="button-logout">
          <RootCloseWrapper onRootClose={this.setDropdownFalse}>
            <Dropdown id="dropdown-custom-menu" open={this.state.dropdown} onToggle={this.toggleOpenState}>
              <CustomToggle bsRole="toggle" pullRight>
                <ul className="user">
                  <li>{this.props.user}</li>
                  <li><FaCircle/></li>
                </ul>
              </CustomToggle>

              <CustomMenu bsRole="menu" className="lista" pullRight>
                <MenuItem eventKey="1" onClick={this.handleSignOut}>Logout</MenuItem>
                <MenuItem divider />
                <MenuItem className="delete" ventKey="2" onClick={()=>{
                  this.delete()
                }}>Delete Account</MenuItem>
              </CustomMenu>
            </Dropdown>
          </RootCloseWrapper>
        </div>
      )
    }else{
    return (
      <div className="button-logout">
        <RootCloseWrapper onRootClose={this.setDropdownFalse}>
          <Dropdown id="dropdown-custom-menu" open={this.state.dropdown} onToggle={this.toggleOpenState}>
            <CustomToggle bsRole="toggle" pullRight>
              <ul className="user">
                <li>{this.props.user}</li>
                <li><FaCircle/></li>
              </ul>
            </CustomToggle>

            <CustomMenu bsRole="menu" className="lista">
              <MenuItem eventKey="1" onClick={this.handleSignOut}>Logout</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="2" className="delete">
              <div className="col1"><FaCheck className="check" onClick={this.handleDeleteAccount}/></div>
              <div className="col2"><FaTimesCircle className="back" onClick={() => {
                this.delete()
              }}/></div>
              </MenuItem>
            </CustomMenu>
          </Dropdown>
        </RootCloseWrapper>
      </div>
    )
    }
  }
});

module.exports = LogoutDelete;
