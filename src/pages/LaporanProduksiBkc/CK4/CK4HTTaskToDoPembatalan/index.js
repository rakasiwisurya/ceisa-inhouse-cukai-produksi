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
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import ModalDaftarPenjabatBc from "components/ModalDaftarPenjabatBc";
import ModalStck from "components/ModalStck";
import { baseUrlCeisaInhouse, endpoints } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { ExcelRenderer } from "react-excel-renderer";
import { convertArrayExcelToTable } from "utils/convertArrayExcelToTable";
import { download } from "utils/files";
import { getTokenPayload } from "utils/jwt";
import { requestApi } from "utils/requestApi";
import { sumArrayOfObject } from "utils/sumArrayOfObject";
import { months, years } from "utils/times";

export default class CK4HTTaskToDoPembatalan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pemrakarsa",
      subtitle2: "Pemberitahuan",
      subtitle3: "Rincian",
      subtitle4: "Permohonan Pembatalan",
      subtitle5: "Keputusan Pembatalan",
      subtitle6: "STCK",

      isSimpanTasktodoLoading: false,
      isDetailLoading: true,
      isModalDaftarStckVisible: false,
      isModalDaftarPenjabatBcVisible: false,
      isDownloadLoading: false,

      tokenData: null,
      kodeKantor: null,
      namaKantor: null,

      namaPemrakarsa: null,
      jabatanPemrakarsa: null,
      nipPemrakarsa: null,

      idNppbkc: null,
      namaNppbkc: null,
      nppbkc: null,
      alamatNppbkc: null,
      npwpNppbkc: null,

      idJenisLaporan: "BULANAN",
      namaJenisLaporan: "BULANAN",
      nomorPemberitahuan: null,
      tanggalPemberitahuan: null,
      jenisBarangKenaCukai: "HASIL TEMBAKAU (HT)",

      periodeBulan: null,
      periodeTahun: null,
      tanggalProduksiAwal: null,
      tanggalProduksiAkhir: null,
      totalJumlahKemasan: 0,
      totalJumlahKemasanDilekatiPita: 0,
      totalJumlahProduksiHtBtg: 0,
      totalJumlahProduksiHtGr: 0,
      totalJumlahProduksiHtMl: 0,

      idMerkHt: null,
      namaMerkHt: null,
      jenisHt: null,
      hjeHt: null,
      isiHt: null,
      bahanHt: null,
      tarifHt: null,
      satuanHt: null,

      nomorProduksi: null,
      tanggalProduksi: null,
      jumlahKemasan: null,
      jumlahProduksi: null,
      jumlahKemasanDilekatiPita: null,

      status: "SETUJU",
      nomorSuratPermohonanPembatalan: null,
      tanggalSuratPermohonanPembatalan: null,
      alasan: null,
      kodeUploadPerbaikan: null,

      isStck: false,
      nomorStck: null,
      tanggalStck: null,

      nomorSurat: null,
      tanggalSurat: null,
      nipPenjabatBc: null,
      namaPenjabatBc: null,
      idAsalKesalahan: null,
      namaAsalKesalahan: null,
      keteranganPembatalan: null,

      uraianRincianFile: [],

      searchText: null,
      searchedColumn: null,
      page: 1,

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

      columns: [
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
          title: "Jenis HT",
          dataIndex: "jenisHt",
          key: "jenisHt",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenisHt"),
        },
        {
          title: "Merk",
          dataIndex: "namaMerkHt",
          key: "namaMerkHt",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("namaMerkHt"),
        },
        {
          title: "HJE",
          dataIndex: "hjeHt",
          key: "hjeHt",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("hjeHt"),
        },
        {
          title: "Tarif",
          dataIndex: "tarifHt",
          key: "tarifHt",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tarifHt"),
        },
        {
          title: "Kemasan",
          children: [
            {
              title: "Bahan",
              dataIndex: "bahanHt",
              key: "bahanHt",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("bahanHt"),
            },
            {
              title: "Isi",
              dataIndex: "isiHt",
              key: "isiHt",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("isiHt"),
            },
            {
              title: "Satuan",
              dataIndex: "satuanHt",
              key: "satuanHt",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("satuanHt"),
            },
            {
              title: "Jumlah",
              dataIndex: "jumlahKemasan",
              key: "jumlahKemasan",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("jumlahKemasan"),
            },
          ],
        },
        {
          title: "Jumlah Isi",
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
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getDetailCk4Ht();
    this.getToken();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.periodeBulan !== this.state.periodeBulan ||
      prevState.periodeTahun !== this.state.periodeTahun
    ) {
      if (this.state.periodeBulan && this.state.periodeTahun) {
        const firstDate = moment([+this.state.periodeTahun, +this.state.periodeBulan - 1]);
        const lastDate = moment(firstDate).endOf("month");

        this.setState({
          tanggalProduksiAwal: firstDate,
          tanggalProduksiAkhir: lastDate,
        });
      }
    }

    if (prevState.dataSource !== this.state.dataSource) {
      const { dataSource } = this.state;

      const jumlahProduksiBtg = dataSource.filter(
        (item) => item.satuanHt === "BTG" || item.satuanHt === "btg"
      );
      const jumlahProduksiGr = dataSource.filter(
        (item) => item.satuanHt === "GR" || item.satuanHt === "gr"
      );
      const jumlahProduksiMl = dataSource.filter(
        (item) => item.satuanHt === "ML" || item.satuanHt === "ml"
      );

      this.setState({
        totalJumlahKemasan: sumArrayOfObject(dataSource, "jumlahKemasan"),
        totalJumlahKemasanDilekatiPita: sumArrayOfObject(dataSource, "jumlahKemasanDilekatiPita"),
        totalJumlahProduksiHtBtg: sumArrayOfObject(jumlahProduksiBtg, "jumlahProduksi"),
        totalJumlahProduksiHtGr: sumArrayOfObject(jumlahProduksiGr, "jumlahProduksi"),
        totalJumlahProduksiHtMl: sumArrayOfObject(jumlahProduksiMl, "jumlahProduksi"),
      });
    }
  }

  getToken = async () => {
    try {
      const tokenData = await getTokenPayload();
      this.setState({ tokenData });
    } catch (error) {
      notification.error({
        message: "Failed",
        description: "There's something error with token data",
      });
    }
  };

  getDetailCk4Ht = async () => {
    const payload = { idProses: this.props.match.params.id };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: endpoints.ck4HtDetailTasktodo,
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
        namaNppbkc: data.namaPerusahaan,
        nppbkc: data.nppbkc,
        alamatNppbkc: data.alamatPerusahaan,
        npwpNppbkc: data.npwp,

        idJenisLaporan: data.jenisLaporan,
        nomorPemberitahuan: data.nomorPemberitahuan,
        tanggalPemberitahuan: moment(data.tanggalPemberitahuan),

        periodeBulan: data.periodeBulan,
        periodeTahun: data.periodeTahun,
        tanggalProduksiAwal: moment(data.tanggalProduksiAwal),
        tanggalProduksiAkhir: moment(data.tanggalProduksiAkhir),

        idKota: data.idKota,
        namaKota: data.namaKota,
        namaPengusaha: data.namaPengusaha,
        isStck: data.isStck,
        kodeUploadPerbaikan: data.kodeUploadPerbaikan,

        kodeKantor: data.kodeKantor,
        namaKantor: data.namaKantor,

        dataSource: data.details.map((detail, index) => ({
          key: `ck4-${index}`,
          idCk4Detail: detail.idCk4Detail,
          idMerkHt: detail.idMerkHt,
          namaMerkHt: detail.namaMerkHt,
          jenisHt: detail.jenisProduksiHt,
          hjeHt: detail.hje,
          isiHt: detail.isiPerKemasan,
          bahanHt: detail.bahanKemasan,
          tarifHt: detail.tarif,
          satuanHt: detail.satuanHt,

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
  handleDownload = async () => {
    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: `${endpoints.s3Download}/${this.state.kodeUploadPerbaikan}`,
      setLoading: (bool) => this.setState({ isDownloadLoading: bool }),
      config: { responseType: "blob" },
    });

    if (response) download(response.data, `${new Date().getTime()}`);
  };

  handleSimpanTasktodo = async () => {
    const {
      status,
      isStck,
      nomorStck,
      tanggalStck,
      nomorSuratPermohonanPembatalan,
      tanggalSuratPermohonanPembatalan,
      alasan,
    } = this.state;

    const payload = {
      idProses: this.props.match.params.id,
      status,
      flagPembatalan: status === "SETUJU" ? "Y" : "N",
      nomorPersetujuanPembatalan: nomorSuratPermohonanPembatalan,
      tanggalPersetujuanPembatalan: tanggalSuratPermohonanPembatalan,
    };

    if (status === "SETUJU") {
      if (isStck) {
        payload.nomorStck = nomorStck;
        payload.tanggalStck = moment(tanggalStck, "DD-MM-YYYY").format("YYYY-MM-DD");
      }
    } else {
      payload.alasan = alasan;
    }

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: endpoints.ck4PembatalanTasktodo,
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
    if (this.state.isDetailLoading) return <LoadingWrapperSkeleton />;

    return (
      <>
        <Container menuName="Task To Do" contentName="CK4 HT Task To Do">
          <Card title={this.state.subtitle1} style={{ marginBottom: 30 }}>
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
          </Card>

          <Card title={this.state.subtitle2} style={{ marginBottom: 30 }}>
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
                    <Input id="nppbkc" value={this.state.nppbkc} disabled />
                  </div>

                  <div>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Alamat</FormLabel>
                    </div>
                    <Input.TextArea id="alamatNppbkc" value={this.state.alamatNppbkc} disabled />
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
                      <Select.Option value={this.state.idJenisLaporan}>
                        {this.state.namaJenisLaporan}
                      </Select.Option>
                    </Select>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor Pemberitahuan</FormLabel>
                    </div>
                    <Input id="nomorPemberitahuan" value={this.state.nomorPemberitahuan} disabled />
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
                          <Select.Option key={`periodeBulan-${index}`} value={item.monthCode}>
                            {item.monthName}
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
                          <Select.Option key={`periodeTahun-${index}`} value={item.yearCode}>
                            {item.yearName}
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
                        id="tanggalProduksiAwal"
                        format="DD-MM-YYYY"
                        value={this.state.tanggalProduksiAwal}
                        disabled
                      />
                      <div>s/d</div>
                      <DatePicker
                        id="tanggalProduksiAkhir"
                        format="DD-MM-YYYY"
                        value={this.state.tanggalProduksiAkhir}
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

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Produksi HT (btg)</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input
                        id="totalJumlahProduksiHtBtg"
                        value={this.state.totalJumlahProduksiHtBtg}
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
                        id="totalJumlahProduksiHtGr"
                        value={this.state.totalJumlahProduksiHtGr}
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
                        id="totalJumlahProduksiHtMl"
                        value={this.state.totalJumlahProduksiHtMl}
                        disabled
                      />
                      <div>mililiter</div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>

          <Card title={this.state.subtitle3}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Kep Tarif" style={{ height: 705 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Merk HT</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input id="namaMerkHt" value={this.state.namaMerkHt} disabled />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Hasil Tembakau</FormLabel>
                    </div>
                    <Input id="jenisHt" value={this.state.jenisHt} disabled />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>HJE</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input id="hjeHt" value={this.state.hjeHt} disabled />
                      <div>Rupiah</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Bahan Kemasan</FormLabel>
                    </div>
                    <Input id="bahanHt" value={this.state.bahanHt} disabled />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Isi per Kemasan</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input id="isiHt" value={this.state.isiHt} disabled />
                      {this.state.satuanHt && <div>{this.state.satuanHt}</div>}
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
                    <Card title="Jumlah Produksi dan Kemasan">
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
                          <div>Kemasan</div>
                        </div>
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Jumlah Produksi per Merk</FormLabel>
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
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <InputNumber
                            id="jumlahKemasanDilekatiPita"
                            value={this.state.jumlahKemasanDilekatiPita}
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
                </Card>
              </Col>
            </Row>
          </Card>

          <Table
            columns={this.state.columns}
            dataSource={this.state.dataSource}
            scroll={{ x: "max-content" }}
            onChange={this.handleTableChange}
            pagination={{ current: this.state.page }}
            style={{ marginTop: 30, marginBottom: 30 }}
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
                      data: this.state.totalJumlahKemasan,
                    },
                    {
                      key: "2",
                      title: "Jumlah Kemasan Dilekati Pita",
                      data: this.state.totalJumlahKemasanDilekatiPita,
                    },
                    {
                      key: "3",
                      title: "Jumlah Batang",
                      data: this.state.totalJumlahProduksiHtBtg,
                    },
                    {
                      key: "4",
                      title: "Jumlah Gram",
                      data: this.state.totalJumlahProduksiHtGr,
                    },
                    {
                      key: "5",
                      title: "Jumlah Militer",
                      data: this.state.totalJumlahProduksiHtMl,
                    },
                  ]}
                />
              );
            }}
          />

          <Card title={this.state.subtitle4} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Nomor Surat</FormLabel>
                </div>
                <Input
                  id="nomorSuratPermohonanPembatalan"
                  onChange={this.handleInputChange}
                  value={this.state.nomorSuratPermohonanPembatalan}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Surat</FormLabel>
                </div>
                <DatePicker
                  id="tanggalSuratPermohonanPembatalan"
                  format="DD-MM-YYYY"
                  onChange={(date) =>
                    this.handleDatepickerChange("tanggalSuratPermohonanPembatalan", date)
                  }
                  style={{ width: "100%" }}
                  value={this.state.tanggalSuratPermohonanPembatalan}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Download PDF</FormLabel>
                </div>

                <Button
                  type="primary"
                  loading={this.state.isDownloadLoading}
                  onClick={this.handleDownload}
                  disabled={!this.state.kodeUploadPerbaikan}
                >
                  Download
                </Button>
              </Col>
            </Row>
          </Card>

          <Card title={this.state.subtitle5} style={{ marginBottom: 30 }}>
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
                      id="keteranganPembatalan"
                      onChange={this.handleInputChange}
                      value={this.state.keteranganPembatalan}
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
          </Card>

          {this.state.status === "SETUJU" && this.state.isStck && (
            <Card title={this.state.subtitle6} style={{ marginBottom: 30 }}>
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
            </Card>
          )}

          <Row gutter={[16, 16]}>
            <Col span={4}>
              <ButtonCustom variant="secondary" onClick={() => this.props.history.goBack()} block>
                Kembali
              </ButtonCustom>
            </Col>

            {this.state.tokenData?.kode_kantor === this.state.kodeKantor &&
              this.state.tokenData?.role ===
                "a565468f-bbfa-43ab-b6b1-7c3c33631b33,a565468f-bbfa-43ab-b6b1-7c3c33631b33" && (
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
              )}
          </Row>
        </Container>

        {this.state.isStck && (
          <ModalStck
            isVisible={this.state.isModalDaftarStckVisible}
            onCancel={() => this.handleModalClose("isModalDaftarStckVisible")}
            onDataDoubleClick={this.handleDataStck}
            npwp={this.state.npwpNppbkc}
          />
        )}

        <ModalDaftarPenjabatBc
          isVisible={this.state.isModalDaftarPenjabatBcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarPenjabatBcVisible")}
          onDataDoubleClick={this.handleDataPenjabatBc}
        />
      </>
    );
  }
}
