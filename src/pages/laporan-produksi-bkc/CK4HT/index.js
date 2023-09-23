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
import ModalDaftarHTCK4 from "components/ModalDaftarMerkHTCK4";
import ModalDaftarNPPBKC from "components/ModalDaftarNppbkc";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { ExcelRenderer } from "react-excel-renderer";
import { convertArrayExcelToTable } from "utils/convertArrayExcelToTable";
import { requestApi } from "utils/requestApi";
import { sumArrayOfObject } from "utils/sumArrayOfObject";
import { months, years } from "utils/times";

export default class CK4HT extends Component {
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
      isModalDaftarMerkHtVisible: false,
      isModalDaftarKotaVisible: false,

      jenis_bkc_id: 3,

      nppbkc_id: null,
      nama_nppbkc: null,
      nppbkc: null,
      alamat_nppbkc: null,
      npwp_nppbkc: null,

      jenis_laporan_id: "BULANAN",
      jenis_laporan_name: "Bulanan",
      nomor_pemberitahuan: null,
      tanggal_pemberitahuan: null,
      jenis_barang_kena_cukai: "Hasil Tembakau (HT)",

      periode_bulan: null,
      periode_tahun: null,
      tanggal_produksi_awal: null,
      tanggal_produksi_akhir: null,
      total_jumlah_kemasan: 0,
      total_jumlah_kemasan_dilekati_pita: 0,
      total_jumlah_produksi_ht_btg: 0,
      total_jumlah_produksi_ht_gr: 0,
      total_jumlah_produksi_ht_ml: 0,

      merk_ht_id: null,
      merk_ht_name: null,
      jenis_ht: null,
      hje_ht: null,
      isi_ht: null,
      bahan_ht: null,
      tarif_ht: null,
      satuan_ht: null,

      nomor_produksi: null,
      tanggal_produksi: null,
      jumlah_kemasan: null,
      jumlah_produksi: null,
      jumlah_kemasan_dilekati_pita: null,

      uraian_rincian_file: [],

      searchText: null,
      searchedColumn: null,
      page: 1,

      kota_id: null,
      kota_name: null,
      nama_pengusaha: null,

      columns: [
        {
          title: "Aksi",
          dataIndex: "aksi",
          key: "aksi",
          fixed: "left",
          render: (text, record, index) => (
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <Button type="primary" icon="form" onClick={() => this.handleEditRincian(record)} />
              <Button type="danger" icon="close" onClick={() => this.handleDeleteRincian(record)} />
            </div>
          ),
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
          title: "Jenis HT",
          dataIndex: "jenis_ht",
          key: "jenis_ht",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenis_ht"),
        },
        {
          title: "Merk",
          dataIndex: "merk_ht_name",
          key: "merk_ht_name",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("merk_ht_name"),
        },
        {
          title: "HJE",
          dataIndex: "hje_ht",
          key: "hje_ht",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("hje_ht"),
        },
        {
          title: "Tarif",
          dataIndex: "tarif_ht",
          key: "tarif_ht",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tarif_ht"),
        },
        {
          title: "Kemasan",
          children: [
            {
              title: "Bahan",
              dataIndex: "bahan_ht",
              key: "bahan_ht",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("bahan_ht"),
            },
            {
              title: "Isi",
              dataIndex: "isi_ht",
              key: "isi_ht",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("isi_ht"),
            },
            {
              title: "Satuan",
              dataIndex: "satuan_ht",
              key: "satuan_ht",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("satuan_ht"),
            },
            {
              title: "Jumlah",
              dataIndex: "jumlah_kemasan",
              key: "jumlah_kemasan",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("jumlah_kemasan"),
            },
          ],
        },
        {
          title: "Jumlah Isi",
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
      dataSource: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataSource !== this.state.dataSource) {
      const { dataSource } = this.state;

      const jumlahProduksiBtg = dataSource.filter(
        (item) => item.satuan_ht === "BTG" || item.satuan_ht === "btg"
      );
      const jumlahProduksiGr = dataSource.filter(
        (item) => item.satuan_ht === "GR" || item.satuan_ht === "gr"
      );
      const jumlahProduksiMl = dataSource.filter(
        (item) => item.satuan_ht === "ML" || item.satuan_ht === "ml"
      );

      this.setState({
        total_jumlah_kemasan: sumArrayOfObject(dataSource, "jumlah_kemasan"),
        total_jumlah_kemasan_dilekati_pita: sumArrayOfObject(
          dataSource,
          "jumlah_kemasan_dilekati_pita"
        ),
        total_jumlah_produksi_ht_btg: sumArrayOfObject(jumlahProduksiBtg, "jumlah_produksi"),
        total_jumlah_produksi_ht_gr: sumArrayOfObject(jumlahProduksiGr, "jumlah_produksi"),
        total_jumlah_produksi_ht_ml: sumArrayOfObject(jumlahProduksiMl, "jumlah_produksi"),
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
    this.setState({ ...this.state, [field]: value });
  };
  handleDatepickerChange = (field, value) => {
    this.setState({ ...this.state, [field]: value });
  };
  handleSelectChange = (field, value) => {
    this.setState({ ...this.state, [field]: value });
  };
  handleUploadFileChange = (field, file, fileList) => {
    this.setState({ ...this.state, [field]: [file] });
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
      this.setState({ uraian_rincian_file: [], dataSource: [...this.state.dataSource, ...data] });
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
      npwp_nppbkc: record.npwp_nppbkc,
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };
  handleDataMerkHt = (record) => {
    this.setState({
      merk_ht_id: record.merk_ht_id,
      merk_ht_name: record.merk_ht_name,
      jenis_ht: record.jenis_produksi_ht,
      hje_ht: record.hje_ht,
      isi_ht: record.isi_ht,
      bahan_ht: record.bahan_ht,
      tarif_ht: record.tarif_ht,
      satuan_ht: record.satuan_ht,
    });
    this.handleModalClose("isModalDaftarMerkHtVisible");
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
      merk_ht_id,
      merk_ht_name,
      jenis_ht,
      hje_ht,
      isi_ht,
      bahan_ht,
      tarif_ht,
      satuan_ht,

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
          merk_ht_id,
          merk_ht_name,
          jenis_ht,
          hje_ht,
          isi_ht,
          bahan_ht,
          tarif_ht,
          satuan_ht,

          nomor_produksi,
          tanggal_produksi: moment(tanggal_produksi).format("DD-MM-YYYY"),
          jumlah_kemasan,
          jumlah_produksi,
          jumlah_kemasan_dilekati_pita,
        },
      ],
    });

