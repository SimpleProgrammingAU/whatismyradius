import React, { Component, ChangeEvent } from "react";
import { default as xhr } from "axios";
import { connect } from "react-redux";
import { Form, Button, Icon, Container } from "semantic-ui-react";
import { coordinatesUpdate, toggleDrag } from "../Actions";
import './AddressForm.css';

class AddressForm extends Component<any, any> {
  private _timeout: NodeJS.Timeout | null = null;

  constructor(props: any) {
    super(props);
    this.state = {
      address: "",
      lockButtonText: "Lock Map",
    };
  }

  private _searchUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    if (this._timeout !== null) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }

    this.setState({
      address: e.target.value,
    });

    this._timeout = setTimeout(this._search, 1000);

    e.preventDefault();
  };

  private _search = () => {
    xhr
      .post("http://www.mapquestapi.com/geocoding/v1/address?key=0RKyiF3MSnhN9sRfRMpIuEIR2paUN00G", {
        location: this.state.address + " Australia",
        maxResults: 1,
      })
      .then((response) => {
        const { displayLatLng } = response.data.results[0].locations[0];
        this.props.coordinatesUpdate([displayLatLng.lat, displayLatLng.lng]);
      });
  };

  private _toggleLock = () => {
    (this.state.lockButtonText === "Lock Map") ? this.setState({lockButtonText: "Unlock Map"}) : this.setState({lockButtonText: "Lock Map"});
    this.props.toggleDrag();
  }

  render = () => {
    return (
      <div className="addressForm">
        <Form>
          <Container className="formContainer">
            <Form.Input
              type="text"
              value={this.state.address}
              onChange={this._searchUpdate}
              placeholder="Enter your address or click anywhere on the map"
            />
            <Button animated fluid onClick={this._search}>
              <Button.Content visible>Search</Button.Content>
              <Button.Content hidden>
                <Icon name="search" />
              </Button.Content>
            </Button>
            <Button animated fluid onClick={this._toggleLock}>
              <Button.Content visible>{this.state.lockButtonText}</Button.Content>
              <Button.Content hidden>
                <Icon name="lock" />
              </Button.Content>
            </Button>
          </Container>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps, { coordinatesUpdate, toggleDrag })(AddressForm);