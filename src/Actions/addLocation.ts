import { Location } from "../Interfaces";

const addLocation = (location: Location) => {
  return {
    type: "ADD_LOCATION",
    payload: location,
  };
};

export default addLocation;
