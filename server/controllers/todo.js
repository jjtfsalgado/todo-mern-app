const _ = require('lodash');
const {ObjectID} = require('mongodb');
var {mongoose} = require('./../db/mongoose');

var {Todo} = require('./../models/todo');

var todoController = {};

todoController.addTodo = [
  function(req,res,next) {
    var todo = new Todo({
      text: req.body.text,
      createdAt: req.body.createdAt,
      _creator: req.user._id
    });

    todo.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  }
];

todoController.getTodos = [
  function(req,res,next) {
    Todo.find({
      _creator: req.user._id
    }).then((todos) => {
      res.send({todos})
    }, (e) => {
      res.status(400).send(e);
    });
  }
];

todoController.getOneTodo = [
  function(req,res,next) {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    Todo.findOne({
      _id: id,
      _creator: req.user._id
    }).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({todo});

    }).catch((e) => {
      res.status(400).send();

    });
  }
];

todoController.deleteOneTodo = [
  function(req,res,next) {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
  }
]

todoController.deleteOneTodo = [
  function(req,res,next) {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
  }
]

todoController.saveOneTodo = [
  function(req,res,next) {
  var id = req.params.id;

  Todo.findById(id, function (err, todo) {
      if (err) {
          res.status(400).send(err);
      } else {

        if (req.body.createdAt) {
          todo.text = req.body.text;
          todo.createdAt = req.body.createdAt;
        } else {
          todo.completed = req.body.completed;
          todo.completedAt = req.body.completedAt;
        }

        todo.save(function (err, todo) {
          if (err) {
            res.status(400).send(err)
          }
          res.send(todo);
        });
      }
  });
  }
]

module.exports = todoController;
