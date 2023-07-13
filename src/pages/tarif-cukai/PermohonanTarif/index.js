import { Button, Col, Icon, Input, Row, Table, Tag } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";

export default class PermohonanTarif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPermohonanTarifLoading: true,

      page: 1,
      totalData: 0,

      table: {
        status: "",
        kode_kantor: "",
        nama_kantor: "",
        nppbkc: "",
        nama_perusahaan: "",
        nomor_kep: "",
        tanggal_kep: "",
        nama_merk: "",
        jenis_produksi: "",
        hje: "",
        isi: "",
        tarif: "",
        tujuan: "",
        awal_berlaku: "",
        akhir_berlaku: "",
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
          key: "nomor_kep",
          title: "Nomor KEP",
          dataIndex: "nomor_kep",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nomor_kep"),
        },
        {
          key: "tanggal_kep",
          title: "Tanggal KEP",
          dataIndex: "tanggal_kep",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggal_kep"),
        },
        {
          key: "nama_merk",
          title: "Nama Merk",
          dataIndex: "nama_merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nama_merk"),
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
          title: "Isi",
          dataIndex: "isi",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("isi"),
        },
        {
          key: "tarif",
          title: "Tarif",
          dataIndex: "tarif",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("tarif"),
        },
        {
          key: "tujuan",
          title: "Tujuan",
          dataIndex: "tujuan",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("tujuan"),
        },
        {
          key: "awal_berlaku",
          title: "Awal Berlaku",
          dataIndex: "awal_berlaku",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("awal_berlaku"),
        },
        {
          key: "akhir_berlaku",
          title: "Akhir Berlaku",
          dataIndex: "akhir_berlaku",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("akhir_berlaku"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getPermohonanTarif();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getPermohonanTarif();
    }
  }

  getPermohonanTarif = async () => {
    this.setState({ isPermohonanTarifLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        dataSource: [
          {
            key: "1",
            id: "1",
            status: "AKTIF",
            nama_kantor: "nama_kantor",
            nppbkc: "nppbkc",
            nama_perusahaan: "nama_perusahaan",
            nomor_kep: "nomor_kep",
            tanggal_kep: moment(new Date()).format("DD-MM-YYYY"),
            nama_merk: "nama_merk",
            jenis_produksi: "jenis_produksi",
            hje: 1000,
            isi: 2000,
            tarif: 2000,
            tujuan: "tujuan",
            awal_berlaku: moment(new Date()).format("DD-MM-YYYY"),
            akhir_berlaku: moment(new Date()).format("DD-MM-YYYY"),
          },
        ],
      });
      this.setState({ isPermohonanTarifLoading: false });
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
    this.getPermohonanTarif();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: "" } });
    this.getPermohonanTarif();
  };

  handleDetail = (id) => {
    this.props.history.push(`${pathName}/permohonan-tarif/detail/${id}`);
  };
  handlePerbaikan = (id) => {
    this.props.history.push(`${pathName}/permohonan-tarif/perbaikan/${id}`);
  };

  render() {
    return (
      <>
        <Container menuName="Tarif Cukai" contentName="Permohonan Tarif">
          <Row gutter={[16, 16]}>
            <Col span={4}>
              <ButtonCustom
                variant="info"
                onClick={() => this.props.history.push(`${pathName}/permohonan-tarif/rekam`)}
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
              loading={this.state.isPermohonanTarifLoading}
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
