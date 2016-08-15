'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Todo = mongoose.model('Todo');

router.get('/', function(req, res, next) {
	Todo.find({}, '_id todoName itemDone', function(err, todo){
		res.render('index', { 
			todoList: todo,
			title: 'TODO DEMO'
		});
		res.json(todo);
	});
});
router.get('/index', function(req, res, next) {
	Todo.find({}, '_id todoName itemDone', function(err, todo){
		res.json(todo);
	});
});

router.post('/', function(req, res, next) {
	Todo.create({
		todoName: req.body.todoname
	}, function(err, todo){
		res.json(todo);
	});
});

router.delete('/del', function(req, res, next) {
	Todo.findOneAndRemove(
		{_id: req.body._id},
		{select: '_id todoName update'},
		function(err, todo){
			res.json(todo);
		}
	);
});

router.put('/itemname', function(req, res, next) {
	console.log(req.body);
	Todo.update(
		{_id: req.body._id},
		{
			$set: {
				update: Date.now(),
				todoName: req.body.todoname
			}
		},function(err, todo){
			res.json(todo);
		}
	)
});

router.put('/itemdone', function(req, res, next) {
	console.log(req.body);
	Todo.update(
		{_id: req.body._id},
		{
			$set: {
				update: Date.now(),
				itemDone: req.body.itemdone
			}
		},function(err, todo){
			res.json(todo);
		}
	)
});

module.exports = router;
