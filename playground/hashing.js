const {SHA256} = require('crypto-js');

// var message = 'I am user number 3';

// var hash = SHA256(message).toString();

// console.log(`Messsage: ${message}`);
// console.log(`Hash: ${hash}`);

// console.log(SHA256);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();


// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Do not trust');
// }
//-------------------------------------------------//
// const jwt = require('jsonwebtoken');


// var data = {
//     id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);


// var decoded = jwt.verify(token, '123abc');
// console.log('Decoded ', decoded);


const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$pQ2xls8Lb/FK0HfKxZa4RuMwgU2jRZkuC4NnClqICXvuE2yxae21a';



bcrypt.compare('123!', hashedPassword, (err, res) => {
    console.log(res);
});



