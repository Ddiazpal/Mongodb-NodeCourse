//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
  if (err){
    console.log('Unable to connect to MongoDB server');
  }
  console.log('Connect to MongoDb server');

  /*db.collection('todos').findOneAndUpdate({
    _id: new ObjectID('5b2047810ae255e0c574dd6c')
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });*/

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b20535c0ae255e0c574e1da')
  }, {
    $set: {
      name: 'Daniela'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });
  //  db.close();
});
