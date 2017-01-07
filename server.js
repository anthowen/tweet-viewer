// import dependencies
import express from 'express';
import Twitter from 'twitter';
import pug from 'pug';
import http from 'http';
import mongoose from 'mongoose';
import * as routes from './routes';
import config from './config';
import streamHandler from './utils/streamHandler';

// create express instance
const app = express();
const port = process.env.PORT || 8080;

// set pug as templating engine
app.set('view engine', 'pug');

// disable etag header on responses
app.disable('etag');

// connect to our mongo database via mongoose
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/react-tweets');

const client = new Twitter(config.twitter);

// index route
app.get('/', routes.index);

// page route
app.get('/page/:page/:skip', routes.page);

// set /assets as static content directory
app.use(express.static(__dirname + '/assets/'));

// start the server
const server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

// initialize socket.io
const io = require('socket.io').listen(server);

// set up a stream listener and pass to streamHandler
client.stream(
  'statuses/filter',
  {track: 'javascript'},
  function(stream) {
    streamHandler(stream, io);
  }
);

// const requestParams = {
//     language: 'en',
//     track: 'dota',
//     // locations: '-122.75,36.8,-121.75,37.8',
// };
//
// const words = ['javascript', 'js', 'node'];
//
// const stream = client.stream('statuses/filter', requestParams);
// stream.on('data', function(event) {
//   // if (phraseIncludes(event.text, words)) console.log(event.text, '\n');
//   console.log(event.text, '\n');
// });
//
// function phraseIncludes(phrase, words) {
//   let lowerCased = phrase.toLowerCase();
//   for (let word of words) {
//     if (lowerCased.indexOf(word) !== -1) return true;
//   }
//   return false;
// }