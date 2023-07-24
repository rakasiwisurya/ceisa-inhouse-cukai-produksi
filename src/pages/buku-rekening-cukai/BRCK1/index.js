import { Button, Icon, Input, Table, message } from "antd";
import { withRouter } from "react-router-dom";
import Container from "components/Container";
import { pathName } from "configs/constants";
import React, { Component } from "react";
import { api } from "configs/api";
class BRCK1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Browse dan Perbaikan BRCK-1",
      kppbc: "",
      perusahaan: "",
      warna: "",
      tanggal_awal: "",
      tanggal_akhir: "",
      saldo_awal: "",
      saldo_buku: "",
      saldo_penutupan_brck: "",
      selisih: "",
      potongan: "",
      kekurangan: "",
      columns: [
        {
          key: "aksi",
          title: "Aksi",
          fixed: "left",
          render: (_, record, index) => (
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <Button
                type="primary"
                icon="eye"
                onClick={() => this.handleDetail()}
                // onClick={() => this.handleEditRincian(record, index)}
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
          title: "Warna",
          dataIndex: "warna",
          key: "warna",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("warna"),
        },
        {
          title: "Tanggal Awal",
          dataIndex: "tanggalAwal",
          key: "tanggalAwal",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tanggalAwal"),
        },
        {
          title: "Tanggal Akhir",
          dataIndex: "tanggalAkhir",
          key: "tanggalAkhir",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tanggalAkhir"),
        },
        {
          title: "Saldo Awal",
          dataIndex: "saldoAwal",
          key: "saldoAwal",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("saldoAwal"),
        },
        {
          title: "Saldo Buku",
          dataIndex: "saldoBuku",
          key: "saldoBuku",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("saldoBuku"),
        },
        {
          title: "Saldo Penutupan BRCK",
          dataIndex: "saldoPenutupanBrck",
          key: "saldoPenutupanBrck",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("saldoPenutupanBrck"),
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

  handleGetBrck1 = async () => {
    this.setState({ isLoading: true });
    try {
      const response = await api.produksi.json.get("/brck/browse-brck1", {
        params: {
          // pageSize: this.state.limitBrckPage,
          pageNumber: this.state.currentBrckPage,
        },
      });
      console.log(response);
      this.setState({ dataSource: response.data.data.listData });
      this.setState({ isLoading: false });
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
    this.handleGetBrck1();
  }

  handleSelectData = (dataSource, selectedData) => {
    this.setState({ selectedData: dataSource});
    console.log("selected",selectedData)
  };

  handleDetail = () => {
    const { selectedData } = this.state;
    this.props.history.push(`${pathName}/brck-1-Detail`, {selectedData});
  };

  handleEdit = () => {
    const { selectedData } = this.state;
    this.props.history.push(`${pathName}/brck-1-Perbaikan`, { selectedData });
  };

  render() {
    return (
      <>
        <Container
          menuName="Buku Rekening Cukai"
          contentName="BRCK-1"
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
                    this.props.history.push(`${pathName}/brck-1-rekam`)
                  }
                >
                  Rekam BRCK-1
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
                scroll={{ x: "max-content" }}
                loading={this.state.isLoading}
              />
            </div>
          </div>
        </Container>
      </>
    );
  }
}

export default withRouter(BRCK1);
