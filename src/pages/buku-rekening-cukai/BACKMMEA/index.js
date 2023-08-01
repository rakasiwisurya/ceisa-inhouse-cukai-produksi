import React, { Component } from "react";
import { Button, Row, Input, Icon, Table, Col } from "antd";
import Container from "components/Container";
import { pathName } from "configs/constants";
import { requestApi } from "utils/requestApi";
import moment from "moment";
import ButtonCustom from "components/Button/ButtonCustom";
import Header from "components/Header";
export default class BACKMMEA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle: "BACK MMEA 8 & 9",

      isBackMmeaLoading: true,

      page: 1,
      totalData: 0,

      table: {
        kppbc: null,
        nama_perusahaan: null,
        jenis_back: null,
        nomor_back: null,
        tanggal_back: null,
        jenis_ea: null,
        jumlah: null,
        keterangan: null,
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
                  onClick={() => this.handleEdit(record.back_mmea_id)}
                />
                <ButtonCustom
                  icon="eye"
                  variant="info"
                  onClick={() => this.handleDetail(record.back_mmea_id)}
                />
              </>
            </div>
          ),
        },
        {
          key: "kppbc",
          title: "KPPBC",
          dataIndex: "kppbc",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("kppbc"),
        },
        {
          key: "nama_perusahaan",
          title: "Nama Perusahaan",
          dataIndex: "nama_perusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nama_perusahaan"),
        },
        {
          key: "jenis_back",
          title: "Jenis BACK",
          dataIndex: "jenis_back",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("jenis_back"),
        },
        {
          key: "nomor_back",
          title: "Nomor BACK",
          dataIndex: "nomor_back",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nomor_back"),
        },
        {
          key: "tanggal_back",
          title: "Tanggal BACK",
          dataIndex: "tanggal_back",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggal_back"),
        },
        {
          key: "jenis_ea",
          title: "Jenis EA",
          dataIndex: "jenis_ea",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("jenis_ea"),
        },
        {
          key: "jumlah",
          title: "Jumlah (Lt)",
          dataIndex: "jumlah",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("jumlah"),
        },
        {
          key: "keterangan",
          title: "Keterangan",
          dataIndex: "keterangan",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("keterangan"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getBackMmea();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getBackMmea();
    }
  }

  getBackMmea = async () => {
    const {
      kppbc,
      nama_perusahaan,
      jenis_back,
      nomor_back,
      tanggal_back,
      jenis_ea,
      jumlah,
      keterangan,
    } = this.state.table;
    const payload = { page: this.state.page };

    if (kppbc) payload.namaKantor = kppbc;
    if (nama_perusahaan) payload.namaPerusahaan = nama_perusahaan;
    if (jenis_back) payload.jenisBackMmea = jenis_back;
    if (nomor_back) payload.nomorBackMmea = nomor_back;
    if (tanggal_back)
      payload.tanggalBackMmea = moment(tanggal_back, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (jenis_ea) payload.jenisBkc = jenis_ea;
    if (jumlah) payload.jumlahSetelah = jumlah;
    if (keterangan) payload.keterangan = keterangan;

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/back-mmea/browse",
      params: payload,
      setLoading: (bool) => this.setState({ isBackMmeaLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `back-mmea-${index}`,
        back_mmea_id: item.idBackMmeaHeader,
        kppbc: item.namaKantor,
        nama_perusahaan: item.namaPerusahaan,
        jenis_back: item.jenisBackMmea,
        nomor_back: item.nomorBackMmea,
        tanggal_back: item.tanggalBackMmea,
        jenis_ea: item.jenisBkc,
        jumlah: item.jumlahSetelah,
        keterangan: item.keterangan,
      }));

      this.setState({
        dataSource: newData,
        page: response.data.data.currentPage,
        totalData: response.data.data.totalData,
      });
    }
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
    this.getBackMmea();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: "" } });
    this.getBackMmea();
  };

  handleEdit = (id) => {
    this.props.history.push(`${pathName}/back-mmea/perbaikan-8-9/${id}`);
  };
  handleDetail = (id) => {
    this.props.history.push(`${pathName}/back-mmea/detail-8-9/${id}`);
  };

  render() {
    return (
      <>
        <Container menuName="Buku Rekening Cukai" contentName="BACK MMEA" hideContentHeader>
          <Header>{this.state.subtitle}</Header>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
            <Row>
              <Col span={6}>
                <ButtonCustom
                  variant="info"
                  onClick={() => this.props.history.push(`${pathName}/back-mmea/rekam-8-9`)}
                  block
                >
                  + Perekaman BACK 8 & 9
                </ButtonCustom>
              </Col>
            </Row>

            <div style={{ marginTop: 30, marginBottom: 20 }}>
              <Table
                dataSource={this.state.dataSource}
                columns={this.state.columns}
                loading={this.state.isBackMmeaLoading}
                pagination={{ current: this.state.page, total: this.state.totalData }}
                onChange={(page) => this.setState({ page: page.current })}
                scroll={{ x: "max-content" }}
              />
            </div>
          </div>
        </Container>
      </>
    );
  }
}
