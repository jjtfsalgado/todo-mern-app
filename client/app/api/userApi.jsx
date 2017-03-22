const axios = require('axios');

const API_URL = 'http://localhost:3000';

module.exports = {
  signIn: function (email, password) {
    return axios.post(`${API_URL}/users/verify`, {email:email, password:password}).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      throw error;
    });
  },
  logIn: function (email, password, remember) {
    return axios.post(`${API_URL}/users/login`, {email:email, password:password}).then(function (response) {
      axios.defaults.headers.common['x-auth'] = response.headers['x-auth'];
      window.localStorage.setItem('token', response.headers['x-auth']);
    }).catch(function (error) {
      throw error;
    });
  },
  signOut: function () {
    return axios.delete(`${API_URL}/users/me/token`).then(function (response) {
      console.log(response);
      window.localStorage.removeItem('token');
    }).catch(function (error) {
      throw error;
    });
  },
  getUser: function () {
    return axios.get(`${API_URL}/users/me`).then(function (response) {
      var email = response.data.email;
      var name = email.substring(0, email.lastIndexOf("@"));
      return name;
    }).catch(function (error) {
      throw error;
    });
  },
  rememberUser: function (email, password) {
    var userLocal = {
      email: email,
      password: password
    }
    window.localStorage.setItem('userLocal',JSON.stringify(userLocal));
  },
  getLocalUser: function () {
    var userLocal = JSON.parse(localStorage.getItem('userLocal'));
    return userLocal;
  }
};
