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
  Upload,
  notification,
} from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import ModalDaftarPenjabatBc from "components/ModalDaftarPenjabatBc";
import ModalStck from "components/ModalStck";
import { baseUrlCeisaInhouse } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { ExcelRenderer } from "react-excel-renderer";
import { convertArrayExcelToTable } from "utils/convertArrayExcelToTable";
import { requestApi } from "utils/requestApi";
import { sumArrayOfObject } from "utils/sumArrayOfObject";
import { months, years } from "utils/times";

export default class CK4MMEATaskTodo extends Component {
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

      namaPemrakarsa: null,
      jabatanPemrakarsa: null,
      nipPemrakarsa: null,

      idNppbkc: null,
      namaNppbkc: null,
      nppbkc: null,
      alamatNppbkc: null,
      npwpNppbkc: null,

      idJenisLaporan: null,
      namaJenisLaporan: null,
      nomorPemberitahuan: null,
      tanggalPemberitahuan: null,
      jenisBarangKenaCukai: "MINUMAN MENGANDUNG ETIL ALKOHOL (MMEA)",

      tanggalJamProduksiAwal: null,
      tanggalJamProduksiAkhir: null,
      periodeBulan: null,
      periodeTahun: null,
      totalJumlahKemasan: 0,
      totalJumlahKemasanDilekatiPita: 0,
      totalJumlahProduksi: 0,

      jenisMmea: null,
      idMerkMmea: null,
      namaMerkMmea: null,
      isiMmea: null,
      tarifMmea: null,
      jenisKemasanMmea: null,
      golonganMmea: null,
      kadarMmea: null,

      nomorProduksi: null,
      tanggalProduksi: null,
      jumlahKemasan: null,
      jumlahProduksi: null,
      jumlahKemasanDilekatiPita: null,

      status: "SETUJU",
      nomorSuratPermohonanPerbaikan: null,
      tanggalSuratPermohonanPerbaikan: null,
      alasan: null,
      previewFile:
        "https://raw.githubusercontent.com/rakasiwisurya/pdf-test/aa52b04cae0e0f857a2d0e21c3a837f3cfb7f5ff/NS_CG_K2R.pdf",

      nomorStck: null,
      tanggalStck: null,

      nomorSurat: null,
      tanggalSurat: null,
      nipPenjabatBc: null,
      namaPenjabatBc: null,
      idAsalKesalahan: null,
      namaAsalKesalahan: null,
      keteranganPerbaikan: null,

      uraianRincianFile: [],

      searchText: null,
      searchedColumn: null,
      page: 1,

