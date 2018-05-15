const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const{User} = require('./models');

router.get('/', (req, res) => {

	res.json(userProfile.get());
});

router.post('/', jsonParser, (req, res) => {

	const requiredFields = ['username', 'password'];
	for (let i = 0; i < requiredFields.length; i ++) {

		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	return User.hashPassword(req.body.password)
		.then(function(hash) {
			return User.create({
				username: req.body.username,
				password: hash
				})
		})
		.then(function(user) {
			res.status(201).json(user);
		})
		.catch(function(error) {
			console.log(error);
		});
});




module.exports = router;