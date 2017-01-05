import React from 'react';
import Tweet from './Tweet';

class Tweets extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    // Build list items of single tweet components using map
    let content = this.props.tweets.map((tweet) => {
      return (
        <Tweet key={ tweet.twid } tweet={ tweet } />
      );
    });

    // Return ul filled with our mapped tweets
    return (
      <ul className="tweets">{ content }</ul>
    );
  }

};

export default Tweets;