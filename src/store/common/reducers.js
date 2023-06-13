import {
  SET_LOADING_INIT,
  SET_ERROR,
  SET_SUCCESS,
  SET_WARNING,
  SET_INFO,
  SET_CONFIRM,
  SET_OPTIONS,
} from "./actionsTypes";

const initialState = {
  loadingInit: false,
  error: {
    visible: false,
    title: "",
    type: "danger",
    message: "",
    buttonConfirm: "OK",
    buttonCancel: "Batal",
    showConfirm: true,
    showCancel: false,
  },
  success: {
    visible: false,
    title: "",
    type: "success",
    message: "",
    buttonConfirm: "OK",
    buttonCancel: "Batal",
    showConfirm: true,
    showCancel: false,
  },
  warning: {
    visible: false,
    title: "",
    type: "warning",
    message: "",
    buttonConfirm: "OK",
    buttonCancel: "Batal",
    showConfirm: true,
    showCancel: false,
  },
  info: {
    visible: false,
    title: "",
    type: "info",
    message: "",
    buttonConfirm: "OK",
    buttonCancel: "Batal",
    showConfirm: true,
    showCancel: false,
  },
  confirm: {
    visible: false,
    title: "",
    type: "",
    message: "",
    buttonConfirm: "OK",
    buttonCancel: "Batal",
    showConfirm: true,
    showCancel: true,
  },
  options: {

  }
};

const Common = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING_INIT:
      return {
        ...state,
        loadingInit: payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: {...payload},
      };
    case SET_SUCCESS:
      return {
        ...state,
        success: {...payload},
      };
    case SET_WARNING:
      return {
        ...state,
        warning: {...payload},
      };
    case SET_INFO:
      return {
        ...state,
        info: {...payload},
      };
    case SET_CONFIRM:
      return {
        ...state,
        confirm: {...payload},
      };
    case SET_OPTIONS:
      return {
        ...state,
        optons: {
          ...state.options,
          [payload.name]: [...payload.value],
        }
      };
    default: return state;
  };
};

export default Common;
