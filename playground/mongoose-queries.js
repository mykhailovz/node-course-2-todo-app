const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// valid id 58f5fe8f2e76c97984d5f0d9
// var id = '58f5fe8f2e76c97984d5f0d9';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });


// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todos', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by ID', todo);
// }).catch((e) => {
//     console.log(e);
// });

var id = '58f605dd64fcb6ba2097ee3f';

// console.log(ObjectID.isValid(id));

if (ObjectID.isValid(id)) {
    console.log('The ID is VALID')
} else {
    console.log('The ID is NOT VALID');
}

User.findById(id).then((user) => {
    if (!user) {
        return console.log('ID not found');
    }
    console.log('User by ID ', user)
}).catch((e) => {
    console.log(e);
});