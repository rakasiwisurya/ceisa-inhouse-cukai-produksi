import { Button, Col, DatePicker, Icon, Input, Row, Select, Table, notification } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import moment from "moment";
import React, { Component } from "react";
import ModalDaftarKota from "../ModalDaftarKota";
import ModalDaftarNPPBKC from "../ModalDaftarNppbkc";

export default class PenetapanKembali extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Pabrik / Importir",
      subtitle2: "Detail Merk",

      isPenetapanLoading: false,
      isJenisProduksiLoading: true,
      isDetailMerkLoading: true,
      isModalDaftarKotaVisible: false,
      isModalDaftarNppbkcVisible: false,

      kota_id: null,
      kota_name: null,
      tanggal_skep: null,
      nppbkc_id: null,
      nppbkc: null,
      nama_nppbkc: null,

      jenis_produksi_id: null,
      jenis_produksi_name: null,
      jenis_penetapan: "PENETAPAN KEMBALI",

      list_kota: [],
      list_jenis_produksi: [],

      searchTextTop: null,
      searchedColumnTop: null,
      pageTop: 1,

      searchTextBottom: null,
      searchedColumnBottom: null,
      pageBottom: 1,

      dataSourceTop: [],
      dataSourceBottom: [],

      selectedRowKeysTop: [],
      dataRowsTop: [],
      selectedRowKeysBottom: [],
      dataRowsBottom: [],

      columnTop: [
        {
          title: "Nama",
          dataIndex: "nama_merk",
          key: "nama_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("nama_merk"),
        },
        {
          title: "Jenis Produksi",
          dataIndex: "jenis_produksi_merk",
          key: "jenis_produksi_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("jenis_produksi_merk"),
        },
        {
          title: "Isi Kemasan",
          dataIndex: "isi_merk",
          key: "isi_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("isi_merk"),
        },
        {
          title: "Volume",
          dataIndex: "volume_merk",
          key: "volume_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("volume_merk"),
        },
        {
          title: "Nomor Kep",
          dataIndex: "nomor_kep_merk",
          key: "nomor_kep_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("nomor_kep_merk"),
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
          ...this.getColumnSearchPropsTop("tanggal_kep_merk"),
        },
        {
          title: "Golongan Pabrik",
          dataIndex: "golongan_merk",
          key: "golongan_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("golongan_merk"),
        },
        {
          title: "HJE Lama",
          dataIndex: "hje_lama_merk",
          key: "hje_lama_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("hje_lama_merk"),
        },
        {
          title: "HJE Baru",
          dataIndex: "hje_baru_merk",
          key: "hje_baru_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("hje_baru_merk"),
        },
        {
          title: "HJE/Satuan Lama",
          dataIndex: "hje_satuan_lama_merk",
          key: "hje_satuan_lama_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("hje_satuan_lama_merk"),
        },
        {
          title: "HJE/Satuan Baru",
          dataIndex: "hje_satuan_baru_merk",
          key: "hje_satuan_baru_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("hje_satuan_baru_merk"),
        },
        {
          title: "Tarif Lama",
          dataIndex: "tarif_lama",
          key: "tarif_lama",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("tarif_lama"),
        },
        {
          title: "Tarif Baru",
          dataIndex: "tarif_baru",
          key: "tarif_baru",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("tarif_baru"),
        },
        {
          title: "Seri Pita",
          dataIndex: "seri_pita",
          key: "seri_pita",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("seri_pita"),
        },
        {
          title: "Warna Dasar",
          dataIndex: "warna_dasar",
          key: "warna_dasar",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsTop("warna_dasar"),
        },
      ],
      columnBottom: [
        {
          title: "Nama",
          dataIndex: "nama_merk",
          key: "nama_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("nama_merk"),
        },
        {
          title: "Jenis Produksi",
          dataIndex: "jenis_produksi_merk",
          key: "jenis_produksi_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("jenis_produksi_merk"),
        },
        {
          title: "Isi Kemasan",
          dataIndex: "isi_merk",
          key: "isi_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("isi_merk"),
        },
        {
          title: "Volume",
          dataIndex: "volume_merk",
          key: "volume_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("volume_merk"),
        },
        {
          title: "Nomor Kep",
          dataIndex: "nomor_kep_merk",
          key: "nomor_kep_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("nomor_kep_merk"),
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
          ...this.getColumnSearchPropsBottom("tanggal_kep_merk"),
        },
        {
          title: "Golongan Pabrik",
          dataIndex: "golongan_merk",
          key: "golongan_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("golongan_merk"),
        },
        {
          title: "HJE Lama",
          dataIndex: "hje_lama_merk",
          key: "hje_lama_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("hje_lama_merk"),
        },
        {
          title: "HJE Baru",
          dataIndex: "hje_baru_merk",
          key: "hje_baru_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("hje_baru_merk"),
        },
        {
          title: "HJE/Satuan Lama",
          dataIndex: "hje_satuan_lama_merk",
          key: "hje_satuan_lama_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("hje_satuan_lama_merk"),
        },
        {
          title: "HJE/Satuan Baru",
          dataIndex: "hje_satuan_baru_merk",
          key: "hje_satuan_baru_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("hje_satuan_baru_merk"),
        },
        {
          title: "Tarif Lama",
          dataIndex: "tarif_lama",
          key: "tarif_lama",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("tarif_lama"),
        },
        {
          title: "Tarif Baru",
          dataIndex: "tarif_baru",
          key: "tarif_baru",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("tarif_baru"),
        },
        {
          title: "Seri Pita",
          dataIndex: "seri_pita",
          key: "seri_pita",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("seri_pita"),
        },
        {
          title: "Warna Dasar",
          dataIndex: "warna_dasar",
          key: "warna_dasar",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchPropsBottom("warna_dasar"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getDetailMerk();
  }

  getDetailMerk = async () => {
    this.setState({ isDetailMerkLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        dataSourceTop: [
          {
            key: "1",
            id: "1",
            nama_merk: "nama_merk_1",
            jenis_produksi_merk: "jenis_produksi_merk_1",
            isi_merk: "isi_merk_1",
            volume_merk: "volume_merk_1",
            nomor_kep_merk: "nomor_kep_merk_1",
            tanggal_kep_merk: "tanggal_kep_merk_1",
            golongan_merk: "golongan_merk_1",
            hje_lama_merk: "hje_lama_merk_1",
            hje_baru_merk: "hje_baru_merk_1",
            hje_satuan_lama_merk: "hje_satuan_lama_merk_1",
            hje_satuan_baru_merk: "hje_satuan_baru_merk_1",
            tarif_lama: "tarif_lama_1",
            tarif_baru: "tarif_baru_1",
            seri_pita: "seri_pita_1",
            warna_dasar: "warna_dasar_1",
          },
          {
            key: "2",
            id: "2",
            nama_merk: "nama_merk_2",
            jenis_produksi_merk: "jenis_produksi_merk_2",
            isi_merk: "isi_merk_2",
            volume_merk: "volume_merk_2",
            nomor_kep_merk: "nomor_kep_merk_2",
            tanggal_kep_merk: "tanggal_kep_merk_2",
            golongan_merk: "golongan_merk_2",
            hje_lama_merk: "hje_lama_merk_2",
            hje_baru_merk: "hje_baru_merk_2",
            hje_satuan_lama_merk: "hje_satuan_lama_merk_2",
            hje_satuan_baru_merk: "hje_satuan_baru_merk_2",
            tarif_lama: "tarif_lama_2",
            tarif_baru: "tarif_baru_2",
            seri_pita: "seri_pita_2",
            warna_dasar: "warna_dasar_2",
          },
        ],
      });
      this.setState({ isDetailMerkLoading: false });
      clearTimeout(timeout);
    }, 2000);
  };

  getColumnSearchPropsTop = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleColumnSearchTop(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleColumnSearchTop(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleColumnResetTop(clearFilters)}
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
  handleColumnSearchTop = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchTextTop: selectedKeys[0],
      searchedColumnTop: dataIndex,
    });
  };
  handleColumnResetTop = (clearFilters) => {
    clearFilters();
    this.setState({ searchTextTop: "" });
  };
  handleSelectRowTopChange = (selectedRowKeys) => {
    const dataRowsTop = this.state.dataSourceTop.filter((item) =>
      selectedRowKeys.includes(item.key)
    );
    this.setState({ selectedRowKeysTop: selectedRowKeys, dataRowsTop });
  };

  getColumnSearchPropsBottom = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleColumnSearchBottom(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleColumnSearchBottom(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleColumnResetBottom(clearFilters)}
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
  handleColumnSearchBottom = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchTextBottom: selectedKeys[0],
      searchedColumnBottom: dataIndex,
    });
  };
  handleColumnResetBottom = (clearFilters) => {
    clearFilters();
    this.setState({ searchTextBottom: "" });
  };
  handleSelectRowBottomChange = (selectedRowKeys) => {
    const dataRowsBottom = this.state.dataSourceBottom.filter((item) =>
      selectedRowKeys.includes(item.key)
    );
    this.setState({ selectedRowKeysBottom: selectedRowKeys, dataRowsBottom });
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

  handleToTableTop = () => {
    const resultDataSourceBottom = this.state.dataSourceBottom.filter(
      (itemBottom) =>
        !this.state.dataRowsBottom.some((rowBottom) => rowBottom.key === itemBottom.key)
    );
    const resultDataSourceTop = [...this.state.dataSourceTop, ...this.state.dataRowsBottom];
    this.setState({
      dataSourceTop: resultDataSourceTop,
      dataSourceBottom: resultDataSourceBottom,
      selectedRowKeysBottom: [],
      dataRowsBottom: [],
    });
  };
  handleToTableBottom = () => {
    const resultDataSourceTop = this.state.dataSourceTop.filter(
      (itemTop) => !this.state.dataRowsTop.some((rowTop) => rowTop.key === itemTop.key)
    );
    const resultDataSourceBottom = [...this.state.dataSourceBottom, ...this.state.dataRowsTop];
    this.setState({
      dataSourceBottom: resultDataSourceBottom,
      dataSourceTop: resultDataSourceTop,
      selectedRowKeysTop: [],
      dataRowsTop: [],
    });
  };

  handlePenetapan = async () => {
    this.setState({ isPenetapanLoading: true });
    const timeout = setTimeout(() => {
      this.setState({ isPenetapanLoading: false });
      notification.success({ message: "Success", description: "Success" });
      clearTimeout(timeout);
    }, 2000);
  };

  render() {
    return (
      <>
        <Container menuName="Tarif Cukai" contentName="Penetapan Kembali" hideContentHeader>
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
            </Row>

            <div style={{ marginTop: 30, marginBottom: 20 }}>
              <Table
                dataSource={this.state.dataSourceTop}
                columns={this.state.columnTop}
                scroll={{ x: "max-content" }}
                loading={this.state.isDetailMerkLoading}
                onChange={(page) => this.setState({ pageTop: page.current })}
                pagination={{ current: this.state.pageTop }}
                rowSelection={{
                  selectedRowKeys: this.state.selectedRowKeysTop,
                  onChange: this.handleSelectRowTopChange,
                }}
              />
            </div>

            <Row gutter={[16, 16]}>
              <Col span={4} offset={10}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <ButtonCustom
                      variant="danger"
                      onClick={this.handleToTableTop}
                      icon="arrow-up"
                      block
                      disabled={
                        !this.state.dataSourceBottom.length > 0 ||
                        !this.state.selectedRowKeysBottom.length > 0
                      }
                    />
                  </Col>
                  <Col span={12}>
                    <ButtonCustom
                      variant="success"
                      onClick={this.handleToTableBottom}
                      icon="arrow-down"
                      block
                      disabled={
                        !this.state.dataSourceTop.length > 0 ||
                        !this.state.selectedRowKeysTop.length > 0
                      }
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <div style={{ marginTop: 30, marginBottom: 20 }}>
              <Table
                dataSource={this.state.dataSourceBottom}
                columns={this.state.columnBottom}
                loading={this.state.isDetailMerkLoading}
                scroll={{ x: "max-content" }}
                onChange={(page) => this.setState({ pageBottom: page.current })}
                pagination={{ current: this.state.pageBottom }}
                rowSelection={{
                  selectedRowKeys: this.state.selectedRowKeysBottom,
                  onChange: this.handleSelectRowBottomChange,
                }}
              />
            </div>

            <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
              <Col span={4}>
                <ButtonCustom variant="secondary" onClick={() => this.props.history.goBack()} block>
                  Kembali
                </ButtonCustom>
              </Col>

              <Col span={5}>
                <Button
                  type="primary"
                  loading={this.state.isPenetapanLoading}
                  onClick={this.handlePenetapan}
                  block
                >
                  Simpan Penetapan
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
