import React from "react";


class AboutPage extends React.Component {
  state = {
    date: new Date()
  };


  render() {
    return (
      <div>
        <h6>This a simple offline planner app.</h6>
        <p><i>Please feel free to log your daily here.</i></p>
      </div>
    );
  }
}

export default AboutPage;
