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

	db.collection('Users').find({name: 'Amy'}).toArray().then((docs) =>{
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('Unable to fetch todos', err);
	});


	//console.log(db.collection('Todos').find().count());		//a promise
	/*db.collection('Todos').find().count().then((count) =>{
		console.log(`Todos count: ${count}`);	
	}, (err) => {
		console.log('Unable to fetch todos', err);
	});

	/*db.collection('Todos').find({
		_id: new ObjectID('5a1f9d4762ca09c663cdd141')
	}).toArray().then((docs) =>{
		console.log('Todos');	
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('Unable to fetch todos', err);
	});
	/*db.collection('Todos').insertOne({
		text: 'Something to do',
		completed: false
	}, (err, result) => {
		if(err) {
			return console.log('Unable to insert todo', err);
		}

		console.log(JSON.stringify(result.ops, undefined, 2));
	});
	*/
	db.close();
});

