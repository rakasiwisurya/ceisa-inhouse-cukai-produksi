import * as actionsTypes from "./actionsTypes";

export const closeModal = (
  type,
  callback = () => {},
) => async (dispatch, getState) => {
  const listType = {
    SET_ERROR: "error",
    SET_SUCCESS: "success",
    SET_WARNING: "warning",
    SET_INFO: "info",
    SET_CONFIRM: "confirm",
  };

  if (listType[type]) {
    await dispatch({
      type: type,
      payload: {
        modalName: listType[type],
        show: false,
      }
    });
    callback();
  }
};

export const setLoadingInit = (state) => (dispatch, getState) => {
  dispatch({
    type: actionsTypes.SET_LOADING_INIT,
    payload: state,
  })
};

export const setError = (state) => (dispatch, getState) => {
  if (!state.onCancel) {
    state.onCancel = () => dispatch(closeModal(actionsTypes.SET_ERROR));
  } else {
    const callback = state.onCancel;
    state.onCancel = async () => {
      await callback();
      dispatch(closeModal(actionsTypes.SET_ERROR));
    }
  }
  if (!state.onConfirm) {
    state.onConfirm = () => dispatch(closeModal(actionsTypes.SET_ERROR));
  } else {
    const callback = state.onConfirm;
    state.onConfirm = async () => {
      await callback();
      dispatch(closeModal(actionsTypes.SET_ERROR));
    }
  }
  
  dispatch({
    type: actionsTypes.SET_ERROR,
    payload: {
      ...(getState().error),
      ...state,
    },
  })
};

export const setSuccess = (state) => (dispatch, getState) => {
  if (!state.onCancel) {
    state.onCancel = () => dispatch(closeModal(actionsTypes.SET_SUCCESS));
  } else {
    const callback = state.onCancel;
    state.onCancel = async () => {
      await callback();
      dispatch(closeModal(actionsTypes.SET_SUCCESS));
    }
  }
  if (!state.onConfirm) {
    state.onConfirm = () => dispatch(closeModal(actionsTypes.SET_SUCCESS));
  } else {
    const callback = state.onConfirm;
    state.onConfirm = async () => {
      await callback();
      dispatch(closeModal(actionsTypes.SET_SUCCESS));
    }
  }
  
  dispatch({
    type: actionsTypes.SET_SUCCESS,
    payload: {
      ...(getState().success),
      ...state,
    },
  })
};

export const setWarning = (state) => (dispatch, getState) => {
  if (!state.onCancel) {
    state.onCancel = () => dispatch(closeModal(actionsTypes.SET_WARNING));
  } else {
    const callback = state.onCancel;
    state.onCancel = async () => {
      await callback();
      dispatch(closeModal(actionsTypes.SET_WARNING));
    }
  }
  if (!state.onConfirm) {
    state.onConfirm = () => dispatch(closeModal(actionsTypes.SET_WARNING));
  } else {
    const callback = state.onConfirm;
    state.onConfirm = async () => {
      await callback();
      dispatch(closeModal(actionsTypes.SET_WARNING));
    }
  }
  
  dispatch({
    type: actionsTypes.SET_WARNING,
    payload: {
      ...(getState().warning),
      ...state,
    },
  })
};

export const setInfo = (state) => (dispatch, getState) => {
  if (!state.onCancel) {
    state.onCancel = () => dispatch(closeModal(actionsTypes.SET_INFO));
  } else {
    const callback = state.onCancel;
    state.onCancel = async () => {
      await callback();
      dispatch(closeModal(actionsTypes.SET_INFO));
    }
  }
  if (!state.onConfirm) {
    state.onConfirm = () => dispatch(closeModal(actionsTypes.SET_INFO));
  } else {
    const callback = state.onConfirm;
    state.onConfirm = async () => {
      await callback();
      dispatch(closeModal(actionsTypes.SET_INFO));
    }
  }
  
  dispatch({
    type: actionsTypes.SET_INFO,
    payload: {
      ...(getState().info),
      ...state,
    },
  })
};

export const setConfirm = (state) => (dispatch, getState) => {
  if (!state.onCancel) {
    state.onCancel = () => dispatch(closeModal(actionsTypes.SET_CONFIRM));
  } else {
    const callback = state.onCancel;
    state.onCancel = async () => {
      await callback();
      dispatch(closeModal(actionsTypes.SET_CONFIRM));
    }
  }
  if (!state.onConfirm) {
    state.onConfirm = () => dispatch(closeModal(actionsTypes.SET_CONFIRM));
  } else {
    const callback = state.onConfirm;
    state.onConfirm = async () => {
      await callback();
      setTimeout(() => dispatch(closeModal(actionsTypes.SET_CONFIRM)), 400);
    }
  }
  
  dispatch({
    type: actionsTypes.SET_CONFIRM,
    payload: {
      ...(getState().confirm),
      ...state,
    },
  })
};

export const setOptions = (state) => (dispatch, getState) => {
  dispatch({
    type: actionsTypes.SET_OPTIONS,
    payload: {
      ...(getState().options),
      ...state,
    },
  })
};
