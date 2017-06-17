/**
 * Created by johnmcswain on 4/14/17.
 */

const polly = require('../lib/polly');

exports.textToSpeech = function(req, res, next) {
    var message = req.param('message');
    var voiceId = req.param('voiceId');
    polly.textToSpeech(message,voiceId).then(function (data) {
        res.set({'Content-Type': 'audio/mpeg'});
        data.pipe(res);
    }).catch(function(err){
        console.error(err.message);
        console.error(err.stack);
        res.send(err);
    });
};

exports.ssmlToSpeech = function(req, res, next) {
    var message = req.param('message');
    var voiceId = req.param('voiceId');
    polly.ssmlToSpeech(message,voiceId).then(function (data) {
        res.set({'Content-Type': 'audio/mpeg'});
        data.pipe(res);
    }).catch(function(err){
        console.error(err.message);
        console.error(err.stack);
        res.send(err);
    });
};