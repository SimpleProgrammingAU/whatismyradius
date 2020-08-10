import { Action } from "../Interfaces";

const toggleLoading = (): Action<undefined> => {
  return {
    type: "TOGGLE_LOADING",
  };
};

export default toggleLoading;
