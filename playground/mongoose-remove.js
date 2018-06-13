const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

/*Todo.remove({}).then((result) => {
  console.log(result);
});*/

//Todo.findOneAndRemove()
Todo.findByIdAndRemove('5b219164c199d28f8b0f3b0f').then((todo) => {
  console.log(todo);
});
