var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

// save new something

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        });
    }, (e) => {
        res.status(400).status(400).send(e);
    });
});


// GET /todos/1234
// url parameter
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    // res.send(req.params);
    // Valid id using isValid
    // 404 - send back empty send

    // findById
    // success
    // if todo send it back
    // if no todo send back 404 with empty body
    // error
    // 400 - and send empty body back
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});

    }).catch((e) => {
        res.status(400).send();
    });

});


app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {
    app
};















































// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('Save todo', doc);
// }, (e) => {
//     console.log('Unable to save todo')
// });

// var newTodo2 = new Todo({
//     text: 'Feed the cat',
//     completed: true,
//     completedAt: 123
// });

// var newTodo2 = new Todo({
//     text: 'Something to do'
// });

// newTodo2.save().then((doc) => {
//     console.log('Save todo #2', doc);
// }, (e) => {
//     console.log('Unable to save todo #2', e);
// });

// User Model
// email [require, trim, set type, minlength] [explore custom validation]
// 

// var user = new User({
//     email: 'andrew@example.com'
// });

// user.save().then((doc) => {
//     console.log('User saved', doc);
// }, (e) => {
//     console.log('Unable to save user', e);
// });