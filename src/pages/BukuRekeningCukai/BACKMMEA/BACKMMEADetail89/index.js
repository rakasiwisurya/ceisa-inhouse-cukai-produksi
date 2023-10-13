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

export default class BACKMMEADetail89 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Detail Berita Acara Cukai (BACK)",
      subtitle2: "Rincian",

      isDetailLoading: true,

      nppbkc_id: null,
      nppbkc: null,
      nama_nppbkc: null,
      jenis_back: null,
      nomor_back: null,
      tanggal_back: null,

      merk_id: null,
      merk_name: null,
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
          title: "Merk",
          dataIndex: "merk_name",
          key: "merk_name",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("merk_name"),
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
    const payload = { idBackMmeaHeader: this.props.match.params.id };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/back-mmea/detail",
      params: payload,
      setLoading: (bool) => this.setState({ isDetailLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState({
        nppbkc_id: data.idNppbkc,
        nppbkc: data.nppbkc,
        nama_nppbkc: data.namaPerusahaan,
        jenis_back: data.jenisBackMmea,
        nomor_back: data.nomorBackMmea,
        tanggal_back: moment(data.tanggalBackMmea),
        dataSource: data.details.map((item, index) => ({
          key: `back-mmea-${index}`,
          back_mmea_detail_id: item.idBackMmeaDetail,
          merk_id: item.idMerk,
          merk_name: item.namaMerk,
          tarif: item.tarifSpesifik,
          isi: item.isiPerKemasan,
          kadar: item.kadarEa,
          jumlah_kemasan: item.jumlahKemasan,
          jumlah_lt: item.jumlah,
        })),
      });
    }
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

  render() {
    return (
      <>
        <Container
          menuName="Buku Rekening Cukai"
          contentName="BACK MMEA 8 & 9 Detail"
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
                      style={{ width: "100%" }}
                      disabled
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
                    <Input id="nomor_back" value={this.state.nomor_back} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal BACK</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_back"
                      format="DD-MM-YYYY"
                      value={this.state.tanggal_back}
                      style={{ width: "100%" }}
                      disabled
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
                      <Input id="merk_name" value={this.state.merk_name} disabled />
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif</FormLabel>
                    </div>
                    <InputNumber
                      id="tarif"
                      value={this.state.tarif}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Isi</FormLabel>
                    </div>
                    <InputNumber
                      id="isi"
                      value={this.state.isi}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Kadar</FormLabel>
                    </div>
                    <InputNumber
                      id="kadar"
                      value={this.state.kadar}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Kemasan</FormLabel>
                    </div>
                    <InputNumber
                      id="jumlah_kemasan"
                      value={this.state.jumlah_kemasan}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah (lt)</FormLabel>
                    </div>
                    <InputNumber
                      id="jumlah_lt"
                      value={this.state.jumlah_lt}
                      style={{ width: "100%" }}
                      disabled
                    />
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
                </Row>
              </div>
            </>
          )}
        </Container>
      </>
    );
  }
}
