const _ = require('lodash');
const {ObjectID} = require('mongodb');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {config} = require('./../config/passwords');
var {mongoose} = require('./../db/mongoose');
var {User} = require('./../models/user');
var {Todo} = require('./../models/todo');

var userController = {};

userController.addUser = [
  function(req,res,next) {
    var body = _.pick(req.body, ['email', 'password']);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.EMAIL,
        pass: config.PASSWORD
      }
    });

    var token = jwt.sign({body}, config.HASH);
    var link="http://"+req.get('host')+"/users?verify="+token;

    let mailOptions = {
      from: '"ToDo Mern" <todomern.info@gmail.com>', // sender address
      to: `${body.email}`, // list of receivers
      subject: 'Hello stranger!', // Subject line
      html: `<p>Please click on the link to confirm your email <br/><a href=${link}>Click Here!</a></p>`, // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(400).send(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      res.status(200).send(body);
    });

  }
];

userController.getUser = [
  function(req,res,next) {
    var token = req.query.verify;

    var decoded = jwt.verify(token, config.HASH);
    var user = new User(decoded.body);

    user.save().then(() => {
      res.redirect('/');
    }).catch((e) => {
      res.status(400).send(e);
    })

  }
];

userController.deleteUser = [
  function(req,res,next) {
    var id = req.user.id;

    User.findByIdAndRemove(id).then((user) => {
      var response = {
        message: "user successfully deleted",
        user: user
      }
      res.status(200).send(response);
    }).then(() => {
      Todo.remove({_creator: id}).then(() => {
      }).catch((e) => {
        res.status(400).send(e);
      })
    }).catch((e) => {
      res.status(400).send(e);
    })
  }
];

userController.resetPassword = [
  function(req,res,next) {
    var body = _.pick(req.body, ['email', 'password']);
    console.log(body);
    if (!body.password) {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.EMAIL,
          pass: config.PASSWORD
        }
      });

      var token = jwt.sign({email : body.email}, config.HASH);
      var link="http://"+req.get('host')+"/#/password?verify="+token;

      let mailOptions = {
        from: '"ToDo Mern" <todomern.info@gmail.com>', // sender address
        to: `${body.email}`, // list of receivers
        subject: 'Request to reset password', // Subject line
        html: `<p>We received a request to reset your password. Please click on the link to confirm <br/><a href=${link}>Click Here!</a></p>`, // plain text body
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(400).send(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.status(200).send(body);
      });
    } else if (body.email && body.password) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(body.password, salt, (err, hash) => {
          body.password = hash;
          User.update({email:body.email}, {$set: {password: body.password}}).then((user) => {
            res.status(200).send(user);
          }).catch((e) => {
            res.status(400).send(e);
          });
        });
      });
    }
  }
];

userController.loginUser = [
  function(req,res,next) {
    var body = _.pick(req.body, ['email','password']);
    User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      });
    }).catch((e) => {
      res.status(400).send(e);
    });
  }
];

userController.logoutUser = [
  function(req,res,next) {
    req.user.removeToken(req.token).then(() => {
      res.status(200).send();
    }, () => {
      res.status(400).send();
    })
  }
];

userController.checkEmail = [
  function(req,res,next) {
    var body = _.pick(req.body, ['email']);

    User.find({email:body.email}).then((user) => {
      res.status(200).send(user);
    }).catch((e) => {
      res.status(400).send();
    });
  }
];

userController.getEmail = [
  function(req,res,next) {
    var email = req.user.email;
    if (!email) {
      res.status(400).send(e);
    }
    res.status(200).send(email);
  }
];

module.exports = userController;
