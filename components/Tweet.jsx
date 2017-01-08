import React from 'react';
import format from '../utils/dateFormatter';

class Tweet extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    const tweet = this.props.tweet;
    return (
      <li className={"tweet" + (tweet.active ? ' active' : '')}>
        <img src={tweet.avatar} className="avatar"/>
        <blockquote>
          <cite>
            <a href={"http://www.twitter.com/" + tweet.username}>{tweet.author}</a>
            <span className="screen-name">@{ tweet.username }</span>
            <span className="dot">·</span>
            <span className="date">{ format(tweet.date) }</span>
          </cite>
          <span className="content">{tweet.body}</span>
        </blockquote>
      </li>
    )
  }

};

export default Tweet;