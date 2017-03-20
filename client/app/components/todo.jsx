var React = require('react');
var moment = require('moment');
import {FaTrashO,FaEdit,FaCheck,FaTimesCircle} from 'react-icons/lib/fa';
import { ButtonToolbar, Button, Modal, FormGroup, FormControl, ControlLabel  } from 'react-bootstrap';

var Todo = React.createClass({
  getInitialState: function () {
    return{
      edit: false
    };
  },
  edit: function () {
    this.setState({
      edit: !this.state.edit,
      text: this.props.text
    })
  },
  handleChange(e){
    this.setState({
      text: e.target.value,
    })
  },
  render:function () {
    var {text, _id, completed, createdAt, completedAt} = this.props;
    var todoClassName = completed ? 'todo todo-completed' : 'todo';
    var renderDate = () => {
      var message = 'Created: ';
      var timestamp = createdAt;

      if (completed) {
        message = 'Completed: ';
        timestamp = completedAt;
      }

      return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm a');
    };
    var renderEdit = () => {
      if (!this.state.edit) {
        return(
          <div className={todoClassName}>
              <div className="col1" onClick={() => {
                this.props.onToggle(_id);
              }}>
                <input type="checkbox" checked={completed}/>
              </div>
              <div className="col2" onClick={() => {
              this.props.onToggle(_id);
              }}>
                <p>{text}</p>
                <p className="todo__subtext">{renderDate()}</p>
              </div>

            <ul className="col3">
              <li><FaEdit className="edit" onClick={() => {
                this.edit()
              }}/></li>
              <li><FaTrashO className="delete" onClick={() => {
                this.props.onDelete(_id);
              }}/></li>
            </ul>
          </div>
        )
      }else{
        return(
          <div className={todoClassName}>
              <div className="col1">
              </div>
              <div className="col2">
                <form onSubmit={() => {
                  this.props.onEdit(_id, this.state.text),
                  this.edit()
                }} className="countdown-form">

                  <input type="text" value={this.state.text} onChange={this.handleChange} placeholder="Todo what?"/>
                </form>
              </div>
            <ul className="col3">
              <li><FaCheck className="edit" onClick={() => {
                this.props.onEdit(_id, this.state.text),
                this.edit()
              }}/></li>
              <li><FaTimesCircle className="delete" onClick={() => {
                this.edit()
              }}/></li>
            </ul>
          </div>
        )
      }
    };

    return(
        <div>{renderEdit()}</div>
    );
  }
});

module.exports = Todo;
