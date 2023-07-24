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
import ModalDaftarHT from "../ModalDaftarMerkHT";
import ModalDaftarNPPBKC from "../ModalDaftarNPPBKC";
import { requestApi } from "utils/requestApi";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import ButtonCustom from "components/Button/ButtonCustom";
import ModalDaftarPenjabatBc from "../ModalDaftarPenjabatBC";
import { pathName } from "configs/constants";

export default class CK4HTPerbaikan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pemrakarsa",
      subtitle2: "Pemberitahuan",
      subtitle3: "Rincian",
      subtitle4: "Keterangan Lain",
      subtitle5: "Dasar Perbaikan",

      isSimpanPerbaikanLoading: false,
      isDetailLoading: true,
      isModalDaftarNppbkcVisible: false,
      isModalDaftarMerkHtVisible: false,
      isModalDaftarKotaVisible: false,
      isModalDaftarPenjabatBcVisible: false,

      nppbkc_id: "",
      nama_nppbkc: "",
      nppbkc: "",
      alamat_nppbkc: "",

      jenis_laporan_id: "BULANAN",
      jenis_laporan_name: "Bulanan",
      nomor_pemberitahuan: "",
      tanggal_pemberitahuan: "",
      jenis_barang_kena_cukai: "Hasil Tembakau (HT)",

      periode_bulan: "",
      periode_tahun: "",
      tanggal_produksi_awal: "",
      tanggal_produksi_akhir: "",
      total_jumlah_kemasan: 0,
      total_jumlah_kemasan_dilekati_pita: 0,
      total_jumlah_produksi_ht_btg: 0,
      total_jumlah_produksi_ht_gr: 0,
      total_jumlah_produksi_ht_ml: 0,

      merk_ht_id: "",
      merk_ht_name: "",
      jenis_ht: "",
      hje_ht: "",
      isi_ht: "",
      bahan_ht: "",
      tarif_ht: "",
      satuan_ht: "",

      nomor_produksi: "",
      tanggal_produksi: "",
      jumlah_kemasan: "",
      jumlah_produksi: "",
      jumlah_kemasan_dilekati_pita: "",

      tanggal_diterima: "",
      penyampaian_ck4_id: "",
      penyampaian_ck4_name: "",
      kota_id: "",
      kota_name: "",
      nama_pengusaha: "",

      nomor_surat: "",
      tanggal_surat: "",
      penjabat_bc_nip: "",
      penjabat_bc_name: "",
      asal_kesalahan_id: "",
      asal_kesalahan_name: "",
      keterangan_perbaikan: "",

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
      list_penyampaian_ck4: [
        {
          penyampaian_ck4_id: "TEPAT WAKTU",
          penyampaian_ck4_name: "Tepat Waktu",
        },
        {
          penyampaian_ck4_id: "TERLAMBAT",
          penyampaian_ck4_name: "Terlambat",
        },
      ],
      list_asal_kesalahan: [
        {
          asal_kesalahan_id: "PENGGUNA JASA",
          asal_kesalahan_name: "Pengguna Jasa",
        },
        {
          asal_kesalahan_id: "PENGAWAS/PETUGAS",
          asal_kesalahan_name: "Pengawas/Petugas",
        },
        {
          asal_kesalahan_id: "APLIKASI SAC-2",
          asal_kesalahan_name: "Aplikasi SAC-2",
        },
        {
          asal_kesalahan_id: "JARINGAN",
          asal_kesalahan_name: "Jaringan",
        },
        {
          asal_kesalahan_id: "LAINNYA",
          asal_kesalahan_name: "Lainnya",
        },
      ],

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
              {/* <Button type="danger" icon="close" onClick={() => this.handleDeleteRincian(index)} /> */}
              {record.idCk4Detail ? (
                <Button
                  type="danger"
                  icon="delete"
                  onClick={() => this.handleDeleteApi(index, record.idCk4Detail)}
                />
              ) : (
                <Button type="danger" icon="close" onClick={() => this.handleDeleteRincian(index)} />
              )}
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
              render: (text) => 
                <div style={{ textAlign: "center" }}>
                  {text ? moment(text).format("DD-MM-YYYY") : "-"}
                </div>,
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

      list_nama_nppbkc: [
        {
          nama_nppbkc_code: "A",
          nama_nppbkc_name: "A",
        },
        {
          nama_nppbkc_code: "B",
          nama_nppbkc_name: "B",
        },
      ],
    };
  }

  componentDidMount() {
    this.getDetailCk4Ht();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataSource !== this.state.dataSource) {
      const { dataSource } = this.state;

      const jumlahProduksiBtg = dataSource.filter((item) => item.satuan_ht === "BTG");
      const jumlahProduksiGr = dataSource.filter((item) => item.satuan_ht === "GR");
      const jumlahProduksiMl = dataSource.filter((item) => item.satuan_ht === "ML");

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

  getDetailCk4Ht = async () => {
    const payload = { idCk4: this.props.match.params.id };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/ck4/detail-ht",
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

        jenis_laporan_id: data.jenisLaporan,
        nomor_pemberitahuan: data.nomorPemberitahuan,
        tanggal_pemberitahuan: moment(data.tanggalPemberitahuan),

        periode_bulan: data.periodeBulan,
        periode_tahun: data.periodeTahun,
        tanggal_produksi_awal: moment(data.tanggalProduksiAwal),
        tanggal_produksi_akhir: moment(data.tanggalProduksiAkhir),

        kota_id: data.idKota,
        kota_name: data.namaKota,
        nama_pengusaha: data.namaPengusaha,

        dataSource: data.details.map((detail, index) => ({
          key: `ck4-${index}`,
          idCk4Detail: detail.idCk4Detail,
          merk_ht_id: detail.idMerkHt,
          merk_ht_name: detail.namaMerkHt,
          jenis_ht: detail.jenisHt,
          hje_ht: detail.hjeHt,
          isi_ht: detail.isiHt,
          bahan_ht: detail.bahanHt,
          tarif_ht: detail.tarifHt,
          satuan_ht: detail.satuanHt,

          nomor_produksi: detail.nomorProduksi,
          tanggal_produksi: moment(detail.tanggalProduksi),
          jumlah_kemasan: detail.jumlahKemasan,
          jumlah_produksi: detail.jumlahProduksi,
          jumlah_kemasan_dilekati_pita: detail.jumlahKemasanDilekatiPita,
        })),
      });
    }
  };

  handleDeleteApi = async (index, id) => {
    const payload = { idCk4Detail : id }
    console.log(payload)
    const response = await requestApi({
      service: "produksi",
      method: "delete",
      endpoint: "/delete-detail-ht",
      params: payload,
      setLoading: (bool) => this.setState({ isTableLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.handleDeleteRincian(index);
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
    this.setState({ searchText: "" });
  };
  handleTableChange = (page) => {
    this.setState({ page: page.current });
  };

  handleInputChange = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
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
  handleDataMerkHt = (record) => {
    this.setState({
      merk_ht_id: record.merk_ht_id,
      merk_ht_name: record.merk_ht_name,
      jenis_ht: record.jenis_ht,
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
  handleDataPenjabatBc = (record) => {
    this.setState({
      penjabat_bc_nip: record.penjabat_bc_nip,
      penjabat_bc_name: record.penjabat_bc_name,
    });
    this.handleModalClose("isModalDaftarPenjabatBcVisible");
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
          tanggal_produksi: moment(tanggal_produksi).format("YYYY-MM-DD"),
          jumlah_kemasan,
          jumlah_produksi,
          jumlah_kemasan_dilekati_pita,
        },
      ],
    });

    this.setState({
      merk_ht_id: "",
      merk_ht_name: "",
      jenis_ht: "",
      hje_ht: "",
      isi_ht: "",
      bahan_ht: "",
      tarif_ht: "",
      satuan_ht: "",

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
      merk_ht_id: record.merk_ht_id,
      merk_ht_name: record.merk_ht_name,
      jenis_ht: record.jenis_ht,
      hje_ht: record.hje_ht,
      isi_ht: record.isi_ht,
      bahan_ht: record.bahan_ht,
      tarif_ht: record.tarif_ht,
      satuan_ht: record.satuan_ht,

      nomor_produksi: record.nomor_produksi,
      tanggal_produksi: moment(record.tanggal_produksi),
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

    const newDataSource = this.state.dataSource.map((item) => item);
    newDataSource.splice(this.state.editIndexRincian, 1, {
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
      tanggal_produksi: moment(tanggal_produksi).format("YYYY-MM-DD"),
      jumlah_kemasan,
      jumlah_produksi,
      jumlah_kemasan_dilekati_pita,
    });
    this.setState({
      isEditRincian: false,
      editIndexRincian: null,
      merk_ht_id: "",
      merk_ht_name: "",
      jenis_ht: "",
      hje_ht: "",
      isi_ht: "",
      bahan_ht: "",
      tarif_ht: "",
      satuan_ht: "",

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
      merk_ht_id: "",
      merk_ht_name: "",
      jenis_ht: "",
      hje_ht: "",
      isi_ht: "",
      bahan_ht: "",
      tarif_ht: "",
      satuan_ht: "",

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

      nomor_pemberitahuan: "",
      tanggal_pemberitahuan: "",
      periode_bulan: "",
      periode_tahun: "",

      merk_ht_id: "",
      merk_ht_name: "",
      jenis_ht: "",
      hje_ht: "",
      isi_ht: "",
      bahan_ht: "",
      tarif_ht: "",
      satuan_ht: "",

      nomor_produksi: "",
      tanggal_produksi: "",
      jumlah_kemasan: "",
      jumlah_produksi: "",
      jumlah_kemasan_dilekati_pita: "",
      uraian_rincian_file: [],
      dataSource: [],
    });
  };
  handleSimpanPerbaikan = async () => {
    const {
      nppbkc_id,
      jenis_laporan_id,
      nomor_pemberitahuan,
      tanggal_pemberitahuan,
      periode_bulan,
      periode_tahun,

      tanggal_diterima,
      penyampaian_ck4_id,
      kota_id,
      nama_pengusaha,
      nomor_surat,
      tanggal_surat,
      penjabat_bc_nip,
      asal_kesalahan_id,
      keterangan_perbaikan,
      dataSource,
    } = this.state;

    const details = dataSource.map((item) => ({
      idMerkHt: item.merk_ht_id === "null" ? null : item.merk_ht_id,
      idCk4Detail: item.idCk4Detail === undefined ? null : item.idCk4Detail,
      nomorProduksi: item.nomor_produksi,
      tanggalProduksi: item.tanggal_produksi,
      jumlahKemasan: item.jumlah_kemasan,
      jumlahProduksi: item.jumlah_produksi,
      jumlahKemasanDilekatiPita: item.jumlah_kemasan_dilekati_pita,
    }));

    const payload = {
      idCk4: this.props.match.params.id,
      idNppbkc: nppbkc_id,
      jenisLaporan: jenis_laporan_id,
      nomorPemberitahuan: nomor_pemberitahuan,
      tanggalPemberitahuan: moment(tanggal_pemberitahuan).format("YYYY-MM-DD"),
      periodeBulan: periode_bulan,
      periodeTahun: periode_tahun,

      tanggalDiterima: moment(tanggal_diterima).format("YYYY-MM-DD"),
      penyampaianCk4: penyampaian_ck4_id,
      idKota: kota_id,
      namaPengusaha: nama_pengusaha,
      nomorSurat: nomor_surat,
      tanggalSurat: moment(tanggal_surat).format("YYYY-MM-DD"),
      nipPenjabatBc: penjabat_bc_nip,
      asalKesalahan: asal_kesalahan_id,
      keteranganPerbaikan: keterangan_perbaikan,
      details,
    };

    console.log(payload)

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: "/ck4/perbaikan-ht",
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
        <Container menuName="Laporan Produksi BKC CK4" contentName="HT Perbaikan" hideContentHeader>
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
                        <Input id="nppbkc" value={this.state.nppbkc} disabled />
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Alamat</FormLabel>
                        </div>
                        <Input.TextArea
                          id="alamat_nppbkc"
                          value={this.state.alamat_nppbkc}
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
                              onChange={(date) =>
                                this.handleDatepickerChange("tanggal_produksi", date)
                              }
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
                                  this.handleInputNumberChange(
                                    "jumlah_kemasan_dilekati_pita",
                                    value
                                  )
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

              <Header>{this.state.subtitle4}</Header>
              <div
                className="kt-content  kt-grid__item kt-grid__item--fluid"
                id="kt_content"
                style={{ paddingBottom: 10 }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal Diterima</FormLabel>
                    </div>
                    <DatePicker
                      id="tangal_diterima"
                      onChange={(date) => this.handleDatepickerChange("tanggal_diterima", date)}
                      style={{ width: "100%" }}
                      value={this.state.tanggal_diterima}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Penyampaian CK-4</FormLabel>
                    </div>
                    <Select
                      id="penyampaian_ck4"
                      onChange={(value) => this.handleSelectChange("penyampaian_ck4", value)}
                      style={{ width: "100%" }}
                      value={this.state.penyampaian_ck4}
                    >
                      {this.state.list_penyampaian_ck4.length > 0 &&
                        this.state.list_penyampaian_ck4.map((item, index) => (
                          <Select.Option
                            key={`penyampaian-ck4-${index}`}
                            value={item.penyampaian_ck4_id}
                          >
                            {item.penyampaian_ck4_name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

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
                      <FormLabel>Asal Kesalahan</FormLabel>
                    </div>
                    <Select
                      id="asal_kesalahan"
                      onChange={(value) => this.handleSelectChange("asal_kesalahan_id", value)}
                      style={{ width: "100%" }}
                      value={this.state.asal_kesalahan_id}
                    >
                      {this.state.list_asal_kesalahan.length > 0 &&
                        this.state.list_asal_kesalahan.map((item, index) => (
                          <Select.Option
                            key={`asal_kesalahan-${index}`}
                            value={item.asal_kesalahan_id}
                          >
                            {item.asal_kesalahan_name}
                          </Select.Option>
                        ))}
                    </Select>
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
                      loading={this.state.isSimpanPerbaikan}
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
        />

        <ModalDaftarHT
          isVisible={this.state.isModalDaftarMerkHtVisible}
          onCancel={() => this.handleModalClose("isModalDaftarMerkHtVisible")}
          onDataDoubleClick={this.handleDataMerkHt}
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
