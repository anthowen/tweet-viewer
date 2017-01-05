import Tweet from '../models/Tweet';

export default function(stream, io) {

  // configure stream listeners
  stream.on('data', function(data) {

    // console.log('\n');
    // console.log(data.text);

    // construct new tweet object
    let tweet = {
      twid: data['id'],
      active: false,
      author: data['user'] ? data['user']['name'] : undefined,
      avatar: data['user'] ? data['user']['profile_image_url'] : undefined,
      body: data['text'],
      date: data['created_at'],
      username: data['user'] ? data['user']['screen_name'] : undefined
    };

    // create a new model instance
    let tweetEntry = new Tweet(tweet);

    tweetEntry.save(function(err) {
      if (!err) {
        // if everything is gucci, socket io emits tweet
        io.emit('tweet', tweet);
      }
    });

  });

};