import { Button, Card, Col, DatePicker, Input, InputNumber, Row, Select, notification } from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import React, { Component } from "react";
import ModalDaftarKota from "../ModalDaftarKota";
import ModalDaftarNPPBKC from "../ModalDaftarNPPBKC";
import { pathName } from "configs/constants";
import { requestApi } from "utils/requestApi";

export default class CK4EA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pemberitahuan",
      subtitle2: "Rincian",
      subtitle3: "Pemberitahu",

      isRekamLoading: false,
      isRincianDisabled: false,
      isModalDaftarNppbkcVisible: false,
      isModalDaftarKotaVisible: false,

      nppbkc_id: "",
      nppbkc: "",
      nama_nppbkc: "",
      alamat_nppbkc: "",

      jenis_laporan_id: "HARIAN",
      jenis_laporan_name: "Harian",
      nomor_pemberitahuan: "",
      tanggal_pemberitahuan: "",
      jenis_barang_kena_cukai: "Etil Alkohol (EA)",

      tanggal_jam_produksi_awal: "",
      tanggal_jam_produksi_akhir: "",
      jumlah_produksi: "",

      nomor_dokumen_produksi: "",
      tanggal_dokumen_produksi: "",
      jumlah_isi: "",
      identitas_tangki: "",
      keterangan: "",

      kota_id: "",
      kota_name: "",
      nama_pengusaha: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleInputNumberChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleDatepickerChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleSelectChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleModalShow = (visibleState) => {
    this.setState({ [visibleState]: true });
  };
  handleModalClose = (visibleState) => {
    this.setState({ [visibleState]: false });
  };

  handleDataNppbkc = (record) => {
    this.setState({
      nppbkc_id: record.nppbkc_id,
      nppbkc: record.nppbkc,
      nama_nppbkc: record.nama_nppbkc,
      alamat_nppbkc: record.alamat_nppbkc,
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };
  handleDataKota = (record) => {
    this.setState({
      kota_id: record.kota_id,
      kota_name: record.kota_name,
    });
    this.handleModalClose("isModalDaftarKotaVisible");
  };

  handleSimpanRincian = () => {
    this.setState({ isRincianDisabled: true });
  };
  handleBatal = () => {
    this.setState({ isRincianDisabled: false });
  };
  handleRekam = async () => {
    // const {
    //   nppbkc_id,

    //   jenis_laporan_id,
    //   nomor_pemberitahuan,
    //   tanggal_pemberitahuan,

    //   tanggal_jam_produksi_awal,
    //   tanggal_jam_produksi_akhir,
    //   jumlah_produksi,

    //   nomor_dokumen_produksi,
    //   tanggal_dokumen_produksi,
    //   jumlah_isi,
    //   identitas_tangki,
    //   keterangan,

    //   kota_id,
    //   nama_pengusaha,
    // } = this.state;

    // const payload = {
    //   idNppbkc: nppbkc_id,

    //   jenisLaporan: jenis_laporan_id,
    //   nomorPemberitahuan: nomor_pemberitahuan,
    //   tanggalPemberitahuan: tanggal_pemberitahuan,

    //   tanggalJamProduksiAwal: tanggal_jam_produksi_awal,
    //   tanggalJamProduksiAkhir: tanggal_jam_produksi_akhir,
    //   jumlahProduksi: jumlah_produksi,

    //   nomorDokumenProduksi: nomor_dokumen_produksi,
    //   tanggalDokumenProduksi: tanggal_dokumen_produksi,
    //   jumlahIsi: jumlah_isi,
    //   identitasTangki: identitas_tangki,
    //   keterangan: keterangan,

    //   idKota: kota_id,
    //   namaPengusaha: nama_pengusaha,
    // };

    // const response = await requestApi({
    //   service: "produksi",
    //   method: "post",
    //   endpoint: "/ck4/rekam-ea",
    //   body: payload,
    //   setLoading: (bool) => this.setState({ isRekamLoading: bool }),
    // });

    // if (response) {
    //   notification.success({ message: "Success", description: response.data.message });
    //   this.props.history.push(`${pathName}/laporan-ck4`);
    // }

    notification.success({ message: "Success", description: "Success" });
    this.props.history.push(`${pathName}/laporan-ck4`);
  };

  render() {
    return (
      <>
        <Container menuName="Laporan Produksi BKC CK4" contentName="EA Rekam" hideContentHeader>
          <Header>{this.state.subtitle1}</Header>
          <div
            className="kt-content  kt-grid__item kt-grid__item--fluid"
            id="kt_content"
            style={{ paddingBottom: 10 }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Data NPPBKC" style={{ height: 437 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nama</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input id="nama_nppbkc" value={this.state.nama_nppbkc} disabled />
                      <Button
                        type="default"
                        icon="menu"
                        onClick={() => this.handleModalShow("isModalDaftarNppbkcVisible")}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>NPPBKC</FormLabel>
                    </div>
                    <Input id="nppbkc" value={this.state.nppbkc} disabled />
                  </div>

                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Alamat</FormLabel>
                    </div>
                    <Input.TextArea
                      id="alamat_nppbkc"
                      value={this.state.alamat_nppbkc}
                      rows={4}
                      disabled
                    />
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Data Pemberitahuan" style={{ height: 437 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Laporan</FormLabel>
                    </div>
                    <Select
                      id="jenis_laporan"
                      value={this.state.jenis_laporan_id}
                      style={{ width: "100%" }}
                      disabled
                    >
                      <Select.Option value={this.state.jenis_laporan_id}>
                        {this.state.jenis_laporan_name}
                      </Select.Option>
                    </Select>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor Pemberitahuan</FormLabel>
                    </div>
                    <Input
                      id="nomor_pemberitahuan"
                      onChange={this.handleInputChange}
                      value={this.state.nomor_pemberitahuan}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Pemberitahuan</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_pemberitahuan"
                      onChange={(date) =>
                        this.handleDatepickerChange("tanggal_pemberitahuan", date)
                      }
                      value={this.state.tanggal_pemberitahuan}
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Barang Kena Cukai</FormLabel>
                    </div>
                    <Input disabled value={this.state.jenis_barang_kena_cukai} />
                  </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}></Col>
              <Col span={12}>
                <Card title="Dokumen Produksi">
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Jam Produksi Awal</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_jam_produksi_awal"
                      showTime={{ format: "HH:mm" }}
                      format="YYYY-MM-DD HH:mm"
                      onChange={(date) =>
                        this.handleDatepickerChange("tanggal_jam_produksi_awal", date)
                      }
                      value={this.state.tanggal_jam_produksi_awal}
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Jam Produksi Akhir</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_jam_produksi_akhir"
                      showTime={{ format: "HH:mm" }}
                      format="YYYY-MM-DD HH:mm"
                      onChange={(date) =>
                        this.handleDatepickerChange("tanggal_jam_produksi_akhir", date)
                      }
                      value={this.state.tanggal_jam_produksi_akhir}
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Produksi</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="jumlah_produksi"
                        onChange={(value) => this.handleInputNumberChange("jumlah_produksi", value)}
                        value={this.state.jumlah_produksi}
                        min={0}
                        style={{ flex: 1 }}
                      />
                      <div>Liter</div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>

          <Header>{this.state.subtitle2}</Header>
          <div
            className="kt-content  kt-grid__item kt-grid__item--fluid"
            id="kt_content"
            style={{ paddingBottom: 10 }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Data Produksi" style={{ height: 334 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor</FormLabel>
                    </div>
                    <Input
                      id="nomor_dokumen_produksi"
                      onChange={this.handleInputChange}
                      value={this.state.nomor_dokumen_produksi}
                      disabled={this.state.isRincianDisabled}
                    />
                  </div>

                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Produksi</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_dokumen_produksi"
                      onChange={(date) =>
                        this.handleDatepickerChange("tanggal_dokumen_produksi", date)
                      }
                      value={this.state.tanggal_dokumen_produksi}
                      style={{ width: "100%" }}
                      disabled={this.state.isRincianDisabled}
                    />
                  </div>
                </Card>
              </Col>

              <Col span={12}>
                <Card title="Nomor Tangki - Jumlah Liter - Keterangan" style={{ height: 334 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Isi</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="jumlah_isi"
                        onChange={(value) => this.handleInputChange("jumlah_isi", value)}
                        value={this.state.jumlah_isi}
                        style={{ flex: 1 }}
                        disabled={this.state.isRincianDisabled}
                      />
                      <div>Liter</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor / Identitas Tangki</FormLabel>
                    </div>
                    <Input
                      id="identitas_tangki"
                      onChange={this.handleInputChange}
                      value={this.state.identitas_tangki}
                      disabled={this.state.isRincianDisabled}
                    />
                  </div>

                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Keterangan</FormLabel>
                    </div>
                    <Input
                      id="keterangan"
                      onChange={this.handleInputChange}
                      value={this.state.keterangan}
                      disabled={this.state.isRincianDisabled}
                    />
                  </div>
                </Card>
              </Col>
            </Row>

            <Row style={{ marginTop: 20 }}>
              <Col span={8} offset={16}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Button
                      type="primary"
                      onClick={this.handleSimpanRincian}
                      block
                      disabled={this.state.isRincianDisabled}
                    >
                      Simpan Rincian
                    </Button>
                  </Col>

                  <Col span={12}>
                    <Button
                      type="danger"
                      onClick={this.handleBatal}
                      block
                      disabled={!this.state.isRincianDisabled}
                    >
                      Batal
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <Header>{this.state.subtitle3}</Header>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Dibuat di Kota/Kabupaten</FormLabel>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Input id="kota_name" value={this.state.kota_name} disabled />
                    <Button
                      type="default"
                      icon="menu"
                      onClick={() => this.handleModalShow("isModalDaftarKotaVisible")}
                    />
                  </div>
                </div>

                <div>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Nama Pengusaha</FormLabel>
                  </div>
                  <Input
                    id="nama_pengusaha"
                    onChange={this.handleInputChange}
                    value={this.state.nama_pengusaha}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={4} offset={20}>
                <Button type="primary" block onClick={this.handleRekam}>
                  Rekam
                </Button>
              </Col>
            </Row>
          </div>
        </Container>

        <ModalDaftarNPPBKC
          isVisible={this.state.isModalDaftarNppbkcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarNppbkcVisible")}
          onDataDoubleClick={this.handleDataNppbkc}
        />

        <ModalDaftarKota
          isVisible={this.state.isModalDaftarKotaVisible}
          onCancel={() => this.handleModalClose("isModalDaftarKotaVisible")}
          onDataDoubleClick={this.handleDataKota}
        />
      </>
    );
  }
}
