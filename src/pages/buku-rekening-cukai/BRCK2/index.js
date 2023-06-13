import { Button, Icon, Input, Table } from "antd";
import Container from "components/Container";
import React, { Component } from "react";

const pathName = "/citac";
export default class BRCK2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Browse dan Perbaikan BRCK-2",
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
          title: "Merk",
          dataIndex: "merk",
          key: "merk",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("merk"),
        },
        {
          title: "Jenis",
          dataIndex: "jenis",
          key: "jenis",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenis"),
        },
        {
          title: "Tarif",
          dataIndex: "tarif",
          key: "tarif",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tarif"),
        },
        {
          title: "Isi",
          dataIndex: "isi",
          key: "isi",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("isi"),
        },
        {
          title: "Kadar",
          dataIndex: "kadar",
          key: "kadar",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("kadar"),
        },
        {
          title: "Periode Penutupan BRCK",
          children: [
            {
              title: "Tgl Awal",
              dataIndex: "tanggal_awal_periode_penutupan",
              key: "tanggal_awal_periode_penutupan",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("tanggal_awal_periode_penutupan"),
            },
            {
              title: "Tgl Akhir",
              dataIndex: "tanggal_akhir_periode_penutupan",
              key: "tanggal_akhir_periode_penutupan",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("tanggal_akhir_periode_penutupan"),
            },
          ],
        },
        {
          title: "Saldo Awal",
          children: [
            {
              title: "Liter",
              dataIndex: "saldo_awal_liter",
              key: "saldo_awal_liter",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("saldo_awal_liter"),
            },
            {
              title: "Kemasan",
              dataIndex: "saldo_awal_kemasan",
              key: "saldo_awal_kemasan",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("saldo_awal_kemasan"),
            },
          ],
        },
        {
          title: "Saldo Penutupan BRCK",
          children: [
            {
              title: "Liter",
              dataIndex: "saldo_penutupan_liter",
              key: "saldo_penutupan_liter",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("saldo_penutupan_liter"),
            },
            {
              title: "Kemasan",
              dataIndex: "saldo_penutupan_kemasan",
              key: "saldo_penutupan_kemasan",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("saldo_penutupan_kemasan"),
            },
          ],
        },
        {
          title: "Selisih",
          children: [
            {
              title: "Liter",
              dataIndex: "selisih_liter",
              key: "selisih_liter",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("selisih_liter"),
            },
            {
              title: "Kemasan",
              dataIndex: "selisih_kemasan",
              key: "selisih_kemasan",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("selisih_kemasan"),
            },
          ],
        },
      ],
      dataSource: [
        {
          key: "1",
          kppbc: "kppbc",
          perusahaan: "perusahaan",
          merk: "merk",
          jenis: "jenis",
          tarif: "tarif",
          isi: "isi",
          kadar: "kadar",
          tanggal_awal_periode_penutupan: "tanggal_awal_periode_penutupan",
          tanggal_akhir_periode_penutupan: "tanggal_akhir_periode_penutupan",
          saldo_awal_liter: "saldo_awal_liter",
          saldo_awal_kemasan: "saldo_awal_kemasan",
          saldo_penutupan_liter: "saldo_penutupan_liter",
          saldo_penutupan_kemasan: "saldo_penutupan_kemasan",
          selisih_liter: "selisih_liter",
          selisih_kemasan: "selisih_kemasan",
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
        <Container menuName="Buku Rekening Cukai" contentName="BRCK-2" hideContentHeader>
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
                  onClick={() => this.props.history.push(`${pathName}/brck-2-rekam`)}
                >
                  Rekam BRCK-2
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
