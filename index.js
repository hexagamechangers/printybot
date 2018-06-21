//test
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
//const API_KEY = require('./apiKey');
var value = 200;
var server = express()
// app.get('/', function (req, res) { res.send('Hello World') })
// app.listen(8080)

var fs = require('fs');


server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/get-movie-details', (req, res) => {
    var mycustomresponse = "";
    if (req.body.queryResult.action == 'getprinterlist') {
        fs.readFile("./app/data/data.json", 'utf8', function (err, data) {
            if (err) throw err;
            var printerObj = JSON.parse(data);
            res.send('result:' + JSON.stringify(printerObj));
        });
    }
    else if (req.body.queryResult.action == 'carousel') {
        return res.json({

            "fulfillmentText": "hello world",
            "fulfillmentMessages": [
                {
                    "carouselSelect": {
                        "items": [
                            {
                                "info": {
                                    "key": "Item 1",
                                    "synonyms": [
                                        "Item 1 synonyms"
                                    ]
                                },
                                "title": "Item 1 Title",
                                "description": "Item 1 Description",
                                "image": {
                                    "imageUri": "https://i.ytimg.com/vi/y_DMuo9Oefc/maxresdefault.jpg",
                                    "accessibilityText": "Avengers Movie Poster"
                                }

                            },
                            {
                                "info": {
                                    "key": "Item 2",
                                    "synonyms": [
                                        "Item 2 synonyms"
                                    ]
                                },
                                "title": "Item 2 Title",
                                "description": "Item 2 Description",
                                "image": {
                                    "imageUri": "http://whatculture.com/comics/ant-man-and-the-wasp-10-reasons-to-be-excited",
                                    "accessibilityText": "Ant Man and Wasp Movie Poster ||"
                                }

                            }

                        ]

                        //"title": "Avengers Inifnity War - Part 1",
                        //"subtitle": "Part - 1",
                        //"imageUri": "https://i.ytimg.com/vi/y_DMuo9Oefc/maxresdefault.jpg",
                        //"buttons": [
                        //        {
                        //            "text": "Click Me !!",
                        //            "postback": "https://i.ytimg.com/vi/y_DMuo9Oefc/maxresdefault.jpg"
                        //        }
                        //]
                    }
                }
            ]



        });
    }
    else if (req.body.queryResult.action == 'add') {
        value = value + 10;
        if (value < 1000)
            mycustomresponse = value;
        else
            mycustomresponse = "value should not be greater than 1000";

        return res.json({

            "fulfillmentText": "hello world1",
            "fulfillmentMessages": [
                {
                    //      "text": {
                    //          "text": [

                    //"hello world"
                    //          ]
                    //      }

                    "card": {
                        "title": "Avengers Inifnity War - Part 2",
                        "subtitle": "Part - 1",
                        "imageUri": "https://i.ytimg.com/vi/y_DMuo9Oefc/maxresdefault.jpg",
                        "buttons": [
                            {
                                "text": "Click Me !!",
                                "postback": "https://i.ytimg.com/vi/y_DMuo9Oefc/maxresdefault.jpg"
                            }
                        ]
                    }
                }
            ],

            "payload": {

                "google": {

                    "expectUserResponse": true,

                    "richResponse": {

                        "items": [

                            {

                                "simpleResponse": {

                                    "textToSpeech": "this is a simple response"

                                }

                            }

                        ]

                    }

                },

                "facebook": {

                    "text": "Hello, Facebook!"

                },

                "angularMessages": [
                    {
                        //      "text": {
                        //          "text": [

                        //"hello world"
                        //          ]
                        //      }

                        "card": {
                            "title": "Avengers Inifnity War - Part 2",
                            "subtitle": "Part - 1",
                            "imageUri": "https://i.ytimg.com/vi/y_DMuo9Oefc/maxresdefault.jpg",
                            "buttons": [
                                {
                                    "text": "Click Me !!",
                                    "postback": "https://i.ytimg.com/vi/y_DMuo9Oefc/maxresdefault.jpg"
                                }
                            ]
                        }
                    }
                ],

                "slack": {

                    "text": "Would you like to play a game?",
                    "attachments": [
                        {
                            "text": "Choose a game to play",
                            "fallback": "You are unable to choose a game",
                            "callback_id": "wopr_game",
                            "color": "#3AA3E3",
                            "attachment_type": "default",
                            "actions": [
                                {
                                    "name": "game",
                                    "text": "Chess",
                                    "type": "button",
                                    "value": "chess"
                                },
                                {
                                    "name": "game",
                                    "text": "Falken's Maze",
                                    "type": "button",
                                    "value": "maze"
                                },
                                {
                                    "name": "game",
                                    "text": "Thermonuclear War",
                                    "style": "danger",
                                    "type": "button",
                                    "value": "war",
                                    "confirm": {
                                        "title": "Are you sure?",
                                        "text": "Wouldn't you prefer a good game of chess?",
                                        "ok_text": "Yes",
                                        "dismiss_text": "No"
                                    }
                                }
                            ]
                        }
                    ]
                }


            },

        });
    }
    else if (req.body.result.action != 'add') {
        return res.json({
            speech: req.body.result.action,
            displayText: req.body.result.action,
            source: 'get-movie-details'
        });
    }
    else
        return res.json({
            speech: req.body.result.action,
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

server.get('/add', function (req, res) {
    value = value + 10;
    if (value < 1000)
        res.send('Value :' + value);
    else
        res.status(400).send("value should not be greater than 1000");
});
server.get('/remove', function (req, res) {
    value = value - 10;
    if (value > 0)
        res.send('Value :' + value);
    else
        res.status(400).send("value should not be Less than 0");
});

server.get('/api/getprinterlist', function (req, res) {
    fs.readFile("./app/data/printerdata.json", 'utf8', function (err, data) {
        if (err) throw err;
        var printerObj = JSON.parse(data);
        res.send('result:' + JSON.stringify(printerObj));
    });

});

// increment api/printerToner?model="model"&TonerLevelIncrease=value
// decrement api/printerToner?model="model"&TonerLevelDecrease=value
server.get('/api/printerToner', function (req, res) {
    let queryparam = req.query;
    fs.readFile("./app/data/printerdata.json", 'utf8', function (err, data) {
        if (err) throw err;
        let printerObj = JSON.parse(data).printerlist;
        if (queryparam.model) {
            let filteredResult = printerObj.filter((obj) => {
                return obj.Model == queryparam.model;
            });
            if (queryparam.TonerLevelIncrease) {
                filteredResult[0].CurrentTonerLevel = parseInt(filteredResult[0].CurrentTonerLevel) + parseInt(queryparam.TonerLevelIncrease);
            } else if (queryparam.TonerLevelDecrease) {
                filteredResult[0].CurrentTonerLevel = parseInt(filteredResult[0].CurrentTonerLevel) - parseInt(queryparam.TonerLevelIncrease);
            }
            printerObj.filter((obj) => {
                if (obj.Model == filteredResult[0].model) {
                    obj = filteredResult[0];
                }
            });
            let resultObj = JSON.parse(data);
            resultObj.printerlist = printerObj;
            fs.writeFile('./app/data/printerdata.json', JSON.stringify(resultObj), function (err) {
                if (err) throw err;
                res.send('success');
            });
        }
    });
});

// increment api/paperCapacity?model="model"&loadpaper=value
// decrement api/paperCapacity?model="model"&printer=value
server.get('/api/paperCapacity', function (req, res) {
    let queryparam = req.query;
    fs.readFile("./app/data/printerdata.json", 'utf8', function (err, data) {
        if (err) throw err;
        let printerObj = JSON.parse(data).printerlist;
        if (queryparam.model) {
            let filteredResult = printerObj.filter((obj) => {
                return obj.Model == queryparam.model;
            });
            console.log(queryparam);
            if (queryparam.loadpaper) {
                filteredResult[0].paperCapacity = parseInt(filteredResult[0].paperCapacity) + parseInt(queryparam.loadpaper);
            } else if (queryparam.printer) {
                filteredResult[0].paperCapacity = parseInt(filteredResult[0].paperCapacity) - parseInt(queryparam.printer);
            }
            console.log(filteredResult);
            printerObj.filter((obj) => {
                if (obj.Model == filteredResult[0].model) {
                    obj = filteredResult[0];
                }
            });
            let resultObj = JSON.parse(data);
            resultObj.printerlist = printerObj;
            fs.writeFile('./app/data/printerdata.json', JSON.stringify(resultObj), function (err) {
                if (err) throw err;
                res.send('success');
            });
        }
    });
});

// increment api/statusUpdate?model="model"&status=value
server.get('/api/statusUpdate', function (req, res) {
    let queryparam = req.query;
    fs.readFile("./app/data/printerdata.json", 'utf8', function (err, data) {
        if (err) throw err;
        let printerObj = JSON.parse(data).printerlist;
        if (queryparam.model) {
            let filteredResult = printerObj.filter((obj) => {
                return obj.Model == queryparam.model;
            });
            if (queryparam.status) {
                filteredResult[0].status = queryparam.status;
            }
            console.log(filteredResult);
            printerObj.filter((obj) => {
                if (obj.Model == filteredResult[0].model) {
                    obj = filteredResult[0];
                }
            });
            let resultObj = JSON.parse(data);
            resultObj.printerlist = printerObj;
            fs.writeFile('./app/data/printerdata.json', JSON.stringify(resultObj), function (err) {
                if (err) throw err;
                res.send('success');
            });
        }
    });
});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});