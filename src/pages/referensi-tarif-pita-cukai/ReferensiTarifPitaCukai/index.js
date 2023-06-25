import React, { Component } from "react";
import { Button, Row, Input, Icon, Table, Col } from "antd";
import Container from "components/Container";
import { pathName } from "configs/constants";
import { requestApi } from "utils/requestApi";
import moment from "moment";
export default class ReferensiTarifPitaCukai extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReferensiTarifPitaCukaiLoading: true,

      page: 1,
      totalData: 0,

      table: {
        nomor_surat: "",
        tanggal_surat: "",
        awal_berlaku: "",
        akhir_berlaku: "",
        jenis_bkc_name: "",
        jenis_referensi_name: "",
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
              <Button
                icon="form"
                type="primary"
                onClick={() => this.handleEdit(record.id, record.jenis_referensi_id)}
              />
              <Button
                icon="eye"
                type="default"
                onClick={() => this.handleDetail(record.id, record.jenis_referensi_id)}
              />
            </div>
          ),
        },
        {
          key: "nomor",
          title: "Nomor",
          dataIndex: "nomor",
          editable: true,
          render: (text, record, index) => (
            <div style={{ textAlign: "center" }}>{index + 1 + (this.state.page - 1) * 10}</div>
          ),
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
          key: "jenis_bkc_name",
          title: "Jenis BKC",
          dataIndex: "jenis_bkc_name",
          editable: true,
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenis_bkc_name"),
        },
        {
          key: "jenis_referensi_name",
          title: "Jenis Referensi",
          dataIndex: "jenis_referensi_name",
          editable: true,
          render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
          ...this.getColumnSearchProps("jenis_referensi_name"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getReferensiTarifPitaCukai();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getReferensiTarifPitaCukai();
    }
  }

  getReferensiTarifPitaCukai = async () => {
    const {
      nomor_surat,
      tanggal_surat,
      awal_berlaku,
      akhir_berlaku,
      jenis_bkc_name,
      jenis_referensi_name,
    } = this.state.table;

    const payload = { page: this.state.page };

    if (nomor_surat) payload.nomorSurat = nomor_surat;
    if (tanggal_surat) payload.tanggalSurat = moment(tanggal_surat).format("YYYY-MM-DD");
    if (awal_berlaku) payload.awalBerlaku = moment(awal_berlaku).format("YYYY-MM-DD");
    if (akhir_berlaku) payload.akhirBerlaku = moment(akhir_berlaku).format("YYYY-MM-DD");
    if (jenis_bkc_name) payload.jenisBkc = jenis_bkc_name;
    if (jenis_referensi_name) payload.jenisReferensi = jenis_referensi_name;

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/browse",
      params: payload,
      setLoading: (bool) => this.setState({ isReferensiTarifPitaCukaiLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item) => ({
        key: item.idReferensiSkep,
        referensi_skep_id: item.idReferensiSkep,
        nomor_surat: item.nomorSurat,
        tanggal_surat: item.tanggalSurat,
        awal_berlaku: item.awalBerlaku,
        akhir_berlaku: item.akhirBerlaku,
        jenis_bkc_id: item.idJenisBkc,
        jenis_bkc_name: item.namaJenisBkc,
        jenis_referensi_id: item.idJenisReferensi,
        jenis_referensi_name: item.namaJenisReferensi,
      }));
      const page = response.data.currentPage;
      const totalData = response.data.totalData;
      this.setState({ dataSource: newData, page, totalData });
    }
  };

  getColumnSearchProps = (dataIndex) => ({
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
    this.getReferensiTarifPitaCukai();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.table, [dataIndex]: "" } });
    this.getReferensiTarifPitaCukai();
  };

  handleEdit = (id, jenisReferensiid) => {
    switch (true) {
      case jenisReferensiid === 3 || jenisReferensiid === 4:
        this.props.history.push(`${pathName}/referensi-tarif-warna/referensi-warna-edit/${id}`);
        break;
      case jenisReferensiid === 1 ||
        jenisReferensiid === 2 ||
        jenisReferensiid === 5 ||
        jenisReferensiid === 6 ||
        jenisReferensiid === 8:
        this.props.history.push(`${pathName}/referensi-tarif-warna/referensi-tarif-edit/${id}`);
        break;
      default:
        this.props.history.push(`/referensi-penyediaan-pita-cukai`);
        break;
    }
  };
  handleDetail = (id, jenisReferensiid) => {
    switch (true) {
      case jenisReferensiid === 3 || jenisReferensiid === 4:
        this.props.history.push(`${pathName}/referensi-tarif-warna/referensi-warna-detail/${id}`);
        break;
      case jenisReferensiid === 1 ||
        jenisReferensiid === 2 ||
        jenisReferensiid === 5 ||
        jenisReferensiid === 6 ||
        jenisReferensiid === 8:
        this.props.history.push(`${pathName}/referensi-tarif-warna/referensi-tarif-detail/${id}`);
        break;
      default:
        this.props.history.push(`/referensi-penyediaan-pita-cukai`);
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
                    onClick={() => this.props.history.push(`/referensi-penyediaan-pita-cukai`)}
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
              loading={this.state.isReferensiTarifPitaCukaiLoading}
              pagination={{ current: this.state.page, total: this.state.totalData }}
              scroll={{ x: "max-content" }}
            />
          </div>
        </Container>
      </>
    );
  }
}
