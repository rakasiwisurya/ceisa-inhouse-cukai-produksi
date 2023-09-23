import { Button, Col, Icon, Input, Modal, Row, Table } from "antd";
import Container from "components/Container";
import React, { Component } from "react";
import Header from "components/Header";
import { pathName } from "configs/constants";
import { requestApi } from "utils/requestApi";
import ButtonCustom from "components/Button/ButtonCustom";
import moment from "moment";

export default class CK4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "CK4",

      isCk4Loading: true,

      page: 1,
      totalData: 0,

      table: {
        kppbc: null,
        nppbkc: null,
        nama_perusahaan: null,
        tanggal_pemberitahuan: null,
        tanggal_produksi_awal: null,
        tanggal_produksi_akhir: null,
        jumlah_produksi_lt: null,
        jumlah_produksi_btg: null,
        jumlah_produksi_gram: null,
        status: null,
      },

      dataSource: [],
      columns: [
        {
          title: "Aksi",
          dataIndex: "aksi",
          key: "aksi",
          fixed: "left",
          render: (text, record, index) => (
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <ButtonCustom
                variant="warning"
                icon="form"
                onClick={() => {
                  if (record.isAlert) return this.handleConfirm();
                  this.handleEdit(record.idCk4, record.jenisBkc);
                }}
                disabled={record.idBrck2 || record.idBrck1}
              />
              <ButtonCustom
                variant="info"
                icon="eye"
                onClick={() => this.handleDetail(record.idCk4, record.jenisBkc)}
              />
            </div>
          ),
        },
        {
          title: "KPPBC",
          dataIndex: "kppbc",
          key: "kppbc",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("kppbc"),
        },
        {
          title: "NPPBKC",
          dataIndex: "nppbkc",
          key: "nppbkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nppbkc"),
        },
        {
          title: "Nama Perusahaan",
          dataIndex: "nama_perusahaan",
          key: "nama_perusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("nama_perusahaan"),
        },
        {
          title: "Tanggal Pemberitahuan",
          dataIndex: "tanggal_pemberitahuan",
          key: "tanggal_pemberitahuan",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggal_pemberitahuan"),
        },
        {
          title: "Tanggal Produksi Awal",
          dataIndex: "tanggal_produksi_awal",
          key: "tanggal_produksi_awal",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggal_produksi_awal"),
        },
        {
          title: "Tanggal Produksi Akhir",
          dataIndex: "tanggal_produksi_akhir",
          key: "tanggal_produksi_akhir",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggal_produksi_akhir"),
        },
        {
          title: "Jumlah Produksi (lt)",
          dataIndex: "jumlah_produksi_lt",
          key: "jumlah_produksi_lt",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("jumlah_produksi_lt"),
        },
        {
          title: "Jumlah Produksi (btg)",
          dataIndex: "jumlah_produksi_btg",
          key: "jumlah_produksi_btg",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("jumlah_produksi_btg"),
        },
        {
          title: "Jumlah Produksi (gram)",
          dataIndex: "jumlah_produksi_gram",
          key: "jumlah_produksi_gram",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("jumlah_produksi_gram"),
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("status"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getCk4();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getCk4();
    }
  }

  getCk4 = async () => {
    const {
      kppbc,
      nppbkc,
      nama_perusahaan,
      tanggal_pemberitahuan,
      tanggal_produksi_awal,
      tanggal_produksi_akhir,
      jumlah_produksi_lt,
      jumlah_produksi_btg,
      jumlah_produksi_gram,
      status,
    } = this.state.table;

    const payload = { page: this.state.page };

    if (kppbc) payload.kppbc = kppbc;
    if (nppbkc) payload.nppbkc = nppbkc;
    if (nama_perusahaan) payload.namaPerusahaan = nama_perusahaan;
    if (tanggal_pemberitahuan)
      payload.tanggalPemberitahuan = moment(tanggal_pemberitahuan, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );
    if (tanggal_produksi_awal)
      payload.tanggalProduksiAwal = moment(tanggal_produksi_awal, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );
    if (tanggal_produksi_akhir)
      payload.tanggalProduksiAkhir = moment(tanggal_produksi_akhir, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );
    if (jumlah_produksi_lt) payload.jumlahProduksiLt = jumlah_produksi_lt;
    if (jumlah_produksi_btg) payload.jumlahProduksiBtg = jumlah_produksi_btg;
    if (jumlah_produksi_gram) payload.jumlahProduksiGram = jumlah_produksi_gram;
    if (status) payload.status = status;

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/ck4/browse",
      params: payload,
      setLoading: (bool) => this.setState({ isCk4Loading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `ck4-${index}`,
        idCk4: item.idCk4,
        kppbc: item.kppbc,
        nppbkc: item.nppbkc,
        jenisBkc: item.jenisBkc,
        nama_perusahaan: item.namaPerusahaan,
        tanggal_pemberitahuan: item.tanggalPemberitahuan,
        tanggal_produksi_awal: item.tanggalProduksiAwal,
        tanggal_produksi_akhir: item.tanggalProduksiAkhir,
        jumlah_produksi_lt: item.jumlahProduksiLt,
        jumlah_produksi_btg: item.jumlahProduksiBtg,
        jumlah_produksi_gram: item.jumlahProduksiGram,
        status: item.status,
      }));

      const page = response.data.data.currentPage;
      const totalData = response.data.data.totalData;
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
    this.getCk4();
  };
  handleColumnReset = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table: { ...this.state.table, [dataIndex]: null } });
    this.getCk4();
  };

  handleDetail = (id, jenisBkc) => {
    switch (true) {
      case jenisBkc === "EA":
        this.props.history.push(`${pathName}/laporan-ck4/ck4-ea-detail/${id}`);
        break;
      case jenisBkc === "MMEA":
        this.props.history.push(`${pathName}/laporan-ck4/ck4-mmea-detail/${id}`);
        break;
      default:
        this.props.history.push(`${pathName}/laporan-ck4/ck4-ht-detail/${id}`);
        break;
    }
  };
  handleEdit = (id, jenisBkc) => {
    switch (true) {
      case jenisBkc === "EA":
        this.props.history.push(`${pathName}/laporan-ck4/ck4-ea-perbaikan/${id}`);
        break;
      case jenisBkc === "MMEA":
        this.props.history.push(`${pathName}/laporan-ck4/ck4-mmea-perbaikan/${id}`);
        break;
      default:
        this.props.history.push(`${pathName}/laporan-ck4/ck4-ht-perbaikan/${id}`);
        break;
    }
  };
  handleConfirm = () => {
    Modal.confirm({
      icon: <Icon type="warning" />,
      title: "Alert",
      content:
        "CK-4 ini sudah lewat batas waktu perbaikan 3 bulan sejak tanggal pemberitahuan. Perbaikan atas jumlah produksi dapat dikenai sanksi terkait tidak memberitahukan barang kena cukai yang selesai dibuat, atau dilakukan penurunan nilai tingkat kepatuhan Pengusaha Pabrik. Apakah yakin akan melanjutkan perbaikan?",
      okText: "Continue",
      onOk: this.handleEdit,
      cancelText: "Cancel",
      centered: true,
      width: 600,
    });
  };

  render() {
    return (
      <>
        <Container menuName="Laporan Produksi BKC" contentName="CK4" hideContentHeader>
          <Header>{this.state.subtitle1}</Header>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <ButtonCustom
                      variant="info"
                      onClick={() =>
                        this.props.history.push(`${pathName}/laporan-ck4/ck4-ea-rekam`)
                      }
                      block
                    >
                      CK4A Rekam
                    </ButtonCustom>
                  </Col>

                  <Col span={8}>
                    <ButtonCustom
                      variant="warning"
                      onClick={() =>
                        this.props.history.push(`${pathName}/laporan-ck4/ck4-mmea-rekam`)
                      }
                      block
                    >
                      CK4B Rekam
                    </ButtonCustom>
                  </Col>

                  <Col span={8}>
                    <ButtonCustom
                      variant="danger"
                      onClick={() =>
                        this.props.history.push(`${pathName}/laporan-ck4/ck4-ht-rekam`)
                      }
                      block
                    >
                      CK4C Rekam
                    </ButtonCustom>
                  </Col>
                </Row>
              </Col>
            </Row>

            <div style={{ marginTop: 30, marginBottom: 20 }}>
              <Table
                dataSource={this.state.dataSource}
                columns={this.state.columns}
                loading={this.state.isCk4Loading}
                onChange={(page) => this.setState({ page: page.current })}
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
