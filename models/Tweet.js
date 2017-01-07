import mongoose from 'mongoose';

// schema for tweet data
const tweetSchema = new mongoose.Schema({
  twid: String,
  active: Boolean,
  author: String,
  avatar: String,
  body: String,
  date: Date,
  username: String
});

// static method to return tweet data from db
tweetSchema.statics.getTweets = function(page, skip, callback) {

  const start = (page * 10) + skip;

  // query db
  Tweet
    .find({}, 'twid active author avatar body date username')
    .sort({ date: 'desc' })
    .skip(start)
    .limit(10)
    .exec(function (err, docs) {
      if (err) throw err;
      const tweets = docs;
      tweets.forEach(function(tweet) {
        tweet.active = true;
      });
      callback(tweets);
    });
};

const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;