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
import Header from "components/Header";
import ModalDaftarNPPBKC from "components/ModalDaftarNppbkc";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";
import { sumArrayOfObject } from "utils/sumArrayOfObject";

export default class BRCK1Rekam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Buku Rekening Barang Kena Cukai Etil Alkohol (BRCK-1)",

      isSearchLoading: false,
      isRekamLoading: false,
      isBrowseShow: false,
      isModalDaftarNppbkcVisible: false,
      isModalDaftarMerkVisible: false,

      jenis_bkc_id: 1,

      nppbkc_id: null,
      nppbkc: null,
      nama_nppbkc: null,
      periode_awal: null,
      periode_akhir: null,

      saldo_awal: null,

      total_debet: null,
      total_kredit: null,

      saldo_buku: null,

      hasil_pencacahan_back5: null,
      hasil_pencarian_back5_description: null,
      no_back5: null,
      tgl_back5: null,
      selisih: null,
      selisih_description: null,
      potongan: null,
      potongan_description: null,
      kekurangan: null,
      kekurangan_description: null,
      batas_kelonggaran: null,
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

      searchText: null,
      searchedColumn: null,
      page: 1,

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
          key: "jumlah_kemasan",
          title: "JUMLAH KEMASAN",
          dataIndex: "jumlah_kemasan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jumlah_kemasan"),
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
              key: "transaksi_debet",
              title: "DEBIT (Lt)",
              dataIndex: "transaksi_debet",
              fixed: "right",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              key: "transaksi_kredit",
              title: "KREDIT (Lt)",
              dataIndex: "transaksi_kredit",
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

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.saldo_awal !== this.state.saldo_awal ||
      prevState.dataSource?.length !== this.state.dataSource?.length
    ) {
      if (this.state.dataSource?.length > 0) {
        this.calculateSaldo();
      }
    }

    if (
      prevState.dataSource.length !== this.state.dataSource.length ||
      prevState.hasil_pencacahan_back5 !== this.state.hasil_pencacahan_back5
    ) {
      this.setState({
        total_debet_kemasan: sumArrayOfObject(this.state.dataSource, "transaksi_debet"),
        total_kredit_kemasan: sumArrayOfObject(this.state.dataSource, "transaksi_kredit"),
        selisih: (this.state.hasil_pencacahan_back5 - this.state.saldo_buku).toFixed(4),
      });
    }

    if (
      (prevState.selisih !== this.state.selisih ||
        prevState.saldo_awal !== this.state.saldo_awal) &&
      Math.sign(this.state.selisih) !== 0
    ) {
      if (Math.sign(this.state.selisih) === -1) {
        const hasilPotong = (
          (0.5 / 100) *
          (this.state.saldo_buku || 0 + this.state.saldo_awal || 0)
        ).toFixed(4);

        this.setState({
          selisih_description: `${this.state.saldo_buku} - ${this.state.hasil_pencacahan_back5}`,
          potongan: hasilPotong,
          potongan_description: `0.5% x (${this.state.saldo_buku} + ${this.state.saldo_awal || 0})`,
          kekurangan:
            Math.sign((Math.abs(this.state.selisih) - hasilPotong).toFixed(4)) === -1
              ? 0
              : (Math.abs(this.state.selisih) - hasilPotong).toFixed(4),
          kekurangan_description:
            Math.sign((Math.abs(this.state.selisih) - hasilPotong).toFixed(4)) === -1
              ? "Selisih Kurang < Potongan"
              : `${Math.abs(this.state.selisih)} - ${hasilPotong}`,
          batas_kelonggaran: (3 * hasilPotong).toFixed(4),
          batas_kelonggaran_description: `3 x ${hasilPotong}`,
        });
      }

      if (Math.sign(this.state.selisih) === 1) {
        this.setState({
          selisih_description: `(${this.state.hasil_pencacahan_back5} - ${this.state.saldo_buku})`,
          batas_kelonggaran: (1 / 100) * this.state.saldo_buku,
          batas_kelonggaran_description: `1% x ${this.state.saldo_buku}`,
        });
      }
    }

    if (
      (prevState.selisih !== this.state.selisih ||
        prevState.kekurangan !== this.state.kekurangan ||
        prevState.batas_kelonggaran !== this.state.batas_kelonggaran) &&
      Math.sign(this.state.selisih) !== 0
    ) {
      switch (true) {
        case Math.sign(this.state.selisih) === -1 &&
          this.state.kekurangan > this.state.batas_kelonggaran:
          this.setState({
            notif:
              "Jumlah kekurangan setelah potongan lebih besar daripada Batas Kelonggaran, dikenakan Sanksi Administrasi Denda",
          });
          break;
        case Math.sign(this.state.selisih) === -1 &&
          this.state.kekurangan <= this.state.batas_kelonggaran:
          this.setState({
            notif:
              "Jumlah kekurangan setelah potongan tidak lebih besar daripada Batas Kelonggaran, tidak dikenakan Sanksi Administrasi Denda",
          });
          break;
        case Math.sign(this.state.selisih) === 1 &&
          this.state.selisih > this.state.batas_kelonggaran:
          this.setState({
            notif:
              "Jumlah kelebihan BKC lebih besar daripada Batas Kelonggaran, dikenakan Sanksi Administrasi Denda",
          });
          break;
        case Math.sign(this.state.selisih) === 1 &&
          this.state.selisih <= this.state.batas_kelonggaran:
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

  getBrck1 = async () => {
    const { nppbkc, periode_awal, periode_akhir } = this.state;

    const payload = {
      nppbkc,
      awalTanggalPeriode: moment(periode_awal).format("YYYY-MM-DD"),
      akhirTanggalPeriode: moment(periode_akhir).format("YYYY-MM-DD"),
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

      let saldo = this.state.saldo_awal || 0;

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
            jenis_dokumen: item.jenisDok,
            nomor_dokumen: item.nomorDok,
            tanggal_dokumen: moment(item.tanggalDok).format("DD-MM-YYYY"),
            tanggal_transaksi: moment(item.tanggalCio).format("DD-MM-YYYY"),
            uraian_kegiatan: item.uraianKegiatan,
            jumlah_kemasan: item.jumlahKemasan,
            jumlah: item.jumlah,
            isi: item.isiPerKemasan,
            transaksi_debet: item.jenisTransaksi === "D" ? item.jumlah : 0,
            transaksi_kredit: item.jenisTransaksi === "K" ? item.jumlah : 0,
            saldo,
          };
        });

      this.setState({
        isBrowseShow: true,
        dataSource: newData,
        saldo_awal: responseSaldoAwal.data.data,
        saldo_buku: saldo,
      });
    }

    this.setState({ isSearchLoading: false });
  };

  calculateSaldo = () => {
    let saldo = this.state.saldo_awal || 0;

    const newData = this.state.dataSource?.map((item) => {
      saldo = saldo + item.transaksi_debet - item.transaksi_kredit;
      return { ...item, saldo };
    });

    this.setState({ dataSource: newData, saldo_buku: saldo });
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
      nppbkc_id: record.nppbkc_id,
      nppbkc: record.nppbkc,
      nama_nppbkc: record.nama_nppbkc,
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };

  handleSearch = async () => {
    if (!this.state.nppbkc_id || !this.state.periode_akhir || !this.state.periode_akhir) {
      return notification.info({ message: "Info", description: "Data tidak boleh kosong" });
    }

    this.setState({ dataSource: [] });

    await this.getBrck1();
  };
  handleReset = () => {
    this.setState({
      nppbkc_id: null,
      nppbkc: null,
      nama_nppbkc: null,
      periode_awal: null,
      periode_akhir: null,
    });
  };

  handleRekam = async () => {
    const {
      nppbkc_id,
      nppbkc,
      nama_nppbkc,
      periode_awal,
      periode_akhir,
      saldo_awal,
      hasil_pencacahan_back5,
      hasil_pencarian_back5_description,
      no_back5,
      tgl_back5,
      selisih,
      selisih_description,
      potongan,
      potongan_description,
      kekurangan,
      kekurangan_description,
      batas_kelonggaran,
      jenis_penutupan,
    } = this.state;

    const payload = {
      idNppbkc: nppbkc_id,
      nppbkc: nppbkc,
      namaPerusahaan: nama_nppbkc,
      periodeAwal: moment(periode_awal, "DD-MM-YYYY").format("YYYY-MM-DD"),
      periodeAkhir: moment(periode_akhir, "DD-MM-YYYY").format("YYYY-MM-DD"),
      saldoAwal: saldo_awal,
      hasilCacah: hasil_pencacahan_back5,
      keteranganCacah: hasil_pencarian_back5_description,
      nomorBack5: no_back5,
      tanggalBack5: moment(tgl_back5, "DD-MM-YYYY").format("YYYY-MM-DD"),
      flagSelisih: Math.sign(selisih) !== 0 ? "Y" : "N",
      selisih: Math.abs(selisih),
      keteranganSelisih: selisih_description,
      flagSanksi:
        (Math.sign(selisih) === -1 && kekurangan > batas_kelonggaran) ||
        (Math.sign(selisih) === 1 && selisih > batas_kelonggaran)
          ? "Y"
          : "N",
      jenisPenutupan: jenis_penutupan,
    };

    if (Math.sign(selisih) === -1) {
      payload.potongan = potongan;
      payload.keteranganPotongan = potongan_description;
      payload.kekurangan = kekurangan;
      payload.keteranganKekurangan = kekurangan_description;
    }

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: "/brck/rekam-brck1",
      body: payload,
      setLoading: (bool) => this.setState({ isRekamLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.props.history.push(`${pathName}/brck-1`);
    }
  };

  render() {
    return (
      <>
        <Container menuName="Buku Rekening Cukai" contentName="BRCK-1 Rekam" hideContentHeader>
          <Header>{this.state.subtitle1}</Header>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
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
                  <Input id="nama_nppbkc" value={this.state.nama_nppbkc} disabled />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Periode</FormLabel>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <DatePicker
                    id="periode_awal"
                    format="DD-MM-YYYY"
                    onChange={(date) => this.handleDatepickerChange("periode_awal", date)}
                    value={this.state.periode_awal}
                    style={{ width: "100%" }}
                  />
                  <div>s.d</div>
                  <DatePicker
                    id="periode_akhir"
                    format="DD-MM-YYYY"
                    onChange={(date) => this.handleDatepickerChange("periode_akhir", date)}
                    value={this.state.periode_akhir}
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
                    <Col span={8} offset={16}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>
                          SALDO AWAL <br /> (Hasil penutupan periode sebelumnya)
                        </FormLabel>
                      </div>
                      <InputNumber
                        id="saldo_awal"
                        value={this.state.saldo_awal}
                        onChange={(value) => this.handleInputNumberChange("saldo_awal", value)}
                        min={0}
                        style={{ width: "100%" }}
                        disabled={this.state.saldo_awal !== null}
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
                              key: "transaksi_debet",
                              title: "Transaksi Debit",
                              dataIndex: "transaksi_debet",
                              width: 101,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                            {
                              key: "transaksi_kredit",
                              title: "Transaksi Kredit",
                              dataIndex: "transaksi_kredit",
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
                              transaksi_debet: this.state.total_debet,
                              transaksi_kredit: this.state.total_kredit,
                              saldo: this.state.saldo_buku,
                              keterangan: `Size Data: ${this.state.dataSource.length}`,
                            },
                            {
                              key: "2",
                              title: "Saldo Buku",
                              transaksi_debet: null,
                              transaksi_kredit: null,
                              saldo: this.state.saldo_buku,
                              keterangan: null,
                            },
                            {
                              key: "3",
                              title: "Selisih",
                              transaksi_debet: null,
                              transaksi_kredit: null,
                              saldo: Math.abs(this.state.selisih),
                              keterangan: null,
                            },
                            {
                              key: "4",
                              title: "Saldo Akhir",
                              transaksi_debet: null,
                              transaksi_kredit: null,
                              saldo: this.state.hasil_pencacahan_back5,
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
                          id="hasil_pencacahan_back5"
                          value={this.state.hasil_pencacahan_back5}
                          onChange={(value) => {
                            this.handleInputNumberChange("hasil_pencacahan_back5", value);
                          }}
                          style={{ width: "100%" }}
                        />
                      </Col>
                      <Col span={6}>
                        <Input.TextArea
                          id="hasil_pencarian_back5_description"
                          value={this.state.hasil_pencarian_back5_description}
                          onChange={this.handleInputChange}
                          autoSize
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
                          id="no_back5"
                          onChange={this.handleInputChange}
                          value={this.state.no_back5}
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
                          id="tgl_back5"
                          format="DD-MM-YYYY"
                          onChange={(date) => this.handleDatepickerChange("tgl_back5", date)}
                          value={this.state.tgl_back5}
                          style={{ width: "100%" }}
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
                              id="selisih_description"
                              value={this.state.selisih_description}
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
                                  id="potongan_description"
                                  value={this.state.potongan_description}
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
                                  id="kekurangan_description"
                                  value={this.state.kekurangan_description}
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
                            id="batas_kelonggaran"
                            value={this.state.batas_kelonggaran}
                            style={{ width: "100%" }}
                            disabled
                          />
                        </Col>

                        <Col span={6}>
                          <Input.TextArea
                            id="batas_kelonggaran_description"
                            value={this.state.batas_kelonggaran_description}
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
                                this.state.kekurangan > this.state.batas_kelonggaran) ||
                              (Math.sign(this.state.selisih) === 1 &&
                                this.state.selisih > this.state.batas_kelonggaran)
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
                          value={this.state.jenis_penutupan}
                          onChange={(value) => this.handleSelectChange("jenis_penutupan", value)}
                          style={{ width: "100%" }}
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

            <Row gutter={[16, 16]}>
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
          </div>
        </Container>

        <ModalDaftarNPPBKC
          isVisible={this.state.isModalDaftarNppbkcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarNppbkcVisible")}
          onDataDoubleClick={this.handleDataNppbkc}
          idJenisBkc={this.state.jenis_bkc_id}
        />
      </>
    );
  }
}
