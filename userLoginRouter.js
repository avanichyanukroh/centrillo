'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');

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

router.post('/', (req, res) => {

  User
    .findOne({"username": req.body.username})
    .then(user => {

      res.status(200).json(user)
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.get('/login', (req, res) => {

  res.sendFile(path.join(__dirname, 'public') + '/loginPage.html');
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

router.post('/login', localAuth, (req, res) => {

  const authToken = createAuthToken(req.user);
  res.json({'authToken': authToken, 'user': req.user});
});

router.put('/addTask', (req, res) => {

  User.findOneAndUpdate(
    { "username" : req.body.username },
    {$push: 
      { "tasks":
        {
        "taskTitle": req.body.taskTitle,
        "category": req.body.category,
        "taskComplete": false,
        "taskDateDue": req.body.taskDateDue,
        "taskNote": req.body.taskNote,
        "subTasks": []
        }
      }
    }
  )
  .then(user => {
      res.json(user)})
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
  res.status(204);
});



router.put('/editTask', jsonParser, (req, res) => {
  console.log(`PUT router id: ${req.body._id}`)
  User
    .findOne(
    { "username" : req.body.username })
    .then(user => {
      let task = user.tasks.id(req.body._id).remove();
      user.save();

      User
      .findOneAndUpdate(
      { "username" : req.body.username },
      {$push: 
        { "tasks":
          {
          "taskTitle": req.body.taskTitle,
          "category": req.body.category,
          "taskComplete": false,
          "taskDateDue": req.body.taskDateDue,
          "taskNote": req.body.taskNote,
          "subTasks": []
          }
        }
      }
      )
      .then(user => {
        res.status(200).json(user)})
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
    });
});

router.put('/editTaskToggle', jsonParser, (req, res) => {

  let editTask;

  User
    .findOne(
    { "username" : req.body.username })
    .then(user => {

      let task = user.tasks.id(req.body._id);
      editTask = task;
      task.remove();
      user.save();

      User
      .findOneAndUpdate(
      { "username" : req.body.username },
      {$push: 
        { "tasks":
          {
          "taskTitle": editTask.taskTitle,
          "category": editTask.category,
          "taskComplete": editTask.taskComplete ? false : true,
          "taskDateDue": editTask.taskDateDue,
          "taskNote": editTask.taskNote,
          "subTasks": []
          }
        }
      }
      )
      .then(user => {
        res.status(200).json(user)})
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
    });
});

router.delete('/deleteTask', jsonParser, (req, res) => {
  
  User
    .findOne(
    { "username" : req.body.username })
    .then(user => {

      let task = user.tasks.id(req.body._id).remove();
      user.save();

      res.status(204);
    })
    .then(user => {
    res.json(user)})
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

module.exports = router;