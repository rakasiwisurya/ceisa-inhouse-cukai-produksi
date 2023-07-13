import { Button, Col, Icon, Input, Row, Table, Tag } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";

export default class SPL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSplLoading: true,

      page: 1,
      totalData: 0,

      table: {
        status: "",
        nppbkc: "",
        nama_perusahaan: "",
        nomor_spl: "",
        tanggal_spl: null,
      },

      dataSource: [],
      columns: [
        {
          key: "aksi",
          title: "Aksi",
          dataIndex: "aksi",
          fixed: "left",
          render: (text, record, index) => (
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <>
                <ButtonCustom
                  icon="eye"
                  variant="info"
                  onClick={() => this.handleDetail(record.id)}
                />
                <ButtonCustom
                  icon="form"
                  variant="warning"
                  onClick={() => this.handlePerbaikan(record.id)}
                />
              </>
            </div>
          ),
        },
        {
          key: "status",
          title: "Status",
          dataIndex: "status",
          render: (text) => (
            <div style={{ display: "flex", justifyContent: "center" }}>
              {text ? <Tag color={text === "AKTIF" ? "green" : "red"}>{text}</Tag> : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("status"),
        },
        {
          key: "nppbkc",
          title: "NPPBKC",
          dataIndex: "nppbkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nppbkc"),
        },
        {
          key: "nama_perusahaan",
          title: "Nama Perusahaan",
          dataIndex: "nama_perusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nama_perusahaan"),
        },
        {
          key: "nomor_spl",
          title: "Nomor SPL",
          dataIndex: "nomor_spl",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nomor_spl"),
        },
        {
          key: "tanggal_spl",
          title: "Tanggal SPL",
          dataIndex: "tanggal_spl",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("tanggal_spl"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getSpl();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getSpl();
    }
  }

  getSpl = async () => {
    this.setState({ isSplLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        dataSource: [
          {
            key: "1",
            id: "1",
            status: "AKTIF",
            nppbkc: "nppbkc",
            nama_perusahaan: "nama_perusahaan",
            nomor_spl: "nomor_spl",
            tanggal_spl: moment(new Date()).format("DD-MM-YYYY"),
          },
        ],
      });
      this.setState({ isSplLoading: false });
      clearTimeout(timeout);
    }, 2000);
  };

  getColumnSearchProps = (dataIndex, inputType) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          value={this.state.table[dataIndex]}
          onChange={(e) =>
            this.setState({ table: { ...this.state.table, [dataIndex]: e.target.value } })
          }
          onPressEnter={() => this.handleColumnSearch(confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleColumnSearch(confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleColumnReset(clearFilters, dataIndex)}
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
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        const timeout = setTimeout(() => {
          this.searchInput.select();
          clearTimeout(timeout);
        });
      }
    },
  });
  handleColumnSearch = (confirm) => {
    confirm();
    this.getSpl();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: "" } });
    this.getSpl();
  };

  handleDetail = (id) => {
    this.props.history.push(`${pathName}/spl/detail/${id}`);
  };
  handlePerbaikan = (id) => {
    this.props.history.push(`${pathName}/spl/perbaikan/${id}`);
  };

  render() {
    return (
      <>
        <Container menuName="Laporan Produksi BKC" contentName="SPL">
          <Row gutter={[16, 16]}>
            <Col span={4}>
              <ButtonCustom
                variant="info"
                onClick={() => this.props.history.push(`${pathName}/spl/rekam`)}
                block
              >
                + Tarif Rekam
              </ButtonCustom>
            </Col>
          </Row>

          <div style={{ marginTop: 30, marginBottom: 20 }}>
            <Table
              dataSource={this.state.dataSource}
              columns={this.state.columns}
              loading={this.state.isSplLoading}
              pagination={{ current: this.state.page, total: this.state.totalData }}
              onChange={(page) => this.setState({ page: page.current })}
              scroll={{ x: "max-content" }}
            />
          </div>
        </Container>
      </>
    );
  }
}
