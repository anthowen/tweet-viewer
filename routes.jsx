import React from 'react';
import { renderToString } from 'react-dom/server';
import TweetsApp from './components/TweetsApp';
import Tweet from './models/Tweet';

const index = (req, res) => {
  // call static model method to get db tweets
  Tweet.getTweets(0, 0, function (tweets) {

    // grab markup in string form populated with tweets
    let markup = renderToString(
      <TweetsApp tweets={tweets} />
    );

    // render home template
    res.render('home', {
      markup,
      state: JSON.stringify(tweets)
    });

  });
};

const page = (req, res) => {
  // fetch tweets by page via param
  Tweet.getTweets(req.params.page, req.params.skip, function(tweets) {
    // render as JSON
    res.send(tweets);
  });
};

export { index, page };