      listJenisLaporan: [
        {
          idJenisLaporan: "HARIAN",
          namaJenisLaporan: "HARIAN",
        },
        {
          idJenisLaporan: "BULANAN",
          namaJenisLaporan: "BULANAN",
        },
      ],
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
          title: "Jenis MMEA",
          dataIndex: "jenisMmea",
          key: "jenisMmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenisMmea"),
        },
        {
          title: "Merk MMEA",
          dataIndex: "namaMerkMmea",
          key: "namaMerkMmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("namaMerkMmea"),
        },
        {
          title: "Isi (ml)",
          dataIndex: "isiMmea",
          key: "isiMmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("isiMmea"),
        },
        {
          title: "Kadar (%)",
          dataIndex: "kadarMmea",
          key: "kadarMmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("kadarMmea"),
        },
        {
          title: "Tarif (Rp)",
          dataIndex: "tarifMmea",
          key: "tarifMmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tarifMmea"),
        },
        {
          title: "Jenis Kemasan",
          dataIndex: "jenisKemasanMmea",
          key: "jenisKemasanMmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenisKemasanMmea"),
        },
        {
          title: "Golongan",
          dataIndex: "golonganMmea",
          key: "golonganMmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("golonganMmea"),
        },
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
          title: "Jumlah Kemasan",
          dataIndex: "jumlahKemasan",
          key: "jumlahKemasan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jumlahKemasan"),
        },
        {
          title: "Jumlah Produksi",
          dataIndex: "jumlahProduksi",
          key: "jumlahProduksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jumlahProduksi"),
        },
        {
          title: "Jumlah Kemasan Dilekati Pita",
          dataIndex: "jumlahKemasanDilekatiPita",
          key: "jumlahKemasanDilekatiPita",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jumlahKemasanDilekatiPita"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getDetailCk4Mmea();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataSource !== this.state.dataSource) {
      const { dataSource } = this.state;
      this.setState({
        totalJumlahKemasan: sumArrayOfObject(dataSource, "jumlahKemasan"),
        totalJumlahKemasanDilekatiPita: sumArrayOfObject(dataSource, "jumlahKemasanDilekatiPita"),
        totalJumlahProduksi: sumArrayOfObject(dataSource, "jumlahProduksi"),
      });
    }
  }

  getDetailCk4Mmea = async () => {
    const payload = { idCk4: this.props.match.params.id };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/ck4/detail-mmea",
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
        namaNppbkc: data.namaNppbkc,
        nppbkc: data.nppbkc,
        alamatNppbkc: data.alamatNppbkc,
        npwpNppbkc: data.npwp,

        idJenisLaporan: data.jenisLaporan,
        nomorPemberitahuan: data.nomorPemberitahuan,
        tanggalPemberitahuan: moment(data.tanggalPemberitahuan),

        tanggalJamProduksiAwal: moment(data.tanggalJamProduksiAwal),
        tanggalJamProduksiAkhir: moment(data.tanggalJamProduksiAkhir),
        periodeBulan: data.periodeBulan,
        periodeTahun: data.periodeTahun,

        idKota: data.idKota,
        namaKota: data.namaKota,
        namaPengusaha: data.namaPengusaha,
        dataSource: data.details.map((detail, index) => ({
          key: `ck4-${index}`,
          idCk4Detail: detail.idCk4Detail,
          jenisMmea: detail.jenisMmea,
          idMerkMmea: detail.idMerkMmea,
          namaMerkMmea: detail.namaMerkMmea,
          isiMmea: detail.isiMmea,
          tarifMmea: detail.tarifMmea,
          jenisKemasanMmea: detail.jenisKemasanMmea,
          golonganMmea: detail.golonganMmea,
          kadarMmea: detail.kadarMmea,

          nomorProduksi: detail.nomorProduksi,
          tanggalProduksi: moment(detail.tanggalProduksi).format("DD-MM-YYYY"),
          jumlahKemasan: detail.jumlahKemasan,
          jumlahProduksi: detail.jumlahProduksi,
          jumlahKemasanDilekatiPita: detail.jumlahKemasanDilekatiPita,
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
  handleUploadFile = (field, { file, onSuccess }) => {
    const timeout = setTimeout(() => {
      onSuccess("done");
      this.setState({ [field]: [file] });
      clearTimeout(timeout);
    }, 0);
  };
  handleRemoveFile = (field) => {
    this.setState({ [field]: [] });
  };
  handleInsertFileToTable = () => {
    ExcelRenderer(this.state.uraianRincianFile[0], (err, res) => {
      if (err) return console.error(err);
      const data = convertArrayExcelToTable(res.rows);
      this.setState({ uraianRincianFile: [], dataSource: [...this.state.dataSource, data] });
    });
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

  handleSimpanTasktodo = async () => {
    const { status, nomorStck, tanggalStck, alasan } = this.state;

    const payload = {
      idCk4Header: this.props.match.params.id,
      status,
      flagApprove: status === "SETUJU" ? "Y" : "N",
    };

    if (status === "SETUJU") {
      payload.nomorStck = nomorStck;
      payload.tanggalStck = moment(tanggalStck, "DD-MM-YYYY").format("YYYY-MM-DD");
    } else {
      payload.alasan = alasan;
    }

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: "/ck4/task-todo-perbaikan",
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
    return (
      <>
        <Container menuName="Task To Do" contentName="CK4 MMEA" hideContentHeader>
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
              </div>

              <Header>{this.state.subtitle2}</Header>
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
                          <Input id="namaNppbkc" value={this.state.namaNppbkc} disabled />
                        </div>
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>NPPBKC</FormLabel>
                        </div>
                        <Input
                          id="nppbkc"
                          onChange={this.handleInputChange}
                          value={this.state.nppbkc}
                          disabled
                        />
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Alamat</FormLabel>
                        </div>
                        <Input.TextArea
                          id="alamatNppbkc"
                          onChange={this.handleInputChange}
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
                          {this.state.listJenisLaporan.length > 0 &&
                            this.state.listJenisLaporan.map((item, index) => (
                              <Select.Option
                                key={`jenis-laporan-${index}`}
                                value={item.idJenisLaporan}
                              >
                                {item.namaJenisLaporan}
                              </Select.Option>
                            ))}
                        </Select>
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Nomor Pemberitahuan</FormLabel>
                        </div>
                        <Input
                          id="nomorPemberitahuan"
                          value={this.state.nomorPemberitahuan}
                          disabled
                        />
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
                    <Card title="Data Produksi">
                      {this.state.idJenisLaporan === "HARIAN" && (
                        <>
                          <div style={{ marginBottom: 20 }}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Tanggal Jam Produksi Awal</FormLabel>
                            </div>
                            <DatePicker
                              id="tanggalJamProduksiAwal"
                              showTime={{ format: "HH:mm" }}
                              format="YYYY-MM-DD HH:mm"
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
                              format="YYYY-MM-DD HH:mm"
                              value={this.state.tanggalJamProduksiAkhir}
                              style={{ width: "100%" }}
                              disabled
                            />
                          </div>
                        </>
                      )}

                      {this.state.idJenisLaporan === "BULANAN" && (
                        <div style={{ marginBottom: 20 }}>
                          <div style={{ marginBottom: 10 }}>
                            <FormLabel>Periode</FormLabel>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <Select
                              id="periodeBulan"
                              value={this.state.periodeBulan}
                              style={{ width: "100%" }}
                              disabled
                            >
                              {months.map((item, index) => (
                                <Select.Option
                                  key={`periode-bulan-${index}`}
                                  value={item.month_code}
                                >
                                  {item.month_name}
                                </Select.Option>
                              ))}
                            </Select>

                            <Select
                              id="periodeTahun"
                              value={this.state.periodeTahun}
                              style={{ width: "100%" }}
                              disabled
                            >
                              {years.map((item, index) => (
                                <Select.Option
                                  key={`periode-tahun-${index}`}
                                  value={item.year_code}
                                >
                                  {item.year_name}
                                </Select.Option>
                              ))}
                            </Select>
                          </div>
                        </div>
                      )}

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jumlah Kemasan</FormLabel>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Input
                            id="totalJumlahKemasan"
                            value={this.state.totalJumlahKemasan}
                            disabled
                          />
                          <div>Kemasan</div>
                        </div>
                      </div>
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jumlah Kemasan Dilekati Pita</FormLabel>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Input
                            id="totalJumlahKemasanDilekatiPita"
                            value={this.state.totalJumlahKemasanDilekatiPita}
                            disabled
                          />
                          <div>Kemasan</div>
                        </div>
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jumlah Produksi</FormLabel>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Input
                            id="totalJumlahProduksi"
                            value={this.state.totalJumlahProduksi}
                            disabled
                          />
                          <div>Liter</div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>

              <Header>{this.state.subtitle3}</Header>
              <div
                className="kt-content  kt-grid__item kt-grid__item--fluid"
                id="kt_content"
                style={{ paddingBottom: 10 }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card title="Kep Tarif" style={{ height: 705 }}>
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jenis MMEA</FormLabel>
                        </div>
                        <Input
                          id="jenisMmea"
                          value={this.state.jenisMmea}
                          style={{ flex: 1 }}
                          disabled
                        />
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Merk MMEA</FormLabel>
                        </div>
                        <div style={{ display: "flex", gap: 10 }}>
                          <Input id="namaMerkMmea" value={this.state.namaMerkMmea} disabled />
                        </div>
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Isi</FormLabel>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Input id="isiMmea" value={this.state.isiMmea} disabled />
                          <div style={{ display: "flex", gap: 3 }}>
                            <div>Mililiter</div>
                            <div>(ml)</div>
                          </div>
                        </div>
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jenis Kemasan</FormLabel>
                        </div>
                        <Input id="jenisKemasanMmea" value={this.state.jenisKemasanMmea} disabled />
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Golongan</FormLabel>
                        </div>
                        <Input id="golonganMmea" value={this.state.golonganMmea} disabled />
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Kadar</FormLabel>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Input id="kadarMmea" value={this.state.kadarMmea} disabled />
                          <div>%</div>
                        </div>
                      </div>
                    </Card>
                  </Col>

                  <Col span={12}>
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <Card title="Dokumen Produksi">
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

                      <Col span={24}>
                        <Card title="Jumlah Produksi">
                          <div style={{ marginBottom: 20 }}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Jumlah Kemasan</FormLabel>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <InputNumber
                                id="jumlahKemasan"
                                value={this.state.jumlahKemasan}
                                style={{ flex: 1 }}
                                disabled
                              />
                              <div>Liter</div>
                            </div>
                          </div>

                          <div>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Jumlah Produksi</FormLabel>
                            </div>
                            <InputNumber
                              id="jumlahProduksi"
                              value={this.state.jumlahProduksi}
                              style={{ width: "100%" }}
                              disabled
                            />
                          </div>
                        </Card>
                      </Col>

                      <Col span={24}>
                        <Card title="Pelekatan">
                          <div>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Jumlah Kemasan Dilekati Pita</FormLabel>
                            </div>
                            <InputNumber
                              id="jumlahKemasanDilekatiPita"
                              value={this.state.jumlahKemasanDilekatiPita}
                              style={{ width: "100%" }}
                              disabled
                            />
                          </div>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card title="Upload Uraian Rincian">
                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Uraian Rincian</FormLabel>
                        </div>
                        <div style={{ position: "relative" }}>
                          <Upload
                            id="uraianRincianFile"
                            name="uraianRincianFile"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            customRequest={(options) =>
                              this.handleUploadFile("uraianRincianFile", options)
                            }
                            onRemove={() => this.handleRemoveFile("uraianRincianFile")}
                            fileList={this.state.uraianRincianFile}
                            disabled
                          >
                            <Button disabled>
                              <Icon type="upload" /> Upload
                            </Button>
                          </Upload>

                          <Button
                            type="primary"
                            onClick={this.handleInsertFileToTable}
                            style={{ marginTop: 10 }}
                            disabled={this.state.uraianRincianFile.length === 0}
                          >
                            Insert To Table
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>

                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <Table
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    scroll={{ x: "max-content" }}
                    onChange={this.handleTableChange}
                    pagination={{ current: this.state.page }}
                  />
                </div>
              </div>

              <Header>{this.state.subtitle4}</Header>
              <div
                className="kt-content  kt-grid__item kt-grid__item--fluid"
                id="kt_content"
                style={{ paddingBottom: 10 }}
              >
                <Row gutter={[16, 16]}>
                  <>
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

                    {this.state.previewFile && (
                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Preview PDF</FormLabel>
                        </div>
                        <iframe
                          src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                            this.state.previewFile
                          )}&embedded=true`}
                          title="Preview PDF"
                          width={"100%"}
                          height={400}
                        />
                        <div style={{ marginTop: 10 }}>
                          <Button
                            type="primary"
                            onClick={() =>
                              window.open(
                                `https://docs.google.com/viewerng/viewer?url=${this.state.previewFile}`,
                                "_blank"
                              )
                            }
                            block
                          >
                            Open
                          </Button>
                        </div>
                      </Col>
                    )}
                  </>
                </Row>
              </div>

              <Header>{this.state.subtitle5}</Header>
              <div
                className="kt-content  kt-grid__item kt-grid__item--fluid"
                id="kt_content"
                style={{ paddingBottom: 10 }}
              >
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
              </div>

              {this.state.status === "SETUJU" && (
                <>
                  <Header>{this.state.subtitle6}</Header>
                  <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
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
                  </div>
                </>
              )}

              <Row gutter={[16, 16]} style={{ padding: window.innerWidth <= 1024 ? 15 : 25 }}>
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
                    loading={this.state.isSimpanTasktodoLoading}
                    onClick={this.handleSimpanTasktodo}
                    block
                  >
                    Simpan
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Container>

        <ModalStck
          isVisible={this.state.isModalDaftarStckVisible}
          onCancel={() => this.handleModalClose("isModalDaftarStckVisible")}
          onDataDoubleClick={this.handleDataStck}
          npwp={this.state.npwpNppbkc}
        />

        <ModalDaftarPenjabatBc
          isVisible={this.state.isModalDaftarPenjabatBcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarPenjabatBcVisible")}
          onDataDoubleClick={this.handleDataPenjabatBc}
        />
      </>
    );
  }
}
