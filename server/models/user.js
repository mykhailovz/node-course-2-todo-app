// const mongoose = require('mongoose');
// const validator = require('validator');
// const jwt = require('jsonwebtoken');
// const _ = require('lodash');

// // console.log(validator);

// var UserSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 1,
//         unique: true,
//         validate: {
//             isAsync: false, // add by me
//              validator: validator.isEmail ,
//              message: '{VALUE} is not a valid email' 
//         }
//     },
//     password: {
//         type: String,
//         require: true,
//         minlength: 6
//     },
//     tokens: [{
//         access: {
//             type: String,
//             required: true
//         }, 
//         token: {
//             type: String,
//             required: true
//         }
//     }]
// });


// UserSchema.methods.toJSON = function() {
//     var user = this;
//     var userObject = user.toObject();

//     return _.pick(userObject, ['_id', 'email']);
// };


// UserSchema.methods.generateAuthToken = function() {
//     var user = this;
//     var access = 'auth';
//     var token = jwt.sign({
//         _id: user._id.toHexString(),
//         access
//     }, 'abc123').toString();

//     user.tokens.push({
//         access,
//         token
//     });

//     user.save().then(() => {
//         return token;
//     });
//     // }).then((token) => {

//     // });

// };

// UserSchema.statics.findByToken = function (token) {
//     var User = this;
//     var decoded;

//     try {
//         decoded = jwt.verify(token, 'abc123');
//     } catch (e) {
//         // return new Promise((resolve, reject) => {
//         //     reject();
//         // });
//         return Promise.reject();
//     }

//     return User.findOne({
//         _id: decoded._id,
//         'tokens.token': token,
//         'tokens.access': 'auth'
//     });

// };


// var User = mongoose.model('User', UserSchema);

// module.exports = {
//     User
// };

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    /*
(node:23562) DeprecationWarning: Implicit async custom validators (custom validators that take 2 arguments)
 are deprecated in mongoose >= 4.9.0. See http://mongoosejs.com/docs/validation.html#async-custom-validator
s for more info.    
     */
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
        // add here isAsync: false // http://mongoosejs.com/docs/validation.html#async-custom-validators
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
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

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};





UserSchema.statics.findByCredentials = function(email, password) {
	var User = this;
	return User.findOne({email}).then((user) => {
		if (!user) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if (res) {
					resolve(user);
				} else {
					reject();
				}
			});
		});
	});
};


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



var User = mongoose.model('User', UserSchema);

module.exports = {User}
