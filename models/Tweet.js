import mongoose from 'mongoose';

// schema for tweet data
const schema = new mongoose.Schema({
  twid: String,
  active: Boolean,
  author: String,
  avatar: String,
  body: String,
  date: Date,
  username: String
});

// static method to return tweet data from db
schema.statics.getTweets = function(page, skip, callback) {
  let tweets = []
    , start = (page * 10) + (skip * 1)
    ;

  // query db
  Tweet
    .find(
      {},
      'twid active author avatar body date username',
      {skip: start, limit: 10}
    )
    .sort({date: 'desc'})
    .exec(function (err, docs) {
      if (!err) {
        tweets = docs;
        tweets.forEach(function(tweet) {
          tweet.active = true;
        });
      }
      callback(tweets);
    });
};

const Tweet = mongoose.model('Tweet', schema);

export default Tweet;