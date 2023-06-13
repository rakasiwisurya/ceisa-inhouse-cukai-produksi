import React from 'react';
import { Modal, Spin } from 'antd';

const ModalLoading = ({ visible }) => {
  return (
    <Modal visible={visible} footer={null} closable={false} centered={true}>
      <div style={{ textAlign: 'center' }}>
        <Spin size="large" tip="Loading..." />
      </div>
    </Modal>
  );
};

export default ModalLoading;
