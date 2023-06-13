import { combineReducers } from "redux";
import IncrementReducer from "./IncrementalReducer";

const reducers = combineReducers({
  incrementalData: IncrementReducer,
});

export default reducers;
