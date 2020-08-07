import "./MapPane.css";
import React, { Component } from "react";
import { Map, Marker, TileLayer, Circle, Popup } from "react-leaflet";
import { LeafletMouseEvent, Icon } from "leaflet";
import { connect } from "react-redux";
import { coordinatesUpdate } from "../Actions";
import { Location } from "../Interfaces";

class MapPane extends Component<any, any> {
  private _zoom = 10;
  private _lastCoords = [];
  private _homeIcon: Icon;
  private _locationIcon: Icon;

  constructor(props: any) {
    super(props);
    this.state = {
      lat: -37.779399,
      lng: 144.961746,
    };
    this._homeIcon = new Icon({
      iconUrl: "img/home-pin.svg",
      iconSize: [30 * 0.75, 42 * 0.75],
      iconAnchor: [0, 42 * 0.75],
    });
    this._locationIcon = new Icon({
      iconUrl: "img/location-pin.svg",
      iconSize: [65 * 0.25, 92 * 0.25],
      iconAnchor: [(65 * 0.25) / 2, 92 * 0.25],
    });
  }

  private _homeUpdate = (e: LeafletMouseEvent) => {
    if (!this.props.dragging) return;
    this.props.coordinatesUpdate([e.latlng.lat, e.latlng.lng]);
    this.setState({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    });
  };

  render = () => {
    const { coords, dragging, locations } = this.props;
    const homeMarker = coords.length === 2 ? <Marker position={coords} icon={this._homeIcon}></Marker> : null;
    const homeRadius = coords.length === 2 ? <Circle center={coords} radius={5000}></Circle> : null;
    const maxDistance = (locations as Location[])
      .sort((a, b) => {
        return a.distance - b.distance;
      })
      .reduce((curVal: number, location: Location, i: number): number => {
        if (i < 20) return Math.max(curVal, location.distance);
        else return curVal;
      }, 0);
    const locationMarkers =
      locations.length === 0
        ? null
        : (locations as Location[]).map((location: Location) => {
            if (location.distance < maxDistance)
              return <Marker position={location.coords} icon={this._locationIcon} key={location.id}>
                <Popup>
                  <a href={location.website}>{location.name}</a>
                </Popup>
              </Marker>;
            else return null;
          });
    this._zoom = coords !== this._lastCoords ? 13 : this._zoom;
    return (
      <div className="map-pane" id="radiusMap">
        <Map dragging={dragging} center={[this.state.lat, this.state.lng]} zoom={this._zoom} onclick={this._homeUpdate}>
          <TileLayer 
            url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {homeMarker}
          {homeRadius}
          {locationMarkers}
        </Map>
      </div>
    );
  };
}

const mapStateToProps = (state: any) => {
  return {
    coords: state.coords,
    dragging: state.dragging,
    locations: state.locations,
  };
};

export default connect(mapStateToProps, { coordinatesUpdate })(MapPane);