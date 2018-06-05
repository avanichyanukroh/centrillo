'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// this is our schema to represent a user
const userSchema = mongoose.Schema({

  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  tasks: [{
    taskTitle: String,
    category: String,
    taskComplete: Boolean,
    taskDateDue: String,
    taskNote: String,
    subTasks: [{
      subTaskTitle: String,
      subTaskComplete: Boolean,
      subTaskDateDue: String,
      subTaskNote: String
    }]
  }]
});

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', userSchema);

module.exports = {User};