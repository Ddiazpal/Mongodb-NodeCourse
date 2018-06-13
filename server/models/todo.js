var mongoose = require('mongoose');
//Save new Something (MODEL)
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true, //The value must exists
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    dafault: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};
