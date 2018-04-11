const mongoose = require('mongoose');

// genre schema 
const bookSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	genre: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	pages: {
		type: String
	},
	buy_url: {
		type: String
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});
const Book = module.exports = mongoose.model('Book',bookSchema);

// get books
module.exports.getBooks = (callback,limit) => {
	Book.find(callback).limit(limit);
}

// get a unique book
module.exports.getBookById = (id, callback) => {
	Book.findById(id,callback);
}

// add a book
module.exports.addBook = (book, callback) => {
	Book.create(book, callback);
}

// update a book
module.exports.updateBook = (id,book,options,callback) => {
	const query = {_id:id};
	const update = {
		title: book.title,
		genre: book.genre,
		description: book.description,
		author: book.author,
		publisher: book.publisher,
		pages: book.pages,
		image_url: book.image_url,
		buy_url: book.buy_url
	}
	Book.findOneAndUpdate(query,update,options,callback);
}

// delete a book
module.exports.deleteBook = (id,callback) => {
	const query = {_id:id};
	Book.remove(query, callback);
}
