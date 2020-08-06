export default interface OSMFeature {
  type: "Feature";
  id: string;
  properties: OSMFeatureProperties;
  geometry: OSMGeometry;
}

interface OSMFeatureProperties {
  type: "node" | "realtion" | "way";
  id: number;
  tags: OSMFeatureTags;
  relations: any[];
  meta: any;
}

interface OSMFeatureTags {
  "addr:city"?: string;
  "addr:housenumber"?: string;
  "addr:postcode"?: string;
  "addr:street"?: string;
  name?: string;
  "name:en"?: string;
  opening_hours?: string;
  phone?: string;
  shop?: string;
  landuse?: string;
  building?: string;
  website?: string;
}

interface OSMGeometry {
  type: "Point" | "Polygon";
  coordinates: number[] | number[][][];
}
