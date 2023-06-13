import { Form, Input, Modal } from "antd";
import React, { Component } from "react";

export default class ModalEditTarifPitaCukai extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomor_surat: "",
      tanggal_surat: "",
      awal_berlaku: "",
      akhir_berlaku: "",
      jenis_bkc: "",
      jenis_referensi: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      const {
        nomor_surat,
        tanggal_surat,
        awal_berlaku,
        akhir_berlaku,
        jenis_bkc,
        jenis_referensi,
      } = this.props.data;

      this.setState({
        ...this.state,
        nomor_surat,
        tanggal_surat,
        awal_berlaku,
        akhir_berlaku,
        jenis_bkc,
        jenis_referensi,
      });
    }
  }

  handleInputChange = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  };
  handleUpdate = () => {
    console.log("update...");
    this.props.onCancel();
  };

  render() {
    const { isOpen, onCancel } = this.props;

    return (
      <Modal
        title="Referensi Tarif dan Pita Cukai Edit"
        visible={isOpen}
        onCancel={onCancel}
        onOk={this.handleUpdate}
        cancelText="Batal"
        okText="Ubah"
        centered
      >
        <Form>
          <Form.Item>
            <Input
              id="nomor_surat"
              value={this.state.nomor_surat}
              onChange={this.handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              id="tanggal_surat"
              value={this.state.tanggal_surat}
              onChange={this.handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              id="awal_berlaku"
              value={this.state.awal_berlaku}
              onChange={this.handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              id="akhir_berlaku"
              value={this.state.akhir_berlaku}
              onChange={this.handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Input id="jenis_bkc" value={this.state.jenis_bkc} onChange={this.handleInputChange} />
          </Form.Item>
          <Form.Item>
            <Input
              id="jenis_referensi"
              value={this.state.jenis_referensi}
              onChange={this.handleInputChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
