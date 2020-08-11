import React, { Component } from "react";
import cd from "countdown";
import { Header } from "semantic-ui-react";

class Countdown extends Component<any, any> {
  private _lockdownStart = new Date("2020-08-02 18:00:00+10:00");

  constructor(props: any) {
    super(props);
    this.state = {
      countDownText: cd(this._lockdownStart).toString(),
    };
  }

  componentDidMount = () => {
    window.setInterval(this._updateCountdown, 1000);
  }

  private _updateCountdown = () => {
    this.setState({
      countDownText: cd(this._lockdownStart).toString(),
    });
  };

  render() {
    return (
      <Header as="h3" block>
        Well done Melbourne! We've been in Stage 4 lockdown for {this.state.countDownText}.
      </Header>
    );
  }
}

export default Countdown;
