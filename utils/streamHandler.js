import Tweet from '../models/Tweet';

export default (stream, io) => {

  // configure stream listeners
  stream.on('data', (data) => {

    // construct new tweet object
    const tweet = {
      twid: data.id,
      active: false,
      author: data.user ? data.user.name : undefined,
      avatar: data.user ? data.user.profile_image_url : undefined,
      body: data.text,
      date: data.created_at,
      username: data.user ? data.user.screen_name : undefined
    };

    // create a new model instance
    const tweetEntry = new Tweet(tweet);

    tweetEntry.save((err) => {
      if (err) throw err;
      io.emit('tweet', tweet);
    });

  });

};