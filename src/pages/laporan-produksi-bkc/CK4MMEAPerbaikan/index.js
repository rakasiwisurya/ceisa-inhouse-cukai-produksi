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
import ModalDaftarKota from "components/ModalDaftarKota";
import ModalDaftarMerkMMEACK4 from "components/ModalDaftarMerkMMEACK4";
import ModalDaftarNPPBKC from "components/ModalDaftarNppbkc";
import ModalDaftarPenjabatBc from "components/ModalDaftarPenjabatBc";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { ExcelRenderer } from "react-excel-renderer";
import { convertArrayExcelToTable } from "utils/convertArrayExcelToTable";
import { requestApi } from "utils/requestApi";
import { sumArrayOfObject } from "utils/sumArrayOfObject";
import { months, years } from "utils/times";

export default class CK4MMEAPerbaikan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pemrakarsa",
      subtitle2: "Pemberitahuan",
      subtitle3: "Rincian",
      subtitle4: "Keterangan Lain",
      subtitle5: "Dasar Perbaikan",

      isEditRincian: false,
      editIndexRincian: null,

      isSimpanPerbaikanLoading: false,
      isDetailLoading: true,
      isModalDaftarNppbkcVisible: false,
      isModalDaftarMerkMmeaVisible: false,
      isModalDaftarKotaVisible: false,
      isModalDaftarPenjabatBcVisible: false,

      jenis_bkc_id: 2,

      nama_pemrakarsa: null,
      id_process_pemrakarsa: null,
      jabatan_pemrakarsa: null,
      nip_pemrakarsa: null,

      nppbkc_id: null,
      nama_nppbkc: null,
      nppbkc: null,
      alamat_nppbkc: null,
      npwp_nppbkc: null,

      jenis_laporan_id: null,
      jenis_laporan_name: null,
      nomor_pemberitahuan: null,
      tanggal_pemberitahuan: null,
      jenis_barang_kena_cukai: "Minuman Mengandung Etil Alkohol (MMEA)",

      tanggal_jam_produksi_awal: null,
      tanggal_jam_produksi_akhir: null,
      periode_bulan: null,
      periode_tahun: null,
      total_jumlah_kemasan: 0,
      total_jumlah_kemasan_dilekati_pita: 0,
      total_jumlah_produksi: 0,

      ck4_detail_id: null,

      merk_detail_id: null,
      merk_mmea_id: null,
      merk_mmea_name: null,
      isi_mmea: null,
      tarif_mmea: null,
      jenis_kemasan_mmea: null,
      negara_asal_mmea: null,

      nomor_produksi: null,
      tanggal_produksi: null,
      jumlah_kemasan: null,
      jumlah_produksi: null,
      jumlah_kemasan_dilekati_pita: null,

      kota_id: null,
      kota_name: null,
      nama_pengusaha: null,

      nomor_surat: null,
      tanggal_surat: null,
      penjabat_bc_nip: null,
      penjabat_bc_name: null,
      keterangan_perbaikan: null,

      uraian_rincian_file: [],

      searchText: null,
      searchedColumn: null,
      page: 1,

      list_jenis_laporan: [
        {
          jenis_laporan_id: "HARIAN",
          jenis_laporan_name: "HARIAN",
        },
        {
          jenis_laporan_id: "BULANAN",
          jenis_laporan_name: "BULANAN",
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
              {record.idCk4Detail ? (
                <Button
                  type="danger"
                  icon="delete"
                  onClick={() => this.handleDeleteApi(index, record.idCk4Detail)}
                />
              ) : (
                <Button
                  type="danger"
                  icon="close"
                  onClick={() => this.handleDeleteRincian(index)}
                />
              )}
            </div>
          ),
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

  componentDidMount() {
    this.getDetailCk4Mmea();
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
        nama_pemrakarsa: data.namaPemrakarsa,
        id_process_pemrakarsa: data.idProcessPemrakarsa,
        jabatan_pemrakarsa: data.jabatanPemrakarsa,
        nip_pemrakarsa: data.nipPemrakarsa,

        nppbkc_id: data.idNppbkc,
        nama_nppbkc: data.namaNppbkc,
        nppbkc: data.nppbkc,
        alamat_nppbkc: data.alamatNppbkc,
        npwp_nppbkc: data.npwp,

        jenis_laporan_id: data.jenisLaporan,
        nomor_pemberitahuan: data.nomorPemberitahuan,
        tanggal_pemberitahuan: moment(data.tanggalPemberitahuan),

        tanggal_jam_produksi_awal: moment(data.tanggalJamProduksiAwal),
        tanggal_jam_produksi_akhir: moment(data.tanggalJamProduksiAkhir),
        periode_bulan: data.periodeBulan,
        periode_tahun: data.periodeTahun,

        kota_id: data.idKota,
        kota_name: data.namaKota,
        nama_pengusaha: data.namaPengusaha,
        dataSource: data.details.map((detail, index) => ({
          key: `ck4-${index}`,
          ck4_detail_id: detail.idCk4Detail,
          merk_detail_id: detail.idTarifMerkDetail,
          merk_mmea_id: detail.idMerkMmea,
          merk_mmea_name: detail.namaMerkMmea,
          isi_mmea: detail.isiMmea,
          tarif_mmea: detail.tarifMmea,
          jenis_kemasan_mmea: detail.jenisKemasanMmea,
          negara_asal_mmea: detail.negaraAsal,

          nomor_produksi: detail.nomorProduksi,
          tanggal_produksi: moment(detail.tanggalProduksi).format("YYYY-MM-DD"),
          jumlah_kemasan: detail.jumlahKemasan,
          jumlah_produksi: detail.jumlahProduksi,
          jumlah_kemasan_dilekati_pita: detail.jumlahKemasanDilekatiPita,
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
      npwp_nppbkc: record.npwp_nppbkc,
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };
  handleDataMerkMmea = (record) => {
    this.setState({
      merk_detail_id: record.merk_detail_id,
      merk_mmea_id: record.merk_mmea_id,
      merk_mmea_name: record.merk_mmea_name,
      isi_mmea: record.isi_mmea,
      tarif_mmea: record.tarif_mmea,
      jenis_kemasan_mmea: record.jenis_kemasan_mmea,
      negara_asal_mmea: record.negara_asal_mmea,
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
  handleDataPenjabatBc = (record) => {
    this.setState({
      penjabat_bc_nip: record.penjabat_bc_nip,
      penjabat_bc_name: record.penjabat_bc_name,
    });
    this.handleModalClose("isModalDaftarPenjabatBcVisible");
  };
  handleDeleteApi = async (index, id) => {
    const response = await requestApi({
      service: "produksi",
      method: "delete",
      endpoint: "/delete-detail-mmea",
      params: { idCk4Detail: id },
      setLoading: (bool) => this.setState({ isTableLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.handleDeleteRincian(index);
    }
  };

  handleSimpanRincian = () => {
    const {
      merk_detail_id,
      merk_mmea_id,
      merk_mmea_name,
      isi_mmea,
      tarif_mmea,
      jenis_kemasan_mmea,
      negara_asal_mmea,

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
          merk_detail_id,
          merk_mmea_id,
          merk_mmea_name,
          isi_mmea,
          tarif_mmea,
          jenis_kemasan_mmea,
          negara_asal_mmea,

          nomor_produksi,
          tanggal_produksi: moment(tanggal_produksi).format("DD-MM-YYYY"),
          jumlah_kemasan,
          jumlah_produksi,
          jumlah_kemasan_dilekati_pita,
        },
      ],
    });

    this.setState({
      merk_detail_id: null,
      merk_mmea_id: null,
      merk_mmea_name: null,
      isi_mmea: null,
      tarif_mmea: null,
      jenis_kemasan_mmea: null,
      negara_asal_mmea: null,

      nomor_produksi: null,
      tanggal_produksi: null,
      jumlah_kemasan: null,
      jumlah_produksi: null,
      jumlah_kemasan_dilekati_pita: null,
    });
  };
  handleEditRincian = (record, index) => {
    this.setState({
      isEditRincian: true,
      editIndexRincian: index,
      ck4_detail_id: record.ck4_detail_id,

      merk_detail_id: record.merk_detail_id,
      merk_mmea_id: record.merk_mmea_id,
      merk_mmea_name: record.merk_mmea_name,
      isi_mmea: record.isi_mmea,
      tarif_mmea: record.tarif_mmea,
      jenis_kemasan_mmea: record.jenis_kemasan_mmea,
      negara_asal_mmea: record.negara_asal_mmea,

      nomor_produksi: record.nomor_produksi,
      tanggal_produksi: moment(record.tanggal_produksi, "DD-MM-YYYY"),
      jumlah_kemasan: record.jumlah_kemasan,
      jumlah_produksi: record.jumlah_produksi,
      jumlah_kemasan_dilekati_pita: record.jumlah_kemasan_dilekati_pita,
    });
  };
  handleUbahRincian = () => {
    const {
      ck4_detail_id,

      merk_detail_id,
      merk_mmea_id,
      merk_mmea_name,
      isi_mmea,
      tarif_mmea,
      jenis_kemasan_mmea,
      negara_asal_mmea,

      nomor_produksi,
      tanggal_produksi,
      jumlah_kemasan,
      jumlah_produksi,
      jumlah_kemasan_dilekati_pita,
    } = this.state;

    const newDataSource = this.state.dataSource.map((item) => item);
    newDataSource.splice(this.state.editIndexRincian, 1, {
      key: new Date().getTime(),
      ck4_detail_id,

      merk_detail_id,
      merk_mmea_id,
      merk_mmea_name,
      isi_mmea,
      tarif_mmea,
      jenis_kemasan_mmea,
      negara_asal_mmea,

      nomor_produksi,
      tanggal_produksi: moment(tanggal_produksi).format("DD-MM-YYYY"),
      jumlah_kemasan,
      jumlah_produksi,
      jumlah_kemasan_dilekati_pita,
    });
    this.setState({
      isEditRincian: false,
      editIndexRincian: null,
      ck4_detail_id: null,

      merk_detail_id: null,
      merk_mmea_id: null,
      merk_mmea_name: null,
      isi_mmea: null,
      tarif_mmea: null,
      jenis_kemasan_mmea: null,
      negara_asal_mmea: null,

      nomor_produksi: null,
      tanggal_produksi: null,
      jumlah_kemasan: null,
      jumlah_produksi: null,
      jumlah_kemasan_dilekati_pita: null,
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
      ck4_detail_id: null,

      merk_detail_id: null,
      merk_mmea_id: null,
      merk_mmea_name: null,
      isi_mmea: null,
      jenis_kemasan_mmea: null,
      negara_asal_mmea: null,

      nomor_produksi: null,
      tanggal_produksi: null,
      jumlah_kemasan: null,
      jumlah_produksi: null,
      jumlah_kemasan_dilekati_pita: null,
    });
  };
  handleReset = () => {
    this.setState({
      ck4_detail_id: null,

      merk_detail_id: null,
      merk_mmea_id: null,
      merk_mmea_name: null,
      isi_mmea: null,
      jenis_kemasan_mmea: null,
      negara_asal_mmea: null,

      nomor_produksi: null,
      tanggal_produksi: null,
      jumlah_kemasan: null,
      jumlah_produksi: null,
      jumlah_kemasan_dilekati_pita: null,

      uraian_rincian_file: [],
    });
  };
  handleSimpanPerbaikan = async () => {
    const {
      nppbkc_id,
      nppbkc,
      nama_nppbkc,
      alamat_nppbkc,
      npwp_nppbkc,
      jenis_laporan_id,
      nomor_pemberitahuan,
      tanggal_pemberitahuan,
      tanggal_jam_produksi_awal,
      tanggal_jam_produksi_akhir,
      periode_bulan,
      periode_tahun,
      total_jumlah_kemasan,
      total_jumlah_kemasan_dilekati_pita,
      total_jumlah_produksi,

      kota_name,
      nama_pengusaha,
      nomor_surat,
      tanggal_surat,
      penjabat_bc_nip,
      penjabat_bc_name,
      keterangan_perbaikan,
      dataSource,
    } = this.state;

    const details = dataSource.map((item) => ({
      idCk4Detail: item.ck4_detail_id,
      idMerkMmea: item.merk_mmea_id,
      merkMmea: item.merk_mmea_name,
      isi: item.isi_mmea,
      tarif: item.tarif_mmea,
      jenisKemasan: item.jenis_kemasan_mmea,
      negaraAsal: item.negara_asal_mmea,

      nomorProduksi: item.nomor_produksi,
      tanggalProduksi: moment(item.tanggal_produksi, "DD-MM-YYYY").format("YYYY-MM-DD"),
      jumlahKemasan: item.jumlah_kemasan,
      jumlahProduksi: item.jumlah_produksi,
      jumlahKemasanDilekatiPita: item.jumlah_kemasan_dilekati_pita,
    }));

    const payload = {
      idCk4: this.props.match.params.id,
      idNppbkc: nppbkc_id,
      nppbkc: nppbkc,
      namaPerusahaan: nama_nppbkc,
      alamatPerusahaan: alamat_nppbkc,
      npwp: npwp_nppbkc,
      jenisLaporan: jenis_laporan_id,
      nomorPemberitahuan: nomor_pemberitahuan,
      tanggalPemberitahuan: moment(tanggal_pemberitahuan).format("YYYY-MM-DD"),
      totalJumlahKemasan: total_jumlah_kemasan,
      totalJumlahKemasanDilekatiPita: total_jumlah_kemasan_dilekati_pita,
      totalJumlahProduksi: total_jumlah_produksi,

      namaKota: kota_name,
      namaPengusaha: nama_pengusaha,
      nomorSurat: nomor_surat,
      tanggalSurat: moment(tanggal_surat).format("YYYY-MM-DD"),
      nipPenjabatBc: penjabat_bc_nip,
      namaPenjabat: penjabat_bc_name,
      keteranganPerbaikan: keterangan_perbaikan,
      details,
    };

    if (jenis_laporan_id === "HARIAN") {
      payload.tanggalJamProduksiAwal = moment(
        tanggal_jam_produksi_awal,
        "DD-MM-YYYY HH:mm"
      ).toDate();
      payload.tanggalJamProduksiAkhir = moment(
        tanggal_jam_produksi_akhir,
        "DD-MM-YYYY HH:mm"
      ).toDate();
    }

    if (jenis_laporan_id === "BULANAN") {
      payload.periodeBulan = periode_bulan;
      payload.periodeTahun = periode_tahun;
    }

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: "/ck4/perbaikan-mmea",
      body: payload,
      setLoading: (bool) => this.setState({ isSimpanPerbaikanLoading: bool }),
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
                    <Input id="nama_pemrakarsa" value={this.state.nama_pemrakarsa} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>ID Proses</FormLabel>
                    </div>
                    <Input
                      id="id_process_pemrakarsa"
                      value={this.state.id_process_pemrakarsa}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jabatan</FormLabel>
                    </div>
                    <Input id="jabatan_pemrakarsa" value={this.state.jabatan_pemrakarsa} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>NIP</FormLabel>
                    </div>
                    <Input id="nip_pemrakarsa" value={this.state.nip_pemrakarsa} disabled />
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
                          format="DD-MM-YYYY"
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
                              format="DD-MM-YYYY HH:mm"
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
                              format="DD-MM-YYYY HH:mm"
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
                                <Select.Option
                                  key={`periode-bulan-${index}`}
                                  value={item.month_code}
                                >
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
                        <Input
                          id="jenis_kemasan_mmea"
                          value={this.state.jenis_kemasan_mmea}
                          disabled
                        />
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
                              onChange={(date) =>
                                this.handleDatepickerChange("tanggal_produksi", date)
                              }
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

              <Header>{this.state.subtitle4}</Header>
              <div
                className="kt-content  kt-grid__item kt-grid__item--fluid"
                id="kt_content"
                style={{ paddingBottom: 10 }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
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
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nama Pengusaha</FormLabel>
                    </div>
                    <Input
                      id="nama_pengusaha"
                      onChange={this.handleInputChange}
                      value={this.state.nama_pengusaha}
                    />
                  </Col>
                </Row>
              </div>

              <Header>{this.state.subtitle5}</Header>
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor Surat</FormLabel>
                    </div>
                    <Input
                      id="nomor_surat"
                      onChange={this.handleInputChange}
                      value={this.state.nomor_surat}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Surat</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_surat"
                      format="DD-MM-YYYY"
                      onChange={(date) => this.handleDatepickerChange("tanggal_surat", date)}
                      style={{ width: "100%" }}
                      value={this.state.tanggal_surat}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Penjabat BC</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input
                        id="penjabat_bc_nip"
                        onChange={this.handleInputChange}
                        value={this.state.penjabat_bc_nip}
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
                        id="penjabat_bc_name"
                        onChange={this.handleInputChange}
                        value={this.state.penjabat_bc_name}
                        style={{ flex: 2 }}
                        disabled
                      />
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Keterangan</FormLabel>
                    </div>
                    <Input.TextArea
                      id="keterangan_perbaikan"
                      onChange={this.handleInputChange}
                      value={this.state.keterangan_perbaikan}
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
                      type="primary"
                      loading={this.state.isSimpanPerbaikanLoading}
                      onClick={this.handleSimpanPerbaikan}
                      block
                    >
                      Simpan Perbaikan
                    </Button>
                  </Col>
                </Row>
              </div>
            </>
          )}
        </Container>

        <ModalDaftarNPPBKC
          isVisible={this.state.isModalDaftarNppbkcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarNppbkcVisible")}
          onDataDoubleClick={this.handleDataNppbkc}
          idJenisBkc={this.state.jenis_bkc_id}
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

        <ModalDaftarPenjabatBc
          isVisible={this.state.isModalDaftarPenjabatBcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarPenjabatBcVisible")}
          onDataDoubleClick={this.handleDataPenjabatBc}
        />
      </>
    );
  }
}
