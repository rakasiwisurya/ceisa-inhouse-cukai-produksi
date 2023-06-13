import React, { Fragment, Component } from "react";
import { Row, Col, Input, Button, Icon, DatePicker, Select, Table } from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";

export default class ReferensiTarif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Surat Keputusan",
      subtitle2: "Rincian",
      isEdit: false,
      searchText: "",
      searchedColumn: "",

      nomor_surat: "",
      tanggal_surat: "",
      tanggal_awal_berlaku: "",
      nomor_peraturan: "",
      tanggal_peraturan: "",
      golongan: "",
      jenis_bkc: "",

      jenis_produksi: "",
      jenis_hptl_rel: "",
      tarif: "",
      batas_produksi1: "",
      batas_produksi2: "",
      hje1: "",
      hje2: "",
      layer: "",
      satuan: "[Satuan]",

      kadar_atas: "",
      kadar_bawah: "",
      tarif_cukai_dalam_negeri: "",
      tarif_cukai_impor: "",

      list_jenis_bkc: [
        {
          jenis_bkc_code: "HT",
          jenis_bkc_name: "Hasil Tembakau (HT)",
        },
        {
          jenis_bkc_code: "MMEA",
          jenis_bkc_name: "Minuman Mengandung Etil Alkohol (MMEA)",
        },
      ],
      list_golongan: [],
      list_jenis_produksi: [],
      list_jenis_hptl_rel: [],
      dataSource: [],
      columns: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.jenis_bkc !== this.state.jenis_bkc) {
      if (this.state.jenis_bkc === "HT") {
        this.setState({
          ...this.state,
          list_golongan: [
            {
              golongan_code: "1",
              golongan_name: "I",
            },
            {
              golongan_code: "2",
              golongan_name: "II",
            },
            {
              golongan_code: "3",
              golongan_name: "III",
            },
            {
              golongan_code: "4",
              golongan_name: "III/A",
            },
            {
              golongan_code: "5",
              golongan_name: "III/B",
            },
            {
              golongan_code: "6",
              golongan_name: "IMPORTIR HT",
            },
            {
              golongan_code: "7",
              golongan_name: "TANPA GOLONGAN",
            },
          ],
          list_jenis_produksi: [
            {
              jenis_produksi_code: "SKM",
              jenis_produksi_name: "SIGARET KRETEK MESIN",
            },
            {
              jenis_produksi_code: "CRT",
              jenis_produksi_name: "CERUTU",
            },
            {
              jenis_produksi_code: "HTL",
              jenis_produksi_name: "HASIL TEMBAKAU LAINNYA",
            },
            {
              jenis_produksi_code: "STF",
              jenis_produksi_name: "SIGARET KRETEK TANGAN FILTER",
            },
            {
              jenis_produksi_code: "SPT",
              jenis_produksi_name: "SIGARET PUTIH TANGAN",
            },
            {
              jenis_produksi_code: "SPM",
              jenis_produksi_name: "SIGARET PUTIH MESIN",
            },
            {
              jenis_produksi_code: "TIS",
              jenis_produksi_name: "TEMBAKAU IRIS",
            },
            {
              jenis_produksi_code: "KLM",
              jenis_produksi_name: "KELEMBAK MENYAN",
            },
            {
              jenis_produksi_code: "KLB",
              jenis_produksi_name: "KLOBOT",
            },
            {
              jenis_produksi_code: "SKT",
              jenis_produksi_name: "SIGARET KRETEK TANGAN",
            },
            {
              jenis_produksi_code: "SPF",
              jenis_produksi_name: "SIGARET PUTIH TANGAN FILTER",
            },
            {
              jenis_produksi_code: "REL",
              jenis_produksi_name: "ROKOK ELEKTRIK",
            },
          ],
          list_jenis_hptl_rel: [
            {
              jenis_hptl_rel_code: "HT",
              jenis_hptl_rel_name: "Hasil Tembakau (HT)",
            },
            {
              jenis_hptl_rel_code: "MMEA",
              jenis_hptl_rel_name: "Minuman Mengandung Etil Alkohol (MMEA)",
            },
          ],
          columns: [
            {
              key: "aksi",
              dataIndex: "aksi",
              title: "Aksi",
              fixed: "left",
              render: () => (
                <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                  <Button type="primary" icon="form" onClick={this.handleEdit} />
                  <Button type="danger" icon="close" onClick={this.handleReset} />
                </div>
              ),
            },
            {
              key: "nomor",
              dataIndex: "nomor",
              title: "Nomor",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("nomor"),
            },
            {
              key: "golongan",
              dataIndex: "golongan",
              title: "Golongan",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("golongan"),
            },
            {
              key: "jenis_produksi",
              dataIndex: "jenis_produksi",
              title: "Jenis Produksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("jenis_produksi"),
            },
            {
              key: "jenis_hptl_rel",
              dataIndex: "jenis_hptl_rel",
              title: "Jenis HPTL/REL",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("jenis_hptl_rel"),
            },
            {
              key: "hje1",
              dataIndex: "hje1",
              title: "HJE I",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("hje1"),
            },
            {
              key: "hje2",
              dataIndex: "hje2",
              title: "HJE II",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("hje2"),
            },
            {
              key: "layer",
              dataIndex: "layer",
              title: "Layer",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("layer"),
            },
            {
              key: "tarif",
              title: "Tarif",
              dataIndex: "tarif",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("tarif"),
            },
            {
              key: "batas_produksi1",
              title: "Batas I",
              dataIndex: "batas_produksi1",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("batas_produksi1"),
            },
            {
              key: "batas_produksi2",
              title: "Batas II",
              dataIndex: "batas_produksi2",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("batas_produksi2"),
            },
          ],
          dataSource: [
            {
              key: "1",
              nomor: "1",
              golongan: "9",
              jenis_produksi: "CRT",
              jenis_hptl_rel: "-",
              hje1: "198001",
              hje2: "-",
              layer: "1",
              tarif: "110000",
              batas_produksi1: "0",
              batas_produksi2: "9999999999",
            },
            {
              key: "2",
              nomor: "2",
              golongan: "8",
              jenis_produksi: "KLB",
              jenis_hptl_rel: "-",
              hje1: "290",
              hje2: "-",
              layer: "1",
              tarif: "30",
              batas_produksi1: "0",
              batas_produksi2: "9999999999",
            },
            {
              key: "3",
              nomor: "3",
              golongan: "1",
              jenis_produksi: "KLM",
              jenis_hptl_rel: "-",
              hje1: "860",
              hje2: "-",
              layer: "1",
              tarif: "4000001",
              batas_produksi1: "0",
              batas_produksi2: "9999999999",
            },
            {
              key: "4",
              nomor: "4",
              golongan: "1",
              jenis_produksi: "SKT",
              jenis_hptl_rel: "-",
              hje1: "1250",
              hje2: "1800",
              layer: "2",
              tarif: "361",
              batas_produksi1: "20000000001",
              batas_produksi2: "9999999999",
            },
            {
              key: "5",
              nomor: "5",
              golongan: "1",
              jenis_produksi: "SPT",
              jenis_hptl_rel: "-",
              hje1: "1250",
              hje2: "1800",
              layer: "2",
              tarif: "361",
              batas_produksi1: "20000000001",
              batas_produksi2: "9999999999",
            },
            {
              key: "6",
              nomor: "6",
              golongan: "8",
              jenis_produksi: "KLM",
              jenis_hptl_rel: "-",
              hje1: "12345",
              hje2: "-",
              layer: "1",
              tarif: "3000001",
              batas_produksi1: "0",
              batas_produksi2: "9999999999",
            },
            {
              key: "7",
              nomor: "7",
              golongan: "3",
              jenis_produksi: "SKT",
              jenis_hptl_rel: "-",
              hje1: "4000",
              hje2: "1800",
              layer: "2",
              tarif: "361",
              batas_produksi1: "20000000001",
              batas_produksi2: "9999999999",
            },
            {
              key: "8",
              nomor: "8",
              golongan: "5",
              jenis_produksi: "SPT",
              jenis_hptl_rel: "-",
              hje1: "3000",
              hje2: "1800",
              layer: "2",
              tarif: "361",
              batas_produksi1: "20000000001",
              batas_produksi2: "9999999999",
            },
            {
              key: "9",
              nomor: "9",
              golongan: "1",
              jenis_produksi: "SKT",
              jenis_hptl_rel: "-",
              hje1: "1250",
              hje2: "2000",
              layer: "2",
              tarif: "361",
              batas_produksi1: "20000000001",
              batas_produksi2: "9999999999",
            },
            {
              key: "10",
              nomor: "10",
              golongan: "1",
              jenis_produksi: "KLM",
              jenis_hptl_rel: "-",
              hje1: "1250",
              hje2: "2000",
              layer: "2",
              tarif: "361",
              batas_produksi1: "20000000001",
              batas_produksi2: "9999999999",
            },
          ],
        });
      }

      if (this.state.jenis_bkc === "MMEA") {
        this.setState({
          ...this.state,
          list_golongan: [
            {
              golongan_code: "A",
              golongan_name: "A",
            },
            {
              golongan_code: "B",
              golongan_name: "B",
            },
            {
              golongan_code: "C",
              golongan_name: "C",
            },
          ],
          columns: [
            {
              key: "aksi",
              dataIndex: "aksi",
              title: "Aksi",
              fixed: "left",
              render: () => (
                <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                  <Button type="primary" icon="form" onClick={this.handleEdit} />
                  <Button type="danger" icon="close" onClick={this.handleReset} />
                </div>
              ),
            },
            {
              key: "nomor",
              dataIndex: "nomor",
              title: "Nomor",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("nomor"),
            },
            {
              key: "golongan",
              dataIndex: "golongan",
              title: "Golongan",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("golongan"),
            },
            {
              key: "kadar_atas",
              dataIndex: "kadar_atas",
              title: "Kadar Atas",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("kadar_atas"),
            },
            {
              key: "kadar_bawah",
              dataIndex: "kadar_bawah",
              title: "Kadar Bawah",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("kadar_bawah"),
            },
            {
              key: "tarif_cukai_dalam_negeri",
              dataIndex: "tarif_cukai_dalam_negeri",
              title: "Tarif Cukai Dalam Negeri",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("tarif_cukai_dalam_negeri"),
            },
            {
              key: "tarif_cukai_impor",
              dataIndex: "tarif_cukai_impor",
              title: "Tarif Cukai Impor",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("tarif_cukai_impor"),
            },
          ],
          dataSource: [
            {
              key: "1",
              nomor: "1",
              golongan: "A",
              kadar_atas: "kadar_atas",
              kadar_bawah: "kadar_bawah",
              tarif_cukai_dalam_negeri: "tarif_cukai_dalam_negeri",
              tarif_cukai_impor: "tarif_cukai_impor",
            },
            {
              key: "2",
              nomor: "2",
              golongan: "A",
              kadar_atas: "kadar_atas",
              kadar_bawah: "kadar_bawah",
              tarif_cukai_dalam_negeri: "tarif_cukai_dalam_negeri",
              tarif_cukai_impor: "tarif_cukai_impor",
            },
            {
              key: "3",
              nomor: "3",
              golongan: "A",
              kadar_atas: "kadar_atas",
              kadar_bawah: "kadar_bawah",
              tarif_cukai_dalam_negeri: "tarif_cukai_dalam_negeri",
              tarif_cukai_impor: "tarif_cukai_impor",
            },
            {
              key: "4",
              nomor: "4",
              golongan: "A",
              kadar_atas: "kadar_atas",
              kadar_bawah: "kadar_bawah",
              tarif_cukai_dalam_negeri: "tarif_cukai_dalam_negeri",
              tarif_cukai_impor: "tarif_cukai_impor",
            },
            {
              key: "5",
              nomor: "5",
              golongan: "A",
              kadar_atas: "kadar_atas",
              kadar_bawah: "kadar_bawah",
              tarif_cukai_dalam_negeri: "tarif_cukai_dalam_negeri",
              tarif_cukai_impor: "tarif_cukai_impor",
            },
            {
              key: "6",
              nomor: "6",
              golongan: "A",
              kadar_atas: "kadar_atas",
              kadar_bawah: "kadar_bawah",
              tarif_cukai_dalam_negeri: "tarif_cukai_dalam_negeri",
              tarif_cukai_impor: "tarif_cukai_impor",
            },
            {
              key: "7",
              nomor: "7",
              golongan: "A",
              kadar_atas: "kadar_atas",
              kadar_bawah: "kadar_bawah",
              tarif_cukai_dalam_negeri: "tarif_cukai_dalam_negeri",
              tarif_cukai_impor: "tarif_cukai_impor",
            },
            {
              key: "8",
              nomor: "8",
              golongan: "A",
              kadar_atas: "kadar_atas",
              kadar_bawah: "kadar_bawah",
              tarif_cukai_dalam_negeri: "tarif_cukai_dalam_negeri",
              tarif_cukai_impor: "tarif_cukai_impor",
            },
            {
              key: "9",
              nomor: "9",
              golongan: "A",
              kadar_atas: "kadar_atas",
              kadar_bawah: "kadar_bawah",
              tarif_cukai_dalam_negeri: "tarif_cukai_dalam_negeri",
              tarif_cukai_impor: "tarif_cukai_impor",
            },
            {
              key: "10",
              nomor: "10",
              golongan: "A",
              kadar_atas: "kadar_atas",
              kadar_bawah: "kadar_bawah",
              tarif_cukai_dalam_negeri: "tarif_cukai_dalam_negeri",
              tarif_cukai_impor: "tarif_cukai_impor",
            },
          ],
        });
      }
    }
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
  handleTanggalSuratChange = (date, dateString) => {
    this.setState({ ...this.state, tanggal_surat: dateString });
  };
  handleTanggalAwalBerlakuChange = (date, dateString) => {
    this.setState({ ...this.state, tanggal_awal_berlaku: dateString });
  };
  handleTanggalperaturanChange = (date, dateString) => {
    this.setState({ ...this.state, tanggal_peraturan: dateString });
  };
  handleJenisBKCChange = (value) => {
    this.setState({ ...this.state, jenis_bkc: value });
  };
  handleJenisGolonganChange = (value) => {
    this.setState({ ...this.state, golongan: value });
  };
  handleJenisProduksiChange = (value) => {
    this.setState({ ...this.state, jenis_produksi: value });
  };
  handleJenisHPTLRELChange = (value) => {
    this.setState({ ...this.setState, jenis_hptl_rel: value });
  };
  handleEdit = () => {
    this.setState({ ...this.state, isEdit: true });
  };
  handleDelete = () => {
    console.log("deleting...");
  };
  handleReset = () => {
    console.log("reseting...");
  };
  handleUpdate = () => {
    this.setState({ ...this.state, isEdit: false });
  };
  handleSave = () => {
    console.log("saving...");
  };
  handleRekam = () => {
    console.log("merekam...");
  };

  render() {
    return (
      <Fragment>
        <Container
          menuName="Referensi Tarif dan Pita Cukai"
          contentName="Referensi Tarif"
          hideContentHeader
        >
          <Header>{this.state.subtitle1}</Header>
          <div
            className="kt-content  kt-grid__item kt-grid__item--fluid"
            id="kt_content"
            style={{ paddingBottom: 10 }}
          >
            <Row gutter={[16, 16]}>
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
              <Col span={6}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Surat</FormLabel>
                </div>
                <DatePicker onChange={this.handleTanggalSuratChange} />
              </Col>
              <Col span={6}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Awal Berlaku</FormLabel>
                </div>
                <DatePicker
                  onChange={this.handleTanggalAwalBerlakuChange}
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Nomor Peraturan</FormLabel>
                </div>
                <Input
                  id="nomor_peraturan"
                  onChange={this.handleInputChange}
                  value={this.state.nomor_peraturan}
                />
              </Col>
              <Col span={6}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Peraturan</FormLabel>
                </div>
                <DatePicker onChange={this.handleTanggalperaturanChange} />
              </Col>
            </Row>
          </div>

          <Header>{this.state.subtitle2}</Header>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
            <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jenis BKC</FormLabel>
                </div>
                <Select
                  id="jenis_bkc"
                  onChange={this.handleJenisBKCChange}
                  value={this.state.jenis_bkc}
                  style={{ width: "100%" }}
                >
                  {this.state.list_jenis_bkc.length > 0 &&
                    this.state.list_jenis_bkc.map((item, index) => (
                      <Select.Option key={`jenis-bkc-${index}`} value={item.jenis_bkc_code}>
                        {item.jenis_bkc_name}
                      </Select.Option>
                    ))}
                </Select>
              </Col>

              {this.state.jenis_bkc && (
                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Golongan</FormLabel>
                  </div>
                  <Select
                    id="golongan"
                    value={this.state.golongan}
                    onChange={this.handleJenisGolonganChange}
                    style={{ width: "100%" }}
                  >
                    {this.state.list_golongan.length > 0 &&
                      this.state.list_golongan.map((item, index) => (
                        <Select.Option key={`golongan-${index}`} value={item.golongan_code}>
                          {item.golongan_name}
                        </Select.Option>
                      ))}
                  </Select>
                </Col>
              )}

              {this.state.jenis_bkc === "HT" && (
                <>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Produksi</FormLabel>
                    </div>
                    <Select
                      id="jenis_produksi"
                      onChange={this.handleJenisProduksiChange}
                      value={this.state.jenis_produksi}
                      style={{ width: "100%" }}
                    >
                      {this.state.list_jenis_produksi.length > 0 &&
                        this.state.list_jenis_produksi.map((item, index) => (
                          <Select.Option
                            key={`jenis-produksi-${index}`}
                            value={item.jenis_produksi_code}
                          >
                            {item.jenis_produksi_name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis HPTL/REL</FormLabel>
                    </div>
                    <Select
                      id="jenis_hptl_rel"
                      value={this.state.jenis_hptl_rel}
                      onChange={this.handleJenisHPTLRELChange}
                      style={{ width: "100%" }}
                      disabled={
                        !(
                          this.state.jenis_produksi === "HTL" || this.state.jenis_produksi === "REL"
                        )
                      }
                    >
                      {this.state.list_jenis_hptl_rel.length > 0 &&
                        this.state.list_jenis_hptl_rel.map((item, index) => (
                          <Select.Option
                            key={`jenis_hptl_rel-${index}`}
                            value={item.jenis_hptl_rel_code}
                          >
                            {item.jenis_hptl_rel_name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input
                        id="tarif"
                        onChange={this.handleInputChange}
                        value={this.state.tarif}
                      />
                      <div>/</div>
                      <div>{this.state.satuan}</div>
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Batas Produksi</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input
                        id="batas_produksi1"
                        onChange={this.handleInputChange}
                        value={this.state.batas_produksi1}
                      />
                      <div>s.d</div>
                      <Input
                        id="batas_produksi2"
                        onChange={this.handleInputChange}
                        value={this.state.batas_produksi2}
                      />
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>HJE</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div>
                        <Input
                          id="hje1"
                          onChange={this.handleInputChange}
                          value={this.state.hje1}
                        />
                      </div>
                      <div>s.d</div>
                      <div>
                        <Input
                          id="hje2"
                          onChange={this.handleInputChange}
                          value={this.state.hje2}
                        />
                      </div>
                      <div>/</div>
                      <div>{this.state.satuan}</div>
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Layer</FormLabel>
                    </div>
                    <Input id="layer" onChange={this.handleInputChange} value={this.state.layer} />
                  </Col>
                </>
              )}

              {this.state.jenis_bkc === "MMEA" && (
                <>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Kadar Atas</FormLabel>
                    </div>
                    <Input
                      id="kadar_atas"
                      onChange={this.handleInputChange}
                      value={this.state.kadar_atas}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Kadar Bawah</FormLabel>
                    </div>
                    <Input
                      id="kadar_bawah"
                      onChange={this.handleInputChange}
                      value={this.state.kadar_bawah}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif Cukai Dalam Negeri</FormLabel>
                    </div>
                    <Input
                      id="tarif_cukai_dalam_negeri"
                      onChange={this.handleInputChange}
                      value={this.state.tarif_cukai_dalam_negeri}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif Cukai Impor</FormLabel>
                    </div>
                    <Input
                      id="tarif_cukai_impor"
                      onChange={this.handleInputChange}
                      value={this.state.tarif_cukai_impor}
                    />
                  </Col>
                </>
              )}
            </Row>

            <Row>
              <Col span={8} offset={8}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    {this.state.isEdit ? (
                      <Button type="primary" block onClick={this.handleUpdate}>
                        UBAH
                      </Button>
                    ) : (
                      <Button type="primary" block onClick={this.handleSave}>
                        SIMPAN
                      </Button>
                    )}
                  </Col>

                  <Col span={12}>
                    <Button type="danger" block>
                      RESET
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>

            {this.state.jenis_bkc && (
              <>
                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <Table
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    scroll={{ x: "max-content" }}
                  />
                </div>

                <Row>
                  <Col span={4} offset={20}>
                    <Button type="primary" block onClick={this.handleRekam}>
                      Rekam
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </div>
        </Container>
      </Fragment>
    );
  }
}
