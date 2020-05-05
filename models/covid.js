var mongoose = require('mongoose');

var COVID = new mongoose.Schema({
	state:{
		type:String,
		required:true
	},
	pCount:{
		type:Number,
		default:0
	},
	rCount:{
		type:Number,
		default:0
	},
	death:{
		type:Number,
		default:0
	},

})
module.exports = mongoose.model('COVID',COVID);