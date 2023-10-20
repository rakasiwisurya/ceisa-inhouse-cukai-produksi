import { Button, Col, Icon, Input, Row, Table } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";
import ModalSPLDetail from "../ModalSPLDetail";

export default class SPL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSplLoading: true,
      isModalSplDetailVisible: false,

      detailId: null,

      page: 1,
      totalData: 0,

      table: {
        status: null,
        nppbkc: null,
        nama_perusahaan: null,
        nomor_spl: null,
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
                  onClick={() => this.handleDetail(record.idSpl)}
                />
                <ButtonCustom
                  icon="form"
                  variant="warning"
                  onClick={() => this.handlePerbaikan(record.idSpl)}
                />
              </>
            </div>
          ),
        },
        {
          key: "nppbkc",
          title: "NPPBKC",
          dataIndex: "nppbkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("nppbkc"),
        },
        {
          key: "nama_perusahaan",
          title: "Nama Perusahaan",
          dataIndex: "nama_perusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("nama_perusahaan"),
        },
        {
          key: "nomor_spl",
          title: "Nomor SPL",
          dataIndex: "nomor_spl",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("nomor_spl"),
        },
        {
          key: "tanggal_spl",
          title: "Tanggal SPL",
          dataIndex: "tanggal_spl",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
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
    const { nppbkc, nama_perusahaan, nomor_spl, tanggal_spl, status } = this.state.table;

    const payload = { page: this.state.page };

    if (nppbkc) payload.nppbkc = nppbkc;
    if (nama_perusahaan) payload.namaPerusahaan = nama_perusahaan;
    if (nomor_spl) payload.nomorSpl = nomor_spl;
    if (tanggal_spl) payload.tanggalSpl = moment(tanggal_spl, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (status) payload.status = status;

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/spl/browse",
      params: payload,
      setLoading: (bool) => this.setState({ isSplLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        idSpl: item.idSpl,
        key: `spl-${index}`,
        status: item.status,
        nppbkc: item.nppbkc,
        nama_perusahaan: item.namaPerusahaan,
        nomor_spl: item.nomorSpl,
        tanggal_spl: item.tanggalSpl,
      }));

      const page = response.data.data.currentPage;
      const totalData = response.data.data.totalData;
      this.setState({ dataSource: newData, page, totalData });
    }
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
    this.setState({ page: 1 }, this.getSpl);
  };
  handleColumnReset = (clearFilters, dataIndex) => {
    clearFilters();
    this.setState({ table: { ...this.state.table, [dataIndex]: null }, page: 1 }, this.getSpl);
  };

  handleDetail = (id) => {
    this.setState({ isModalSplDetailVisible: true, detailId: id });
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

        <ModalSPLDetail
          id={this.state.detailId}
          isVisible={this.state.isModalSplDetailVisible}
          onCancel={() => this.setState({ detailId: null, isModalSplDetailVisible: false })}
        />
      </>
    );
  }
}