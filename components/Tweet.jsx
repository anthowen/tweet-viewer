import React from 'react';

class Tweet extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let tweet = this.props.tweet;
    return (
      <li className={"tweet" + (tweet.active ? ' active' : '')}>
        <img src={tweet.avatar} className="avatar"/>
        <blockquote>
          <cite>
            <a href={"http://www.twitter.com/" + tweet.username}>{tweet.author}</a>
            <span className="screen-name">@{tweet.username}</span>
          </cite>
          <span className="content">{tweet.body}</span>
        </blockquote>
      </li>
    )
  }

};

export default Tweet;