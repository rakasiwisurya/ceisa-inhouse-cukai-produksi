import {
  CHANGE_TAB
} from "./actionsTypes";

export const HandleChangeTab = (activeTab) => (dispatch) => {
  dispatch({
    type: CHANGE_TAB,
    payload: activeTab,
  });
};