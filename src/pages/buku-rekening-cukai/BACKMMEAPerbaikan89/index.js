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
import { pathName } from "configs/constants";
import React, { Component } from "react";
import { sumArrayOfObject } from "utils/sumArrayOfObject";
import ModalDaftarNPPBKC from "../ModalDaftarNPPBKC";
import moment from "moment";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";

export default class BACKMMEAPerbaikan89 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Perbaikan Berita Acara Cukai (BACK)",
      subtitle2: "Rincian",

      isEditRincian: false,
      editIndexRincian: null,

      isDetailLoading: true,
      isUpdateLoading: false,
      isModalDaftarNppbkcVisible: false,

      nppbkc_id: null,
      nppbkc: null,
      nama_nppbkc: null,
      jenis_back: null,
      nomor_back: null,
      tanggal_back: null,

      merk: null,
      jenis_mmea: null,
      tarif: null,
      isi: null,
      kadar: null,
      jumlah_kemasan: null,
      jumlah_lt: null,

      searchText: null,
      searchedColumn: null,
      page: 1,

      list_jenis_back: [
        {
          jenis_back_id: "BACK-8",
          jenis_back_name: "BACK-8",
        },
        {
          jenis_back_id: "BACK-9",
          jenis_back_name: "BACK-9",
        },
      ],

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
          title: "Merk",
          dataIndex: "merk",
          key: "merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("merk"),
        },
        {
          title: "Jenis MMEA",
          dataIndex: "jenis_mmea",
          key: "jenis_mmea",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("jenis_mmea"),
        },
        {
          title: "Kadar",
          dataIndex: "kadar",
          key: "kadar",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("kadar"),
        },
        {
          title: "Tarif",
          dataIndex: "tarif",
          key: "tarif",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("tarif"),
        },
        {
          title: "Isi",
          dataIndex: "isi",
          key: "isi",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("isi"),
        },
        {
          title: "Jumlah Kemasan",
          dataIndex: "jumlah_kemasan",
          key: "jumlah_kemasan",
          fixed: "right",
          width: 120,
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("jumlah_kemasan"),
        },
        {
          title: "Jumlah Liter",
          dataIndex: "jumlah_lt",
          key: "jumlah_lt",
          fixed: "right",
          width: 120,
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("jumlah_lt"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getDetailBackMmea();
  }

  getDetailBackMmea = async () => {
    this.setState({ isDetailLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        nppbkc_id: "nppbkc_id",
        nppbkc: "nppbkc",
        nama_nppbkc: "nama_nppbkc",
        jenis_back: "BACK-8",
        nomor_back: "nomor_back",
        tanggal_back: moment(new Date()),

        dataSource: [
          {
            key: "1",
            merk: "merk1",
            jenis_mmea: "jenis_mmea1",
            tarif: 100,
            isi: 200,
            kadar: 300,
            jumlah_kemasan: 400,
            jumlah_lt: 500,
          },
          {
            key: "2",
            merk: "merk2",
            jenis_mmea: "jenis_mmea2",
            tarif: 500,
            isi: 400,
            kadar: 300,
            jumlah_kemasan: 200,
            jumlah_lt: 100,
          },
        ],
      });
      this.setState({ isDetailLoading: false });
      clearTimeout(timeout);
    }, 2000);
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

  handleSimpanRincian = () => {
    const { merk, jenis_mmea, tarif, isi, kadar, jumlah_kemasan, jumlah_lt } = this.state;

    this.setState({
      dataSource: [
        ...this.state.dataSource,
        {
          key: new Date().getTime(),
          merk,
          jenis_mmea,
          tarif,
          isi,
          kadar,
          jumlah_kemasan,
          jumlah_lt,
        },
      ],
    });

    this.setState({
      merk: null,
      jenis_mmea: null,
      tarif: null,
      isi: null,
      kadar: null,
      jumlah_kemasan: null,
      jumlah_lt: null,
    });
  };
  handleEditRincian = (record, index) => {
    this.setState({
      isEditRincian: true,
      editIndexRincian: index,

      merk: record.merk,
      jenis_mmea: record.jenis_mmea,
      tarif: record.tarif,
      isi: record.isi,
      kadar: record.kadar,
      jumlah_kemasan: record.jumlah_kemasan,
      jumlah_lt: record.jumlah_lt,
    });
  };
  handleUbahRincian = () => {
    const { merk, jenis_mmea, tarif, isi, kadar, jumlah_kemasan, jumlah_lt } = this.state;

    const newDataSource = this.state.dataSource.map((item) => item);
    newDataSource.splice(this.state.editIndexRincian, 1, {
      key: new Date().getTime(),
      merk,
      jenis_mmea,
      tarif,
      isi,
      kadar,
      jumlah_kemasan,
      jumlah_lt,
    });

    this.setState({
      isEditRincian: false,
      editIndexRincian: null,

      merk: null,
      jenis_mmea: null,
      tarif: null,
      isi: null,
      kadar: null,
      jumlah_kemasan: null,
      jumlah_lt: null,

      dataSource: newDataSource,
    });
  };
  handleDeleteRincian = (index) => {
    const newDataSource = this.state.dataSource.map((item) => item);
    newDataSource.splice(index, 1);
    this.setState({ dataSource: newDataSource });
  };
  handleBatalEditRincian = () => {
    this.setState({
      isEditRincian: false,
      editIndexRincian: null,

      merk: null,
      jenis_mmea: null,
      tarif: null,
      isi: null,
      kadar: null,
      jumlah_kemasan: null,
      jumlah_lt: null,
    });
  };
  handleReset = () => {
    this.setState({
      nppbkc_id: null,
      nppbkc: null,
      nama_nppbkc: null,
      jenis_back: null,
      nomor_back: null,
      tanggal_back: null,

      merk: null,
      jenis_mmea: null,
      tarif: null,
      isi: null,
      kadar: null,
      jumlah_kemasan: null,
      jumlah_lt: null,

      dataSource: [],
    });
  };
  handleUpdate = async () => {
    this.setState({ isUpdateLoading: true });
    const timeout = setTimeout(() => {
      notification.success({ message: "Success", description: "Success" });
      this.props.history.push(`${pathName}/back-mmea`);
      this.setState({ isUpdateLoading: false });
      clearTimeout(timeout);
    }, 2000);
  };

  render() {
    return (
      <>
        <Container
          menuName="Buku Rekening Cukai"
          contentName="BACK MMEA 8 & 9 Perbaikan"
          hideContentHeader
        >
          {this.state.isDetailLoading ? (
            <LoadingWrapperSkeleton />
          ) : (
            <>
              <Header>{this.state.subtitle1}</Header>
              <div
                className="kt-content  kt-grid__item kt-grid__item--fluid"
                id="kt_content"
                style={{ paddingBottom: 10 }}
              >
                <Row gutter={[16, 16]}>
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

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis BACK</FormLabel>
                    </div>
                    <Select
                      id="jenis_back"
                      value={this.state.jenis_back}
                      onChange={(value) => this.handleSelectChange("jenis_back", value)}
                      style={{ width: "100%" }}
                    >
                      {this.state.list_jenis_back.length > 0 &&
                        this.state.list_jenis_back.map((item, index) => (
                          <Select.Option key={`jenis-back-${index}`} value={item.jenis_back_id}>
                            {item.jenis_back_name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor BACK</FormLabel>
                    </div>
                    <Input
                      id="nomor_back"
                      value={this.state.nomor_back}
                      onChange={this.handleInputChange}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal BACK</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_back"
                      format="DD-MM-YYYY"
                      value={this.state.tanggal_back}
                      onChange={(date) => this.handleDatepickerChange("tanggal_back", date)}
                      style={{ width: "100%" }}
                    />
                  </Col>
                </Row>
              </div>

              <Header>{this.state.subtitle2}</Header>
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Merk</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Input id="merk" value={this.state.merk} onChange={this.handleInputChange} />
                      <Button type="primary">Cari</Button>
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis</FormLabel>
                    </div>
                    <Input
                      id="jenis_mmea"
                      value={this.state.jenis_mmea}
                      onChange={this.handleInputChange}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif</FormLabel>
                    </div>
                    <InputNumber
                      id="tarif"
                      value={this.state.tarif}
                      onChange={(value) => this.handleInputNumberChange("tarif", value)}
                      style={{ width: "100%" }}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Isi</FormLabel>
                    </div>
                    <InputNumber
                      id="isi"
                      value={this.state.isi}
                      onChange={(value) => this.handleInputNumberChange("isi", value)}
                      style={{ width: "100%" }}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Kadar</FormLabel>
                    </div>
                    <InputNumber
                      id="kadar"
                      value={this.state.kadar}
                      onChange={(value) => this.handleInputNumberChange("kadar", value)}
                      style={{ width: "100%" }}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Kemasan</FormLabel>
                    </div>
                    <InputNumber
                      id="jumlah_kemasan"
                      value={this.state.jumlah_kemasan}
                      onChange={(value) => this.handleInputNumberChange("jumlah_kemasan", value)}
                      style={{ width: "100%" }}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah (lt)</FormLabel>
                    </div>
                    <InputNumber
                      id="jumlah_lt"
                      value={this.state.jumlah_lt}
                      onChange={(value) => this.handleInputNumberChange("jumlah_lt", value)}
                      style={{ width: "100%" }}
                    />
                  </Col>
                </Row>

                <Row style={{ marginTop: 20 }}>
                  <Col span={8} offset={8}>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        {this.state.isEditRincian ? (
                          <ButtonCustom variant="warning" block onClick={this.handleUbahRincian}>
                            Ubah
                          </ButtonCustom>
                        ) : (
                          <Button type="primary" block onClick={this.handleSimpanRincian}>
                            Simpan
                          </Button>
                        )}
                      </Col>

                      <Col span={12}>
                        {this.state.isEditRincian ? (
                          <Button type="danger" block onClick={this.handleBatalEditRincian}>
                            Batal
                          </Button>
                        ) : (
                          <Button type="danger" block onClick={this.handleReset}>
                            Reset
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <Table
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    scroll={{ x: "max-content" }}
                    onChange={(page) => this.setState({ page: page.current })}
                    pagination={{ current: this.state.page }}
                    footer={() => (
                      <Table
                        style={{ margin: -16 }}
                        showHeader={false}
                        pagination={false}
                        columns={[
                          {
                            key: "title",
                            title: "Title",
                            dataIndex: "title",
                          },
                          {
                            key: "total_kemasan",
                            title: "Total Kemasan",
                            dataIndex: "total_kemasan",
                            width: 120,
                            fixed: "right",
                            render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                          },
                          {
                            key: "total_lt",
                            title: "Total Liter",
                            dataIndex: "total_lt",
                            width: 120,
                            fixed: "right",
                            render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                          },
                        ]}
                        dataSource={[
                          {
                            key: "1",
                            title: "Total",
                            total_kemasan: sumArrayOfObject(
                              this.state.dataSource,
                              "jumlah_kemasan"
                            ),
                            total_lt: sumArrayOfObject(this.state.dataSource, "jumlah_lt"),
                          },
                        ]}
                      />
                    )}
                  />
                </div>

                <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
                  <Col span={4}>
                    <ButtonCustom
                      variant="secondary"
                      onClick={() => this.props.history.goBack()}
                      block
                    >
                      Kembali
                    </ButtonCustom>
                  </Col>

                  <Col span={4}>
                    <Button
                      type="primary"
                      loading={this.state.isUpdateLoading}
                      onClick={this.handleUpdate}
                      block
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </div>
            </>
          )}
        </Container>

        <ModalDaftarNPPBKC
          isVisible={this.state.isModalDaftarNppbkcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarNppbkcVisible")}
          onDataDoubleClick={this.handleDataNppbkc}
        />
      </>
    );
  }
}
