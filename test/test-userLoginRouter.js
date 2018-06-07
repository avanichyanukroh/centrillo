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


// this function deletes the entire database.
// we'll call it in an `afterEach` block below
// to ensure  ata from one test does not stick
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
// we use the Faker library to automatically
// generate placeholder values for author, title, content
// and then we insert that data into mongo
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
  // this will return a promise
  return User.create(seedData);
}


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


  describe('POST endpoint', function () {

      it('should return one user', function () {

        let res;
        return chai.request(app)
          .post('/users')
          .send({"username": "dummy"})
          .then(_res => {
            res = _res;
            res.should.have.status(200);

            res.body.username.should.not.be.null;
            res.body.password.should.not.be.null;
            res.body.tasks.should.not.be.null;

          })
      })
      .timeout(5000);

      it('should return users with right fields', function () {

        let resUser;
        return chai.request(app)
          .post('/users')
          .then(function (res) {

            res.should.have.status(200);
            res.should.be.json;

            res.body.forEach(function (user) {
              user.should.be.a('object');
              user.should.include.keys('id', 'username', 'password', 'tasks');
            });
          });
      });
    });

  /*
  describe('GET endpoint', function () {

      it('should return login page', function () {

        let res;
        return chai.request(app)
          .get('/users/login')
          .then(_res => {
            res = _res;
            res.should.have.status(304);
          });
      });
    });

  describe('PUT endpoint', function () {

      it('should update fields you send over', function () {
        const updateData = {

        username: "dummy",
        password: "dummy123",
        tasks: [{
          taskTitle: "do something else",
          category: "another category",
          taskComplete: false,
          taskDateDue: "2018-06-04T21:55",
          taskNote: "another note",
          subTasks: []
        }]
      };

        return User
          .findOne()
          .then(user => {
            updateData.id = user.id;

            return chai.request(app)
              .put('/addTask')
              .send(updateData);
          })
          .then(res => {
            res.should.have.status(204);
          });
      });
    });

  describe('DELETE endpoint', function () {

      it('should delete a task by id', function () {

        let task;

        return User
          .findOne()
          .then(_task => {
            task = _task;
            return chai.request(app).delete('/deleteTask');
          })
          .then(res => {
            res.should.have.status(204);
            return User.findById(task.id);
          })
          .then(_task => {

            should.not.exist(_task);
          });
      });
    });*/
});