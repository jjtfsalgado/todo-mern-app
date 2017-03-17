const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const path = require('path');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
// var {authenticate} = require('./middleware/authenticate');

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

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    createdAt: req.body.createdAt
    // _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find({
    // _creator: req.user._id
  }).then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  // if (!ObjectID.isValid(id)) {
  //   return res.status(404).send();
  // }

  Todo.findOne({
    _id: id,
    // _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});

  }).catch((e) => {
    res.status(400).send();

  });
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id: id
    // _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id/completed', (req, res) => {
  var id = req.params.id;
  console.log(req.body);

  Todo.findById(id, function (err, todo) {
      if (err) {
          res.status(500).send(err);
      } else {

          todo.completed = req.body.completed;
          todo.completedAt = req.body.completedAt;

          todo.save(function (err, recipe) {
              if (err) {
                  res.status(500).send(err)
              }
              res.send(todo);
          });
      }
  });
  // var todos = req.body;
  // for (var i = 0; i < todos.length; i++) {
  //   var id = todos[i]._id)
  //
  //   Todo.findById(id, function (err, todo) {
  //       if (err) {
  //           res.status(500).send(err);
  //       } else {
  //
  //           todo.completed = todos[i].completed;
  //
  //           todo.save(function (err, todo) {
  //
  //               res.send(todo);
  //           });
  //       }
  //   });
  //   res.send(200)
  // }

});


app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  // var body = _.pick(req.body, ['text', 'completed']);
  //
  // if (!ObjectID.isValid(id)) {
  //   return res.status(404).send();
  // }
  //
  // if (_.isBoolean(body.completed) && body.completed) {
  //   body.completedAt = new Date().getTime();
  // } else {
  //   body.completedAt = null;
  // }

  Todo.findById(id, function (err, todo) {
      if (err) {
          res.status(500).send(err);
      } else {

          todo.text = req.body.text;
          todo.createdAt = req.body.createdAt;

          todo.save(function (err, recipe) {
              if (err) {
                  res.status(500).send(err)
              }
              res.send(todo);
          });
      }
  });
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/users/me', (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email','password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/users/me/token', (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  })
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {
  app
};
