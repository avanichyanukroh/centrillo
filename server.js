const express = require('express');
const morgan = require('morgan');

const userLoginRouter = require('./userLoginRouter');

const app = express();
app.use(morgan('common'));


app.use('/user-login', userLoginRouter);

app.use(express.static ('public'));
app.use(express.static ('loginPage.html'));

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});


app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
