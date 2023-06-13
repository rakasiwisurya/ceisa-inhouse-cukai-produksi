import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { ModalKonfirmasi, ModalMessage } from "./index";

const ModalAll = () => {
  const { Common } = useSelector((state) => state);
  return (
    <Fragment>
      <ModalKonfirmasi
        visible={Common.confirm.show}
        type={Common.confirm.type}
        title={Common.confirm.title}
        message={Common.confirm.message}
        onCancel={Common.confirm.onCancel}
        onSubmit={Common.confirm.onConfirm}
        buttonCancel={Common.confirm.buttonCancel}
        buttonConfirm={Common.confirm.buttonConfirm}
        showCancel={Common.confirm.showButtonCancel}
        showSubmit={Common.confirm.showButtonConfirm}
      />
      <ModalMessage
        visible={Common.error.show}
        type={"danger"}
        title={Common.error.title}
        message={Common.error.message}
        onCancel={Common.error.onCancel}
        onSubmit={Common.error.onConfirm}
        buttonCancel={Common.error.buttonCancel}
        buttonConfirm={Common.error.buttonConfirm}
        showCancel={Common.error.showButtonCancel}
        showSubmit={Common.error.showButtonConfirm}
      />
      <ModalMessage
        visible={Common.success.show}
        type={"success"}
        title={Common.success.title}
        message={Common.success.message}
        onCancel={Common.success.onCancel}
        onSubmit={Common.success.onConfirm}
        buttonCancel={Common.success.buttonCancel}
        buttonConfirm={Common.success.buttonConfirm}
        showCancel={Common.success.showButtonCancel}
        showSubmit={Common.success.showButtonConfirm}
      />
      <ModalMessage
        visible={Common.warning.show}
        type={"warning"}
        title={Common.warning.title}
        message={Common.warning.message}
        onCancel={Common.warning.onCancel}
        onSubmit={Common.warning.onConfirm}
        buttonCancel={Common.warning.buttonCancel}
        buttonConfirm={Common.warning.buttonConfirm}
        showCancel={Common.warning.showButtonCancel}
        showSubmit={Common.warning.showButtonConfirm}
      />
      <ModalMessage
        visible={Common.info.show}
        type={"info"}
        title={Common.info.title}
        message={Common.info.message}
        onCancel={Common.info.onCancel}
        onSubmit={Common.info.onConfirm}
        buttonCancel={Common.info.buttonCancel}
        buttonConfirm={Common.info.buttonConfirm}
        showCancel={Common.info.showButtonCancel}
        showSubmit={Common.info.showButtonConfirm}
      />
    </Fragment>
  );
};

export default ModalAll;
