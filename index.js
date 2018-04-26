const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
//const API_KEY = require('./apiKey');
var value = 200;
var server = express()
// app.get('/', function (req, res) { res.send('Hello World') })
// app.listen(8080)

server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/get-movie-details', (req, res) => {
	var mycustomresponse ="";
	if(req.body.result.action == 'add'){
		value = value + 10;
        if(value<1000)  
            mycustomresponse = value;
		else 
			mycustomresponse ="value should not be greater than 1000";
		
		return res.json({
        speech: mycustomresponse ,
        displayText: 'test',
        source: 'get-movie-details'
		});
	}
	else if(req.body.result.action == 'add'){
		return res.json({
        speech: req.body.result.action ,
        displayText: req.body.result.action,
        source: 'get-movie-details'
    });
	}
	else
    return res.json({
        speech: req.body.result.action ,
        displayText: req.body.result.action,
        source: 'get-movie-details'
    });
}, (error) => {
    return res.json({
        speech: 'Something went wrong!',
        displayText: 'Something went wrong!',
        source: 'get-movie-details'
    });
});
//////////////////////////

	server.get('/add', function(req, res) {	     
        value = value + 10;
        if(value<1000)  
            res.send('Value :' + value);
        else
            res.status(400).send("value should not be greater than 1000");
    });	
    server.get('/remove', function(req, res) {	     
        value = value - 10;
        if(value>0)  
            res.send('Value :' + value);
        else
            res.status(400).send("value should not be Less than 0");
	});	

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});