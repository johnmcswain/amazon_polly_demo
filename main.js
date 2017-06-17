/**
 * Created by johnmcswain on 4/14/17.
 */
const express = require("express");
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8090;
const polly = require('./routes/polly');

var jsonParser = bodyParser.json();
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("X-Powered-By", "Inflatable Sugar");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
    next();
});

app.get('/tts', polly.textToSpeech);


app.listen(port, function() {
    console.log('App is running on port ' + port);
});


