var mongoose = require('mongoose');
var dbURI = 'mongodb://127.0.0.1/todos';

mongoose.connect(dbURI);
mongoose.connection.on('connected', function () {
	console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
	console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
	console.log('Mongoose disconnected');
});

var todoSchema = new mongoose.Schema({
	todoName: {type: String, required: true},
	update: {type: Date, default: Date.now()},
	itemDone: {type: String}
});
mongoose.model('Todo', todoSchema);

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'WDI'
});

connection.connect(function(err){
	if(err){
		console.log('error: ' + err.stack);
	}
	console.log('connected as id ' + connection.threadId);
});

connection.query('select `Country Name`,`id` from `WDI`.`WDI_Data`  limit 0,5', function(err, rows, fields){
	if(err) throw err;
	console.log(rows[0]);
});


