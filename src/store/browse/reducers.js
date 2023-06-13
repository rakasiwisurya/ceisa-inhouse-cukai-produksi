import {
  CHANGE_TAB,
} from "./actionsTypes";
import dataInit from "./data";

const initialState = { ...dataInit };

const Browse = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_TAB:
      state.activeTab = payload;
      break;

    default:break;
  }
  return state;
};

export default Browse;
