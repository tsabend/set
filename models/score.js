'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var fields = {
	username: { type: String },
	highscore: { type: Number },
	gif: { type: String },
	created: { type: Date , default: Date.now } 
};

var scoreSchema = new Schema(fields);

module.exports = mongoose.model('Score', scoreSchema);