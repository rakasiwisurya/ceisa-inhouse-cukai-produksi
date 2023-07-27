import { Button, Col, DatePicker, Input, InputNumber, Row, Select, notification } from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import { pathName } from "configs/constants";
import React, { Component } from "react";
import ModalDaftarKota from "../ModalDaftarKota";
import ButtonCustom from "components/Button/ButtonCustom";
import { requestApi } from "utils/requestApi";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import moment from "moment";

export default class PencabutanTarifCabut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pabrik / Importir",
      subtitle2: "Detail Merk",
      subtitle3: "Pencabutan",

      isDetailLoading: true,
      isCabutLoading: false,
      isModalDaftarNppbkcVisible: false,
      isModalDaftarMerkVisible: false,
      isModalDaftarKotaVisible: false,

      nppbkc_id: null,
      nppbkc: null,
      nama_nppbkc: null,
      npwp_nppbkc: null,
      alamat_nppbkc: null,

      id_merk: null,
      nama_merk: null,
      nomor_kep: null,
      tanggal_kep: null,
      jenis_produksi: null,
      seri_pita: null,
      tarif: null,
      hje: null,
      isi: null,
      berat: null,
      awal_berlaku: null,
      tanggal_pesan_akhir: null,

      nomor_permohonan: null,
      tanggal_permohonan: null,
      kota_id: null,
      kota_name: null,
      tanggal_kep_pencabutan: null,
      akhir_berlaku: null,
      keterangan_pencabutan: null,
      asal_merk_id: null,
      asal_merk_name: null,

      list_kota: [],
      list_asal_merk: [
        {
          asal_merk_id: "PENETAPAN TARIF CUKAI HASIL TEMBAKAU UNTUK MERK BARU",
          asal_merk_name: "Penetapan Tarif Cukai Hasil Tembakau Untuk Merk Baru",
        },
        {
          asal_merk_id: "PENETAPAN PENYESUAIAN TARIF CUKAI HASIL TEMBAKAU",
          asal_merk_name: "Penetapan Penyesuaian Tarif Cukai Hasil Tembakau",
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
        nppbkc_id: data.idNppbkc,
        nppbkc: data.nppbkc,
        nama_nppbkc: data.namaPerusahaan,
        npwp_nppbkc: data.npwp,
        alamat_nppbkc: data.alamatPerusahaan,

        id_merk: data.idMerk,
        nama_merk: data.namaMerk,
        nomor_kep: data.nomorSkep,
        tanggal_kep: moment(data.tanggalSkep),
        jenis_produksi: data.namaJenisProduksiBkc,
        seri_pita: data.seriPita,
        tarif: data.tarifSpesifik,
        hje: data.hje,
        isi: data.isiKemasan,
        berat: data.beratVolume,
        awal_berlaku: moment(data.awalBerlaku),
        tanggal_pesan_akhir: moment(data.tanggalPesanAkhir),
      });
    }
  };

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
  handleSelectCustomChange = (field, value, option) => {
    this.setState({
      [`${field}_id`]: value,
      [`${field}_name`]: option.props.children,
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
      kota_id: record.kota_id,
      kota_name: record.kota_name,
    });
    this.handleModalClose("isModalDaftarKotaVisible");
  };

  validationForm = () => {
    const {
      nomor_permohonan,
      tanggal_permohonan,
      kota_id,
      kota_name,
      tanggal_kep_pencabutan,
      akhir_berlaku,
      keterangan_pencabutan,
      asal_merk_id,
      asal_merk_name,
    } = this.state;

    if (
      !nomor_permohonan ||
      !tanggal_permohonan ||
      !kota_id ||
      !kota_name ||
      !tanggal_kep_pencabutan ||
      !akhir_berlaku ||
      !keterangan_pencabutan ||
      !asal_merk_id ||
      !asal_merk_name
    ) {
      return false;
    }

    return true;
  };

  handleCabut = async () => {
    const {
      nomor_permohonan,
      tanggal_permohonan,
      kota_name,
      tanggal_kep_pencabutan,
      akhir_berlaku,
      keterangan_pencabutan,
    } = this.state;

    const payload = {
      idTarifMerkHeader: this.props.match.params.id,
      nomorPermohonanCabut: nomor_permohonan,
      tanggalPermohonanCabut: tanggal_permohonan,
      kotaPermohonanCabut: kota_name,
      tanggalSkepCabut: tanggal_kep_pencabutan,
      akhirBerlaku: akhir_berlaku,
      keteranganCabut: keterangan_pencabutan,
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
                      <Input id="nama_perusahaan" value={this.state.nama_nppbkc} disabled />
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>NPWP</FormLabel>
                    </div>
                    <Input id="npwp_nppbkc" value={this.state.npwp_nppbkc} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Alamat</FormLabel>
                    </div>
                    <Input.TextArea id="alamat_nppbkc" value={this.state.alamat_nppbkc} disabled />
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
                    <Input id="nama_merk" value={this.state.nama_merk} disabled />
                  </Col>
                </Row>

                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor KEP</FormLabel>
                    </div>
                    <Input id="nomor_kep" value={this.state.nomor_kep} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal KEP</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_kep"
                      format="DD-MM-YYYY"
                      value={this.state.tanggal_kep}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Produksi</FormLabel>
                    </div>
                    <Input id="jenis_produksi" value={this.state.jenis_produksi} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Seri Pita</FormLabel>
                    </div>
                    <InputNumber
                      id="seri_pita"
                      value={this.state.seri_pita}
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
                      id="awal_berlaku"
                      format="DD-MM-YYYY"
                      value={this.state.awal_berlaku}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Pesan Akhir</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_pesan_akhir"
                      format="DD-MM-YYYY"
                      value={this.state.tanggal_pesan_akhir}
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
                      id="nomor_permohonan"
                      onChange={this.handleInputChange}
                      value={this.state.nomor_permohonan}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Permohonan</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_permohonan"
                      format="DD-MM-YYYY"
                      value={this.state.tanggal_permohonan}
                      onChange={(date) => this.handleDatepickerChange("tanggal_permohonan", date)}
                      style={{ width: "100%" }}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Lokasi Pencabutan</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input id="kota_name" value={this.state.kota_name} disabled />
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
                      id="tanggal_kep_pencabutan"
                      format="DD-MM-YYYY"
                      value={this.state.tanggal_kep_pencabutan}
                      onChange={(date) =>
                        this.handleDatepickerChange("tanggal_kep_pencabutan", date)
                      }
                      style={{ width: "100%" }}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Akhir Berlaku</FormLabel>
                    </div>
                    <DatePicker
                      id="akhir_berlaku"
                      format="DD-MM-YYYY"
                      value={this.state.akhir_berlaku}
                      onChange={(date) => this.handleDatepickerChange("akhir_berlaku", date)}
                      style={{ width: "100%" }}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Asal Merk</FormLabel>
                    </div>
                    <Select
                      id="asal_merk"
                      value={this.state.asal_merk_id}
                      onChange={(value, option) => {
                        this.handleSelectCustomChange("asal_merk", value, option);
                      }}
                      style={{ width: "100%" }}
                    >
                      {this.state.list_asal_merk.length > 0 &&
                        this.state.list_asal_merk.map((item, index) => (
                          <Select.Option key={`asal-merk-${index}`} value={item.asal_merk_id}>
                            {item.asal_merk_name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Keterangan Pencabutan</FormLabel>
                    </div>
                    <Input.TextArea
                      id="keterangan_pencabutan"
                      onChange={this.handleInputChange}
                      value={this.state.keterangan_pencabutan}
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
                      disabled={!this.validationForm()}
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
