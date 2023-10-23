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

      filter: {
        nomorSkep: null,
        tanggalSkep: null,
        tanggalAwalBerlaku: null,
        tanggalAkhirBerlaku: null,
        namaJenisBkc: null,
        namaJenisReferensi: null,
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
                  onClick={() => this.handleEdit(record.idSkepHeader, record.idJenisReferensi)}
                />
                <ButtonCustom
                  icon="eye"
                  variant="info"
                  onClick={() => this.handleDetail(record.idSkepHeader, record.idJenisReferensi)}
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
          key: "nomorSkep",
          title: "Nomor Surat",
          dataIndex: "nomorSkep",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("nomorSkep"),
        },
        {
          key: "tanggalSkep",
          title: "Tanggal Surat",
          dataIndex: "tanggalSkep",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggalSkep"),
        },
        {
          key: "tanggalAwalBerlaku",
          title: "Awal Berlaku",
          dataIndex: "tanggalAwalBerlaku",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggalAwalBerlaku"),
        },
        {
          key: "tanggalAkhirBerlaku",
          title: "Akhir Berlaku",
          dataIndex: "tanggalAkhirBerlaku",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggalAkhirBerlaku"),
        },
        {
          key: "namaJenisBkc",
          title: "Jenis BKC",
          dataIndex: "namaJenisBkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("namaJenisBkc"),
        },
        {
          key: "namaJenisReferensi",
          title: "Jenis Referensi",
          dataIndex: "namaJenisReferensi",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("namaJenisReferensi"),
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
      nomorSkep,
      tanggalSkep,
      tanggalAwalBerlaku,
      tanggalAkhirBerlaku,
      namaJenisBkc,
      namaJenisReferensi,
    } = this.state.filter;

    const payload = { page: this.state.page };

    if (nomorSkep) payload.nomorSkep = nomorSkep;
    if (tanggalSkep) payload.tanggalSkep = moment(tanggalSkep, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (tanggalAwalBerlaku)
      payload.tanggalAwalBerlaku = moment(tanggalAwalBerlaku, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (tanggalAkhirBerlaku)
      payload.tanggalAkhirBerlaku = moment(tanggalAkhirBerlaku, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (namaJenisBkc) payload.namaJenisBkc = namaJenisBkc;
    if (namaJenisReferensi) payload.namaJenisReferensi = namaJenisReferensi;

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/browse",
      params: payload,
      setLoading: (bool) => this.setState({ isReferensiTarifPitaCukaiLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        ...item,
        key: `referensi-${index}`,
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
          value={this.state.filter[dataIndex]}
          onChange={(e) =>
            this.setState({ filter: { ...this.state.filter, [dataIndex]: e.target.value } })
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
      { filter: { ...this.state.filter, [dataIndex]: null }, page: 1 },
      this.getReferensiTarifPitaCukai
    );
  };

  handleEdit = (idSkepHeader, idJenisReferensi) => {
    switch (true) {
      case idJenisReferensi === 3:
      case idJenisReferensi === 4:
        this.props.history.push(
          `${pathName}/referensi-tarif-warna/referensi-warna-edit/${idSkepHeader}`
        );
        break;
      case idJenisReferensi === 2:
      case idJenisReferensi === 5:
      case idJenisReferensi === 6:
      case idJenisReferensi === 8:
        this.props.history.push(
          `${pathName}/referensi-tarif-warna/referensi-tarif-edit/${idSkepHeader}`
        );
        break;
      default:
        window.location.href = `${baseUrlCeisaInhouse}/referensi-penyediaan-pita-cukai/edit/${idSkepHeader}`;
        break;
    }
  };
  handleDetail = (idSkepHeader, idJenisReferensi) => {
    switch (true) {
      case idJenisReferensi === 3:
      case idJenisReferensi === 4:
        this.props.history.push(
          `${pathName}/referensi-tarif-warna/referensi-warna-detail/${idSkepHeader}`
        );
        break;
      case idJenisReferensi === 2:
      case idJenisReferensi === 5:
      case idJenisReferensi === 6:
      case idJenisReferensi === 8:
        this.props.history.push(
          `${pathName}/referensi-tarif-warna/referensi-tarif-detail/${idSkepHeader}`
        );
        break;
      default:
        window.location.href = `${baseUrlCeisaInhouse}/referensi-penyediaan-pita-cukai/detail/${idSkepHeader}`;
        break;
    }
  };

  render() {
    return (
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

        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isReferensiTarifPitaCukaiLoading}
          pagination={{ current: this.state.page, total: this.state.totalData }}
          onChange={(page) => this.setState({ page: page.current })}
          scroll={{ x: "max-content" }}
          style={{ marginTop: 30, marginBottom: 20 }}
        />
      </Container>
    );
  }
}
