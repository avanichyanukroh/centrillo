'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');

mongoose.connect('mongodb://localhost/usersDB');
const db = mongoose.connection;
 
db.on('error', function (err) {
console.log('connection error', err);
});
db.once('open', function () {
console.log('connected.');
});

const app = express();
app.use(express.static('public'));

const jsonParser = bodyParser.json();
const config = require('./config');
mongoose.Promise = global.Promise;

const{User} = require('./models');

const localAuth = passport.authenticate('local', {session: false});

router.use(express.json());

const createAuthToken = function(user) {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

router.get('/', (req, res) => {

  User
    .find({'username': 'alvin'})
    .then(users => {
      res.json({
        users: users.map(
          (user) => user)
      })
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});


router.get('/login', (req, res) => {
  console.log('/users/login endpoint hit');
  res.sendFile(path.join(__dirname, 'public') + '/loginPage.html');
});

router.post('/login', localAuth, (req, res) => {

  const authToken = createAuthToken(req.user);
	res.json({'authToken': authToken, 'user': req.user});
});

router.post('/register', jsonParser, (req, res) => {

  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }

  const stringFields = ['username', 'password'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }

	return User.hashPassword(req.body.password)
		.then(function(hash) {
			return User.create({
				username: req.body.username,
				password: hash
				});
		})
		.then(function(user) {
			res.status(201).json(user);
		})
		.catch(function(error) {
			console.log(error);
		});
});




module.exports = router;