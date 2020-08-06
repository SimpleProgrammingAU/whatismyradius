import { SemanticICONS } from "semantic-ui-react";

interface POI {
  id: number;
  label: string;
  osm: string[];
  icon: SemanticICONS;
}

export default POI;
