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

export default class CK4HTTaskToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pemrakarsa",
      subtitle2: "Pemberitahuan",
      subtitle3: "Rincian",
      subtitle4: "Permohonan Perbaikan",
      subtitle5: "Keputusan Perbaikan",
      subtitle6: "STCK",

      isSimpanTasktodoLoading: false,
      isDetailLoading: true,
      isModalDaftarStckVisible: false,
      isModalDaftarPenjabatBcVisible: false,

      nppbkc_id: null,
      nama_nppbkc: null,
      nppbkc: null,
      alamat_nppbkc: null,
      npwp_nppbkc: null,

      jenis_laporan_id: "BULANAN",
      jenis_laporan_name: "BULANAN",
      nomor_pemberitahuan: null,
      tanggal_pemberitahuan: null,
      jenis_barang_kena_cukai: "HASIL TEMBAKAU (HT)",

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

      status: "SETUJU",
      nomor_surat_permohonan_perbaikan: null,
      tanggal_surat_permohonan_perbaikan: null,
      alasan: null,
      previewFile:
        "https://raw.githubusercontent.com/rakasiwisurya/pdf-test/aa52b04cae0e0f857a2d0e21c3a837f3cfb7f5ff/NS_CG_K2R.pdf",

      nomor_stck: null,
      tanggal_stck: null,

      nomor_surat: null,
      tanggal_surat: null,
      penjabat_bc_nip: null,
      penjabat_bc_name: null,
      asal_kesalahan_id: null,
      asal_kesalahan_name: null,
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
      list_asal_kesalahan: [
        {
          asal_kesalahan_id: "PENGGUNA JASA",
          asal_kesalahan_name: "PENGGUNA JASA",
        },
        {
          asal_kesalahan_id: "PENGAWAS/PETUGAS",
          asal_kesalahan_name: "PENGAWAS/PETUGAS",
        },
        {
          asal_kesalahan_id: "APLIKASI SAC-2",
          asal_kesalahan_name: "APLIKASI SAC-2",
        },
        {
          asal_kesalahan_id: "JARINGAN",
          asal_kesalahan_name: "JARINGAN",
        },
        {
          asal_kesalahan_id: "LAINNYA",
          asal_kesalahan_name: "LAINNYA",
        },
      ],
      list_status: [
        {
          status_id: "SETUJU",
          status_name: "SETUJU",
        },
        {
          status_id: "TOLAK",
          status_name: "TOLAK",
        },
      ],

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
              render: (text) => (
                <div style={{ textAlign: "center" }}>
                  {text ? moment(text).format("DD-MM-YYYY") : "-"}
                </div>
              ),
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
    if (
      prevState.periode_bulan !== this.state.periode_bulan ||
      prevState.periode_tahun !== this.state.periode_tahun
    ) {
      if (this.state.periode_bulan && this.state.periode_tahun) {
        const firstDate = moment([+this.state.periode_tahun, +this.state.periode_bulan - 1]);
        const lastDate = moment(firstDate).endOf("month");

        this.setState({
          tanggal_produksi_awal: firstDate,
          tanggal_produksi_akhir: lastDate,
        });
      }
    }

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
        npwp_nppbkc: data.npwp,

        jenis_laporan_id: data.jenisLaporan,
        nomor_pemberitahuan: data.nomorPemberitahuan,
        tanggal_pemberitahuan: moment(data.tanggalPemberitahuan),

        periode_bulan: months.find((month) => data.periodeBulan === month.month_name)?.month_code,
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
    this.setState({ ...this.state, [e.target.id]: e.target.value.toUpperCase() });
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

  handleDataPenjabatBc = (record) => {
    this.setState({
      penjabat_bc_nip: record.penjabat_bc_nip,
      penjabat_bc_name: record.penjabat_bc_name,
    });
    this.handleModalClose("isModalDaftarPenjabatBcVisible");
  };
  handleDataStck = (record) => {
    this.setState({
      nomor_stck: record.nomor_stck,
      tanggal_stck: moment(record.tanggal_stck),
    });
    this.handleModalClose("isModalDaftarStckVisible");
  };

  handleSimpanTasktodo = async () => {
    const { status, nomor_stck, tanggal_stck, alasan } = this.state;

    const payload = {
      idCk4Header: this.props.match.params.id,
      status,
      flagApprove: status === "SETUJU" ? "Y" : "N",
    };

    if (status === "SETUJU") {
      payload.nomorStck = nomor_stck;
      payload.tanggalStck = moment(tanggal_stck, "DD-MM-YYYY").format("YYYY-MM-DD");
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
        <Container menuName="Task To Do" contentName="CK4 HT" hideContentHeader>
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
                          format="DD-MM-YYYY"
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
                            format="DD-MM-YYYY"
                            value={this.state.tanggal_produksi_awal}
                            disabled
                          />
                          <div>s/d</div>
                          <DatePicker
                            id="tanggal_produksi_akhir"
                            format="DD-MM-YYYY"
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
                              format="DD-MM-YYYY"
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
                  <>
                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Nomor Surat</FormLabel>
                      </div>
                      <Input
                        id="nomor_surat_permohonan_perbaikan"
                        onChange={this.handleInputChange}
                        value={this.state.nomor_surat_permohonan_perbaikan}
                      />
                    </Col>

                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Tanggal Surat</FormLabel>
                      </div>
                      <DatePicker
                        id="tanggal_surat_permohonan_perbaikan"
                        onChange={(date) =>
                          this.handleDatepickerChange("tanggal_surat_permohonan_perbaikan", date)
                        }
                        style={{ width: "100%" }}
                        value={this.state.tanggal_surat_permohonan_perbaikan}
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
                      {this.state.list_status.length > 0 &&
                        this.state.list_status.map((item, index) => (
                          <Select.Option key={`status-${index}`} value={item.status_id}>
                            {item.status_name}
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
                            id="nomor_stck"
                            onChange={this.handleInputChange}
                            value={this.state.nomor_stck}
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
                          id="tanggal_stck"
                          format="DD-MM-YYYY"
                          onChange={(date) => this.handleDatepickerChange("tanggal_stck", date)}
                          value={this.state.tanggal_stck}
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
          npwp={this.state.npwp_nppbkc}
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
