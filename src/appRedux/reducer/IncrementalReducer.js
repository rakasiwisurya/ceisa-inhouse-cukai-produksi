import {INCREMENTAL, DECREMENTAL} from "../types";
const initialState = 0
const IncrementReducer = (state = initialState, action) => {
  switch(action.type) {
    case INCREMENTAL:
      return state + 1
    case DECREMENTAL:
      return state - 1
    default:
      return state
  }
}

export default IncrementReducer
