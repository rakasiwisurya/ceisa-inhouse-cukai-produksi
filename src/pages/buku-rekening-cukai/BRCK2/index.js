import { Button, Icon, Input, Table, message } from "antd";
import Container from "components/Container";
import { pathName } from "configs/constants";
import React, { Component } from "react";
import { api } from "configs/api";

export default class BRCK2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Browse dan Perbaikan BRCK-2",
      page:1,
      totalData:0,
      no: "",
      kppbc: "",
      namaPerusahaan: "",
      merk: "",
      jenis: "",
      tarif: "",
      isi: "",
      kadar: "",
      tanggalAwal: "",
      tanggalAkhir: "",
      saldoAwalLiter: "",
      saldoAwalKemasan: "",
      saldoPenutupanLiter: "",
      saldoPenutupanKemasan: "",
      selisihLiter: "",
      selisihKemasan: "",
      page: 1,
      totalData:0,
      columns: [
        {
          key: "aksi",
          title: "Aksi",
          fixed: "left",
          render: (_, record) => (
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <Button
                type="primary"
                icon="eye"
                onClick={() => this.handleDetail()}
              />
              <Button
                style={{
                  backgroundColor: "#F79327",
                  color: "white",
                  borderColor: "#F79327",
                }}
                icon="edit"
                onClick={() => this.handleEdit()}
              />
            </div>
          ),
        },
        {
          title: "KPPBC",
          dataIndex: "kppbc",
          key: "kppbc",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("kppbc"),
        },
        {
          title: "Perusahaan",
          dataIndex: "namaPerusahaan",
          key: "namaPerusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("namaPerusahaan"),
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
              dataIndex: "tanggalAwal",
              key: "tanggalAwal",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text}</div>
              ),
              ...this.getColumnSearchProps("tanggalAwal"),
            },
            {
              title: "Tgl Akhir",
              dataIndex: "tanggalAkhir",
              key: "tanggalAkhir",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text}</div>
              ),
              ...this.getColumnSearchProps("tanggalAkhir"),
            },
          ],
        },
        {
          title: "Saldo Awal",
          children: [
            {
              title: "Liter",
              dataIndex: "saldoAwalLiter",
              key: "saldoAwalLiter",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text}</div>
              ),
              ...this.getColumnSearchProps("saldoAwalLiter"),
            },
            {
              title: "Kemasan",
              dataIndex: "saldoAwalKemasan",
              key: "saldoAwalKemasan",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text}</div>
              ),
              ...this.getColumnSearchProps("saldoAwalKemasan"),
            },
          ],
        },
        {
          title: "Saldo Penutupan BRCK",
          children: [
            {
              title: "Liter",
              dataIndex: "saldoPenutupanLiter",
              key: "saldoPenutupanLiter",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text}</div>
              ),
              ...this.getColumnSearchProps("saldo_penutupan_liter"),
            },
            {
              title: "Kemasan",
              dataIndex: "saldoPenutupanKemasan",
              key: "saldoPenutupanKemasan",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text}</div>
              ),
              ...this.getColumnSearchProps("saldoPenutupanKemasan"),
            },
          ],
        },
        {
          title: "Selisih",
          children: [
            {
              title: "Liter",
              dataIndex: "selisihLiter",
              key: "selisihLiter",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text}</div>
              ),
              ...this.getColumnSearchProps("selisihLiter"),
            },
            {
              title: "Kemasan",
              dataIndex: "selisihKemasan",
              key: "selisihKemasan",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text}</div>
              ),
              ...this.getColumnSearchProps("selisihKemasan"),
            },
          ],
        },
      ],
      dataSource: [
      ],
    };
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleColumnSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() =>
            this.handleColumnSearch(selectedKeys, confirm, dataIndex)
          }
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

  handleGetBrck2 = async () => {
    this.setState({ isLoading: true });
    try {
      const response = await api.produksi.json.get("/brck2/browse", {
        params: {
          page: this.state.page,
        },
      });
      console.log(response);
      this.setState({ dataSource: response.data.data.listData });
      this.setState({ isLoading: false });
      const page = response.data.data.currentPage;
			const totalData = response.data.data.totalData;
			this.setState({ page, totalData });
      console.log(this.state.dataSource);
      return;
    } catch (error) {
      this.setState({ error: "An error occurred" });
      message.error("Tidak bisa memuat data");
      this.setState({ isLoading: false });
      return;
    }
  };

  componentDidMount() {
    this.handleGetBrck2();
  }

  handleSelectData = (data) => {
    this.setState({ selectedData: data });
  };

  handleDetail = () => {
    const { selectedData } = this.state;
    this.props.history.push(`${pathName}/brck-2-Detail`, { selectedData });
  };

  handleEdit = () => {
    const { selectedData } = this.state;
    this.props.history.push(`${pathName}/brck-2-Perbaikan`, { selectedData });
  };

  render() {
    return (
      <>
        <Container
          menuName="Buku Rekening Cukai"
          contentName="BRCK-2"
          hideContentHeader
        >
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
                <h3 className="kt-portlet__head-title kt-font-bolder">
                  {this.state.subtitle1}
                </h3>
              </div>

              <div>
                <Button
                  type="primary"
                  onClick={() =>
                    this.props.history.push(`${pathName}/brck-2-rekam`)
                  }
                >
                  Rekam BRCK-2
                </Button>
              </div>
            </div>
          </div>
          <div
            className="kt-content  kt-grid__item kt-grid__item--fluid"
            id="kt_content"
          >
            <div style={{ marginTop: 50, marginBottom: 50 }}>
              <Table
                dataSource={this.state.dataSource}
                columns={this.state.columns}
                loading={this.state.isLoading}
                pagination={{ current: this.state.page, total: this.state.totalData }}
                scroll={{ x: "max-content" }}
              />
            </div>
          </div>
        </Container>
      </>
    );
  }
}
