import React, { Component } from "react";
import { Button, Row, Input, Icon, Table, Col } from "antd";
import Container from "components/Container";
import { pathName } from "configs/constants";
import { requestApi } from "utils/requestApi";
import moment from "moment";
import ButtonCustom from "components/Button/ButtonCustom";
import Header from "components/Header";

export default class BACKEA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "BACK EA 6 & 7",
      subtitle2: "BACK EA 8 & 9",

      isBackEa67Loading: true,
      isBackEa89Loading: true,

      page67: 1,
      totalData67: 0,

      page89: 1,
      totalData89: 0,

      table67: {
        kppbc: null,
        nama_perusahaan: null,
        jenis_back: null,
        nomor_back: null,
        tanggal_back: null,
        jumlah_ea_sebelum_dicampur: null,
        jumlah_bahan_pencampur: null,
        satuan_bahan_pencampur: null,
        jenis_bahan_pencampur: null,
        jumlah_hasil_akhir_pencampuran: null,
        jenis_hasil_akhir_pencampuran: null,
      },

      table89: {
        kppbc: null,
        nama_perusahaan: null,
        jenis_back: null,
        nomor_back: null,
        tanggal_back: null,
        jenis_ea: null,
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
                  onClick={() => this.handleEdit67(record.back_ea_67_id)}
                />
                <ButtonCustom
                  icon="eye"
                  variant="info"
                  onClick={() => this.handleDetail67(record.back_ea_67_id)}
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
          ...this.getColumnSearchProps67("kppbc"),
        },
        {
          key: "nama_perusahaan",
          title: "Nama Perusahaan",
          dataIndex: "nama_perusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps67("nama_perusahaan"),
        },
        {
          key: "jenis_back",
          title: "Jenis BACK",
          dataIndex: "jenis_back",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps67("jenis_back"),
        },
        {
          key: "nomor_back",
          title: "Nomor BACK",
          dataIndex: "nomor_back",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps67("nomor_back"),
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
          ...this.getColumnSearchProps67("tanggal_back"),
        },
        {
          key: "jumlah_ea_sebelum_dicampur",
          title: "Jumlah EA Sebelum Dicampur/Dirusak (lt)",
          dataIndex: "jumlah_ea_sebelum_dicampur",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps67("jumlah_ea_sebelum_dicampur"),
        },
        {
          title: "Bahan Pencampur/Perusak",
          children: [
            {
              key: "jumlah_bahan_pencampur",
              title: "Jumlah",
              dataIndex: "jumlah_bahan_pencampur",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps67("jumlah_bahan_pencampur"),
            },
            {
              key: "satuan_bahan_pencampur",
              title: "Satuan",
              dataIndex: "satuan_bahan_pencampur",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps67("satuan_bahan_pencampur"),
            },
            {
              key: "jenis_bahan_pencampur",
              title: "Jenis",
              dataIndex: "jenis_bahan_pencampur",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps67("jenis_bahan_pencampur"),
            },
          ],
        },
        {
          title: "Hasil Akhir Pencampuran/Perusakan EA",
          children: [
            {
              key: "jumlah_hasil_akhir_pencampuran",
              title: "Jumlah (LT)",
              dataIndex: "jumlah_hasil_akhir_pencampuran",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps67("jumlah_hasil_akhir_pencampuran"),
            },
            {
              key: "jenis_hasil_akhir_pencampuran",
              title: "Jenis",
              dataIndex: "jenis_hasil_akhir_pencampuran",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps67("jenis_hasil_akhir_pencampuran"),
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
                  onClick={() => this.handleEdit89(record.back_ea_89_id)}
                />
                <ButtonCustom
                  icon="eye"
                  variant="info"
                  onClick={() => this.handleDetail89(record.back_ea_89_id)}
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
          ...this.getColumnSearchProps89("kppbc"),
        },
        {
          key: "nama_perusahaan",
          title: "Nama Perusahaan",
          dataIndex: "nama_perusahaan",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps89("nama_perusahaan"),
        },
        {
          key: "jenis_back",
          title: "Jenis BACK",
          dataIndex: "jenis_back",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps89("jenis_back"),
        },
        {
          key: "nomor_back",
          title: "Nomor BACK",
          dataIndex: "nomor_back",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps89("nomor_back"),
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
          ...this.getColumnSearchProps89("tanggal_back"),
        },
        {
          key: "jenis_ea",
          title: "Jenis EA",
          dataIndex: "jenis_ea",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps89("jenis_ea"),
        },
        {
          key: "jumlah",
          title: "Jumlah (Lt)",
          dataIndex: "jumlah",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps89("jumlah"),
        },
        {
          key: "keterangan",
          title: "Keterangan",
          dataIndex: "keterangan",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
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
      nama_perusahaan,
      jenis_back,
      nomor_back,
      tanggal_back,
      jumlah_ea_sebelum_dicampur,
      jumlah_bahan_pencampur,
      satuan_bahan_pencampur,
      jenis_bahan_pencampur,
      jumlah_hasil_akhir_pencampuran,
      jenis_hasil_akhir_pencampuran,
    } = this.state.table67;

    const payload = { page: this.state.page67 };

    if (kppbc) payload.namaKantor = kppbc;
    if (nama_perusahaan) payload.namaPerusahaan = nama_perusahaan;
    if (jenis_back) payload.jenisBackEa = jenis_back;
    if (nomor_back) payload.nomorBackEa = nomor_back;
    if (tanggal_back)
      payload.tanggalBackEa = moment(tanggal_back, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (jumlah_ea_sebelum_dicampur) payload.jumlah = jumlah_ea_sebelum_dicampur;
    if (jumlah_bahan_pencampur) payload.jumlahPencampur = jumlah_bahan_pencampur;
    if (satuan_bahan_pencampur) payload.kodeSatuanPencampur = satuan_bahan_pencampur;
    if (jenis_bahan_pencampur) payload.jenisBahanPencampur = jenis_bahan_pencampur;
    if (jumlah_hasil_akhir_pencampuran) payload.jumlahSetelah = jumlah_hasil_akhir_pencampuran;
    if (jenis_hasil_akhir_pencampuran) payload.hasilAkhir = jenis_hasil_akhir_pencampuran;

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
        back_ea_67_id: item.idBackEaHeader,
        kppbc: item.namaKantor,
        nama_perusahaan: item.namaPerusahaan,
        jenis_back: item.jenisBackEa,
        nomor_back: item.nomorBackEa,
        tanggal_back: item.tanggalBackEa,
        jumlah_ea_sebelum_dicampur: item.jumlah,
        jumlah_bahan_pencampur: item.jumlahPencampur,
        satuan_bahan_pencampur: item.kodeSatuanPencampur,
        jenis_bahan_pencampur: item.jenisBahanPencampur,
        jumlah_hasil_akhir_pencampuran: item.jumlahSetelah,
        jenis_hasil_akhir_pencampuran: item.hasilAkhir,
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
      nama_perusahaan,
      jenis_back,
      nomor_back,
      tanggal_back,
      jenis_ea,
      jumlah,
      keterangan,
    } = this.state.table89;

    const payload = { page: this.state.page89 };

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
      endpoint: "/back-ea-8-9/browse",
      params: payload,
      setLoading: (bool) => this.setState({ isBackEa89Loading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `back-8-9-${index}`,
        back_ea_89_id: item.idBackEaHeader,
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
          value={this.state.table67[dataIndex]}
          onChange={(e) =>
            this.setState({ table67: { ...this.state.table67, [dataIndex]: e.target.value } })
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
    this.getBackEa67();
  };
  handleColumnReset67 = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table67: { ...this.state.table67, [dataIndex]: "" } });
    this.getBackEa67();
  };

  handleEdit67 = (id) => {
    this.props.history.push(`${pathName}/back-ea/perbaikan-6-7/${id}`);
  };
  handleDetail67 = (id) => {
    this.props.history.push(`${pathName}/back-ea/detail-6-7/${id}`);
  };

  getColumnSearchProps89 = (dataIndex, inputType) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          value={this.state.table89[dataIndex]}
          onChange={(e) =>
            this.setState({ table89: { ...this.state.table89, [dataIndex]: e.target.value } })
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
    this.getBackEa89();
  };
  handleColumnReset89 = async (clearFilters, dataIndex) => {
    clearFilters();
    await this.setState({ table89: { ...this.state.table89, [dataIndex]: "" } });
    this.getBackEa89();
  };

  handleEdit89 = (id) => {
    this.props.history.push(`${pathName}/back-ea/perbaikan-8-9/${id}`);
  };
  handleDetail89 = (id) => {
    this.props.history.push(`${pathName}/back-ea/detail-8-9/${id}`);
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
      </>
    );
  }
}
