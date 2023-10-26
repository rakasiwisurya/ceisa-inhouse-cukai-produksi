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
import ModalDaftarKota from "components/ModalDaftarKota";
import ModalDaftarMerkMMEACK4 from "components/ModalDaftarMerkMMEACK4";
import ModalDaftarNPPBKC from "components/ModalDaftarNppbkc";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { ExcelRenderer } from "react-excel-renderer";
import { convertArrayExcelToTable } from "utils/convertArrayExcelToTable";
import { download } from "utils/files";
import { formatDateFromExcelEpoch } from "utils/formatter";
import { requestApi } from "utils/requestApi";
import { sumArrayOfObject } from "utils/sumArrayOfObject";
import { months, years } from "utils/times";

export default class CK4MMEA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pemberitahuan",
      subtitle2: "Rincian",
      subtitle3: "Pemberitahu",

      isEditRincian: false,
      editIndexRincian: null,

      isRekamLoading: false,
      isModalDaftarNppbkcVisible: false,
      isModalDaftarMerkMmeaVisible: false,
      isModalDaftarKotaVisible: false,
      isDownloadTemplateLoading: false,

      idJenisBkc: 2,

      idNppbkc: null,
      namaNppbkc: null,
      nppbkc: null,
      alamatNppbkc: null,
      npwpNppbkc: null,

      idJenisLaporan: null,
      namaJenisLaporan: null,
      nomorPemberitahuan: null,
      tanggalPemberitahuan: null,
      jenisBarangKenaCukai: "Minuman Mengandung Etil Alkohol (MMEA)",

      tanggalJamProduksiAwal: null,
      tanggalJamProduksiAkhir: null,
      periodeBulan: null,
      periodeTahun: null,
      totalJumlahKemasan: 0,
      totalJumlahKemasanDilekatiPita: 0,
      totalJumlahProduksi: 0,

      idMerkDetail: null,
      idMerkMmea: null,
      namaMerkMmea: null,
      isiMmea: null,
      tarifMmea: null,
      jenisKemasanMmea: null,
      negaraAsalMmea: null,

      nomorProduksi: null,
      tanggalProduksi: null,
      jumlahKemasan: null,
      jumlahProduksi: null,
      jumlahKemasanDilekatiPita: null,

      idKota: null,
      namaKota: null,
      namaPengusaha: null,

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

      dataSource: [],
      columns: [
        {
          title: "Aksi",
          dataIndex: "aksi",
          key: "aksi",
          fixed: "left",
          render: (text, record) => (
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <Button type="primary" icon="form" onClick={() => this.handleEditRincian(record)} />
              <Button type="danger" icon="close" onClick={() => this.handleDeleteRincian(record)} />
            </div>
          ),
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
      const newData = data?.map((item, index) => ({
        key: `mmea-detail-${index}`,

        idMerkMmea: item.id_merk_mmea,
        namaMerkMmea: item.nama_merk_mmea,
        isiMmea: +item.isi_per_kemasan || item.isi_per_kemasan,
        tarifMmea: +item.tarif_spesifik || item.tarif_spesifik,
        jenisKemasanMmea: item.jenis_kemasan,
        negaraAsalMmea: item.negara_asal_mmea,

        nomorProduksi: item.nomor_dok_produksi,
        tanggalProduksi: moment(formatDateFromExcelEpoch(item.tanggal_dok_produksi)).format(
          "DD-MM-YYYY"
        ),
        jumlahKemasan: +item.jumlah_kemasan || item.jumlah_kemasan,
        jumlahProduksi: +item.jumlah_produksi_mmea || item.jumlah_produksi_mmea,
        jumlahKemasanDilekatiPita: +item.jumlah_kemasan_berpita || item.jumlah_kemasan_berpita,
      }));

      this.setState({
        uraianRincianFile: [],
        dataSource: [...this.state.dataSource, ...newData],
      });
    });
  };
  handleDownloadTemplate = async (e) => {
    e.stopPropagation();

    const response = await requestApi({
      service: "s3",
      method: "get",
      endpoint: `/downloadFile/MpgBCAeAW6XX7VrEyFlfBw==/un8o8qvB9vnBl9rhg-Ofyw==/TmJv_JtjgSU2sZY9HQ4-H03emubFl-dc1IExY7vIwMMVr4plEGhxULtAsNWDNLeZDIYTYfQYnWYolCqgY6Lc5g==`,
      config: { responseType: "blob" },
      setLoading: (bool) => this.setState({ isDownloadTemplateLoading: bool }),
    });

    if (response) download(response.data, "template_ck4_mmea");
  };
  handleModalShow = (visibleState) => {
    this.setState({ [visibleState]: true });
  };
  handleModalClose = (visibleState) => {
    this.setState({ [visibleState]: false });
  };

  handleDataNppbkc = (record) => {
    this.setState({
      idNppbkc: record.nppbkc_id,
      nppbkc: record.nppbkc,
      namaNppbkc: record.nama_nppbkc,
      alamatNppbkc: record.alamat_nppbkc,
      npwpNppbkc: record.npwp_nppbkc,
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };
  handleDataMerkMmea = (record) => {
    this.setState({
      idMerkDetail: record.idMerkDetail,
      idMerkMmea: record.idMerkMmea,
      namaMerkMmea: record.namaMerkMmea,
      isiMmea: record.isiMmea,
      tarifMmea: record.tarifMmea,
      jenisKemasanMmea: record.jenisKemasanMmea,
      negaraAsalMmea: record.negaraAsalMmea,
    });
    this.handleModalClose("isModalDaftarMerkMmeaVisible");
  };
  handleDataKota = (record) => {
    this.setState({
      idKota: record.kota_id,
      namaKota: record.kota_name,
    });
    this.handleModalClose("isModalDaftarKotaVisible");
  };

  handleSimpanRincian = () => {
    const {
      idMerkDetail,
      idMerkMmea,
      namaMerkMmea,
      isiMmea,
      tarifMmea,
      jenisKemasanMmea,
      negaraAsalMmea,

      nomorProduksi,
      tanggalProduksi,
      jumlahKemasan,
      jumlahProduksi,
      jumlahKemasanDilekatiPita,
    } = this.state;

    this.setState({
      dataSource: [
        ...this.state.dataSource,
        {
          key: new Date().getTime(),

          idMerkDetail,
          idMerkMmea,
          namaMerkMmea,
          isiMmea,
          tarifMmea,
          jenisKemasanMmea,
          negaraAsalMmea,

          nomorProduksi,
          tanggalProduksi: moment(tanggalProduksi).format("DD-MM-YYYY"),
          jumlahKemasan,
          jumlahProduksi,
          jumlahKemasanDilekatiPita,
        },
      ],
    });

    this.setState({
      idMerkDetail: null,
      idMerkMmea: null,
      namaMerkMmea: null,
      isiMmea: null,
      tarifMmea: null,
      jenisKemasanMmea: null,
      negaraAsalMmea: null,

      nomorProduksi: null,
      tanggalProduksi: null,
      jumlahKemasan: null,
      jumlahProduksi: null,
      jumlahKemasanDilekatiPita: null,
    });
  };
  handleEditRincian = (record) => {
    this.setState({
      isEditRincian: true,
      editIndexRincian: record.key,

      idMerkDetail: record.idMerkDetail,
      idMerkMmea: record.idMerkMmea,
      namaMerkMmea: record.namaMerkMmea,
      isiMmea: record.isiMmea,
      tarifMmea: record.tarifMmea,
      jenisKemasanMmea: record.jenisKemasanMmea,
      negaraAsalMmea: record.negaraAsalMmea,

      nomorProduksi: record.nomorProduksi,
      tanggalProduksi: moment(record.tanggalProduksi, "DD-MM-YYYY"),
      jumlahKemasan: record.jumlahKemasan,
      jumlahProduksi: record.jumlahProduksi,
      jumlahKemasanDilekatiPita: record.jumlahKemasanDilekatiPita,
    });
  };
  handleUbahRincian = () => {
    const {
      idMerkDetail,
      idMerkMmea,
      namaMerkMmea,
      isiMmea,
      tarifMmea,
      jenisKemasanMmea,
      negaraAsalMmea,

      nomorProduksi,
      tanggalProduksi,
      jumlahKemasan,
      jumlahProduksi,
      jumlahKemasanDilekatiPita,
    } = this.state;

    const newDataSource = [...this.state.dataSource];
    const index = newDataSource.findIndex((item) => item.key === this.state.editIndexRincian);

    newDataSource.splice(index, 1, {
      key: new Date().getTime(),

      idMerkDetail,
      idMerkMmea,
      namaMerkMmea,
      isiMmea,
      tarifMmea,
      jenisKemasanMmea,
      negaraAsalMmea,

      nomorProduksi,
      tanggalProduksi: moment(tanggalProduksi).format("DD-MM-YYYY"),
      jumlahKemasan,
      jumlahProduksi,
      jumlahKemasanDilekatiPita,
    });
    this.setState({
      isEditRincian: false,
      editIndexRincian: null,

      idMerkDetail: null,
      idMerkMmea: null,
      namaMerkMmea: null,
      isiMmea: null,
      tarifMmea: null,
      jenisKemasanMmea: null,
      negaraAsalMmea: null,

      nomorProduksi: null,
      tanggalProduksi: null,
      jumlahKemasan: null,
      jumlahProduksi: null,
      jumlahKemasanDilekatiPita: null,
      dataSource: newDataSource,
    });
  };
  handleDeleteRincian = (record) => {
    const updatedDataSource = this.state.dataSource.filter((item) => item.key !== record.key);
    this.setState({ dataSource: updatedDataSource });
  };
  handleBatalEditRincian = () => {
    this.setState({
      isEditRincian: false,
      editIndexRincian: null,

      idMerkDetail: null,
      idMerkMmea: null,
      namaMerkMmea: null,
      isiMmea: null,
      jenisKemasanMmea: null,
      negaraAsalMmea: null,

      nomorProduksi: null,
      tanggalProduksi: null,
      jumlahKemasan: null,
      jumlahProduksi: null,
      jumlahKemasanDilekatiPita: null,
    });
  };
  handleReset = () => {
    this.setState({
      idMerkDetail: null,
      idMerkMmea: null,
      namaMerkMmea: null,
      isiMmea: null,
      tarifMmea: null,
      jenisKemasanMmea: null,
      negaraAsalMmea: null,

      nomorProduksi: null,
      tanggalProduksi: null,
      jumlahKemasan: null,
      jumlahProduksi: null,
      jumlahKemasanDilekatiPita: null,

      uraianRincianFile: [],
    });
  };
  handleRekam = async () => {
    const {
      idNppbkc,
      nppbkc,
      namaNppbkc,
      alamatNppbkc,
      npwpNppbkc,
      idJenisLaporan,
      nomorPemberitahuan,
      tanggalPemberitahuan,
      tanggalJamProduksiAwal,
      tanggalJamProduksiAkhir,
      periodeBulan,
      periodeTahun,
      totalJumlahKemasan,
      totalJumlahProduksi,
      totalJumlahKemasanDilekatiPita,
      namaKota,
      namaPengusaha,
      dataSource,
    } = this.state;

    const details = dataSource.map((item) => ({
      idMerkMmea: item.idMerkMmea,
      merkMmea: item.namaMerkMmea,
      isi: item.isiMmea,
      tarif: item.tarifMmea,
      negaraAsal: item.negaraAsalMmea,

      jenisKemasan: item.jenisKemasanMmea,
      nomorProduksi: item.nomorProduksi,
      tanggalProduksi: moment(item.tanggalProduksi, "DD-MM-YYYY").format("YYYY-MM-DD"),
      jumlahKemasan: item.jumlahKemasan,
      jumlahProduksi: item.jumlahProduksi,
      jumlahKemasanDilekatiPita: item.jumlahKemasanDilekatiPita,
    }));

    const payload = {
      idNppbkc: idNppbkc,
      nppbkc: nppbkc,
      namaPerusahaan: namaNppbkc,
      alamatPerusahaan: alamatNppbkc,
      npwp: npwpNppbkc,
      jenisLaporan: idJenisLaporan,
      nomorPemberitahuan: nomorPemberitahuan,
      tanggalPemberitahuan: moment(tanggalPemberitahuan).format("YYYY-MM-DD"),
      namaKota: namaKota,
      namaPengusaha: namaPengusaha,
      totalJumlahKemasan: totalJumlahKemasan,
      totalJumlahProduksi: totalJumlahProduksi,
      totalJumlahKemasanDilekatiPita: totalJumlahKemasanDilekatiPita,
      details,
    };

    if (idJenisLaporan === "HARIAN") {
      payload.tanggalJamProduksiAwal = moment(tanggalJamProduksiAwal, "DD-MM-YYYY HH:mm").toDate();
      payload.tanggalJamProduksiAkhir = moment(
        tanggalJamProduksiAkhir,
        "DD-MM-YYYY HH:mm"
      ).toDate();
    }

    if (idJenisLaporan === "BULANAN") {
      payload.periodeBulan = periodeBulan;
      payload.periodeTahun = periodeTahun;
    }

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: "/ck4/rekam-mmea",
      body: payload,
      setLoading: (bool) => this.setState({ isRekamLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.props.history.push(`${pathName}/laporan-ck4`);
    }
  };

  render() {
    return (
      <>
        <Container menuName="Laporan Produksi BKC CK4" contentName="MMEA Rekam" hideContentHeader>
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
                      <Input id="namaNppbkc" value={this.state.namaNppbkc} disabled />
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
                      onChange={(value) => this.handleSelectChange("idJenisLaporan", value)}
                      value={this.state.idJenisLaporan}
                      style={{ width: "100%" }}
                    >
                      {this.state.listJenisLaporan.length > 0 &&
                        this.state.listJenisLaporan.map((item, index) => (
                          <Select.Option key={`jenis-laporan-${index}`} value={item.idJenisLaporan}>
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
                      onChange={this.handleInputChange}
                      value={this.state.nomorPemberitahuan}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Pemberitahuan</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggalPemberitahuan"
                      format="DD-MM-YYYY"
                      onChange={(date) => this.handleDatepickerChange("tanggalPemberitahuan", date)}
                      value={this.state.tanggalPemberitahuan}
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Barang Kena Cukai</FormLabel>
                    </div>
                    <Input disabled value={this.state.jenisBarangKenaCukai} />
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
                          format="DD-MM-YYYY HH:mm"
                          onChange={(date) =>
                            this.handleDatepickerChange("tanggalJamProduksiAwal", date)
                          }
                          value={this.state.tanggalJamProduksiAwal}
                          style={{ width: "100%" }}
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
                          onChange={(date) =>
                            this.handleDatepickerChange("tanggalJamProduksiAkhir", date)
                          }
                          value={this.state.tanggalJamProduksiAkhir}
                          style={{ width: "100%" }}
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
                          onChange={(value) => this.handleSelectChange("periodeBulan", value)}
                          value={this.state.periodeBulan}
                          style={{ width: "100%" }}
                        >
                          {months.map((item, index) => (
                            <Select.Option key={`periode-bulan-${index}`} value={item.month_code}>
                              {item.month_name}
                            </Select.Option>
                          ))}
                        </Select>

                        <Select
                          id="periodeTahun"
                          onChange={(value) => this.handleSelectChange("periodeTahun", value)}
                          value={this.state.periodeTahun}
                          style={{ width: "100%" }}
                        >
                          {years.map((item, index) => (
                            <Select.Option key={`periode-tahun-${index}`} value={item.year_code}>
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

          <Header>{this.state.subtitle2}</Header>
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
                      <FormLabel>Merk MMEA</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input id="namaMerkMmea" value={this.state.namaMerkMmea} disabled />
                      <Button
                        type="default"
                        icon="menu"
                        onClick={() => this.handleModalShow("isModalDaftarMerkMmeaVisible")}
                      />
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
                        <Input
                          id="nomorProduksi"
                          onChange={this.handleInputChange}
                          value={this.state.nomorProduksi}
                        />
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tanggal Produksi</FormLabel>
                        </div>
                        <DatePicker
                          id="tanggalProduksi"
                          format="DD-MM-YYYY"
                          onChange={(date) => this.handleDatepickerChange("tanggalProduksi", date)}
                          value={this.state.tanggalProduksi}
                          style={{ width: "100%" }}
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
                            onChange={(value) =>
                              this.handleInputNumberChange("jumlahKemasan", value)
                            }
                            value={this.state.jumlahKemasan}
                            style={{ flex: 1 }}
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
                          onChange={(value) =>
                            this.handleInputNumberChange("jumlahProduksi", value)
                          }
                          value={this.state.jumlahProduksi}
                          style={{ width: "100%" }}
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
                          onChange={(value) =>
                            this.handleInputNumberChange("jumlahKemasanDilekatiPita", value)
                          }
                          value={this.state.jumlahKemasanDilekatiPita}
                          style={{ width: "100%" }}
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
                      >
                        <div style={{ display: "flex", gap: 10 }}>
                          <Button>
                            <Icon type="upload" /> Upload
                          </Button>

                          <ButtonCustom
                            variant="info"
                            loading={this.state.isDownloadTemplateLoading}
                            onClick={this.handleDownloadTemplate}
                          >
                            Download Template
                          </ButtonCustom>
                        </div>
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

            <Row style={{ marginTop: 20 }}>
              <Col span={8} offset={16}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    {this.state.isEditRincian ? (
                      <Button type="primary" block onClick={this.handleUbahRincian}>
                        Ubah Rincian
                      </Button>
                    ) : (
                      <Button type="primary" block onClick={this.handleSimpanRincian}>
                        Simpan Rincian
                      </Button>
                    )}
                  </Col>

                  <Col span={12}>
                    {this.state.isEditRincian ? (
                      <Button type="danger" block onClick={this.handleBatalEditRincian}>
                        Batal
                      </Button>
                    ) : (
                      <Button type="danger" block onClick={this.handleReset}>
                        Reset
                      </Button>
                    )}
                  </Col>
                </Row>
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

          <Header>{this.state.subtitle3}</Header>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
            <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
              <Col span={12}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Dibuat di Kota/Kabupaten</FormLabel>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Input id="namaKota" value={this.state.namaKota} disabled />
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
                    id="namaPengusaha"
                    onChange={this.handleInputChange}
                    value={this.state.namaPengusaha}
                  />
                </div>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
              <Col span={4}>
                <ButtonCustom variant="secondary" onClick={() => this.props.history.goBack()} block>
                  Kembali
                </ButtonCustom>
              </Col>

              <Col span={4}>
                <Button
                  type="primary"
                  loading={this.state.isRekamLoading}
                  onClick={this.handleRekam}
                  block
                >
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
          idJenisBkc={this.state.idJenisBkc}
        />

        <ModalDaftarMerkMMEACK4
          isVisible={this.state.isModalDaftarMerkMmeaVisible}
          onCancel={() => this.handleModalClose("isModalDaftarMerkMmeaVisible")}
          onDataDoubleClick={this.handleDataMerkMmea}
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
