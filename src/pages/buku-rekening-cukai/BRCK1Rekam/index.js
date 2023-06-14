import { Button, DatePicker, Icon, Input, InputNumber, Select, Table } from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import React, { Component } from "react";
import ModalDaftarNPPBKC from "./ModalDaftarNPPBKC";
import Header from "components/Header";

export default class BRCK1Rekam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalNPPBKCOpen: false,
      nppbkc: "",
      nama_perusahaan: "",
      periode_awal: "",
      periode_akhir: "",
      saldo_awal: 0,
      hasil_pencarian_back5: "",
      hasil_pencarian_back5_textarea: "",
      no_back5: "",
      tgl_back5: "",
      jenis_penutupan: "",
      list_jenis_penutupan: [],
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
              key: "transaksi_debit",
              title: "DEBIT (Lt)",
              dataIndex: "transaksi_debit",
              width: 80,
              fixed: "right",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
            {
              key: "transaksi_kredit",
              title: "KREDIT (Lt)",
              dataIndex: "transaksi_kredit",
              width: 80,
              fixed: "right",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
            },
          ],
        },
        {
          key: "saldo",
          title: "SALDO",
          dataIndex: "saldo",
          width: 80,
          fixed: "right",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
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
  handleTampilkan = () => {
    this.setState({
      ...this.state,
      dataSource: [
        {
          key: "1",
          jenis_dokumen: "jenis_dokumen",
          nomor_dokumen: "nomor_dokumen",
          tanggal_dokumen: "tanggal_dokumen",
          tanggal_transaksi: "tanggal_transaksi",
          uraian_kegiatan: "uraian_kegiatan",
          jumlah_kemasan: "jumlah_kemasan",
          isi: "isi",
          transaksi_debit: "0",
          transaksi_kredit: "0",
          saldo: "0",
          keterangan: "keterangan",
        },
        {
          key: "2",
          jenis_dokumen: "jenis_dokumen",
          nomor_dokumen: "nomor_dokumen",
          tanggal_dokumen: "tanggal_dokumen",
          tanggal_transaksi: "tanggal_transaksi",
          uraian_kegiatan: "uraian_kegiatan",
          jumlah_kemasan: "jumlah_kemasan",
          isi: "isi",
          transaksi_debit: "0",
          transaksi_kredit: "0",
          saldo: "0",
          keterangan: "keterangan",
        },
        {
          key: "3",
          jenis_dokumen: "jenis_dokumen",
          nomor_dokumen: "nomor_dokumen",
          tanggal_dokumen: "tanggal_dokumen",
          tanggal_transaksi: "tanggal_transaksi",
          uraian_kegiatan: "uraian_kegiatan",
          jumlah_kemasan: "jumlah_kemasan",
          isi: "isi",
          transaksi_debit: "0",
          transaksi_kredit: "0",
          saldo: "0",
          keterangan: "keterangan",
        },
        {
          key: "4",
          jenis_dokumen: "jenis_dokumen",
          nomor_dokumen: "nomor_dokumen",
          tanggal_dokumen: "tanggal_dokumen",
          tanggal_transaksi: "tanggal_transaksi",
          uraian_kegiatan: "uraian_kegiatan",
          jumlah_kemasan: "jumlah_kemasan",
          isi: "isi",
          transaksi_debit: "0",
          transaksi_kredit: "0",
          saldo: "0",
          keterangan: "keterangan",
        },
        {
          key: "5",
          jenis_dokumen: "jenis_dokumen",
          nomor_dokumen: "nomor_dokumen",
          tanggal_dokumen: "tanggal_dokumen",
          tanggal_transaksi: "tanggal_transaksi",
          uraian_kegiatan: "uraian_kegiatan",
          jumlah_kemasan: "jumlah_kemasan",
          isi: "isi",
          transaksi_debit: "0",
          transaksi_kredit: "0",
          saldo: "0",
          keterangan: "keterangan",
        },
        {
          key: "6",
          jenis_dokumen: "jenis_dokumen",
          nomor_dokumen: "nomor_dokumen",
          tanggal_dokumen: "tanggal_dokumen",
          tanggal_transaksi: "tanggal_transaksi",
          uraian_kegiatan: "uraian_kegiatan",
          jumlah_kemasan: "jumlah_kemasan",
          isi: "isi",
          transaksi_debit: "0",
          transaksi_kredit: "0",
          saldo: "0",
          keterangan: "keterangan",
        },
        {
          key: "7",
          jenis_dokumen: "jenis_dokumen",
          nomor_dokumen: "nomor_dokumen",
          tanggal_dokumen: "tanggal_dokumen",
          tanggal_transaksi: "tanggal_transaksi",
          uraian_kegiatan: "uraian_kegiatan",
          jumlah_kemasan: "jumlah_kemasan",
          isi: "isi",
          transaksi_debit: "0",
          transaksi_kredit: "0",
          saldo: "0",
          keterangan: "keterangan",
        },
        {
          key: "8",
          jenis_dokumen: "jenis_dokumen",
          nomor_dokumen: "nomor_dokumen",
          tanggal_dokumen: "tanggal_dokumen",
          tanggal_transaksi: "tanggal_transaksi",
          uraian_kegiatan: "uraian_kegiatan",
          jumlah_kemasan: "jumlah_kemasan",
          isi: "isi",
          transaksi_debit: "0",
          transaksi_kredit: "0",
          saldo: "0",
          keterangan: "keterangan",
        },
        {
          key: "9",
          jenis_dokumen: "jenis_dokumen",
          nomor_dokumen: "nomor_dokumen",
          tanggal_dokumen: "tanggal_dokumen",
          tanggal_transaksi: "tanggal_transaksi",
          uraian_kegiatan: "uraian_kegiatan",
          jumlah_kemasan: "jumlah_kemasan",
          isi: "isi",
          transaksi_debit: "0",
          transaksi_kredit: "0",
          saldo: "0",
          keterangan: "keterangan",
        },
        {
          key: "10",
          jenis_dokumen: "jenis_dokumen",
          nomor_dokumen: "nomor_dokumen",
          tanggal_dokumen: "tanggal_dokumen",
          tanggal_transaksi: "tanggal_transaksi",
          uraian_kegiatan: "uraian_kegiatan",
          jumlah_kemasan: "jumlah_kemasan",
          isi: "isi",
          transaksi_debit: "0",
          transaksi_kredit: "0",
          saldo: "0",
          keterangan: "keterangan",
        },
      ],
    });
  };
  handleReset = () => {
    this.setState({
      ...this.state,
      nppbkc: "",
      nama_perusahaan: "",
      periode_awal: "",
      periode_akhir: "",
    });
  };
  handleRow = (record, rowIndex) => ({
    onDoubleClick: (event) => {
      this.setState({
        ...this.state,
        isModalNPPBKCOpen: false,
        nama_perusahaan: record.nama_perusahaan,
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
  handleRekam = () => {
    console.log("rekam...");
  };

  render() {
    return (
      <>
        <Container menuName="Buku Rekening Cukai" contentName="BRCK-1" hideContentHeader>
          <Header>Buku Rekening Barang Kena Cukai Etil Alkohol (BRCK-1)</Header>
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
                <FormLabel>NPPBKC</FormLabel>
                <Input
                  id="nppbkc"
                  onChange={this.handleInputChange}
                  value={this.state.nppbkc}
                  style={{ flex: 1 }}
                />
                <Button type="primary" onClick={this.handleCari}>
                  Cari
                </Button>
                <Input disabled value={this.state.nama_perusahaan} style={{ flex: 3 }} />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, maxWidth: 550 }}>
                <FormLabel>PERIODE</FormLabel>
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
                    <div>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>SALDO AWAL (Hasil penutupan periode sebelumnya)</FormLabel>
                      </div>
                      <div>
                        <InputNumber
                          value={this.state.saldo_awal}
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
                              key: "transaksi_debit",
                              title: "Transaksi Debit",
                              dataIndex: "transaksi_debit",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                            {
                              key: "transaksi_kredit",
                              title: "Transaksi Kredit",
                              dataIndex: "transaksi_kredit",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },

                            {
                              key: "saldo",
                              title: "Saldo",
                              dataIndex: "saldo",
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
                              transaksi_debit: "0",
                              transaksi_kredit: "0",
                              saldo: "0",
                              keterangan: "Size Data: 31",
                            },
                            {
                              key: "2",
                              title: "Saldo Buku",
                              transaksi_debit: "",
                              transaksi_kredit: "",
                              saldo: "0",
                              keterangan: "",
                            },
                            {
                              key: "3",
                              title: "Selisih",
                              transaksi_debit: "",
                              transaksi_kredit: "",
                              saldo: "0",
                              keterangan: "",
                            },
                            {
                              key: "4",
                              title: "Saldo Akhir",
                              transaksi_debit: "",
                              transaksi_kredit: "",
                              saldo: "0",
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
                    <div>Hasil Pencarian (BACK-5)</div>
                    <div style={{ width: 125 }}>
                      <Input id="hasil_pencarian_back5" onChange={this.handleInputChange} />
                    </div>
                    <div style={{ width: 125 }}>
                      <Input.TextArea
                        id="hasil_pencarian_back5_text_area"
                        disabled
                        onChange={this.handleInputChange}
                        autoSize
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div>No. BACK-5</div>
                    <div style={{ width: 125 }}>
                      <Input id="no_back5" onChange={this.handleInputChange} />
                    </div>
                    <div style={{ width: 125 }}></div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div>Tgl. BACK-5</div>
                    <div style={{ width: 125 }}>
                      <DatePicker onChange={this.handleTanggalBack5Change} />
                    </div>
                    <div style={{ width: 125 }}></div>
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
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "end", marginTop: 30 }}>
                  <Button type="primary" onClick={this.handleRekam}>
                    Rekam
                  </Button>
                </div>
              </>
            )}
          </div>
        </Container>

        <ModalDaftarNPPBKC
          isOpen={this.state.isModalNPPBKCOpen}
          onCancel={this.handleModalNPPBKCCancel}
          onRow={this.handleRow}
        />
      </>
    );
  }
}
