const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

var {authenticate} = require('./middleware/authenticate');
var todo = require('./controllers/todo');
var user = require('./controllers/user');

var app = express();

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client/public')));

app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.post('/todos', authenticate, todo.addTodo);
app.get('/todos', authenticate, todo.getTodos);

app.get('/todos/:id', authenticate, todo.getOneTodo);
app.delete('/todos/:id', authenticate, todo.deleteOneTodo);
app.patch('/todos/:id', authenticate, todo.saveOneTodo);

app.post('/users/login', user.loginUser);
app.delete('/users/login', authenticate, user.logoutUser);

app.post('/users', user.addUser);
app.get('/users', user.getUser);
app.patch('/users', user.resetPassword);
app.delete('/users', authenticate, user.deleteUser)

app.post('/users/email', user.checkEmail);
app.get('/users/email', authenticate, user.getEmail);

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {
  app
};
