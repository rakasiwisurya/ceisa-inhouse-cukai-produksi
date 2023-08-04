import React, { Component } from "react";
import {
  Row,
  Col,
  Input,
  Button,
  DatePicker,
  Select,
  InputNumber,
  notification,
  Icon,
  Table,
} from "antd";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import Header from "components/Header";
import moment from "moment";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import { requestApi } from "utils/requestApi";
import { pathName } from "configs/constants";
import ButtonCustom from "components/Button/ButtonCustom";

export default class ReferensiTarifEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Surat Keputusan",
      subtitle2: "Rincian",
      isEdit: false,
      editIndex: null,

      isDetailTarifLoading: true,
      isSimpanPerubahanLoading: false,
      isJenisBkcLoading: true,
      isGolonganLoading: true,
      isJenisProduksiLoading: true,
      isJenisHtlRelLoading: false,
      isTableLoading: false,

      nomor_surat: null,
      tanggal_surat: null,
      tanggal_awal_berlaku: null,
      nomor_peraturan: null,
      tanggal_peraturan: null,

      jenis_bkc_id: null,
      jenis_bkc_name: null,
      golongan_id: null,
      golongan_name: null,
      personal_id: null,
      personal_name: null,
      jenis_produksi_bkc_satuan: null,
      jenis_htl_rel_satuan: null,

      jenis_produksi_id: null,
      jenis_produksi_code: null,
      jenis_produksi_name: null,
      jenis_htl_rel_id: null,
      jenis_htl_rel_name: null,
      tarif: null,
      batas_produksi1: null,
      batas_produksi2: null,
      hje1: null,
      hje2: null,
      layer: null,

      kadar_atas: null,
      kadar_bawah: null,
      tarif_cukai_dalam_negeri: null,
      tarif_cukai_impor: null,

      searchText: null,
      searchedColumn: null,
      page: 1,

      list_jenis_bkc: [],
      list_golongan: [],
      list_personal: [
        {
          personal_id: "Y",
          personal_name: "Ya",
        },
        {
          personal_id: "T",
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
    this.getDetailTarif();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.jenis_produksi_id !== this.state.jenis_produksi_id) {
      if (
        +this.state.jenis_produksi_id.split(" ")[0] === 2 ||
        +this.state.jenis_produksi_id.split(" ")[0] === 5
      ) {
        this.getJenisHtlRel();
      }
    }

    if (prevState.jenis_bkc_id !== this.state.jenis_bkc_id) {
      if (this.state.jenis_bkc_id) {
        this.getListGolongan();
        this.getListJenisProduksi();
      }

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
                  <ButtonCustom
                    variant="warning"
                    icon="form"
                    onClick={() => this.handleEdit(record, index)}
                  />
                  {record.tarif_detail_id ? (
                    <Button
                      type="danger"
                      icon="delete"
                      onClick={() => this.handleDeleteApi(index, record.tarif_detail_id)}
                    />
                  ) : (
                    <Button type="danger" icon="close" onClick={() => this.handleDelete(index)} />
                  )}
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
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("golongan_name"),
            },
            {
              key: "jenis_produksi_name",
              dataIndex: "jenis_produksi_name",
              title: "Jenis Produksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
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
              key: "batas_produksi1",
              title: "Batas I",
              dataIndex: "batas_produksi1",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("batas_produksi1"),
            },
            {
              key: "batas_produksi2",
              title: "Batas II",
              dataIndex: "batas_produksi2",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
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
                  <ButtonCustom
                    variant="warning"
                    icon="form"
                    onClick={() => this.handleEdit(record, index)}
                  />
                  {record.tarif_detail_id ? (
                    <Button
                      type="danger"
                      icon="delete"
                      onClick={() => this.handleDeleteApi(index, record.tarif_detail_id)}
                    />
                  ) : (
                    <Button type="danger" icon="close" onClick={() => this.handleDelete(index)} />
                  )}
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
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("golongan_name"),
            },
            {
              key: "jenis_produksi_name",
              dataIndex: "jenis_produksi_name",
              title: "Jenis Produksi",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jenis_produksi_name"),
            },
            {
              key: "kadar_atas",
              dataIndex: "kadar_atas",
              title: "Kadar Atas",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("kadar_atas"),
            },
            {
              key: "kadar_bawah",
              dataIndex: "kadar_bawah",
              title: "Kadar Bawah",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("kadar_bawah"),
            },
            {
              key: "tarif_cukai_dalam_negeri",
              dataIndex: "tarif_cukai_dalam_negeri",
              title: "Tarif Cukai Dalam Negeri",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("tarif_cukai_dalam_negeri"),
            },
            {
              key: "tarif_cukai_impor",
              dataIndex: "tarif_cukai_impor",
              title: "Tarif Cukai Impor",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("tarif_cukai_impor"),
            },
          ],
        });
      }
    }
  }

  getDetailTarif = async () => {
    const payload = { idSkepHeader: this.props.match.params.id };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/browse-detail-tarif",
      params: payload,
      setLoading: (bool) => this.setState({ isDetailTarifLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState({
        nomor_surat: data.nomorSkep,
        tanggal_surat: moment(data.tanggalSkep),
        tanggal_awal_berlaku: moment(data.tanggalAwalBerlaku),
        nomor_peraturan: data.nomorPeraturan,
        tanggal_peraturan: moment(data.tanggalPeraturan),
        jenis_bkc_id: data.idJenisBkc,
        jenis_bkc_name: data.namaJenisBkc,
        jenis_produksi_id: `${data.idJenisProduksiBkc} ${data.satuanJenisProduksiBkc}`,
        jenis_produksi_code: data.kodeJenisProduksiBkc,
        jenis_produksi_name: data.namaJenisProduksiBkc,
        dataSource: data.details.map((detail, index) => ({
          key: `referensi-${index}`,
          tarif_detail_id: detail.idTarifBkcDetail,
          jenis_bkc_id: detail.idJenisBkc,
          jenis_bkc_name: detail.namaJenisBkc,
          golongan_id: detail.idGolonganBkc,
          golongan_name: detail.namaGolonganBkc,
          personal_id: detail.flagPersonal,
          jenis_produksi_id: `${detail.idJenisProduksiBkc} ${detail.satuanJenisProduksiBkc}`,
          jenis_produksi_code: detail.kodeJenisProduksiBkc,
          jenis_produksi_name: `(${detail.kodeJenisProduksiBkc}) - ${detail.namaJenisProduksiBkc}`,
          jenis_produksi_bkc_satuan: detail.satuanJenisProduksiBkc,
          jenis_htl_rel_satuan: detail.satuanJenisHtlRel,

          jenis_htl_rel_id: `${detail.idJenisHtlRel} ${detail.satuanJenisHtlRel}`,
          jenis_htl_rel_code: detail.kodeJenisHtlRel,
          jenis_htl_rel_name: `(${detail.kodeJenisHtlRel}) - ${detail.namaJenisHtlRel}`,
          tarif: detail.tarif,
          batas_produksi1: detail.batasProduksi1,
          batas_produksi2: detail.batasProduksi2,
          hje1: detail.hje1,
          hje2: detail.hje2,
          layer: detail.layer,

          kadar_atas: detail.kadarAtas,
          kadar_bawah: detail.kadarBawah,
          tarif_cukai_dalam_negeri: detail.tarifCukaiDalamNegeri,
          tarif_cukai_impor: detail.tarifCukaiImpor,
        })),
      });
    }
  };
  getJenisBkc = async () => {
    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/jenis-bkc",
      setLoading: (bool) => this.setState({ isJenisBkcLoading: bool }),
    });

    if (response) {
      const newData = response.data.data.map((item) => item);
      newData.splice(0, 1);
      this.setState({ list_jenis_bkc: newData });
    }
  };
  getListGolongan = async () => {
    const payload = { idJenisBkc: this.state.jenis_bkc_id };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/golongan",
      params: payload,
      setLoading: (bool) => this.setState({ isGolonganLoading: bool }),
    });

    if (response) this.setState({ list_golongan: response.data.data });
  };
  getListJenisProduksi = async () => {
    const payload = { idJenisBkc: this.state.jenis_bkc_id };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/jenis-produksi",
      params: payload,
      setLoading: (bool) => this.setState({ isJenisProduksiLoading: bool }),
    });

    if (response) this.setState({ list_jenis_produksi: response.data.data });
  };
  getJenisHtlRel = async () => {
    const payload = { idJenisProduksiBkc: +this.state.jenis_produksi_id.split(" ")[0] };

    const response = await requestApi({
      service: "referensi",
      method: "get",
      endpoint: "/referensi/jenis-htl-rel",
      params: payload,
      setLoading: (bool) => this.setState({ isJenisHtlRelLoading: bool }),
    });

    if (response) this.setState({ list_jenis_htl_rel: response.data.data });
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

  validationForm = () => {
    const {
      nomor_surat,
      tanggal_surat,
      tanggal_awal_berlaku,
      nomor_peraturan,
      tanggal_peraturan,
      dataSource,
    } = this.state;

    if (
      !nomor_surat ||
      !tanggal_surat ||
      !tanggal_awal_berlaku ||
      !nomor_peraturan ||
      !tanggal_peraturan ||
      dataSource.length < 1
    ) {
      return false;
    }

    return true;
  };
  validationInsert = () => {
    const {
      jenis_bkc_id,
      golongan_id,
      personal_id,
      jenis_produksi_id,
      jenis_htl_rel_id,
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

    if (!jenis_bkc_id) return false;

    if (
      jenis_bkc_id === 3 &&
      (!golongan_id ||
        !personal_id ||
        !jenis_produksi_id ||
        !tarif ||
        !batas_produksi1 ||
        !batas_produksi2 ||
        !hje1 ||
        !hje2 ||
        !layer)
    ) {
      return false;
    }

    if (
      jenis_bkc_id === 3 &&
      (jenis_produksi_id === 2 || jenis_produksi_id === 5) &&
      (!jenis_htl_rel_id ||
        !tarif ||
        !batas_produksi1 ||
        !batas_produksi2 ||
        !hje1 ||
        !hje2 ||
        !layer)
    ) {
      return false;
    }

    if (jenis_bkc_id === 2 && !golongan_id) return false;

    if (
      jenis_bkc_id === 2 &&
      golongan_id === 4 &&
      (!personal_id || !jenis_produksi_id || !kadar_atas || !kadar_bawah || !tarif_cukai_impor)
    ) {
      return false;
    }

    if (
      jenis_bkc_id === 2 &&
      golongan_id === 5 &&
      (!personal_id ||
        !jenis_produksi_id ||
        !kadar_atas ||
        !kadar_bawah ||
        !tarif_cukai_dalam_negeri)
    ) {
      return false;
    }

    return true;
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
      jenis_produksi_bkc_satuan,
      jenis_htl_rel_satuan,

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
          jenis_produksi_bkc_satuan,
          jenis_htl_rel_satuan,
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
      golongan_id: null,
      golongan_name: null,
      personal_id: null,
      personal_name: null,

      jenis_produksi_id: null,
      jenis_produksi_code: null,
      jenis_produksi_name: null,
      jenis_htl_rel_id: null,
      jenis_htl_rel_name: null,
      tarif: null,
      batas_produksi1: null,
      batas_produksi2: null,
      hje1: null,
      hje2: null,
      layer: null,
      jenis_produksi_bkc_satuan: null,
      jenis_htl_rel_satuan: null,

      kadar_atas: null,
      kadar_bawah: null,
      tarif_cukai_dalam_negeri: null,
      tarif_cukai_impor: null,
    });
  };
  handleReset = () => {
    this.setState({
      isEdit: false,
      jenis_bkc_id: null,
      jenis_bkc_name: null,
      golongan_id: null,
      golongan_name: null,
      personal_id: null,
      personal_name: null,

      jenis_produksi_id: null,
      jenis_produksi_code: null,
      jenis_produksi_name: null,
      jenis_htl_rel_id: null,
      jenis_htl_rel_name: null,
      tarif: null,
      batas_produksi1: null,
      batas_produksi2: null,
      hje1: null,
      hje2: null,
      layer: null,
      jenis_produksi_bkc_satuan: null,
      jenis_htl_rel_satuan: null,

      kadar_atas: null,
      kadar_bawah: null,
      tarif_cukai_dalam_negeri: null,
      tarif_cukai_impor: null,
      dataSource: [],
    });
  };
  handleUbah = () => {
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
      jenis_produksi_bkc_satuan,
      jenis_htl_rel_satuan,

      kadar_atas,
      kadar_bawah,
      tarif_cukai_dalam_negeri,
      tarif_cukai_impor,
    } = this.state;

    const newDataSource = this.state.dataSource.map((item) => item);
    newDataSource.splice(this.state.editIndex, 1, {
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
      jenis_produksi_bkc_satuan,
      jenis_htl_rel_satuan,

      kadar_atas,
      kadar_bawah,
      tarif_cukai_dalam_negeri,
      tarif_cukai_impor,
    });
    this.setState({
      isEdit: false,
      editIndex: null,
      golongan_id: null,
      golongan_name: null,
      personal_id: null,
      personal_name: null,

      jenis_produksi_id: null,
      jenis_produksi_code: null,
      jenis_produksi_name: null,
      jenis_htl_rel_id: null,
      jenis_htl_rel_name: null,
      tarif: null,
      batas_produksi1: null,
      batas_produksi2: null,
      hje1: null,
      hje2: null,
      layer: null,
      jenis_produksi_bkc_satuan: null,
      jenis_htl_rel_satuan: null,

      kadar_atas: null,
      kadar_bawah: null,
      tarif_cukai_dalam_negeri: null,
      tarif_cukai_impor: null,
      dataSource: newDataSource,
    });
  };
  handleBatal = () => {
    this.setState({
      isEdit: false,
      golongan_id: null,
      golongan_name: null,
      personal_id: null,
      personal_name: null,

      jenis_produksi_id: null,
      jenis_produksi_code: null,
      jenis_produksi_name: null,
      jenis_htl_rel_id: null,
      jenis_htl_rel_name: null,
      tarif: null,
      batas_produksi1: null,
      batas_produksi2: null,
      hje1: null,
      hje2: null,
      layer: null,
      jenis_produksi_bkc_satuan: null,
      jenis_htl_rel_satuan: null,

      kadar_atas: null,
      kadar_bawah: null,
      tarif_cukai_dalam_negeri: null,
      tarif_cukai_impor: null,
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
      jenis_produksi_bkc_satuan: record.jenis_produksi_bkc_satuan,
      jenis_htl_rel_satuan: record.jenis_htl_rel_satuan,

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

  handleDeleteApi = async (index, id) => {
    const response = await requestApi({
      service: "referensi",
      method: "post",
      endpoint: "/referensi/browse-delete-tarif",
      body: { idTarifBkcDetail: id },
      setLoading: (bool) => this.setState({ isTableLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.handleDelete(index);
    }
  };

  handleSimpanPerubahan = async () => {
    if (!this.validationForm()) return;

    const details = this.state.dataSource.map((item) => {
      const data = {
        idGolonganBkc: item.golongan_id,
        flagPersonal: item.personal_id,
      };

      if (item.tarif_detail_id) data.idTarifBkcDetail = item.tarif_detail_id;

      if (this.state.jenis_bkc_id === 3) {
        data.idJenisHtlRel = +item.jenis_htl_rel_id.split(" ")[0];
        data.tarif = item.tarif;
        data.batasProduksi1 = item.batas_produksi1;
        data.batasProduksi2 = item.batas_produksi2;
        data.hje1 = item.hje1;
        data.hje2 = item.hje2;
        data.layer = item.layer;
        return data;
      }

      if (this.state.jenis_bkc_id === 2) {
        if (item.golongan_id === 4) {
          data.tarif = item.tarif_cukai_impor;
        } else {
          data.tarif = item.tarif_cukai_dalam_negeri;
        }
      }

      data.kadarAtas = item.kadar_atas;
      data.kadarBawah = item.kadar_bawah;
      return data;
    });

    const payload = {
      idSkepHeader: this.props.match.params.id,
      nomorSkep: this.state.nomor_surat,
      tanggalSkep: moment(this.state.tanggal_surat).format("YYYY-MM-DD"),
      tanggalAwalBerlaku: moment(this.state.tanggal_awal_berlaku).format("YYYY-MM-DD"),
      nomorPeraturan: this.state.nomor_peraturan,
      tanggalPeraturan: moment(this.state.tanggal_peraturan).format("YYYY-MM-DD"),
      idJenisBkc: this.state.jenis_bkc_id,
      idJenisProduksiBkc:
        this.state.jenis_bkc_id === 3
          ? +this.state.jenis_produksi_id.split(" ")[0]
          : +this.state.dataSource[0].jenis_produksi_id.split(" ")[0],
      details,
    };

    const response = await requestApi({
      service: "referensi",
      method: "post",
      endpoint: "/referensi/browse-update-tarif",
      body: payload,
      setLoading: (bool) => this.setState({ isSimpanPerubahanLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.props.history.push(`${pathName}/referensi-tarif-warna`);
    }
  };

  render() {
    return (
      <>
        <Container
          menuName="Referensi Tarif dan Pita Cukai"
          contentName="Referensi Tarif Detail"
          hideContentHeader
        >
          {this.state.isDetailTarifLoading ? (
            <LoadingWrapperSkeleton />
          ) : (
            <>
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
                      format="DD-MM-YYYY"
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
                      format="DD-MM-YYYY"
                      onChange={(value) =>
                        this.handleDatepickerChange("tanggal_awal_berlaku", value)
                      }
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
                      format="DD-MM-YYYY"
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
                          golongan_id: null,
                          golongan_name: null,
                          jenis_produksi_id: null,
                          jenis_produksi_name: null,
                          jenis_htl_rel_id: null,
                          jenis_htl_rel_name: null,
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
                              <Select.Option key={`golongan-${index}`} value={item.idGolonganBkc}>
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
                            const splitValues = value.split(" ");
                            this.setState({
                              jenis_htl_rel_id: null,
                              jenis_htl_rel_name: null,
                              list_jenis_htl_rel: [],
                              jenis_produksi_code: option.props.children
                                .split("-")[0]
                                .replace(/[()\s]/g, null),
                              jenis_produksi_bkc_satuan:
                                splitValues[1] !== "null" ? splitValues[1] : null,
                            });
                            this.handleSelectCustomChange("jenis_produksi", value, option);
                          }}
                          value={this.state.jenis_produksi_id}
                          loading={this.state.isJenisProduksiLoading}
                          style={{ width: "100%" }}
                          disabled={
                            this.state.jenis_bkc_id === 3 && this.state.dataSource.length > 0
                          }
                        >
                          {this.state.list_jenis_produksi.length > 0 &&
                            this.state.list_jenis_produksi.map((item, index) => (
                              <Select.Option
                                key={`jenis-produksi-${index}`}
                                value={`${item.idJenisProduksi} ${item.satuanJenisProduksi}`}
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
                          onChange={(value, option) => {
                            const splitValues = value.split(" ");
                            this.setState({ jenis_htl_rel_satuan: splitValues[1] });
                            this.handleSelectCustomChange("jenis_htl_rel", value, option);
                          }}
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
                              <Select.Option
                                key={`jenis_htl_rel-${index}`}
                                value={`${item.idJenisHtlRel} ${item.satuanJenisHtlRel}`}
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
                          {(this.state.jenis_produksi_bkc_satuan ||
                            this.state.jenis_htl_rel_satuan) && (
                            <>
                              <div>/</div>
                              <div>
                                {this.state.jenis_produksi_bkc_satuan ??
                                  this.state.jenis_htl_rel_satuan}
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
                            id="batas_produksi1"
                            onChange={(value) =>
                              this.handleInputNumberChange("batas_produksi1", value)
                            }
                            value={this.state.batas_produksi1}
                            style={{ flex: 1 }}
                            min={0}
                          />
                          <div>s.d</div>
                          <InputNumber
                            id="batas_produksi2"
                            onChange={(value) =>
                              this.handleInputNumberChange("batas_produksi2", value)
                            }
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
                          {(this.state.jenis_produksi_bkc_satuan ||
                            this.state.jenis_htl_rel_satuan) && (
                            <>
                              <div>/</div>
                              <div>
                                {this.state.jenis_produksi_bkc_satuan ??
                                  this.state.jenis_htl_rel_satuan}
                              </div>
                            </>
                          )}
                        </div>
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Layer</FormLabel>
                        </div>
                        <Input
                          id="layer"
                          onChange={this.handleInputChange}
                          value={this.state.layer}
                        />
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
                              onChange={(value) =>
                                this.handleInputNumberChange("kadar_atas", value)
                              }
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
                              onChange={(value) =>
                                this.handleInputNumberChange("kadar_bawah", value)
                              }
                              value={this.state.kadar_bawah}
                              style={{ width: "100%" }}
                              min={0}
                            />
                          </Col>
                        </Row>
                      </Col>

                      {this.state.golongan_id === 5 && (
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
                      )}

                      {this.state.golongan_id === 4 && (
                        <Col span={12}>
                          <div style={{ marginBottom: 10 }}>
                            <FormLabel>Tarif Cukai Impor</FormLabel>
                          </div>
                          <InputNumber
                            id="tarif_cukai_impor"
                            onChange={(value) =>
                              this.handleInputNumberChange("tarif_cukai_impor", value)
                            }
                            value={this.state.tarif_cukai_impor}
                            style={{ width: "100%" }}
                            min={0}
                          />
                        </Col>
                      )}
                    </>
                  )}
                </Row>

                <Row>
                  <Col span={8} offset={8}>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        {this.state.isEdit ? (
                          <ButtonCustom variant="warning" block onClick={this.handleUbah}>
                            UBAH
                          </ButtonCustom>
                        ) : (
                          <Button
                            type="primary"
                            block
                            onClick={this.handleSimpan}
                            disabled={!this.validationInsert()}
                          >
                            SIMPAN
                          </Button>
                        )}
                      </Col>

                      <Col span={12}>
                        {this.state.isEdit && (
                          <Button type="danger" block onClick={this.handleBatal}>
                            BATAL
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <Table
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    loading={this.state.isTableLoading}
                    scroll={{ x: "max-content" }}
                    onChange={this.handleTableChange}
                    pagination={{ current: this.state.page }}
                  />
                </div>

                <Row gutter={[16, 16]} style={{ marginTop: 30 }}>
                  <Col span={4}>
                    <ButtonCustom
                      variant="secondary"
                      onClick={() => this.props.history.goBack()}
                      block
                    >
                      Kembali
                    </ButtonCustom>
                  </Col>
                  <Col span={4}>
                    <Button
                      type="primary"
                      loading={this.state.isSimpanPerubahanLoading}
                      onClick={this.handleSimpanPerubahan}
                      disabled={!this.validationForm()}
                      block
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </div>
            </>
          )}
        </Container>
      </>
    );
  }
}
