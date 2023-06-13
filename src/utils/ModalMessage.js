import { useSelector, useDispatch } from "react-redux";
import * as actions from "store/common/actions";

const dispatch = useDispatch();

export const ModalClose = (type) => {
  dispatch(actions.closeModal(type));
};

export const ModalConfirm = (data = {}) => {
  dispatch(actions.setConfirm({
    show: true,
    ...data,
  }));
};
export const ModalSuccess = (data = {}) => {
  dispatch(actions.setSuccess({
    show: true,
    ...data,
  }));
};
export const ModalError = (data = {}) => {
  dispatch(actions.setError({
    show: true,
    ...data,
  }));
};
export const ModalWarning = (data = {}) => {
  dispatch(actions.setWarning({
    show: true,
    ...data,
  }));
};
export const ModalInfo = (data = {}) => {
  dispatch(actions.setInfo({
    show: true,
    ...data,
  }));
};