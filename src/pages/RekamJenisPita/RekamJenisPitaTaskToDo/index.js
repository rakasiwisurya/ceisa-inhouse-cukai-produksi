import { Button, Col, DatePicker, Input, InputNumber, Row, Select, notification } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import { baseUrlCeisaInhouse } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class RekamJenisPitaTaskToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Permohonan",

      isDetailLoading: true,
      isSimpanTaskToDoLoading: false,
      isJenisProduksiLoading: true,
      isTarifLoading: false,
      isWarnaLoading: false,
      isModalDaftarNppbkcVisible: false,

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
      tasktodoStatus: "SETUJU",

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
      prevState.hje !== this.state.hje ||
      prevState.isiKemasan !== this.state.isiKemasan
    ) {
      this.setState({ tarif: null, warna: null });
    }
  }

  getDetailRekamJenisPita = async () => {
    const payload = { idJenisPita: this.props.match.params.id };

    const response = await requestApi({
      service: "pita_cukai",
      method: "get",
      endpoint: "/pita/browse-by-id",
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
      });

      this.setState({ tarif: data.tarif, warna: data.warna, kodeWarna: data.kodeWarna });
    }
  };
  getJenisProduksi = async () => {
    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/nppbkc-produksi-bkc/browse-jenis-produksi",
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
      endpoint: "/referensi/browse-tarif",
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
      endpoint: "/referensi/browse-warna",
      params: payload,
      setLoading: (bool) => this.setState({ isWarnaLoading: bool }),
    });

    if (response) {
      this.setState({ warna: response.data.data.warna, kodeWarna: response.data.data?.kodeWarna });
    }
  };
  getSeripita = async () => {
    const payload = { idJenisBkc: this.state.idJenisBkc };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/seripita/get-seripita-jenis-bkc",
      params: payload,
      setLoading: (bool) => this.setState({ isSeripitaLoading: bool }),
    });

    if (response) this.setState({ listSeriPita: response.data.data });
  };

  handleSimpanTaskToDo = async () => {
    const payload = {
      idJenisPita: this.props.match.params.id,
      status: this.state.tasktodoStatus,
    };

    const response = await requestApi({
      service: "pita_cukai",
      method: "post",
      endpoint: "/pita/task-todo",
      body: payload,
      setLoading: (bool) => this.setState({ isSimpanTaskToDoLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      const timeout = setTimeout(() => {
        window.location.href = `${baseUrlCeisaInhouse}/tasktodo`;
        clearTimeout(timeout);
      }, 1000);
    }
  };

  render() {
    return (
      <>
        <Container menuName="Rekam Jenis Pita" contentName="Perbaikan" hideContentHeader>
          {this.state.isDetailLoading ? (
            <LoadingWrapperSkeleton />
          ) : (
            <>
              <Header>{this.state.subtitle1}</Header>
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>NPPBKC</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input id="nppbkc" value={this.state.nppbkc} disabled />
                      <Button type="primary" disabled>
                        Cari
                      </Button>
                      <Input id="namaNppbkc" value={this.state.namaNppbkc} disabled />
                    </div>
                  </Col>
                </Row>

                {this.state.idNppbkc && (
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <div style={{ marginBottom: 20 }}>
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
                      </div>
                    </Col>

                    <Col span={12}>
                      <div style={{ marginBottom: 20 }}>
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

                          <Button
                            type="primary"
                            icon="search"
                            loading={this.state.isTarifLoading || this.state.isWarnaLoading}
                            onClick={this.getTarifWarna}
                            disabled={
                              !this.state.idJenisProduksiBkc ||
                              (this.state.idJenisBkc === 3 && !this.state.hje)
                            }
                          />
                        </div>
                      </div>
                    </Col>

                    <Col span={12}>
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Isi Per Kemasan</FormLabel>
                        </div>

                        <InputNumber
                          id="isiKemasan"
                          value={this.state.isiKemasan}
                          style={{ width: "100%" }}
                          disabled
                        />
                      </div>
                    </Col>

                    <Col span={12}>
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tarif Cukai</FormLabel>
                        </div>
                        <InputNumber
                          id="tarif"
                          value={this.state.tarif}
                          style={{ width: "100%" }}
                          disabled
                        />
                      </div>
                    </Col>

                    <Col span={12}>
                      <div style={{ marginBottom: 20 }}>
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
                      </div>
                    </Col>

                    <Col span={12}>
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Warna</FormLabel>
                        </div>
                        <Input
                          id="warna"
                          value={this.state.warna}
                          style={{ width: "100%" }}
                          disabled
                        />
                      </div>
                    </Col>

                    <Col span={12}>
                      <div style={{ marginBottom: 20 }}>
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
                      </div>
                    </Col>

                    <Col span={12}>
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tahun Pita</FormLabel>
                        </div>
                        <Input
                          id="tahunPita"
                          value={this.state.tahunPita}
                          style={{ width: "100%" }}
                          disabled
                        />
                      </div>
                    </Col>
                  </Row>
                )}

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
                      loading={this.state.isSimpanTaskToDoLoading}
                      onClick={this.handleSimpanTaskToDo}
                      block
                    >
                      Simpan
                    </Button>
                  </Col>
                </Row>
              </div>
            </>
          )}
        </Container>
      </>
    );
  }
}
