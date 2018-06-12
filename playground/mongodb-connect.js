//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
  if (err){
    console.log('Unable to connect to MongoDB server');
  }
  console.log('Connect to MongoDb server');

  /*db.collection('todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
    if (err){
      return console.log('Unable to insert todo', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });*/

  /*db.collection('Users').insertOne({
    name: 'Daniela',
    age: 25,
    location: 'Bogota'
  }, (err, result) =>{
    if(err){
      return console.log('Unable to insert users', err);
    }
    console.log(result.ops[0]._id.getTimestamp());
  });*/

  db.close();
});
