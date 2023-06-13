import React, { Fragment, Component } from "react";
import { Button, Row, Input, Icon, Table, Modal, Col } from "antd";
import Container from "components/Container";
import ModalDetailTarifPitaCukai from "./ModalDetailTarifPitaCukai";
import ModalEditTarifPitaCukai from "./ModalEditTarifPitaCukai";

const pathName = "/citac";
export default class ReferensiTarifPitaCukai extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalDetailOpen: false,
      isModalEditOpen: false,
      detailData: {},
      editData: {},
      searchText: "",
      searchedColumn: "",

      columns: [
        {
          key: "aksi",
          title: "Aksi",
          dataIndex: "aksi",
          fixed: "left",
          render: (text, record, index) => (
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <Button icon="form" onClick={() => this.handleModalEditShow(record)} />
              <Button icon="eye" onClick={() => this.handleModalDetailShow(record)} />
            </div>
          ),
        },
        {
          key: "nomor",
          title: "Nomor",
          dataIndex: "nomor",
          editable: true,
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
        },

        {
          key: "nomor_surat",
          title: "Nomor Surat",
          dataIndex: "nomor_surat",
          editable: true,
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("nomor_surat"),
        },
        {
          key: "tanggal_surat",
          title: "Tanggal Surat",
          dataIndex: "tanggal_surat",
          editable: true,
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tanggal_surat"),
        },
        {
          key: "awal_berlaku",
          title: "Awal Berlaku",
          dataIndex: "awal_berlaku",
          editable: true,
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("awal_berlaku"),
        },
        {
          key: "akhir_berlaku",
          title: "Akhir Berlaku",
          dataIndex: "akhir_berlaku",
          editable: true,
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("akhir_berlaku"),
        },
        {
          key: "jenis_bkc",
          title: "Jenis BKC",
          dataIndex: "jenis_bkc",
          editable: true,
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenis_bkc"),
        },
        {
          key: "jenis_referensi",
          title: "Jenis Referensi",
          dataIndex: "jenis_referensi",
          editable: true,
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenis_referensi"),
        },
      ],
      dataSource: [
        {
          key: 1,
          nomor: 1,
          nomor_surat: "PER-12/BC/2022",
          tanggal_surat: "25-11-2022",
          awal_berlaku: "01-01-2023",
          akhir_berlaku: "-",
          jenis_bkc: "HT",
          jenis_referensi: "Warna",
        },
        {
          key: 2,
          nomor: 2,
          nomor_surat: "PER-12/BC/2022",
          tanggal_surat: "25-11-2022",
          awal_berlaku: "01-01-2023",
          akhir_berlaku: "-",
          jenis_bkc: "MMEA",
          jenis_referensi: "Warna",
        },
        {
          key: 3,
          nomor: 3,
          nomor_surat: "191/PMK.010/2022",
          tanggal_surat: "15-12-2022",
          awal_berlaku: "01-01-2023",
          akhir_berlaku: "-",
          jenis_bkc: "HT",
          jenis_referensi: "Tarif",
        },
        {
          key: 4,
          nomor: 4,
          nomor_surat: "192/PMK.010/2022",
          tanggal_surat: "15-11-2022",
          awal_berlaku: "01-01-2023",
          akhir_berlaku: "-",
          jenis_bkc: "HT",
          jenis_referensi: "Tarif",
        },
        {
          key: 5,
          nomor: 5,
          nomor_surat: "PER-12/BC/2022",
          tanggal_surat: "25-11-2022",
          awal_berlaku: "01-01-2023",
          akhir_berlaku: "-",
          jenis_bkc: "HT",
          jenis_referensi: "Warna",
          textAlign: "center",
        },
        {
          key: 6,
          nomor: 6,
          nomor_surat: "PER-12/BC/2022",
          tanggal_surat: "25-11-2022",
          awal_berlaku: "01-01-2023",
          akhir_berlaku: "-",
          jenis_bkc: "MMEA",
          jenis_referensi: "Warna",
        },
        {
          key: 7,
          nomor: 7,
          nomor_surat: "191/PMK.010/2022",
          tanggal_surat: "15-12-2022",
          awal_berlaku: "01-01-2023",
          akhir_berlaku: "-",
          jenis_bkc: "HT",
          jenis_referensi: "Tarif",
        },
        {
          key: 8,
          nomor: 8,
          nomor_surat: "192/PMK.010/2022",
          tanggal_surat: "15-11-2022",
          awal_berlaku: "01-01-2023",
          akhir_berlaku: "-",
          jenis_bkc: "HT",
          jenis_referensi: "Tarif",
        },
        {
          key: 9,
          nomor: 9,
          nomor_surat: "191/PMK.010/2022",
          tanggal_surat: "15-12-2022",
          awal_berlaku: "01-01-2023",
          akhir_berlaku: "-",
          jenis_bkc: "HT",
          jenis_referensi: "Tarif",
        },
        {
          key: 10,
          nomor: 10,
          nomor_surat: "192/PMK.010/2022",
          tanggal_surat: "15-11-2022",
          awal_berlaku: "01-01-2023",
          akhir_berlaku: "-",
          jenis_bkc: "HT",
          jenis_referensi: "Tarif",
        },
      ],
    };
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
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
        setTimeout(() => this.searchInput.select());
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

  handleModalDetailShow = (record) => {
    this.setState({ ...this.state, isModalDetailOpen: true, detailData: record });
  };
  handleModalDetailCancel = () => {
    this.setState({ ...this.state, isModalDetailOpen: false });
  };
  handleModalEditShow = (record) => {
    this.setState({ ...this.state, isModalEditOpen: true, editData: record });
  };
  handleModalEditCancel = () => {
    this.setState({ ...this.state, isModalEditOpen: false });
  };

  render() {
    return (
      <>
        <Container
          menuName="Referensi Tarif dan Pita Cukai"
          contentName="Pengelolaan Referensi Tarif dan Pita Cukai"
        >
          <Row>
            <Col span={14}>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Button
                    style={{ backgroundColor: "#81d3f8", color: "white", borderColor: "#81d3f8" }}
                    onClick={() => this.props.history.push(`${pathName}/referensi-warna`)}
                    block
                  >
                    + Referesi Warna
                  </Button>
                </Col>

                <Col span={8}>
                  <Button
                    style={{ backgroundColor: "#facd91", color: "white", borderColor: "#facd91" }}
                    onClick={() => this.props.history.push(`${pathName}/referensi-tarif`)}
                    block
                  >
                    + Referesi Tarif
                  </Button>
                </Col>

                <Col span={8}>
                  <Button
                    style={{ backgroundColor: "#ec808d", color: "white", borderColor: " #ec808d" }}
                    onClick={() => this.props.history.push(`${pathName}/referensi-tanggal`)}
                    block
                  >
                    + Referesi Tanggal
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          <div style={{ marginTop: 30, marginBottom: 20 }}>
            <Table
              dataSource={this.state.dataSource}
              columns={this.state.columns}
              scroll={{ x: "max-content" }}
            />
          </div>
        </Container>

        <ModalDetailTarifPitaCukai
          isOpen={this.state.isModalDetailOpen}
          onCancel={this.handleModalDetailCancel}
          data={this.state.detailData}
        />

        <ModalEditTarifPitaCukai
          isOpen={this.state.isModalEditOpen}
          onCancel={this.handleModalEditCancel}
          data={this.state.editData}
        />
      </>
    );
  }
}
