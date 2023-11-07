import {
  Button,
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
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import ModalDaftarMerkBrck2 from "components/ModalDaftarMerkBrck2";
import ModalDaftarNPPBKC from "components/ModalDaftarNppbkc";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";
import { sumArrayOfObject } from "utils/sumArrayOfObject";

export default class BRCK2Rekam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalDaftarNppbkcVisible: false,
      isModalDaftarMerkVisible: false,
      isSearchLoading: false,
      isRekamLoading: false,
      isBrowseShow: false,

      idJenisBkc: 2,

      idNppbkc: null,
      nppbkc: null,
      namaNppbkc: null,
      idMerkMmea: null,
      namaMerkMmea: null,
      tarif: null,
      isi: null,
      periodeAwal: null,
      periodeAkhir: null,

      saldoAwalKemasan: null,
      saldoAwalLt: null,

      totalDebetKemasan: null,
      totalDebetLt: null,
      totalKreditKemasan: null,
      totalKreditLt: null,

      saldoBukuKemasan: null,
      saldoBukuLt: null,

      hasilPencacahanBack5Kemasan: null,
      hasilPencacahanBack5Lt: null,
      hasilPencarianBack5Description: null,
      noBack5: null,
      tglBack5: null,
      selisihKemasan: null,
      selisihLt: null,
      selisihDescription: null,
      batasKelonggaranKemasan: null,
      batasKelonggaranDescription: null,
      notif: null,
      jenisPenutupan: null,

      listJenisPenutupan: [
        {
          kodeJenisPenutupan: "PENUTUPAN TRIWULAN",
          namaJenisPenutupan: "PENUTUPAN TRIWULAN",
        },
        {
          kodeJenisPenutupan: "PERMOHONAN PENGUSAHA",
          namaJenisPenutupan: "PERMOHONAN PENGUSAHA",
        },
        {
          kodeJenisPenutupan: "DUGAAN PELANGGARAN",
          namaJenisPenutupan: "DUGAAN PELANGGARAN",
        },
      ],

      searchText: null,
      searchedColumn: null,
      page: 1,

      dataSource: [],
      columns: [
        {
          title: "DOKUMEN",
          children: [
            {
              key: "jenisDokumen",
              title: "JENIS",
              dataIndex: "jenisDokumen",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("jenisDokumen"),
            },
            {
              key: "nomorDokumen",
              title: "NOMOR",
              dataIndex: "nomorDokumen",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("nomorDokumen"),
            },
            {
              key: "tanggalDokumen",
              title: "TANGGAL",
              dataIndex: "tanggalDokumen",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("tanggalDokumen"),
            },
          ],
        },
        {
          key: "tanggalTransaksi",
          title: "TGL PEMASUKAN/ PEMBUATAN ATAU PENGELUARAN",
          dataIndex: "tanggalTransaksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tanggalTransaksi"),
        },
        {
          key: "uraianKegiatan",
          title: "URAIAN KEGIATAN",
          dataIndex: "uraianKegiatan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("uraianKegiatan"),
        },
        {
          title: "DEBET",
          fixed: "right",
          children: [
            {
              key: "debetKemasan",
              title: <div style={{ fontSize: 10 }}>KEMASAN</div>,
              dataIndex: "debetKemasan",
              width: 80,
              fixed: "right",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              key: "debetLt",
              title: <div style={{ fontSize: 10 }}>(Lt)</div>,
              dataIndex: "debetLt",
              width: 80,
              fixed: "right",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
          ],
        },
        {
          title: "KREDIT",
          fixed: "right",
          children: [
            {
              key: "kreditKemasan",
              title: <div style={{ fontSize: 10 }}>KEMASAN</div>,
              dataIndex: "kreditKemasan",
              width: 80,
              fixed: "right",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              key: "kreditLt",
              title: <div style={{ fontSize: 10 }}>(Lt)</div>,
              dataIndex: "kreditLt",
              width: 80,
              fixed: "right",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
          ],
        },
        {
          title: "SALDO",
          fixed: "right",
          children: [
            {
              key: "saldoKemasan",
              title: <div style={{ fontSize: 10 }}>KEMASAN</div>,
              dataIndex: "saldoKemasan",
              width: 80,
              fixed: "right",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              key: "saldoLt",
              title: <div style={{ fontSize: 10 }}>(Lt)</div>,
              dataIndex: "saldoLt",
              width: 80,
              fixed: "right",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
          ],
        },
        {
          key: "keterangan",
          title: "KETERANGAN",
          dataIndex: "keterangan",
          width: 80,
          fixed: "right",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
        },
      ],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.saldoAwalLt !== this.state.saldoAwalLt ||
      prevState.saldoAwalKemasan !== this.state.saldoAwalKemasan ||
      prevState.dataSource?.length !== this.state.dataSource?.length
    ) {
      if (this.state.dataSource?.length > 0) {
        this.calculateSaldo();
      }
    }

    if (
      prevState.dataSource.length !== this.state.dataSource.length ||
      prevState.hasilPencacahanBack5Kemasan !== this.state.hasilPencacahanBack5Kemasan ||
      prevState.hasilPencacahanBack5Lt !== this.state.hasilPencacahanBack5Lt
    ) {
      this.setState({
        totalDebetKemasan: sumArrayOfObject(this.state.dataSource, "debetKemasan"),
        totalDebetLt: sumArrayOfObject(this.state.dataSource, "debetLt"),
        totalKreditKemasan: sumArrayOfObject(this.state.dataSource, "kreditKemasan"),
        totalKreditLt: sumArrayOfObject(this.state.dataSource, "kreditLt"),
        selisihKemasan: this.state.hasilPencacahanBack5Kemasan - this.state.saldoBukuKemasan,
        selisihLt: this.state.hasilPencacahanBack5Lt - this.state.saldoBukuLt,
      });
    }

    if (
      (prevState.selisihKemasan !== this.state.selisihKemasan ||
        prevState.selisihLt !== this.state.selisihLt) &&
      Math.sign(this.state.selisihKemasan) !== 0
    ) {
      if (Math.sign(this.state.selisihKemasan) === -1) {
        this.setState({ selisihDescription: "Saldo - Hasil Pencacahan" });
      } else {
        this.setState({ selisihDescription: "Hasil Pencacahan - Saldo" });
      }
    }

    if (
      (prevState.selisihKemasan !== this.state.selisihKemasan &&
        Math.sign(this.state.selisihKemasan) === 1) ||
      (prevState.selisihLt !== this.state.selisihLt && Math.sign(this.state.selisihLt) === 1)
    ) {
      this.setState({
        batasKelonggaranKemasan: (1 / 100) * this.state.saldoBukuLt,
        batasKelonggaranDescription: `1% x ${this.state.saldoBukuLt}`,
      });
    }

    if (
      (prevState.batasKelonggaranKemasan !== this.state.batasKelonggaranKemasan ||
        prevState.selisihKemasan !== this.state.selisihKemasan ||
        prevState.selisihLt !== this.state.selisihLt) &&
      Math.sign(this.state.selisihKemasan) !== 0 &&
      Math.sign(this.state.selisihLt) !== 0
    ) {
      switch (true) {
        case Math.sign(this.state.selisihKemasan) === -1:
        case Math.sign(this.state.selisihLt) === -1:
          this.setState({
            notif: "Terdapat selisih dengan BACK-5 dan dikenai Sanksi Administrasi",
          });
          break;
        case (Math.sign(this.state.selisihKemasan) === 1 ||
          Math.sign(this.state.selisihLt) === 1) &&
          Math.abs(this.state.selisihLt) > this.state.batasKelonggaranKemasan &&
          Math.abs(this.state.selisihKemasan) > this.state.batasKelonggaranKemasan:
          this.setState({
            notif:
              "Jumlah kelebihan BKC lebih besar daripada Batas Kelonggaran, dikenal Sanksi Administrasi Denda",
          });
          break;
        case (Math.sign(this.state.selisihKemasan) === 1 ||
          Math.sign(this.state.selisihLt) === 1) &&
          Math.abs(this.state.selisihLt) <= this.state.batasKelonggaranKemasan &&
          Math.abs(this.state.selisihKemasan) <= this.state.batasKelonggaranKemasan:
          this.setState({
            notif:
              "Jumlah kelebihan BKC tidak lebih besar daripada Batas Kelonggaran tidak dikenai Sanksi Administrasi Denda",
          });
          break;
        default:
          this.setState({ notif: null });
          break;
      }
    }
  }

  getBrck2 = async () => {
    const payload = {
      nppbkc: this.state.nppbkc,
      namaMerk: this.state.namaMerkMmea,
      awalTanggalPeriode: moment(this.state.periodeAwal).format("YYYY-MM-DD"),
      akhirTanggalPeriode: moment(this.state.periodeAkhir).format("YYYY-MM-DD"),
    };

    this.setState({ isSearchLoading: true });

    const responseSaldoAwal = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/brck/saldo-awal-brck2",
      params: payload,
    });

    const responseProduksi = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/ck4/browse-brck2",
      params: payload,
    });

    const responsePerdagangan = await requestApi({
      service: "perdagangan",
      method: "get",
      endpoint: "/ck5/browse-brck2",
      params: payload,
    });

    if (responseSaldoAwal && responseProduksi && responsePerdagangan) {
      let saldoKemasan = this.state.saldoAwalKemasan || 0;
      let saldoLt = this.state.saldoAwalLt || 0;

      const data = [...responseProduksi.data.data, ...responsePerdagangan.data.data];

      const newData = data
        ?.sort((a, b) => {
          const date1 = new Date(a?.tanggalCio);
          const date2 = new Date(b?.tanggalCio);

          if (date1 < date2) {
            return -1;
          } else if (date1 > date2) {
            return 1;
          } else {
            return 0;
          }
        })
        ?.map((item, index) => {
          if (item.jenisTransaksi === "K") {
            saldoKemasan -= +item.jumlahKemasan || 0;
            saldoLt -= +item.jumlah || 0;
          } else if (item.jenisTransaksi === "D") {
            saldoKemasan += +item.jumlahKemasan || 0;
            saldoLt += +item.jumlah || 0;
          }

          return {
            key: `brck-2-ck5-${index}`,
            jenisDokumen: item.jenisDok,
            nomorDokumen: item.nomorDok,
            tanggalDokumen: moment(item.tanggalDok).format("DD-MM-YYYY"),
            tanggalTransaksi: moment(item.tanggalCio).format("DD-MM-YYYY"),
            uraianKegiatan: item.uraianKegiatan,
            debetKemasan: item.jenisTransaksi === "D" ? +item.jumlahKemasan : 0,
            debetLt: item.jenisTransaksi === "D" ? +item.jumlah : 0,
            kreditKemasan: item.jenisTransaksi === "K" ? +item.jumlahKemasan : 0,
            kreditLt: item.jenisTransaksi === "K" ? +item.jumlah : 0,
            saldoKemasan: saldoKemasan,
            saldoLt: saldoLt,
          };
        });

      this.setState({
        isBrowseShow: true,
        dataSource: newData,
        saldoAwalLt: responseSaldoAwal.data.data.saldoAwalLiter,
        saldoAwalKemasan: responseSaldoAwal.data.data.saldoAwalKemasan,
        saldoBukuKemasan: saldoKemasan,
        saldoBukuLt: saldoLt,
      });
    }

    this.setState({ isSearchLoading: false });
  };

  calculateSaldo = () => {
    let saldoKemasan = this.state.saldoAwalKemasan || 0;
    let saldoLt = this.state.saldoAwalLt || 0;

    const newData = this.state.dataSource?.map((item) => {
      saldoKemasan = saldoKemasan + item.debetKemasan - item.kreditKemasan;
      saldoLt = saldoLt + item.debetLt - item.kreditLt;
      return { ...item, saldoKemasan: saldoKemasan, saldoLt: saldoLt };
    });

    this.setState({
      dataSource: newData,
      saldoBukuLt: saldoLt,
      saldoBukuKemasan: saldoKemasan,
    });
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

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value.toUpperCase() });
  };
  handleInputNumberChange = (field, value) => {
    this.setState({ [field]: typeof value === "number" ? value : 0 });
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
      idNppbkc: record.idNppbkc,
      nppbkc: record.nppbkc,
      namaNppbkc: record.namaNppbkc,
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };
  handleDaftarMerkBrck2 = (record) => {
    this.setState({
      idMerkMmea: record.idMerkMmea,
      namaMerkMmea: record.namaMerkMmea,
      tarif: record.tarif,
      isi: record.isi,
    });

    this.handleModalClose("isModalDaftarMerkVisible");
  };

  handleSearch = () => {
    if (
      !this.state.idNppbkc ||
      !this.state.idMerkMmea ||
      !this.state.periodeAkhir ||
      !this.state.periodeAkhir
    ) {
      return notification.info({ message: "Info", description: "Data tidak boleh kosong" });
    }

    this.getBrck2();
  };
  handleReset = () => {
    this.setState({
      idNppbkc: null,
      nppbkc: null,
      namaNppbkc: null,
      namaMerkMmea: null,
      tarif: null,
      isi: null,
      periodeAwal: null,
      periodeAkhir: null,
    });
  };

  handleRekam = async () => {
    const {
      idNppbkc,
      nppbkc,
      namaNppbkc,
      idMerkMmea,
      namaMerkMmea,
      tarif,
      isi,
      periodeAwal,
      periodeAkhir,

      saldoAwalLt,
      saldoAwalKemasan,

      hasilPencacahanBack5Lt,
      hasilPencacahanBack5Kemasan,
      hasilPencarianBack5Description,
      selisihLt,
      selisihKemasan,
      batasKelonggaranKemasan,
      noBack5,
      tglBack5,
      jenisPenutupan,
    } = this.state;

    const payload = {
      idNppbkc: idNppbkc,
      nppbkc: nppbkc,
      namaPerusahaan: namaNppbkc,
      idMerk: idMerkMmea,
      namaMerk: namaMerkMmea,
      tarif: tarif,
      isi: isi,
      periodeAwal: periodeAwal,
      periodeAkhir: periodeAkhir,
      saldoAwalLt: saldoAwalLt,
      saldoAwalKemasan: saldoAwalKemasan,
      hasilCacahLt: hasilPencacahanBack5Lt,
      hasilCacahKemasan: hasilPencacahanBack5Kemasan,
      keteranganHasilCacah: hasilPencarianBack5Description,
      selisihLt: Math.abs(selisihLt),
      selisihKemasan: Math.abs(selisihKemasan),
      flagSelisih: Math.abs(selisihLt) || Math.abs(selisihKemasan) ? "Y" : "N",
      nomorBack5: noBack5,
      tanggalBack5: moment(tglBack5, "DD-MM-YYYY").format("YYYY-MM-DD"),
      kekuranganLt: Math.sign(selisihLt) === -1 ? Math.abs(selisihLt) : null,
      kekuranganKemasan: Math.sign(selisihKemasan) === -1 ? Math.abs(selisihKemasan) : null,
      flagSanksi:
        Math.sign(selisihKemasan) === -1 ||
        Math.sign(selisihLt) === -1 ||
        ((Math.sign(selisihKemasan) === 1 || Math.sign(selisihLt) === 1) &&
          selisihLt > batasKelonggaranKemasan &&
          selisihKemasan > batasKelonggaranKemasan)
          ? "Y"
          : "N",
      jenisPenutupan: jenisPenutupan,
    };

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: "/brck/rekam-brck2",
      body: payload,
      setLoading: (bool) => this.setState({ isRekamLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.props.history.push(`${pathName}/brck-2`);
    }
  };

  render() {
    return (
      <>
        <Container menuName="Buku Rekening Cukai" contentName="BRCK-2 Rekam">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div style={{ marginBottom: 10 }}>
                <FormLabel>NPPBKC</FormLabel>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Input id="nppbkc" value={this.state.nppbkc} disabled />
                <Button
                  type="primary"
                  onClick={() => this.handleModalShow("isModalDaftarNppbkcVisible")}
                >
                  Cari
                </Button>
                <Input id="namaNppbkc" value={this.state.namaNppbkc} disabled />
              </div>
            </Col>

            <Col span={12}>
              <div style={{ marginBottom: 10 }}>
                <FormLabel>Merk</FormLabel>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Input id="namaMerkMmea" value={this.state.namaMerkMmea} disabled />
                <Button
                  type="primary"
                  onClick={() => this.handleModalShow("isModalDaftarMerkVisible")}
                >
                  Cari
                </Button>
              </div>
            </Col>

            <Col span={12}>
              <div style={{ marginBottom: 10 }}>
                <FormLabel>Tarif</FormLabel>
              </div>
              <Input id="tarif" value={this.state.tarif} disabled />
            </Col>

            <Col span={12}>
              <div style={{ marginBottom: 10 }}>
                <FormLabel>Isi</FormLabel>
              </div>
              <Input id="isi" value={this.state.isi} disabled />
            </Col>

            <Col span={12}>
              <div style={{ marginBottom: 10 }}>
                <FormLabel>Periode</FormLabel>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <DatePicker
                  id="periodeAwal"
                  format="DD-MM-YYYY"
                  onChange={(date) => this.handleDatepickerChange("periodeAwal", date)}
                  value={this.state.periodeAwal}
                  style={{ width: "100%" }}
                />
                <div>s.d</div>
                <DatePicker
                  id="periodeAkhir"
                  format="DD-MM-YYYY"
                  onChange={(date) => this.handleDatepickerChange("periodeAkhir", date)}
                  value={this.state.periodeAkhir}
                  style={{ width: "100%" }}
                />
              </div>
            </Col>
          </Row>

          <Row style={{ marginTop: 30 }}>
            <Col span={8} offset={16}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Button
                    type="primary"
                    onClick={this.handleSearch}
                    loading={this.state.isSearchLoading}
                    block
                  >
                    Tampilkan
                  </Button>
                </Col>

                <Col span={12}>
                  <Button type="danger" block onClick={this.handleReset}>
                    Reset
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          {this.state.isBrowseShow && (
            <>
              <div style={{ marginTop: 30, marginBottom: 20 }}>
                <Row style={{ marginBottom: 20 }}>
                  <Col span={15} offset={9}>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>
                            SALDO AWAL KEMASAN <br /> (Hasil penutupan periode sebelumnya)
                          </FormLabel>
                        </div>
                        <InputNumber
                          value={this.state.saldoAwalKemasan}
                          onChange={(value) =>
                            this.handleInputNumberChange("saldoAwalKemasan", value)
                          }
                          min={0}
                          style={{ width: "100%" }}
                          disabled={this.state.saldoAwalKemasan !== null}
                        />
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>
                            SALDO AWAL (lt) <br /> (Hasil penutupan periode sebelumnya)
                          </FormLabel>
                        </div>
                        <InputNumber
                          value={this.state.saldoAwalLt}
                          onChange={(value) => this.handleInputNumberChange("saldoAwalLt", value)}
                          min={0}
                          style={{ width: "100%" }}
                          disabled={this.state.saldoAwalLt !== null}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Table
                  columns={this.state.columns}
                  dataSource={this.state.dataSource}
                  loading={this.state.isSearchLoading}
                  pagination={{ current: this.state.page }}
                  onChange={(page) => this.setState({ page: page.current })}
                  scroll={{ x: "max-content" }}
                  footer={() => {
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
                              <div style={{ textAlign: "center" }}>{text}</div>
                            ),
                          },
                          {
                            key: "totalDebetKemasan",
                            title: "Debet Kemasan",
                            dataIndex: "totalDebetKemasan",
                            width: 80,
                            fixed: "right",
                            render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                          },
                          {
                            key: "totalDebetLt",
                            title: "Debet (Lt)",
                            dataIndex: "totalDebetLt",
                            width: 80,
                            fixed: "right",
                            render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                          },
                          {
                            key: "totalKreditKemasan",
                            title: "Kredit Kemasan",
                            dataIndex: "totalKreditKemasan",
                            width: 80,
                            fixed: "right",
                            render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                          },
                          {
                            key: "totalKreditLt",
                            title: "Kredit (Lt)",
                            dataIndex: "totalKreditLt",
                            width: 80,
                            fixed: "right",
                            render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                          },
                          {
                            key: "totalSaldoKemasan",
                            title: "Saldo Kemasan",
                            dataIndex: "totalSaldoKemasan",
                            width: 80,
                            fixed: "right",
                            render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                          },
                          {
                            key: "totalSaldoLt",
                            title: "Saldo (Lt)",
                            dataIndex: "totalSaldoLt",
                            width: 80,
                            fixed: "right",
                            render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                          },
                          {
                            key: "totalKeterangan",
                            title: "Keterangan",
                            dataIndex: "totalKeterangan",
                            width: 80,
                            fixed: "right",
                            render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                          },
                        ]}
                        dataSource={[
                          {
                            key: "1",
                            title: "Jumlah",
                            totalDebetKemasan: this.state.totalDebetKemasan,
                            totalDebetLt: this.state.totalDebetLt,
                            totalKreditKemasan: this.state.totalKreditKemasan,
                            totalKreditLt: this.state.totalKreditLt,
                            totalSaldoKemasan: this.state.saldoBukuKemasan,
                            totalSaldoLt: this.state.saldoBukuLt,
                            totalKeterangan: `Size Data: ${this.state.dataSource.length}`,
                          },
                          {
                            key: "2",
                            title: "Saldo Buku",
                            totalDebetKemasan: null,
                            totalDebetLt: null,
                            totalKreditKemasan: null,
                            totalKreditLt: null,
                            totalSaldoKemasan: this.state.saldoBukuKemasan,
                            totalSaldoLt: this.state.saldoBukuLt,
                            totalKeterangan: null,
                          },
                          {
                            key: "3",
                            title: "Selisih",
                            totalDebetKemasan: null,
                            totalDebetLt: null,
                            totalKreditKemasan: null,
                            totalKreditLt: null,
                            totalSaldoKemasan: Math.abs(this.state.selisihKemasan),
                            totalSaldoLt: Math.abs(this.state.selisihLt),
                            totalKeterangan: null,
                          },
                          {
                            key: "4",
                            title: "Saldo Akhir",
                            totalDebetKemasan: null,
                            totalDebetLt: null,
                            totalKreditKemasan: null,
                            totalKreditLt: null,
                            totalSaldoKemasan: this.state.hasilPencacahanBack5Kemasan,
                            totalSaldoLt: this.state.hasilPencacahanBack5Lt,
                            totalKeterangan: null,
                          },
                        ]}
                      />
                    );
                  }}
                />
              </div>

              <Row gutter={[10, 10]}>
                <Col span={21} offset={3}>
                  <Row gutter={[10, 10]}>
                    <Col span={5} offset={8}>
                      Kemasan
                    </Col>
                    <Col span={5}>Liter</Col>
                    <Col span={6}>Keterangan</Col>
                  </Row>

                  <Row gutter={[10, 10]}>
                    <Col span={8}>
                      <div
                        style={{
                          height: 32,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "end",
                        }}
                      >
                        Hasil Pencacahan (BACK-5)
                      </div>
                    </Col>
                    <Col span={5}>
                      <InputNumber
                        id="hasilPencacahanBack5Kemasan"
                        value={this.state.hasilPencacahanBack5Kemasan}
                        onChange={(value) => {
                          this.handleInputNumberChange("hasilPencacahanBack5Kemasan", value);
                          this.setState({
                            hasilPencacahanBack5Lt:
                              (typeof value === "number" ? value : 0) * (this.state.isi || 1),
                          });
                        }}
                        style={{ width: "100%" }}
                      />
                    </Col>
                    <Col span={5}>
                      <InputNumber
                        id="hasilPencacahanBack5Lt"
                        value={this.state.hasilPencacahanBack5Lt}
                        onChange={(value) => {
                          this.handleInputNumberChange("hasilPencacahanBack5Lt", value);

                          this.setState({
                            hasilPencacahanBack5Kemasan:
                              (typeof value === "number" ? value : 0) / (this.state.isi || 1),
                          });
                        }}
                        style={{ width: "100%" }}
                      />
                    </Col>
                    <Col span={6}>
                      <Input.TextArea
                        id="hasilPencarianBack5Description"
                        value={this.state.hasilPencarianBack5Description}
                        onChange={this.handleInputChange}
                        autoSize
                      />
                    </Col>
                  </Row>

                  <Row gutter={[10, 10]}>
                    <Col span={8}>
                      <div
                        style={{
                          height: 32,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "end",
                        }}
                      >
                        No. BACK-5
                      </div>
                    </Col>
                    <Col span={5}>
                      <Input
                        id="noBack5"
                        onChange={this.handleInputChange}
                        value={this.state.noBack5}
                      />
                    </Col>
                  </Row>

                  <Row gutter={[10, 10]}>
                    <Col span={8}>
                      <div
                        style={{
                          height: 32,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "end",
                        }}
                      >
                        Tgl. BACK-5
                      </div>
                    </Col>
                    <Col span={5}>
                      <DatePicker
                        id="tglBack5"
                        format="DD-MM-YYYY"
                        onChange={(date) => this.handleDatepickerChange("tglBack5", date)}
                        value={this.state.tglBack5}
                        style={{ width: "100%" }}
                      />
                    </Col>
                  </Row>

                  {Math.sign(this.state.selisihKemasan) !== 0 && (
                    <Row gutter={[10, 10]}>
                      <Col span={8}>
                        <div
                          style={{
                            height: 32,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "end",
                          }}
                        >
                          {Math.sign(this.state.selisihKemasan) === -1
                            ? "Selisih Kurang"
                            : "Selisih Lebih"}
                        </div>
                      </Col>
                      <Col span={5}>
                        <InputNumber
                          id="selisihKemasan"
                          value={Math.abs(this.state.selisihKemasan)}
                          style={{ width: "100%" }}
                          disabled
                        />
                      </Col>
                      <Col span={5}>
                        <InputNumber
                          id="selisihLt"
                          value={Math.abs(this.state.selisihLt)}
                          style={{ width: "100%" }}
                          disabled
                        />
                      </Col>
                      <Col span={6}>
                        <Input.TextArea
                          id="selisihDescription"
                          value={this.state.selisihDescription}
                          autoSize
                          disabled
                        />
                      </Col>
                    </Row>
                  )}

                  {Math.sign(this.state.selisihKemasan) === 1 && (
                    <Row gutter={[10, 10]}>
                      <Col span={8}>
                        <div
                          style={{
                            height: 32,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "end",
                          }}
                        >
                          Batas Kelonggaran
                        </div>
                      </Col>

                      <Col span={5}>
                        <InputNumber
                          id="batasKelonggaranKemasan"
                          value={this.state.batasKelonggaranKemasan}
                          style={{ width: "100%" }}
                          disabled
                        />
                      </Col>

                      <Col span={6} offset={5}>
                        <Input.TextArea
                          id="batasKelonggaranDescription"
                          value={this.state.batasKelonggaranDescription}
                          autoSize
                          disabled
                        />
                      </Col>
                    </Row>
                  )}

                  {Math.sign(this.state.selisihKemasan) !== 0 && (
                    <Row gutter={[10, 10]}>
                      <Col
                        span={11}
                        offset={13}
                        style={{
                          color:
                            Math.sign(this.state.selisihKemasan) === -1 ||
                            Math.sign(this.state.selisihLt) === -1 ||
                            ((Math.sign(this.state.selisihKemasan) === 1 ||
                              Math.sign(this.state.selisihLt) === 1) &&
                              this.state.selisihLt > this.state.batasKelonggaranKemasan &&
                              this.state.selisihKemasan > this.state.batasKelonggaranKemasan)
                              ? "red"
                              : "blue",
                        }}
                      >
                        {this.state.notif}
                      </Col>
                    </Row>
                  )}

                  <Row gutter={[10, 50]}>
                    <Col span={8} offset={9}>
                      <div
                        style={{
                          height: 32,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "end",
                        }}
                      >
                        Jenis Penutupan
                      </div>
                    </Col>
                    <Col span={7}>
                      <Select
                        id="jenisPenutupan"
                        value={this.state.jenisPenutupan}
                        onChange={(value) => this.handleSelectChange("jenisPenutupan", value)}
                        style={{ width: "100%" }}
                      >
                        {this.state.listJenisPenutupan.length > 0 &&
                          this.state.listJenisPenutupan.map((item, index) => (
                            <Select.Option
                              key={`jenis-penutupan-${index}`}
                              value={item.kodeJenisPenutupan}
                            >
                              {item.namaJenisPenutupan}
                            </Select.Option>
                          ))}
                      </Select>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          )}

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
        </Container>

        <ModalDaftarNPPBKC
          isVisible={this.state.isModalDaftarNppbkcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarNppbkcVisible")}
          onDataDoubleClick={this.handleDataNppbkc}
          idJenisBkc={this.state.idJenisBkc}
        />

        <ModalDaftarMerkBrck2
          isVisible={this.state.isModalDaftarMerkVisible}
          onCancel={() => this.handleModalClose("isModalDaftarMerkVisible")}
          onDataDoubleClick={this.handleDaftarMerkBrck2}
        />
      </>
    );
  }
}
