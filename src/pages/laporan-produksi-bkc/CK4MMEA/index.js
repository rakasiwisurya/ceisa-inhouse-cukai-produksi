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
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import moment from "moment";
import React, { Component } from "react";
import { ExcelRenderer } from "react-excel-renderer";
import { convertArrayExcelToTable } from "utils/convertArrayExcelToTable";
import { sumArrayOfObject } from "utils/sumArrayOfObject";
import { months, years } from "utils/times";
import ModalDaftarKota from "../ModalDaftarKota";
import ModalDaftarMerkMMEA from "../ModalDaftarMerkMMEA";
import ModalDaftarNPPBKC from "../ModalDaftarNPPBKC";
import { requestApi } from "utils/requestApi";
import { pathName } from "configs/constants";
import { idMenu } from "utils/idMenu";
import ButtonCustom from "components/Button/ButtonCustom";

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

      nppbkc_id: "",
      nama_nppbkc: "",
      nppbkc: "",
      alamat_nppbkc: "",

      jenis_laporan_id: "",
      jenis_laporan_name: "",
      nomor_pemberitahuan: "",
      tanggal_pemberitahuan: "",
      jenis_barang_kena_cukai: "Minuman Mengandung Etil Alkohol (MMEA)",

      tanggal_jam_produksi_awal: "",
      tanggal_jam_produksi_akhir: "",
      periode_bulan: "",
      periode_tahun: "",
      total_jumlah_kemasan: 0,
      total_jumlah_kemasan_dilekati_pita: 0,
      total_jumlah_produksi: 0,

      jenis_mmea: "",
      merk_mmea_id: "",
      merk_mmea_name: "",
      isi_mmea: "",
      tarif_mmea: "",
      jenis_kemasan_mmea: "",
      golongan_mmea: "",
      kadar_mmea: "",

      nomor_produksi: "",
      tanggal_produksi: "",
      jumlah_kemasan: "",
      jumlah_produksi: "",
      jumlah_kemasan_dilekati_pita: "",

      kota_id: "",
      kota_name: "",
      nama_pengusaha: "",

      uraian_rincian_file: [],

      searchText: "",
      searchedColumn: "",
      page: 1,

      list_jenis_laporan: [
        {
          jenis_laporan_id: "HARIAN",
          jenis_laporan_name: "Harian",
        },
        {
          jenis_laporan_id: "BULANAN",
          jenis_laporan_name: "Bulanan",
        },
      ],

      dataSource: [],
      columns: [
        {
          title: "Aksi",
          dataIndex: "aksi",
          key: "aksi",
          fixed: "left",
          render: (text, record, index) => (
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <Button
                type="primary"
                icon="form"
                onClick={() => this.handleEditRincian(record, index)}
              />
              <Button type="danger" icon="close" onClick={() => this.handleDeleteRincian(index)} />
            </div>
          ),
        },
        {
          title: "Jenis MMEA",
          dataIndex: "jenis_mmea",
          key: "jenis_mmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenis_mmea"),
        },
        {
          title: "Merk MMEA",
          dataIndex: "merk_mmea_name",
          key: "merk_mmea_name",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("merk_mmea_name"),
        },
        {
          title: "Isi (ml)",
          dataIndex: "isi_mmea",
          key: "isi_mmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("isi_mmea"),
        },
        {
          title: "Kadar (%)",
          dataIndex: "kadar_mmea",
          key: "kadar_mmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("kadar_mmea"),
        },
        {
          title: "Tarif (Rp)",
          dataIndex: "tarif_mmea",
          key: "tarif_mmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tarif_mmea"),
        },
        {
          title: "Jenis Kemasan",
          dataIndex: "jenis_kemasan_mmea",
          key: "jenis_kemasan_mmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenis_kemasan_mmea"),
        },
        {
          title: "Golongan",
          dataIndex: "golongan_mmea",
          key: "golongan_mmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("golongan_mmea"),
        },
        {
          title: "Dokumen Produksi",
          children: [
            {
              title: "Nomor",
              dataIndex: "nomor_produksi",
              key: "nomor_produksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("nomor_produksi"),
            },
            {
              title: "Tanggal",
              dataIndex: "tanggal_produksi",
              key: "tanggal_produksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("tanggal_produksi"),
            },
          ],
        },
        {
          title: "Jumlah Kemasan",
          dataIndex: "jumlah_kemasan",
          key: "jumlah_kemasan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jumlah_kemasan"),
        },
        {
          title: "Jumlah Produksi",
          dataIndex: "jumlah_produksi",
          key: "jumlah_produksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jumlah_produksi"),
        },
        {
          title: "Jumlah Kemasan Dilekati Pita",
          dataIndex: "jumlah_kemasan_dilekati_pita",
          key: "jumlah_kemasan_dilekati_pita",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jumlah_kemasan_dilekati_pita"),
        },
      ],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataSource !== this.state.dataSource) {
      const { dataSource } = this.state;
      this.setState({
        total_jumlah_kemasan: sumArrayOfObject(dataSource, "jumlah_kemasan"),
        total_jumlah_kemasan_dilekati_pita: sumArrayOfObject(
          dataSource,
          "jumlah_kemasan_dilekati_pita"
        ),
        total_jumlah_produksi: sumArrayOfObject(dataSource, "jumlah_produksi"),
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
    this.setState({ searchText: "" });
  };
  handleTableChange = (page) => {
    this.setState({ page: page.current });
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
    ExcelRenderer(this.state.uraian_rincian_file[0], (err, res) => {
      if (err) return console.error(err);
      const data = convertArrayExcelToTable(res.rows);
      this.setState({ uraian_rincian_file: [], dataSource: [...this.state.dataSource, data] });
    });
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
  handleDataMerkMmea = (record) => {
    this.setState({
      jenis_mmea: record.jenis_mmea,
      merk_mmea_id: record.merk_mmea_id,
      merk_mmea_name: record.merk_mmea_name,
      isi_mmea: record.isi_mmea,
      tarif_mmea: record.tarif_mmea,
      jenis_kemasan_mmea: record.jenis_kemasan_mmea,
      golongan_mmea: record.golongan_mmea,
      kadar_mmea: record.kadar_mmea,
    });
    this.handleModalClose("isModalDaftarMerkMmeaVisible");
  };
  handleDataKota = (record) => {
    this.setState({
      kota_id: record.kota_id,
      kota_name: record.kota_name,
    });
    this.handleModalClose("isModalDaftarKotaVisible");
  };

  handleSimpanRincian = () => {
    const {
      jenis_mmea,
      merk_mmea_id,
      merk_mmea_name,
      isi_mmea,
      tarif_mmea,
      jenis_kemasan_mmea,
      golongan_mmea,
      kadar_mmea,

      nomor_produksi,
      tanggal_produksi,
      jumlah_kemasan,
      jumlah_produksi,
      jumlah_kemasan_dilekati_pita,
    } = this.state;

    this.setState({
      dataSource: [
        ...this.state.dataSource,
        {
          key: new Date().getTime(),
          jenis_mmea,
          merk_mmea_id,
          merk_mmea_name,
          isi_mmea,
          tarif_mmea,
          jenis_kemasan_mmea,
          golongan_mmea,
          kadar_mmea,

          nomor_produksi,
          tanggal_produksi: moment(tanggal_produksi).format("YYYY-MM-DD"),
          jumlah_kemasan,
          jumlah_produksi,
          jumlah_kemasan_dilekati_pita,
        },
      ],
    });

    this.setState({
      jenis_mmea: "",
      merk_mmea_id: "",
      merk_mmea_name: "",
      isi_mmea: "",
      tarif_mmea: "",
      jenis_kemasan_mmea: "",
      golongan_mmea: "",
      kadar_mmea: "",

      nomor_produksi: "",
      tanggal_produksi: "",
      jumlah_kemasan: "",
      jumlah_produksi: "",
      jumlah_kemasan_dilekati_pita: "",
    });
  };
  handleEditRincian = (record, index) => {
    this.setState({
      isEditRincian: true,
      editIndexRincian: index,
      jenis_mmea: record.jenis_mmea,
      merk_mmea_id: record.merk_mmea_id,
      merk_mmea_name: record.merk_mmea_name,
      isi_mmea: record.isi_mmea,
      tarif_mmea: record.tarif_mmea,
      jenis_kemasan_mmea: record.jenis_kemasan_mmea,
      golongan_mmea: record.golongan_mmea,
      kadar_mmea: record.kadar_mmea,

      nomor_produksi: record.nomor_produksi,
      tanggal_produksi: moment(record.tanggal_produksi),
      jumlah_kemasan: record.jumlah_kemasan,
      jumlah_produksi: record.jumlah_produksi,
      jumlah_kemasan_dilekati_pita: record.jumlah_kemasan_dilekati_pita,
    });
  };
  handleUbahRincian = () => {
    const {
      jenis_mmea,
      merk_mmea_id,
      merk_mmea_name,
      isi_mmea,
      tarif_mmea,
      jenis_kemasan_mmea,
      golongan_mmea,
      kadar_mmea,

      nomor_produksi,
      tanggal_produksi,
      jumlah_kemasan,
      jumlah_produksi,
      jumlah_kemasan_dilekati_pita,
    } = this.state;

    const newDataSource = this.state.dataSource.map((item) => item);
    newDataSource.splice(this.state.editIndexRincian, 1, {
      key: new Date().getTime(),
      jenis_mmea,
      merk_mmea_id,
      merk_mmea_name,
      isi_mmea,
      tarif_mmea,
      jenis_kemasan_mmea,
      golongan_mmea,
      kadar_mmea,

      nomor_produksi,
      tanggal_produksi: moment(tanggal_produksi).format("YYYY-MM-DD"),
      jumlah_kemasan,
      jumlah_produksi,
      jumlah_kemasan_dilekati_pita,
    });
    this.setState({
      isEditRincian: false,
      editIndexRincian: null,
      jenis_mmea: "",
      merk_mmea_id: "",
      merk_mmea_name: "",
      isi_mmea: "",
      tarif_mmea: "",
      jenis_kemasan_mmea: "",
      golongan_mmea: "",
      kadar_mmea: "",

      nomor_produksi: "",
      tanggal_produksi: "",
      jumlah_kemasan: "",
      jumlah_produksi: "",
      jumlah_kemasan_dilekati_pita: "",
      dataSource: newDataSource,
    });
  };
  handleDeleteRincian = (index) => {
    const newDataSource = this.state.dataSource.map((item) => item);
    newDataSource.splice(index, 1);
    this.setState({ dataSource: newDataSource });
  };
  handleBatalEditRincian = () => {
    this.setState({
      isEditRincian: false,
      editIndexRincian: null,
      jenis_mmea: "",
      merk_mmea_id: "",
      merk_mmea_name: "",
      isi_mmea: "",
      jenis_kemasan_mmea: "",
      golongan_mmea: "",
      kadar_mmea: "",

      nomor_produksi: "",
      tanggal_produksi: "",
      jumlah_kemasan: "",
      jumlah_produksi: "",
      jumlah_kemasan_dilekati_pita: "",
    });
  };
  handleReset = () => {
    this.setState({
      nppbkc_id: "",
      nama_nppbkc: "",
      nppbkc: "",
      alamat_nppbkc: "",

      jenis_laporan_id: "",
      jenis_laporan_name: "",
      nomor_pemberitahuan: "",
      tanggal_pemberitahuan: "",
      tanggal_jam_produksi_awal: "",
      tanggal_jam_produksi_akhir: "",
      periode_bulan: "",
      periode_tahun: "",

      jenis_mmea: "",
      merk_mmea_id: "",
      merk_mmea_name: "",
      isi_mmea: "",
      jenis_kemasan_mmea: "",
      golongan_mmea: "",
      kadar_mmea: "",

      nomor_produksi: "",
      tanggal_produksi: "",
      jumlah_kemasan: "",
      jumlah_produksi: "",
      jumlah_kemasan_dilekati_pita: "",
      uraian_rincian_file: [],
      dataSource: [],
    });
  };
  handleRekam = async () => {
    const {
      nppbkc_id,
      jenis_laporan_id,
      nomor_pemberitahuan,
      tanggal_pemberitahuan,
      tanggal_jam_produksi_awal,
      tanggal_jam_produksi_akhir,
      periode_bulan,
      periode_tahun,
      kota_id,
      nama_pengusaha,
      dataSource,
    } = this.state;

    const details = dataSource.map((item) => ({
      idMerkMmea: item.merk_mmea_id,
      nomorProduksi: item.nomor_produksi,
      tanggalProduksi: item.tanggal_produksi,
      jumlahKemasan: item.jumlah_kemasan,
      jumlahProduksi: item.jumlah_produksi,
      jumlahKemasanDilekatiPita: item.jumlah_kemasan_dilekati_pita,
    }));

    const payload = {
      idMenu: idMenu("ck4"),
      idNppbkc: nppbkc_id,
      jenisLaporan: jenis_laporan_id,
      nomorPemberitahuan: nomor_pemberitahuan,
      tanggalPemberitahuan: moment(tanggal_pemberitahuan).format("YYYY-MM-DD"),
      tanggalJamProduksiAwal: moment(tanggal_jam_produksi_awal).format("YYYY-MM-DD HH:mm"),
      tanggalJamProduksiAkhir: moment(tanggal_jam_produksi_akhir).format("YYYY-MM-DD HH:mm"),
      periodeBulan: periode_bulan,
      periodeTahun: periode_tahun,
      idKota: kota_id,
      namaPengusaha: nama_pengusaha,
      details,
    };

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
                      id="alamat_nppbkc"
                      onChange={this.handleInputChange}
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
                      onChange={(value) => this.handleSelectChange("jenis_laporan_id", value)}
                      value={this.state.jenis_laporan_id}
                      style={{ width: "100%" }}
                    >
                      {this.state.list_jenis_laporan.length > 0 &&
                        this.state.list_jenis_laporan.map((item, index) => (
                          <Select.Option
                            key={`jenis-laporan-${index}`}
                            value={item.jenis_laporan_id}
                          >
                            {item.jenis_laporan_name}
                          </Select.Option>
                        ))}
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
                <Card title="Data Produksi">
                  {this.state.jenis_laporan_id === "HARIAN" && (
                    <>
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
                    </>
                  )}

                  {this.state.jenis_laporan_id === "BULANAN" && (
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Periode</FormLabel>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Select
                          id="periode_bulan"
                          onChange={(value) => this.handleSelectChange("periode_bulan", value)}
                          value={this.state.periode_bulan}
                          style={{ width: "100%" }}
                        >
                          {months.map((item, index) => (
                            <Select.Option key={`periode-bulan-${index}`} value={item.month_code}>
                              {item.month_name}
                            </Select.Option>
                          ))}
                        </Select>

                        <Select
                          id="periode_tahun"
                          onChange={(value) => this.handleSelectChange("periode_tahun", value)}
                          value={this.state.periode_tahun}
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
                        id="total_jumlah_kemasan"
                        value={this.state.total_jumlah_kemasan}
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
                        id="total_jumlah_kemasan_dilekati_pita"
                        value={this.state.total_jumlah_kemasan_dilekati_pita}
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
                        id="total_jumlah_produksi"
                        value={this.state.total_jumlah_produksi}
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
                      <FormLabel>Jenis MMEA</FormLabel>
                    </div>
                    <Input
                      id="jenis_mmea"
                      value={this.state.jenis_mmea}
                      style={{ flex: 1 }}
                      disabled
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Merk MMEA</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input id="merk_mmea_name" value={this.state.merk_mmea_name} disabled />
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
                      <Input id="isi_mmea" value={this.state.isi_mmea} disabled />
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
                    <Input id="jenis_kemasan_mmea" value={this.state.jenis_kemasan_mmea} disabled />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Golongan</FormLabel>
                    </div>
                    <Input id="golongan_mmea" value={this.state.golongan_mmea} disabled />
                  </div>

                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Kadar</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input id="kadar_mmea" value={this.state.kadar_mmea} disabled />
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
                        <Input
                          id="nomor_produksi"
                          onChange={this.handleInputChange}
                          value={this.state.nomor_produksi}
                        />
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tanggal Produksi</FormLabel>
                        </div>
                        <DatePicker
                          id="tanggal_produksi"
                          onChange={(date) => this.handleDatepickerChange("tanggal_produksi", date)}
                          value={this.state.tanggal_produksi}
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
                            id="jumlah_kemasan"
                            onChange={(value) =>
                              this.handleInputNumberChange("jumlah_kemasan", value)
                            }
                            value={this.state.jumlah_kemasan}
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
                          id="jumlah_produksi"
                          onChange={(value) =>
                            this.handleInputNumberChange("jumlah_produksi", value)
                          }
                          value={this.state.jumlah_produksi}
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
                          id="jumlah_kemasan_dilekati_pita"
                          onChange={(value) =>
                            this.handleInputNumberChange("jumlah_kemasan_dilekati_pita", value)
                          }
                          value={this.state.jumlah_kemasan_dilekati_pita}
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
                        id="uraian_rincian_file"
                        name="uraian_rincian_file"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        customRequest={(options) =>
                          this.handleUploadFile("uraian_rincian_file", options)
                        }
                        onRemove={() => this.handleRemoveFile("uraian_rincian_file")}
                        fileList={this.state.uraian_rincian_file}
                      >
                        <Button>
                          <Icon type="upload" /> Upload
                        </Button>
                      </Upload>

                      <Button
                        type="primary"
                        onClick={this.handleInsertFileToTable}
                        style={{ marginTop: 10 }}
                        disabled={this.state.uraian_rincian_file.length === 0}
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
        />

        <ModalDaftarMerkMMEA
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
