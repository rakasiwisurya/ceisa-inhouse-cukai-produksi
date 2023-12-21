import { Button, Col, Dropdown, Icon, Input, Menu, Modal, Row, Table, Tag } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import { endpoints, pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { capitalize } from "utils/formatter";
import { requestApi } from "utils/requestApi";
import ModalTandaTerimaCK4Pdf from "../ModalTandaTerimaCK4Pdf";
import ModalCetakanCK4Pdf from "../ModalCetakanCK4Pdf";

export default class CK4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "CK4",

      isCk4Loading: true,
      isCk4DetailLoading: false,
      isModalPdfTandaTerimaVisible: false,
      isModalPdfCetakCk4Visible: false,

      pdfContent: {},

      page: 1,
      totalData: 0,

      filter: {
        kppbc: null,
        nppbkc: null,
        namaPerusahaan: null,
        tanggalPemberitahuan: null,
        tanggalProduksiAwal: null,
        tanggalProduksiAkhir: null,
        jumlahProduksiLiter: null,
        jumlahProduksiBtg: null,
        jumlahProduksiGram: null,
        status: null,
      },

      dataSource: [],
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
      namaPerusahaan,
      tanggalPemberitahuan,
      tanggalProduksiAwal,
      tanggalProduksiAkhir,
      jumlahProduksiLiter,
      jumlahProduksiBtg,
      jumlahProduksiGram,
      status,
    } = this.state.filter;
    const payload = { page: this.state.page };

    if (kppbc) payload.kppbc = kppbc;
    if (nppbkc) payload.nppbkc = nppbkc;
    if (namaPerusahaan) payload.namaPerusahaan = namaPerusahaan;
    if (tanggalPemberitahuan)
      payload.tanggalPemberitahuan = moment(tanggalPemberitahuan, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );
    if (tanggalProduksiAwal)
      payload.tanggalProduksiAwal = moment(tanggalProduksiAwal, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (tanggalProduksiAkhir)
      payload.tanggalProduksiAkhir = moment(tanggalProduksiAkhir, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );
    if (jumlahProduksiLiter) payload.jumlahProduksiLiter = jumlahProduksiLiter;
    if (jumlahProduksiBtg) payload.jumlahProduksiBtg = jumlahProduksiBtg;
    if (jumlahProduksiGram) payload.jumlahProduksiGram = jumlahProduksiGram;
    if (status) payload.status = status;

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: endpoints.ck4Browse,
      params: payload,
      setLoading: (bool) => this.setState({ isCk4Loading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        ...item,
        key: `ck4-${index}`,
        jenisLaporan: String(item.jenisLaporan).toUpperCase(),
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
          value={this.state.filter[dataIndex]}
          onChange={(e) =>
            this.setState({
              filter: { ...this.state.filter, [dataIndex]: e.target.value },
            })
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
    this.setState({ page: 1 }, this.getCk4);
  };
  handleColumnReset = (clearFilters, dataIndex) => {
    clearFilters();
    this.setState({ filter: { ...this.state.filter, [dataIndex]: null }, page: 1 }, this.getCk4);
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
    Modal.destroyAll();

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
  handleBatal = (id, jenisBkc) => {
    switch (true) {
      case jenisBkc === "EA":
        this.props.history.push(`${pathName}/laporan-ck4/ck4-ea/pembatalan/${id}`);
        break;
      case jenisBkc === "MMEA":
        this.props.history.push(`${pathName}/laporan-ck4/ck4-mmea/pembatalan/${id}`);
        break;
      default:
        this.props.history.push(`${pathName}/laporan-ck4/ck4-ht/pembatalan/${id}`);
        break;
    }
  };
  handleResponTandaTerimaPdf = (rowData) => {
    const {
      nomorPemberitahuan,
      tanggalPemberitahuan,
      nppbkc,
      namaPerusahaan,
      alamatPerusahaan,
      jenisLaporan,
      tanggalProduksiAwal,
      periodeBulan,
      periodeTahun,
      waktuRekam,
    } = rowData;

    this.setState({
      pdfContent: {
        nomorPemberitahuan,
        tanggalPemberitahuan: moment(tanggalPemberitahuan).format("DD MMMM YYYY"),
        nppbkc,
        namaPerusahaan,
        alamatPerusahaan,
        waktuRekam: moment(waktuRekam).format("dddd, DD/MM/YYYY, HH:mm"),
        jenisLaporan,
        tanggalProduksi: moment(tanggalProduksiAwal).format("DD MMMM YYYY"),
        periodeBulan: capitalize(periodeBulan),
        periodeTahun: periodeTahun,
      },
      isModalPdfTandaTerimaVisible: true,
    });
  };
  handleCetakCk4Pdf = async (rowData) => {
    const {
      idCk4,
      jenisBkc,
      nomorPemberitahuan,
      tanggalPemberitahuan,
      nppbkc,
      namaPerusahaan,
      alamatPerusahaan,
      jenisLaporan,
      tanggalProduksiAwal,
      tanggalProduksiAkhir,
      tanggalJamProduksiAwal,
      tanggalJamProduksiAkhir,
      jumlahKemasan,
      jumlahProduksiLiter,
      jumlahProduksiBtg,
      jumlahProduksiGram,
      jumlahKemasanDilekatiPita,
      namaPengusaha,
      kota,
      waktuRekam,
    } = rowData;

    const payload = { idCk4Header: idCk4 };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: endpoints.ck4BrowseDetail,
      params: payload,
      setLoading: (bool) => this.setState({ isCk4DetailLoading: bool }),
    });

    if (response) {
      const details = response.data.data;

      this.setState({
        pdfContent: {
          jenisBkc,
          nomorPemberitahuan,
          tanggalPemberitahuan: moment(tanggalPemberitahuan).format("DD MMMM YYYY"),
          nppbkc,
          namaPerusahaan,
          alamatPerusahaan,
          jenisLaporan,
          tanggalProduksiAwal: moment(tanggalProduksiAwal).format("[tanggal] DD-MM-YYYY"),
          tanggalProduksiAkhir: moment(tanggalProduksiAkhir).format("[tanggal] DD-MM-YYYY"),
          tanggalJamProduksiAwal: moment(tanggalJamProduksiAwal).format(
            "[tanggal] DD-MM-YYYY [jam] HH:mm"
          ),
          tanggalJamProduksiAkhir: moment(tanggalJamProduksiAkhir).format(
            "[tanggal] DD-MM-YYYY [jam] HH:mm"
          ),
          jumlahKemasan,
          jumlahProduksiLiter,
          jumlahProduksiBtg,
          jumlahProduksiGram,
          jumlahKemasanDilekatiPita,
          namaPengusaha,
          kota,
          waktuRekam: moment(waktuRekam).format("dddd, DD/MM/YYYY, HH:mm"),
          details,
        },
        isModalPdfCetakCk4Visible: true,
        isCk4DetailLoading: false,
      });
    }
  };
  handleConfirm = (id, jenisBkc) => {
    Modal.confirm({
      icon: <Icon type="warning" />,
      title: "Alert",
      content:
        "CK-4 ini sudah lewat batas waktu perbaikan 3 bulan sejak tanggal pemberitahuan. Perbaikan atas jumlah produksi dapat dikenai sanksi terkait tidak memberitahukan barang kena cukai yang selesai dibuat, atau dilakukan penurunan nilai tingkat kepatuhan Pengusaha Pabrik. Apakah yakin akan melanjutkan perbaikan?",
      okText: "Continue",
      onOk: () => this.handleEdit(id, jenisBkc),
      cancelText: "Cancel",
      centered: true,
      width: 600,
    });
  };

  render() {
    const menu = ({ record, onTandaTerima, onCetakCk4 }) => (
      <Menu>
        <Menu.Item
          onClick={() => onTandaTerima(record)}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Icon type="printer" /> Respon Tanda Terima
        </Menu.Item>
        <Menu.Item
          onClick={() => onCetakCk4(record)}
          style={{ display: "flex", alignItems: "center" }}
        >
          {this.state.isCk4DetailLoading ? <Icon type="loading" /> : <Icon type="printer" />}{" "}
          Cetakan CK4
        </Menu.Item>
      </Menu>
    );

    const columns = [
      {
        title: "Aksi",
        dataIndex: "aksi",
        key: "aksi",
        fixed: "left",
        render: (text, record, index) => (
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <ButtonCustom
              variant="info"
              icon="eye"
              onClick={() => this.handleDetail(record.idCk4, record.jenisBkc)}
            />
            <ButtonCustom
              variant="warning"
              icon="form"
              onClick={() => {
                if (record.isAlert) return this.handleConfirm(record.idCk4, record.jenisBkc);
                this.handleEdit(record.idCk4, record.jenisBkc);
              }}
              disabled={record.idBrck2 || record.idBrck1}
            />
            <ButtonCustom
              variant="danger"
              icon="to-top"
              onClick={() => this.handleBatal(record.idCk4, record.jenisBkc)}
            />
            <Dropdown
              overlay={() =>
                menu({
                  record,
                  onTandaTerima: this.handleResponTandaTerimaPdf,
                  onCetakCk4: this.handleCetakCk4Pdf,
                })
              }
              trigger={["click"]}
            >
              <ButtonCustom variant="danger" icon="file-pdf" />
            </Dropdown>
          </div>
        ),
      },
      {
        title: "KPPBC",
        dataIndex: "kppbc",
        key: "kppbc",
        render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
        ...this.getColumnSearchProps("kppbc"),
      },
      {
        title: "NPPBKC",
        dataIndex: "nppbkc",
        key: "nppbkc",
        render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
        ...this.getColumnSearchProps("nppbkc"),
      },
      {
        title: "Nama Perusahaan",
        dataIndex: "namaPerusahaan",
        key: "namaPerusahaan",
        render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
        ...this.getColumnSearchProps("namaPerusahaan"),
      },
      {
        title: "Tanggal Pemberitahuan",
        dataIndex: "tanggalPemberitahuan",
        key: "tanggalPemberitahuan",
        render: (text) => (
          <div style={{ textAlign: "center" }}>
            {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
          </div>
        ),
        ...this.getColumnSearchProps("tanggalPemberitahuan"),
      },
      {
        title: "Tanggal Produksi Awal",
        dataIndex: "tanggalProduksiAwal",
        key: "tanggalProduksiAwal",
        render: (text) => (
          <div style={{ textAlign: "center" }}>
            {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
          </div>
        ),
        ...this.getColumnSearchProps("tanggalProduksiAwal"),
      },
      {
        title: "Tanggal Produksi Akhir",
        dataIndex: "tanggalProduksiAkhir",
        key: "tanggalProduksiAkhir",
        render: (text) => (
          <div style={{ textAlign: "center" }}>
            {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
          </div>
        ),
        ...this.getColumnSearchProps("tanggalProduksiAkhir"),
      },
      {
        title: "Jumlah Produksi (lt)",
        dataIndex: "jumlahProduksiLiter",
        key: "jumlahProduksiLiter",
        render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
        ...this.getColumnSearchProps("jumlahProduksiLiter"),
      },
      {
        title: "Jumlah Produksi (btg)",
        dataIndex: "jumlahProduksiBtg",
        key: "jumlahProduksiBtg",
        render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
        ...this.getColumnSearchProps("jumlahProduksiBtg"),
      },
      {
        title: "Jumlah Produksi (gram)",
        dataIndex: "jumlahProduksiGram",
        key: "jumlahProduksiGram",
        render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
        ...this.getColumnSearchProps("jumlahProduksiGram"),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (text) => (
          <div style={{ textAlign: "center" }}>
            {text !== null ? (
              <Tag
                color={
                  text === "Selesai" || text === "Selesai (Perbaikan)" || text === "Perekaman"
                    ? "green"
                    : text === "Persetujuan Perbaikan" || text === "Persetujuan Pembatalan"
                    ? "gold"
                    : text === "Selesai (Tolak Perbaikan)" ||
                      text === "Selesai (Tolak Pembatalan)" ||
                      text === "Batal"
                    ? "red"
                    : "blue"
                }
              >
                {text}
              </Tag>
            ) : (
              "-"
            )}
          </div>
        ),
        ...this.getColumnSearchProps("status"),
      },
    ];

    return (
      <>
        <Container menuName="Laporan Produksi BKC" contentName="CK4">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <ButtonCustom
                    variant="info"
                    onClick={() => this.props.history.push(`${pathName}/laporan-ck4/ck4-ea-rekam`)}
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
                    onClick={() => this.props.history.push(`${pathName}/laporan-ck4/ck4-ht-rekam`)}
                    block
                  >
                    CK4C Rekam
                  </ButtonCustom>
                </Col>
              </Row>
            </Col>
          </Row>

          <Table
            dataSource={this.state.dataSource}
            columns={columns}
            loading={this.state.isCk4Loading}
            onChange={(page) => this.setState({ page: page.current })}
            pagination={{ current: this.state.page, total: this.state.totalData }}
            scroll={{ x: "max-content" }}
            style={{ marginTop: 30 }}
          />

          <ModalTandaTerimaCK4Pdf
            isVisible={this.state.isModalPdfTandaTerimaVisible}
            onCancel={() => this.setState({ isModalPdfTandaTerimaVisible: false, pdfContent: {} })}
            pdfContent={this.state.pdfContent}
          />

          <ModalCetakanCK4Pdf
            isVisible={this.state.isModalPdfCetakCk4Visible}
            onCancel={() =>
              this.setState({
                isModalPdfCetakCk4Visible: false,
                isCk4DetailLoading: false,
                pdfContent: {},
              })
            }
            isLoading={this.state.isCk4DetailLoading}
            pdfContent={this.state.pdfContent}
          />
        </Container>
      </>
    );
  }
}
