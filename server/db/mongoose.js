var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');


//module.exports = { mongoose: mongoose };
module.exports = { mongoose };
//everything starts util mongoose connect to db,
//you don't have to worry about the order


