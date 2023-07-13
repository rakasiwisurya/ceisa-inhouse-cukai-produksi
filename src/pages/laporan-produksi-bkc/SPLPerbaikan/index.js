import { Button, Card, Col, DatePicker, Input, Row, notification } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import React, { Component } from "react";
import ModalDaftarNPPBKC from "../ModalDaftarNPPBKC";
import ModalDaftarKota from "../ModalDaftarKota";
import { pathName } from "configs/constants";
import moment from "moment";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";

export default class SPLPerbaikan extends Component {
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

  componentDidMount() {
    this.getSplDetail();
  }

  getSplDetail = async () => {
    this.setState({ isDetailLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        nomor_spl: "nomor_spl",
        tanggal_spl: moment(new Date()),
        nama_pengusaha: "nama_pengusaha",
        jabatan: "jabatan",
        alamat_pemohon: "alamat_pemohon",

        nppbkc_id: "fe3c9198-0d65-05e6-e054-0021f60abd54",
        nama_nppbkc: "KOPERASI BERLIAN EMAS SEJAHTERA TERUS",
        nppbkc: "0866114705044000070652",
        alamat_nppbkc:
          "Pergudangan TANRISE K-Walk B-9 Dusun Karanglo Desa Banjar Arum Kecamatan Singosari Kabupaten Malang",

        tanggal_libur_awal: moment(new Date()),
        tanggal_libur_akhir: moment(new Date()),
        pernyataan_tanggal: moment(new Date()),
        pernyataan_kota_id: "285",
        pernyataan_kota_name: "SUMBAWA BARAT",
      });
      this.setState({ isDetailLoading: false });
      clearTimeout(timeout);
    }, 2000);
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
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
      pernyataan_kota_id: record.kota_id,
      pernyataan_kota_name: record.kota_name,
    });
    this.handleModalClose("isModalDaftarKotaVisible");
  };

  validationForm = () => {
    const {
      nomor_spl,
      tanggal_spl,
      nama_pengusaha,
      jabatan,
      alamat_pemohon,

      nppbkc_id,
      nama_nppbkc,
      nppbkc,
      alamat_nppbkc,

      tanggal_libur_awal,
      tanggal_libur_akhir,
      pernyataan_tanggal,
      pernyataan_kota_id,
      pernyataan_kota_name,
    } = this.state;

    if (
      !nomor_spl ||
      !tanggal_spl ||
      !nama_pengusaha ||
      !jabatan ||
      !alamat_pemohon ||
      !nppbkc_id ||
      !nama_nppbkc ||
      !nppbkc ||
      !alamat_nppbkc ||
      !tanggal_libur_awal ||
      !tanggal_libur_akhir ||
      !pernyataan_tanggal ||
      !pernyataan_kota_id ||
      !pernyataan_kota_name
    ) {
      return false;
    }

    return true;
  };

  handleUpdate = () => {
    // const {
    //   nomor_spl,
    //   tanggal_spl,
    //   nama_pengusaha,
    //   jabatan,
    //   alamat_pemohon,

    //   nppbkc_id,
    //   nama_nppbkc,
    //   nppbkc,
    //   alamat_nppbkc,

    //   tanggal_libur_awal,
    //   tanggal_libur_akhir,
    //   pernyataan_tanggal,
    //   pernyataan_kota_id,
    //   pernyataan_kota_name,
    // } = this.state;

    this.setState({ isUpdateLoading: true });
    const timeout = setTimeout(() => {
      notification.success({ message: "Success", description: "Success" });
      this.setState({ isUpdateLoading: false });
      this.props.history.push(`${pathName}/spl`);
      clearTimeout(timeout);
    }, 2000);
  };

  render() {
    return (
      <>
        <Container menuName="Laporan Produksi BKC" contentName="SPL Perbaikan" hideContentHeader>
          {this.state.isDetailLoading ? (
            <LoadingWrapperSkeleton />
          ) : (
            <>
              <Header>{this.state.subtitle1}</Header>
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                <Row gutter={[20, 20]}>
                  <Col span={12}>
                    <Card title={this.state.card_title_1} style={{ height: 563 }}>
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Nomor SPL</FormLabel>
                        </div>
                        <Input
                          id="nomor_spl"
                          onChange={this.handleInputChange}
                          value={this.state.nomor_spl}
                        />
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tanggal SPL</FormLabel>
                        </div>
                        <DatePicker
                          id="tanggal_spl"
                          format="DD-MM-YYYY"
                          value={this.state.tanggal_spl}
                          onChange={(date) => this.handleDatepickerChange("tanggal_spl", date)}
                          style={{ width: "100%" }}
                        />
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Nama Pengusaha</FormLabel>
                        </div>
                        <Input
                          id="nama_pengusaha"
                          onChange={this.handleInputChange}
                          value={this.state.nama_pengusaha}
                        />
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jabatan</FormLabel>
                        </div>
                        <Input
                          id="jabatan"
                          onChange={this.handleInputChange}
                          value={this.state.jabatan}
                        />
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Alamat</FormLabel>
                        </div>
                        <Input.TextArea
                          id="alamat_pemohon"
                          onChange={this.handleInputChange}
                          value={this.state.alamat_pemohon}
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

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Alamat</FormLabel>
                        </div>
                        <Input.TextArea
                          id="alamat_nppbkc"
                          value={this.state.alamat_nppbkc}
                          disabled
                        />
                      </div>
                    </Card>
                  </Col>
                </Row>

                <Row gutter={[20, 20]}>
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
                            onChange={(date) =>
                              this.handleDatepickerChange("tanggal_libur_awal", date)
                            }
                            style={{ width: "100%" }}
                          />
                          <div>s.d</div>
                          <DatePicker
                            id="tanggal_libur_akhir"
                            format="DD-MM-YYYY"
                            value={this.state.tanggal_libur_akhir}
                            onChange={(date) =>
                              this.handleDatepickerChange("tanggal_libur_akhir", date)
                            }
                            style={{ width: "100%" }}
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
                            onChange={(date) =>
                              this.handleDatepickerChange("pernyataan_tanggal", date)
                            }
                          />
                          <div>,</div>
                          <div style={{ display: "flex", gap: 10 }}>
                            <Input
                              id="pernyataan_kota_name"
                              value={this.state.pernyataan_kota_name}
                              disabled
                            />
                            <Button
                              type="default"
                              icon="menu"
                              onClick={() => this.handleModalShow("isModalDaftarKotaVisible")}
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>

                <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
                  <Col span={4}>
                    <ButtonCustom
                      variant="secondary"
                      onClick={() => this.props.history.goBack()}
                      block
                    >
                      Kembali
                    </ButtonCustom>
                  </Col>

                  <Col span={4}>
                    <Button
                      type="primary"
                      loading={this.state.isUpdateLoading}
                      onClick={this.handleUpdate}
                      disabled={!this.validationForm()}
                      block
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </div>
            </>
          )}
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
