import { Button, Card, Col, DatePicker, Input, InputNumber, Row, Select, notification } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import { baseUrlCeisaInhouse, endpoints } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";
import { getTokenPayload } from "utils/jwt";
import ModalDaftarPenjabatBc from "components/ModalDaftarPenjabatBc";
import { download } from "utils/files";

export default class RekamJenisPitaTaskToDoPembatalan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Permohonan",
      subtitle2: "Dokumen Pembatalan",
      subtitle3: "Dasar Pembatalan",

      isDetailLoading: true,
      isSimpanTaskToDoLoading: false,
      isDownloadLoading: false,
      isJenisProduksiLoading: true,
      isTarifLoading: false,
      isWarnaLoading: false,
      isModalDaftarNppbkcVisible: false,
      isModalDaftarPenjabatBcVisible: false,

      tokenData: null,
      kodeKantor: null,
      namaKantor: null,

      idNppbkc: null,
      nppbkc: null,
      namaNppbkc: null,
      idJenisBkc: null,
      personalNppbkc: null,

      idJenisProduksiBkc: null,
      namaJenisProduksiBkc: null,
      hje: null,
      isiKemasan: null,
      tarif: null,
      awalBerlaku: null,
      warna: null,
      kodeWarna: null,
      idSeriPita: null,
      namaSeriPita: null,
      tahunPita: String(new Date().getFullYear()),

      kodeUploadDokumen: null,

      tasktodoStatus: "SETUJU",
      nomorPembatalan: null,
      tanggalPembatalan: null,
      nipPenjabatBc: null,
      namaPenjabatBc: null,
      keterangan: null,

      listJenisProduksiBkc: [],
      listSeriPita: [],
      listStatus: [
        {
          idStatus: "SETUJU",
          namaStatus: "SETUJU",
        },
        {
          idStatus: "TOLAK",
          namaStatus: "TOLAK",
        },
      ],
    };
  }

  componentDidMount() {
    this.getToken();
    this.getDetailRekamJenisPita();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.idNppbkc !== this.state.idNppbkc) {
      this.getJenisProduksi();
    }

    if (prevState.idJenisBkc !== this.state.idJenisBkc) {
      this.getSeripita();

      if (this.state.idJenisBkc === 2) {
        this.setState({ hje: 0 });
      }
    }

    if (
      prevState.listSeriPita?.length !== this.state.listSeriPita?.length ||
      prevState.idJenisBkc !== this.state.idJenisBkc
    ) {
      if (this.state.idJenisBkc === 2 && this.state.listSeriPita?.length > 0)
        this.setState({
          idSeriPita: this.state.listSeriPita[0]?.idSeripita,
          namaSeriPita: this.state.listSeriPita[0]?.namaSeripita,
        });
    }

    if (
      prevState.idJenisProduksiBkc !== this.state.idJenisProduksiBkc ||
      prevState.hje !== this.state.hje
    ) {
      this.setState({ tarif: null, warna: null });
    }
  }

  getToken = async () => {
    try {
      const tokenData = await getTokenPayload();
      this.setState({ tokenData });
    } catch (error) {
      notification.error({
        message: "Failed",
        description: "There's something error with token data",
      });
    }
  };

  getDetailRekamJenisPita = async () => {
    const payload = { idProses: this.props.match.params.id };

    const response = await requestApi({
      service: "pita_cukai",
      method: "get",
      endpoint: endpoints.jenisPitaDetailTasktodo,
      params: payload,
      setLoading: (bool) => this.setState({ isDetailLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState({
        idNppbkc: data.idNppbkc,
        nppbkc: data.nppbkc,
        namaNppbkc: data.namaPerusahaan,
        idJenisBkc: data.idJenisBkc,
        personalNppbkc: data.personalisasi,

        idJenisProduksiBkc: `${data.idJenisProduksiBkc}-${data.idGolonganBkc}-${data.kodeSatuan}`,
        namaJenisProduksiBkc: `${data.kodeJenisProduksiBkc} - ${data.namaGolonganBkc}`,
        hje: data.hje || 0,
        isiKemasan: data.isiVolume,
        tarif: data.tarif,
        awalBerlaku: moment(data.awalBerlaku),
        warna: data.warna,
        kodeWarna: data.kodeWarna,
        tahunPita: data.tahunPita,
        idSeriPita: data.idSeripita,
        namaSeriPita: data.namaSeripita,
        kodeKantor: data.kodeKantor,
        namaKantor: data.namaKantor,
        kodeUploadDokumen: data.kodeUploadDokumen,
      });

      this.setState({
        tarif: data.tarif,
        warna: data.warna,
        kodeWarna: data.kodeWarna,
      });
    }
  };
  getJenisProduksi = async () => {
    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: endpoints.listJenisProduksiByNppbkc,
      params: { idNppbkc: this.state.idNppbkc },
      setLoading: (bool) => this.setState({ isJenisProduksiLoading: bool }),
    });

    if (response) this.setState({ listJenisProduksiBkc: response.data.data });
  };
  getTarifWarna = () => {
    this.getTarif();
    this.getWarna();
  };
  getTarif = async () => {
    const payload = {
      kodeJenisProduksiBkc: this.state.namaJenisProduksiBkc.split("-")[0].trim(),
      idGolonganBkc: this.state.idJenisProduksiBkc.split("-")[1],
    };

    if (this.state.idJenisBkc === 3) payload.hje = this.state.hje;

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: endpoints.listTarifByJenisProduksiGolonganHje,
      params: payload,
      setLoading: (bool) => this.setState({ isTarifLoading: bool }),
    });

    if (response) {
      this.setState({ tarif: response.data.data?.tarif });
    }
  };
  getWarna = async () => {
    const payload = {
      kodeJenisProduksiBkc: this.state.namaJenisProduksiBkc.split("-")[0].trim(),
      idGolonganBkc: this.state.idJenisProduksiBkc.split("-")[1],
    };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: endpoints.listWarnaByJenisProduksiGolongan,
      params: payload,
      setLoading: (bool) => this.setState({ isWarnaLoading: bool }),
    });

    if (response) {
      this.setState({
        warna: response.data.data.warna,
        kodeWarna: response.data.data?.kodeWarna,
      });
    }
  };
  getSeripita = async () => {
    const payload = { idJenisBkc: this.state.idJenisBkc };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: endpoints.listSeriPita,
      params: payload,
      setLoading: (bool) => this.setState({ isSeripitaLoading: bool }),
    });

    if (response) this.setState({ listSeriPita: response.data.data });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value.toUpperCase() });
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

  handleDataPenjabatBc = (record) => {
    this.setState({
      nipPenjabatBc: record.nipPenjabatBc,
      namaPenjabatBc: record.namaPenjabatBc,
    });
    this.handleModalClose("isModalDaftarPenjabatBcVisible");
  };
  handleDownload = async () => {
    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: `${endpoints.s3Download}/${this.state.kodeUploadDokumen}`,
      setLoading: (bool) => this.setState({ isDownloadLoading: bool }),
      config: { responseType: "blob" },
    });

    if (response) download(response.data, `${new Date().getTime()}`);
  };

  handleSimpanTaskToDo = async () => {
    const {
      tasktodoStatus,
      nomorPembatalan,
      tanggalPembatalan,
      nipPenjabatBc,
      namaPenjabatBc,
      keterangan,
    } = this.state;

    const payload = {
      idProses: this.props.match.params.id,
      status: tasktodoStatus,
      nomorPembatalan: nomorPembatalan,
      tanggalPembatalan: tanggalPembatalan,
      nipPenjabatBc: nipPenjabatBc,
      namaPenjabatBc: namaPenjabatBc,
      keterangan: keterangan,
    };

    const response = await requestApi({
      service: "pita_cukai",
      method: "post",
      endpoint: endpoints.jenisPitaPembatalanTasktodo,
      body: payload,
      setLoading: (bool) => this.setState({ isSimpanTaskToDoLoading: bool }),
    });

    if (response) {
      notification.success({
        message: "Success",
        description: response.data.message,
      });
      const timeout = setTimeout(() => {
        window.location.href = `${baseUrlCeisaInhouse}/tasktodo`;
        clearTimeout(timeout);
      }, 1000);
    }
  };

  render() {
    if (this.state.isDetailLoading) return <LoadingWrapperSkeleton />;

    return (
      <>
        <Container menuName="Task To Do" contentName="Jenis Pita Task To Do Pembatalan">
          <Card title={this.state.subtitle1} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>NPPBKC</FormLabel>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Input id="nppbkc" value={this.state.nppbkc} disabled />
                  <Input id="namaNppbkc" value={this.state.namaNppbkc} disabled />
                </div>
              </Col>
            </Row>

            {this.state.idNppbkc && (
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Jenis Produksi</FormLabel>
                  </div>
                  <Select
                    id="jenisProduksiBkc"
                    value={this.state.idJenisProduksiBkc}
                    loading={this.state.isJenisProduksiLoading}
                    style={{ width: "100%" }}
                    disabled
                  >
                    {this.state.listJenisProduksiBkc.length > 0 &&
                      this.state.listJenisProduksiBkc.map((item, index) => (
                        <Select.Option
                          key={`jenisProduksiBkc-${index}`}
                          value={`${item.idJenisProduksiBkc}-${item.idGolonganBkc}-${item.kodeSatuan}`}
                        >
                          {`${item.kodeJenisProduksi} - ${item.namaGolonganBkc}`}
                        </Select.Option>
                      ))}
                  </Select>
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>HJE</FormLabel>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <InputNumber
                      id="hje"
                      value={this.state.hje}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </div>
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Isi Per Kemasan</FormLabel>
                  </div>

                  <InputNumber
                    id="isiKemasan"
                    value={this.state.isiKemasan}
                    style={{ width: "100%" }}
                    disabled
                  />
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Tarif Cukai</FormLabel>
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
                    <FormLabel>Awal Berlaku</FormLabel>
                  </div>
                  <DatePicker
                    id="warna"
                    format="DD-MM-YYYY"
                    value={this.state.awalBerlaku}
                    style={{ width: "100%" }}
                    disabled
                  />
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Warna</FormLabel>
                  </div>
                  <Input id="warna" value={this.state.warna} style={{ width: "100%" }} disabled />
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Seri Pita</FormLabel>
                  </div>
                  <Select
                    id="seriPita"
                    value={this.state.idSeriPita}
                    loading={this.state.isSeripitaLoading}
                    style={{ width: "100%" }}
                    disabled
                  >
                    {this.state.listSeriPita.length > 0 &&
                      this.state.listSeriPita.map((item, index) => (
                        <Select.Option key={`seriPita-${index}`} value={item.idSeripita}>
                          {item.namaSeripita}
                        </Select.Option>
                      ))}
                  </Select>
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Tahun Pita</FormLabel>
                  </div>
                  <Input
                    id="tahunPita"
                    value={this.state.tahunPita}
                    style={{ width: "100%" }}
                    disabled
                  />
                </Col>
              </Row>
            )}
          </Card>

          <Card title={this.state.subtitle2} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Dokumen Pembatalan</FormLabel>
                </div>
                <Button
                  type="primary"
                  loading={this.state.isDownloadLoading}
                  onClick={this.handleDownload}
                  disabled={!this.state.kodeUploadDokumen}
                >
                  Download
                </Button>
              </Col>
            </Row>
          </Card>

          <Card title={this.state.subtitle3}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Persetujuan</FormLabel>
                </div>
                <Select
                  id="tasktodoStatus"
                  onChange={(value) => this.handleSelectChange("tasktodoStatus", value)}
                  value={this.state.tasktodoStatus}
                  style={{ width: "100%" }}
                >
                  {this.state.listStatus.length > 0 &&
                    this.state.listStatus.map((item, index) => (
                      <Select.Option key={`tasktodoStatus-${index}`} value={item.idStatus}>
                        {item.namaStatus}
                      </Select.Option>
                    ))}
                </Select>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Nomor Pembatalan</FormLabel>
                </div>
                <Input
                  id="nomorPembatalan"
                  onChange={this.handleInputChange}
                  value={this.state.nomorPembatalan}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Pembatalan</FormLabel>
                </div>
                <DatePicker
                  id="tanggalPembatalan"
                  format="DD-MM-YYYY"
                  value={this.state.tanggalPembatalan}
                  style={{ width: "100%" }}
                  onChange={(date) => this.handleDatepickerChange("tanggalPembatalan", date)}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Penjabat BC</FormLabel>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Input
                    id="nipPenjabatBc"
                    onChange={this.handleInputChange}
                    value={this.state.nipPenjabatBc}
                    style={{ flex: 1 }}
                    disabled
                  />
                  <Button
                    type="primary"
                    onClick={() => this.handleModalShow("isModalDaftarPenjabatBcVisible")}
                  >
                    Cari
                  </Button>
                  <Input
                    id="namaPenjabatBc"
                    onChange={this.handleInputChange}
                    value={this.state.namaPenjabatBc}
                    style={{ flex: 2 }}
                    disabled
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>
                    {this.state.tasktodoStatus === "SETUJU" ? "Keterangan" : "Alasan"}
                  </FormLabel>
                </div>
                <Input.TextArea
                  id="keterangan"
                  onChange={this.handleInputChange}
                  value={this.state.keterangan}
                  rows={4}
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
          </Card>

          <Row gutter={[16, 16]}>
            <Col span={4}>
              <ButtonCustom variant="secondary" onClick={() => this.props.history.goBack()} block>
                Kembali
              </ButtonCustom>
            </Col>

            {this.state.tokenData?.kode_kantor === this.state.kodeKantor &&
              this.state.tokenData?.role ===
                "a565468f-bbfa-43ab-b6b1-7c3c33631b33,a565468f-bbfa-43ab-b6b1-7c3c33631b33" && (
                <Col span={4}>
                  <Button
                    type="primary"
                    loading={this.state.isSimpanTaskToDoLoading}
                    onClick={this.handleSimpanTaskToDo}
                    block
                  >
                    Simpan
                  </Button>
                </Col>
              )}
          </Row>
        </Container>

        <ModalDaftarPenjabatBc
          isVisible={this.state.isModalDaftarPenjabatBcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarPenjabatBcVisible")}
          onDataDoubleClick={this.handleDataPenjabatBc}
        />
      </>
    );
  }
}
