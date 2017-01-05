import React from 'react';

class Loader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"loader " + (this.props.paging ? "active" : "")}>
        <img src="loader.svg" />
      </div>
    )
  }

};

export default Loader;