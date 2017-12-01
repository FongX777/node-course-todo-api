const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


//remove all
/*
 Todo.remove({}).then((result) => {
	 console.log(result);
 });
 */


//Todo.findOneAndRemove
Todo.findOneAndRemove({_id: '5a20ca4dae6241e99cb5d745'}).then((todo) => {

});



//Todo.findByIdAndRemove
Todo.findByIdAndRemove('5a20ca4dae6241e99cb5d745').then((todo) => {
	console.log(todo);
});
