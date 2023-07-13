import { Button, Icon, Input, Table, Tag } from "antd";
import Container from "components/Container";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";

export default class PencabutanTarif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPencabutanTarifLoading: true,

      page: 1,
      totalData: 0,

      table: {
        status: "",
        kode_kantor: "",
        nama_kantor: "",
        nppbkc: "",
        nomor_skep: "",
        tanggal_skep: "",
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
                <Button
                  icon="to-top"
                  type="danger"
                  onClick={() => this.handlePencabutan(record.id)}
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
          key: "kode_kantor",
          title: "Kode Kantor",
          dataIndex: "kode_kantor",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("kode_kantor"),
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
          key: "nomor_skep",
          title: "Nomor SKEP",
          dataIndex: "nomor_skep",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nomor_skep"),
        },
        {
          key: "tanggal_skep",
          title: "Tanggal SKEP",
          dataIndex: "tanggal_skep",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggal_skep"),
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
    this.getPencabutanTarif();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getPencabutanTarif();
    }
  }

  getPencabutanTarif = async () => {
    this.setState({ isPencabutanTarifLoading: true });
    const timeout = setTimeout(() => {
      this.setState({
        dataSource: [
          {
            id: "1",
            status: "AKTIF",
            kode_kantor: "kode_kantor",
            nama_kantor: "nama_kantor",
            nppbkc: "nppbkc",
            nomor_skep: "nomor_skep",
            tanggal_skep: moment(new Date()).format("DD-MM-YYYY"),
            awal_berlaku: moment(new Date()).format("DD-MM-YYYY"),
            akhir_berlaku: moment(new Date()).format("DD-MM-YYYY"),
          },
        ],
      });
      this.setState({ isPencabutanTarifLoading: false });
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
    this.getPencabutanTarif();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: "" } });
    this.getPencabutanTarif();
  };

  handlePencabutan = (id) => {
    this.props.history.push(`${pathName}/pencabutan-tarif/cabut/${id}`);
  };

  render() {
    return (
      <>
        <Container menuName="Tarif Cukai" contentName="Pencabutan Tarif">
          <div style={{ marginTop: 30, marginBottom: 20 }}>
            <Table
              dataSource={this.state.dataSource}
              columns={this.state.columns}
              loading={this.state.isPencabutanTarifLoading}
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
