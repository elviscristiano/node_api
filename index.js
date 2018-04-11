const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// connect to the DB
mongoose.connect('mongodb://localhost/bookstore');
const db = mongoose.connection;

// middleware
app.use(bodyParser.json());

// models
Book = require('./models/book');
Genre = require('./models/genre');

/* Routes */

// root
app.get('/',(req,res) => {
	res.send('Please use /api/books or /api/genres');
});

// get all books
app.get('/api/books',(req,res) => {
	Book.getBooks((err,books) => {
		if(err){
			throw err;
		}
		res.json(books);
	});
});

// get a unique book
app.get('/api/books/:_id',(req,res) => {
	Book.getBookById(req.params._id,(err,book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

// add a book
app.post('/api/books',(req,res) => {
	const book = req.body;
	Book.addBook(book,(err,genres) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

// update a book
app.put('/api/books/:_id', (req,res) => {
	const id = req.params._id;
	const book = req.body;
	Book.updateBook(id, book,{},(err,books) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

// delete a book
app.delete('/api/books/:_id',(req,res) => {
	const id = req.params._id;
	Book.deleteBook(id,(err,book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

// genres 

// get all genres
app.get('/api/genres',(req,res) => {
	Genre.getGenres((err,genres) => {
		if(err){
			throw err;
		}
		res.json(genres);
	});
});

// add a genre
app.post('/api/genres',(req,res) => {
	const genre = req.body;
	Genre.addGenre(genre,(err,genres) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

// update a genre
app.put('/api/genres/:_id',(req,res) => {
	const id = req.params._id;
	const genre = req.body;
	Genre.updateGenre(id, genre,{},(err,genres) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

// delete a genre
app.delete('/api/genres/:_id',(req,res) => {
	const id = req.params._id;
	Genre.deleteGenre(id,(err,genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

/* Routes End */

// port handling
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
