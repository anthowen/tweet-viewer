import React from 'react';
import Tweets from './Tweets';
import Loader from './Loader';
import NotificationButton from './NotificationButton';

class TweetsApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tweets: props.tweets,
      count: 0, // new tweet count for notification bar
      page: 0,
      paging: false,
      skip: 0, // tweets to skip when retrieving from db (doesn't reset)
      done: false
    };
  }

  // Render the component
  render() {
    return (
      <div className='tweets-app'>
        <NotificationButton
          count={ this.state.count }
          onShowNewTweets={ this.showNewTweets.bind(this) }
        />
        <Tweets tweets={ this.state.tweets } />
        <Loader paging={ this.state.paging } />
      </div>
    );
  }

  componentDidMount() {
    // set up socket for receiving new tweets
    const socket = io.connect();
    socket.on('tweet', (data) => {
      this.addTweet(data);
    });
    // set up scroll event for infinity paging
    window.addEventListener(
      'scroll',
      this.checkWindowScroll.bind(this)
    );
  }

  addTweet(tweet) {
    const updated = this.state.tweets;
    updated.unshift(tweet);
    // Set application state
    this.setState({
      tweets: updated,
      count: this.state.count + 1,
      skip: this.state.skip + 1
    });
  }

  showNewTweets() {
    const updated = this.state.tweets;
    // Mark our tweets active
    updated.forEach((tweet) => { tweet.active = true; });
    // Set application state (active tweets + reset unread count)
    this.setState({ tweets: updated, count: 0 });
  }

  // check if more tweets should be loaded, by scroll position
  checkWindowScroll() {
    // Get scroll pos & window data
    const h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    const s = document.body.scrollTop;
    const scrolled = (h + s) >= document.body.offsetHeight;
    // If scrolled enough, not currently paging and not complete...
    if(scrolled && !this.state.paging && !this.state.done) {
      // Set application state (Paging, Increment page)
      this.setState({ paging: true, page: this.state.page + 1 });
      // Get the next page of tweets from the server
      this.getPage();
    }
  }

  // get JSON from server by page
  getPage() {
    const request = new XMLHttpRequest();
    request.open('GET', `page/${this.state.page}/${this.state.skip}`, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400){
        this.loadPagedTweets(JSON.parse(request.responseText));
      } else {
        // set application state: not paging, loading complete
        this.setState({ paging: false, done: true });
      }
    };
    // fire! bang bang bang
    request.send();
  }

  loadPagedTweets(tweets) {
    if (tweets.length > 0) {
      const updated = this.state.tweets;
      tweets.forEach((tweet) => { updated.push(tweet); });
      // use timeout to see loading spinner
      setTimeout(() => {
        this.setState({ tweets: updated, paging: false });
      }, 1000);
    } else {
      // Set application state (Not paging, paging complete)
      this.setState({ paging: false, done: true });
    }
  }

};

export default TweetsApp;