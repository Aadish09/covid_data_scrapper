var express = require('express');
var app = express();
var dotenv = require('dotenv');
dotenv.config();
var mongoose = require('mongoose');
var cherrio =require('cheerio');
var port = process.env.PORT || 3000;
var rp = require('request-promise');
var COVID19 = require('./models/covid');
var fs= require('fs')
var data =require('./output.json')
var options ={
	uri :'https://www.mohfw.gov.in/',
	transform:function(body){
		return cherrio.load(body);
	}
}

function scrap(){ 
	var res=[];
	rp(options)
	.then(($)=>{
		
			$("table > tbody > tr ").each((index, element) => {
			const tab = $(element).find('td');
			const state= $(tab[1]).text();
			const pCount= $(tab[2]).text();
			const rCount = $(tab[3]).text();
			const death = $(tab[4]).text();
			const obj = {state,pCount,rCount,death};
			res.push(obj);
				
	    });
		let jsonString = JSON.stringify(res);
  		fs.writeFileSync('output.json', jsonString, 'utf-8');
	})

}



app.set('view engine','ejs');
app.get('/',(req,res)=>{
	// var arr=[];
	scrap();
	res.render('index',{data:data});
})

app.listen(port , (err)=>{
	console.log(`Your server is running on ${port}`);
})


