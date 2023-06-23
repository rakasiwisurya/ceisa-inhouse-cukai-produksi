import React, { Component } from "react";
import { Row, Col, Input, Button, Icon, DatePicker, Select, Table, InputNumber } from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import { requestApi } from "utils/requestApi";
import { api } from "configs/api";
import moment from "moment";

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
      isJenisHtlRelLoading: true,
      isRekamLoading: false,

      nomor_surat: "",
      tanggal_surat: "",
      tanggal_awal_berlaku: "",
      nomor_peraturan: "",
      tanggal_peraturan: "",

      jenis_bkc_id: "",
      jenis_bkc_name: "",
      golongan_id: "",
      golongan_name: "",
      personal_id: "",
      personal_name: "",
      satuan: "[Satuan]",

      jenis_produksi_id: "",
      jenis_produksi_code: "",
      jenis_produksi_name: "",
      jenis_htl_rel_id: "",
      jenis_htl_rel_name: "",
      tarif: "",
      batas_produksi1: "",
      batas_produksi2: "",
      hje1: "",
      hje2: "",
      layer: "",

      kadar_atas: "",
      kadar_bawah: "",
      tarif_cukai_dalam_negeri: "",
      tarif_cukai_impor: "",

      searchText: "",
      searchedColumn: "",
      page: 1,

      list_jenis_bkc: [],
      list_golongan: [],
      list_personal: [
        {
          personal_id: "YA",
          personal_name: "Ya",
        },
        {
          personal_id: "TIDAK",
          personal_name: "Tidak",
        },
      ],
      list_jenis_produksi: [],
      list_jenis_htl_rel: [],
      columns: [],
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getJenisBkc();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.jenis_produksi_id !== this.state.jenis_produksi_id) {
      this.getJenisHtlRel();
    }

    if (prevState.jenis_bkc_id !== this.state.jenis_bkc_id) {
      this.getListGolongan();
      this.getListJenisProduksi();

      if (this.state.jenis_bkc_id === 3) {
        this.setState({
          columns: [
            {
              key: "aksi",
              dataIndex: "aksi",
              title: "Aksi",
              fixed: "left",
              render: (text, record, index) => (
                <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                  <Button
                    type="primary"
                    icon="form"
                    onClick={() => this.handleEdit(record, index)}
                  />
                  <Button type="danger" icon="close" onClick={() => this.handleDelete(index)} />
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
              key: "golongan_name",
              dataIndex: "golongan_name",
              title: "Golongan",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("golongan_name"),
            },
            {
              key: "jenis_produksi_name",
              dataIndex: "jenis_produksi_name",
              title: "Jenis Produksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("jenis_produksi_name"),
            },
            {
              key: "jenis_htl_rel_name",
              dataIndex: "jenis_htl_rel_name",
              title: "Jenis HPTL/REL",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jenis_htl_rel_name"),
            },
            {
              key: "hje1",
              dataIndex: "hje1",
              title: "HJE I",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("hje1"),
            },
            {
              key: "hje2",
              dataIndex: "hje2",
              title: "HJE II",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("hje2"),
            },
            {
              key: "layer",
              dataIndex: "layer",
              title: "Layer",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("layer"),
            },
            {
              key: "tarif",
              title: "Tarif",
              dataIndex: "tarif",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("tarif"),
            },
            {
              key: "batas_produksi1",
              title: "Batas I",
              dataIndex: "batas_produksi1",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("batas_produksi1"),
            },
            {
              key: "batas_produksi2",
              title: "Batas II",
              dataIndex: "batas_produksi2",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("batas_produksi2"),
            },
          ],
        });
      }

      if (this.state.jenis_bkc_id === 2) {
        this.setState({
          columns: [
            {
              key: "aksi",
              dataIndex: "aksi",
              title: "Aksi",
              fixed: "left",
              render: (text, record, index) => (
                <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                  <Button
                    type="primary"
                    icon="form"
                    onClick={() => this.handleEdit(record, index)}
                  />
                  <Button type="danger" icon="close" onClick={() => this.handleDelete(index)} />
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
              key: "golongan_name",
              dataIndex: "golongan_name",
              title: "Golongan",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("golongan_name"),
            },
            {
              key: "jenis_produksi_name",
              dataIndex: "jenis_produksi_name",
              title: "Jenis Produksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("jenis_produksi_name"),
            },
            {
              key: "kadar_atas",
              dataIndex: "kadar_atas",
              title: "Kadar Atas",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("kadar_atas"),
            },
            {
              key: "kadar_bawah",
              dataIndex: "kadar_bawah",
              title: "Kadar Bawah",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("kadar_bawah"),
            },
            {
              key: "tarif_cukai_dalam_negeri",
              dataIndex: "tarif_cukai_dalam_negeri",
              title: "Tarif Cukai Dalam Negeri",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("tarif_cukai_dalam_negeri"),
            },
            {
              key: "tarif_cukai_impor",
              dataIndex: "tarif_cukai_impor",
              title: "Tarif Cukai Impor",
              render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
              ...this.getColumnSearchProps("tarif_cukai_impor"),
            },
          ],
        });
      }
    }
  }

  getJenisBkc = async () => {
    // const response = await api.referensi.json.get("/referensi/jenis-bkc")
    // console.log('response.data', response.data)

    //  const response = await requestApi({
    //     service: "referensi",
    //     method: "get",
    //     endpoint: "/referensi/jenis-bkc",
    //     setLoading: (bool) => this.setState({ isJenisBkcLoading: bool }),
    //   });
    //   if(response) {
    //     console.log('response.data', response.data)
    //   }

    this.setState({ isJenisBkcLoading: true });
    setTimeout(() => {
      this.setState({
        list_jenis_bkc: [
          {
            idJenisBkc: 3,
            namaJenisBkc: "HT",
          },
          {
            idJenisBkc: 2,
            namaJenisBkc: "MMEA",
          },
        ],
      });
      this.setState({ isJenisBkcLoading: false });
    }, 2000);
  };
  getListGolongan = async () => {
    // const payload = { idJenisBkc: this.state.jenis_bkc_id };
    // const response = await api.referensi.json.get("/referensi/golongan", payload);
    // console.log("response.data", response.data);

    // const response = await requestApi({
    //   service: "referensi",
    //   method: "get",
    //   endpoint: "/referensi/golongan",
    //   payload,
    //   setLoading: (bool) => this.setState({ isGolonganLoading: bool }),
    // });
    // if(response) {
    //   console.log('response.data', response.data)
    // }

    this.setState({ isGolonganLoading: true });
    setTimeout(() => {
      if (this.state.jenis_bkc_id === 3) {
        this.setState({
          list_golongan: [
            {
              idGolongan: 1,
              namaGolongan: "I",
            },
            {
              idGolongan: 2,
              namaGolongan: "II",
            },
            {
              idGolongan: 3,
              namaGolongan: "III",
            },
            {
              idGolongan: 4,
              namaGolongan: "III/A",
            },
            {
              idGolongan: 5,
              namaGolongan: "III/B",
            },
            {
              idGolongan: 6,
              namaGolongan: "IMPORTIR HT",
            },
            {
              idGolongan: 7,
              namaGolongan: "TANPA GOLONGAN",
            },
          ],
        });
      } else {
        this.setState({
          list_golongan: [
            {
              idGolongan: 1,
              namaGolongan: "A",
            },
            {
              idGolongan: 2,
              namaGolongan: "B",
            },
            {
              idGolongan: 3,
              namaGolongan: "C",
            },
          ],
        });
      }
      this.setState({ isGolonganLoading: false });
    }, 2000);
  };
  getListJenisProduksi = async () => {
    // const payload = {idJenisBkc: this.state.jenis_bkc_id}
    // const response = await api.referensi.json.get("/referensi/jenis-produksi", payload)
    // console.log('response.data', response.data)

    // const response = await requestApi({
    //   service: "referensi",
    //   method: "get",
    //   endpoint: "/referensi/jenis-produksi",
    //   payload,
    //   setLoading: (bool) => this.setState({ isJenisProduksiLoading: bool }),
    // });
    // if(response) {
    //   console.log('response.data', response.data)
    // }

    this.setState({ isJenisProduksiLoading: true });
    setTimeout(() => {
      if (this.state.jenis_bkc_id === 3) {
        this.setState({
          list_jenis_produksi: [
            {
              idJenisProduksi: 1,
              kodeJenisProduksi: "SKM",
              namaJenisProduksi: "SIGARET KRETEK MESIN",
            },
            {
              idJenisProduksi: 2,
              kodeJenisProduksi: "CRT",
              namaJenisProduksi: "CERUTU",
            },
            {
              idJenisProduksi: 3,
              kodeJenisProduksi: "HTL",
              namaJenisProduksi: "HASIL TEMBAKAU LAINNYA",
            },
            {
              idJenisProduksi: 4,
              kodeJenisProduksi: "STF",
              namaJenisProduksi: "SIGARET KRETEK TANGAN FILTER",
            },
            {
              idJenisProduksi: 5,
              kodeJenisProduksi: "SPT",
              namaJenisProduksi: "SIGARET PUTIH TANGAN",
            },
            {
              idJenisProduksi: 6,
              kodeJenisProduksi: "SPM",
              namaJenisProduksi: "SIGARET PUTIH MESIN",
            },
            {
              idJenisProduksi: 7,
              kodeJenisProduksi: "TIS",
              namaJenisProduksi: "TEMBAKAU IRIS",
            },
            {
              idJenisProduksi: 8,
              kodeJenisProduksi: "KLM",
              namaJenisProduksi: "KELEMBAK MENYAN",
            },
            {
              idJenisProduksi: 9,
              kodeJenisProduksi: "KLB",
              namaJenisProduksi: "KLOBOT",
            },
            {
              idJenisProduksi: 10,
              kodeJenisProduksi: "SKT",
              namaJenisProduksi: "SIGARET KRETEK TANGAN",
            },
            {
              idJenisProduksi: 11,
              kodeJenisProduksi: "SPF",
              namaJenisProduksi: "SIGARET PUTIH TANGAN FILTER",
            },
            {
              idJenisProduksi: 12,
              kodeJenisProduksi: "REL",
              namaJenisProduksi: "ROKOK ELEKTRIK",
            },
          ],
        });
      } else {
        this.setState({
          list_jenis_produksi: [
            {
              idJenisProduksi: 1,
              kodeJenisProduksi: "MMEA1",
              namaJenisProduksi: "Nama MMEA1",
            },
            {
              idJenisProduksi: 2,
              kodeJenisProduksi: "MMEA2",
              namaJenisProduksi: "Nama MMEA2",
            },
            {
              idJenisProduksi: 3,
              kodeJenisProduksi: "MMEA3",
              namaJenisProduksi: "Nama MMEA3",
            },
          ],
        });
      }

      this.setState({ isJenisProduksiLoading: false });
    }, 2000);
  };
  getJenisHtlRel = async () => {
    // const payload = {idJenisProduksi: this.state.jenis_produksi_id}
    // const response = await api.referensi.json.get("/referensi/jenis-htl-rel", payload)
    // console.log('response.data', response.data)

    //  const response = await requestApi({
    //     service: "referensi",
    //     method: "get",
    //     endpoint: "/referensi/jenis-htl-rel",
    //     payload,
    //     setLoading: (bool) => this.setState({ isJenisHtlRel: bool }),
    //   });
    //   if(response) {
    //     console.log('response.data', response.data)
    //   }

    this.setState({ isJenisHtlRelLoading: true });
    setTimeout(() => {
      if (this.state.jenis_produksi_code === "HTL") {
        this.setState({
          list_jenis_htl_rel: [
            {
              idJenisHtlRel: 1,
              kodeHtlRel: "ABC",
              namaJenisHtlRel: "Jenis HTL",
              kodeJenisProduksiBkc: "HTL",
            },
            {
              idJenisHtlRel: 2,
              kodeHtlRel: "DEF",
              namaJenisHtlRel: "Jenis HTL",
              kodeJenisProduksiBkc: "HTL",
            },
          ],
        });
      } else {
        this.setState({
          list_jenis_htl_rel: [
            {
              idJenisHtlRel: 1,
              kodeHtlRel: "GHI",
              namaJenisHtlRel: "Jenis REL",
              kodeJenisProduksiBkc: "REL",
            },
            {
              idJenisHtlRel: 2,
              kodeHtlRel: "JKL",
              namaJenisHtlRel: "Jenis REL",
              kodeJenisProduksiBkc: "REL",
            },
          ],
        });
      }
      this.setState({ isJenisHtlRelLoading: false });
    }, 2000);
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
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
        setTimeout(() => this.searchInput.select());
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
    this.setState({ [e.target.id]: e.target.value });
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
      [`${field}_id`]: value,
      [`${field}_name`]: option.props.children,
    });
  };

  handleSimpan = () => {
    const {
      jenis_bkc_id,
      jenis_bkc_name,
      golongan_id,
      golongan_name,
      personal_id,
      personal_name,

      jenis_produksi_id,
      jenis_produksi_code,
      jenis_produksi_name,
      jenis_htl_rel_id,
      jenis_htl_rel_name,
      tarif,
      batas_produksi1,
      batas_produksi2,
      hje1,
      hje2,
      layer,

      kadar_atas,
      kadar_bawah,
      tarif_cukai_dalam_negeri,
      tarif_cukai_impor,
    } = this.state;

    this.setState({
      dataSource: [
        ...this.state.dataSource,
        {
          key: new Date().getTime(),
          jenis_bkc_id,
          jenis_bkc_name,
          golongan_id,
          golongan_name,
          personal_id,
          personal_name,
          jenis_produksi_id,
          jenis_produksi_code,
          jenis_produksi_name,
          jenis_htl_rel_id,
          jenis_htl_rel_name,
          tarif,
          batas_produksi1,
          batas_produksi2,
          hje1,
          hje2,
          layer,
          kadar_atas,
          kadar_bawah,
          tarif_cukai_dalam_negeri,
          tarif_cukai_impor,
        },
      ],
    });

    this.setState({
      golongan_id: "",
      golongan_name: "",
      personal_id: "",
      personal_name: "",

      jenis_produksi_id: "",
      jenis_produksi_code: "",
      jenis_produksi_name: "",
      jenis_htl_rel_id: "",
      jenis_htl_rel_name: "",
      tarif: "",
      batas_produksi1: "",
      batas_produksi2: "",
      hje1: "",
      hje2: "",
      layer: "",

      kadar_atas: "",
      kadar_bawah: "",
      tarif_cukai_dalam_negeri: "",
      tarif_cukai_impor: "",
    });
  };
  handleReset = () => {
    this.setState({
      isEdit: false,
      jenis_bkc_id: "",
      jenis_bkc_name: "",
      golongan_id: "",
      golongan_name: "",
      personal_id: "",
      personal_name: "",

      jenis_produksi_id: "",
      jenis_produksi_code: "",
      jenis_produksi_name: "",
      jenis_htl_rel_id: "",
      jenis_htl_rel_name: "",
      tarif: "",
      batas_produksi1: "",
      batas_produksi2: "",
      hje1: "",
      hje2: "",
      layer: "",

      kadar_atas: "",
      kadar_bawah: "",
      tarif_cukai_dalam_negeri: "",
      tarif_cukai_impor: "",
      dataSource: [],
    });
  };
  handleUbah = (index) => {
    const {
      jenis_bkc_id,
      jenis_bkc_name,
      golongan_id,
      golongan_name,
      personal_id,
      personal_name,

      jenis_produksi_id,
      jenis_produksi_code,
      jenis_produksi_name,
      jenis_htl_rel_id,
      jenis_htl_rel_name,
      tarif,
      batas_produksi1,
      batas_produksi2,
      hje1,
      hje2,
      layer,

      kadar_atas,
      kadar_bawah,
      tarif_cukai_dalam_negeri,
      tarif_cukai_impor,
    } = this.state;

    const newDataSource = this.state.dataSource.map((item) => item);
    newDataSource.splice(index, 1, {
      key: new Date().getTime(),
      jenis_bkc_id,
      jenis_bkc_name,
      golongan_id,
      golongan_name,
      personal_id,
      personal_name,

      jenis_produksi_id,
      jenis_produksi_code,
      jenis_produksi_name,
      jenis_htl_rel_id,
      jenis_htl_rel_name,
      tarif,
      batas_produksi1,
      batas_produksi2,
      hje1,
      hje2,
      layer,

      kadar_atas,
      kadar_bawah,
      tarif_cukai_dalam_negeri,
      tarif_cukai_impor,
    });
    this.setState({
      isEdit: false,
      editIndex: null,
      golongan_id: "",
      golongan_name: "",
      personal_id: "",
      personal_name: "",

      jenis_produksi_id: "",
      jenis_produksi_code: "",
      jenis_produksi_name: "",
      jenis_htl_rel_id: "",
      jenis_htl_rel_name: "",
      tarif: "",
      batas_produksi1: "",
      batas_produksi2: "",
      hje1: "",
      hje2: "",
      layer: "",

      kadar_atas: "",
      kadar_bawah: "",
      tarif_cukai_dalam_negeri: "",
      tarif_cukai_impor: "",
      dataSource: newDataSource,
    });
  };
  handleBatal = () => {
    this.setState({
      isEdit: false,
      golongan_id: "",
      golongan_name: "",
      personal_id: "",
      personal_name: "",

      jenis_produksi_id: "",
      jenis_produksi_code: "",
      jenis_produksi_name: "",
      jenis_htl_rel_id: "",
      jenis_htl_rel_name: "",
      tarif: "",
      batas_produksi1: "",
      batas_produksi2: "",
      hje1: "",
      hje2: "",
      layer: "",

      kadar_atas: "",
      kadar_bawah: "",
      tarif_cukai_dalam_negeri: "",
      tarif_cukai_impor: "",
    });
  };

  handleEdit = (record, index) => {
    this.setState({
      isEdit: true,
      editIndex: index,
      jenis_bkc_id: record.jenis_bkc_id,
      jenis_bkc_name: record.jenis_bkc_name,
      golongan_id: record.golongan_id,
      golongan_name: record.golongan_name,
      personal_id: record.personal_id,
      personal_name: record.personal_name,

      jenis_produksi_id: record.jenis_produksi_id,
      jenis_produksi_code: record.jenis_produksi_code,
      jenis_produksi_name: record.jenis_produksi_name,
      jenis_htl_rel_id: record.jenis_htl_rel_id,
      jenis_htl_rel_name: record.jenis_htl_rel_name,
      tarif: record.tarif,
      batas_produksi1: record.batas_produksi1,
      batas_produksi2: record.batas_produksi2,
      hje1: record.hje1,
      hje2: record.hje2,
      layer: record.layer,

      kadar_atas: record.kadar_atas,
      kadar_bawah: record.kadar_bawah,
      tarif_cukai_dalam_negeri: record.tarif_cukai_dalam_negeri,
      tarif_cukai_impor: record.tarif_cukai_impor,
    });
  };
  handleDelete = (index) => {
    const newDataSource = this.state.dataSource.map((item) => item);
    newDataSource.splice(index, 1);
    this.setState({ dataSource: newDataSource });
  };

  handleRekam = () => {
    const details = this.state.dataSource.map((item) => {
      if (this.state.jenis_bkc_id === 3) {
        return {
          idJenisBkc: item.jenis_bkc_id,
          idGolongan: item.golongan_id,
          idJenisProduksi: item.jenis_produksi_id,
          idJenisHtlRel: item.jenis_htl_rel_id,
          tarif: item.tarif,
          batasProduksi1: item.batas_produksi1,
          batasProduksi2: item.batas_produksi2,
          hje1: item.hje1,
          hje2: item.hje2,
          layer: item.layer,
        };
      }

      return {
        idJenisBkc: item.jenis_bkc_id,
        idGolongan: item.golongan_id,
        idJenisProduksi: item.jenis_produksi_id,
        kadarAtas: item.kadar_atas,
        kadarBawah: item.kadar_bawah,
        tarifCukaiDalamNegeri: item.tarif_cukai_dalam_negeri,
        tarifCukaiImpor: item.tarif_cukai_impor,
      };
    });

    const data = {
      header: {
        noSurat: this.state.nomor_surat,
        tanggalSurat: moment(this.state.tanggal_surat).format("YYYY-MM-DD"),
        tanggalAwalBerlaku: moment(this.state.tanggal_awal_berlaku).format("YYYY-MM-DD"),
        nomorPeraturan: this.state.nomor_peraturan,
        tanggalPeraturan: moment(this.state.tanggal_peraturan).format("YYYY-MM-DD"),
      },
      details,
    };

    // const response = await api.referensi.json.post("/referensi/browse-rekam-warna", data);
    // console.log("response.data", response.data);

    // const response = await requestApi({
    //   service: "referensi",
    //   method: "post",
    //   endpoint: "/referensi/browse-rekam-warna",
    //   payload: data,
    //   setLoading: (bool) => this.setState({ isRekamLoading: bool }),
    // });
    // if(response) {
    //   console.log('response.data', response.data)
    // }

    this.setState({ isRekamLoading: true });
    setTimeout(() => {
      console.log("data", data);
      this.setState({ isRekamLoading: false });
    }, 2000);
  };

  render() {
    return (
      <>
        <Container
          menuName="Referensi Tarif dan Pita Cukai"
          contentName="Referensi Tarif Rekam"
          hideContentHeader
        >
          <Header>{this.state.subtitle1}</Header>
          <div
            className="kt-content  kt-grid__item kt-grid__item--fluid"
            id="kt_content"
            style={{ paddingBottom: 10 }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Nomor Surat</FormLabel>
                </div>
                <Input
                  id="nomor_surat"
                  onChange={this.handleInputChange}
                  value={this.state.nomor_surat}
                />
              </Col>
              <Col span={6}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Surat</FormLabel>
                </div>
                <DatePicker
                  id="tanggal_surat"
                  onChange={(value) => this.handleDatepickerChange("tanggal_surat", value)}
                  value={this.state.tanggal_surat}
                />
              </Col>
              <Col span={6}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Awal Berlaku</FormLabel>
                </div>
                <DatePicker
                  id="tanggal_awal_berlaku"
                  onChange={(value) => this.handleDatepickerChange("tanggal_awal_berlaku", value)}
                  value={this.state.tanggal_awal_berlaku}
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
                  id="nomor_peraturan"
                  onChange={this.handleInputChange}
                  value={this.state.nomor_peraturan}
                />
              </Col>
              <Col span={6}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Peraturan</FormLabel>
                </div>
                <DatePicker
                  id="tanggal_peraturan"
                  onChange={(value) => this.handleDatepickerChange("tanggal_peraturan", value)}
                  style={{ width: "100%" }}
                  value={this.state.tanggal_peraturan}
                />
              </Col>
            </Row>
          </div>

          <Header>{this.state.subtitle2}</Header>
          <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jenis BKC</FormLabel>
                </div>
                <Select
                  id="jenis_bkc"
                  onChange={(value, option) => {
                    this.setState({
                      golongan_id: "",
                      golongan_name: "",
                      jenis_produksi_id: "",
                      jenis_produksi_name: "",
                      jenis_htl_rel_id: "",
                      jenis_htl_rel_name: "",
                      list_jenis_produksi: [],
                      list_golongan: [],
                    });
                    this.handleSelectCustomChange("jenis_bkc", value, option);
                  }}
                  style={{ width: "100%" }}
                  value={this.state.jenis_bkc_id}
                  loading={this.state.isJenisBkcLoading}
                  disabled={this.state.dataSource.length > 0}
                >
                  {this.state.list_jenis_bkc.length > 0 &&
                    this.state.list_jenis_bkc.map((item, index) => (
                      <Select.Option key={`jenis-bkc-${index}`} value={item.idJenisBkc}>
                        {item.namaJenisBkc}
                      </Select.Option>
                    ))}
                </Select>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
              {this.state.jenis_bkc_id && (
                <>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Golongan</FormLabel>
                    </div>
                    <Select
                      id="golongan"
                      onChange={(value, option) =>
                        this.handleSelectCustomChange("golongan", value, option)
                      }
                      value={this.state.golongan_id}
                      loading={this.state.isGolonganLoading}
                      style={{ width: "100%" }}
                    >
                      {this.state.list_golongan.length > 0 &&
                        this.state.list_golongan.map((item, index) => (
                          <Select.Option key={`golongan-${index}`} value={item.idGolongan}>
                            {item.namaGolongan}
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
                      value={this.state.personal_id}
                      style={{ width: "100%" }}
                    >
                      {this.state.list_personal.length > 0 &&
                        this.state.list_personal.map((item, index) => (
                          <Select.Option key={`personal-${index}`} value={item.personal_id}>
                            {item.personal_name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Produksi</FormLabel>
                    </div>
                    <Select
                      id="jenis_produksi"
                      onChange={(value, option) => {
                        this.setState({
                          jenis_htl_rel_id: "",
                          jenis_htl_rel_name: "",
                          list_jenis_htl_rel: [],
                          jenis_produksi_code: option.props.children
                            .split("-")[0]
                            .replace(/[()\s]/g, ""),
                        });
                        this.handleSelectCustomChange("jenis_produksi", value, option);
                      }}
                      value={this.state.jenis_produksi_id}
                      loading={this.state.isJenisProduksiLoading}
                      style={{ width: "100%" }}
                    >
                      {this.state.list_jenis_produksi.length > 0 &&
                        this.state.list_jenis_produksi.map((item, index) => (
                          <Select.Option
                            key={`jenis-produksi-${index}`}
                            value={item.idJenisProduksi}
                          >
                            {`(${item.kodeJenisProduksi}) - ${item.namaJenisProduksi}`}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>
                </>
              )}

              {this.state.jenis_bkc_id === 3 && (
                <>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis HPTL/REL</FormLabel>
                    </div>
                    <Select
                      id="jenis_htl_rel"
                      onChange={(value, option) =>
                        this.handleSelectCustomChange("jenis_htl_rel", value, option)
                      }
                      value={this.state.jenis_htl_rel_id}
                      loading={this.state.isJenisHtlRelLoading}
                      style={{ width: "100%" }}
                      disabled={
                        !(
                          this.state.jenis_produksi_code === "HTL" ||
                          this.state.jenis_produksi_code === "REL"
                        )
                      }
                    >
                      {this.state.list_jenis_htl_rel.length > 0 &&
                        this.state.list_jenis_htl_rel.map((item, index) => (
                          <Select.Option key={`jenis_htl_rel-${index}`} value={item.idJenisHtlRel}>
                            {item.namaJenisHtlRel}
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
                      {this.state.satuan && (
                        <>
                          <div>/</div>
                          <div>{this.state.satuan}</div>
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
                        id="batas_produksi1"
                        onChange={(value) => this.handleInputNumberChange("batas_produksi1", value)}
                        value={this.state.batas_produksi1}
                        style={{ flex: 1 }}
                        min={0}
                      />
                      <div>s.d</div>
                      <InputNumber
                        id="batas_produksi2"
                        onChange={(value) => this.handleInputNumberChange("batas_produksi2", value)}
                        value={this.state.batas_produksi2}
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
                          style={{ flex: 1 }}
                          min={0}
                        />
                      </div>
                      <div>s.d</div>
                      <div>
                        <InputNumber
                          id="hje2"
                          onChange={(value) => this.handleInputNumberChange("hje2", value)}
                          value={this.state.hje2}
                          style={{ flex: 1 }}
                          min={0}
                        />
                      </div>
                      {this.state.satuan && (
                        <>
                          <div>/</div>
                          <div>{this.state.satuan}</div>
                        </>
                      )}
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Layer</FormLabel>
                    </div>
                    <Input id="layer" onChange={this.handleInputChange} value={this.state.layer} />
                  </Col>
                </>
              )}

              {this.state.jenis_bkc_id === 2 && (
                <>
                  <Col span={12}>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Kadar Atas</FormLabel>
                        </div>
                        <InputNumber
                          id="kadar_atas"
                          onChange={(value) => this.handleInputNumberChange("kadar_atas", value)}
                          value={this.state.kadar_atas}
                          style={{ width: "100%" }}
                          min={0}
                        />
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Kadar Bawah</FormLabel>
                        </div>
                        <InputNumber
                          id="kadar_bawah"
                          onChange={(value) => this.handleInputNumberChange("kadar_bawah", value)}
                          value={this.state.kadar_bawah}
                          style={{ width: "100%" }}
                          min={0}
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif Cukai Dalam Negeri</FormLabel>
                    </div>
                    <InputNumber
                      id="tarif_cukai_dalam_negeri"
                      onChange={(value) =>
                        this.handleInputNumberChange("tarif_cukai_dalam_negeri", value)
                      }
                      value={this.state.tarif_cukai_dalam_negeri}
                      style={{ width: "100%" }}
                      min={0}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif Cukai Impor</FormLabel>
                    </div>
                    <InputNumber
                      id="tarif_cukai_impor"
                      onChange={(value) => this.handleInputNumberChange("tarif_cukai_impor", value)}
                      value={this.state.tarif_cukai_impor}
                      style={{ width: "100%" }}
                      min={0}
                    />
                  </Col>
                </>
              )}
            </Row>

            <Row>
              <Col span={8} offset={8}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    {this.state.isEdit ? (
                      <Button type="primary" block onClick={this.handleUbah}>
                        UBAH
                      </Button>
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

            {this.state.jenis_bkc_id && (
              <>
                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <Table
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    scroll={{ x: "max-content" }}
                    onChange={this.handleTableChange}
                    pagination={{ current: this.state.page }}
                  />
                </div>

                <Row>
                  <Col span={4} offset={20}>
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
              </>
            )}
          </div>
        </Container>
      </>
    );
  }
}