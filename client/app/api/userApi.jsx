const axios = require('axios');

const API_URL = 'http://localhost:3000';

module.exports = {
  signIn: function (email, password) {
    return axios.post(`${API_URL}/users`, {email:email, password:password}).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log('error');
      throw error;
    });
  },
  logIn: function (email, password) {
    return axios.post(`${API_URL}/users/login`, {email:email, password:password}).then(function (response) {
      axios.defaults.headers.common['x-auth'] = response.headers['x-auth'];
    }).catch(function (error) {
      console.log('error');
      throw error;
    });
  }
};
