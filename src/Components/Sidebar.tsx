import "./Sidebar.css";
import testSites from "../test-sites.json";
import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Header, Divider, Button } from "semantic-ui-react";
import { default as osm } from "query-overpass";
import { POI, OSMFeature, Location } from "../Interfaces";
import { addLocation, clearLocations } from "../Actions";
import haversine from "haversine";

class Sidebar extends Component<any, any> {
  private _selected: number = 0;
  private static _poi: POI[] = [
    { id: 1, label: "COVID Testing", osm: [""], icon: "syringe" },
    { id: 2, label: "Supermarket", osm: [`"shop"="supermarket"`], icon: "shopping basket" },
    { id: 3, label: "Chemist", osm: [`"amenity"="pharmacy"`, `"healthcare"="pharmacy"`], icon: "heart" },
    { id: 4, label: "Doctor", osm: [`"amenity"="doctors"`, `"healthcare"="doctor"`], icon: "doctor" },
    { id: 5, label: "Hospital", osm: [`"amenity"="hospital"`, `"healthcare"="hospital"`], icon: "hospital symbol" },
    { id: 6, label: "Bakery", osm: [`"shop"="bakery"`, `"shop"="pastry"`], icon: "shop" },
    { id: 7, label: "Butchers", osm: [`"shop"="butcher"`], icon: "shop" },
    { id: 8, label: "Restaurant", osm: [`"amenity"="restaurant"`, `"amenity"="fast_food"`], icon: "food" },
    { id: 9, label: "Coffee", osm: [`"amenity"="cafe"`, `"amenity"="cafe"`], icon: "coffee" },
    { id: 10, label: "Bottle Shop", osm: [`"shop"="wine"`, `"shop"="alcohol"`], icon: "beer" },
  ];

  private _clearList = () => {
    this._selected = 0;
    this.props.clearLocations();
  };

  private _osmQuery = (id: number) => {
    this._selected = id;
    const { coords } = this.props;
    if (id === 1) {
      this.props.clearLocations();
      testSites.forEach((site, i) => {
        const { name, website, lat, lng } = site;
        const distance = haversine(
          { longitude: lng as number, latitude: lat as number },
          { longitude: coords[1], latitude: coords[0] },
          { unit: "meter" }
        );
        if (distance < 5000)
          this.props.addLocation({
            id: i,
            name,
            website,
            distance,
            coords: [lat, lng],
          });
      });
    } else {
      const filter = Sidebar._poi.filter((poi) => poi.id === id)[0].osm;
      const query = `[out:json][timeout:60]; (
      ${filter
        .map((row) => {
          return `node(around:5000, ${coords[0]}, ${coords[1]})[${row}]; relation(around:5000, ${coords[0]}, ${coords[1]})[${row}]; way(around:5000, ${coords[0]}, ${coords[1]})[${row}];`;
        })
        .join(" ")}
      ); out body; >; out skel qt;`;
      osm(query, (err: any, res: { type: string; features: OSMFeature[] }) => {
        if (err) console.error(err);
        this.props.clearLocations();
        const { features } = res;
        features.forEach((feature, i) => {
          let lat = 0;
          let lng = 0;
          let cnt = 0;
          let name = feature.properties.tags.name || "";
          let website = feature.properties.tags.website || "";
          if (typeof feature.geometry.coordinates[0] === "number") {
            lat = feature.geometry.coordinates[1] as number;
            lng = feature.geometry.coordinates[0] as number;
          } else {
            (feature.geometry.coordinates as number[][][]).forEach((a) => {
              a.forEach((b) => {
                lat += b[1];
                lng += b[0];
                cnt++;
              });
            });
            lat /= cnt;
            lng /= cnt;
          }
          this.props.addLocation({
            id: i,
            name,
            website,
            distance: haversine(
              { longitude: lng, latitude: lat },
              { longitude: coords[1], latitude: coords[0] },
              { unit: "meter" }
            ),
            coords: [lat, lng],
          });
        });
      });
    }
  };

  render = () => {
    const { locations } = this.props;
    const header =
      this._selected !== 0 ? (
        <Header as="h2">{Sidebar._poi.filter((p) => p.id === this._selected)[0].label}</Header>
      ) : (
        <Header as="h2">Local Services</Header>
      );
    const backBtn = this._selected === 0 ? null : <Button onClick={this._clearList}>Back to Services</Button>;
    const linkList =
      (locations as Location[]).length > 0
        ? (locations as Location[])
            .sort((a, b) => {
              return a.distance - b.distance;
            })
            .map((location) => {
              return (
                <List.Item key={location.id}>
                  <List.Content>
                    <List.Header>{location.name}</List.Header>
                    <List.Description>
                      <a href={location.website}>{location.website}</a>
                    </List.Description>
                  </List.Content>
                </List.Item>
              );
            })
            .filter((l, i) => i < 20)
        : Sidebar._poi.map((poi) => {
            return (
              <List.Item key={poi.id} onClick={() => this._osmQuery(poi.id)}>
                <List.Icon name={poi.icon} size="large" verticalAlign="middle" />
                <List.Content>
                  <List.Header>{poi.label}</List.Header>
                </List.Content>
              </List.Item>
            );
          });
    return (
      <div className="sidebar">
        {header}
        {backBtn}
        <Divider />
        <List animated verticalAlign="middle">
          {linkList}
        </List>
      </div>
    );
  };
}

const mapStateToProps = (state: any) => {
  return {
    coords: state.coords,
    locations: state.locations,
  };
};

export default connect(mapStateToProps, { addLocation, clearLocations })(Sidebar);