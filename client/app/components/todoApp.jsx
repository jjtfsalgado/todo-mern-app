var React = require('react');
var moment = require('moment');

var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');
var TodoAPI = require('todoAPI');

var TodoApp = React.createClass({
  getInitialState: function () {
    return{
      showCompleted: false,
      searchText: '',
      todos: undefined
    };
  },
  componentWillMount: function () {
    var that = this;

    TodoAPI.getTodos().then(function (res) {
      that.setState({
        todos: res
      })
    }).catch(function (error) {
      throw error;
    });
  },
  handleAddTodo: function (text) {
    var that = this;

    var todo = {
      text: text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: undefined
    }

    TodoAPI.addTodo(todo).then(function () {
      that.componentWillMount();
    }).catch(function (error) {
      throw error;
    });
  },
  handleToggle: function(_id){
    var updatedTodos = this.state.todos.map((todo) => {
      if (todo._id === _id) {
        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ? moment().unix() : undefined;

        TodoAPI.saveCompleted(_id, todo.completed, todo.completedAt).then(function () {
          console.log('Sucess!! It was updated!');
        }).catch(function (error) {
          throw error;
        });
      }
      return todo;
    });
    this.setState({todos: updatedTodos});
  },
  handleSearch: function (showCompleted, searchText) {
    this.setState({
      showCompleted: showCompleted,
      searchText: searchText.toLowerCase()
    });
  },
  handleDelete: function (_id) {
    var that = this;
    TodoAPI.deleteTodo(_id).then(function () {
      that.componentWillMount();

    }).catch(function (error) {
      throw error;
    });;

  },
  handleEdit: function (_id, text) {
    var that = this;
    var createdAt = moment().unix();

    TodoAPI.editTodo(_id, text, createdAt).then(function () {
      that.componentWillMount();
    }).catch(function (error) {
      throw error;
    });;

    var updatedTodos = this.state.todos.map((todo) => {
      if (todo._id === _id) {
        todo.text = text;
        todo.createdAt = createdAt;
      }
      return todo;
    });
    this.setState({todos: updatedTodos});
  },
  render:function () {

    if (this.state.todos) {
      var {todos, showCompleted, searchText} = this.state;
      var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

      return(
        <div>
          <h1 className="page-title">ToDo App</h1>

          <div className="row">
            <div className="column small-centered small-11 medium-6 large-5">
              <div className="container">
                <TodoSearch onSearch={this.handleSearch}/>
                <TodoList todos={filteredTodos} onToggle={this.handleToggle} onDelete={this.handleDelete} onEdit={this.handleEdit}/>
                <AddTodo onAddTodo={this.handleAddTodo}/>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <h1>Fetching data</h1>
      )
    }
  }
});

module.exports = TodoApp;
