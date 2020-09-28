import React, { Component } from "react";
import cd from "countdown";
import { Header } from "semantic-ui-react";

class Countdown extends Component<any, any> {
  private _lockdownStart = new Date("2020-09-28 05:00:00+10:00");

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
        Melbourne is {this.state.countDownText} of three weeks (pending case numbers) into Step 2 of the return to COVID-Normal.
      </Header>
    );
  }
}

export default Countdown;
