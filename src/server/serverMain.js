/**
 * Created by raymond on 21/07/15.
 */
"use strict";
var express = require('express');
var app = express();
var parser = require("body-parser");

app.get('/', function (req, res) {
    res.send("Twit Searcher Restful Back End engine Api.");
});

//Ready to accept GET AND POST requests
app.use(parser.json());
// for compatibility reason.
app.use(parser.urlencoded({extended: false}));

// Enable CORS (Cross Origin Resource Sharing).
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/results/:query', function (req, res) {
    var Twit = require("twit");
    var T = new Twit({
        consumer_key: 'YOUR_TWITTER_KEY',
        consumer_secret: 'YOUR_TWITTER_KEY',
        access_token: 'YOUR_TWITTER_KEY',
        access_token_secret: 'YOUR_TWITTER_KEY'
    });

    // Max 100 results
    T.get('search/tweets', {q: req.params.query.trim(), count: 100}, function (err, data, response) {
        if (err) {
            console.log("there is an issue with searching ", err);
            // TODO:
            // if an error due to 88 exceeding limit for querying then use array key(the search text) value caching here.
        } else {
            var results = [];
            for (var i = 0; i < data.statuses.length; i++) {
                //for (var name in data.statuses[i]) { // to see the keys
                var objResult = { text: data.statuses[i].text,
                    source: data.statuses[i].source,
                    created: data.statuses[i].created_at,
                    tweetId: data.statuses[i].id_str,
                    lang: data.statuses[i].lang};
                results.push(objResult);
            }
            res.contentType("json");
            res.send(JSON.stringify(results));
        }
    });
});

var server = app.listen(7777, function () {
    var host = server.address().address;
    var port = server.address().port;
});


