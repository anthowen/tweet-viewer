import React from 'react';
import Tweets from './Tweets';
import Loader from './Loader';
import NotificationBar from './NotificationBar';

class TweetsApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tweets: props.tweets,
      count: 0,
      page: 0,
      paging: false,
      skip: 0,
      done: false
    };
  }

  // Render the component
  render() {
    return (
      <div className='tweets-app'>
        <Tweets tweets={ this.state.tweets } />
        <Loader paging={ this.state.paging } />
        <NotificationBar
          count={ this.state.count }
          onShowNewTweets={ this.showNewTweets.bind(this) }
        />
      </div>
    );
  }

  // getInitialState(props) {
  //   props = props || this.props;
  //   // initial app state set from props
  //   return {
  //     tweets: props.tweets,
  //     count: 0,
  //     page: 0,
  //     paging: false,
  //     skip: 0,
  //     done: false
  //   };
  // }

  // componentWillReceiveProps(newProps) {
  //   this.setState(this.getInitialState(newProps));
  // }

  componentDidMount() {
    let socket = io.connect();
    socket.on('tweet', (data) => {
      this.addTweet(data);
    });
    // scroll event for infinity paging
    window.addEventListener(
      'scroll',
      this.checkWindowScroll.bind(this)
    );
  }

  addTweet(tweet) {
    let updated = this.state.tweets;
    let count = this.state.count + 1;
    let skip = this.state.skip + 1;
    updated.unshift(tweet);
    // Set application state
    this.setState({ tweets: updated, count, skip });
  }

  showNewTweets() {
    let updated = this.state.tweets;
    // Mark our tweets active
    updated.forEach((tweet) => { tweet.active = true; });
    // Set application state (active tweets + reset unread count)
    this.setState({ tweets: updated, count: 0 });
  }

  // check if more tweets should be loaded, by scroll position
  checkWindowScroll() {
    // Get scroll pos & window data
    let h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    let s = document.body.scrollTop;
    let scrolled = (h + s) > document.body.offsetHeight;
    // If scrolled enough, not currently paging and not complete...
    if(scrolled && !this.state.paging && !this.state.done) {
      // Set application state (Paging, Increment page)
      this.setState({ paging: true, page: this.state.page + 1 });
      // Get the next page of tweets from the server
      this.getPage(this.state.page);
    }
  }

  // get JSON from server by page
  getPage(page) {
    let request = new XMLHttpRequest();
    request.open('GET', 'page/' + page + '/' + this.state.skip, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400){
        this.loadPagedTweets(JSON.parse(request.responseText));
      } else {
        // Set application state (Not paging, paging complete)
        this.setState({ paging: false, done: true });
      }
    };
    // Fire!
    request.send();
  }

  loadPagedTweets(tweets) {
    if (tweets.length > 0) {
      let updated = this.state.tweets;
      tweets.forEach((tweet) => { updated.push(tweet); });
      // use timeout to see loading spinner
      setTimeout(() => {
        this.setState({ tweets: updated, paging: false });
      }, 1000);
    } else {
      // Set application state (Not paging, paging complete)
      this.setState({ done: true, paging: false });
    }
  }

};

export default TweetsApp;