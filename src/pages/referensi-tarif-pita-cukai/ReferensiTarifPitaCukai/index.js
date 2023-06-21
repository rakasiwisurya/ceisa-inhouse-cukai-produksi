import React, { Component } from "react";
import { Button, Row, Input, Icon, Table, Col } from "antd";
import Container from "components/Container";
import { pathName } from "configs/constants";
export default class ReferensiTarifPitaCukai extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
              <Button
                icon="form"
                type="primary"
                onClick={() => this.handleEdit(record.id, record.jenis_referensi)}
              />
              <Button
                icon="eye"
                type="default"
                onClick={() => this.handleDetail(record.id, record.jenis_referensi)}
              />
            </div>
          ),
        },
        {
          key: "nomor",
          title: "Nomor",
          dataIndex: "nomor",
          editable: true,
          render: (text, record, index) => <div style={{ textAlign: "center" }}>{index + 1}</div>,
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
          id: 1,
          nomor_surat: "PER-12/BC/2022",
          tanggal_surat: "25-11-2022",
          awal_berlaku: "01-01-2023",
          akhir_berlaku: "-",
          jenis_bkc: "HT",
          jenis_referensi: "Warna",
        },
        {
          key: 2,
          id: 2,
          nomor_surat: "PER-12/BC/2022",
          tanggal_surat: "25-11-2022",
          awal_berlaku: "01-01-2023",
          akhir_berlaku: "-",
          jenis_bkc: "MMEA",
          jenis_referensi: "Warna",
        },
        {
          key: 3,
          id: 3,
          nomor_surat: "191/PMK.010/2022",
          tanggal_surat: "15-12-2022",
          awal_berlaku: "01-01-2023",
          akhir_berlaku: "-",
          jenis_bkc: "HT",
          jenis_referensi: "Tarif",
        },
        {
          key: 4,
          id: 4,
          nomor_surat: "192/PMK.010/2022",
          tanggal_surat: "15-11-2022",
          awal_berlaku: "01-01-2023",
          akhir_berlaku: "-",
          jenis_bkc: "HT",
          jenis_referensi: "Tarif",
        },
        {
          key: 5,
          id: 5,
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
          id: 6,
          nomor_surat: "PER-12/BC/2022",
          tanggal_surat: "25-11-2022",
          awal_berlaku: "01-01-2023",
          akhir_berlaku: "-",
          jenis_bkc: "MMEA",
          jenis_referensi: "Warna",
        },
        {
          key: 7,
          id: 7,
          nomor_surat: "191/PMK.010/2022",
          tanggal_surat: "15-12-2022",
          awal_berlaku: "01-01-2023",
          akhir_berlaku: "-",
          jenis_bkc: "HT",
          jenis_referensi: "Tarif",
        },
        {
          key: 8,
          id: 8,
          nomor_surat: "192/PMK.010/2022",
          tanggal_surat: "15-11-2022",
          awal_berlaku: "01-01-2023",
          akhir_berlaku: "-",
          jenis_bkc: "HT",
          jenis_referensi: "Tarif",
        },
        {
          key: 9,
          id: 9,
          nomor_surat: "191/PMK.010/2022",
          tanggal_surat: "15-12-2022",
          awal_berlaku: "01-01-2023",
          akhir_berlaku: "-",
          jenis_bkc: "HT",
          jenis_referensi: "Tarif",
        },
        {
          key: 10,
          id: 10,
          nomor_surat: "192/PMK.010/2022",
          tanggal_surat: "15-11-2022",
          awal_berlaku: "01-01-2023",
          akhir_berlaku: "-",
          jenis_bkc: "HT",
          jenis_referensi: "Tanggal",
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

  handleEdit = (id, jenisReferensi) => {
    switch (true) {
      case jenisReferensi === "Warna":
        this.props.history.push(`${pathName}/referensi-tarif-warna/referensi-warna-edit/${id}`);
        break;
      case jenisReferensi === "Tarif":
        this.props.history.push(`${pathName}/referensi-tarif-warna/referensi-tarif-edit/${id}`);
        break;
      case jenisReferensi === "Tanggal":
        // this.props.history.push(`${pathName}/referensi-tarif-warna/referensi-tanggal-edit/${id}`);
        this.props.history.push(`/referensi-penyediaan-pita-cukai`);
        break;
      default:
        break;
    }
  };
  handleDetail = (id, jenisReferensi) => {
    switch (true) {
      case jenisReferensi === "Warna":
        this.props.history.push(`${pathName}/referensi-tarif-warna/referensi-warna-detail/${id}`);
        break;
      case jenisReferensi === "Tarif":
        this.props.history.push(`${pathName}/referensi-tarif-warna/referensi-tarif-detail/${id}`);
        break;
      case jenisReferensi === "Tanggal":
        // this.props.history.push(`${pathName}/referensi-tarif-warna/referensi-tanggal-detail/${id}`);
        this.props.history.push(`/referensi-penyediaan-pita-cukai`);
        break;
      default:
        break;
    }
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
                    onClick={() =>
                      this.props.history.push(
                        `${pathName}/referensi-tarif-warna/referensi-warna-rekam`
                      )
                    }
                    block
                  >
                    + Referesi Warna
                  </Button>
                </Col>

                <Col span={8}>
                  <Button
                    style={{ backgroundColor: "#facd91", color: "white", borderColor: "#facd91" }}
                    onClick={() =>
                      this.props.history.push(
                        `${pathName}/referensi-tarif-warna/referensi-tarif-rekam`
                      )
                    }
                    block
                  >
                    + Referesi Tarif
                  </Button>
                </Col>

                <Col span={8}>
                  <Button
                    style={{ backgroundColor: "#ec808d", color: "white", borderColor: " #ec808d" }}
                    onClick={() =>
                      // this.props.history.push(
                      //   `${pathName}/referensi-tarif-warna/referensi-tanggal-rekam`
                      // )
                      this.props.history.push(`/referensi-penyediaan-pita-cukai`)
                    }
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
      </>
    );
  }
}
