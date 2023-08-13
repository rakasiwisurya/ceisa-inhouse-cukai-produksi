import {
  Button,
  DatePicker,
  Icon,
  Input,
  InputNumber,
  Select,
  Table,
  message,
  notification,
} from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import React, { Component } from "react";
import ModalDaftarNPPBKCMMEA from "./ModalDaftarNPPBKCMMEA";
import ModalDaftarMerk from "./ModalDaftarMerk";
import ButtonCustom from "components/Button/ButtonCustom";
import { pathName } from "configs/constants";
import { idMenu } from "utils/idMenu";
import { api } from "configs/api";
import { requestApi } from "utils/requestApi";
export default class BRCK2Perbaikan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalNPPBKCMMEAOpen: false,
      isModalMerkOpen: false,
      limitRekamPage: 100,
      currentRekamPage: 0,
      filterValue: "",
      filterValueMerk: "",
      filteredData: [],
      filteredDataMerk: [],

      nppbkc: "",
      namaPerusahaan: "",
      merkMMEA: "",
      jenisMMEA: "",
      golongan: "",
      kadar: "",
      tarif: "",
      isi: "",
      kemasan: "",
      noSkep: "",
      tanggalPenutupanBrck2: "",
      periode_awal: "",
      periode_akhir: "",
      saldo_awal_kemasan: "0",
      saldo_awal_lt: "0",

      hasil_pencacahan_back5_1: "",
      hasil_pencacahan_back5_2: "",
      hasil_pencarian_back5_text_area: "",
      no_back5: "",
      tgl_back5: "",
      jenis_penutupan: "",
      ketentuan: "",

      list_jenis_penutupan: [
        {
          jenis_penutupan_code: "Penutupan Triwulan",
          jenis_penutupan_name: "Penutupan Triwulan",
        },
        {
          jenis_penutupan_code: "Permohonan Pengusaha",
          jenis_penutupan_name: "Permohonan Pengusaha",
        },
        {
          jenis_penutupan_code: "Dugaan Pelanggaran",
          jenis_penutupan_name: "Dugaan Pelanggaran",
        },
      ],
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
              key: "debetLiter",
              title: <div style={{ fontSize: 10 }}>(Lt)</div>,
              dataIndex: "debetLiter",
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
              key: "kreditLiter",
              title: <div style={{ fontSize: 10 }}>(Lt)</div>,
              dataIndex: "kreditLiter",
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
              key: "saldoLiter",
              title: <div style={{ fontSize: 10 }}>(Lt)</div>,
              dataIndex: "saldoLiter",
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
      dataSource: [],
    };
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
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
        setTimeout(() => this.searchInput.select());
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

  handleInputChange = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  };
  handleModalNPPBKCMMEAOpen = () => {
    this.setState({ ...this.state, isModalNPPBKCMMEAOpen: true });
  };
  handleModalNPPBKCMMEACancel = () => {
    this.setState({ ...this.state, isModalNPPBKCMMEAOpen: false });
  };
  handleModalMerkOpen = () => {
    this.setState({ ...this.state, isModalMerkOpen: true });
  };
  handleModalMerkCancel = () => {
    this.setState({ ...this.state, isModalMerkOpen: false });
  };
  handleCariNPPBKC = () => {
    this.handleModalNPPBKCMMEAOpen();
  };
  handleCariMerk = () => {
    this.handleModalMerkOpen();
  };
  handlePeriodeAwalChange = (date, dateString) => {
    this.setState({ ...this.state, periode_awal: dateString });
  };
  handlePeriodeAkhirChange = (date, dateString) => {
    this.setState({ ...this.state, periode_akhir: dateString });
  };
  handleModalNPPBKCRow = (record, rowIndex) => ({
    onDoubleClick: (event) => {
      this.setState({
        ...this.state,
        isModalNPPBKCMMEAOpen: false,
        namaPerusahaan: record.namaPerusahaan,
        nppbkc: record.nppbkc,
      });
    },
  });
  handleModalMerkRow = (record, rowIndex) => ({
    onDoubleClick: (event) => {
      this.setState({
        ...this.state,
        isModalMerkOpen: false,
        merkMMEA: record.merkMMEA,
        jenisMMEA: record.jenisMMEA,
        tarif: record.tarif,
        isi: record.isi,
        kadar: record.kadar,
      });
    },
  });
  handleSaldoAwalKemasanChange = (value) => {
    this.setState({ ...this.state, saldo_awal_kemasan: value });
  };
  handleSaldoAwalLtChange = (value) => {
    this.setState({ ...this.state, saldo_awal_lt: value });
  };
  handleTanggalBack5Change = (date, dateString) => {
    this.setState({ ...this.state, tgl_back5: dateString });
  };
  handleJenisPenutupanChange = (value) => {
    this.setState({ ...this.state, jenis_penutupan: value });
  };
  handleTampilkan = () => {
    this.setState({
      ...this.state,
      dataSource: [
        {
          key: "1",
          jenisDokumen: "jenis_dokumen",
          nomorDokumen: "nomor_dokumen",
          tanggalDokumen: "tanggal_dokumen",
          tanggalTransaksi: "tanggal_transaksi",
          uraianKegiatan: "uraian_kegiatan",
          debetKemasan: "1000",
          debetLiter: "1000",
          kreditKemasan: "1000",
          kreditLiter: "1000",
          saldoKemasan: "1000",
          saldoLiter: "1000",
          keterangan: "keterangan",
        },
        {
          key: "2",
          jenisDokumen: "jenis_dokumen",
          nomorDokumen: "nomor_dokumen",
          tanggalDokumen: "tanggal_dokumen",
          tanggalTransaksi: "tanggal_transaksi",
          uraianKegiatan: "uraian_kegiatan",
          debetKemasan: "2000",
          debetLiter: "3000",
          kreditKemasan: "4000",
          kreditLiter: "5000",
          saldoKemasan: "6000",
          saldoLiter: "7000",
          keterangan: "keterangan",
        },
      ],
    });
  };

  handleReset = () => {
    console.log("reset...");
  };

  handleGetRekam = async () => {
    this.setState({ isLoading: true });
    try {
      const responseGetRekam = await api.produksi.json.get("/brck/browse-rekam-brck2", {
        params: {
          pageSize: this.state.limitRekamPage,
          pageNumber: this.state.currentRekamPage,
        },
      });
      this.setState({ dataSource: responseGetRekam.data.data.listData });
      this.setState({ isLoading: false });
      return;
    } catch (error) {
      this.setState({ error: "An error occurred" });
      message.error("Tidak bisa memuat data");
      this.setState({ isLoading: false });
      return;
    }
  };

  handleRekam = async () => {
    const {
      ketentuan,
      hasil_pencacahan_back5_1,
      hasil_pencacahan_back5_2,
      jenis_penutupan,
      no_back5,
      saldo_awal_kemasan,
      saldo_awal_lt,
      tgl_back5,
    } = this.state;

    const payload = {
      idMenu: idMenu("brck2"),
      catatan: ketentuan,
      hasilPencacahanBack5Kemasan: hasil_pencacahan_back5_1,
      hasilPencacahanBack5Liter: hasil_pencacahan_back5_2,
      jenisPenutupan: jenis_penutupan,
      nomorBack5: no_back5,
      saldoAwalKemasan: saldo_awal_kemasan,
      saldoAwalLiter: saldo_awal_lt,
      tanggalBack5: tgl_back5,
    };

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: "/brck/perbaikan_brck2",
      body: payload,
      setLoading: (bool) => this.setState({ isRekamLoading: bool }),
    });

    if (response) {
      notification.success({
        message: "Success",
        description: response.data.message,
      });
      this.props.history.push(`${pathName}/brck-2`);
    }
  };

  totalKeseluruhan = () => {
    const { dataSource } = this.state;
    const totalDebitKemasan = dataSource.reduce(
      (acc, item) => acc + parseInt(item.debetKemasan, 10),
      0
    );
    const totalDebitLt = dataSource.reduce((acc, item) => acc + parseInt(item.debetLiter, 10), 0);
    const totalKreditKemasan = dataSource.reduce(
      (acc, item) => acc + parseInt(item.kreditKemasan, 10),
      0
    );
    const totalKreditLt = dataSource.reduce((acc, item) => acc + parseInt(item.kreditLiter, 10), 0);
    const totalSaldoKemasan = dataSource.reduce(
      (acc, item) => acc + parseInt(item.saldoKemasan, 10),
      0
    );
    const totalSaldoLt = dataSource.reduce((acc, item) => acc + parseInt(item.saldoLiter, 10), 0);
    this.setState({
      totalDebitKemasan,
      totalDebitLt,
      totalKreditKemasan,
      totalKreditLt,
      totalSaldoKemasan,
      totalSaldoLt,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataSource !== this.state.dataSource) {
      this.totalKeseluruhan();
    }
    // else if (
    //   prevState.hasil_pencacahan_back5_1 !==
    //     this.state.hasil_pencacahan_back5_1 ||
    //   prevState.totalSaldoKemasan !== this.state.totalSaldoKemasan ||
    //   prevState.saldo_awal_kemasan !== this.state.saldo_awal_kemasan ||
    //   prevState.hasil_pencacahan_back5_2 !==
    //     this.state.hasil_pencacahan_back5_2 ||
    //   prevState.totalSaldoLt !== this.state.totalSaldoLt ||
    //   prevState.saldo_awal_lt !== this.state.saldo_awal_lt
    // ) {
    //   const hasil_pencacahan_back5_1 = parseInt(
    //     this.state.hasil_pencacahan_back5_1
    //   );
    //   const totalSaldoKemasan = parseInt(this.state.totalSaldoKemasan);
    //   const saldo_awal_kemasan = parseInt(this.state.saldo_awal_kemasan);

    //   const hasil_pencacahan_back5_2 = parseInt(
    //     this.state.hasil_pencacahan_back5_2
    //   );
    //   const totalSaldoLt = parseInt(this.state.totalSaldoLt);
    //   const saldo_awal_lt = parseInt(this.state.saldo_awal_lt);

    //   let updateSaldoKemasan = totalSaldoKemasan;
    //   if (!isNaN(totalSaldoKemasan) && !isNaN(saldo_awal_kemasan)) {
    //     updateSaldoKemasan += saldo_awal_kemasan;
    //   }

    //   let updateSaldoLt = totalSaldoLt;
    //   if (!isNaN(totalSaldoLt) && !isNaN(saldo_awal_lt)) {
    //     updateSaldoLt += saldo_awal_lt;
    //   }

    //   let totalSelisihKemasan = 0;
    //   let totalSelisihLebihKemasan = 0;
    //   if (!isNaN(hasil_pencacahan_back5_1) && !isNaN(updateSaldoKemasan)) {
    //     totalSelisihKemasan = updateSaldoKemasan - hasil_pencacahan_back5_1;
    //     totalSelisihLebihKemasan =
    //       hasil_pencacahan_back5_1 - updateSaldoKemasan;
    //   }

    //   let totalSelisihLt = 0;
    //   let totalSelisihLebihLt = 0;
    //   if (!isNaN(hasil_pencacahan_back5_2) && !isNaN(updateSaldoLt)) {
    //     totalSelisihLt = updateSaldoLt - hasil_pencacahan_back5_2;
    //     totalSelisihLebihLt = hasil_pencacahan_back5_2 - updateSaldoLt;
    //   }

    //   const totalBatasKelongaran = 0.01 * updateSaldoLt;
    // let ketentuan = "";
    // if (totalKekuranagan > totalBatasKelongaran) {
    //   ketentuan =
    //     "jumlah Kekurangan setelah potongan lebih besar dari pada Batas Kelonggaran, dikenakan Sanksi Administrasi Denda";
    // } else if (totalKekuranagan < totalBatasKelongaran) {
    //   ketentuan =
    //     "jumlah Kekurangan setelah potongan tidak lebih besar dari pada Batas Kelonggaran, tidak dikenakan Sanksi Administrasi Denda";
    // } else if (totalSelisih < totalBatasKelongaran) {
    //   ketentuan =
    //     "jumlah kelebihan BKC tidak lebih besar dari pada Batas Kelonggaran, tidak dikenakan Sanksi Administrasi Denda";
    // } else if (totalSelisih > totalBatasKelongaran) {
    //   ketentuan =
    //     "jumlah kelebihan BKC  lebih besar dari pada Batas Kelonggaran,  dikenakan Sanksi Administrasi Denda";
    // }

    //   const keteranganBatasKelongaran = `1% x ${updateSaldoLt}`;
    //   this.setState({
    //     totalSaldoKemasan,
    //     updateSaldoKemasan,
    //     updateSaldoLt,
    //     totalSelisihKemasan,
    //     totalSelisihLt,
    //     totalSelisihLebihKemasan,
    //     totalSelisihLebihLt,
    //     totalBatasKelongaran,
    //     keteranganBatasKelongaran,
    // ketentuan,
    //   });
    // }
  }

  render() {
    const {
      totalDebitKemasan,
      totalDebitLt,
      totalKreditKemasan,
      totalKreditLt,
      totalSaldoKemasan,
      totalSaldoLt,
      hasil_pencacahan_back5_1,
      hasil_pencacahan_back5_2,
      // updateSaldoKemasan,
      // updateSaldoLt,
      // totalSelisihKemasan,
      // totalSelisihLt,
      // hasil_pencacahan_back5_1,
      // hasil_pencacahan_back5_2,
      // totalSelisihLebihKemasan,
      // totalSelisihLebihLt,
      // totalBatasKelongaran,
      // keteranganBatasKelongaran,
    } = this.state;
    return (
      <>
        <Container menuName="Buku Rekening Cukai" contentName="BRCK-2" hideContentHeader>
          <Header>Buku Rekening Barang Kena Cukai Etil Alkohol (BRCK-2)</Header>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                  maxWidth: 550,
                }}
              >
                <div style={{ width: 75 }}>
                  <FormLabel>NPPBKC</FormLabel>
                </div>
                <Input
                  id="nppbkc"
                  onChange={this.handleInputChange}
                  value={1213456789}
                  style={{ width: "25%" }}
                />
                <Button type="primary" onClick={this.handleCariNPPBKC}>
                  Cari
                </Button>
                <Input value={"PT. A"} style={{ width: "75%" }} />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                  maxWidth: 550,
                }}
              >
                <div style={{ width: 75 }}>
                  <FormLabel>MERK</FormLabel>
                </div>
                <Input id="merkMMEA" onChange={this.handleInputChange} value={"A"} />
                <Button type="primary" onClick={this.handleCariMerk}>
                  Cari
                </Button>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                  maxWidth: 550,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1,
                    gap: 10,
                  }}
                >
                  <div style={{ width: 75 }}>
                    <FormLabel>JENIS</FormLabel>
                  </div>
                  <Input id="jenisMMEA" onChange={this.handleInputChange} value={50} />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1,
                    gap: 10,
                  }}
                >
                  <div style={{ width: 75 }}>
                    <FormLabel>TARIF</FormLabel>
                  </div>
                  <Input id="tarif" onChange={this.handleInputChange} value={50} />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                  maxWidth: 550,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1,
                    gap: 10,
                  }}
                >
                  <div style={{ width: 75 }}>
                    <FormLabel>ISI</FormLabel>
                  </div>
                  <Input id="isi" onChange={this.handleInputChange} value={50} />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1,
                    gap: 10,
                  }}
                >
                  <div style={{ width: 75 }}>
                    <FormLabel>KADAR</FormLabel>
                  </div>
                  <Input id="kadar" onChange={this.handleInputChange} value={50} />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  maxWidth: 550,
                }}
              >
                <div style={{ width: 75 }}>
                  <FormLabel>PERIODE</FormLabel>
                </div>
                <DatePicker onChange={this.handlePeriodeAwalChange} style={{ width: "100%" }} />
                <div>s.d</div>
                <DatePicker onChange={this.handlePeriodeAkhirChange} style={{ width: "100%" }} />
              </div>
            </div>

            <div style={{ display: "flex", gap: 5, justifyContent: "end" }}>
              <Button type="primary" onClick={this.handleTampilkan}>
                Tampilkan
              </Button>
              <Button type="danger" onClick={this.handleReset}>
                Reset
              </Button>
            </div>

            {this.state.dataSource.length > 0 && (
              <>
                <div style={{ marginTop: 40, marginBottom: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      marginBottom: 20,
                    }}
                  >
                    <div style={{ display: "flex", gap: 10 }}>
                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>
                            SALDO AWAL KEMASAN <br /> (Hasil penutupan periode sebelumnya)
                          </FormLabel>
                        </div>
                        <div>
                          <InputNumber
                            value={this.state.saldoAwalKemasan}
                            onChange={this.handleSaldoAwalKemasanChange}
                            min={0}
                            style={{ width: 200 }}
                          />
                        </div>
                      </div>

                      <div>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>
                            SALDO AWAL (lt) <br /> (Hasil penutupan periode sebelumnya)
                          </FormLabel>
                        </div>
                        <div>
                          <InputNumber
                            value={5000}
                            onChange={this.handleSaldoAwalLtChange}
                            min={0}
                            style={{ width: 200 }}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Table
                    columns={this.state.columns}
                    dataSource={this.state.dataSource}
                    loading={this.state.isLoading}
                    pagination={{
                      current: this.state.currenRekamPage,
                      total: this.state.limitRekamPage,
                    }}
                    scroll={{ x: "max-content" }}
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
                                <div style={{ textAlign: "center" }}>{text}</div>
                              ),
                            },
                            {
                              key: "debitKemasan",
                              title: "Debit Kemasan",
                              dataIndex: "debitKemasan",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                            {
                              key: "debitLiter",
                              title: "Debit (Lt)",
                              dataIndex: "debitLiter",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                            {
                              key: "kreditKemasan",
                              title: "Kredit Kemasan",
                              dataIndex: "kreditKemasan",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                            {
                              key: "kreditLiter",
                              title: "Kredit (Lt)",
                              dataIndex: "kreditLiter",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                            {
                              key: "saldoKemasan",
                              title: "Saldo Kemasan",
                              dataIndex: "saldoKemasan",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                            {
                              key: "saldoLiter",
                              title: "Saldo (Lt)",
                              dataIndex: "saldoLiter",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                            {
                              key: "keterangan",
                              title: "Keterangan",
                              dataIndex: "keterangan",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                          ]}
                          dataSource={[
                            {
                              key: "1",
                              title: "Jumlah",
                              debitKemasan: totalDebitKemasan,
                              debitLiter: totalDebitLt,
                              kreditKemasan: totalKreditKemasan,
                              kreditLiter: totalKreditLt,
                              saldoKemasan: totalSaldoKemasan,
                              saldoLiter: totalSaldoLt,
                              // saldoKemasan: updateSaldoKemasan,
                              // saldoLiter: updateSaldoLt,
                              keterangan: "Size Data: 31",
                            },
                            {
                              key: "2",
                              title: "Saldo Buku",
                              debitKemasan: "",
                              debitLiter: "",
                              kreditKemasan: "",
                              kreditLiter: "",
                              saldoKemasan: totalSaldoKemasan,
                              saldoLiter: totalSaldoLt,
                              // saldoKemasan: updateSaldoKemasan,
                              // saldoLiter: updateSaldoLt,
                              keterangan: "",
                            },
                            {
                              key: "3",
                              title: "Selisih",
                              debitKemasan: "",
                              debitLiter: "",
                              kreditKemasan: "",
                              kreditLiter: "",
                              saldoKemasan: "2000",
                              saldoLiter: "5000",
                              // saldoKemasan: totalSelisihKemasan,
                              // saldoLiter: totalSelisihLt,
                              keterangan: "",
                            },
                            {
                              key: "4",
                              title: "Saldo Akhir",
                              debitKemasan: "",
                              debitLiter: "",
                              kreditKemasan: "",
                              kreditLiter: "",
                              saldoKemasan: hasil_pencacahan_back5_1,
                              saldoLiter: hasil_pencacahan_back5_2,
                              keterangan: "",
                            },
                          ]}
                        />
                      );
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "end",
                    gap: 10,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div>Hasil Pencacahan (BACK-5)</div>
                    <div style={{ width: 125 }}>
                      <Input
                        id="hasil_pencacahan_back5_1"
                        // value={updateSaldoBukuKemasan}
                        value={5000}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div style={{ width: 125 }}>
                      <Input
                        id="hasil_pencacahan_back5_2"
                        // value={updateSaldoBukuLt}
                        value={5000}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div style={{ width: 125 }}>
                      <Input.TextArea
                        id="hasil_pencarian_back5_text_area"
                        value={"Selesai"}
                        onChange={this.handleInputChange}
                        autoSize
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div>No. BACK-5</div>
                    <div style={{ width: 125 }}>
                      <Input id="no_back5" onChange={this.handleInputChange} disabled />
                    </div>
                    <div style={{ width: 125 }}></div>
                    <div style={{ width: 125 }}></div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div>Tgl. BACK-5</div>
                    <div style={{ width: 125 }}>
                      <DatePicker onChange={this.handleTanggalBack5Change} disabled />
                    </div>
                    <div style={{ width: 125 }}></div>
                    <div style={{ width: 125 }}></div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div>Selisih Kurang</div>
                    <div style={{ width: 125 }}>
                      <Input
                        id="selisihKurangKemasan"
                        // value={totalSelisihKemasan}
                        value={2000}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div style={{ width: 125 }}>
                      <Input
                        id="selisihKurangLt"
                        // value={totalSelisihLt}
                        value={5000}
                      />
                    </div>
                    <div style={{ width: 125 }}>
                      <Input.TextArea
                        id="KeteranganSelisihKurang"
                        onChange={this.handleInputChange}
                        value={"Test"}
                        autoSize
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div>Selisih Lebih</div>
                    <div style={{ width: 125 }}>
                      <Input
                        id="selisihLebihKemasan"
                        // value={totalSelisihLebihKemasan}
                        value={5000}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div style={{ width: 125 }}>
                      <Input
                        id="selisihLebihLt"
                        // value={totalSelisihLebihLt}
                        value={3000}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div style={{ width: 125 }}>
                      <Input.TextArea
                        id="keteranganSelisihLebih"
                        value={" Test"}
                        disabled
                        onChange={this.handleInputChange}
                        autoSize
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div>Batas Kelonggaran</div>
                    <div style={{ width: 125 }}>
                      <Input
                        id="batasKelonggaranKemasan"
                        // value={totalBatasKelongaran}
                        value={3000}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div style={{ width: 125 }}>
                      <Input.TextArea
                        id="keteranganBatasKelonggaran"
                        onChange={this.handleInputChange}
                        // value={keteranganBatasKelongaran}
                        autoSize
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div></div>
                    <div style={{ width: 125 }}>
                      <Input.TextArea
                        id="ketentuan"
                        onChange={this.handleInputChange}
                        // value={keteranganBatasKelongaran}
                        value={this.state.ketentuan}
                        autoSize
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div>Jenis Penutupan</div>
                    <div style={{ width: 125 }}>
                      <Select onChange={this.handleJenisPenutupanChange} style={{ width: "100%" }}>
                        {this.state.list_jenis_penutupan.length > 0 &&
                          this.state.list_jenis_penutupan.map((item) => (
                            <Select.Option value={item.jenis_penutupan_code}>
                              {item.jenis_penutupan_name}
                            </Select.Option>
                          ))}
                      </Select>
                    </div>
                    <div style={{ width: 125 }}></div>
                    <div style={{ width: 125 }}></div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginTop: 30,
                    marginRight: 30,
                  }}
                >
                  <Button
                    type="primary"
                    width={300}
                    onClick={this.handleRekam}
                    style={{ marginRight: 30 }}
                  >
                    Simpan Perbaikan
                  </Button>
                  <ButtonCustom
                    variant="secondary"
                    width={200}
                    onClick={() => this.props.history.push(`${pathName}/brck-2`)}
                  >
                    Kembali
                  </ButtonCustom>
                </div>
              </>
            )}
          </div>
        </Container>

        <ModalDaftarNPPBKCMMEA
          isOpen={this.state.isModalNPPBKCMMEAOpen}
          onCancel={this.handleModalNPPBKCMMEACancel}
          onRow={this.handleModalNPPBKCRow}
        />

        <ModalDaftarMerk
          isOpen={this.state.isModalMerkOpen}
          onCancel={this.handleModalMerkCancel}
          onRow={this.handleModalMerkRow}
        />
      </>
    );
  }
}
