import { Button, DatePicker, Icon, Input, InputNumber, Select, Table } from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import React, { Component } from "react";
import ModalDaftarNPPBKCMMEA from "./ModalDaftarNPPBKCMMEA";
import ModalDaftarMerk from "./ModalDaftarMerk";

export default class BRCK2Rekam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalNPPBKCMMEAOpen: false,
      isModalMerkOpen: false,

      nppbkc: "",
      nama_perusahaan: "",
      merk: "",
      jenis: "",
      tarif: "",
      isi: "",
      kadar: "",
      periode_awal: "",
      periode_akhir: "",
      saldo_awal_kemasan: "0",
      saldo_awal_lt: "0",

      hasil_pencarian_back5_1: "",
      hasil_pencarian_back5_2: "",
      hasil_pencarian_back5_text_area: "",
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
        nama_perusahaan: record.nama_perusahaan,
      });
    },
  });
  handleModalMerkRow = (record, rowIndex) => ({
    onDoubleClick: (event) => {
      this.setState({
        ...this.state,
        isModalMerkOpen: false,
        jenis: record.jenis_mmea,
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
          jenis_dokumen: "jenis_dokumen",
          nomor_dokumen: "nomor_dokumen",
          tanggal_dokumen: "tanggal_dokumen",
          tanggal_transaksi: "tanggal_transaksi",
          uraian_kegiatan: "uraian_kegiatan",
          debet_kemasan: "debet_kemasan",
          debet_lt: "debet_lt",
          kredit_kemasan: "kredit_kemasan",
          kredit_lt: "kredit_lt",
          saldo_kemasan: "saldo_kemasan",
          saldo_lt: "saldo_lt",
          keterangan: "keterangan",
        },
      ],
    });
  };
  handleReset = () => {
    console.log("reset...");
  };

  render() {
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
                  value={this.state.nppbkc}
                  style={{ width: "25%" }}
                />
                <Button type="primary" onClick={this.handleCariNPPBKC}>
                  Cari
                </Button>
                <Input disabled value={this.state.nama_perusahaan} style={{ width: "75%" }} />
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
                <Input id="merk" onChange={this.handleInputChange} value={this.state.merk} />
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
                <div style={{ display: "flex", alignItems: "center", flex: 1, gap: 10 }}>
                  <div style={{ width: 75 }}>
                    <FormLabel>JENIS</FormLabel>
                  </div>
                  <Input
                    id="jenis"
                    onChange={this.handleInputChange}
                    value={this.state.jenis}
                    disabled
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", flex: 1, gap: 10 }}>
                  <div style={{ width: 75 }}>
                    <FormLabel>TARIF</FormLabel>
                  </div>
                  <Input
                    id="tarif"
                    onChange={this.handleInputChange}
                    value={this.state.tarif}
                    disabled
                  />
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
                <div style={{ display: "flex", alignItems: "center", flex: 1, gap: 10 }}>
                  <div style={{ width: 75 }}>
                    <FormLabel>ISI</FormLabel>
                  </div>
                  <Input
                    id="isi"
                    onChange={this.handleInputChange}
                    value={this.state.isi}
                    disabled
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", flex: 1, gap: 10 }}>
                  <div style={{ width: 75 }}>
                    <FormLabel>KADAR</FormLabel>
                  </div>
                  <Input
                    id="kadar"
                    onChange={this.handleInputChange}
                    value={this.state.kadar}
                    disabled
                  />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, maxWidth: 550 }}>
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
                            value={this.state.saldo_awal_kemasan}
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
                            value={this.state.saldo_awal_lt}
                            onChange={this.handleSaldoAwalLtChange}
                            min={0}
                            style={{ width: 200 }}
                          />
                        </div>
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
                              key: "debit_kemasan",
                              title: "Debit Kemasan",
                              dataIndex: "debit_kemasan",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                            {
                              key: "debit_lt",
                              title: "Debit (Lt)",
                              dataIndex: "debit_lt",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                            {
                              key: "kredit_kemasan",
                              title: "Kredit Kemasan",
                              dataIndex: "kredit_kemasan",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                            {
                              key: "kredit_lt",
                              title: "Kredit (Lt)",
                              dataIndex: "kredit_lt",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                            {
                              key: "saldo_kemasan",
                              title: "Saldo Kemasan",
                              dataIndex: "saldo_kemasan",
                              width: 80,
                              fixed: "right",
                              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                            },
                            {
                              key: "saldo_lt",
                              title: "Saldo (Lt)",
                              dataIndex: "saldo_lt",
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
                              debit_kemasan: "0",
                              debit_lt: "0",
                              kredit_kemasan: "0",
                              kredit_lt: "0",
                              saldo_kemasan: "0",
                              saldo_lt: "0",
                              keterangan: "Size Data: 31",
                            },
                            {
                              key: "2",
                              title: "Saldo Buku",
                              debit_kemasan: "0",
                              debit_lt: "0",
                              kredit_kemasan: "0",
                              kredit_lt: "0",
                              saldo_kemasan: "0",
                              saldo_lt: "0",
                              keterangan: "",
                            },
                            {
                              key: "3",
                              title: "Selisih",
                              debit_kemasan: "0",
                              debit_lt: "0",
                              kredit_kemasan: "0",
                              kredit_lt: "0",
                              saldo_kemasan: "0",
                              saldo_lt: "0",
                              keterangan: "",
                            },
                            {
                              key: "4",
                              title: "Saldo Akhir",
                              debit_kemasan: "0",
                              debit_lt: "0",
                              kredit_kemasan: "0",
                              kredit_lt: "0",
                              saldo_kemasan: "0",
                              saldo_lt: "0",
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
                      <Input id="hasil_pencarian_back5_1" onChange={this.handleInputChange} />
                    </div>
                    <div style={{ width: 125 }}>
                      <Input id="hasil_pencarian_back5_2" onChange={this.handleInputChange} />
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
                    <div style={{ width: 125 }}></div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div>Tgl. BACK-5</div>
                    <div style={{ width: 125 }}>
                      <DatePicker onChange={this.handleTanggalBack5Change} />
                    </div>
                    <div style={{ width: 125 }}></div>
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
