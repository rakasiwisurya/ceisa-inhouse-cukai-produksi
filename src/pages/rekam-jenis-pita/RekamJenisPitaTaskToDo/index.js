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

      nppbkc_id: null,
      nppbkc: null,
      nama_nppbkc: null,
      jenis_bkc_id: null,
      personal_nppbkc: null,

      jenis_produksi_id: null,
      jenis_produksi_name: null,
      satuan_id: null,
      satuan_name: null,
      hje: null,
      isi: null,
      tarif: null,
      awal_berlaku: null,
      warna: null,
      kode_warna: null,
      seri_pita_id: null,
      seri_pita_name: null,
      tahun_pita: String(new Date().getFullYear()),
      tasktodo_status: "SETUJU",

      list_jenis_produksi: [],
      list_seri_pita: [],
      list_status: [
        {
          status_id: "SETUJU",
          status_name: "SETUJU",
        },
        {
          status_id: "TOLAK",
          status_name: "TOLAK",
        },
      ],
    };
  }

  componentDidMount() {
    this.getDetailRekamJenisPita();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.nppbkc_id !== this.state.nppbkc_id) {
      this.getJenisProduksi();
    }

    if (prevState.jenis_bkc_id !== this.state.jenis_bkc_id) {
      this.getSeripita();

      if (this.state.jenis_bkc_id === 2) {
        this.setState({ hje: 0 });
      }
    }

    if (
      prevState.list_seri_pita?.length !== this.state.list_seri_pita?.length ||
      prevState.jenis_bkc_id !== this.state.jenis_bkc_id
    ) {
      if (this.state.jenis_bkc_id === 2 && this.state.list_seri_pita?.length > 0)
        this.setState({
          seri_pita_id: this.state.list_seri_pita[0]?.idSeripita,
          seri_pita_name: this.state.list_seri_pita[0]?.namaSeripita,
        });
    }

    if (
      prevState.jenis_produksi_id !== this.state.jenis_produksi_id ||
      prevState.hje !== this.state.hje ||
      prevState.isi !== this.state.isi
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
        nppbkc_id: data.idNppbkc,
        nppbkc: data.nppbkc,
        nama_nppbkc: data.namaPerusahaan,
        jenis_bkc_id: data.idJenisBkc,
        personal_nppbkc: data.personalisasi,

        jenis_produksi_id: `${data.idJenisProduksiBkc}-${data.idGolonganBkc}-${data.kodeSatuan}`,
        jenis_produksi_name: `${data.kodeJenisProduksiBkc} - ${data.namaGolonganBkc}`,
        hje: data.hje || 0,
        isi: data.isiVolume,
        tarif: data.tarif,
        awal_berlaku: moment(data.awalBerlaku),
        warna: data.warna,
        kode_warna: data.kodeWarna,
        tahun_pita: data.tahunPita,
        seri_pita_id: data.idSeripita,
        seri_pita_name: data.namaSeripita,
      });

      this.setState({ tarif: data.tarif, warna: data.warna, kode_warna: data.kodeWarna });
    }
  };
  getJenisProduksi = async () => {
    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/nppbkc-produksi-bkc/browse-jenis-produksi",
      params: { idNppbkc: this.state.nppbkc_id },
      setLoading: (bool) => this.setState({ isJenisProduksiLoading: bool }),
    });

    if (response) this.setState({ list_jenis_produksi: response.data.data });
  };
  getTarifWarna = () => {
    this.getTarif();
    this.getWarna();
  };
  getTarif = async () => {
    const payload = {
      kodeJenisProduksiBkc: this.state.jenis_produksi_name.split("-")[0].trim(),
      idGolonganBkc: this.state.jenis_produksi_id.split("-")[1],
    };

    if (this.state.jenis_bkc_id === 3) payload.hje = this.state.hje;

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
      kodeJenisProduksiBkc: this.state.jenis_produksi_name.split("-")[0].trim(),
      idGolonganBkc: this.state.jenis_produksi_id.split("-")[1],
    };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/browse-warna",
      params: payload,
      setLoading: (bool) => this.setState({ isWarnaLoading: bool }),
    });

    if (response) {
      this.setState({ warna: response.data.data.warna, kode_warna: response.data.data?.kodeWarna });
    }
  };
  getSeripita = async () => {
    const payload = { idJenisBkc: this.state.jenis_bkc_id };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/seripita/get-seripita-jenis-bkc",
      params: payload,
      setLoading: (bool) => this.setState({ isSeripitaLoading: bool }),
    });

    if (response) this.setState({ list_seri_pita: response.data.data });
  };

  handleSimpanTaskToDo = async () => {
    const payload = {
      idJenisPita: this.props.match.params.id,
      status: this.state.tasktodo_status,
    };

    const response = await requestApi({
      service: "produksi",
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
                      <Input id="nama_perusahaan" value={this.state.nama_nppbkc} disabled />
                    </div>
                  </Col>
                </Row>

                {this.state.nppbkc_id && (
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jenis Produksi</FormLabel>
                        </div>
                        <Select
                          id="jenis_produksi"
                          value={this.state.jenis_produksi_id}
                          loading={this.state.isJenisProduksiLoading}
                          style={{ width: "100%" }}
                          disabled
                        >
                          {this.state.list_jenis_produksi.length > 0 &&
                            this.state.list_jenis_produksi.map((item, index) => (
                              <Select.Option
                                key={`jenis-produksi-${index}`}
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
                              !this.state.jenis_produksi_id ||
                              (this.state.jenis_bkc_id === 3 && !this.state.hje)
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
                          id="isi"
                          value={this.state.isi}
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
                          value={this.state.awal_berlaku}
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
                          id="seri_pita"
                          value={this.state.seri_pita_id}
                          loading={this.state.isSeripitaLoading}
                          style={{ width: "100%" }}
                          disabled
                        >
                          {this.state.list_seri_pita.length > 0 &&
                            this.state.list_seri_pita.map((item, index) => (
                              <Select.Option key={`seri-pita-${index}`} value={item.idSeripita}>
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
                          id="tahun_pita"
                          value={this.state.tahun_pita}
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
                      id="tasktodo_status"
                      onChange={(value) => this.handleSelectChange("tasktodo_status", value)}
                      value={this.state.tasktodo_status}
                      style={{ width: "100%" }}
                    >
                      {this.state.list_status.length > 0 &&
                        this.state.list_status.map((item, index) => (
                          <Select.Option key={`tasktodo-status-${index}`} value={item.status_id}>
                            {item.status_name}
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
