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
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import ModalDaftarNPPBKC from "components/ModalDaftarNppbkc";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";
import { sumArrayOfObject } from "utils/sumArrayOfObject";

export default class BRCK1Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetailLoading: true,
      isSearchLoading: false,
      isUpdateLoading: false,
      isBrowseShow: false,
      isModalDaftarNppbkcVisible: false,
      isModalDaftarMerkVisible: false,

      idJenisBkc: 1,

      idNppbkc: null,
      nppbkc: null,
      namaNppbkc: null,
      periodeAwal: null,
      periodeAkhir: null,

      saldoAwal: null,

      totalDebet: null,
      totalKredit: null,

      saldoBuku: null,

      hasilPencacahanBack5: null,
      hasilPencarianBack5Description: null,
      noBack5: null,
      tglBack5: null,
      selisih: null,
      selisihDescription: null,
      potongan: null,
      potonganDescription: null,
      kekurangan: null,
      kekuranganDescription: null,
      batasKelonggaran: null,
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
          key: "jumlahKemasan",
          title: "JUMLAH KEMASAN",
          dataIndex: "jumlahKemasan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jumlahKemasan"),
        },
        {
          key: "isi",
          title: "ISI/ KEMASAN",
          dataIndex: "isi",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("isi"),
        },
        {
          title: "TRANSAKSI",
          fixed: "right",
          children: [
            {
              key: "transaksiDebet",
              title: "DEBIT (Lt)",
              dataIndex: "transaksiDebet",
              fixed: "right",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              key: "transaksiKredit",
              title: "KREDIT (Lt)",
              dataIndex: "transaksiKredit",
              fixed: "right",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
          ],
        },
        {
          key: "saldo",
          title: "SALDO",
          dataIndex: "saldo",
          fixed: "right",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
        },
        {
          key: "keterangan",
          title: "KETERANGAN",
          dataIndex: "keterangan",
          fixed: "right",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
        },
      ],
    };
  }

  componentDidMount() {
    this.getDetailBrck1();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.saldoAwal !== this.state.saldoAwal ||
      prevState.dataSource?.length !== this.state.dataSource?.length
    ) {
      if (this.state.dataSource?.length > 0) {
        this.calculateSaldo();
      }
    }

    if (
      prevState.dataSource.length !== this.state.dataSource.length ||
      prevState.hasilPencacahanBack5 !== this.state.hasilPencacahanBack5
    ) {
      this.setState({
        totalDebet: sumArrayOfObject(this.state.dataSource, "transaksiDebet"),
        totalKredit: sumArrayOfObject(this.state.dataSource, "transaksiKredit"),
        selisih: (this.state.hasilPencacahanBack5 - this.state.saldoBuku).toFixed(4),
      });
    }

    if (
      (prevState.selisih !== this.state.selisih || prevState.saldoAwal !== this.state.saldoAwal) &&
      Math.sign(this.state.selisih) !== 0
    ) {
      if (Math.sign(this.state.selisih) === -1) {
        const hasilPotong = (
          (0.5 / 100) *
          (this.state.saldoBuku || 0 + this.state.saldoAwal || 0)
        ).toFixed(4);

        this.setState({
          selisihDescription: `${this.state.saldoBuku} - ${this.state.hasilPencacahanBack5}`,
          potongan: hasilPotong,
          potonganDescription: `0.5% x (${this.state.saldoBuku} + ${this.state.saldoAwal || 0})`,
          kekurangan:
            Math.sign((Math.abs(this.state.selisih) - hasilPotong).toFixed(4)) === -1
              ? 0
              : (Math.abs(this.state.selisih) - hasilPotong).toFixed(4),
          kekuranganDescription:
            Math.sign((Math.abs(this.state.selisih) - hasilPotong).toFixed(4)) === -1
              ? "Selisih Kurang < Potongan"
              : `${Math.abs(this.state.selisih)} - ${hasilPotong}`,
          batasKelonggaran: (3 * hasilPotong).toFixed(4),
          batasKelonggaranDescription: `3 x ${hasilPotong}`,
        });
      }

      if (Math.sign(this.state.selisih) === 1) {
        this.setState({
          selisihDescription: `(${this.state.hasilPencacahanBack5} - ${this.state.saldoBuku})`,
          batasKelonggaran: (1 / 100) * this.state.saldoBuku,
          batasKelonggaranDescription: `1% x ${this.state.saldoBuku}`,
        });
      }
    }

    if (
      (prevState.selisih !== this.state.selisih ||
        prevState.kekurangan !== this.state.kekurangan ||
        prevState.batasKelonggaran !== this.state.batasKelonggaran) &&
      Math.sign(this.state.selisih) !== 0
    ) {
      switch (true) {
        case Math.sign(this.state.selisih) === -1 &&
          this.state.kekurangan > this.state.batasKelonggaran:
          this.setState({
            notif:
              "Jumlah kekurangan setelah potongan lebih besar daripada Batas Kelonggaran, dikenakan Sanksi Administrasi Denda",
          });
          break;
        case Math.sign(this.state.selisih) === -1 &&
          this.state.kekurangan <= this.state.batasKelonggaran:
          this.setState({
            notif:
              "Jumlah kekurangan setelah potongan tidak lebih besar daripada Batas Kelonggaran, tidak dikenakan Sanksi Administrasi Denda",
          });
          break;
        case Math.sign(this.state.selisih) === 1 &&
          this.state.selisih > this.state.batasKelonggaran:
          this.setState({
            notif:
              "Jumlah kelebihan BKC lebih besar daripada Batas Kelonggaran, dikenakan Sanksi Administrasi Denda",
          });
          break;
        case Math.sign(this.state.selisih) === 1 &&
          this.state.selisih <= this.state.batasKelonggaran:
          this.setState({
            notif:
              "Jumlah kelebihan BKC tidak lebih besar daripada Batas Kelonggaran, tidak dikenakan Sanksi Administrasi Denda",
          });
          break;
        default:
          this.setState({ notif: null });
          break;
      }
    }
  }

  getDetailBrck1 = async () => {
    const payload = { idBrck1: this.props.match.params.id };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/brck/detail-brck1",
      params: payload,
      setLoading: (bool) => this.setState({ isDetailLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState(
        {
          idNppbkc: data.idNppbkc,
          nppbkc: data.nppbkc,
          namaNppbkc: data.namaPerusahaan,
          periodeAwal: moment(data.periodeAwal),
          periodeAkhir: moment(data.periodeAkhir),
          saldoAwal: data.saldoAwal,
          hasilPencacahanBack5: data.hasilCacah,
          hasilPencarianBack5Description: data.keteranganCacah,
          noBack5: data.nomorBack5,
          tglBack5: moment(data.tanggalBack5),
          jenisPenutupan: data.jenisPenutupan,
        },
        () => this.getBrck1()
      );
    }
  };

  getBrck1 = async () => {
    const { nppbkc, periodeAwal, periodeAkhir } = this.state;

    const payload = {
      nppbkc,
      awalTanggalPeriode: moment(periodeAwal).format("YYYY-MM-DD"),
      akhirTanggalPeriode: moment(periodeAkhir).format("YYYY-MM-DD"),
    };

    this.setState({ isSearchLoading: true });

    const responseSaldoAwal = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/brck/saldo-awal-brck1",
      params: payload,
    });

    const responseProduksi = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/ck4/browse-brck1",
      params: payload,
    });

    const responsePerdagangan = await requestApi({
      service: "perdagangan",
      method: "get",
      endpoint: "/ck5/browse-brck1",
      params: payload,
    });

    if (responseSaldoAwal && responseProduksi && responsePerdagangan) {
      const data = [...responseProduksi.data.data, ...responsePerdagangan.data.data];

      let saldo = this.state.saldoAwal || 0;

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
            saldo -= +item.jumlah || 0;
          } else if (item.jenisTransaksi === "D") {
            saldo += +item.jumlah || 0;
          }

          return {
            key: `brck1-ck5-${index}`,
            jenisDokumen: item.jenisDok,
            nomorDokumen: item.nomorDok,
            tanggalDokumen: moment(item.tanggalDok).format("DD-MM-YYYY"),
            tanggalTransaksi: moment(item.tanggalCio).format("DD-MM-YYYY"),
            uraianKegiatan: item.uraianKegiatan,
            jumlahKemasan: item.jumlahKemasan,
            jumlah: item.jumlah,
            isi: item.isiPerKemasan,
            transaksiDebet: item.jenisTransaksi === "D" ? item.jumlah : 0,
            transaksiKredit: item.jenisTransaksi === "K" ? item.jumlah : 0,
            saldo,
          };
        });

      this.setState({
        isBrowseShow: true,
        dataSource: newData,
        saldoAwal: responseSaldoAwal.data.data,
        saldoBuku: saldo,
      });
    }

    this.setState({ isSearchLoading: false });
  };

  calculateSaldo = () => {
    let saldo = this.state.saldoAwal || 0;

    const newData = this.state.dataSource?.map((item) => ({
      ...item,
      saldo: saldo + item.transaksiDebet - item.transaksiKredit,
    }));

    this.setState({ dataSource: newData, saldoBuku: saldo });
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

  handleSearch = async () => {
    if (!this.state.idNppbkc || !this.state.periodeAkhir || !this.state.periodeAkhir) {
      return notification.info({ message: "Info", description: "Data tidak boleh kosong" });
    }

    await this.getBrck1();
  };
  handleReset = () => {
    this.setState({
      idNppbkc: null,
      nppbkc: null,
      namaNppbkc: null,
      periodeAwal: null,
      periodeAkhir: null,
    });
  };

  render() {
    if (this.state.isDetailLoading) return <LoadingWrapperSkeleton />;

    return (
      <>
        <Container menuName="Buku Rekening Cukai" contentName="BRCK-1 Detail">
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
                  disabled
                >
                  Cari
                </Button>
                <Input id="namaNppbkc" value={this.state.namaNppbkc} disabled />
              </div>
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
                  disabled
                />
                <div>s.d</div>
                <DatePicker
                  id="periodeAkhir"
                  format="DD-MM-YYYY"
                  onChange={(date) => this.handleDatepickerChange("periodeAkhir", date)}
                  value={this.state.periodeAkhir}
                  style={{ width: "100%" }}
                  disabled
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
                    disabled
                  >
                    Tampilkan
                  </Button>
                </Col>

                <Col span={12}>
                  <Button type="danger" block onClick={this.handleReset} disabled>
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
                  <Col span={8} offset={16}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>
                        SALDO AWAL <br /> (Hasil penutupan periode sebelumnya)
                      </FormLabel>
                    </div>
                    <InputNumber
                      id="saldoAwal"
                      value={this.state.saldoAwal}
                      onChange={(value) => this.handleInputNumberChange("saldoAwal", value)}
                      min={0}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>
                </Row>

                <Table
                  columns={this.state.columns}
                  dataSource={this.state.dataSource}
                  loading={this.state.isSearchLoading}
                  scroll={{ x: "max-content" }}
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
                            render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                          },
                          {
                            key: "transaksiDebet",
                            title: "Transaksi Debit",
                            dataIndex: "transaksiDebet",
                            width: 101,
                            fixed: "right",
                            render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                          },
                          {
                            key: "transaksiKredit",
                            title: "Transaksi Kredit",
                            dataIndex: "transaksiKredit",
                            width: 101,
                            fixed: "right",
                            render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                          },
                          {
                            key: "saldo",
                            title: "Saldo",
                            dataIndex: "saldo",
                            width: 101,
                            fixed: "right",
                            render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                          },
                          {
                            key: "keterangan",
                            title: "Keterangan",
                            dataIndex: "keterangan",
                            width: 101,
                            fixed: "right",
                            render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                          },
                        ]}
                        dataSource={[
                          {
                            key: "1",
                            title: "Jumlah",
                            transaksiDebet: this.state.totalDebet,
                            transaksiKredit: this.state.totalKredit,
                            saldo: this.state.saldoBuku,
                            keterangan: `Size Data: ${this.state.dataSource.length}`,
                          },
                          {
                            key: "2",
                            title: "Saldo Buku",
                            transaksiDebet: null,
                            transaksiKredit: null,
                            saldo: this.state.saldoBuku,
                            keterangan: null,
                          },
                          {
                            key: "3",
                            title: "Selisih",
                            transaksiDebet: null,
                            transaksiKredit: null,
                            saldo: Math.abs(this.state.selisih),
                            keterangan: null,
                          },
                          {
                            key: "4",
                            title: "Saldo Akhir",
                            transaksiDebet: null,
                            transaksiKredit: null,
                            saldo: this.state.hasilPencacahanBack5,
                            keterangan: null,
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
                    <Col span={13}>
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
                        id="hasilPencacahanBack5"
                        value={this.state.hasilPencacahanBack5}
                        onChange={(value) => {
                          this.handleInputNumberChange("hasilPencacahanBack5", value);
                        }}
                        style={{ width: "100%" }}
                        disabled
                      />
                    </Col>
                    <Col span={6}>
                      <Input.TextArea
                        id="hasilPencarianBack5Description"
                        value={this.state.hasilPencarianBack5Description}
                        onChange={this.handleInputChange}
                        autoSize
                        disabled
                      />
                    </Col>
                  </Row>

                  <Row gutter={[10, 10]}>
                    <Col span={13}>
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
                        disabled
                      />
                    </Col>
                  </Row>

                  <Row gutter={[10, 10]}>
                    <Col span={13}>
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
                        disabled
                      />
                    </Col>
                  </Row>

                  {Math.sign(this.state.selisih) !== 0 && (
                    <>
                      <Row gutter={[10, 10]}>
                        <Col span={13}>
                          <div
                            style={{
                              height: 32,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "end",
                            }}
                          >
                            {Math.sign(this.state.selisih) === -1
                              ? "Selisih Kurang"
                              : "Selisih Lebih"}
                          </div>
                        </Col>
                        <Col span={5}>
                          <InputNumber
                            id="selisih"
                            value={Math.abs(this.state.selisih)}
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

                      {Math.sign(this.state.selisih) === -1 && (
                        <>
                          <Row gutter={[10, 10]}>
                            <Col span={13}>
                              <div
                                style={{
                                  height: 32,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "end",
                                }}
                              >
                                Potongan
                              </div>
                            </Col>
                            <Col span={5}>
                              <InputNumber
                                id="potongan"
                                value={this.state.potongan}
                                style={{ width: "100%" }}
                                disabled
                              />
                            </Col>
                            <Col span={6}>
                              <Input.TextArea
                                id="potonganDescription"
                                value={this.state.potonganDescription}
                                autoSize
                                disabled
                              />
                            </Col>
                          </Row>

                          <Row gutter={[10, 10]}>
                            <Col span={13}>
                              <div
                                style={{
                                  height: 32,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "end",
                                }}
                              >
                                Kekurangan
                              </div>
                            </Col>
                            <Col span={5}>
                              <InputNumber
                                id="kekurangan"
                                value={this.state.kekurangan}
                                style={{ width: "100%" }}
                                disabled
                              />
                            </Col>
                            <Col span={6}>
                              <Input.TextArea
                                id="kekuranganDescription"
                                value={this.state.kekuranganDescription}
                                autoSize
                                disabled
                              />
                            </Col>
                          </Row>
                        </>
                      )}
                    </>
                  )}

                  {Math.sign(this.state.selisih) !== 0 && (
                    <Row gutter={[10, 10]}>
                      <Col span={13}>
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
                          id="batasKelonggaran"
                          value={this.state.batasKelonggaran}
                          style={{ width: "100%" }}
                          disabled
                        />
                      </Col>

                      <Col span={6}>
                        <Input.TextArea
                          id="batasKelonggaranDescription"
                          value={this.state.batasKelonggaranDescription}
                          autoSize
                          disabled
                        />
                      </Col>
                    </Row>
                  )}

                  {Math.sign(this.state.selisih) !== 0 && (
                    <Row gutter={[10, 10]}>
                      <Col
                        span={11}
                        offset={13}
                        style={{
                          color:
                            (Math.sign(this.state.selisih) === -1 &&
                              this.state.kekurangan > this.state.batasKelonggaran) ||
                            (Math.sign(this.state.selisih) === 1 &&
                              this.state.selisih > this.state.batasKelonggaran)
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
                        disabled
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
          </Row>
        </Container>

        <ModalDaftarNPPBKC
          isVisible={this.state.isModalDaftarNppbkcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarNppbkcVisible")}
          onDataDoubleClick={this.handleDataNppbkc}
          idJenisBkc={this.state.idJenisBkc}
        />
      </>
    );
  }
}
