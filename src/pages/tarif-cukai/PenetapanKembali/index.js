import { Button, Col, DatePicker, Icon, Input, Row, Select, Table, notification } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";
import { pathName } from "configs/constants";
import ModalDaftarNPPBKC from "../ModalDaftarNppbkc";
import ModalDaftarKota from "../ModalDaftarKota";
import moment from "moment";

export default class PenetapanKembali extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pabrik / Importir",
      subtitle2: "Detail Merk",

      isRekamLoading: false,
      isKotaLoading: true,
      isJenisProduksiLoading: true,
      isModalDaftarKotaVisible: false,
      isModalDaftarNppbkcVisible: false,

      kota_id: "",
      kota_name: "",
      tanggal_skep: null,
      nppbkc_id: "",
      nppbkc: "",
      nama_nppbkc: "",

      jenis_produksi_id: "",
      jenis_produksi_name: "",
      jenis_penetapan_id: "",
      jenis_penetapan_name: "",

      list_kota: [],
      list_jenis_penetapan: [],
      list_jenis_produksi: [],

      searchText: "",
      searchedColumn: "",
      page: 1,

      dataSource: [],
      columns: [
        {
          title: "Aksi",
          dataIndex: "aksi",
          key: "aksi",
          fixed: "left",
          render: (text, record, index) => (
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <ButtonCustom
                variant="warning"
                icon="form"
                onClick={() => this.handleEditRincian(record, index)}
              />
              <Button type="danger" icon="close" onClick={() => this.handleDeleteRincian(index)} />
            </div>
          ),
        },
        {
          title: "Nama",
          dataIndex: "nama_merk",
          key: "nama_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nama_merk"),
        },
        {
          title: "Jenis Produksi",
          dataIndex: "jenis_produksi_merk",
          key: "jenis_produksi_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("jenis_produksi_merk"),
        },
        {
          title: "Isi Kemasan",
          dataIndex: "isi_merk",
          key: "isi_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("isi_merk"),
        },
        {
          title: "Volume",
          dataIndex: "volume_merk",
          key: "volume_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("volume_merk"),
        },
        {
          title: "Nomor Kep",
          dataIndex: "nomor_kep_merk",
          key: "nomor_kep_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nomor_kep_merk"),
        },
        {
          title: "Tanggal Kep",
          dataIndex: "tanggal_kep_merk",
          key: "tanggal_kep_merk",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text ? moment(text).format("DD-MM-YYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggal_kep_merk"),
        },
        {
          title: "Golongan Pabrik",
          dataIndex: "golongan_merk",
          key: "golongan_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("golongan_merk"),
        },
        {
          title: "HJE Lama",
          dataIndex: "hje_lama_merk",
          key: "hje_lama_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("hje_lama_merk"),
        },
        {
          title: "HJE Baru",
          dataIndex: "hje_baru_merk",
          key: "hje_baru_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("hje_baru_merk"),
        },
        {
          title: "HJE/Satuan Lama",
          dataIndex: "hje_satuan_lama_merk",
          key: "hje_satuan_lama_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("hje_satuan_lama_merk"),
        },
        {
          title: "HJE/Satuan Baru",
          dataIndex: "hje_satuan_baru_merk",
          key: "hje_satuan_baru_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("hje_satuan_baru_merk"),
        },
        {
          title: "Tarif Lama",
          dataIndex: "tarif_lama",
          key: "tarif_lama",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("tarif_lama"),
        },
        {
          title: "Tarif Baru",
          dataIndex: "tarif_baru",
          key: "tarif_baru",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("tarif_baru"),
        },
        {
          title: "Seri Pita",
          dataIndex: "seri_pita",
          key: "seri_pita",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("seri_pita"),
        },
        {
          title: "Warna Dasar",
          dataIndex: "warna_dasar",
          key: "warna_dasar",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("warna_dasar"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getJenisProduksi();
  }

  getJenisProduksi = async () => {
    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/jenis-produksi",
      params: { idJenisBkc: 3 },
      setLoading: (bool) => this.setState({ isJenisProduksiLoading: bool }),
    });

    if (response) this.setState({ list_jenis_produksi: response.data.data });
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
    this.setState({ searchText: "" });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleInputNumberChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleDatepickerChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleSelectChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleSelectCustomChange = (field, value, option) => {
    this.setState({
      [`${field}_id`]: value,
      [`${field}_name`]: option.props.children,
    });
  };
  handleModalShow = (visibleState) => {
    this.setState({ [visibleState]: true });
  };
  handleModalClose = (visibleState) => {
    this.setState({ [visibleState]: false });
  };

  handleDataKota = (record) => {
    this.setState({
      kota_id: record.kota_id,
      kota_name: record.kota_name,
    });
    this.handleModalClose("isModalDaftarKotaVisible");
  };
  handleDataNppbkc = (record) => {
    this.setState({
      nppbkc_id: record.nppbkc_id,
      nppbkc: record.nppbkc,
      nama_nppbkc: record.nama_nppbkc,
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };

  validationForm = () => {
    return true;
  };

  handleRekam = async () => {
    this.setState({ isRekamLoading: true });
    const timeout = setTimeout(() => {
      this.setState({ isRekamLoading: false });
      notification.success({ message: "Success", description: "Success" });
      this.props.history.push(`${pathName}/rekam-jenis-pita`);
      clearTimeout(timeout);
    }, 2000);
  };

  render() {
    return (
      <>
        <Container menuName="Rekam Jenis Pita" contentName="Rekam" hideContentHeader>
          <Header>{this.state.subtitle1}</Header>
          <div
            className="kt-content  kt-grid__item kt-grid__item--fluid"
            id="kt_content"
            style={{ paddingBottom: 10 }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Lokasi Penetapan</FormLabel>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Input id="kota_name" value={this.state.kota_name} disabled />
                  <Button
                    type="default"
                    icon="menu"
                    onClick={() => this.handleModalShow("isModalDaftarKotaVisible")}
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Tanggal SKEP</FormLabel>
                  </div>
                  <DatePicker
                    id="tanggal_skep"
                    format="DD-MM-YYYY"
                    value={this.state.tanggal_skep}
                    onChange={(date) => this.handleDatepickerChange("tanggal_skep", date)}
                    style={{ width: "100%" }}
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>NPPBKC</FormLabel>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Input id="nppbkc" value={this.state.nppbkc} disabled />
                  <Button
                    type="primary"
                    onClick={() => this.handleModalShow("isModalDaftarNppbkcVisible")}
                  >
                    Cari
                  </Button>
                  <Input id="nama_perusahaan" value={this.state.nama_nppbkc} disabled />
                </div>
              </Col>
            </Row>
          </div>

          <Header>{this.state.subtitle2}</Header>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Jenis Produksi</FormLabel>
                  </div>
                  <Select
                    id="jenis_produksi"
                    value={this.state.jenis_produksi_id}
                    loading={this.state.isJenisProduksiLoading}
                    onChange={(value, option) =>
                      this.handleSelectCustomChange("jenis_produksi", value, option)
                    }
                    style={{ width: "100%" }}
                  >
                    {this.state.list_jenis_produksi.length > 0 &&
                      this.state.list_jenis_produksi.map((item, index) => (
                        <Select.Option key={`jenis-produksi-${index}`} value={item.idJenisProduksi}>
                          {item.namaJenisProduksi}
                        </Select.Option>
                      ))}
                  </Select>
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Jenis Penetapan</FormLabel>
                  </div>
                  <Select
                    id="jenis_penetapan"
                    value={this.state.jenis_penetapan_id}
                    onChange={(value, option) =>
                      this.handleSelectCustomChange("jenis_penetapan", value, option)
                    }
                    style={{ width: "100%" }}
                  >
                    {this.state.list_jenis_penetapan.length > 0 &&
                      this.state.list_jenis_penetapan.map((item, index) => (
                        <Select.Option
                          key={`jenis-penetapan-${index}`}
                          value={item.jenis_penetapan_id}
                        >
                          {item.jenis_penetapan_name}
                        </Select.Option>
                      ))}
                  </Select>
                </div>
              </Col>
            </Row>

            <div style={{ marginTop: 30, marginBottom: 20 }}>
              <Table
                dataSource={this.state.dataSource}
                columns={this.state.columns}
                scroll={{ x: "max-content" }}
                onChange={(page) => this.setState({ page: page.current })}
                pagination={{ current: this.state.page }}
              />
            </div>

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
                  disabled={!this.validationForm()}
                  block
                >
                  Rekam
                </Button>
              </Col>
            </Row>
          </div>
        </Container>

        <ModalDaftarKota
          isVisible={this.state.isModalDaftarKotaVisible}
          onCancel={() => this.handleModalClose("isModalDaftarKotaVisible")}
          onDataDoubleClick={this.handleDataKota}
        />

        <ModalDaftarNPPBKC
          isVisible={this.state.isModalDaftarNppbkcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarNppbkcVisible")}
          onDataDoubleClick={this.handleDataNppbkc}
        />
      </>
    );
  }
}
