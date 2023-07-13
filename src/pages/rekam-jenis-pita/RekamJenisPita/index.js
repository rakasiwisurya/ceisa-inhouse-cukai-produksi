import { Button, Col, Icon, Input, Row, Table } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";

export default class RekamJenisPita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRekamJenisPitaLoading: true,

      page: 1,
      totalData: 0,

      table: {
        kode_kantor: "",
        nama_kantor: "",
        nppbkc: "",
        nama_perusahaan: "",
        jenis_produksi: "",
        hje: "",
        isi: "",
        awal_berlaku: "",
        tarif: "",
        warna: "",
        tahun_pita: "",
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
                  icon="form"
                  variant="warning"
                  onClick={() => this.handlePerbaikan(record.id)}
                />
              </>
            </div>
          ),
        },
        {
          key: "nama_kantor",
          title: "Nama Kantor",
          dataIndex: "nama_kantor",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nama_kantor"),
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
          key: "jenis_produksi",
          title: "Jenis Produksi",
          dataIndex: "jenis_produksi",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("jenis_produksi"),
        },
        {
          key: "hje",
          title: "HJE",
          dataIndex: "hje",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("hje"),
        },
        {
          key: "isi",
          title: "Isi Kemasan",
          dataIndex: "isi",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("isi"),
        },
        {
          key: "awal_berlaku",
          title: "Awal Berlaku",
          dataIndex: "awal_berlaku",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("awal_berlaku"),
        },
        {
          key: "tarif",
          title: "Tarif",
          dataIndex: "tarif",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("tarif"),
        },
        {
          key: "warna",
          title: "Warna",
          dataIndex: "warna",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("warna"),
        },
        {
          key: "tahun_pita",
          title: "Tahun Pita",
          dataIndex: "tahun_pita",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("tahun_pita"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getRekamJenisPita();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getRekamJenisPita();
    }
  }

  getRekamJenisPita = async () => {
    this.setState({ isRekamJenisPitaLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        dataSource: [
          {
            key: "1",
            id: "1",
            kode_kantor: "kode_kantor",
            nama_kantor: "nama_kantor",
            nppbkc: "nppbkc",
            nama_perusahaan: "nama_perusahaan",
            jenis_produksi: "jenis_produksi",
            hje: 20,
            isi: 10,
            awal_berlaku: moment(new Date()).format("DD-MM-YYYY"),
            tarif: 300,
            warna: "warna",
            tahun_pita: "2020",
          },
        ],
      });
      this.setState({ isRekamJenisPitaLoading: false });
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
    this.getRekamJenisPita();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: "" } });
    this.getRekamJenisPita();
  };

  handlePerbaikan = (id) => {
    this.props.history.push(`${pathName}/rekam-jenis-pita/perbaikan/${id}`);
  };

  render() {
    return (
      <>
        <Container menuName="Rekam Jenis Pita" contentName="Rekam Jenis Pita">
          <Row gutter={[16, 16]}>
            <Col span={5}>
              <ButtonCustom
                variant="info"
                onClick={() => this.props.history.push(`${pathName}/rekam-jenis-pita/rekam`)}
                block
              >
                + Rekam Jenis Pita
              </ButtonCustom>
            </Col>
          </Row>

          <div style={{ marginTop: 30, marginBottom: 20 }}>
            <Table
              dataSource={this.state.dataSource}
              columns={this.state.columns}
              loading={this.state.isRekamJenisPitaLoading}
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
