import {
  Button,
  Card,
  Col,
  DatePicker,
  Icon,
  Input,
  Modal,
  Row,
  Select,
  Skeleton,
  Table,
} from "antd";
import FormLabel from "components/FormLabel";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";
import { sumArrayOfObject } from "utils/sumArrayOfObject";

export default class ModalBACKEADetail89 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Detail Berita Acara Cukai (BACK)",
      subtitle2: "Rincian",

      isDetailLoading: true,

      idNppbkc: null,
      nppbkc: null,
      namaNppbkc: null,
      jenisBack: null,
      nomorBack: null,
      tanggalBack: null,

      jenisBarangKenaCukaiRusak: null,
      jumlahBarangKenaCukaiRusak: null,
      catatan: null,

      searchText: null,
      searchedColumn: null,
      page: 1,

      listJenisBack: [
        {
          idJenisBack: "BACK-8",
          namaJenisBack: "BACK-8",
        },
        {
          idJenisBack: "BACK-9",
          namaJenisBack: "BACK-9",
        },
      ],

      dataSource: [],
      columns: [
        {
          title: "Barang Kena Cukai Yang Rusak",
          children: [
            {
              title: "Jenis",
              dataIndex: "jenisBarangKenaCukaiRusak",
              key: "jenisBarangKenaCukaiRusak",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jenisBarangKenaCukaiRusak"),
            },
            {
              title: "Jumlah (lt)",
              dataIndex: "jumlahBarangKenaCukaiRusak",
              key: "jumlahBarangKenaCukaiRusak",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jumlahBarangKenaCukaiRusak"),
            },
          ],
        },
        {
          title: "Keterangan",
          dataIndex: "catatan",
          key: "catatan",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("catatan"),
        },
      ],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id && this.props.id) {
      this.getDetailBack89();
    }
  }

  getDetailBack89 = async () => {
    const payload = { idBackEaHeader: this.props.id };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/back-ea-8-9/detail",
      params: payload,
      setLoading: (bool) => this.setState({ isDetailLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState({
        idNppbkc: data.idNppbkc,
        nppbkc: data.nppbkc,
        namaNppbkc: data.namaPerusahaan,
        jenisBack: data.jenisBackEa,
        nomorBack: data.nomorBackEa,
        tanggalBack: moment(data.tanggalBackEa),

        dataSource: data.details.map((detail, index) => ({
          key: `back-ea-8-9-${index}`,
          idBackEaDetail: detail.idBackEaDetail,
          jenisBarangKenaCukaiRusak: detail.jenisBkc,
          jumlahBarangKenaCukaiRusak: detail.jumlah,
          catatan: detail.keterangan,
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
      <Modal
        title="BACK EA 8 & 9 Detail"
        width="70%"
        visible={this.props.isVisible}
        onCancel={this.props.onCancel}
        footer={null}
        centered
        style={{ top: 20 }}
      >
        {this.state.isDetailLoading ? (
          <Skeleton active avatar paragraph={{ rows: 10 }} />
        ) : (
          <>
            <Card title={this.state.subtitle1}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>NPPBKC</FormLabel>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Input id="nppbkc" value={this.state.nppbkc} disabled />
                    <Input id="namaPerusahaan" value={this.state.namaNppbkc} disabled />
                  </div>
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Jenis BACK</FormLabel>
                  </div>
                  <Select
                    id="jenisBack"
                    value={this.state.jenisBack}
                    style={{ width: "100%" }}
                    disabled
                  >
                    {this.state.listJenisBack.length > 0 &&
                      this.state.listJenisBack.map((item, index) => (
                        <Select.Option key={`jenis-back-${index}`} value={item.idJenisBack}>
                          {item.namaJenisBack}
                        </Select.Option>
                      ))}
                  </Select>
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Nomor BACK</FormLabel>
                  </div>
                  <Input id="nomorBack" value={this.state.nomorBack} disabled />
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Tanggal BACK</FormLabel>
                  </div>
                  <DatePicker
                    id="tanggalBack"
                    format="DD-MM-YYYY"
                    value={this.state.tanggalBack}
                    style={{ width: "100%" }}
                    disabled
                  />
                </Col>
              </Row>
            </Card>

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
                        key: "totalBarangKenaCukaiRusak",
                        title: "Total Barang Kena Cukai Rusak",
                        dataIndex: "totalBarangKenaCukaiRusak",
                        width: 120,
                        fixed: "right",
                        render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                      },
                    ]}
                    dataSource={[
                      {
                        key: "1",
                        title: "Total",
                        totalBarangKenaCukaiRusak: sumArrayOfObject(
                          this.state.dataSource,
                          "jumlahBarangKenaCukaiRusak"
                        ),
                      },
                    ]}
                  />
                )}
              />
            </div>
          </>
        )}
      </Modal>
    );
  }
}
