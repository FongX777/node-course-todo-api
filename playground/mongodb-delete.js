//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID}= require('mongodb');

var obj = new ObjectID();
console.log(obj);


//no need to create a db before, mongodb create a new db until you add data
//into it
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
	if(err){
		return console.log('Unable to connect to MongoDB server');
	}

	console.log('Connected to MongoDB server');

	db.collection('Users').deleteMany({name: 'Amy'});

	db.collection('Users').findOneAndDelete({
		_id: new ObjectID("5a1ec1a8b1e1434bf3ffa242")
	}).then((results) => {
		console.log(JSON.stringify(results, undefined, 2));
	});


	//findOneAndDelete
	/*
	db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
		console.log(result);
	});

	// deleteOne
	/*
	db.collection('Todos').deleteOne({text: 'Eating lunch'}).then((result) => {
		console.log(result);
	});


	// deleteMany
	/*
	db.collection('Todos').deleteMany({text: 'Eating lunch'}).then((result) => {
		console.log(result);
	});
	*/
	db.close();
});

