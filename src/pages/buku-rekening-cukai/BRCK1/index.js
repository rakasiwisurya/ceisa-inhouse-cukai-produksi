import { Button, Icon, Input, Table } from "antd";
import Container from "components/Container";
import React, { Component } from "react";

const pathName = "/citac";
export default class BRCK1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Browse dan Perbaikan BRCK-1",
      columns: [
        {
          title: "KPPBC",
          dataIndex: "kppbc",
          key: "kppbc",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("kppbc"),
        },
        {
          title: "Perusahaan",
          dataIndex: "perusahaan",
          key: "perusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("perusahaan"),
        },
        {
          title: "Warna",
          dataIndex: "warna",
          key: "warna",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("warna"),
        },
        {
          title: "Tanggal Awal",
          dataIndex: "tanggal_awal",
          key: "tanggal_awal",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tanggal_awal"),
        },
        {
          title: "Tanggal Akhir",
          dataIndex: "tanggal_akhir",
          key: "tanggal_akhir",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tanggal_akhir"),
        },
        {
          title: "Saldo Awal",
          dataIndex: "saldo_awal",
          key: "saldo_awal",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("saldo_awal"),
        },
        {
          title: "Saldo Buku",
          dataIndex: "saldo_buku",
          key: "saldo_buku",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("saldo_buku"),
        },
        {
          title: "Saldo Penutupan BRCK",
          dataIndex: "saldo_penutupan_brck",
          key: "saldo_penutupan_brck",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("saldo_penutupan_brck"),
        },
        {
          title: "Selisih",
          dataIndex: "selisih",
          key: "selisih",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("selisih"),
        },
        {
          title: "Potongan",
          dataIndex: "potongan",
          key: "potongan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("potongan"),
        },
        {
          title: "Kekurangan",
          dataIndex: "kekurangan",
          key: "kekurangan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("kekurangan"),
        },
      ],
      dataSource: [
        {
          key: "1",
          kppbc: "kppbc",
          perusahaan: "perusahaan",
          warna: "warna",
          tanggal_awal: "tanggal_awal",
          tanggal_akhir: "tanggal_akhir",
          saldo_awal: "saldo_awal",
          saldo_buku: "saldo_buku",
          saldo_penutupan_brck: "saldo_penutupan_brck",
          selisih: "selisih",
          potongan: "potongan",
          kekurangan: "kekurangan",
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

  render() {
    return (
      <>
        <Container menuName="Buku Rekening Cukai" contentName="BRCK-1" hideContentHeader>
          <div className="kt-portlet__head kt-portlet__head--lg">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div className="kt-portlet__head-label">
                <span className="kt-portlet__head-icon">
                  <i className="kt-font-brand flaticon2-folder"></i>
                </span>
                <h3 className="kt-portlet__head-title kt-font-bolder">{this.state.subtitle1}</h3>
              </div>

              <div>
                <Button
                  type="primary"
                  onClick={() => this.props.history.push(`${pathName}/brck-1-rekam`)}
                >
                  Rekam BRCK-1
                </Button>
              </div>
            </div>
          </div>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
            <div style={{ marginTop: 50, marginBottom: 50 }}>
              <Table
                dataSource={this.state.dataSource}
                columns={this.state.columns}
                scroll={{ x: "max-content" }}
              />
            </div>
          </div>
        </Container>
      </>
    );
  }
}
