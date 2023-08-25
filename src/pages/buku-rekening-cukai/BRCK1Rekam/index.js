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
import React, { Component } from "react";
import ModalDaftarNPPBKC from "./ModalDaftarNPPBKC";
import Header from "components/Header";
import { pathName } from "configs/constants";
import ButtonCustom from "components/Button/ButtonCustom";
import { requestApi } from "utils/requestApi";
import { idMenu } from "utils/idMenu";
export default class BRCK1Rekam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalNPPBKCOpen: false,
      isHidden: false,
      nppbkc: "",
      namaPerusahaan: "",
      awalTanggalPeriode: "",
      akhirTanggalPeriode: "",

      totalJumlahSaldo: "",
      totalJumlahTransaksiDebit: "",
      totalSelisih: "",
      updateSaldo: "",
      totalPotongan: "",
      totalKekurangan: "",
      totalBatasKelonggaran: "",
      totalSelisihLebih: "",
      totalBatasLebih: "",
      keteranganSelisih: "",
      keteranganPotongan: "",
      keteranganKekurangan: "",
      keteranganBatasKelongaran: "",
      keteranaganSelisihLebih: "",
      keteranaganBatasLebih: "",

      idNppbkc: "",
      hasil_pencacahan_back5: "",
      saldo_awal: "",
      no_back5: "",
      tgl_back5: "",
      idBrck1: "",
      ketentuan: "",
      jenis_penutupan: "",
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

      notifError: false,
      selectedDate: "",
      columns: [
        {
          title: "DOKUMEN",
          children: [
            {
              key: "jenisDok",
              title: "JENIS",
              dataIndex: "jenisDok",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text}</div>
              ),
              ...this.getColumnSearchProps("jenisDok"),
            },
            {
              key: "nomorDok",
              title: "NOMOR",
              dataIndex: "nomorDok",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text}</div>
              ),
              ...this.getColumnSearchProps("nomorDok"),
            },
            {
              key: "tanggalDok",
              title: "TANGGAL",
              dataIndex: "tanggalDok",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text}</div>
              ),
              ...this.getColumnSearchProps("tanggalDok"),
            },
          ],
        },
        {
          title: "",
          children: [
            {
              key: "tanggalCioChar",
              title: "TGL PEMASUKAN/ PEMBUATAN ATAU PENGELUARAN",
              dataIndex: "tanggalCioChar",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text}</div>
              ),
              ...this.getColumnSearchProps("tanggalCioChar"),
            },
            {
              key: "uraianKegiatan",
              title: "URAIAN KEGIATAN",
              dataIndex: "uraianKegiatan",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text}</div>
              ),
              ...this.getColumnSearchProps("uraianKegiatan"),
            },
            {
              key: "jumlahKemasan",
              title: "JUMLAH KEMASAN",
              dataIndex: "jumlahKemasan",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text}</div>
              ),
              ...this.getColumnSearchProps("jumlahKemasan"),
            },
            {
              key: "isiPerKemasan",
              title: "ISI/ KEMASAN",
              dataIndex: "isiPerKemasan",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text}</div>
              ),
              ...this.getColumnSearchProps("isiPerKemasan"),
            },
          ],
        },

        {
          title: "TRANSAKSI",
          fixed: "right",
          children: [
            {
              key: "debitTransaksi",
              title: "DEBIT (Lt)",
              dataIndex: "debitTransaksi",
              fixed: "right",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text}</div>
              ),
            },
            {
              key: "kreditTransaksi",
              title: "KREDIT (Lt)",
              dataIndex: "kreditTransaksi",
              fixed: "right",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text}</div>
              ),
            },
            {
              key: "saldo",
              title: "SALDO",
              dataIndex: "saldo",
              fixed: "right",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text}</div>
              ),
            },
            {
              key: "keterangan",
              title: "KETERANGAN",
              dataIndex: "keterangan",
              fixed: "right",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text}</div>
              ),
            },
          ],
        },
      ],
      dataSource: [],
    };
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleColumnSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() =>
            this.handleColumnSearch(selectedKeys, confirm, dataIndex)
          }
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

  //Form Handler

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
  handlePeriodeAwalChange = (date, dateString) => {
    this.setState({ ...this.state, periode_awal: dateString });
  };
  handlePeriodeAkhirChange = (date, dateString) => {
    this.setState({ ...this.state, periode_akhir: dateString });
  };
  handleModalNPPBKCShow = () => {
    this.setState({ ...this.state, isModalNPPBKCOpen: true });
  };
  handleModalNPPBKCCancel = () => {
    this.setState({ ...this.state, isModalNPPBKCOpen: false });
  };
  handleCari = () => {
    this.handleModalNPPBKCShow();
  };

  handleTampilkan = async () => {
    const { nppbkc, awalTanggalPeriode, akhirTanggalPeriode } = this.state;

    if (!nppbkc || !awalTanggalPeriode || !akhirTanggalPeriode) {
      message.error("Please fill in all required fields.");
      this.setState({ notifError: true });

      setTimeout(() => {
        this.setState({ notifError: false });
      }, 3000);
      return;
    } else {
      await this.apiBrowseBrck1();
    }
  };

  handleReset = () => {
    this.setState({
      ...this.state,
      nppbkc: "",
      namaPerusahaan: "",
      awalTanggalPeriode: "",
      akhirTanggalPeriode: "",
    });
  };

  handleRow = (record, rowIndex) => ({
    onDoubleClick: (event) => {
      this.setState({
        ...this.state,
        isModalNPPBKCOpen: false,
        namaPerusahaan: record.namaPerusahaan,
        nppbkc: record.nppbkc,
      });
    },
  });
  handleSaldoAwalChange = (value) => {
    this.setState({ ...this.state, saldo_awal: value });
  };
  handleTanggalBack5Change = (date, dateString) => {
    this.setState({ ...this.state, tgl_back5: dateString });
  };
  handleJenisPenutupanChange = (value) => {
    this.setState({ ...this.state, jenis_penutupan: value });
  };

  //api handler
  apiBrowseBrck1 = async () => {
    const { nppbkc, awalTanggalPeriode, akhirTanggalPeriode } = this.state;

    const payload = {
      nppbkc: nppbkc,
      awalTanggalPeriode: awalTanggalPeriode.format("YYYY" - "MM" - "DD"),
      akhirTanggalPeriode: akhirTanggalPeriode.format("YYYY" - "MM" - "DD"),
    };

    this.setState({ isLoading: true });
    try {
      const responseBrowseBrck1 = await requestApi({
        service: "perdagangan",
        method: "get",
        endpoint: "/ck5/browse-brck1",
        params: payload,
      });

      this.setState({
        dataSource: responseBrowseBrck1.data.data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      this.setState({ error: "An error occurred", isLoading: false });
      message.error("Tidak bisa memuat data");
    }
  };

  apiRekamBrowseBrck1 = async () => {
    const {
      idBrck1,
      saldo_awal,
      ketentuan,
      no_back5,
      tgl_back5,
      hasil_pencacahan_back5,
      jenis_penutupan,
    } = this.state;

    const payload = {
      idMenu: idMenu("brck1"),
      catatan: ketentuan,
      hasilPencacahanBack5: hasil_pencacahan_back5,
      idBrck1: idBrck1,
      jenisPenutupan: jenis_penutupan,
      nomorBack5: no_back5,
      saldoAwal: saldo_awal,
      tanggalBack5: tgl_back5,
    };

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: "/brck/rekam-brck1",
      body: payload,
      setLoading: (bool) => this.setState({ isRekamLoading: bool }),
    });

    if (response) {
      notification.success({
        message: "Success",
        description: response.data.message,
      });
      this.props.history.push(`${pathName}/brck-1`);
    }
  };

  handleDateChange = (name, value) => {
    this.setState({ [name]: value });
  };

  totalKeseluruhan = () => {
    const { dataSource } = this.state;

    const totalJumlahTransaksiDebit = dataSource.reduce(
      (acc, item) => acc + parseInt(item.debitTransaksi, 10),
      0
    );
    const totalJumlahTransaksiKredit = dataSource.reduce(
      (acc, item) => acc + parseInt(item.kreditTransaksi, 10),
      0
    );
    const totalJumlahSaldo = dataSource.reduce(
      (acc, item) => acc + parseInt(item.saldo, 10),
      0
    );

    this.setState({
      totalJumlahTransaksiDebit,
      totalJumlahTransaksiKredit,
      totalJumlahSaldo,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataSource !== this.state.dataSource) {
      this.totalKeseluruhan();
    }
    //  else if (
    //   prevState.dataSource !== this.state.dataSource || prevState.hasil_pencacahan_back5 !== this.state.hasil_pencacahan_back5 ||
    //     prevState.totalJumlahSaldo !== this.state.totalJumlahSaldo ||
    //     prevState.saldo_awal !== this.state.saldo_awal ||
    //     prevState.totalJumlahTransaksiDebit !== this.state.totalJumlahTransaksiDebit
    //   ) {
    //     const hasil_pencacahan_back5 = parseInt(this.state.hasil_pencacahan_back5);
    //     const totalJumlahSaldo = parseInt(this.state.totalJumlahSaldo);
    //     const saldo_awal = parseInt(this.state.saldo_awal);
    //     const totalJumlahTransaksiDebit = parseInt(
    //       this.state.totalJumlahTransaksiDebit
    //     );

    //     let updateSaldo = totalJumlahSaldo;
    //     if (
    //       !isNaN(totalJumlahSaldo) &&
    //       !isNaN(saldo_awal) &&
    //       !isNaN(totalJumlahTransaksiDebit)
    //     ) {
    //       updateSaldo += saldo_awal;
    //     }

    //     let totalSelisih = 0;
    //     let totalSelisihLebih = 0;

    //     if (!isNaN(hasil_pencacahan_back5) && !isNaN(updateSaldo)) {
    //       totalSelisih = updateSaldo - hasil_pencacahan_back5;
    //       totalSelisihLebih = hasil_pencacahan_back5 - updateSaldo;
    //     }

    //     const totalPotongan = 0.005 * (totalJumlahTransaksiDebit + saldo_awal);
    //     const totalBatasLebih = 0.01 * updateSaldo;
    //     const totalKekurangan = totalSelisih - totalPotongan;
    //     const totalBatasKelonggaran = 3 * totalPotongan;

    //     let ketentuan = "";
    //     if (totalKekurangan > totalBatasKelonggaran) {
    //       ketentuan =
    //         "Jumlah Kekurangan setelah potongan lebih besar dari pada Batas Kelonggaran, dikenakan Sanksi Administrasi Denda";
    //     } else if (totalKekurangan < totalBatasKelonggaran) {
    //       ketentuan =
    //         "Jumlah Kekurangan setelah potongan tidak lebih besar dari pada Batas Kelonggaran, tidak dikenakan Sanksi Administrasi Denda";
    //     } else if (totalSelisih < totalBatasKelonggaran) {
    //       ketentuan =
    //         "Jumlah kelebihan BKC tidak lebih besar dari pada Batas Kelonggaran, tidak dikenakan Sanksi Administrasi Denda";
    //     } else if (totalSelisih > totalBatasKelonggaran) {
    //       ketentuan =
    //         "Jumlah kelebihan BKC lebih besar dari pada Batas Kelonggaran, dikenakan Sanksi Administrasi Denda";
    //     }

    //     const keteranganSelisih = `${updateSaldo}-${hasil_pencacahan_back5}`;
    //     const keteranganPotongan = `0.5% X (${totalJumlahTransaksiDebit}+${saldo_awal})`;
    //     const keteranganKekurangan = `${totalSelisih}-${totalPotongan}`;
    //     const keteranganBatasKelongaran = `3 x ${totalPotongan}`;
    //     const keteranaganSelisihLebih = `${hasil_pencacahan_back5}-${updateSaldo}`;
    //     const keteranaganBatasLebih = `0.1% X ${updateSaldo}`;

    //     this.setState({
    //       totalJumlahTransaksiDebit,
    //       totalJumlahSaldo,
    //       totalSelisih,
    //       updateSaldo,
    //       totalPotongan,
    //       totalKekurangan,
    //       totalBatasKelonggaran,
    //       totalSelisihLebih,
    //       totalBatasLebih,
    //       keteranganSelisih,
    //       keteranganPotongan,
    //       keteranganKekurangan,
    //       keteranganBatasKelongaran,
    //       keteranaganSelisihLebih,
    //       keteranaganBatasLebih,
    //       ketentuan,
    //     });
    //   }
  }

  render() {
    const {
      // isHidden,
      hasil_pencacahan_back5,
      totalJumlahTransaksiDebit,
      totalJumlahTransaksiKredit,
      totalJumlahSaldo,
      // totalSelisih,
      // updateSaldo,
      // totalPotongan,
      // totalKekurangan,
      // totalBatasKelonggaran,
      // totalSelisihLebih,
      // totalBatasLebih,
      // keteranganSelisih,
      // keteranganPotongan,
      // keteranganKekurangan,
      // keteranganBatasKelongaran,
      // keteranaganSelisihLebih,
      // keteranaganBatasLebih,
      // ketentuan,
      saldo_awal,
      notifError,
      awalTanggalPeriode,
      akhirTanggalPeriode,
    } = this.state;
    return (
      <>
        <Container
          menuName="Buku Rekening Cukai"
          contentName="BRCK-1"
          hideContentHeader
        >
          <Header>Buku Rekening Barang Kena Cukai Etil Alkohol (BRCK-1)</Header>
          <div
            className="kt-content  kt-grid__item kt-grid__item--fluid"
            id="kt_content"
          >
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
                <FormLabel>NPPBKC</FormLabel>
                <Input
                  id="nppbkc"
                  onChange={this.handleInputChange}
                  value={this.state.nppbkc}
                  style={{ flex: 3 }}
                  disabled
                />
                <Button type="primary" onClick={() => this.handleCari()}>
                  Cari
                </Button>
                <Input
                  disabled
                  value={this.state.namaPerusahaan}
                  style={{ flex: 3 }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  maxWidth: 550,
                }}
              >
                <FormLabel>PERIODE</FormLabel>
                <DatePicker
                  name="awalTanggalPeriode"
                  value={awalTanggalPeriode}
                  onChange={(date) =>
                    this.handleDateChange("awalTanggalPeriode", date)
                  }
                  style={{ width: "100%" }}
                />
                <div>s.d</div>
                <DatePicker
                  name="akhirTanggalPeriode"
                  value={akhirTanggalPeriode}
                  onChange={(date) =>
                    this.handleDateChange("akhirTanggalPeriode", date)
                  }
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 5, justifyContent: "end" }}>
              <Button
                type="primary"
                onClick={this.handleTampilkan}
                disabled={notifError ? true : false}
              >
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
                    <div>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>
                          SALDO AWAL (Hasil penutupan periode sebelumnya)
                        </FormLabel>
                      </div>
                      <div>
                        <InputNumber
                          value={saldo_awal}
                          onChange={this.handleSaldoAwalChange}
                          min={0}
                          style={{ width: 200 }}
                        />
                      </div>
                    </div>
                  </div>
                  <Table
                    columns={this.state.columns}
                    dataSource={this.state.dataSource}
                    scroll={{ x: "max-content" }}
                    loading={this.state.isLoading}
                    pagination={{
                      current: this.state.currenRekamPage,
                      total: this.state.limitRekamPage,
                    }}
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
                                <div style={{ textAlign: "center" }}>
                                  {text}
                                </div>
                              ),
                            },
                            {
                              key: "debitTransaksi",
                              title: "Transaksi Debit",
                              dataIndex: "debitTransaksi",
                              width: 101,
                              fixed: "right",
                              render: (text) => (
                                <div style={{ textAlign: "center" }}>
                                  {text}
                                </div>
                              ),
                            },
                            {
                              key: "kreditTransaksi",
                              title: "Transaksi Kredit",
                              dataIndex: "kreditTransaksi",
                              width: 101,
                              fixed: "right",
                              render: (text) => (
                                <div style={{ textAlign: "center" }}>
                                  {text}
                                </div>
                              ),
                            },

                            {
                              key: "saldo",
                              title: "Saldo",
                              dataIndex: "saldo",
                              width: 101,
                              fixed: "right",
                              render: (text) => (
                                <div style={{ textAlign: "center" }}>
                                  {text}
                                </div>
                              ),
                            },
                            {
                              key: "keterangan",
                              title: "Keterangan",
                              dataIndex: "keterangan",
                              width: 101,
                              fixed: "right",
                              render: (text) => (
                                <div style={{ textAlign: "center" }}>
                                  {text}
                                </div>
                              ),
                            },
                          ]}
                          dataSource={[
                            {
                              key: "1",
                              title: "Jumlah",
                              debitTransaksi: totalJumlahTransaksiDebit,
                              kreditTransaksi: totalJumlahTransaksiKredit,
                              saldo: totalJumlahSaldo,
                              keterangan: "Size Data: 31",
                            },
                            {
                              key: "2",
                              title: "Saldo Buku",
                              debitTransaksi: "",
                              kreditTransaksi: "",
                              saldo: totalJumlahSaldo,
                              keterangan: "",
                            },
                            {
                              key: "3",
                              title: "Selisih",
                              debitTransaksi: "",
                              kreditTransaksi: "",
                              saldo: "5000",
                              keterangan: "",
                            },
                            {
                              key: "4",
                              title: "Saldo Akhir",
                              debitTransaksi: "",
                              kreditTransaksi: "",
                              saldo: hasil_pencacahan_back5,
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
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div>Hasil Pencacahan (BACK-5)</div>
                    <div style={{ width: 200 }}>
                      <Input
                        id="hasil_pencacahan_back5"
                        value={this.state.hasil_pencacahan_back5}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div style={{ width: 200 }}>
                      <Input.TextArea
                        id="hasil_pencarian_back5_text_area"
                        disabled
                        onChange={this.handleInputChange}
                        autoSize
                      />
                    </div>
                  </div>

                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div>No. BACK-5</div>
                    <div style={{ width: 200 }}>
                      <Input id="no_back5" onChange={this.handleInputChange} />
                    </div>
                    <div style={{ width: 200 }}></div>
                  </div>

                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div>Tgl. BACK-5</div>
                    <div style={{ width: 200 }}>
                      <DatePicker onChange={this.handleTanggalBack5Change} />
                    </div>
                    <div style={{ width: 200 }}></div>
                  </div>

                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div>Selisih Kurang</div>
                    <div style={{ width: 200 }}>
                      <Input
                        id="selisihKurang"
                        disabled
                        onChange={this.handleInputChange}
                        value={5000}
                        // value={totalSelisih}
                      />
                    </div>
                    <div style={{ width: 200 }}>
                      <Input.TextArea
                        disabled
                        onChange={this.handleInputChange}
                        autoSize
                        value={"12000-7000"}
                        // saldo buku - hasil pencacahan back 5
                        // value={keteranganSelisih}
                      />
                    </div>
                  </div>

                  {this.state.saldo_awal && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div>Selisih Lebih</div>
                        <div style={{ width: 200 }}>
                          <Input
                            id="selisihlebih"
                            disabled
                            onChange={this.handleInputChange}
                            value={"1.000"}
                            // value={totalSelisihLebih}
                          />
                        </div>
                        <div style={{ width: 200 }}>
                          <Input.TextArea
                            disabled
                            onChange={this.handleInputChange}
                            value={"13.000 -12.000"}
                            // value={keteranaganSelisihLebih}
                            // pencacahan back 5 - saldo buku
                            autoSize
                          />
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div>Batas Kelonggaran</div>
                        <div style={{ width: 200 }}>
                          <Input
                            id="potongan"
                            disabled
                            onChange={this.handleInputChange}
                            // value={totalBatasLebih}
                          />
                        </div>
                        <div style={{ width: 200 }}>
                          <Input.TextArea
                            disabled
                            onChange={this.handleInputChange}
                            value={12}
                            // value={keteranaganBatasLebih}
                            // 0.01 * updateSaldo(saldo buku)
                            autoSize
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div>Potongan</div>
                    <div style={{ width: 200 }}>
                      <Input
                        id="potongan"
                        disabled
                        onChange={this.handleInputChange}
                        value={90}
                        // value={totalPotongan}
                      />
                    </div>
                    <div style={{ width: 200 }}>
                      <Input.TextArea
                        disabled
                        onChange={this.handleInputChange}
                        value={"0,5% x (6000 + 12000)"}
                        // value={keteranganPotongan}
                        // 0.005 * (totalJumlahTransaksiDebit + saldo_awal)
                        autoSize
                      />
                    </div>
                  </div>

                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div>Kekuranagan</div>
                    <div style={{ width: 200 }}>
                      <Input
                        id="Kekuranagan"
                        disabled
                        onChange={this.handleInputChange}
                        value={4080}
                        // value={totalKekurangan}
                      />
                    </div>
                    <div style={{ width: 200 }}>
                      <Input.TextArea
                        id="hasil_pencarian_back5_text_area"
                        disabled
                        onChange={this.handleInputChange}
                        value={"5000 - 90"}
                        // value={keteranganKekurangan}
                        // selish kurang - potongan
                        autoSize
                      />
                    </div>
                  </div>

                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div>Batas Kelongaran</div>
                    <div style={{ width: 200 }}>
                      <Input
                        id="batasKelongaran"
                        disabled
                        onChange={this.handleInputChange}
                        value={270}
                        // value={totalBatasKelonggaran}
                      />
                    </div>
                    <div style={{ width: 200 }}>
                      <Input.TextArea
                        disabled
                        onChange={this.handleInputChange}
                        value={"3 x 90"}
                        // value={keteranganBatasKelongaran}
                        // 3 x totalPotongan
                        autoSize
                      />
                    </div>
                  </div>

                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div style={{ width: 400 }}>
                      <Input.TextArea
                        id="ketentuan"
                        // value={ketentuan}
                        onChange={this.handleInputChange}
                        value={this.state.ketentuan}
                        // readOnly
                        rows={5}
                      />
                    </div>
                  </div>

                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div>Jenis Penutupan</div>
                    <div style={{ width: 200 }}>
                      <Select
                        onChange={this.handleJenisPenutupanChange}
                        style={{ width: "100%" }}
                      >
                        {this.state.list_jenis_penutupan.length > 0 &&
                          this.state.list_jenis_penutupan.map((item) => (
                            <Select.Option value={item.jenis_penutupan_code}>
                              {item.jenis_penutupan_name}
                            </Select.Option>
                          ))}
                      </Select>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: 30,
                marginRight: 20,
              }}
            >
              <Button
                type="primary"
                onClick={this.apiRekamBrowseBrck1}
                style={{ marginRight: 20 }}
              >
                Rekam
              </Button>
              <ButtonCustom
                variant="secondary"
                width={200}
                onClick={() => this.props.history.push(`${pathName}/brck-1`)}
              >
                Kembali
              </ButtonCustom>
            </div>
          </div>
        </Container>

        <ModalDaftarNPPBKC
          isOpen={this.state.isModalNPPBKCOpen}
          onCancel={this.handleModalNPPBKCCancel}
          onRow={this.handleRow}
          loading={this.state.isLoading}
        />
      </>
    );
  }
}
