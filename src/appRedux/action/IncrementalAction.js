import {DECREMENTAL, INCREMENTAL} from "appRedux/types";

export function IncrementalAction() {
  return {
    type: INCREMENTAL
  }
}

export function DecrementalAction() {
  return {
    type: DECREMENTAL
  }
}
