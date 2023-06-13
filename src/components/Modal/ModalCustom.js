import React from 'react';
import { Modal } from 'antd';
import './Modal.css';

export const ModalCustom = ({
  title,
  visible,
  children,
  onCancel,
  onClick,
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onClick}
      onCancel={onCancel}
      footer={null}
    >
      {children}
    </Modal>
  );
};
