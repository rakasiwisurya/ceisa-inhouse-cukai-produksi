import React, { Component } from "react";
import { Button, Row, Input, Icon, Table, Col } from "antd";
import Container from "components/Container";
import { pathName } from "configs/constants";
import { requestApi } from "utils/requestApi";
import moment from "moment";
import ButtonCustom from "components/Button/ButtonCustom";
import Header from "components/Header";
import ModalBACKEADetail67 from "../ModalBACKEADetail67";
import ModalBACKEADetail89 from "../ModalBACKEADetail89";

export default class BACKEA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "BACK EA 6 & 7",
      subtitle2: "BACK EA 8 & 9",

      isBackEa67Loading: true,
      isBackEa89Loading: true,
      isModalBackEa67DetailVisible: false,
      isModalBackEa89DetailVisible: false,

      detail67Id: null,
      detail89Id: null,

      page67: 1,
      totalData67: 0,

      page89: 1,
      totalData89: 0,

      filter67: {
        kppbc: null,
        namaPerusahaan: null,
        jenisBack: null,
        nomorBack: null,
        tanggalBack: null,
        jumlahEaSebelumDicampur: null,
        jumlahBahanPencampur: null,
        satuanBahanPencampur: null,
        jenisBahanPencampur: null,
        jumlahHasilAkhirPencampuran: null,
        jenisHasilAkhirPencampuran: null,
      },

      filter89: {
        kppbc: null,
        namaPerusahaan: null,
        jenisBack: null,
        nomorBack: null,
        tanggalBack: null,
        jenisEa: null,
        jumlah: null,
        keterangan: null,
      },

      dataSource67: [],
      columns67: [
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
                  onClick={() => this.handleEdit67(record.idBackEa67Header)}
                />
                <ButtonCustom
                  icon="eye"
                  variant="info"
                  onClick={() => this.handleDetail67(record.idBackEa67Header)}
                />
              </>
            </div>
          ),
        },
        {
          key: "kppbc",
          title: "KPPBC",
          dataIndex: "kppbc",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps67("kppbc"),
        },
        {
          key: "namaPerusahaan",
          title: "Nama Perusahaan",
          dataIndex: "namaPerusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps67("namaPerusahaan"),
        },
        {
          key: "jenisBack",
          title: "Jenis BACK",
          dataIndex: "jenisBack",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps67("jenisBack"),
        },
        {
          key: "nomorBack",
          title: "Nomor BACK",
          dataIndex: "nomorBack",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps67("nomorBack"),
        },
        {
          key: "tanggalBack",
          title: "Tanggal BACK",
          dataIndex: "tanggalBack",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps67("tanggalBack"),
        },
        {
          key: "jumlahEaSebelumDicampur",
          title: "Jumlah EA Sebelum Dicampur/Dirusak (lt)",
          dataIndex: "jumlahEaSebelumDicampur",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps67("jumlahEaSebelumDicampur"),
        },
        {
          title: "Bahan Pencampur/Perusak",
          children: [
            {
              key: "jumlahBahanPencampur",
              title: "Jumlah",
              dataIndex: "jumlahBahanPencampur",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>
              ),
              ...this.getColumnSearchProps67("jumlahBahanPencampur"),
            },
            {
              key: "satuanBahanPencampur",
              title: "Satuan",
              dataIndex: "satuanBahanPencampur",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>
              ),
              ...this.getColumnSearchProps67("satuanBahanPencampur"),
            },
            {
              key: "jenisBahanPencampur",
              title: "Jenis",
              dataIndex: "jenisBahanPencampur",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>
              ),
              ...this.getColumnSearchProps67("jenisBahanPencampur"),
            },
          ],
        },
        {
          title: "Hasil Akhir Pencampuran/Perusakan EA",
          children: [
            {
              key: "jumlahHasilAkhirPencampuran",
              title: "Jumlah (LT)",
              dataIndex: "jumlahHasilAkhirPencampuran",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>
              ),
              ...this.getColumnSearchProps67("jumlahHasilAkhirPencampuran"),
            },
            {
              key: "jenisHasilAkhirPencampuran",
              title: "Jenis",
              dataIndex: "jenisHasilAkhirPencampuran",
              render: (text) => (
                <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>
              ),
              ...this.getColumnSearchProps67("jenisHasilAkhirPencampuran"),
            },
          ],
        },
      ],

      dataSource89: [],
      columns89: [
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
                  onClick={() => this.handleEdit89(record.idBackEa89Header)}
                />
                <ButtonCustom
                  icon="eye"
                  variant="info"
                  onClick={() => this.handleDetail89(record.idBackEa89Header)}
                />
              </>
            </div>
          ),
        },
        {
          key: "kppbc",
          title: "KPPBC",
          dataIndex: "kppbc",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps89("kppbc"),
        },
        {
          key: "namaPerusahaan",
          title: "Nama Perusahaan",
          dataIndex: "namaPerusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps89("namaPerusahaan"),
        },
        {
          key: "jenisBack",
          title: "Jenis BACK",
          dataIndex: "jenisBack",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps89("jenisBack"),
        },
        {
          key: "nomorBack",
          title: "Nomor BACK",
          dataIndex: "nomorBack",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps89("nomorBack"),
        },
        {
          key: "tanggalBack",
          title: "Tanggal BACK",
          dataIndex: "tanggalBack",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps89("tanggalBack"),
        },
        {
          key: "jenisEa",
          title: "Jenis EA",
          dataIndex: "jenisEa",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps89("jenisEa"),
        },
        {
          key: "jumlah",
          title: "Jumlah (Lt)",
          dataIndex: "jumlah",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps89("jumlah"),
        },
        {
          key: "keterangan",
          title: "Keterangan",
          dataIndex: "keterangan",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps89("keterangan"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getBackEa67();
    this.getBackEa89();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page67 !== this.state.page67) {
      this.getBackEa67();
    }

    if (prevState.page89 !== this.state.page89) {
      this.getBackEa89();
    }
  }

  getBackEa67 = async () => {
    const {
      kppbc,
      namaPerusahaan,
      jenisBack,
      nomorBack,
      tanggalBack,
      jumlahEaSebelumDicampur,
      jumlahBahanPencampur,
      satuanBahanPencampur,
      jenisBahanPencampur,
      jumlahHasilAkhirPencampuran,
      jenisHasilAkhirPencampuran,
    } = this.state.filter67;

    const payload = { page: this.state.page67 };

    if (kppbc) payload.namaKantor = kppbc;
    if (namaPerusahaan) payload.namaPerusahaan = namaPerusahaan;
    if (jenisBack) payload.jenisBackEa = jenisBack;
    if (nomorBack) payload.nomorBackEa = nomorBack;
    if (tanggalBack) payload.tanggalBackEa = moment(tanggalBack, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (jumlahEaSebelumDicampur) payload.jumlah = jumlahEaSebelumDicampur;
    if (jumlahBahanPencampur) payload.jumlahPencampur = jumlahBahanPencampur;
    if (satuanBahanPencampur) payload.kodeSatuanPencampur = satuanBahanPencampur;
    if (jenisBahanPencampur) payload.jenisBahanPencampur = jenisBahanPencampur;
    if (jumlahHasilAkhirPencampuran) payload.jumlahSetelah = jumlahHasilAkhirPencampuran;
    if (jenisHasilAkhirPencampuran) payload.hasilAkhir = jenisHasilAkhirPencampuran;

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/back-ea-6-7/browse",
      params: payload,
      setLoading: (bool) => this.setState({ isBackEa67Loading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `back-6-7-${index}`,
        idBackEa67Header: item.idBackEaHeader,
        kppbc: item.namaKantor,
        namaPerusahaan: item.namaPerusahaan,
        jenisBack: item.jenisBackEa,
        nomorBack: item.nomorBackEa,
        tanggalBack: item.tanggalBackEa,
        jumlahEaSebelumDicampur: item.jumlah,
        jumlahBahanPencampur: item.jumlahPencampur,
        satuanBahanPencampur: item.kodeSatuanPencampur,
        jenisBahanPencampur: item.jenisBahanPencampur,
        jumlahHasilAkhirPencampuran: item.jumlahSetelah,
        jenisHasilAkhirPencampuran: item.hasilAkhir,
      }));

      this.setState({
        dataSource67: newData,
        page67: response.data.data.currentPage,
        totalData67: response.data.data.totalData,
      });
    }
  };

  getBackEa89 = async () => {
    const {
      kppbc,
      namaPerusahaan,
      jenisBack,
      nomorBack,
      tanggalBack,
      jenisEa,
      jumlah,
      keterangan,
    } = this.state.filter89;

    const payload = { page: this.state.page89 };

    if (kppbc) payload.namaKantor = kppbc;
    if (namaPerusahaan) payload.namaPerusahaan = namaPerusahaan;
    if (jenisBack) payload.jenisBackEa = jenisBack;
    if (nomorBack) payload.nomorBackEa = nomorBack;
    if (tanggalBack) payload.tanggalBackEa = moment(tanggalBack, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (jenisEa) payload.jenisBkc = jenisEa;
    if (jumlah) payload.jumlah = jumlah;
    if (keterangan) payload.keterangan = keterangan;

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/back-ea-8-9/browse",
      params: payload,
      setLoading: (bool) => this.setState({ isBackEa89Loading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `back-8-9-${index}`,
        idBackEa89Header: item.idBackEaHeader,
        kppbc: item.namaKantor,
        namaPerusahaan: item.namaPerusahaan,
        jenisBack: item.jenisBackEa,
        nomorBack: item.nomorBackEa,
        tanggalBack: item.tanggalBackEa,
        jenisEa: item.jenisBkc,
        jumlah: item.jumlah,
        keterangan: item.keterangan,
      }));

      this.setState({
        dataSource89: newData,
        page89: response.data.data.currentPage,
        totalData89: response.data.data.totalData,
      });
    }
  };

  getColumnSearchProps67 = (dataIndex, inputType) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          value={this.state.filter67[dataIndex]}
          onChange={(e) =>
            this.setState({ filter67: { ...this.state.filter67, [dataIndex]: e.target.value } })
          }
          onPressEnter={() => this.handleColumnSearch67(confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleColumnSearch67(confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleColumnReset67(clearFilters, dataIndex)}
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
  handleColumnSearch67 = (confirm) => {
    confirm();
    this.setState({ page67: 1 }, this.getBackEa67);
  };
  handleColumnReset67 = (clearFilters, dataIndex) => {
    clearFilters();
    this.setState(
      { filter67: { ...this.state.filter67, [dataIndex]: null }, page67: 1 },
      this.getBackEa67
    );
  };

  handleEdit67 = (id) => {
    this.props.history.push(`${pathName}/back-ea/perbaikan-6-7/${id}`);
  };
  handleDetail67 = (id) => {
    this.setState({ detail67Id: id, isModalBackEa67DetailVisible: true });
  };

  getColumnSearchProps89 = (dataIndex, inputType) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          value={this.state.filter89[dataIndex]}
          onChange={(e) =>
            this.setState({ filter89: { ...this.state.filter89, [dataIndex]: e.target.value } })
          }
          onPressEnter={() => this.handleColumnSearch89(confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleColumnSearch89(confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleColumnReset89(clearFilters, dataIndex)}
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
  handleColumnSearch89 = (confirm) => {
    confirm();
    this.setState({ page89: 1 }, this.getBackEa89);
  };
  handleColumnReset89 = (clearFilters, dataIndex) => {
    clearFilters();
    this.setState(
      { filter89: { ...this.state.filter89, [dataIndex]: null }, page89: 1 },
      this.getBackEa89
    );
  };

  handleEdit89 = (id) => {
    this.props.history.push(`${pathName}/back-ea/perbaikan-8-9/${id}`);
  };
  handleDetail89 = (id) => {
    this.setState({ detail89Id: id, isModalBackEa89DetailVisible: true });
  };

  handleModalShow = (visibleState) => {
    this.setState({ [visibleState]: true });
  };
  handleModalClose = (visibleState) => {
    this.setState({ [visibleState]: false });
  };

  render() {
    return (
      <>
        <Container menuName="Buku Rekening Cukai" contentName="BACK EA" hideContentHeader>
          <Header>{this.state.subtitle1}</Header>
          <div
            className="kt-content  kt-grid__item kt-grid__item--fluid"
            id="kt_content"
            style={{ paddingBottom: 10 }}
          >
            <Row>
              <Col span={6}>
                <ButtonCustom
                  variant="info"
                  onClick={() => this.props.history.push(`${pathName}/back-ea/rekam-6-7`)}
                  block
                >
                  + Perekaman BACK 6 &7
                </ButtonCustom>
              </Col>
            </Row>

            <div style={{ marginTop: 30, marginBottom: 20 }}>
              <Table
                dataSource={this.state.dataSource67}
                columns={this.state.columns67}
                loading={this.state.isBackEa67Loading}
                pagination={{ current: this.state.page67, total: this.state.totalData67 }}
                onChange={(page) => this.setState({ page67: page.current })}
                scroll={{ x: "max-content" }}
              />
            </div>
          </div>

          <Header>{this.state.subtitle2}</Header>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
            <Row>
              <Col span={6}>
                <ButtonCustom
                  variant="info"
                  onClick={() => this.props.history.push(`${pathName}/back-ea/rekam-8-9`)}
                  block
                >
                  + Perekaman BACK 8 & 9
                </ButtonCustom>
              </Col>
            </Row>

            <div style={{ marginTop: 30, marginBottom: 20 }}>
              <Table
                dataSource={this.state.dataSource89}
                columns={this.state.columns89}
                loading={this.state.isBackEa89Loading}
                pagination={{ current: this.state.page89, total: this.state.totalData89 }}
                onChange={(page) => this.setState({ page89: page.current })}
                scroll={{ x: "max-content" }}
              />
            </div>
          </div>
        </Container>

        <ModalBACKEADetail67
          id={this.state.detail67Id}
          isVisible={this.state.isModalBackEa67DetailVisible}
          onCancel={() => this.setState({ detail67Id: null, isModalBackEa67DetailVisible: false })}
        />

        <ModalBACKEADetail89
          id={this.state.detail89Id}
          isVisible={this.state.isModalBackEa89DetailVisible}
          onCancel={() => this.setState({ detail89Id: null, isModalBackEa89DetailVisible: false })}
        />
      </>
    );
  }
}
