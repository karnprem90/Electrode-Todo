const _ = require('lodash');
const {ObjectID} = require('mongodb');
const {mongoose} = require('./../db/mongoose');

var {Todo} = require('./../models/todo');

var todoController = {};

todoController.addTodo = [
  function(req,res,next) {
    var todo = new Todo({
      text: req.body.text,
      description: req.body.description,
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
  const id = req.params.id;

  Todo.findById(id, function (err, todo) {
      if (err) {
          res.status(400).send(err);
      } else {

          todo.text = req.body.text;
          todo.description = req.body.description;
          todo.createdAt = Date.now();

        todo.save(function (err, todo) {
          if (err) {
            res.status(400).send(err)
          }
          res.send(todo);
        });
      }
  });
  }


];



todoController.search = [
    function(req,res) {
        const text = req.params.text;

        Todo.find({ $text: { $search: text } }, (err,todo) => {
            if(err){
                return res.json({'success':false,'message':'Some Error'});
            }
            if(todo.length){
                return res.json({'success':true,'message':'Todo fetched by id successfully',todo});
            }
            else{
                return res.json({'success':false,'message':'Todo with the given id not found'});
            }
        })
    }
];

module.exports = todoController;
