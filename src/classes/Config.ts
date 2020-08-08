import haversine from "haversine";
import { default as osm } from "query-overpass";
import { OSMFeature, POI } from "../Interfaces";
import testSites from "../test-sites.json";

class Config {
  public static Services:POI[] = [
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

  public static OSMQuery = (props:any, id: number) => {
    const { coords, addLocation, clearLocations } = props;
    if (id === 1) {
      clearLocations();
      testSites.forEach((site, i) => {
        const { name, website, lat, lng } = site;
        const distance = haversine(
          { longitude: lng as number, latitude: lat as number },
          { longitude: coords[1], latitude: coords[0] },
          { unit: "meter" }
        );
        if (distance < 5000)
          addLocation({
            id: i,
            name,
            website,
            distance,
            coords: [lat, lng],
          });
      });
    } else {
      const filter = Config.Services.filter((poi) => poi.id === id)[0].osm;
      const query = `[out:json][timeout:60]; (
      ${filter
        .map((row) => {
          return `node(around:5000, ${coords[0]}, ${coords[1]})[${row}]; relation(around:5000, ${coords[0]}, ${coords[1]})[${row}]; way(around:5000, ${coords[0]}, ${coords[1]})[${row}];`;
        })
        .join(" ")}
      ); out body; >; out skel qt;`;
      osm(query, (err: any, res: { type: string; features: OSMFeature[] }) => {
        if (err) console.error(err);
        clearLocations();
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
          addLocation({
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

}

export default Config;