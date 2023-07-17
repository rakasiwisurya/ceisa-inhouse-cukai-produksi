import { Button, Icon, Input, Table, Tag } from "antd";
import Container from "components/Container";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

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
    const {
      kode_kantor,
      nama_kantor,
      nppbkc,
      nama_perusahaan,
      nomor_kep,
      tanggal_kep,
      nama_merk,
      jenis_produksi,
      hje,
      isi,
      tarif,
      tujuan,
      awal_berlaku,
      akhir_berlaku,
    } = this.state.table;

    const payload = { page: this.state.page, status: "AKTIF" };

    if (kode_kantor) payload.kodeKantor = kode_kantor;
    if (nama_kantor) payload.namaKantor = nama_kantor;
    if (nppbkc) payload.nppbkc = nppbkc;
    if (nama_perusahaan) payload.namaPerusahaan = nama_perusahaan;
    if (nomor_kep) payload.nomorSkep = nomor_kep;
    if (tanggal_kep) payload.tanggalSkep = moment(tanggal_kep).format("YYYY-MM-DD");
    if (nama_merk) payload.namaMerk = nama_merk;
    if (jenis_produksi) payload.namaJenisProduksiBkc = jenis_produksi;
    if (hje) payload.hjePerKemasan = hje;
    if (isi) payload.isiPerKemasan = isi;
    if (tarif) payload.tarifSpesifik = tarif;
    if (tujuan) payload.tujuanPemasaran = tujuan;
    if (awal_berlaku) payload.awalBerlaku = moment(awal_berlaku).format("YYYY-MM-DD");
    if (akhir_berlaku) payload.akhirBerlaku = moment(akhir_berlaku).format("YYYY-MM-DD");

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/pita-cukai/browse-penetapan-tarif",
      params: payload,
      setLoading: (bool) => this.setState({ isPencabutanTarifLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `pencabutan-tarif-${index}`,
        permohonan_tarif_id: item.idTarifMerkHeader,
        status: item.status,
        kode_kantor: item.kodeKantor,
        nama_kantor: item.namaKantor,
        nppbkc: item.nppbkc,
        nama_perusahaan: item.namaPerusahaan,
        nomor_skep: item.nomorSkep,
        tanggal_skep: item.tanggalSkep,
        nama_merk: item.namaMerk,
        jenis_produksi: item.namaJenisProduksiBkc,
        hje: item.hjePerKemasan,
        isi: item.isiPerKemasan,
        tarif: item.tarifSpesifik,
        tujuan: item.tujuanPemasaran,
        awal_berlaku: item.awalBerlaku,
        akhir_berlaku: item.akhirBerlaku,
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
