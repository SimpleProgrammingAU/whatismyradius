import { Action } from "../Interfaces";

const toggleDrag = (): Action<undefined> => {
  return {
    type: "TOGGLE_DRAG",
  };
};

export default toggleDrag;
