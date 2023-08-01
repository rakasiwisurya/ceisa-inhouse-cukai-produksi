import { Button, Col, DatePicker, Icon, Input, InputNumber, Row, Select, Table } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import React, { Component } from "react";
import moment from "moment";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";

export default class BACKEADetail67 extends Component {
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

      jumlah_ea_yang_akan_dicampur: null,
      jumlah_bahan_pencampur: null,
      satuan: null,
      jenis_bahan: null,
      jumlah_setelah_dicampur: null,
      hasil_akhir: null,

      searchText: null,
      searchedColumn: null,
      page: 1,

      list_jenis_back: [
        {
          jenis_back_id: "BACK-6",
          jenis_back_name: "BACK-6",
        },
        {
          jenis_back_id: "BACK-7",
          jenis_back_name: "BACK-7",
        },
      ],
      list_satuan: [
        {
          satuan_id: "LT",
          satuan_name: "lt",
        },
        {
          satuan_id: "GR",
          satuan_name: "gr",
        },
        {
          satuan_id: "CC",
          satuan_name: "cc",
        },
      ],
      list_jenis_bahan: [
        {
          jenis_bahan_id: "BIRTEX-SDA BIT 6",
          jenis_bahan_name: "Birtex",
        },
        {
          jenis_bahan_id: "ISOPROPIL ALCOHOL-SDA IPA 5",
          jenis_bahan_name: "Isopropil Alcohol",
        },
        {
          jenis_bahan_id: "ETIL ACETAT-SDA EAC 2",
          jenis_bahan_name: "Etil Acetat",
        },
        {
          jenis_bahan_id: "BAHAN PERUSAK EA-SPIRTUS BAKAR",
          jenis_bahan_name: "Bahan Perusak EA",
        },
      ],

      dataSource: [],
      columns: [
        {
          title: "Jumlah EA Sebelum Dicampur/Dirusak (lt)",
          dataIndex: "jumlah_ea_yang_akan_dicampur",
          key: "jumlah_ea_yang_akan_dicampur",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("jumlah_ea_yang_akan_dicampur"),
        },
        {
          title: "Bahan Pencampur/Perusak",
          children: [
            {
              title: "Jumlah",
              dataIndex: "jumlah_bahan_pencampur",
              key: "jumlah_bahan_pencampur",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jumlah_bahan_pencampur"),
            },
            {
              title: "Satuan",
              dataIndex: "satuan",
              key: "satuan",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("satuan"),
            },
            {
              title: "Jenis",
              dataIndex: "jenis_bahan",
              key: "jenis_bahan",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jenis_bahan"),
            },
          ],
        },
        {
          title: "Hasil Akhir Pencampur/Perusakan EA",
          children: [
            {
              title: "Jumlah (Lt)",
              dataIndex: "jumlah_setelah_dicampur",
              key: "jumlah_setelah_dicampur",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jumlah_setelah_dicampur"),
            },
            {
              title: "Jenis",
              dataIndex: "hasil_akhir",
              key: "hasil_akhir",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("hasil_akhir"),
            },
          ],
        },
      ],
    };
  }

  componentDidMount() {
    this.getDetailBackEa67();
  }

  getDetailBackEa67 = async () => {
    this.setState({ isDetailLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        nppbkc_id: "fe3c9197-e7e0-05e6-e054-0021f60abd54",
        nppbkc: "0000000000000000070713",
        nama_nppbkc: "CAHAYA BARU",
        jenis_back: "BACK-6",
        nomor_back: "1234567",
        tanggal_back: moment(new Date()),

        dataSource: [
          {
            key: "1",
            jumlah_ea_yang_akan_dicampur: 100,
            jumlah_bahan_pencampur: 200,
            satuan: "LT",
            jenis_bahan: "BIRTEX-SDA BIT 6",
            jumlah_setelah_dicampur: 300,
            hasil_akhir: "SDA BIT 6",
          },
          {
            key: "2",
            jumlah_ea_yang_akan_dicampur: 100,
            jumlah_bahan_pencampur: 200,
            satuan: "LT",
            jenis_bahan: "BIRTEX-SDA BIT 6",
            jumlah_setelah_dicampur: 300,
            hasil_akhir: "SDA BIT 6",
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

  render() {
    return (
      <>
        <Container
          menuName="Buku Rekening Cukai"
          contentName="BACK EA 6 & 7 Detail"
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
                      <FormLabel>Jumlah EA Yang Akan Dicampur/Dirusak</FormLabel>
                    </div>
                    <InputNumber
                      id="jumlah_ea_yang_akan_dicampur"
                      value={this.state.jumlah_ea_yang_akan_dicampur}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Bahan Pencampur/Perusak</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="jumlah_bahan_pencampur"
                        value={this.state.jumlah_bahan_pencampur}
                        style={{ width: "100%" }}
                        disabled
                      />
                      <Select id="satuan" value={this.state.satuan} style={{ width: 100 }} disabled>
                        {this.state.list_satuan.length > 0 &&
                          this.state.list_satuan.map((item, index) => (
                            <Select.Option key={`satuan-${index}`} value={item.satuan_id}>
                              {item.satuan_name}
                            </Select.Option>
                          ))}
                      </Select>
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Bahan</FormLabel>
                    </div>
                    <Select
                      id="jenis_bahan"
                      value={this.state.jenis_bahan}
                      style={{ width: "100%" }}
                      disabled
                    >
                      {this.state.list_jenis_bahan.length > 0 &&
                        this.state.list_jenis_bahan.map((item, index) => (
                          <Select.Option key={`jenis-bahan-${index}`} value={item.jenis_bahan_id}>
                            {item.jenis_bahan_name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah Setelah Dicampur/Dirusak</FormLabel>
                    </div>
                    <InputNumber
                      id="jumlah_setelah_dicampur"
                      value={this.state.jumlah_setelah_dicampur}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Hasil Akhir</FormLabel>
                    </div>
                    <Input
                      id="hasil_akhir"
                      value={this.state.hasil_akhir}
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
