var $ = require('jquery');
const axios = require('axios');

const API_URL = 'http://localhost:3000';

module.exports = {
  setTodos: function (todos) {
    if ($.isArray(todos)) {
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    }
  },
  getTodos: function () {
    return axios.get(`${API_URL}/todos`).then(function (response) {

      return response.data.todos;

    }).catch(function (error) {
      throw error;
    });

    var todos = [];

  },
  filterTodos: function (todos, showCompleted, searchText) {
    var filteredTodos = todos;
    // console.log(todos);

    // Filter by showCompleted
    filteredTodos = filteredTodos.filter((todo) => {
      return !todo.completed || showCompleted;
    });

    // Filter by searchText
    filteredTodos = filteredTodos.filter((todo) => {
      var text = todo.text.toLowerCase();
      return searchText.length === 0 || text.indexOf(searchText) > -1;
    })
    // Sort todos with non-completed first
    filteredTodos.sort((a,b) => {
      if(a.completed && b.completed){
        return -1;
      } else if (a.completed && !b.completed){
        return 1;
      } else {
        return 0;
      }
    });

    return filteredTodos;
  }
};