    this.setState({
      merk_ht_id: null,
      merk_ht_name: null,
      jenis_ht: null,
      hje_ht: null,
      isi_ht: null,
      bahan_ht: null,
      tarif_ht: null,
      satuan_ht: null,

      nomor_produksi: null,
      tanggal_produksi: null,
      jumlah_kemasan: null,
      jumlah_produksi: null,
      jumlah_kemasan_dilekati_pita: null,
    });
  };
  handleEditRincian = (record) => {
    this.setState({
      isEditRincian: true,
      editIndexRincian: record.key,
      merk_ht_id: record.merk_ht_id,
      merk_ht_name: record.merk_ht_name,
      jenis_ht: record.jenis_ht,
      hje_ht: record.hje_ht,
      isi_ht: record.isi_ht,
      bahan_ht: record.bahan_ht,
      tarif_ht: record.tarif_ht,
      satuan_ht: record.satuan_ht,

      nomor_produksi: record.nomor_produksi,
      tanggal_produksi: moment(record.tanggal_produksi, "DD-MM-YYYY"),
      jumlah_kemasan: record.jumlah_kemasan,
      jumlah_produksi: record.jumlah_produksi,
      jumlah_kemasan_dilekati_pita: record.jumlah_kemasan_dilekati_pita,
    });
  };
  handleUbahRincian = () => {
    const {
      merk_ht_id,
      merk_ht_name,
      jenis_ht,
      hje_ht,
      isi_ht,
      bahan_ht,
      tarif_ht,
      satuan_ht,

      nomor_produksi,
      tanggal_produksi,
      jumlah_kemasan,
      jumlah_produksi,
      jumlah_kemasan_dilekati_pita,
    } = this.state;

    const newDataSource = [...this.state.dataSource];
    const index = newDataSource.findIndex((item) => item.key === this.state.editIndexRincian);
    newDataSource.splice(index, 1, {
      key: new Date().getTime(),
      merk_ht_id,
      merk_ht_name,
      jenis_ht,
      hje_ht,
      isi_ht,
      bahan_ht,
      tarif_ht,
      satuan_ht,

      nomor_produksi,
      tanggal_produksi: moment(tanggal_produksi).format("DD-MM-YYYY"),
      jumlah_kemasan,
      jumlah_produksi,
      jumlah_kemasan_dilekati_pita,
    });
    this.setState({
      isEditRincian: false,
      editIndexRincian: null,
      merk_ht_id: null,
      merk_ht_name: null,
      jenis_ht: null,
      hje_ht: null,
      isi_ht: null,
      bahan_ht: null,
      tarif_ht: null,
      satuan_ht: null,

      nomor_produksi: null,
      tanggal_produksi: null,
      jumlah_kemasan: null,
      jumlah_produksi: null,
      jumlah_kemasan_dilekati_pita: null,
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
      merk_ht_id: null,
      merk_ht_name: null,
      jenis_ht: null,
      hje_ht: null,
      isi_ht: null,
      bahan_ht: null,
      tarif_ht: null,
      satuan_ht: null,

      nomor_produksi: null,
      tanggal_produksi: null,
      jumlah_kemasan: null,
      jumlah_produksi: null,
      jumlah_kemasan_dilekati_pita: null,
    });
  };
  handleReset = () => {
    this.setState({
      merk_ht_id: null,
      merk_ht_name: null,
      jenis_ht: null,
      hje_ht: null,
      isi_ht: null,
      bahan_ht: null,
      tarif_ht: null,
      satuan_ht: null,

      nomor_produksi: null,
      tanggal_produksi: null,
      jumlah_kemasan: null,
      jumlah_produksi: null,
      jumlah_kemasan_dilekati_pita: null,

      uraian_rincian_file: [],
    });
  };
  handleRekam = async () => {
    const {
      nppbkc_id,
      nppbkc,
      nama_nppbkc,
      alamat_nppbkc,
      npwp_nppbkc,
      jenis_laporan_id,
      nomor_pemberitahuan,
      tanggal_pemberitahuan,
      periode_bulan,
      periode_tahun,
      tanggal_produksi_awal,
      tanggal_produksi_akhir,
      total_jumlah_kemasan,
      total_jumlah_kemasan_dilekati_pita,
      total_jumlah_produksi_ht_btg,
      total_jumlah_produksi_ht_gr,
      total_jumlah_produksi_ht_ml,
      kota_name,
      nama_pengusaha,
      dataSource,
    } = this.state;

    const details = dataSource.map((item) => ({
      idMerkHt: item.merk_ht_id,
      namaMerkHt: item.merk_ht_name,
      bahanKemasan: item.bahan_ht,
      hje: item.hje_ht,
      isiPerKemasan: item.isi_ht,
      tarif: item.tarif_ht,
      jenisProduksiHt: item.jenis_ht,
      nomorProduksi: item.nomor_produksi,
      tanggalProduksi: moment(item.tanggal_produksi, "DD-MM-YYYY").format("YYYY-MM-DD"),
      jumlahKemasan: item.jumlah_kemasan,
      jumlahProduksi: item.jumlah_produksi,
      jumlahKemasanDilekatiPita: item.jumlah_kemasan_dilekati_pita,
    }));

    const payload = {
      details,
      alamatPerusahaan: alamat_nppbkc,
      idNppbkc: nppbkc_id,
      jenisLaporan: jenis_laporan_id,
      namaKota: kota_name,
      namaPengusaha: nama_pengusaha,
      namaPerusahaan: nama_nppbkc,
      nomorPemberitahuan: nomor_pemberitahuan,
      nppbkc: nppbkc,
      npwp: npwp_nppbkc,
      periodeBulan: periode_bulan,
      periodeTahun: periode_tahun,
      tanggalProduksiAkhir: moment(tanggal_produksi_akhir).format("YYYY-MM-DD"),
      tanggalProduksiAwal: moment(tanggal_produksi_awal).format("YYYY-MM-DD"),
      tanggalPemberitahuan: moment(tanggal_pemberitahuan).format("YYYY-MM-DD"),
      totalJumlahKemasan: total_jumlah_kemasan,
      totalJumlahKemasanDilekatiPita: total_jumlah_kemasan_dilekati_pita,
      totalJumlahProduksiHtBtg: total_jumlah_produksi_ht_btg,
      totalJumlahProduksiHtGr: total_jumlah_produksi_ht_gr,
      totalJumlahProduksiHtMl: total_jumlah_produksi_ht_ml,
    };

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: "/ck4/rekam-ht",
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
        <Container menuName="Laporan Produksi BKC CK4" contentName="HT Rekam" hideContentHeader>
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
                    <Input id="nppbkc" value={this.state.nppbkc} disabled />
                  </div>

                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Alamat</FormLabel>
                    </div>
                    <Input.TextArea id="alamat_nppbkc" value={this.state.alamat_nppbkc} disabled />
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
                      value={this.state.jenis_laporan_id}
                      style={{ width: "100%" }}
                      disabled
                    >
                      <Select.Option value={this.state.jenis_laporan_id}>
                        {this.state.jenis_laporan_name}
                      </Select.Option>
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
                      format="DD-MM-YYYY"
                      value={this.state.tanggal_pemberitahuan}
                      onChange={(date) =>
                        this.handleDatepickerChange("tanggal_pemberitahuan", date)
                      }
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

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Produksi</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <DatePicker
                        id="tanggal_produksi_awal"
                        format="DD-MM-YYYY"
                        onChange={(date) =>
                          this.handleDatepickerChange("tanggal_produksi_awal", date)
                        }
                        value={this.state.tanggal_produksi_awal}
                      />
                      <div>s/d</div>
                      <DatePicker
                        id="tanggal_produksi_akhir"
                        format="DD-MM-YYYY"
                        onChange={(date) =>
                          this.handleDatepickerChange("tanggal_produksi_akhir", date)
                        }
                        value={this.state.tanggal_produksi_akhir}
                      />
                    </div>
                  </div>

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

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Produksi HT (btg)</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input
                        id="total_jumlah_produksi_ht_btg"
                        value={this.state.total_jumlah_produksi_ht_btg}
                        disabled
                      />
                      <div>Batang</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Produksi HT (gr)</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input
                        id="total_jumlah_produksi_ht_gr"
                        value={this.state.total_jumlah_produksi_ht_gr}
                        disabled
                      />
                      <div>Gram</div>
                    </div>
                  </div>

                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Produksi HT (ml)</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input
                        id="total_jumlah_produksi_ht_ml"
                        value={this.state.total_jumlah_produksi_ht_ml}
                        disabled
                      />
                      <div>mililiter</div>
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
                      <FormLabel>Merk HT</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input id="merk_ht_name" value={this.state.merk_ht_name} disabled />
                      <Button
                        type="default"
                        icon="menu"
                        onClick={() => this.handleModalShow("isModalDaftarMerkHtVisible")}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Hasil Tembakau</FormLabel>
                    </div>
                    <Input id="jenis_ht" value={this.state.jenis_ht} disabled />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>HJE</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input id="hje_ht" value={this.state.hje_ht} disabled />
                      <div>Rupiah</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Bahan Kemasan</FormLabel>
                    </div>
                    <Input id="bahan_ht" value={this.state.bahan_ht} disabled />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Isi per Kemasan</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input id="isi_ht" value={this.state.isi_ht} disabled />
                      {this.state.satuan_ht && <div>{this.state.satuan_ht}</div>}
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
                          format="DD-MM-YYYY"
                          value={this.state.tanggal_produksi}
                          onChange={(date) => this.handleDatepickerChange("tanggal_produksi", date)}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </Card>
                  </Col>

                  <Col span={24}>
                    <Card title="Jumlah Produksi dan Kemasan">
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
                          <div>Kemasan</div>
                        </div>
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jumlah Produksi per Merk</FormLabel>
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
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <InputNumber
                            id="jumlah_kemasan_dilekati_pita"
                            onChange={(value) =>
                              this.handleInputNumberChange("jumlah_kemasan_dilekati_pita", value)
                            }
                            value={this.state.jumlah_kemasan_dilekati_pita}
                            style={{ flex: 1 }}
                          />
                          <div>Kemasan</div>
                        </div>
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

            <div style={{ marginTop: 20, marginBottom: 10 }}>
              <Table
                columns={this.state.columns}
                dataSource={this.state.dataSource}
                scroll={{ x: "max-content" }}
                onChange={this.handleTableChange}
                pagination={{ current: this.state.page }}
                footer={(currentPageData) => {
                  return (
                    <Table
                      style={{ margin: -16 }}
                      showHeader={false}
                      pagination={false}
                      columns={[
                        {
                          key: "title",
                          title: "Title",
                          dataIndex: "title",
                          render: (text, record, index) => (
                            <div style={{ textAlign: "right" }}>{text}</div>
                          ),
                        },
                        {
                          key: "data",
                          title: "Data",
                          dataIndex: "data",
                          width: 80,
                          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                        },
                      ]}
                      dataSource={[
                        {
                          key: "1",
                          title: "Jumlah Kemasan",
                          data: this.state.total_jumlah_kemasan,
                        },
                        {
                          key: "2",
                          title: "Jumlah Kemasan Dilekati Pita",
                          data: this.state.total_jumlah_kemasan_dilekati_pita,
                        },
                        {
                          key: "3",
                          title: "Jumlah Batang",
                          data: this.state.total_jumlah_produksi_ht_btg,
                        },
                        {
                          key: "4",
                          title: "Jumlah Gram",
                          data: this.state.total_jumlah_produksi_ht_gr,
                        },
                        {
                          key: "5",
                          title: "Jumlah Militer",
                          data: this.state.total_jumlah_produksi_ht_ml,
                        },
                      ]}
                    />
                  );
                }}
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
          idJenisBkc={this.state.jenis_bkc_id}
        />

        <ModalDaftarHTCK4
          isVisible={this.state.isModalDaftarMerkHtVisible}
          onCancel={() => this.handleModalClose("isModalDaftarMerkHtVisible")}
          onDataDoubleClick={this.handleDataMerkHt}
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
