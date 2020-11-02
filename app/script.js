import React from "react";
import { render } from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "off",
      time: 0,
      timer: null,
    };
  }
  
  startCount = () => {
    const workValue = 23;
    const restValue = 20;
    this.setState({
      time: workValue,
      status: "work",
      timer: setInterval(() => {
        const { time, status } = this.state;
        const currentTime = time - 1;
        if (currentTime === 0 && status === "work") {
          this.playBell();
          this.setState({
            status: "rest",
            time: restValue,
          });
        } else if (currentTime === 0 && status === "rest") {
          this.playBell();
          this.setState({
            status: "work",
            time: workValue,
          });
        } else {
          this.setState({
            time: currentTime,
          });
        }
      }, 1000),
    });
  };

  stopCount = () => {
    const { timer } = this.state;
    clearInterval(timer);
    this.setState({
      status: "off",
      timer: null,
      time: 0
    });
  };


closeApp = () => {
window.close()
};


playBell =() => {
const audioElement = new Audio('./sounds/bell.wav');
audioElement.play();
};




  render() {
    const { status, time } = this.state;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const minutesToDisplay = minutes < 10 ?  `0${minutes}`: minutes
    const secondsToDisplay = seconds < 10 ?  `0${seconds}`: seconds
    return (
      <div>
        <h1>Protect your eyes</h1>
        {status === "off" && (
          <div>
            <p>
              According to optometrists in order to save your eyes, you should
              follow the 20/20/20. It means you should to rest your eyes every
              20 minutes for 20 seconds by looking more than 20 feet away.
            </p>
            <p>
              This app will help you track your time and inform you when it's
              time to rest.
            </p>
          </div>
        )}
        {status === "work" && (<img src="./images/work.png" />)}
        {status === "rest" && (<img src="./images/rest.png" />)}
        <div className="timer">
          {minutesToDisplay}:{secondsToDisplay}
        </div>
        {status === "off" && (
          <button className="btn" onClick={this.startCount}>
            Start
          </button>
        )}
        {status !== "off" && (
          <button className="btn" onClick={this.stopCount}>
            Stop
          </button>
        )}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    );
  }
}

render(<App />, document.querySelector("#app"));
