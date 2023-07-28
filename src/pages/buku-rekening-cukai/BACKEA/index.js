import React, { Component } from "react";
import { Button, Row, Input, Icon, Table, Col } from "antd";
import Container from "components/Container";
import { pathName } from "configs/constants";
// import { requestApi } from "utils/requestApi";
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
                  onClick={() => this.handleEdit67(record.back_ea_id)}
                />
                <ButtonCustom
                  icon="eye"
                  variant="info"
                  onClick={() => this.handleDetail67(record.back_ea_id)}
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
                  onClick={() => this.handleEdit89(record.back_ea_id)}
                />
                <ButtonCustom
                  icon="eye"
                  variant="info"
                  onClick={() => this.handleDetail89(record.back_ea_id)}
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
    this.setState({ isBackEa67Loading: true });
    const timeout = setTimeout(() => {
      this.setState({
        dataSource67: [
          {
            key: "1",
            back_ea_id: "1",
            kppbc: "kppbc1",
            nama_perusahaan: "nama_perusahaan1",
            jenis_back: "jenis_back1",
            nomor_back: "nomor_back1",
            tanggal_back: new Date(),
            jumlah_ea_sebelum_dicampur: "jumlah_ea_sebelum_dicampur1",
            jumlah_bahan_pencampur: "jumlah_bahan_pencampur1",
            satuan_bahan_pencampur: "satuan_bahan_pencampur1",
            jenis_bahan_pencampur: "jenis_bahan_pencampur1",
            jumlah_hasil_akhir_pencampuran: "jumlah_hasil_akhir_pencampuran1",
            jenis_hasil_akhir_pencampuran: "jenis_hasil_akhir_pencampuran1",
          },
          {
            key: "2",
            back_ea_id: "2",
            kppbc: "kppbc2",
            nama_perusahaan: "nama_perusahaan2",
            jenis_back: "jenis_back2",
            nomor_back: "nomor_back2",
            tanggal_back: new Date(),
            jumlah_ea_sebelum_dicampur: "jumlah_ea_sebelum_dicampur2",
            jumlah_bahan_pencampur: "jumlah_bahan_pencampur2",
            satuan_bahan_pencampur: "satuan_bahan_pencampur2",
            jenis_bahan_pencampur: "jenis_bahan_pencampur2",
            jumlah_hasil_akhir_pencampuran: "jumlah_hasil_akhir_pencampuran2",
            jenis_hasil_akhir_pencampuran: "jenis_hasil_akhir_pencampuran2",
          },
        ],
      });
      this.setState({ isBackEa67Loading: false });
      clearTimeout(timeout);
    }, 2000);
  };

  getBackEa89 = async () => {
    this.setState({ isBackEa89Loading: true });
    const timeout = setTimeout(() => {
      this.setState({
        dataSource89: [
          {
            key: "1",
            back_ea_id: "1",
            kppbc: "kppbc1",
            nama_perusahaan: "nama_perusahaan1",
            jenis_back: "jenis_back1",
            nomor_back: "nomor_back1",
            tanggal_back: new Date(),
            jenis_ea: "jenis_ea1",
            jumlah: "jumlah1",
            keterangan: "keterangan1",
          },
          {
            key: "2",
            back_ea_id: "2",
            kppbc: "kppbc2",
            nama_perusahaan: "nama_perusahaan2",
            jenis_back: "jenis_back2",
            nomor_back: "nomor_back2",
            tanggal_back: new Date(),
            jenis_ea: "jenis_ea2",
            jumlah: "jumlah2",
            keterangan: "keterangan2",
          },
        ],
      });
      this.setState({ isBackEa89Loading: false });
      clearTimeout(timeout);
    }, 2000);
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
