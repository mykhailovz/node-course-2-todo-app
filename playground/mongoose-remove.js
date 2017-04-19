const {} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({})


// Tod 


// findOneAndRemove
// Todo.findOneAndRemove()
// Todo.findByIdAndRemove()

Todo.findOneAndRemove({_id: "58f71bc79153e4e113df6853"}).then((todo) => {
    console.log(todo);
});


// Todo.findByIdAndRemove('58f71b7e9153e4e113df6852').then((todo) => {
//     console.log(todo);
// });