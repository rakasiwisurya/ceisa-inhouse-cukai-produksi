import { Button, Icon, Input, Modal, Table, message } from "antd";
import React, { Component } from "react";
import { api } from "configs/api";

export default class ModalDaftarMerk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page:1,
      totalData:0,
      merkMMEA: "",
      jenisMMEA: "",
      golongan: "",
      kadar: "",
      tarif: "",
      isi: "",
      kemasan: "",
      noSkep: "",
      tanggalPenutupanBrck2: "",
      columns: [
        {
          title: "Merk MMEA",
          dataIndex: "merkMMEA",
          key: "merkMMEA",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("merkMMEA"),
        },
        {
          title: "Jenis MMEA",
          dataIndex: "jenisMMEA",
          key: "jenisMMEA",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenisMMEA"),
        },
        {
          title: "Golongan",
          dataIndex: "golongan",
          key: "golongan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("golongan"),
        },
        {
          title: "Kadar",
          dataIndex: "kadar",
          key: "kadar",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("kadar"),
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
          title: "Kemasan",
          dataIndex: "kemasan",
          key: "kemasan",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("kemasan"),
        },
        {
          title: "No. SKEP",
          dataIndex: "noSkep",
          key: "noSkep",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("noSkep"),
        },
        {
          title: "Tanggal Penutupan BRCK-2",
          dataIndex: "tanggalPenutupanBrck2",
          key: "tanggalPenutupanBrck2",
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("tanggalPenutupanBrck2"),
        },
      ],
      dataSource: [
        {
          merkMMEA: "A",
          jenisMMEA: "A",
          golongan: "A",
          kadar: "10%",
          tarif: "20",
          isi: "10",
          kemasan: "1",
          noSkep: "1",
          tanggalPenutupanBrck2: "20-02-2023",
        },
        {
          merkMMEA: "B",
          jenisMMEA: "B",
          golongan: "B",
          kadar: "30%",
          tarif: "30",
          isi: "10",
          kemasan: "1",
          noSkep: "1",
          tanggalPenutupanBrck2: "20-03-2023",
        },
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

  handleGetMerk = async () => {
    this.setState({ isLoading: true });
    try {
      const response = await api.produksi.json.get("/brck/daftar-merk-brck2", {
        params: {
          pageSize: this.state.totalData,
          pageNumber: this.state.page,
        },
      });
      console.log(response);
      this.setState({ dataSource: response.data.data.listData });
      this.setState({ isLoading: false });
      const page = response.data.data.currentPage;
			const totalData = response.data.data.totalData;
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
    this.handleGetMerk();
  }

  render() {
    const { isOpen, onCancel, onRow } = this.props;

    return (
      <Modal
        width={820}
        title="Daftar Merk"
        visible={isOpen}
        onCancel={onCancel}
        footer={null}
        centered
      >
        <div>
          <Table
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            loading={this.state.isLoading}
            pagination={{
              current: this.state.page, total: this.state.totalData 
            }}
            scroll={{ x: "max-content" }}
            onRow={onRow}
          />
        </div>
      </Modal>
    );
  }
}
