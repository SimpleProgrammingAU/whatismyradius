const coordinatesUpdate = (coords: number[]) => {
  return {
    type: "UPDATE_COORDINATES",
    payload: coords,
  };
};

export default coordinatesUpdate;
