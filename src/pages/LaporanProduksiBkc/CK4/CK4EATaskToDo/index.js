import {
  Button,
  Card,
  Col,
  DatePicker,
  Icon,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
  notification,
} from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import ModalDaftarPenjabatBc from "components/ModalDaftarPenjabatBc";
import ModalStck from "components/ModalStck";
import { baseUrlCeisaInhouse, endpoints } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { download } from "utils/files";
import { getTokenPayload } from "utils/jwt";
import { requestApi } from "utils/requestApi";
import { sumArrayOfObject } from "utils/sumArrayOfObject";

export default class CK4EATaskToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pemrakarsa",
      subtitle2: "Pemberitahuan",
      subtitle3: "Rincian",
      subtitle4: "Permohonan Perbaikan",
      subtitle5: "Keputusan Perbaikan",
      subtitle6: "STCK",

      isEditRincian: false,
      editIndexRincian: null,

      isSimpanTasktodoLoading: false,
      isDetailLoading: true,
      isModalDaftarStckVisible: false,
      isModalDaftarPenjabatBcVisible: false,
      isDownloadLoading: false,

      tokenData: null,
      kodeKantor: null,
      namaKantor: null,

      namaPemrakarsa: null,
      jabatanPemrakarsa: null,
      nipPemrakarsa: null,

      idNppbkc: null,
      nppbkc: null,
      namaNppbkc: null,
      alamatNppbkc: null,
      npwpNppbkc: null,

      idJenisLaporan: "HARIAN",
      namaJenisLaporan: "HARIAN",
      nomorPemberitahuan: null,
      tanggalPemberitahuan: null,
      jenisBarangKenaCukai: "ETIL ALKOHOL (EA)",

      tanggalJamProduksiAwal: null,
      tanggalJamProduksiAkhir: null,
      totaJumlahProduksi: 0,

      nomorProduksi: null,
      tanggalProduksi: null,
      jumlahProduksi: null,
      nomorTangki: null,
      keterangan: null,

      status: "SETUJU",
      nomorSuratPermohonanPerbaikan: null,
      tanggalSuratPermohonanPerbaikan: null,
      alasan: null,
      kodeUploadPerbaikan: null,

      isStck: false,
      nomorStck: null,
      tanggalStck: null,

      nomorSurat: null,
      tanggalSurat: null,
      nipPenjabatBc: null,
      namaPenjabatBc: null,
      idAsalKesalahan: null,
      namaAsalKesalahan: null,
      keteranganPerbaikan: null,

      searchText: null,
      searchedColumn: null,
      page: 1,

      listAsalKesalahan: [
        {
          idAsalKesalahan: "PENGGUNA JASA",
          namaAsalKesalahan: "PENGGUNA JASA",
        },
        {
          idAsalKesalahan: "PENGAWAS/PETUGAS",
          namaAsalKesalahan: "PENGAWAS/PETUGAS",
        },
        {
          idAsalKesalahan: "APLIKASI SAC-2",
          namaAsalKesalahan: "APLIKASI SAC-2",
        },
        {
          idAsalKesalahan: "JARINGAN",
          namaAsalKesalahan: "JARINGAN",
        },
        {
          idAsalKesalahan: "LAINNYA",
          namaAsalKesalahan: "LAINNYA",
        },
      ],
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

      dataSource: [],
      columns: [
        {
          title: "Dokumen Produksi",
          children: [
            {
              title: "Nomor",
              dataIndex: "nomorProduksi",
              key: "nomorProduksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("nomorProduksi"),
            },
            {
              title: "Tanggal",
              dataIndex: "tanggalProduksi",
              key: "tanggalProduksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("tanggalProduksi"),
            },
          ],
        },
        {
          title: "Nomor / Identitas Tangki",
          dataIndex: "nomorTangki",
          key: "nomorTangki",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("nomorTangki"),
        },
        {
          title: "Jumlah (liter)",
          dataIndex: "jumlahProduksi",
          key: "jumlahProduksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jumlahProduksi"),
        },
        {
          title: "Keterangan",
          dataIndex: "keterangan",
          key: "keterangan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("keterangan"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getToken();
    this.getDetailCk4Ea();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataSource !== this.state.dataSource) {
      const { dataSource } = this.state;
      this.setState({ totaJumlahProduksi: sumArrayOfObject(dataSource, "jumlahProduksi") });
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

  getDetailCk4Ea = async () => {
    const payload = { idProses: this.props.match.params.id };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: endpoints.ck4EaDetailTasktodo,
      params: payload,
      setLoading: (bool) => this.setState({ isDetailLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState({
        namaPemrakarsa: data.namaPemrakarsa,
        jabatanPemrakarsa: data.jabatanPemrakarsa,
        nipPemrakarsa: data.nipPemrakarsa,
        idNppbkc: data.idNppbkc,
        nppbkc: data.nppbkc,
        namaNppbkc: data.namaNppbkc,
        alamatNppbkc: data.alamatNppbkc,
        npwpNppbkc: data.npwp,
        idJenisLaporan: data.jenisLaporan,
        nomorPemberitahuan: data.nomorPemberitahuan,
        tanggalPemberitahuan: moment(data.tanggalPemberitahuan),
        tanggalJamProduksiAwal: moment(data.tanggalJamProduksiAwal),
        tanggalJamProduksiAkhir: moment(data.tanggalJamProduksiAkhir),
        idKota: data.idKota,
        namaKota: data.namaKota,
        namaPengusaha: data.namaPengusaha,
        isStck: data.isStck,
        kodeUploadPerbaikan: data.kodeUploadPerbaikan,

        kodeKantor: data.kodeKantor,
        namaKantor: data.namaKantor,

        dataSource: data.details.map((detail, index) => ({
          key: `ck4-${index}`,
          nomorProduksi: detail.nomorProduksi,
          tanggalProduksi: moment(detail.tanggalProduksi).format("DD-MM-YYYY"),
          jumlahProduksi: detail.jumlahProduksi,
          nomorTangki: detail.nomorTangki,
          keterangan: detail.keterangan,
        })),
      });
    }
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleColumnSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleColumnSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleColumnReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        const timeout = setTimeout(() => {
          this.searchInput.select();
          clearTimeout(timeout);
        });
      }
    },
  });
  handleColumnSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  handleColumnReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: null });
  };
  handleTableChange = (page) => {
    this.setState({ page: page.current });
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
  handleDataStck = (record) => {
    this.setState({
      nomorStck: record.nomorStck,
      tanggalStck: moment(record.tanggalStck),
    });
    this.handleModalClose("isModalDaftarStckVisible");
  };

  handleDownload = async () => {
    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: `${endpoints.s3Download}/${this.state.kodeUploadPerbaikan}`,
      setLoading: (bool) => this.setState({ isDownloadLoading: bool }),
      config: { responseType: "blob" },
    });

    if (response) download(response.data, `${new Date().getTime()}`);
  };

  handleSimpanTasktodo = async () => {
    const { status, isStck, nomorStck, tanggalStck, alasan } = this.state;

    const payload = {
      idCk4Header: this.props.match.params.id,
      status,
      flagApprove: status === "SETUJU" ? "Y" : "N",
    };

    if (status === "SETUJU") {
      if (isStck) {
        payload.nomorStck = nomorStck;
        payload.tanggalStck = moment(tanggalStck, "DD-MM-YYYY").format("YYYY-MM-DD");
      }
    } else {
      payload.alasan = alasan;
    }

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: endpoints.ck4PerbaikanTasktodo,
      body: payload,
      setLoading: (bool) => this.setState({ isSimpanTasktodoLoading: bool }),
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
    if (this.state.isDetailLoading) return <LoadingWrapperSkeleton />;

    return (
      <>
        <Container menuName="Task To Do" contentName="CK4 EA Task To Do">
          <Card title={this.state.subtitle1} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Nama Pemrakarsa</FormLabel>
                </div>
                <Input id="namaPemrakarsa" value={this.state.namaPemrakarsa} disabled />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jabatan</FormLabel>
                </div>
                <Input id="jabatanPemrakarsa" value={this.state.jabatanPemrakarsa} disabled />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>NIP</FormLabel>
                </div>
                <Input id="nipPemrakarsa" value={this.state.nipPemrakarsa} disabled />
              </Col>
            </Row>
          </Card>

          <Card title={this.state.subtitle2} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Data NPPBKC" style={{ height: 437 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nama</FormLabel>
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

                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Alamat</FormLabel>
                    </div>
                    <Input.TextArea
                      id="alamatNppbkc"
                      value={this.state.alamatNppbkc}
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
                      id="jenisLaporan"
                      value={this.state.idJenisLaporan}
                      style={{ width: "100%" }}
                      disabled
                    >
                      <Select.Option value={this.state.idJenisLaporan}>
                        {this.state.namaJenisLaporan}
                      </Select.Option>
                    </Select>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor Pemberitahuan</FormLabel>
                    </div>
                    <Input id="nomorPemberitahuan" value={this.state.nomorPemberitahuan} disabled />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Pemberitahuan</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggalPemberitahuan"
                      format="DD-MM-YYYY"
                      value={this.state.tanggalPemberitahuan}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Barang Kena Cukai</FormLabel>
                    </div>
                    <Input value={this.state.jenisBarangKenaCukai} disabled />
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
                      id="tanggalJamProduksiAwal"
                      showTime={{ format: "HH:mm" }}
                      format="DD-MM-YYYY HH:mm"
                      value={this.state.tanggalJamProduksiAwal}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Jam Produksi Akhir</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggalJamProduksiAkhir"
                      showTime={{ format: "HH:mm" }}
                      format="DD-MM-YYYY HH:mm"
                      value={this.state.tanggalJamProduksiAkhir}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </div>

                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Produksi</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input
                        id="totaJumlahProduksi"
                        value={this.state.totaJumlahProduksi}
                        disabled
                      />
                      <div>Liter</div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>

          <Card title={this.state.subtitle3}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Data Produksi" style={{ height: 334 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor</FormLabel>
                    </div>
                    <Input id="nomorProduksi" value={this.state.nomorProduksi} disabled />
                  </div>

                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Produksi</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggalProduksi"
                      format="DD-MM-YYYY"
                      value={this.state.tanggalProduksi}
                      style={{ width: "100%" }}
                      disabled
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
                        id="jumlahProduksi"
                        value={this.state.jumlahProduksi}
                        style={{ flex: 1 }}
                        disabled
                      />
                      <div>Liter</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor / Identitas Tangki</FormLabel>
                    </div>
                    <Input id="nomorTangki" value={this.state.nomorTangki} disabled />
                  </div>

                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Keterangan</FormLabel>
                    </div>
                    <Input id="keterangan" value={this.state.keterangan} disabled />
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>

          <Table
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            scroll={{ x: "max-content" }}
            onChange={this.handleTableChange}
            pagination={{ current: this.state.page }}
            style={{ marginTop: 30, marginBottom: 30 }}
          />

          <Card title={this.state.subtitle4} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Nomor Surat</FormLabel>
                </div>
                <Input
                  id="nomorSuratPermohonanPerbaikan"
                  onChange={this.handleInputChange}
                  value={this.state.nomorSuratPermohonanPerbaikan}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Surat</FormLabel>
                </div>
                <DatePicker
                  id="tanggalSuratPermohonanPerbaikan"
                  format="DD-MM-YYYY"
                  onChange={(date) =>
                    this.handleDatepickerChange("tanggalSuratPermohonanPerbaikan", date)
                  }
                  style={{ width: "100%" }}
                  value={this.state.tanggalSuratPermohonanPerbaikan}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Download PDF</FormLabel>
                </div>

                <Button
                  type="primary"
                  loading={this.state.isDownloadLoading}
                  onClick={this.handleDownload}
                  disabled={!this.state.kodeUploadPerbaikan}
                >
                  Download
                </Button>
              </Col>
            </Row>
          </Card>

          <Card title={this.state.subtitle5} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Persetujuan</FormLabel>
                </div>
                <Select
                  id="status"
                  value={this.state.status}
                  onChange={(value) => this.handleSelectChange("status", value)}
                  style={{ width: "100%" }}
                >
                  {this.state.listStatus.length > 0 &&
                    this.state.listStatus.map((item, index) => (
                      <Select.Option key={`status-${index}`} value={item.idStatus}>
                        {item.namaStatus}
                      </Select.Option>
                    ))}
                </Select>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              {this.state.status === "SETUJU" ? (
                <>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor Surat</FormLabel>
                    </div>
                    <Input
                      id="nomorSurat"
                      onChange={this.handleInputChange}
                      value={this.state.nomorSurat}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Surat</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggalSurat"
                      format="DD-MM-YYYY"
                      onChange={(date) => this.handleDatepickerChange("tanggalSurat", date)}
                      style={{ width: "100%" }}
                      value={this.state.tanggalSurat}
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
                      <FormLabel>Asal Kesalahan</FormLabel>
                    </div>
                    <Select
                      id="asalKesalahan"
                      onChange={(value) => this.handleSelectChange("idAsalKesalahan", value)}
                      style={{ width: "100%" }}
                      value={this.state.idAsalKesalahan}
                    >
                      {this.state.listAsalKesalahan.length > 0 &&
                        this.state.listAsalKesalahan.map((item, index) => (
                          <Select.Option
                            key={`asalKesalahan-${index}`}
                            value={item.idAsalKesalahan}
                          >
                            {item.namaAsalKesalahan}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Keterangan</FormLabel>
                    </div>
                    <Input.TextArea
                      id="keteranganPerbaikan"
                      onChange={this.handleInputChange}
                      value={this.state.keteranganPerbaikan}
                    />
                  </Col>
                </>
              ) : (
                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Alasan</FormLabel>
                  </div>
                  <Input.TextArea
                    id="alasan"
                    onChange={this.handleInputChange}
                    value={this.state.alasan}
                  />
                </Col>
              )}
            </Row>
          </Card>

          {this.state.status === "SETUJU" && this.state.isStck && (
            <Card title={this.state.subtitle6} style={{ marginBottom: 30 }}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Nomor STCK</FormLabel>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Input
                      id="nomorStck"
                      onChange={this.handleInputChange}
                      value={this.state.nomorStck}
                      disabled
                    />
                    <Button
                      type="default"
                      icon="menu"
                      onClick={() => this.handleModalShow("isModalDaftarStckVisible")}
                    />
                  </div>
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Tanggal STCK</FormLabel>
                  </div>
                  <DatePicker
                    id="tanggalStck"
                    format="DD-MM-YYYY"
                    onChange={(date) => this.handleDatepickerChange("tanggalStck", date)}
                    value={this.state.tanggalStck}
                    style={{ width: "100%" }}
                    disabled
                  />
                </Col>
              </Row>
            </Card>
          )}

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
                    loading={this.state.isSimpanTasktodoLoading}
                    onClick={this.handleSimpanTasktodo}
                    block
                  >
                    Simpan
                  </Button>
                </Col>
              )}
          </Row>
        </Container>

        {this.state.isStck && (
          <ModalStck
            isVisible={this.state.isModalDaftarStckVisible}
            onCancel={() => this.handleModalClose("isModalDaftarStckVisible")}
            onDataDoubleClick={this.handleDataStck}
            npwp={this.state.npwpNppbkc}
          />
        )}

        <ModalDaftarPenjabatBc
          isVisible={this.state.isModalDaftarPenjabatBcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarPenjabatBcVisible")}
          onDataDoubleClick={this.handleDataPenjabatBc}
        />
      </>
    );
  }
}
