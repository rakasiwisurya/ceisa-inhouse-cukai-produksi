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
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import React, { Component } from "react";
import ModalDaftarKota from "../ModalDaftarKota";
import ModalDaftarNPPBKC from "../ModalDaftarNPPBKC";
import { pathName } from "configs/constants";
import { requestApi } from "utils/requestApi";
import { sumArrayOfObject } from "utils/sumArrayOfObject";
import moment from "moment";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import ModalDaftarPenjabatBc from "../ModalDaftarPenjabatBC";

export default class CK4EAPerbaikan extends Component {
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
      isModalDaftarKotaVisible: false,
      isModalDaftarPenjabatBcVisible: false,

      nama_pemrakarsa: "",
      id_process_pemrakarsa: "",
      jabatan_pemrakarsa: "",
      nip_pemrakarsa: "",

      nppbkc_id: "",
      nppbkc: "",
      nama_nppbkc: "",
      alamat_nppbkc: "",

      jenis_laporan_id: "HARIAN",
      jenis_laporan_name: "Harian",
      nomor_pemberitahuan: "",
      tanggal_pemberitahuan: "",
      jenis_barang_kena_cukai: "Etil Alkohol (EA)",

      tanggal_jam_produksi_awal: "",
      tanggal_jam_produksi_akhir: "",
      total_jumlah_produksi: 0,

      nomor_produksi: "",
      tanggal_produksi: "",
      jumlah_produksi: "",
      nomor_tangki: "",
      keterangan: "",

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

