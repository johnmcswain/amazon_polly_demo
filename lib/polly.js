/**
 * Created by johnmcswain on 4/14/17.
 */


const fs = require('fs');
const Stream = require('stream')
const AWS = require("aws-sdk");
AWS.config.loadFromPath("./config/aws/polly.json");


exports.textToSpeech = (message,voiceId)=>{
    return new Promise(function (resolve, reject) {

// Create an Polly client
        const Polly = new AWS.Polly({
            signatureVersion: 'v4',
            region: 'us-east-1'
        });
         let params = {
            'Text': message,
             'OutputFormat': 'mp3',
            'VoiceId': voiceId

        };

        Polly.synthesizeSpeech(params, (err, data) => {
            if (err) {
                console.log(err.code);
                reject(err);
            } else if (data) {
                if (data.AudioStream instanceof Buffer) {
                    fs.writeFile("./output/speech.mp3", data.AudioStream, function(err) {
                        if (err) {
                            return console.log(err)
                        }
                        var readStream = fs.createReadStream("./output/speech.mp3");
                        resolve(readStream);
                    })
                }
            }
        });
    });
};

exports.ssmlToSpeech = (message,voiceId)=>{
    return new Promise(function (resolve, reject) {

// Create an Polly client
        const Polly = new AWS.Polly({
            signatureVersion: 'v4',
            region: 'us-east-1'
        });
        let params = {
            'Text': message,
            'OutputFormat': 'mp3',
            'VoiceId': voiceId,
            'TextType': 'ssml'

        };

        Polly.synthesizeSpeech(params, (err, data) => {
            if (err) {
                console.log(err.code);
                reject(err);
            } else if (data) {
                if (data.AudioStream instanceof Buffer) {
                    fs.writeFile("./output/speech.mp3", data.AudioStream, function(err) {
                        if (err) {
                            return console.log(err)
                        }
                        var readStream = fs.createReadStream("./output/speech.mp3");
                        resolve(readStream);
                    })
                }
            }
        });
    });
};