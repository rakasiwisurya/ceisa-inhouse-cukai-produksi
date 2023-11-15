import { Button, Icon, Input, Table, Tag } from "antd";
import Container from "components/Container";
import { endpoints, pathName } from "configs/constants";
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

      filter: {
        status: null,
        kodeKantor: null,
        namaKantor: null,
        nppbkc: null,
        nomorSkep: null,
        tanggalSkep: null,
        awalBerlaku: null,
        akhirBerlaku: null,
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
                  onClick={() => this.handlePencabutan(record.idTarifMerkHeader)}
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
              {text !== null ? <Tag color={text === "AKTIF" ? "green" : "red"}>{text}</Tag> : "-"}
            </div>
          ),
        },
        {
          key: "kodeKantor",
          title: "Kode Kantor",
          dataIndex: "kodeKantor",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("kodeKantor"),
        },
        {
          key: "namaKantor",
          title: "Nama Kantor",
          dataIndex: "namaKantor",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("namaKantor"),
        },
        {
          key: "nppbkc",
          title: "NPPBKC",
          dataIndex: "nppbkc",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("nppbkc"),
        },
        {
          key: "nomorSkep",
          title: "Nomor SKEP",
          dataIndex: "nomorSkep",
          render: (text) => <div style={{ textAlign: "center" }}>{text !== null ? text : "-"}</div>,
          ...this.getColumnSearchProps("nomorSkep"),
        },
        {
          key: "tanggalSkep",
          title: "Tanggal SKEP",
          dataIndex: "tanggalSkep",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("tanggalSkep"),
        },
        {
          key: "awalBerlaku",
          title: "Awal Berlaku",
          dataIndex: "awalBerlaku",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("awalBerlaku"),
        },
        {
          key: "akhirBerlaku",
          title: "Akhir Berlaku",
          dataIndex: "akhirBerlaku",
          render: (text) => (
            <div style={{ textAlign: "center" }}>
              {text !== null ? moment(text).format("DD-MM-YYYY") : "-"}
            </div>
          ),
          ...this.getColumnSearchProps("akhirBerlaku"),
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
      kodeKantor,
      namaKantor,
      nppbkc,
      namaPerusahaan,
      nomorSkep,
      tanggalSkep,
      namaMerk,
      jenisProduksi,
      hje,
      isi,
      tarif,
      tujuan,
      awalBerlaku,
      akhirBerlaku,
    } = this.state.filter;

    const payload = { page: this.state.page, status: "AKTIF" };

    if (kodeKantor) payload.kodeKantor = kodeKantor;
    if (namaKantor) payload.namaKantor = namaKantor;
    if (nppbkc) payload.nppbkc = nppbkc;
    if (namaPerusahaan) payload.namaPerusahaan = namaPerusahaan;
    if (nomorSkep) payload.nomorSkep = nomorSkep;
    if (tanggalSkep) payload.tanggalSkep = moment(tanggalSkep, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (namaMerk) payload.namaMerk = namaMerk;
    if (jenisProduksi) payload.namaJenisProduksiBkc = jenisProduksi;
    if (hje) payload.hjePerKemasan = hje;
    if (isi) payload.isiPerKemasan = isi;
    if (tarif) payload.tarifSpesifik = tarif;
    if (tujuan) payload.tujuanPemasaran = tujuan;
    if (awalBerlaku) payload.awalBerlaku = moment(awalBerlaku, "DD-MM-YYYY").format("YYYY-MM-DD");
    if (akhirBerlaku)
      payload.akhirBerlaku = moment(akhirBerlaku, "DD-MM-YYYY").format("YYYY-MM-DD");

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: endpoints.permohonanTarifBrowse,
      params: payload,
      setLoading: (bool) => this.setState({ isPencabutanTarifLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.listData.map((item, index) => ({
        key: `pencabutan-tarif-${index}`,
        idTarifMerkHeader: item.idTarifMerkHeader,
        status: item.status,
        kodeKantor: item.kodeKantor,
        namaKantor: item.namaKantor,
        nppbkc: item.nppbkc,
        namaPerusahaan: item.namaPerusahaan,
        nomorSkep: item.nomorSkep,
        tanggalSkep: item.tanggalSkep,
        namaMerk: item.namaMerk,
        jenisProduksi: item.namaJenisProduksiBkc,
        hje: item.hjePerKemasan,
        isi: item.isiPerKemasan,
        tarif: item.tarifSpesifik,
        tujuan: item.tujuanPemasaran,
        awalBerlaku: item.awalBerlaku,
        akhirBerlaku: item.akhirBerlaku,
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
    this.setState({ page: 1 }, this.getPencabutanTarif);
  };
  handleColumnReset = (clearFilters, dataIndex) => {
    clearFilters();
    this.setState(
      { filter: { ...this.state.filter, [dataIndex]: null }, page: 1 },
      this.getPencabutanTarif
    );
  };

  handlePencabutan = (id) => {
    this.props.history.push(`${pathName}/pencabutan-tarif/cabut/${id}`);
  };

  render() {
    return (
      <>
        <Container menuName="Tarif Cukai" contentName="Pencabutan Tarif">
          <Table
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            loading={this.state.isPencabutanTarifLoading}
            pagination={{ current: this.state.page, total: this.state.totalData }}
            onChange={(page) => this.setState({ page: page.current })}
            scroll={{ x: "max-content" }}
          />
        </Container>
      </>
    );
  }
}
