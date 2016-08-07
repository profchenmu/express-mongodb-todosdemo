var mongoose = require('mongoose');
var db = require('./models/db');
var Todo = mongoose.model('Todo');

for(var i=0; i<3; i++){
	Todo.create({
		todoName: 'demo' + i
	}, function(err, todo){
		console.log(err, todo);
	})
}
