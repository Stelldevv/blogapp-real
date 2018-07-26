const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create(
	'Baking with Shampoo', 'Place 10 ounces of shampoo in bowl and mix for 6 hours', 'Betty Cleaner', '26 July 2018');
BlogPosts.create (
	'How to walk the walk', 'Put one foot in front of the other. Left, then right, and then left after that!', 'William Shatner', '5 December 2014');

router.get('/', (req, res) => {
	res.json(BlogPosts.get());
});

router.post ('/', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
	res.status(201).json(item);
});

router.put('/:id', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author'];
	for (let i=0; i<requiredFields.length i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	if (req.params.id !== req.body.id) {
		const message = (
			`Request path id (${req.params.id}) and request body id `
			`(${req.body.id}) must match`);
		console.error(message);
		return res.status(400).send(message);
	}
	console.log(`Updating Blog Post list item \`${req.params.id}\``);
	const updatedItem = BlogPosts.update ({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	});
	res.status(204).end();
})

module.exports = router;