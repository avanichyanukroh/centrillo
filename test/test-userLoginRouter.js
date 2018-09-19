'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const should = chai.should();

const { User } = require('../models');
const {runServer, app, closeServer} = require('../server');
//const { router } = require('../userLoginRouter');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

//Global variable

let taskId;
// this function deletes the entire database.
// we'll call it in an `afterEach` block below
// to ensure data from one test does not stick
// around for next one
function tearDownDb() {

  return new Promise((resolve, reject) => {

    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

// used to put randomish documents in db
// so we have data to work with and assert about.

function seedUserData() {
  console.info('seeding User data');
  let seedData = {

      username: "dummy",
      password: "dummy123",
      tasks: [{
        taskTitle: "do something",
        category: "a category",
        taskComplete: false,
        taskDateDue: "2018-06-03T22:55",
        taskNote: "a note",
        subTasks: []
      }]
    };

  return User.create(seedData)
    .then(user => {

      taskId = user.tasks[0]._id;
    });
};


describe('Users API resource', function () {

  before(function () {

    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function () {

    return seedUserData();
  });

  afterEach(function () {
    // tear down database so we ensure no state from this test
    // effects any coming after.
    return tearDownDb();
  });

  after(function () {

    return closeServer();
  });


  describe('POST endpoint to obtain user profile', function () {

    it('should return one user', function () {

      let res;
      return chai.request(app)
        .post('/users')
        .send({username: "dummy"})
        .then(_res => {
          
          res = _res;
          res.should.have.status(200);

          res.body.username.should.not.be.null;
          res.body.password.should.not.be.null;
          res.body.tasks.should.not.be.null;
        })
    });

    it('should return users with right fields', function () {

      let res;
      return chai.request(app)
        .post('/users')
        .send({username: "dummy"})
        .then(_res => {

          res = _res;
          res.should.have.status(200);
          res.should.be.json;

          res.body.should.be.a('object');
          res.body.should.include.keys('_id', 'username', 'password', 'tasks');
        });
    });
  });

  describe('POST endpoint to log in', function () {

    it('should check username and password', function () {

      let res;
      return chai.request(app)
        .post('/users/register')
        .send({ username: "dummy", password: "dummy123" })
        .then(_res => {

          res = _res;
          res.should.have.status(201);

          res.body.username.should.not.be.null;
          res.body.password.should.not.be.null;
          res.body.tasks.should.not.be.null;

        });
    });
  });
/*
  describe('GET endpoint', function () {

    it('should return login page', function () {

      let res;
      return chai.request(app)
        .post('/users/login')
        .send({

          username: "dummy",
          password: "dummy123"
          })
        .then(_res => {
          res = _res;
          res.should.have.status(201);
        });
    });
  });
*/

  describe('PUT endpoint to add task', function () {

    it('should add a new task to tasks array', function () {

      const updateData = {

        username: "dummy",
        tasks: [{
          taskTitle: "do something else",
          category: "another category",
          taskComplete: false,
          taskDateDue: "2018-06-04T21:55",
          taskNote: "another note",
          subTasks: []
          }]
        };

    let res;
    return chai.request(app)
      .put('/users/addTask')
      .send(updateData)
      .then(_res => {
        res = _res;

        res.should.have.status(204);
      })
      .then(function() {

        let res;
        return chai.request(app)
          .post('/users')
          .send({username: "dummy"})
          .then(_res => {
            
            res = _res;
            res.should.have.status(200);

            res.body.username.should.not.be.null;
            res.body.password.should.not.be.null;
            res.body.tasks.should.have.lengthOf.at.least(2);

          });
      });
    });
  });

  describe('PUT endpoint to edit task', function () {

    it('should update task by id', function () {
      console.log(`PUT test id: ${taskId}`);
      const updateData = {

        username: "dummy",
        _id: taskId,
        tasks: [{
          taskTitle: "do something else",
          category: "another category",
          taskComplete: false,
          taskDateDue: "2018-06-04T21:55",
          taskNote: "another note",
          subTasks: []
          }]
        };

    let res;
    return chai.request(app)
      .put('/users/editTask')
      .send(updateData)
      .then(_res => {

        res = _res;
        res.should.have.status(200);
      })
      .then(function() {

        let res;
        return chai.request(app)
          .post('/users')
          .send({username: "dummy"})
          .then(_res => {
            
            res = _res;
            res.should.have.status(200);

            res.body.username.should.not.be.null;
            res.body.password.should.not.be.null;
            res.body.tasks.should.have.lengthOf.at.least(1);

          });
      });
    });
  });

  describe('PUT endpoint toggle taskComplete', function () {

    it('should change taskComplete by id from false to true', function () {

    let res;
    return chai.request(app)
      .put('/users/editTaskToggle')
      .send({ username: "dummy", _id: taskId })
      .then(_res => {
        
        res = _res;
        res.should.have.status(200);
      })
      .then(function() {

        let res;
        return chai.request(app)
          .post('/users')
          .send({username: "dummy"})
          .then(_res => {
            
            res = _res;
            res.should.have.status(200);

            res.body.username.should.not.be.null;
            res.body.password.should.not.be.null;
            res.body.tasks.should.have.lengthOf.at.least(1);
          });
      });
    });
  });

  describe('Delete endpoint to delete task', function () {

    it('should delete task by id', function () {

    let res;
    return chai.request(app)
      .delete('/users/deleteTask')
      .send({ username: "dummy", _id: taskId })
      .then(_res => {

        res = _res;
        res.should.have.status(204);
      })
      .then(function() {

        let res;
        return chai.request(app)
          .post('/users')
          .send({username: "dummy"})
          .then(_res => {
            
            res = _res;
            res.should.have.status(200);

            res.body.username.should.not.be.null;
            res.body.password.should.not.be.null;
            res.body.tasks.should.have.lengthOf.at.least(0);
          });
      });
    });
  });
});



//.then(_task => {should.not.exist(_task);});