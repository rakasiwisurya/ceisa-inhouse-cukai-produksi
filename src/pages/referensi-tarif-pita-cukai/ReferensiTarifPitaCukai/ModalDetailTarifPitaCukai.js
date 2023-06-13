import { Form, Input, Modal } from "antd";
import React, { Component } from "react";

export default class ModalDetailTarifPitaCukai extends Component {
  render() {
    const { isOpen, onCancel, data } = this.props;

    return (
      <Modal
        title="Referensi Tarif dan Pita Cukai Detail"
        visible={isOpen}
        onCancel={onCancel}
        footer={null}
        centered
      >
        <Form>
          <Form.Item>
            <Input disabled value={data.nomor_surat} />
          </Form.Item>
          <Form.Item>
            <Input disabled value={data.tanggal_surat} />
          </Form.Item>
          <Form.Item>
            <Input disabled value={data.awal_berlaku} />
          </Form.Item>
          <Form.Item>
            <Input disabled value={data.akhir_berlaku} />
          </Form.Item>
          <Form.Item>
            <Input disabled value={data.jenis_bkc} />
          </Form.Item>
          <Form.Item>
            <Input disabled value={data.jenis_referensi} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
