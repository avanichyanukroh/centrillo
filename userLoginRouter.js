const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const{mockUser} = require('./models');

mockUser.create(
  'alvin, alvin123');
mockUser.create(
  'jay, jay123');


router.get('/', (req, res) => {

	res.json(mockUser.get());
});

router.post('/', jsonParser, (req, res) => {

	const requiredFields = ['username', 'password'];
	for (let i = 0; i < requiredFields.length; i ++) {

		const field = requiredFeilds[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	const item = mockUser.create(
		req.body.username, req.body.password);
	res.status(201).json(item);
});



module.exports = router;