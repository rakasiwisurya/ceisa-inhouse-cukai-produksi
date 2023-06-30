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
} from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import moment from "moment";
import React, { Component } from "react";
import { months, years } from "utils/times";
import { requestApi } from "utils/requestApi";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import ButtonCustom from "components/Button/ButtonCustom";

export default class CK4MMEADetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pemrakarsa",
      subtitle2: "Pemberitahuan",
      subtitle3: "Rincian",
      subtitle4: "Pemberitahu",

      isDetailLoading: true,

      nama_pemrakarsa: "",
      id_process_pemrakarsa: "",
      jabatan_pemrakarsa: "",
      nip_pemrakarsa: "",

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

  componentDidMount() {
    this.getDetailCk4Mmea();
  }

  getDetailCk4Mmea = async () => {
    // const payload = { idCk4: this.props.match.params.id };

    // const response = await requestApi({
    //   service: "produksi",
    //   method: "get",
    //   endpoint: "/ck4/detail-mmea",
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
    //     nama_nppbkc: data.namaNppbkc,
    //     nppbkc: data.nppbkc,
    //     alamat_nppbkc: data.alamatNppbkc,

    //     jenis_laporan_id: data.jenisLaporan,
    //     nomor_pemberitahuan: data.nomorPemberitahuan,
    //     tanggal_pemberitahuan: moment(data.tanggalPemberitahuan),

    //     tanggal_jam_produksi_awal: moment(data.tanggalJamProduksiAwal),
    //     tanggal_jam_produksi_akhir: moment(data.tanggalJamProduksiAkhir),
    //     periode_bulan: data.periodeBulan,
    //     periode_tahun: data.periodeTahun,
    //     total_jumlah_kemasan: data.totalJumlahKemasan,
    //     total_jumlah_kemasan_dilekati_pita: data.totalJumlahKemasanDilekatiPita,
    //     total_jumlah_produksi: data.totalJumlahProduksi,

    //     kota_id: data.idKota,
    //     kota_name: data.namaKota,
    //     nama_pengusaha: data.namaPengusaha,
    //     dataSource: data.details.map((detail, index) => ({
    //       key: `ck4-${index}`,
    //       jenis_mmea: detail.jenisMmea,
    //       merk_mmea_id: detail.idMerkMmea,
    //       merk_mmea_name: detail.namaMerkMmea,
    //       isi_mmea: detail.isiMmea,
    //       tarif_mmea: detail.tarifMmea,
    //       jenis_kemasan_mmea: detail.jenisKemasanMmea,
    //       golongan_mmea: detail.golonganMmea,
    //       kadar_mmea: detail.kadarMmea,

    //       nomor_produksi: detail.nomorProduksi,
    //       tanggal_produksi: moment(detail.tanggalProduksi).format("YYYY-MM-DD"),
    //       jumlah_kemasan: detail.jumlahKemasan,
    //       jumlah_produksi: detail.jumlahProduksi,
    //       jumlah_kemasan_dilekati_pita: detail.jumlahKemasanDilekatiPita,
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
        nama_nppbkc: "0706.1.1.1001",
        nppbkc: "Test 1 MOLINDO RAYA INDUSTRIAL, PT.",
        alamat_nppbkc:
          "Test 1  Jl. SUMBER WARAS NO.255 RT.01 RW.08, KEL. KALIREJO, KEC. LAWANG, KAB. MALAN",

        jenis_laporan_id: "HARIAN",
        nomor_pemberitahuan: "Nomor Pemberitahuan 1",
        tanggal_pemberitahuan: moment(new Date()),

        tanggal_jam_produksi_awal: moment(new Date()),
        tanggal_jam_produksi_akhir: moment(new Date()),
        periode_bulan: "JANUARY",
        periode_tahun: 2003,
        total_jumlah_kemasan: 110,
        total_jumlah_kemasan_dilekati_pita: 220,
        total_jumlah_produksi: 330,

        kota_id: "489",
        kota_name: "Kabupaten Kaimana",
        nama_pengusaha: "Nama Pengusaha",
        dataSource: [
          {
            key: 1,
            jenis_mmea: "jenis_mmea_1",
            merk_mmea_id: 1,
            merk_mmea_name: "merk_mmea_name_1",
            isi_mmea: "isi_mmea_1",
            tarif_mmea: "tarif_mmea_1",
            jenis_kemasan_mmea: "jenis_kemasan_mmea_1",
            golongan_mmea: "golongan_mmea_1",
            kadar_mmea: "kadar_mmea_1",

            nomor_produksi: "Nomor Produksi 1",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 2,
            jenis_mmea: "jenis_mmea_2",
            merk_mmea_id: 2,
            merk_mmea_name: "merk_mmea_name_2",
            isi_mmea: "isi_mmea_2",
            tarif_mmea: "tarif_mmea_2",
            jenis_kemasan_mmea: "jenis_kemasan_mmea_2",
            golongan_mmea: "golongan_mmea_2",
            kadar_mmea: "kadar_mmea_2",

            nomor_produksi: "Nomor Produksi 2",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 3,
            jenis_mmea: "jenis_mmea_3",
            merk_mmea_id: 3,
            merk_mmea_name: "merk_mmea_name_3",
            isi_mmea: "isi_mmea_3",
            tarif_mmea: "tarif_mmea_3",
            jenis_kemasan_mmea: "jenis_kemasan_mmea_3",
            golongan_mmea: "golongan_mmea_3",
            kadar_mmea: "kadar_mmea_3",

            nomor_produksi: "Nomor Produksi 3",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 4,
            jenis_mmea: "jenis_mmea_4",
            merk_mmea_id: 4,
            merk_mmea_name: "merk_mmea_name_4",
            isi_mmea: "isi_mmea_4",
            tarif_mmea: "tarif_mmea_4",
            jenis_kemasan_mmea: "jenis_kemasan_mmea_4",
            golongan_mmea: "golongan_mmea_4",
            kadar_mmea: "kadar_mmea_4",

            nomor_produksi: "Nomor Produksi 4",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 5,
            jenis_mmea: "jenis_mmea_5",
            merk_mmea_id: 5,
            merk_mmea_name: "merk_mmea_name_5",
            isi_mmea: "isi_mmea_5",
            tarif_mmea: "tarif_mmea_5",
            jenis_kemasan_mmea: "jenis_kemasan_mmea_5",
            golongan_mmea: "golongan_mmea_5",
            kadar_mmea: "kadar_mmea_5",

            nomor_produksi: "Nomor Produksi 5",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 6,
            jenis_mmea: "jenis_mmea_6",
            merk_mmea_id: 6,
            merk_mmea_name: "merk_mmea_name_6",
            isi_mmea: "isi_mmea_6",
            tarif_mmea: "tarif_mmea_6",
            jenis_kemasan_mmea: "jenis_kemasan_mmea_6",
            golongan_mmea: "golongan_mmea_6",
            kadar_mmea: "kadar_mmea_6",

            nomor_produksi: "Nomor Produksi 6",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 7,
            jenis_mmea: "jenis_mmea_7",
            merk_mmea_id: 7,
            merk_mmea_name: "merk_mmea_name_7",
            isi_mmea: "isi_mmea_7",
            tarif_mmea: "tarif_mmea_7",
            jenis_kemasan_mmea: "jenis_kemasan_mmea_7",
            golongan_mmea: "golongan_mmea_7",
            kadar_mmea: "kadar_mmea_7",

            nomor_produksi: "Nomor Produksi 7",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 8,
            jenis_mmea: "jenis_mmea_8",
            merk_mmea_id: 8,
            merk_mmea_name: "merk_mmea_name_8",
            isi_mmea: "isi_mmea_8",
            tarif_mmea: "tarif_mmea_8",
            jenis_kemasan_mmea: "jenis_kemasan_mmea_8",
            golongan_mmea: "golongan_mmea_8",
            kadar_mmea: "kadar_mmea_8",

            nomor_produksi: "Nomor Produksi 8",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 9,
            jenis_mmea: "jenis_mmea_9",
            merk_mmea_id: 9,
            merk_mmea_name: "merk_mmea_name_9",
            isi_mmea: "isi_mmea_9",
            tarif_mmea: "tarif_mmea_9",
            jenis_kemasan_mmea: "jenis_kemasan_mmea_9",
            golongan_mmea: "golongan_mmea_9",
            kadar_mmea: "kadar_mmea_9",

            nomor_produksi: "Nomor Produksi 9",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 10,
            jenis_mmea: "jenis_mmea_10",
            merk_mmea_id: 10,
            merk_mmea_name: "merk_mmea_name_10",
            isi_mmea: "isi_mmea_10",
            tarif_mmea: "tarif_mmea_10",
            jenis_kemasan_mmea: "jenis_kemasan_mmea_10",
            golongan_mmea: "golongan_mmea_10",
            kadar_mmea: "kadar_mmea_10",

            nomor_produksi: "Nomor Produksi 10",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 11,
            jenis_mmea: "jenis_mmea_11",
            merk_mmea_id: 11,
            merk_mmea_name: "merk_mmea_name_11",
            isi_mmea: "isi_mmea_11",
            tarif_mmea: "tarif_mmea_11",
            jenis_kemasan_mmea: "jenis_kemasan_mmea_11",
            golongan_mmea: "golongan_mmea_11",
            kadar_mmea: "kadar_mmea_11",

            nomor_produksi: "Nomor Produksi 11",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
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

  render() {
    return (
      <>
        <Container menuName="Laporan Produksi BKC CK4" contentName="MMEA Detail" hideContentHeader>
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
                          value={this.state.jenis_laporan_id}
                          style={{ width: "100%" }}
                          disabled
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
                          value={this.state.nomor_pemberitahuan}
                          disabled
                        />
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tanggal Pemberitahuan</FormLabel>
                        </div>
                        <DatePicker
                          id="tanggal_pemberitahuan"
                          value={this.state.tanggal_pemberitahuan}
                          style={{ width: "100%" }}
                          disabled
                        />
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jenis Barang Kena Cukai</FormLabel>
                        </div>
                        <Input value={this.state.jenis_barang_kena_cukai} disabled />
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
                              value={this.state.tanggal_jam_produksi_awal}
                              style={{ width: "100%" }}
                              disabled
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
                              value={this.state.tanggal_jam_produksi_akhir}
                              style={{ width: "100%" }}
                              disabled
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
                              value={this.state.periode_bulan}
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
                              id="periode_tahun"
                              value={this.state.periode_tahun}
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
                            <Input id="nomor_produksi" value={this.state.nomor_produksi} disabled />
                          </div>

                          <div>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Tanggal Produksi</FormLabel>
                            </div>
                            <DatePicker
                              id="tanggal_produksi"
                              value={this.state.tanggal_produksi}
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
                                id="jumlah_kemasan"
                                value={this.state.jumlah_kemasan}
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
                              id="jumlah_produksi"
                              value={this.state.jumlah_produksi}
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
                              id="jumlah_kemasan_dilekati_pita"
                              value={this.state.jumlah_kemasan_dilekati_pita}
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
                            id="uraian_rincian_file"
                            name="uraian_rincian_file"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            customRequest={(options) =>
                              this.handleUploadFile("uraian_rincian_file", options)
                            }
                            onRemove={() => this.handleRemoveFile("uraian_rincian_file")}
                            fileList={this.state.uraian_rincian_file}
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
                            disabled={this.state.uraian_rincian_file.length === 0}
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
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
                  <Col span={12}>
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Dibuat di Kota/Kabupaten</FormLabel>
                      </div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <Input id="kota_name" value={this.state.kota_name} disabled />
                      </div>
                    </div>

                    <div>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Nama Pengusaha</FormLabel>
                      </div>
                      <Input id="nama_pengusaha" value={this.state.nama_pengusaha} disabled />
                    </div>
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
                </Row>
              </div>
            </>
          )}
        </Container>
      </>
    );
  }
}
