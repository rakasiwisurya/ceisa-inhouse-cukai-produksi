import { Button, Col, Icon, Input, Row, Table } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import { baseUrlCeisaInhouse, pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class ReferensiTarifPitaCukai extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReferensiTarifPitaCukaiLoading: true,

      page: 1,
      totalData: 0,

      table: {
        nomor_surat: null,
        tanggal_surat: null,
        awal_berlaku: null,
        akhir_berlaku: null,
        jenis_bkc_name: null,
        jenis_referensi_name: null,
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
                  onClick={() =>
                    this.handleEdit(record.referensi_skep_id, record.jenis_referensi_id)
                  }
                />
                <ButtonCustom
                  icon="eye"
                  variant="info"
                  onClick={() =>
                    this.handleDetail(record.referensi_skep_id, record.jenis_referensi_id)
                  }
                />
              </>
            </div>
          ),
        },
        {
          key: "nomor",
          title: "Nomor",
          dataIndex: "nomor",
          render: (text, record, index) => (
            <div style={{ textAlign: "center" }}>{index + 1 + (this.state.page - 1) * 10}</div>
          ),
        },
        {
          key: "nomor_surat",
          title: "Nomor Surat",
          dataIndex: "nomor_surat",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("nomor_surat"),
        },
        {
          key: "tanggal_surat",
          title: "Tanggal Surat",
          dataIndex: "tanggal_surat",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggal_surat"),
        },
        {
          key: "awal_berlaku",
          title: "Awal Berlaku",
          dataIndex: "awal_berlaku",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
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
              {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("akhir_berlaku"),
        },
        {
          key: "jenis_bkc_name",
          title: "Jenis BKC",
          dataIndex: "jenis_bkc_name",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("jenis_bkc_name"),
        },
        {
          key: "jenis_referensi_name",
          title: "Jenis Referensi",
          dataIndex: "jenis_referensi_name",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
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

    if (nomor_surat) payload.nomorSkep = nomor_surat;
    if (tanggal_surat)
      payload.tanggalSkep = moment(tanggal_surat, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (awal_berlaku)
      payload.tanggalAwalBerlaku = moment(awal_berlaku, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (akhir_berlaku)
      payload.tanggalAkhirBerlaku = moment(akhir_berlaku, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (jenis_bkc_name) payload.namaJenisBkc = jenis_bkc_name;
    if (jenis_referensi_name) payload.namaJenisReferensi = jenis_referensi_name;

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/browse",
      params: payload,
      setLoading: (bool) => this.setState({ isReferensiTarifPitaCukaiLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `referensi-${index}`,
        referensi_skep_id: item.idSkepHeader,
        nomor_surat: item.nomorSkep,
        tanggal_surat: item.tanggalSkep,
        awal_berlaku: item.tanggalAwalBerlaku,
        akhir_berlaku: item.tanggalAkhirBerlaku,
        jenis_bkc_id: item.idJenisBkc,
        jenis_bkc_name: item.namaJenisBkc,
        jenis_referensi_id: item.idJenisReferensi,
        jenis_referensi_name: item.namaJenisReferensi,
      }));
      const page = response.data.data.currentPage;
      const totalData = response.data.data.totalData;
      this.setState({ dataSource: newData, page, totalData });
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
    this.setState({ page: 1 }, this.getReferensiTarifPitaCukai);
  };
  handleColumnReset = (clearFilters, dataIndex) => {
    clearFilters();
    this.setState(
      { table: { ...this.state.table, [dataIndex]: null }, page: 1 },
      this.getReferensiTarifPitaCukai
    );
  };

  handleEdit = (referensiSkepId, jenisReferensiid) => {
    switch (true) {
      case jenisReferensiid === 3 || jenisReferensiid === 4:
        this.props.history.push(
          `${pathName}/referensi-tarif-warna/referensi-warna-edit/${referensiSkepId}`
        );
        break;
      case jenisReferensiid === 2 ||
        jenisReferensiid === 5 ||
        jenisReferensiid === 6 ||
        jenisReferensiid === 8:
        this.props.history.push(
          `${pathName}/referensi-tarif-warna/referensi-tarif-edit/${referensiSkepId}`
        );
        break;
      default:
        window.location.href = `${baseUrlCeisaInhouse}/referensi-penyediaan-pita-cukai/edit/${referensiSkepId}`;
        break;
    }
  };
  handleDetail = (referensiSkepId, jenisReferensiid) => {
    switch (true) {
      case jenisReferensiid === 3 || jenisReferensiid === 4:
        this.props.history.push(
          `${pathName}/referensi-tarif-warna/referensi-warna-detail/${referensiSkepId}`
        );
        break;
      case jenisReferensiid === 2 ||
        jenisReferensiid === 5 ||
        jenisReferensiid === 6 ||
        jenisReferensiid === 8:
        this.props.history.push(
          `${pathName}/referensi-tarif-warna/referensi-tarif-detail/${referensiSkepId}`
        );
        break;
      default:
        window.location.href = `${baseUrlCeisaInhouse}/referensi-penyediaan-pita-cukai/detail/${referensiSkepId}`;
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
                  <ButtonCustom
                    variant="info"
                    onClick={() =>
                      this.props.history.push(
                        `${pathName}/referensi-tarif-warna/referensi-warna-rekam`
                      )
                    }
                    block
                  >
                    + Referensi Warna
                  </ButtonCustom>
                </Col>

                <Col span={8}>
                  <ButtonCustom
                    variant="warning"
                    onClick={() =>
                      this.props.history.push(
                        `${pathName}/referensi-tarif-warna/referensi-tarif-rekam`
                      )
                    }
                    block
                  >
                    + Referensi Tarif
                  </ButtonCustom>
                </Col>

                <Col span={8}>
                  <ButtonCustom
                    variant="danger"
                    onClick={() => {
                      window.location.href = `${baseUrlCeisaInhouse}/referensi-penyediaan-pita-cukai/rekam`;
                    }}
                    block
                  >
                    + Referensi Tanggal
                  </ButtonCustom>
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
              onChange={(page) => this.setState({ page: page.current })}
              scroll={{ x: "max-content" }}
            />
          </div>
        </Container>
      </>
    );
  }
}
