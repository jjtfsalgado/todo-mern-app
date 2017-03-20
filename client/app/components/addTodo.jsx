var React = require('react');

var AddTodo = React.createClass({
  onFormSubmit: function(e){
    e.preventDefault();

    var todoText = this.refs.todoText.value;

    if (todoText.length > 0) {
      this.refs.todoText.value = '';
      this.props.onAddTodo(todoText);
    }else{
      this.refs.todoText.focus();
    }
  },
  render:function () {
    return(
        <form onSubmit={this.onFormSubmit} className="container__footer">
            <input type="text" ref="todoText" placeholder="What you need to do?"/>
            <button className="button expanded">Add todo</button>
        </form>
    );
  }
});

module.exports = AddTodo;
