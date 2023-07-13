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
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import moment from "moment";
import React, { Component } from "react";
// import { requestApi } from "utils/requestApi";
import { sumArrayOfObject } from "utils/sumArrayOfObject";
import { months, years } from "utils/times";

export default class CK4HTDetail extends Component {
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

      uraian_rincian_file: [],

      searchText: "",
      searchedColumn: "",
      page: 1,

      kota_id: "",
      kota_name: "",
      nama_pengusaha: "",

      list_jenis_laporan: [
        {
          jenis_laporan_code: "HARIAN",
          jenis_laporan_name: "Harian",
        },
        {
          jenis_laporan_code: "BULANAN",
          jenis_laporan_name: "Bulanan",
        },
      ],

      dataSource: [],
      columns: [
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
    // const payload = { idCk4: this.props.match.params.id };

    // const response = await requestApi({
    //   service: "produksi",
    //   method: "get",
    //   endpoint: "/ck4/detail-ht",
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

    //     periode_bulan: data.periodeBulan,
    //     periode_tahun: data.periodeTahun,
    //     tanggal_produksi_awal: moment(data.tanggalProduksiAwal).format("YYYY-MM-DD"),
    //     tanggal_produksi_akhir: moment(data.tanggalProduksiAkhir).format("YYYY-MM-DD"),

    //     kota_id: data.idKota,
    //     kota_name: data.namaKota,
    //     nama_pengusaha: data.namaPengusaha,

    //     dataSource: data.details.map((detail, index) => ({
    //       key: `ck4-${index}`,
    //       merk_ht_id: detail.idMerkHt,
    //       merk_ht_name: detail.namaMerkHt,
    //       jenis_ht: detail.jenisHt,
    //       hje_ht: detail.hjeHt,
    //       isi_ht: detail.isiHt,
    //       bahan_ht: detail.bahanHt,
    //       tarif_ht: detail.tarifHt,
    //       satuan_ht: detail.satuanHt,

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

        periode_bulan: "JANUARY",
        periode_tahun: 2003,
        tanggal_produksi_awal: moment(new Date()),
        tanggal_produksi_akhir: moment(new Date()),

        kota_id: "489",
        kota_name: "Kabupaten Kaimana",
        nama_pengusaha: "Nama Pengusaha",
        dataSource: [
          {
            key: 1,
            merk_ht_id: "idMerkHt 1",
            merk_ht_name: "namaMerkHt 1",
            jenis_ht: "jenisHt 1",
            hje_ht: "hjeHt 1",
            isi_ht: "isiHt 1",
            bahan_ht: "bahanHt 1",
            tarif_ht: "tarifHt 1",
            satuan_ht: "BTG",

            nomor_produksi: "Nomor Produksi 1",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 2,
            merk_ht_id: "idMerkHt 2",
            merk_ht_name: "namaMerkHt 2",
            jenis_ht: "jenisHt 2",
            hje_ht: "hjeHt 2",
            isi_ht: "isiHt 2",
            bahan_ht: "bahanHt 2",
            tarif_ht: "tarifHt 2",
            satuan_ht: "BTG",

            nomor_produksi: "Nomor Produksi 2",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 3,
            merk_ht_id: "idMerkHt 3",
            merk_ht_name: "namaMerkHt 3",
            jenis_ht: "jenisHt 3",
            hje_ht: "hjeHt 3",
            isi_ht: "isiHt 3",
            bahan_ht: "bahanHt 3",
            tarif_ht: "tarifHt 3",
            satuan_ht: "BTG",

            nomor_produksi: "Nomor Produksi 3",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 4,
            merk_ht_id: "idMerkHt 4",
            merk_ht_name: "namaMerkHt 4",
            jenis_ht: "jenisHt 4",
            hje_ht: "hjeHt 4",
            isi_ht: "isiHt 4",
            bahan_ht: "bahanHt 4",
            tarif_ht: "tarifHt 4",
            satuan_ht: "BTG",

            nomor_produksi: "Nomor Produksi 4",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 5,
            merk_ht_id: "idMerkHt 5",
            merk_ht_name: "namaMerkHt 5",
            jenis_ht: "jenisHt 5",
            hje_ht: "hjeHt 5",
            isi_ht: "isiHt 5",
            bahan_ht: "bahanHt 5",
            tarif_ht: "tarifHt 5",
            satuan_ht: "GR",

            nomor_produksi: "Nomor Produksi 5",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 6,
            merk_ht_id: "idMerkHt 6",
            merk_ht_name: "namaMerkHt 6",
            jenis_ht: "jenisHt 6",
            hje_ht: "hjeHt 6",
            isi_ht: "isiHt 6",
            bahan_ht: "bahanHt 6",
            tarif_ht: "tarifHt 6",
            satuan_ht: "GR",

            nomor_produksi: "Nomor Produksi 6",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 7,
            merk_ht_id: "idMerkHt 7",
            merk_ht_name: "namaMerkHt 7",
            jenis_ht: "jenisHt 7",
            hje_ht: "hjeHt 7",
            isi_ht: "isiHt 7",
            bahan_ht: "bahanHt 7",
            tarif_ht: "tarifHt 7",
            satuan_ht: "GR",

            nomor_produksi: "Nomor Produksi 7",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 8,
            merk_ht_id: "idMerkHt 8",
            merk_ht_name: "namaMerkHt 8",
            jenis_ht: "jenisHt 8",
            hje_ht: "hjeHt 8",
            isi_ht: "isiHt 8",
            bahan_ht: "bahanHt 8",
            tarif_ht: "tarifHt 8",
            satuan_ht: "GR",

            nomor_produksi: "Nomor Produksi 8",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 9,
            merk_ht_id: "idMerkHt 9",
            merk_ht_name: "namaMerkHt 9",
            jenis_ht: "jenisHt 9",
            hje_ht: "hjeHt 9",
            isi_ht: "isiHt 9",
            bahan_ht: "bahanHt 9",
            tarif_ht: "tarifHt 9",
            satuan_ht: "ML",

            nomor_produksi: "Nomor Produksi 9",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 10,
            merk_ht_id: "idMerkHt 10",
            merk_ht_name: "namaMerkHt 10",
            jenis_ht: "jenisHt 10",
            hje_ht: "hjeHt 10",
            isi_ht: "isiHt 10",
            bahan_ht: "bahanHt 10",
            tarif_ht: "tarifHt 10",
            satuan_ht: "ML",

            nomor_produksi: "Nomor Produksi 10",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 11,
            merk_ht_id: "idMerkHt 11",
            merk_ht_name: "namaMerkHt 11",
            jenis_ht: "jenisHt 11",
            hje_ht: "hjeHt 11",
            isi_ht: "isiHt 11",
            bahan_ht: "bahanHt 11",
            tarif_ht: "tarifHt 11",
            satuan_ht: "ML",

            nomor_produksi: "Nomor Produksi 11",
            tanggal_produksi: moment(new Date()).format("YYYY-MM-DD"),
            jumlah_kemasan: 10,
            jumlah_produksi: 20,
            jumlah_kemasan_dilekati_pita: 30,
          },
          {
            key: 12,
            merk_ht_id: "idMerkHt 12",
            merk_ht_name: "namaMerkHt 12",
            jenis_ht: "jenisHt 12",
            hje_ht: "hjeHt 12",
            isi_ht: "isiHt 12",
            bahan_ht: "bahanHt 12",
            tarif_ht: "tarifHt 12",
            satuan_ht: "ML",

            nomor_produksi: "Nomor Produksi 12",
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
        <Container menuName="Laporan Produksi BKC CK4" contentName="HT Detail" hideContentHeader>
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
                              <Select.Option key={`periode-bulan-${index}`} value={item.month_code}>
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
                            value={this.state.tanggal_produksi_awal}
                            disabled
                          />
                          <div>s/d</div>
                          <DatePicker
                            id="tanggal_produksi_akhir"
                            value={this.state.tanggal_produksi_akhir}
                            disabled
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
                        <Card title="Jumlah Produksi dan Kemasan">
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
                              <div>Kemasan</div>
                            </div>
                          </div>

                          <div>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Jumlah Produksi per Merk</FormLabel>
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
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <InputNumber
                                id="jumlah_kemasan_dilekati_pita"
                                value={this.state.jumlah_kemasan_dilekati_pita}
                                style={{ flex: 1 }}
                                disabled
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
