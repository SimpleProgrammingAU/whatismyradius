import { combineReducers } from "redux";
import { Action, Location } from "../Interfaces";

const coords = (coords: number[] = [], action: Action<number[]>): number[] => {
  switch (action.type) {
    case "UPDATE_COORDINATES":
      return action.payload as number[];
  }
  return coords;
};

const dragging = (isDragging = true, action: Action<undefined>): boolean => {
  switch (action.type) {
    case "TOGGLE_DRAG":
      return !isDragging;
  }
  return isDragging;
};

const locations = (locations: Location[] = [], action: Action<Location>): Location[] => {
  switch (action.type) {
    case "CLEAR_LOCATIONS":
      return [];
    case "ADD_LOCATION":
      return [...locations, action.payload as Location];
  }
  return locations;
};

export default combineReducers({
  coords,
  dragging,
  locations,
});
