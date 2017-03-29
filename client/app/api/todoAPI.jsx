var $ = require('jquery');
const axios = require('axios');

const API_URL = 'http://localhost:3000';

module.exports = {
  addTodo: function (todo) {
    return axios.post(`${API_URL}/todos`, todo).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      throw error;
    });
  },
  getTodos: function () {
    return axios.get(`${API_URL}/todos`).then(function (response) {
      return response.data.todos;
    }).catch(function (error) {
      throw error;
    });
  },
  saveCompleted: function (id, completed, completedAt) {
    return axios.patch(`${API_URL}/todos/${id}`, {completed:completed, completedAt:completedAt}).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      throw error;
    });
  },
  filterTodos: function (todos, showCompleted, searchText) {
    var filteredTodos = todos;

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
  },
  deleteTodo: function (id) {
    return axios.delete(`${API_URL}/todos/${id}`).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      throw error;
    });
  },
  editTodo: function (id, text, createdAt) {
    return axios.patch(`${API_URL}/todos/${id}`, {text:text, createdAt:createdAt}).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      throw error;
    });
  }
};
