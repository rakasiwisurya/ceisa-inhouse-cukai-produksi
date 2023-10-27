import { Button, Col, DatePicker, Input, InputNumber, Row, Select, notification } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import ModalDaftarKota from "components/ModalDaftarKota";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { capitalize } from "utils/formatter";
import { requestApi } from "utils/requestApi";

export default class PencabutanTarifCabut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pabrik / Importir",
      subtitle2: "Detail Merk",
      subtitle3: "Pencabutan",

      isDetailLoading: true,
      isCabutLoading: false,

      isModalDaftarKotaVisible: false,

      idNppbkc: null,
      nppbkc: null,
      namaNppbkc: null,
      npwpNppbkc: null,
      alamatNppbkc: null,

      idMerk: null,
      namaMerk: null,
      nomorKep: null,
      tanggalKep: null,
      jenisProduksi: null,
      seriPita: null,
      tarif: null,
      hje: null,
      isi: null,
      berat: null,
      awalBerlaku: null,
      tanggalPesanAkhir: null,

      nomorPermohonan: null,
      tanggalPermohonan: null,
      idKota: null,
      namaKota: null,
      tanggalKepPencabutan: null,
      akhirBerlaku: null,
      keteranganPencabutan: null,
      idAsalMerk: null,
      namaAsalMerk: null,

      listAsalMerk: [
        {
          idAsalMerk: "PENETAPAN TARIF CUKAI HASIL TEMBAKAU UNTUK MERK BARU",
          namaAsalMerk: "PENETAPAN TARIF CUKAI HASIL TEMBAKAU UNTUK MERK BARU",
        },
        {
          idAsalMerk: "PENETAPAN PENYESUAIAN TARIF CUKAI HASIL TEMBAKAU",
          namaAsalMerk: "PENETAPAN PENYESUAIAN TARIF CUKAI HASIL TEMBAKAU",
        },
      ],
    };
  }

  componentDidMount() {
    this.getDetailPencabutanTarif();
  }

  getDetailPencabutanTarif = async () => {
    const payload = { idTarifMerkHeader: this.props.match.params.id };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/pita-cukai/browse-detail-pencabutan",
      params: payload,
      setLoading: (bool) => this.setState({ isDetailLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState({
        idNppbkc: data.idNppbkc,
        nppbkc: data.nppbkc,
        namaNppbkc: data.namaPerusahaan,
        npwpNppbkc: data.npwp,
        alamatNppbkc: data.alamatPerusahaan,

        idMerk: data.idMerk,
        namaMerk: data.namaMerk,
        nomorKep: data.nomorSkep,
        tanggalKep: moment(data.tanggalSkep),
        jenisProduksi: data.namaJenisProduksiBkc,
        seriPita: data.seriPita,
        tarif: data.tarifSpesifik,
        hje: data.hje,
        isi: data.isiKemasan,
        berat: data.beratVolume,
        awalBerlaku: moment(data.awalBerlaku),
        tanggalPesanAkhir: moment(data.tanggalPesanAkhir),
      });
    }
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value.toUpperCase() });
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
  handleSelectCustomChange = (field, value, option) => {
    this.setState({
      [`id${capitalize(field, false)}`]: value,
      [`nama${capitalize(field, false)}`]: option.props.children,
    });
  };

  handleModalShow = (visibleState) => {
    this.setState({ [visibleState]: true });
  };
  handleModalClose = (visibleState) => {
    this.setState({ [visibleState]: false });
  };

  handleDataKota = (record) => {
    this.setState({
      idKota: record.kota_id,
      namaKota: record.kota_name,
    });
    this.handleModalClose("isModalDaftarKotaVisible");
  };

  handleCabut = async () => {
    const {
      nomorPermohonan,
      tanggalPermohonan,
      namaKota,
      tanggalKepPencabutan,
      akhirBerlaku,
      keteranganPencabutan,
    } = this.state;

    const payload = {
      idTarifMerkHeader: this.props.match.params.id,
      nomorPermohonanCabut: nomorPermohonan,
      tanggalPermohonanCabut: tanggalPermohonan,
      kotaPermohonanCabut: namaKota,
      tanggalSkepCabut: tanggalKepPencabutan,
      akhirBerlaku: akhirBerlaku,
      keteranganCabut: keteranganPencabutan,
    };

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: "/pita-cukai/pencabutan-tarif",
      body: payload,
      setLoading: (bool) => this.setState({ isCabutLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: "Success" });
      this.props.history.push(`${pathName}/pencabutan-tarif`);
    }
  };

  render() {
    return (
      <>
        <Container menuName="Tarif Cukai" contentName="Pencabutan Tarif" hideContentHeader>
          {this.state.isDetailLoading ? (
            <LoadingWrapperSkeleton />
          ) : (
            <>
              <Header>{this.state.subtitle1}</Header>
              <div
                className="kt-content  kt-grid__item kt-grid__item--fluid"
                id="kt_content"
                style={{ paddingBottom: 10 }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>NPPBKC</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input id="nppbkc" value={this.state.nppbkc} disabled />
                      <Input id="namaPerusahaan" value={this.state.namaNppbkc} disabled />
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>NPWP</FormLabel>
                    </div>
                    <Input id="npwpNppbkc" value={this.state.npwpNppbkc} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Alamat</FormLabel>
                    </div>
                    <Input.TextArea id="alamatNppbkc" value={this.state.alamatNppbkc} disabled />
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
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nama Merk</FormLabel>
                    </div>
                    <Input id="namaMerk" value={this.state.namaMerk} disabled />
                  </Col>
                </Row>

                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor KEP</FormLabel>
                    </div>
                    <Input id="nomorKep" value={this.state.nomorKep} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal KEP</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggalKep"
                      format="DD-MM-YYYY"
                      value={this.state.tanggalKep}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Produksi</FormLabel>
                    </div>
                    <Input id="jenisProduksi" value={this.state.jenisProduksi} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Seri Pita</FormLabel>
                    </div>
                    <InputNumber
                      id="seriPita"
                      value={this.state.seriPita}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif Spesifik</FormLabel>
                    </div>
                    <InputNumber
                      id="tarif"
                      value={this.state.tarif}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>HJE</FormLabel>
                    </div>
                    <InputNumber
                      id="hje"
                      value={this.state.hje}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Isi Kemasan</FormLabel>
                    </div>
                    <InputNumber
                      id="isi"
                      value={this.state.isi}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Berat / Volume</FormLabel>
                    </div>
                    <InputNumber
                      id="berat"
                      value={this.state.berat}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Awal Berlaku</FormLabel>
                    </div>
                    <DatePicker
                      id="awalBerlaku"
                      format="DD-MM-YYYY"
                      value={this.state.awalBerlaku}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Pesan Akhir</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggalPesanAkhir"
                      format="DD-MM-YYYY"
                      value={this.state.tanggalPesanAkhir}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>
                </Row>
              </div>

              <Header>{this.state.subtitle3}</Header>
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor Permohonan</FormLabel>
                    </div>
                    <Input
                      id="nomorPermohonan"
                      onChange={this.handleInputChange}
                      value={this.state.nomorPermohonan}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Permohonan</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggalPermohonan"
                      format="DD-MM-YYYY"
                      value={this.state.tanggalPermohonan}
                      onChange={(date) => this.handleDatepickerChange("tanggalPermohonan", date)}
                      style={{ width: "100%" }}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Lokasi Pencabutan</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input id="namaKota" value={this.state.namaKota} disabled />
                      <Button
                        type="default"
                        icon="menu"
                        onClick={() => this.handleModalShow("isModalDaftarKotaVisible")}
                      />
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal KEP Pencabutan</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggalKepPencabutan"
                      format="DD-MM-YYYY"
                      value={this.state.tanggalKepPencabutan}
                      onChange={(date) => this.handleDatepickerChange("tanggalKepPencabutan", date)}
                      style={{ width: "100%" }}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Akhir Berlaku</FormLabel>
                    </div>
                    <DatePicker
                      id="akhirBerlaku"
                      format="DD-MM-YYYY"
                      value={this.state.akhirBerlaku}
                      onChange={(date) => this.handleDatepickerChange("akhirBerlaku", date)}
                      style={{ width: "100%" }}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Asal Merk</FormLabel>
                    </div>
                    <Select
                      id="asalMerk"
                      value={this.state.idAsalMerk}
                      onChange={(value, option) => {
                        this.handleSelectCustomChange("asalMerk", value, option);
                      }}
                      style={{ width: "100%" }}
                    >
                      {this.state.listAsalMerk.length > 0 &&
                        this.state.listAsalMerk.map((item, index) => (
                          <Select.Option key={`asalMerk-${index}`} value={item.idAsalMerk}>
                            {item.namaAsalMerk}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Keterangan Pencabutan</FormLabel>
                    </div>
                    <Input.TextArea
                      id="keteranganPencabutan"
                      onChange={this.handleInputChange}
                      value={this.state.keteranganPencabutan}
                    />
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

                  <Col span={5}>
                    <Button
                      type="danger"
                      loading={this.state.isCabutLoading}
                      onClick={this.handleCabut}
                      block
                    >
                      Simpan Pencabutan
                    </Button>
                  </Col>
                </Row>
              </div>
            </>
          )}
        </Container>

        <ModalDaftarKota
          isVisible={this.state.isModalDaftarKotaVisible}
          onCancel={() => this.handleModalClose("isModalDaftarKotaVisible")}
          onDataDoubleClick={this.handleDataKota}
        />
      </>
    );
  }
}
