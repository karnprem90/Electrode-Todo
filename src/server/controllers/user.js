const _ = require('lodash');
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {mongoose} = require('./../db/mongoose');
const {User} = require('./../models/user');
const {Todo} = require('./../models/todo');

let userController = {};

userController.addUser = [
  function(req,res) {
      const body = _.pick(req.body, ['email', 'password']);
      User.find({email: req.body.email}).then(function (user) {
          console.log('user', user);
          if (user.length > 0) {
              res.status(400).json({
                  success: 'This email id is already exists please Login'
              });
          } else {
              console.log('body', body);
              const user = new User(body);
              user.save().then(function (result) {
                  console.log(result);
                  res.status(200).json({
                      success: 'New user has been created'
                  });
              }).catch(error => {
                  res.status(500).json({
                      error: error
                  });
              });
          }
      });
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


module.exports = userController;
