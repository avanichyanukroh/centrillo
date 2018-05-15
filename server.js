const express = require('express');
const morgan = require('morgan');
const path = require('path');
const userLoginRouter = require('./userLoginRouter');

const app = express();
app.use(morgan('common'));

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

app.use('/user-login', userLoginRouter);

app.get('/', function(req, res) {

	res.sendFile(path.join(__dirname, 'public') + '/loginPage.html');
});

app.use(express.static('public'));

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
