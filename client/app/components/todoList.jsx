var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
  render:function () {
    var {todos} = this.props;
    var renderTodos = () => {
      if (todos.length === 0) {
        return(
          <p className="container__message">Do your work</p>
        )
      }
      return todos.map((todo) => {
        return(
          <Todo key={todo._id} {...todo} onToggle={this.props.onToggle} onDelete={this.props.onDelete} onEdit={this.props.onEdit} onCLickEdit={this.props.onCLickEdit} edit={this.props.edit}/>
        )
      })
    };

    return(
        <div className="container__todos">
          {renderTodos()}
        </div>
    );
  }
});

module.exports = TodoList;
