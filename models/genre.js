const mongoose = require('mongoose');

// genre schema 
const genreSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});
const Genre = module.exports = mongoose.model('Genre',genreSchema);

// get genres
module.exports.getGenres = (callback,limit) => {
	Genre.find(callback).limit(limit);
}

// add a genre
module.exports.addGenre = (genre,callback) => {
	Genre.create(genre, callback);
}

// update a genre
module.exports.updateGenre = (id,genre,options,callback) => {
	const query = {_id:id};
	const update = {
		name: genre.name
	}
	Genre.findOneAndUpdate(query,update,options,callback);
}

// delete a genre
module.exports.deleteGenre = (id,callback) => {
	const query = {_id:id};
	Genre.remove(query, callback);
}
