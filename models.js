'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// this is our schema to represent a user
const userSchema = mongoose.Schema({
  // the `name` property is String type and required
  

  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  task: [{
    taskTitle: String,
    category: String,
    taskComplete: Boolean,
    taskDateDue: Date,
    taskNote: String,
    subTasks: [{
      subTaskTitle: String,
      subTaskComplete: Boolean,
      subTaskDateDue: Date,
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



/*function StorageException(message) {
   this.message = message;
   this.name = "StorageException";
};

const userProfile = {
  create: function(username, password) {
    const user = {
      id: uuid.v4(),
      username: username,
      password: password
    };
    this.users.push(user);
    return user;
  },
  get: function() {
    return this.users;
  },

};

function createUserModel() {
  const storage = Object.create(userProfile);
  storage.users = [];
  return storage;
};*/


module.exports = {User};