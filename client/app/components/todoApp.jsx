var React = require('react');
var uuid = require('node-uuid');
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
  componentDidUpdate: function(){
    // TodoAPI.setTodos(this.state.todos);
    console.log(this.state.todos);
  },
  handleAddTodo: function (text) {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: uuid(),
          text: text,
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined
        }
      ]
    })
  },
  handleToggle: function(id){
    var updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ? moment().unix() : undefined;
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
  render:function () {
    // var {todos, showCompleted, searchText} = this.state;
    // var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
    console.log(this.state.todos);
    if (this.state.todos) {
      return(
        <div>
          <h1 className="page-title">Todo App</h1>

          <div className="row">
            <div className="column small-centered small-11 medium-6 large-5">
              <div className="container">
                <TodoSearch onSearch={this.handleSearch}/>
                <TodoList todos={this.state.todos} onToggle={this.handleToggle}/>
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