      searchText: "",
      searchedColumn: "",
      page: 1,

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
          title: "Nomor / Identitas Tangki",
          dataIndex: "nomor_tangki",
          key: "nomor_tangki",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("nomor_tangki"),
        },
        {
          title: "Jumlah (liter)",
          dataIndex: "jumlah_produksi",
          key: "jumlah_produksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jumlah_produksi"),
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
    this.getDetailCk4Ea();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataSource !== this.state.dataSource) {
      const { dataSource } = this.state;
      this.setState({ total_jumlah_produksi: sumArrayOfObject(dataSource, "jumlah_produksi") });
    }
  }

  getDetailCk4Ea = async () => {
    // const payload = { idCk4: this.props.match.params.id };

    // const response = await requestApi({
    //   service: "produksi",
    //   method: "get",
    //   endpoint: "/ck4/detail-ea",
    //   params: payload,
    //   setLoading: (bool) => this.setState({ isDetailLoading: bool }),
    // });

    // if (response) {
    //   const { data } = response.data;

    //   this.setState({
    //     nama_pemrakarsa: data.namaPemrakarsa,
    //     id_process_pemrakarsa: data.idProcessPemrakarsa,
    //     jabatan_pemrakarsa: data.jabatanPemrakarsa,
    //     nip_pemrakarsa: data.nipPemrakarsa,
    //     nppbkc_id: data.idNppbkc,
    //     nppbkc: data.nppbkc,
    //     nama_nppbkc: data.namaNppbkc,
    //     alamat_nppbkc: data.alamatNppbkc,
    //     jenis_laporan_id: data.jenisLaporan,
    //     nomor_pemberitahuan: data.nomorPemberitahuan,
    //     tanggal_pemberitahuan: moment(data.tanggalPemberitahuan).format("YYYY-MM-DD"),
    //     tanggal_jam_produksi_awal: moment(data.tanggalJamProduksiAwal).format("YYYY-MM-DD HH:mm"),
    //     tanggal_jam_produksi_akhir: moment(data.tanggalJamProduksiAkhir).format("YYYY-MM-DD HH:mm"),
    //     total_jumlah_produksi: data.totalJumlahProduksi,
    //     kota_id: data.idKota,
    //     kota_name: data.namaKota,
    //     nama_pengusaha: data.namaPengusaha,
    //     dataSource: data.details.map((detail, index) => ({
    //       key: `ck4-${index}`,
    //       nomor_produksi: detail.nomorProduksi,
    //       tanggal_produksi: moment(detail.tanggalProduksi).format("YYYY-MM-DD"),
    //       jumlah_produksi: detail.jumlahProduksi,
    //       nomor_tangki: detail.nomorTangki,
    //       keterangan: detail.keterangan,
    //     })),
    //   });
    // }

    this.setState({ isDetailLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        nama_pemrakarsa: "SENDI BENI SUSANDI",
        id_process_pemrakarsa: 7784590,
        jabatan_pemrakarsa: "PEGAWAI PADA Direktorat Informasi Kepabeanan dan Cukai",
        nip_pemrakarsa: "199210122014021001",
        nppbkc_id: 1,
        nppbkc: "0706.1.1.1001",
        nama_nppbkc: "Test 1 MOLINDO RAYA INDUSTRIAL, PT.",
        alamat_nppbkc:
          "Test 1  Jl. SUMBER WARAS NO.255 RT.01 RW.08, KEL. KALIREJO, KEC. LAWANG, KAB. MALAN",
        jenis_laporan_id: "HARIAN",
        nomor_pemberitahuan: "Nomor Pemberitahuan 1",
        tanggal_pemberitahuan: moment(new Date()),
        tanggal_jam_produksi_awal: moment(new Date()),
        tanggal_jam_produksi_akhir: moment(new Date()),
        total_jumlah_produksi: 20,
        kota_id: "489",
        kota_name: "Kabupaten Kaimana",
        nama_pengusaha: "Nama Pengusaha",
        dataSource: [
          {
            key: 1,
            nomor_produksi: "Nomor Produksi 1",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_produksi: 10,
            nomor_tangki: "Nomor Tangki 1",
            keterangan: "Keterangan 1",
          },
          {
            key: 2,
            nomor_produksi: "Nomor Produksi 2",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_produksi: 10,
            nomor_tangki: "Nomor Tangki 2",
            keterangan: "Keterangan 2",
          },
          {
            key: 3,
            nomor_produksi: "Nomor Produksi 3",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_produksi: 10,
            nomor_tangki: "Nomor Tangki 3",
            keterangan: "Keterangan 3",
          },
          {
            key: 4,
            nomor_produksi: "Nomor Produksi 4",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_produksi: 10,
            nomor_tangki: "Nomor Tangki 4",
            keterangan: "Keterangan 4",
          },
          {
            key: 5,
            nomor_produksi: "Nomor Produksi 5",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_produksi: 10,
            nomor_tangki: "Nomor Tangki 5",
            keterangan: "Keterangan 5",
          },
          {
            key: 6,
            nomor_produksi: "Nomor Produksi 6",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_produksi: 10,
            nomor_tangki: "Nomor Tangki 6",
            keterangan: "Keterangan 6",
          },
          {
            key: 7,
            nomor_produksi: "Nomor Produksi 7",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_produksi: 10,
            nomor_tangki: "Nomor Tangki 7",
            keterangan: "Keterangan 7",
          },
          {
            key: 8,
            nomor_produksi: "Nomor Produksi 8",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_produksi: 10,
            nomor_tangki: "Nomor Tangki 8",
            keterangan: "Keterangan 8",
          },
          {
            key: 9,
            nomor_produksi: "Nomor Produksi 9",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_produksi: 10,
            nomor_tangki: "Nomor Tangki 9",
            keterangan: "Keterangan 9",
          },
          {
            key: 10,
            nomor_produksi: "Nomor Produksi 10",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_produksi: 10,
            nomor_tangki: "Nomor Tangki 10",
            keterangan: "Keterangan 10",
          },
          {
            key: 11,
            nomor_produksi: "Nomor Produksi 11",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_produksi: 10,
            nomor_tangki: "Nomor Tangki 11",
            keterangan: "Keterangan 11",
          },
        ],
      });
      this.setState({ isDetailLoading: false });
      clearTimeout(timeout);
    }, 2000);
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
    const { nomor_produksi, tanggal_produksi, jumlah_produksi, nomor_tangki, keterangan } =
      this.state;

    this.setState({
      dataSource: [
        ...this.state.dataSource,
        {
          key: new Date().getTime(),
          nomor_produksi,
          tanggal_produksi: moment(tanggal_produksi).format("YYYY-MM-DD"),
          jumlah_produksi,
          nomor_tangki,
          keterangan,
        },
      ],
    });

    this.setState({
      nomor_produksi: "",
      tanggal_produksi: "",
      jumlah_produksi: "",
      nomor_tangki: "",
      keterangan: "",
    });
  };
  handleEditRincian = (record, index) => {
    this.setState({
      isEditRincian: true,
      editIndexRincian: index,
      nomor_produksi: record.nomor_produksi,
      tanggal_produksi: moment(record.tanggal_produksi),
      jumlah_produksi: record.jumlah_produksi,
      nomor_tangki: record.nomor_tangki,
      keterangan: record.keterangan,
    });
  };
  handleUbahRincian = () => {
    const { nomor_produksi, tanggal_produksi, jumlah_produksi, nomor_tangki, keterangan } =
      this.state;

    const newDataSource = this.state.dataSource.map((item) => item);
    newDataSource.splice(this.state.editIndexRincian, 1, {
      key: new Date().getTime(),
      nomor_produksi,
      tanggal_produksi: moment(tanggal_produksi).format("YYYY-MM-DD"),
      jumlah_produksi,
      nomor_tangki,
      keterangan,
    });

    this.setState({
      isEditRincian: false,
      editIndexRincian: null,
      nomor_produksi: "",
      tanggal_produksi: "",
      jumlah_produksi: "",
      nomor_tangki: "",
      keterangan: "",
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
      nomor_produksi: "",
      tanggal_produksi: "",
      jumlah_produksi: "",
      nomor_tangki: "",
      keterangan: "",
    });
  };
  handleReset = () => {
    this.setState({
      nppbkc_id: "",
      nppbkc: "",
      nama_nppbkc: "",
      alamat_nppbkc: "",

      nomor_pemberitahuan: "",
      tanggal_pemberitahuan: "",

      tanggal_jam_produksi_awal: "",
      tanggal_jam_produksi_akhir: "",

      nomor_produksi: "",
      tanggal_produksi: "",
      jumlah_produksi: "",
      nomor_tangki: "",
      keterangan: "",
    });
  };
  handleSimpanPerbaikan = async () => {
    // const {
    //   nppbkc_id,
    //   jenis_laporan_id,
    //   nomor_pemberitahuan,
    //   tanggal_pemberitahuan,
    //   tanggal_jam_produksi_awal,
    //   tanggal_jam_produksi_akhir,
    //   total_jumlah_produksi,

    //   tanggal_diterima,
    //   penyampaian_ck4_id,
    //   kota_id,
    //   nama_pengusaha,
    //   nomor_surat,
    //   tanggal_surat,
    //   penjabat_bc_nip,
    //   asal_kesalahan_id,
    //   keterangan_perbaikan,
    //   dataSource,
    // } = this.state;

    // const details = dataSource.map((item) => ({
    //   nomorProduksi: item.nomor_produksi,
    //   tanggalProduksi: item.tanggal_produksi,
    //   jumlahProduksi: item.jumlah_produksi,
    //   nomorTangki: item.nomor_tangki,
    //   keterangan: item.keterangan,
    // }));

    // const payload = {
    //   idCk4: this.props.match.params.id,
    //   idNppbkc: nppbkc_id,
    //   jenisLaporan: jenis_laporan_id,
    //   nomorPemberitahuan: nomor_pemberitahuan,
    //   tanggalPemberitahuan: tanggal_pemberitahuan,
    //   tanggalJamProduksiAwal: tanggal_jam_produksi_awal,
    //   tanggalJamProduksiAkhir: tanggal_jam_produksi_akhir,
    //   totalJumlahProduksi: total_jumlah_produksi,

    //   tanggalDiterima: tanggal_diterima,
    //   penyampaianCk4: penyampaian_ck4_id,
    //   idKota: kota_id,
    //   namaPengusaha: nama_pengusaha,
    //   nomorSurat: nomor_surat,
    //   tanggalSurat: tanggal_surat,
    //   nipPenjabatBc: penjabat_bc_nip,
    //   asalKesalahan: asal_kesalahan_id,
    //   keteranganPerbaikan: keterangan_perbaikan,
    //   details,
    // };

    // const response = await requestApi({
    //   service: "produksi",
    //   method: "post",
    //   endpoint: "/ck4/perbaikan-ea",
    //   body: payload,
    //   setLoading: (bool) => this.setState({ isSimpanPerbaikanLoading: bool }),
    // });

    // if (response) {
    //   notification.success({ message: "Success", description: response.data.message });
    //   this.props.history.push(`${pathName}/laporan-ck4`);
    // }

    const timeout = setTimeout(() => {
      notification.success({ message: "Success", description: "Success" });
      this.props.history.push(`${pathName}/laporan-ck4`);
      clearTimeout(timeout);
    }, 2000);
  };

  render() {
    return (
      <>
        <Container menuName="Laporan Produksi BKC CK4" contentName="EA Perbaikan" hideContentHeader>
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
                    <Card title="Dokumen Produksi">
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
                    <Card title="Data Produksi" style={{ height: 334 }}>
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

                  <Col span={12}>
                    <Card title="Nomor Tangki - Jumlah Liter - Keterangan" style={{ height: 334 }}>
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jumlah Isi</FormLabel>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <InputNumber
                            id="jumlah_produksi"
                            onChange={(value) =>
                              this.handleInputNumberChange("jumlah_produksi", value)
                            }
                            value={this.state.jumlah_produksi}
                            style={{ flex: 1 }}
                          />
                          <div>Liter</div>
                        </div>
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Nomor / Identitas Tangki</FormLabel>
                        </div>
                        <Input
                          id="nomor_tangki"
                          onChange={this.handleInputChange}
                          value={this.state.nomor_tangki}
                        />
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Keterangan</FormLabel>
                        </div>
                        <Input
                          id="keterangan"
                          onChange={this.handleInputChange}
                          value={this.state.keterangan}
                        />
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
                      <FormLabel>Tanggal Diterima</FormLabel>
                    </div>
                    <DatePicker
                      id="tangal_diterima"
                      onChange={(date) => this.handleDatepickerChange("tangal_diterima", date)}
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

                <Row>
                  <Col span={4} offset={19}>
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