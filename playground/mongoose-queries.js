const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
//const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5b212db8615fb54c03d75754';

User.findById(id).then((user) => {
  if (!user){
    return console.log('Id not found');
  }
  console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));

/*
var id = '5b215e6f28eca114393a2e3';

if (!ObjectId.isValid(id)){
  console.log('Id is not valid');
}

Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos',todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo',todo);
});

Todo.findById(id).then((todo) => {
  if (!todo){
    return console.log('Id not found');
  }
  console.log('Todo By Id',todo);
}).catch((e) => console.log(e));
*/
