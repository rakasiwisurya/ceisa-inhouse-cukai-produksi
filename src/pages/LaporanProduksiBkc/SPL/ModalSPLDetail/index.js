import { Card, Col, DatePicker, Input, Modal, Row, Skeleton } from "antd";
import FormLabel from "components/FormLabel";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class ModalSPLDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Surat Pernyataan Libur",
      cardTitle1: "Data Pemohon",
      cardTitle2: "Data Pabrik",
      cardTitle3: "Pernyataan",

      isUpdateLoading: false,
      isDetailLoading: true,
      isModalDaftarNppbkcVisible: false,
      isModalDaftarKotaVisible: false,

      nomorSpl: null,
      tanggalSpl: null,
      namaPengusaha: null,
      jabatan: null,
      alamatPengusaha: null,

      idNppbkc: null,
      namaNppbkc: null,
      nppbkc: null,
      alamatNppbkc: null,

      awalLibur: null,
      akhirLibur: null,
      tanggalPernyataan: null,
      idKotaPernyataan: null,
      namaKotaPernyataan: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id && this.props.id) {
      this.getSplDetail();
    }
  }

  getSplDetail = async () => {
    const payload = { idSpl: this.props.id };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/spl/browse-by-id",
      params: payload,
      setLoading: (bool) => this.setState({ isDetailLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState({
        nomorSpl: data.nomorSpl,
        tanggalSpl: moment(data.tanggalSpl),
        namaPengusaha: data.namaPengusaha,
        jabatan: data.jabatanPengusaha,
        alamatPengusaha: data.alamatPengusaha,
        idNppbkc: data.idNppbkc,
        namaNppbkc: data.namaPerusahaan,
        nppbkc: data.nppbkc,
        alamatNppbkc: data.alamatPerusahaan,
        awalLibur: moment(data.awalLibur),
        akhirLibur: moment(data.akhirLibur),
        tanggalPernyataan: moment(data.tanggalPernyataan),
        namaKotaPernyataan: data.tempatPernyataan,
      });
    }
  };

  render() {
    return (
      <Modal
        title="SPL Detail"
        width="70%"
        visible={this.props.isVisible}
        onCancel={this.props.onCancel}
        footer={null}
        centered
        style={{ top: 20 }}
      >
        {this.state.isDetailLoading ? (
          <Skeleton active avatar paragraph={{ rows: 10 }} />
        ) : (
          <>
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <Card title={this.state.cardTitle1} style={{ height: 563 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor SPL</FormLabel>
                    </div>
                    <Input id="nomorSpl" value={this.state.nomorSpl} disabled />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal SPL</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggalSpl"
                      format="DD-MM-YYYY"
                      value={this.state.tanggalSpl}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nama Pengusaha</FormLabel>
                    </div>
                    <Input id="namaPengusaha" value={this.state.namaPengusaha} disabled />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jabatan</FormLabel>
                    </div>
                    <Input id="jabatan" value={this.state.jabatan} disabled />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Alamat</FormLabel>
                    </div>
                    <Input.TextArea
                      id="alamatPengusaha"
                      value={this.state.alamatPengusaha}
                      disabled
                    />
                  </div>
                </Card>
              </Col>

              <Col span={12}>
                <Card title={this.state.cardTitle2} style={{ height: 563 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nama Perusahaan</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input id="namaNppbkc" value={this.state.namaNppbkc} disabled />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>NPPBKC</FormLabel>
                    </div>
                    <Input id="nppbkc" value={this.state.nppbkc} disabled />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Alamat</FormLabel>
                    </div>
                    <Input.TextArea id="alamatNppbkc" value={this.state.alamatNppbkc} disabled />
                  </div>
                </Card>
              </Col>

              <Col span={12}>
                <Card title={this.state.cardTitle3}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Libur</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <DatePicker
                        id="awalLibur"
                        format="DD-MM-YYYY"
                        value={this.state.awalLibur}
                        style={{ width: "100%" }}
                        disabled
                      />
                      <div>s.d</div>
                      <DatePicker
                        id="akhirLibur"
                        format="DD-MM-YYYY"
                        value={this.state.akhirLibur}
                        style={{ width: "100%" }}
                        disabled
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal, Tempat</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <DatePicker
                        id="tanggalPernyataan"
                        format="DD-MM-YYYY"
                        value={this.state.tanggalPernyataan}
                        disabled
                      />
                      <div>,</div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <Input
                          id="namaKotaPernyataan"
                          value={this.state.namaKotaPernyataan}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Modal>
    );
  }
}
