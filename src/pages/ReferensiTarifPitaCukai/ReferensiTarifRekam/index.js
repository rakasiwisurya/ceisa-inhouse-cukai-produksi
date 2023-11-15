import {
  Button,
  Card,
  Col,
  DatePicker,
  Icon,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
  notification,
} from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import { endpoints, pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { capitalize } from "utils/formatter";
import { requestApi } from "utils/requestApi";

export default class ReferensiTarifRekam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Surat Keputusan",
      subtitle2: "Rincian",
      isEdit: false,
      editIndex: null,

      isJenisBkcLoading: true,
      isGolonganLoading: true,
      isJenisProduksiLoading: true,
      isJenisHtlRelLoading: false,
      isRekamLoading: false,

      nomorSkep: null,
      tanggalSkep: null,
      tanggalAwalBerlaku: null,
      nomorPeraturan: null,
      tanggalPeraturan: null,

      idJenisBkc: null,
      namaJenisBkc: null,
      idGolonganBkc: null,
      namaGolonganBkc: null,
      idPersonal: null,
      namaPersonal: null,
      satuanJenisProduksiBkc: null,
      satuanJenisHtlRel: null,

      idJenisProduksiBkc: null,
      kodeJenisProduksiBkc: null,
      namaJenisProduksiBkc: null,
      idJenisHtlRel: null,
      namaJenisHtlRel: null,
      tarif: null,
      batasProduksi1: null,
      batasProduksi2: null,
      hje1: null,
      hje2: null,
      layer: null,

      kadarAtas: null,
      kadarBawah: null,
      tarifCukaiDalamNegeri: null,
      tarifCukaiImpor: null,

      searchText: null,
      searchedColumn: null,
      page: 1,

      listJenisBkc: [],
      listGolonganBkc: [],
      listPersonal: [
        {
          idPersonal: "Y",
          namaPersonal: "YA",
        },
        {
          idPersonal: "N",
          namaPersonal: "TIDAK",
        },
      ],
      listJenisProduksiBkc: [],
      listJenisHtlRel: [],
      columns: [],
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getJenisBkc();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.idJenisProduksiBkc !== this.state.idJenisProduksiBkc) {
      if (this.state.idJenisProduksiBkc) {
        if (
          +this.state.idJenisProduksiBkc.split(" ")[0] === 2 ||
          +this.state.idJenisProduksiBkc.split(" ")[0] === 5
        ) {
          this.getJenisHtlRel();
        }
      }
    }

    if (prevState.idJenisBkc !== this.state.idJenisBkc) {
      if (this.state.idJenisBkc) {
        this.getListGolongan();
        this.getListJenisProduksi();
      }

      if (this.state.idJenisBkc === 3) {
        this.setState({
          columns: [
            {
              key: "aksi",
              dataIndex: "aksi",
              title: "Aksi",
              fixed: "left",
              render: (text, record, index) => (
                <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                  <ButtonCustom
                    variant="warning"
                    icon="form"
                    onClick={() => this.handleEdit(record)}
                  />
                  <Button type="danger" icon="close" onClick={() => this.handleDelete(record)} />
                </div>
              ),
            },
            {
              key: "nomor",
              dataIndex: "nomor",
              title: "Nomor",
              render: (text, record, index) => (
                <div style={{ textAlign: "center" }}>{index + 1 + (this.state.page - 1) * 10}</div>
              ),
            },
            {
              key: "namaGolonganBkc",
              dataIndex: "namaGolonganBkc",
              title: "Golongan",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("namaGolonganBkc"),
            },
            {
              key: "namaJenisProduksiBkc",
              dataIndex: "namaJenisProduksiBkc",
              title: "Jenis Produksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("namaJenisProduksiBkc"),
            },
            {
              key: "namaJenisHtlRel",
              dataIndex: "namaJenisHtlRel",
              title: "Jenis HPTL/REL",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("namaJenisHtlRel"),
            },
            {
              key: "hje1",
              dataIndex: "hje1",
              title: "HJE I",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("hje1"),
            },
            {
              key: "hje2",
              dataIndex: "hje2",
              title: "HJE II",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("hje2"),
            },
            {
              key: "layer",
              dataIndex: "layer",
              title: "Layer",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("layer"),
            },
            {
              key: "tarif",
              title: "Tarif",
              dataIndex: "tarif",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("tarif"),
            },
            {
              key: "batasProduksi1",
              title: "Batas I",
              dataIndex: "batasProduksi1",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("batasProduksi1"),
            },
            {
              key: "batasProduksi2",
              title: "Batas II",
              dataIndex: "batasProduksi2",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("batasProduksi2"),
            },
          ],
        });
      }

      if (this.state.idJenisBkc === 2) {
        this.setState({
          columns: [
            {
              key: "aksi",
              dataIndex: "aksi",
              title: "Aksi",
              fixed: "left",
              render: (text, record, index) => (
                <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                  <ButtonCustom
                    variant="warning"
                    icon="form"
                    onClick={() => this.handleEdit(record)}
                  />
                  <Button type="danger" icon="close" onClick={() => this.handleDelete(record)} />
                </div>
              ),
            },
            {
              key: "nomor",
              dataIndex: "nomor",
              title: "Nomor",
              render: (text, record, index) => (
                <div style={{ textAlign: "center" }}>{index + 1 + (this.state.page - 1) * 10}</div>
              ),
              ...this.getColumnSearchProps("nomor"),
            },
            {
              key: "namaGolonganBkc",
              dataIndex: "namaGolonganBkc",
              title: "Golongan",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("namaGolonganBkc"),
            },
            {
              key: "namaJenisProduksiBkc",
              dataIndex: "namaJenisProduksiBkc",
              title: "Jenis Produksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("namaJenisProduksiBkc"),
            },
            {
              key: "kadarAtas",
              dataIndex: "kadarAtas",
              title: "Kadar Atas",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("kadarAtas"),
            },
            {
              key: "kadarBawah",
              dataIndex: "kadarBawah",
              title: "Kadar Bawah",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("kadarBawah"),
            },
            {
              key: "tarifCukaiDalamNegeri",
              dataIndex: "tarifCukaiDalamNegeri",
              title: "Tarif Cukai Dalam Negeri",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("tarifCukaiDalamNegeri"),
            },
            {
              key: "tarifCukaiImpor",
              dataIndex: "tarifCukaiImpor",
              title: "Tarif Cukai Impor",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("tarifCukaiImpor"),
            },
          ],
        });
      }
    }
  }

  getJenisBkc = async () => {
    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: endpoints.listJenisBkc,
      setLoading: (bool) => this.setState({ isJenisBkcLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.map((item) => item);
      newData.splice(0, 1);
      this.setState({ listJenisBkc: newData });
    }
  };
  getListGolongan = async () => {
    const payload = { idJenisBkc: this.state.idJenisBkc };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: endpoints.listGolongan,
      params: payload,
      setLoading: (bool) => this.setState({ isGolonganLoading: bool }),
    });

    if (response) this.setState({ listGolonganBkc: response.data.data });
  };
  getListJenisProduksi = async () => {
    const payload = { idJenisBkc: this.state.idJenisBkc };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: endpoints.listJenisProduksiByJenisBkc,
      params: payload,
      setLoading: (bool) => this.setState({ isJenisProduksiLoading: bool }),
    });

    if (response) this.setState({ listJenisProduksiBkc: response.data.data });
  };
  getJenisHtlRel = async () => {
    const payload = { idJenisProduksiBkc: +this.state.idJenisProduksiBkc.split(" ")[0] };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: endpoints.listJenisHtlRel,
      params: payload,
      setLoading: (bool) => this.setState({ isJenisHtlRelLoading: bool }),
    });

    if (response) this.setState({ listJenisHtlRel: response.data.data });
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleColumnSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleColumnSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleColumnReset(clearFilters)}
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
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        const timeout = setTimeout(() => {
          this.searchInput.select();
          clearTimeout(timeout);
        });
      }
    },
  });
  handleColumnSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  handleColumnReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  handleTableChange = (page) => {
    this.setState({ page: page.current });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value.toUpperCase() });
  };
  handleInputNumberChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleDatepickerChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleSelectChange = (field, value) => {
    this.setState({ [field]: value });
  };
  handleSelectCustomChange = (field, value, option) => {
    this.setState({
      [`id${capitalize(field, false)}`]: value,
      [`nama${capitalize(field, false)}`]: option.props.children,
    });
  };

  handleSimpan = () => {
    const {
      idJenisBkc,
      namaJenisBkc,
      idGolonganBkc,
      namaGolonganBkc,
      idPersonal,
      namaPersonal,

      idJenisProduksiBkc,
      kodeJenisProduksiBkc,
      namaJenisProduksiBkc,
      idJenisHtlRel,
      namaJenisHtlRel,
      tarif,
      batasProduksi1,
      batasProduksi2,
      hje1,
      hje2,
      layer,
      satuanJenisProduksiBkc,
      satuanJenisHtlRel,

      kadarAtas,
      kadarBawah,
      tarifCukaiDalamNegeri,
      tarifCukaiImpor,
    } = this.state;

    this.setState({
      dataSource: [
        ...this.state.dataSource,
        {
          key: new Date().getTime(),
          idJenisBkc,
          namaJenisBkc,
          idGolonganBkc,
          namaGolonganBkc,
          idPersonal,
          namaPersonal,
          idJenisProduksiBkc,
          kodeJenisProduksiBkc,
          namaJenisProduksiBkc,
          idJenisHtlRel,
          namaJenisHtlRel,
          tarif,
          batasProduksi1,
          batasProduksi2,
          satuanJenisProduksiBkc,
          satuanJenisHtlRel,
          hje1,
          hje2,
          layer,
          kadarAtas,
          kadarBawah,
          tarifCukaiDalamNegeri,
          tarifCukaiImpor,
        },
      ],
    });

    this.setState({
      idGolonganBkc: null,
      namaGolonganBkc: null,
      idPersonal: null,
      namaPersonal: null,
      idJenisProduksiBkc: null,
      kodeJenisProduksiBkc: null,
      namaJenisProduksiBkc: null,
      idJenisHtlRel: null,
      namaJenisHtlRel: null,

      tarif: null,
      batasProduksi1: null,
      batasProduksi2: null,
      hje1: null,
      hje2: null,
      layer: null,
      satuanJenisProduksiBkc: null,
      satuanJenisHtlRel: null,

      kadarAtas: null,
      kadarBawah: null,
      tarifCukaiDalamNegeri: null,
      tarifCukaiImpor: null,
    });

    if (this.state.idJenisBkc === 2) {
      this.setState({
        idJenisProduksiBkc: null,
        kodeJenisProduksiBkc: null,
        namaJenisProduksiBkc: null,
      });
    }
  };
  handleReset = () => {
    const resetData = {
      isEdit: false,

      idGolonganBkc: null,
      namaGolonganBkc: null,
      idPersonal: null,
      namaPersonal: null,

      idJenisProduksiBkc: null,
      kodeJenisProduksiBkc: null,
      namaJenisProduksiBkc: null,
      idJenisHtlRel: null,
      namaJenisHtlRel: null,
      tarif: null,
      batasProduksi1: null,
      batasProduksi2: null,
      hje1: null,
      hje2: null,
      layer: null,
      satuanJenisProduksiBkc: null,
      satuanJenisHtlRel: null,

      kadarAtas: null,
      kadarBawah: null,
      tarifCukaiDalamNegeri: null,
      tarifCukaiImpor: null,
    };

    if (this.state.dataSource.length === 0) {
      resetData.idJenisBkc = null;
      resetData.namaJenisBkc = null;
    }

    this.setState(resetData);
  };
  handleUbah = () => {
    const {
      idJenisBkc,
      namaJenisBkc,
      idGolonganBkc,
      namaGolonganBkc,
      idPersonal,
      namaPersonal,

      idJenisProduksiBkc,
      kodeJenisProduksiBkc,
      namaJenisProduksiBkc,
      idJenisHtlRel,
      namaJenisHtlRel,
      tarif,
      batasProduksi1,
      batasProduksi2,
      hje1,
      hje2,
      layer,
      satuanJenisProduksiBkc,
      satuanJenisHtlRel,

      kadarAtas,
      kadarBawah,
      tarifCukaiDalamNegeri,
      tarifCukaiImpor,
    } = this.state;

    const newDataSource = [...this.state.dataSource];
    const index = newDataSource.findIndex((item) => item.key === this.state.editIndexRincian);
    newDataSource.splice(index, 1, {
      key: new Date().getTime(),
      idJenisBkc,
      namaJenisBkc,
      idGolonganBkc,
      namaGolonganBkc,
      idPersonal,
      namaPersonal,

      idJenisProduksiBkc,
      kodeJenisProduksiBkc,
      namaJenisProduksiBkc,
      idJenisHtlRel,
      namaJenisHtlRel,
      tarif,
      batasProduksi1,
      batasProduksi2,
      hje1,
      hje2,
      layer,
      satuanJenisProduksiBkc,
      satuanJenisHtlRel,

      kadarAtas,
      kadarBawah,
      tarifCukaiDalamNegeri,
      tarifCukaiImpor,
    });
    this.setState({
      isEdit: false,
      editIndex: null,
      idGolonganBkc: null,
      namaGolonganBkc: null,
      idPersonal: null,
      namaPersonal: null,
      idJenisProduksiBkc: null,
      kodeJenisProduksiBkc: null,
      namaJenisProduksiBkc: null,
      idJenisHtlRel: null,
      namaJenisHtlRel: null,

      tarif: null,
      batasProduksi1: null,
      batasProduksi2: null,
      hje1: null,
      hje2: null,
      layer: null,
      satuanJenisProduksiBkc: null,
      satuanJenisHtlRel: null,

      kadarAtas: null,
      kadarBawah: null,
      tarifCukaiDalamNegeri: null,
      tarifCukaiImpor: null,
      dataSource: newDataSource,
    });

    if (this.state.idJenisBkc === 2) {
      this.setState({
        idJenisProduksiBkc: null,
        kodeJenisProduksiBkc: null,
        namaJenisProduksiBkc: null,
      });
    }
  };
  handleBatal = () => {
    this.setState({
      isEdit: false,
      idGolonganBkc: null,
      namaGolonganBkc: null,
      idPersonal: null,
      namaPersonal: null,

      idJenisProduksiBkc: null,
      kodeJenisProduksiBkc: null,
      namaJenisProduksiBkc: null,
      idJenisHtlRel: null,
      namaJenisHtlRel: null,
      tarif: null,
      batasProduksi1: null,
      batasProduksi2: null,
      hje1: null,
      hje2: null,
      layer: null,
      satuanJenisProduksiBkc: null,
      satuanJenisHtlRel: null,

      kadarAtas: null,
      kadarBawah: null,
      tarifCukaiDalamNegeri: null,
      tarifCukaiImpor: null,
    });
  };

  handleEdit = (record) => {
    this.setState({
      isEdit: true,
      editIndex: record.key,
      idJenisBkc: record.idJenisBkc,
      namaJenisBkc: record.namaJenisBkc,
      idGolonganBkc: record.idGolonganBkc,
      namaGolonganBkc: record.namaGolonganBkc,
      idPersonal: record.idPersonal,
      namaPersonal: record.namaPersonal,

      idJenisProduksiBkc: record.idJenisProduksiBkc,
      kodeJenisProduksiBkc: record.kodeJenisProduksiBkc,
      namaJenisProduksiBkc: record.namaJenisProduksiBkc,
      idJenisHtlRel: record.idJenisHtlRel,
      namaJenisHtlRel: record.namaJenisHtlRel,
      tarif: record.tarif,
      batasProduksi1: record.batasProduksi1,
      batasProduksi2: record.batasProduksi2,
      hje1: record.hje1,
      hje2: record.hje2,
      layer: record.layer,
      satuanJenisProduksiBkc: record.satuanJenisProduksiBkc,
      satuanJenisHtlRel: record.satuanJenisHtlRel,

      kadarAtas: record.kadarAtas,
      kadarBawah: record.kadarBawah,
      tarifCukaiDalamNegeri: record.tarifCukaiDalamNegeri,
      tarifCukaiImpor: record.tarifCukaiImpor,
    });
  };
  handleDelete = (record) => {
    const updatedDataSource = this.state.dataSource.filter((item) => item.key !== record.key);
    this.setState({ dataSource: updatedDataSource });
  };

  handleRekam = async () => {
    const details = this.state.dataSource.map((item) => {
      const data = {
        idGolonganBkc: item.idGolonganBkc,
        flagPersonal: item.idPersonal,
      };

      if (item.idJenisProduksiBkc) data.idJenisProduksiBkc = +item.idJenisProduksiBkc.split(" ")[0];

      if (this.state.idJenisBkc === 3) {
        if (item.idJenisHtlRel) data.idJenisHtlRel = +item.idJenisHtlRel.split(" ")[0];

        data.tarif = item.tarif;
        data.batasProduksi1 = item.batasProduksi1;
        data.batasProduksi2 = item.batasProduksi2;
        data.hje1 = item.hje1;
        data.hje2 = item.hje2;
        data.layer = item.layer;
        return data;
      }

      if (this.state.idJenisBkc === 2) {
        if (item.idGolonganBkc === 4) {
          data.tarif = item.tarifCukaiImpor;
        } else {
          data.tarif = item.tarifCukaiDalamNegeri;
        }
      }

      data.kadarAtas = item.kadarAtas;
      data.kadarBawah = item.kadarBawah;
      return data;
    });

    const payload = {
      nomorSkep: this.state.nomorSkep,
      tanggalSkep: moment(this.state.tanggalSkep).format("YYYY-MM-DD"),
      tanggalAwalBerlaku: moment(this.state.tanggalAwalBerlaku).format("YYYY-MM-DD"),
      nomorPeraturan: this.state.nomorPeraturan,
      tanggalPeraturan: moment(this.state.tanggalPeraturan).format("YYYY-MM-DD"),
      idJenisBkc: this.state.idJenisBkc,
      details,
    };

    const response = await requestApi({
      service: "referensi",
      method: "post",
      endpoint: endpoints.referensiTarifRekam,
      body: payload,
      setLoading: (bool) => this.setState({ isRekamLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.props.history.push(`${pathName}/referensi-tarif-warna`);
    }
  };

  render() {
    return (
      <>
        <Container menuName="Referensi Tarif dan Pita Cukai" contentName="Referensi Tarif Rekam">
          <Card title={this.state.subtitle1} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Nomor Surat</FormLabel>
                </div>
                <Input
                  id="nomorSkep"
                  onChange={this.handleInputChange}
                  value={this.state.nomorSkep}
                />
              </Col>
              <Col span={6}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Surat</FormLabel>
                </div>
                <DatePicker
                  id="tanggalSkep"
                  format="DD-MM-YYYY"
                  onChange={(value) => this.handleDatepickerChange("tanggalSkep", value)}
                  value={this.state.tanggalSkep}
                />
              </Col>
              <Col span={6}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Awal Berlaku</FormLabel>
                </div>
                <DatePicker
                  id="tanggalAwalBerlaku"
                  format="DD-MM-YYYY"
                  onChange={(value) => this.handleDatepickerChange("tanggalAwalBerlaku", value)}
                  value={this.state.tanggalAwalBerlaku}
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Nomor Peraturan</FormLabel>
                </div>
                <Input
                  id="nomorPeraturan"
                  onChange={this.handleInputChange}
                  value={this.state.nomorPeraturan}
                />
              </Col>
              <Col span={6}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Peraturan</FormLabel>
                </div>
                <DatePicker
                  id="tanggalPeraturan"
                  format="DD-MM-YYYY"
                  onChange={(value) => this.handleDatepickerChange("tanggalPeraturan", value)}
                  style={{ width: "100%" }}
                  value={this.state.tanggalPeraturan}
                />
              </Col>
            </Row>
          </Card>

          <Card title={this.state.subtitle2} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jenis BKC</FormLabel>
                </div>
                <Select
                  id="jenisBkc"
                  onChange={(value, option) => {
                    this.setState({
                      idGolonganBkc: null,
                      namaGolonganBkc: null,
                      idJenisProduksiBkc: null,
                      namaJenisProduksiBkc: null,
                      idJenisHtlRel: null,
                      namaJenisHtlRel: null,
                      listJenisProduksiBkc: [],
                      listGolonganBkc: [],
                    });
                    this.handleSelectCustomChange("jenisBkc", value, option);
                  }}
                  style={{ width: "100%" }}
                  value={this.state.idJenisBkc}
                  loading={this.state.isJenisBkcLoading}
                  disabled={this.state.dataSource.length > 0}
                >
                  {this.state.listJenisBkc.length > 0 &&
                    this.state.listJenisBkc.map((item, index) => (
                      <Select.Option key={`jenisBkc-${index}`} value={item.idJenisBkc}>
                        {item.namaJenisBkc}
                      </Select.Option>
                    ))}
                </Select>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              {this.state.idJenisBkc && (
                <>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Golongan</FormLabel>
                    </div>
                    <Select
                      id="golonganBkc"
                      onChange={(value, option) =>
                        this.handleSelectCustomChange("golonganBkc", value, option)
                      }
                      value={this.state.idGolonganBkc}
                      loading={this.state.isGolonganLoading}
                      style={{ width: "100%" }}
                    >
                      {this.state.listGolonganBkc.length > 0 &&
                        this.state.listGolonganBkc.map((item, index) => (
                          <Select.Option key={`golonganBkc-${index}`} value={item.idGolonganBkc}>
                            {item.namaGolonganBkc}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Personal</FormLabel>
                    </div>
                    <Select
                      id="personal"
                      onChange={(value, option) =>
                        this.handleSelectCustomChange("personal", value, option)
                      }
                      value={this.state.idPersonal}
                      style={{ width: "100%" }}
                    >
                      {this.state.listPersonal.length > 0 &&
                        this.state.listPersonal.map((item, index) => (
                          <Select.Option key={`personal-${index}`} value={item.idPersonal}>
                            {item.namaPersonal}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Produksi</FormLabel>
                    </div>
                    <Select
                      id="jenisProduksiBkc"
                      onChange={(value, option) => {
                        const splitValues = value.split(" ");
                        this.setState({
                          idJenisHtlRel: null,
                          namaJenisHtlRel: null,
                          listJenisHtlRel: [],
                          kodeJenisProduksiBkc: option.props.children
                            .split("-")[0]
                            .replace(/[()\s]/g, ""),
                          satuanJenisProduksiBkc: splitValues[1] !== "null" ? splitValues[1] : null,
                        });
                        this.handleSelectCustomChange("jenisProduksiBkc", value, option);
                      }}
                      value={this.state.idJenisProduksiBkc}
                      loading={this.state.isJenisProduksiLoading}
                      style={{ width: "100%" }}
                    >
                      {this.state.listJenisProduksiBkc.length > 0 &&
                        this.state.listJenisProduksiBkc.map((item, index) => (
                          <Select.Option
                            key={`jenisProduksiBkc-${index}`}
                            value={`${item.idJenisProduksi} ${item.satuan}`}
                          >
                            {`(${item.kodeJenisProduksi}) - ${item.namaJenisProduksi}`}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>
                </>
              )}

              {this.state.idJenisBkc === 3 && (
                <>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis HPTL/REL</FormLabel>
                    </div>
                    <Select
                      id="jenisHtlRel"
                      onChange={(value, option) => {
                        const splitValues = value.split(" ");
                        this.setState({ satuanJenisHtlRel: splitValues[1] });
                        this.handleSelectCustomChange("jenisHtlRel", value, option);
                      }}
                      value={this.state.idJenisHtlRel}
                      loading={this.state.isJenisHtlRelLoading}
                      style={{ width: "100%" }}
                      disabled={
                        !(
                          this.state.kodeJenisProduksiBkc === "HTL" ||
                          this.state.kodeJenisProduksiBkc === "REL"
                        )
                      }
                    >
                      {this.state.listJenisHtlRel.length > 0 &&
                        this.state.listJenisHtlRel.map((item, index) => (
                          <Select.Option
                            key={`jenisHtlRel-${index}`}
                            value={`${item.idJenisHtlRel} ${item.satuan}`}
                          >
                            {`(${item.kodeHtlRel}) - ${item.namaJenisHtlRel}`}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="tarif"
                        onChange={(value) => this.handleInputNumberChange("tarif", value)}
                        value={this.state.tarif}
                        style={{ flex: 1 }}
                        min={0}
                      />
                      {(this.state.satuanJenisProduksiBkc || this.state.satuanJenisHtlRel) && (
                        <>
                          <div>/</div>
                          <div>
                            {this.state.satuanJenisProduksiBkc ?? this.state.satuanJenisHtlRel}
                          </div>
                        </>
                      )}
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Batas Produksi</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="batasProduksi1"
                        onChange={(value) => this.handleInputNumberChange("batasProduksi1", value)}
                        value={this.state.batasProduksi1}
                        style={{ flex: 1 }}
                        min={0}
                      />
                      <div>s.d</div>
                      <InputNumber
                        id="batasProduksi2"
                        onChange={(value) => this.handleInputNumberChange("batasProduksi2", value)}
                        value={this.state.batasProduksi2}
                        style={{ flex: 1 }}
                        min={0}
                      />
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>HJE</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div>
                        <InputNumber
                          id="hje1"
                          onChange={(value) => this.handleInputNumberChange("hje1", value)}
                          value={this.state.hje1}
                          style={{ width: "100%" }}
                          min={0}
                        />
                      </div>
                      <div>s.d</div>
                      <div>
                        <InputNumber
                          id="hje2"
                          onChange={(value) => this.handleInputNumberChange("hje2", value)}
                          value={this.state.hje2}
                          style={{ width: "100%" }}
                          min={0}
                        />
                      </div>
                      {(this.state.satuanJenisProduksiBkc || this.state.satuanJenisHtlRel) && (
                        <>
                          <div>/</div>
                          <div>
                            {this.state.satuanJenisProduksiBkc ?? this.state.satuanJenisHtlRel}
                          </div>
                        </>
                      )}
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Layer</FormLabel>
                    </div>
                    <InputNumber
                      id="layer"
                      onChange={(value) => this.handleInputNumberChange("layer", value)}
                      value={this.state.layer}
                      min={0}
                      style={{ width: "100%" }}
                    />
                  </Col>
                </>
              )}

              {this.state.idJenisBkc === 2 && (
                <>
                  <Col span={12}>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Kadar Atas</FormLabel>
                        </div>
                        <InputNumber
                          id="kadarAtas"
                          onChange={(value) => this.handleInputNumberChange("kadarAtas", value)}
                          value={this.state.kadarAtas}
                          style={{ width: "100%" }}
                          min={0}
                        />
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Kadar Bawah</FormLabel>
                        </div>
                        <InputNumber
                          id="kadarBawah"
                          onChange={(value) => this.handleInputNumberChange("kadarBawah", value)}
                          value={this.state.kadarBawah}
                          style={{ width: "100%" }}
                          min={0}
                        />
                      </Col>
                    </Row>
                  </Col>

                  {this.state.idGolonganBkc === 5 && (
                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Tarif Cukai Dalam Negeri</FormLabel>
                      </div>
                      <InputNumber
                        id="tarifCukaiDalamNegeri"
                        onChange={(value) =>
                          this.handleInputNumberChange("tarifCukaiDalamNegeri", value)
                        }
                        value={this.state.tarifCukaiDalamNegeri}
                        style={{ width: "100%" }}
                        min={0}
                      />
                    </Col>
                  )}

                  {this.state.idGolonganBkc === 4 && (
                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Tarif Cukai Impor</FormLabel>
                      </div>
                      <InputNumber
                        id="tarifCukaiImpor"
                        onChange={(value) => this.handleInputNumberChange("tarifCukaiImpor", value)}
                        value={this.state.tarifCukaiImpor}
                        style={{ width: "100%" }}
                        min={0}
                      />
                    </Col>
                  )}
                </>
              )}
            </Row>
          </Card>

          <Row>
            <Col span={8} offset={8}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  {this.state.isEdit ? (
                    <ButtonCustom variant="warning" block onClick={this.handleUbah}>
                      UBAH
                    </ButtonCustom>
                  ) : (
                    <Button type="primary" block onClick={this.handleSimpan}>
                      SIMPAN
                    </Button>
                  )}
                </Col>

                <Col span={12}>
                  {this.state.isEdit ? (
                    <Button type="danger" block onClick={this.handleBatal}>
                      BATAL
                    </Button>
                  ) : (
                    <Button type="danger" block onClick={this.handleReset}>
                      RESET
                    </Button>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>

          <Table
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            scroll={{ x: "max-content" }}
            onChange={this.handleTableChange}
            pagination={{ current: this.state.page }}
            style={{ marginTop: 30, marginBottom: 30 }}
          />

          <Row gutter={[16, 16]}>
            <Col span={4}>
              <ButtonCustom variant="secondary" onClick={() => this.props.history.goBack()} block>
                Kembali
              </ButtonCustom>
            </Col>

            <Col span={4}>
              <Button
                type="primary"
                loading={this.state.isRekamLoading}
                onClick={this.handleRekam}
                block
              >
                Rekam
              </Button>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
