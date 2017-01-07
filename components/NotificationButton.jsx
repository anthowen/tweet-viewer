import React from 'react';

class NotificationButton extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    const count = this.props.count;
    return (
      <div className={ "notification-button-container" }>
        <div
          className={ "notification-button" + (count > 0 ? ' active' : '') }
          onClick={ this.props.onShowNewTweets }
        >
          { count === 1 ?
            <p>There is 1 new tweet!</p>
            :
            <p>There are {count} new tweets!</p>
          }
        </div>
      </div>
    )
  }

};

export default NotificationButton;