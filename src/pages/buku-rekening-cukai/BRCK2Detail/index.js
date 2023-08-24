import { Button, Col, DatePicker, Icon, Input, InputNumber, Row, Select, Table } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";
import { sumArrayOfObject } from "utils/sumArrayOfObject";

export default class BRCK2Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Buku Rekening Barang Kena Cukai Etil Alkohol (BRCK-2)",

      isDetailLoading: true,

      page: 1,
      totalData: 0,

      saldo_awal_kemasan: null,
      saldo_awal_lt: null,

      table: {
        jenis_dokumen: null,
        nomor_dokumen: null,
        tanggal_dokumen: null,
        tanggal_transaksi: null,
        uraian_kegiatan: null,
      },

      total_debet_kemasan: 0,
      total_debet_lt: 0,
      total_kredit_kemasan: 0,
      total_kredit_lt: 0,
      total_saldo_kemasan: 0,
      total_saldo_lt: 0,

      saldo_buku_saldo_kemasan: 0,
      saldo_buku_saldo_lt: 0,

      selisih_saldo_kemasan: 0,
      selisih_saldo_lt: 0,

      hasil_pencacahan_back5_kemasan: 0,
      hasil_pencacahan_back5_lt: 0,
      hasil_pencarian_back5_description: null,
      no_back5: null,
      tgl_back5: null,
      selisih_kemasan: 0,
      selisih_lt: 0,
      selisih_description: null,
      batas_kelonggaran_kemasan: 0,
      batas_kelonggaran_description: null,
      notif: null,
      jenis_penutupan: null,

      list_jenis_penutupan: [
        {
          jenis_penutupan_code: "PENUTUPAN TRIWULAN",
          jenis_penutupan_name: "PENUTUPAN TRIWULAN",
        },
        {
          jenis_penutupan_code: "PERMOHONAN PENGUSAHA",
          jenis_penutupan_name: "PERMOHONAN PENGUSAHA",
        },
        {
          jenis_penutupan_code: "DUGAAN PELANGGARAN",
          jenis_penutupan_name: "DUGAAN PELANGGARAN",
        },
      ],

      dataSource: [],
      columns: [
        {
          title: "DOKUMEN",
          children: [
            {
              key: "jenis_dokumen",
              title: "JENIS",
              dataIndex: "jenis_dokumen",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("jenis_dokumen"),
            },
            {
              key: "nomor_dokumen",
              title: "NOMOR",
              dataIndex: "nomor_dokumen",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("nomor_dokumen"),
            },
            {
              key: "tanggal_dokumen",
              title: "TANGGAL",
              dataIndex: "tanggal_dokumen",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("tanggal_dokumen"),
            },
          ],
        },
        {
          key: "tanggal_transaksi",
          title: "TGL PEMASUKAN/ PEMBUATAN ATAU PENGELUARAN",
          dataIndex: "tanggal_transaksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tanggal_transaksi"),
        },
        {
          key: "uraian_kegiatan",
          title: "URAIAN KEGIATAN",
          dataIndex: "uraian_kegiatan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("uraian_kegiatan"),
        },
        {
          title: "DEBET",
          fixed: "right",
          children: [
            {
              key: "debet_kemasan",
              title: <div style={{ fontSize: 10 }}>KEMASAN</div>,
              dataIndex: "debet_kemasan",
              width: 80,
              fixed: "right",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              key: "debet_lt",
              title: <div style={{ fontSize: 10 }}>(Lt)</div>,
              dataIndex: "debet_lt",
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
              key: "kredit_kemasan",
              title: <div style={{ fontSize: 10 }}>KEMASAN</div>,
              dataIndex: "kredit_kemasan",
              width: 80,
              fixed: "right",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              key: "kredit_lt",
              title: <div style={{ fontSize: 10 }}>(Lt)</div>,
              dataIndex: "kredit_lt",
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
              key: "saldo_kemasan",
              title: <div style={{ fontSize: 10 }}>KEMASAN</div>,
              dataIndex: "saldo_kemasan",
              width: 80,
              fixed: "right",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              key: "saldo_lt",
              title: <div style={{ fontSize: 10 }}>(Lt)</div>,
              dataIndex: "saldo_lt",
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

  componentDidMount() {
    this.getDetailBrck2();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.dataSource.length !== this.state.dataSource.length ||
      prevState.hasil_pencacahan_back5_kemasan !== this.state.hasil_pencacahan_back5_kemasan ||
      prevState.hasil_pencacahan_back5_lt !== this.state.hasil_pencacahan_back5_lt
    ) {
      this.calculate();
    }

    if (
      prevState.selisih_kemasan !== this.state.selisih_kemasan &&
      Math.sign(this.state.selisih_kemasan) !== 0
    ) {
      if (Math.sign(this.state.selisih_kemasan) === -1) {
        this.setState({ selisih_description: "Saldo - Hasil Pencacahan" });
      } else {
        this.setState({ selisih_description: "Hasil Pencacahan - Saldo" });
      }
    }

    if (
      prevState.selisih_kemasan !== this.state.selisih_kemasan &&
      Math.sign(this.state.selisih_kemasan) === 1
    ) {
      this.setState({
        batas_kelonggaran_kemasan: (1 / 100) * this.state.saldo_buku_saldo_lt,
        batas_kelonggaran_description: `1% x ${this.state.saldo_buku_saldo_lt}`,
      });
    }

    if (
      (prevState.selisih_kemasan !== this.state.selisih_kemasan ||
        prevState.batas_kelonggaran_kemasan !== this.state.batas_kelonggaran_kemasan ||
        prevState.selisih_lt !== this.state.selisih_lt) &&
      Math.sign(this.state.selisih_kemasan) !== 0
    ) {
      switch (true) {
        case Math.sign(this.state.selisih_kemasan) === -1:
          this.setState({
            notif: "Terdapat selisih dengan BACK-5 dan dikenai Sanksi Administrasi",
          });
          break;
        case this.state.batas_kelonggaran_kemasan > this.state.selisih_lt:
          this.setState({
            notif:
              "Jumlah kelebihan BKC lebih besar daripada Batas Kelonggaran, dikenal Sanksi Administrasi Denda",
          });
          break;
        case this.state.batas_kelonggaran_kemasan <= this.state.selisih_lt:
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

  getDetailBrck2 = async () => {
    // const payload = { idBrck2: this.props.match.params.id };

    // const response = await requestApi({
    //   service: "produksi",
    //   method: "get",
    //   endpoint: "/brck/detail-brck2",
    //   params: payload,
    //   setLoading: (bool) => this.setState({ isDetailLoading: bool }),
    // });

    // if (response) {
    //   console.log("response.data.data", response.data.data);
    // }

    this.setState({ isDetailLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        saldo_awal_kemasan: 200,
        saldo_awal_lt: 300,

        hasil_pencacahan_back5_kemasan: 6000,
        hasil_pencacahan_back5_lt: 3000,
        hasil_pencarian_back5_description: "SESUAI",
        no_back5: "NO/BACK/5",
        tgl_back5: moment(new Date()),

        jenis_penutupan: "PENUTUPAN TRIWULAN",

        dataSource: [
          {
            key: "1",
            jenis_dokumen: "jenis_dokumen_1",
            nomor_dokumen: "nomor_dokumen_1",
            tanggal_dokumen: "tanggal_dokumen_1",
            tanggal_transaksi: "tanggal_transaksi_1",
            uraian_kegiatan: "uraian_kegiatan_1",
            debet_kemasan: 1000,
            debet_lt: 1000,
            kredit_kemasan: 1000,
            kredit_lt: 1000,
            saldo_kemasan: 1000,
            saldo_lt: 1000,
            keterangan: "keterangan_1",
          },
          {
            key: "2",
            jenis_dokumen: "jenis_dokumen_2",
            nomor_dokumen: "nomor_dokumen_2",
            tanggal_dokumen: "tanggal_dokumen_2",
            tanggal_transaksi: "tanggal_transaksi_2",
            uraian_kegiatan: "uraian_kegiatan_2",
            debet_kemasan: 2000,
            debet_lt: 3000,
            kredit_kemasan: 4000,
            kredit_lt: 5000,
            saldo_kemasan: 6000,
            saldo_lt: 7000,
            keterangan: "keterangan_2",
          },
        ],
      });
      this.setState({ isDetailLoading: false });
      clearTimeout(timeout);
    }, 2000);
  };

  getBrck2 = async () => {
    const { jenis_dokumen, nomor_dokumen, tanggal_dokumen, tanggal_transaksi, uraian_kegiatan } =
      this.state.table;

    const payload = { page: this.state.page };

    if (jenis_dokumen) payload.jenisDokumen = jenis_dokumen;
    if (nomor_dokumen) payload.nomorDokumen = nomor_dokumen;
    if (tanggal_dokumen) payload.tanggalDokumen = tanggal_dokumen;
    if (tanggal_transaksi) payload.tanggalTransaksi = tanggal_transaksi;
    if (uraian_kegiatan) payload.uraianKegiatan = uraian_kegiatan;

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/brck/browse-rekam-brck2",
      params: payload,
      setLoading: (bool) => this.setState({ isTableLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      const newData = data.listData.map((item) => item);

      this.setState({
        dataSource: newData,
        page: data.currentPage,
        totalData: data.totalData,
        hasil_pencacahan_back5_kemasan: sumArrayOfObject(
          response.data.data.listData,
          "saldo_kemasan"
        ),
        hasil_pencacahan_back5_lt: sumArrayOfObject(response.data.data.listData, "saldo_lt"),
        hasil_pencarian_back5_description: "SESUAI",
      });
    }
  };

  calculate = () => {
    this.setState({
      total_debet_kemasan: sumArrayOfObject(this.state.dataSource, "debet_kemasan"),
      total_debet_lt: sumArrayOfObject(this.state.dataSource, "debet_lt"),
      total_kredit_kemasan: sumArrayOfObject(this.state.dataSource, "kredit_kemasan"),
      total_kredit_lt: sumArrayOfObject(this.state.dataSource, "kredit_lt"),
      total_saldo_kemasan: sumArrayOfObject(this.state.dataSource, "saldo_kemasan"),
      total_saldo_lt: sumArrayOfObject(this.state.dataSource, "saldo_lt"),

      saldo_buku_saldo_kemasan: sumArrayOfObject(this.state.dataSource, "saldo_kemasan"),
      saldo_buku_saldo_lt: sumArrayOfObject(this.state.dataSource, "saldo_lt"),

      selisih_saldo_kemasan:
        this.state.hasil_pencacahan_back5_kemasan -
        sumArrayOfObject(this.state.dataSource, "saldo_kemasan"),
      selisih_saldo_lt:
        this.state.hasil_pencacahan_back5_lt - sumArrayOfObject(this.state.dataSource, "saldo_lt"),

      selisih_kemasan:
        this.state.hasil_pencacahan_back5_kemasan -
        sumArrayOfObject(this.state.dataSource, "saldo_kemasan"),
      selisih_lt:
        this.state.hasil_pencacahan_back5_lt - sumArrayOfObject(this.state.dataSource, "saldo_lt"),
    });
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          value={this.state.table[dataIndex]}
          onChange={(e) =>
            this.setState({ table: { ...this.state.table, [dataIndex]: e.target.value } })
          }
          onPressEnter={() => this.handleColumnSearch(confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleColumnSearch(confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleColumnReset(clearFilters, dataIndex)}
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
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        const timeout = setTimeout(() => {
          this.searchInput.select();
          clearTimeout(timeout);
        });
      }
    },
  });
  handleColumnSearch = (confirm) => {
    confirm();
    this.getBrck2();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: "" } });
    this.getBrck2();
  };

  render() {
    return (
      <>
        <Container menuName="Buku Rekening Cukai" contentName="BRCK-2" hideContentHeader>
          <Header>{this.state.subtitle1}</Header>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
            {this.state.isDetailLoading ? (
              <LoadingWrapperSkeleton />
            ) : (
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
                            value={this.state.saldo_awal_kemasan}
                            onChange={this.handleSaldoAwalKemasanChange}
                            min={0}
                            style={{ width: "100%" }}
                            disabled
                          />
                        </Col>

                        <Col span={12}>
                          <div style={{ marginBottom: 10 }}>
                            <FormLabel>
                              SALDO AWAL (lt) <br /> (Hasil penutupan periode sebelumnya)
                            </FormLabel>
                          </div>
                          <InputNumber
                            value={this.state.saldo_awal_lt}
                            onChange={this.handleSaldoAwalLtChange}
                            min={0}
                            style={{ width: "100%" }}
                            disabled
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Table
                    columns={this.state.columns}
                    dataSource={this.state.dataSource}
                    loading={this.state.isTableLoading}
                    pagination={{ current: this.state.page, total: this.state.totalData }}
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
                              key: "total_debet_kemasan",
                              title: "Debet Kemasan",
                              dataIndex: "total_debet_kemasan",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                            {
                              key: "total_debet_lt",
                              title: "Debet (Lt)",
                              dataIndex: "total_debet_lt",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                            {
                              key: "total_kredit_kemasan",
                              title: "Kredit Kemasan",
                              dataIndex: "total_kredit_kemasan",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                            {
                              key: "total_kredit_lt",
                              title: "Kredit (Lt)",
                              dataIndex: "total_kredit_lt",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                            {
                              key: "total_saldo_kemasan",
                              title: "Saldo Kemasan",
                              dataIndex: "total_saldo_kemasan",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                            {
                              key: "total_saldo_lt",
                              title: "Saldo (Lt)",
                              dataIndex: "total_saldo_lt",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                            {
                              key: "total_keterangan",
                              title: "Keterangan",
                              dataIndex: "total_keterangan",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                          ]}
                          dataSource={[
                            {
                              key: "1",
                              title: "Jumlah",
                              total_debet_kemasan: this.state.total_debet_kemasan,
                              total_debet_lt: this.state.total_debet_lt,
                              total_kredit_kemasan: this.state.total_kredit_kemasan,
                              total_kredit_lt: this.state.total_kredit_lt,
                              total_saldo_kemasan: this.state.total_saldo_kemasan,
                              total_saldo_lt: this.state.total_saldo_lt,
                              total_keterangan: `Size Data: ${this.state.totalData}`,
                            },
                            {
                              key: "2",
                              title: "Saldo Buku",
                              total_debet_kemasan: null,
                              total_debet_lt: null,
                              total_kredit_kemasan: null,
                              total_kredit_lt: null,
                              total_saldo_kemasan: this.state.saldo_buku_saldo_kemasan,
                              total_saldo_lt: this.state.saldo_buku_saldo_lt,
                              total_keterangan: null,
                            },
                            {
                              key: "3",
                              title: "Selisih",
                              total_debet_kemasan: null,
                              total_debet_lt: null,
                              total_kredit_kemasan: null,
                              total_kredit_lt: null,
                              total_saldo_kemasan: Math.abs(this.state.selisih_saldo_kemasan),
                              total_saldo_lt: Math.abs(this.state.selisih_saldo_lt),
                              total_keterangan: null,
                            },
                            {
                              key: "4",
                              title: "Saldo Akhir",
                              total_debet_kemasan: null,
                              total_debet_lt: null,
                              total_kredit_kemasan: null,
                              total_kredit_lt: null,
                              total_saldo_kemasan: this.state.hasil_pencacahan_back5_kemasan,
                              total_saldo_lt: this.state.hasil_pencacahan_back5_lt,
                              total_keterangan: null,
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
                          id="hasil_pencacahan_back5_kemasan"
                          value={this.state.hasil_pencacahan_back5_kemasan}
                          onChange={(value) =>
                            this.handleInputNumberChange("hasil_pencacahan_back5_kemasan", value)
                          }
                          style={{ width: "100%" }}
                          disabled
                        />
                      </Col>
                      <Col span={5}>
                        <InputNumber
                          id="hasil_pencacahan_back5_lt"
                          value={this.state.hasil_pencacahan_back5_lt}
                          onChange={(value) =>
                            this.handleInputNumberChange("hasil_pencacahan_back5_lt", value)
                          }
                          style={{ width: "100%" }}
                          disabled
                        />
                      </Col>
                      <Col span={6}>
                        <Input.TextArea
                          id="hasil_pencarian_back5_description"
                          value={this.state.hasil_pencarian_back5_description}
                          onChange={this.handleInputChange}
                          autoSize
                          disabled
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
                          id="no_back5"
                          onChange={this.handleInputChange}
                          value={this.state.no_back5}
                          disabled
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
                          id="tgl_back5"
                          format="DD-MM-YYYY"
                          onChange={(date) => this.handleDatepickerChange("tgl_back5", date)}
                          value={this.state.tgl_back5}
                          style={{ width: "100%" }}
                          disabled
                        />
                      </Col>
                    </Row>

                    {Math.sign(this.state.selisih_kemasan) !== 0 && (
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
                            {Math.sign(this.state.selisih_kemasan) === -1
                              ? "Selisih Kurang"
                              : "Selisih Lebih"}
                          </div>
                        </Col>
                        <Col span={5}>
                          <InputNumber
                            id="selisih_kemasan"
                            value={Math.abs(this.state.selisih_kemasan)}
                            style={{ width: "100%" }}
                            disabled
                          />
                        </Col>
                        <Col span={5}>
                          <InputNumber
                            id="selisih_lt"
                            value={Math.abs(this.state.selisih_lt)}
                            style={{ width: "100%" }}
                            disabled
                          />
                        </Col>
                        <Col span={6}>
                          <Input.TextArea
                            id="selisih_description"
                            value={this.state.selisih_description}
                            autoSize
                            disabled
                          />
                        </Col>
                      </Row>
                    )}

                    {Math.sign(this.state.selisih_saldo_kemasan) === 1 && (
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
                            id="batas_kelonggaran_kemasan"
                            value={this.state.batas_kelonggaran_kemasan}
                            style={{ width: "100%" }}
                            disabled
                          />
                        </Col>

                        <Col span={6} offset={5}>
                          <Input.TextArea
                            id="batas_kelonggaran_description"
                            value={this.state.batas_kelonggaran_description}
                            autoSize
                            disabled
                          />
                        </Col>
                      </Row>
                    )}

                    {Math.sign(this.state.selisih_kemasan) !== 0 && (
                      <Row gutter={[10, 10]}>
                        <Col
                          span={11}
                          offset={13}
                          style={{
                            color:
                              Math.sign(this.state.selisih_kemasan) === -1 ||
                              this.state.batas_kelonggaran_kemasan > this.state.selisih_lt
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
                          id="jenis_penutupan"
                          onChange={(value) => this.handleSelectChange("jenis_penutupan", value)}
                          style={{ width: "100%" }}
                          disabled
                        >
                          {this.state.list_jenis_penutupan.length > 0 &&
                            this.state.list_jenis_penutupan.map((item, index) => (
                              <Select.Option
                                key={`jenis-penutupan-${index}`}
                                value={item.jenis_penutupan_code}
                              >
                                {item.jenis_penutupan_name}
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
          </div>
        </Container>
      </>
    );
  }
}
