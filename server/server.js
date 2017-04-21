require('./config/config');

const _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

// save new something

var app = express();

// const port = process.env.PORT || 3000;
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate,(req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', authenticate,(req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({
            todos
        });
    }, (e) => {
        res.status(400).status(400).send(e);
    });
});


// GET /todos/1234
// url parameter
app.get('/todos/:id', authenticate ,(req, res) => {
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

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});

    }).catch((e) => {
        res.status(400).send();
    });

});

app.delete('/todos/:id', authenticate ,(req, res) => {
    // get the id 
    var id = req.params.id;
    console.log(id);
    // validate the id -> not valid? return 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    // remove todo by id
        // success
            // if no doc, send 404
            // if doc, send doc back with 200 
        // error
            // 400 with empty body
    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            console.log('ff');
            return res.status(404).send();
        }

        res.send({todo});

    }).catch((e) => {
        console.log('ffffffff');
        res.status(400).send();
    });

});


app.patch('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    // findOneAndUpdate
    Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});

    }).catch((e) => {
        res.status(400).send();
    });

});

// POST /users

// app.post('/users', (req, res) => {
//     var body = _.pick(req.body, ['email', 'password']);
//     var user = new User(body);
//     user.save().then(() => {
//         user.generateAuthToken();
//     }).then((token) => {
//         res.header('x-auth', token).send(user);
//     }).catch((e) => {
//         res.status(400).send(e);
//     });

// });

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});




app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});



// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.send(400).send();
    });
});

app.delete('/users/me/token', authenticate ,(req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});




app.listen(port, () => {
    console.log(`Started on port ${port}`);
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