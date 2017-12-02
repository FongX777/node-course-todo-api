const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

//Override
UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
	//we want to use 'this' keyword,
	//but arrow func don't bind the keyword.
	var user = this;		//indivisual method
	var access = 'auth';
	var token  = jwt.sign({_id: user._id.toHexString(), access}, 'secret').toString();

	user.tokens.push({access, token});
	
	return user.save().then(() => {
		return token;
	});
};

UserSchema.statics.findByToken = function (token) {
	var User = this;		//model method
	var decoded;

	try{
		decoded = jwt.verify(token, 'secret');
	}catch (e) {
		return Promise.reject('test');			//Promise for chaining
		/*return new Promise((resolve, reject) => {
			reject();
		});*/
	}
	return User.findOne({				//return that in order to chaining, that we can call then, quote is needed for dot
		_id: decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

//middleware
UserSchema.pre('save', function(next) { 
	var user = this;

	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
	
});

//{
//	email: 'asdf@asdf.com',
//	password: 'asdf',
//	tokens: [{
//		access: 'auth', 		//type
//		token: 'asfqefqfqf'
//	}]
//}

//var User = mongoose.model('User', {

var User = mongoose.model('User', UserSchema);

module.exports = {User};

