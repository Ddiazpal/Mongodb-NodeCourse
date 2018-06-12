//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
  if (err){
    console.log('Unable to connect to MongoDB server');
  }
  console.log('Connect to MongoDb server');

  // deleteMany
  /*db.collection('todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    console.log(result);
  }); */

// deleteOne
  /*db.collection('todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    console.log(result);
  }); */

  //findOneAndDelete
  /*db.collection('todos').findOneAndDelete({completed: false}).then((result) =>{
    console.log(result);
  });*/

  //Users collection
  /*
  db.collection('Users').deleteMany({name: 'Daniela'}).then((result) => {
    console.log(result);
  }); */


  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5b204af00ae255e0c574df38')}).then((result) =>{
    console.log(result);
  	});
//  db.close();
});
