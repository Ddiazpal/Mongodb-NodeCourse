//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
  if (err){
    console.log('Unable to connect to MongoDB server');
  }
  console.log('Connect to MongoDb server');

/*  db.collection('todos').find({
    _id: new ObjectID('5b203a02d7ea0a6ae4ddd8d0')
  }).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });*/

/*  db.collection('todos').find().count().then((count) => {
    console.log(`Todos count: ${count}`);
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });*/

  db.collection('Users').find({
      name: 'Daniela'
    }).toArray().then((docs) => {
      console.log('Users');
      console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
      console.log('Unable to fetch Users', err);
    });

//  db.close();
});
