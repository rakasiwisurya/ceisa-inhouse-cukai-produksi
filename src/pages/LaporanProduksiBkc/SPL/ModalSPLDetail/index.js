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
      card_title_1: "Data Pemohon",
      card_title_2: "Data Pabrik",
      card_title_3: "Pernyataan",

      isUpdateLoading: false,
      isDetailLoading: true,
      isModalDaftarNppbkcVisible: false,
      isModalDaftarKotaVisible: false,

      nomor_spl: "",
      tanggal_spl: null,
      nama_pengusaha: "",
      jabatan: "",
      alamat_pemohon: "",

      nppbkc_id: "",
      nama_nppbkc: "",
      nppbkc: "",
      alamat_nppbkc: "",

      tanggal_libur_awal: null,
      tanggal_libur_akhir: null,
      pernyataan_tanggal: null,
      pernyataan_kota_id: "",
      pernyataan_kota_name: "",
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
        nomor_spl: data.nomorSpl,
        tanggal_spl: moment(data.tanggalSpl),
        nama_pengusaha: data.namaPengusaha,
        jabatan: data.jabatanPengusaha,
        alamat_pemohon: data.alamatPengusaha,
        nppbkc_id: data.idNppbkc,
        nama_nppbkc: data.namaPerusahaan,
        nppbkc: data.nppbkc,
        alamat_nppbkc: data.alamatPerusahaan,
        tanggal_libur_awal: moment(data.awalLibur),
        tanggal_libur_akhir: moment(data.akhirLibur),
        pernyataan_tanggal: moment(data.tanggalPernyataan),
        pernyataan_kota_name: data.tempatPernyataan,
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
                <Card title={this.state.card_title_1} style={{ height: 563 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor SPL</FormLabel>
                    </div>
                    <Input id="nomor_spl" value={this.state.nomor_spl} disabled />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal SPL</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_spl"
                      format="DD-MM-YYYY"
                      value={this.state.tanggal_spl}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nama Pengusaha</FormLabel>
                    </div>
                    <Input id="nama_pengusaha" value={this.state.nama_pengusaha} disabled />
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
                      id="alamat_pemohon"
                      value={this.state.alamat_pemohon}
                      disabled
                    />
                  </div>
                </Card>
              </Col>

              <Col span={12}>
                <Card title={this.state.card_title_2} style={{ height: 563 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nama Perusahaan</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input id="nama_nppbkc" value={this.state.nama_nppbkc} disabled />
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
                    <Input.TextArea id="alamat_nppbkc" value={this.state.alamat_nppbkc} disabled />
                  </div>
                </Card>
              </Col>

              <Col span={12}>
                <Card title={this.state.card_title_3}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Libur</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <DatePicker
                        id="tanggal_libur_awal"
                        format="DD-MM-YYYY"
                        value={this.state.tanggal_libur_awal}
                        style={{ width: "100%" }}
                        disabled
                      />
                      <div>s.d</div>
                      <DatePicker
                        id="tanggal_libur_akhir"
                        format="DD-MM-YYYY"
                        value={this.state.tanggal_libur_akhir}
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
                        id="pernyataan_tanggal"
                        format="DD-MM-YYYY"
                        value={this.state.pernyataan_tanggal}
                        disabled
                      />
                      <div>,</div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <Input
                          id="pernyataan_kota_name"
                          value={this.state.pernyataan_kota_name}
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
