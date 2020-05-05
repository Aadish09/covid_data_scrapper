var mongoose = require('mongoose');

var Blog = new mongoose.Schema({
	title :{
		type:String,
		required:true
	}
	date:{
		type:Date,
		default:Date.now();
	}
	summary:{
		type:String
	}

})
module.exports = mongoose.model('Blog',Blog);