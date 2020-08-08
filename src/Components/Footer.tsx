import "./Footer.css";
import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <a className="bmc-button" href="https://www.buymeacoffee.com/SimplePrg">
          <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Support Development" />
          <span style={{ marginLeft: "5px", fontSize: "19px !important" }}>Support Development</span>
        </a>
        <p>
          This is an <a href="https://github.com/SimpleProgrammingAU/whatismyradius">open source project</a>. Please attribute
          source material.
        </p>
        <p>
          Proudly developed and hosted by <a href="https://www.simpleprogramming.com.au/">Simple Programming.</a>
        </p>
        <p>If you liked this and want to see more, please visit my blog via the link above.</p>
      </div>
    );
  }
}

export default Footer;
