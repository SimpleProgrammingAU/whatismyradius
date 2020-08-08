import React, { Component, ChangeEvent } from "react";
import { default as xhr } from "axios";
import { connect } from "react-redux";
import { Form, Button, Icon, Grid, Select } from "semantic-ui-react";
import { addLocation, clearLocations, coordinatesUpdate, toggleDrag } from "../Actions";
import "./AddressForm.css";
import { POI } from "../Interfaces";
import Config from "../classes/Config";

class AddressForm extends Component<any, any> {
  private _timeout: NodeJS.Timeout | null = null;
  private _poi: POI[] = Config.Services;

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

  private _osm = (e: React.SyntheticEvent<HTMLElement, Event>, { value }: any) => {
    Config.OSMQuery(this.props, value);
    console.log(value);
    e.preventDefault();
  };

  private _toggleLock = () => {
    this.state.lockButtonText === "Lock Map"
      ? this.setState({ lockButtonText: "Unlock Map" })
      : this.setState({ lockButtonText: "Lock Map" });
    this.props.toggleDrag();
  };

  render = () => {
    const options = Config.Services.map((service) => {
      return { key: service.id, value: service.id, text: service.label };
    });
    return (
      <div className="addressForm">
        <Form>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={10}>
                <Form.Input
                  type="text"
                  value={this.state.address}
                  onChange={this._searchUpdate}
                  placeholder="Enter your address or click anywhere on the map"
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <Grid doubling>
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <Button animated fluid onClick={this._search}>
                        <Button.Content visible>Search</Button.Content>
                        <Button.Content hidden>
                          <Icon name="search" />
                        </Button.Content>
                      </Button>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <Button animated fluid onClick={this._toggleLock}>
                        <Button.Content visible>{this.state.lockButtonText}</Button.Content>
                        <Button.Content hidden>
                          <Icon name="lock" />
                        </Button.Content>
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="poi-select">
              <Grid.Column width={16}>
                <Select placeholder="Select a Service" options={options} onChange={this._osm} fluid closeOnChange />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </div>
    );
  };
}

const mapStateToProps = (state: any) => {
  return {
    coords: state.coords,
  };
};

export default connect(mapStateToProps, { addLocation, clearLocations, coordinatesUpdate, toggleDrag })(AddressForm);
