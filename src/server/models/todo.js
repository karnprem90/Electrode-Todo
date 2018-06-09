const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    minlength: 1,
    tags: { type: [String], index: true }
  },
  description: {
        type: String,
        minlength: 1
    },
    createdAt: {
        type: Date, default: Date.now
    },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});


TodoSchema.index({ text: 1, type: -1 });
const Todo = mongoose.model('ToDo', TodoSchema);

module.exports = {Todo};
