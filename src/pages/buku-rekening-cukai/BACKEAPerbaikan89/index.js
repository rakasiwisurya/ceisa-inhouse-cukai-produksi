import {
  Button,
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
import Header from "components/Header";
import { pathName } from "configs/constants";
import React, { Component } from "react";
import ModalDaftarNPPBKC from "../ModalDaftarNPPBKC";
import { sumArrayOfObject } from "utils/sumArrayOfObject";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import moment from "moment";
import { requestApi } from "utils/requestApi";

export default class BACKEAPerbaikan89 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Perbaikan Berita Acara Cukai (BACK)",
      subtitle2: "Rincian",

      isEditRincian: false,
      editIndexRincian: null,

      isDetailLoading: true,
      isUpdateLoading: false,
      isTableLoading: false,
      isModalDaftarNppbkcVisible: false,

      nppbkc_id: null,
      nppbkc: null,
      nama_nppbkc: null,
      jenis_back: null,
      nomor_back: null,
      tanggal_back: null,

      jenis_barang_kena_cukai_rusak: null,
      jumlah_barang_kena_cukai_rusak: null,
      catatan: null,

      searchText: null,
      searchedColumn: null,
      page: 1,

      list_jenis_back: [
        {
          jenis_back_id: "BACK-8",
          jenis_back_name: "BACK-8",
        },
        {
          jenis_back_id: "BACK-9",
          jenis_back_name: "BACK-9",
        },
      ],

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
                onClick={() => this.handleEditRincian(record, index)}
              />
              {record.back_ea_detail_id ? (
                <Button
                  type="danger"
                  icon="delete"
                  onClick={() => this.handleDeleteRincianApi(index, record.back_ea_detail_id)}
                />
              ) : (
                <Button
                  type="danger"
                  icon="close"
                  onClick={() => this.handleDeleteRincian(index)}
                />
              )}
            </div>
          ),
        },
        {
          title: "Barang Kena Cukai Yang Rusak",
          children: [
            {
              title: "Jenis",
              dataIndex: "jenis_barang_kena_cukai_rusak",
              key: "jenis_barang_kena_cukai_rusak",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jenis_barang_kena_cukai_rusak"),
            },
            {
              title: "Jumlah (lt)",
              dataIndex: "jumlah_barang_kena_cukai_rusak",
              key: "jumlah_barang_kena_cukai_rusak",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jumlah_barang_kena_cukai_rusak"),
            },
          ],
        },
        {
          title: "Keterangan",
          dataIndex: "catatan",
          key: "catatan",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("catatan"),
        },
      ],
    };
  }

  componentDidMount() {
    this.getDetailBack89();
  }

  getDetailBack89 = async () => {
    const payload = { idBackEaheader: this.props.match.params.id };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/back-ea-8-9/detail",
      params: payload,
      setLoading: (bool) => this.setState({ isDetailLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState({
        nppbkc_id: data.idNppbkc,
        nppbkc: data.nppbkc,
        nama_nppbkc: data.namaPerusahaan,
        jenis_back: data.jenisBackEa,
        nomor_back: data.nomorBackEa,
        tanggal_back: moment(data.tanggalBackEa),

        dataSource: data.details.map((detail, index) => ({
          key: `back-ea-${index}`,
          back_ea_detail_id: detail.idBackEaDetail,
          jenis_barang_kena_cukai_rusak: detail.jenisBkc,
          jumlah_barang_kena_cukai_rusak: detail.jumlah,
          catatan: detail.keterangan,
        })),
      });
    }
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
  handleModalShow = (visibleState) => {
    this.setState({ [visibleState]: true });
  };
  handleModalClose = (visibleState) => {
    this.setState({ [visibleState]: false });
  };

  handleDataNppbkc = (record) => {
    this.setState({
      nppbkc_id: record.nppbkc_id,
      nppbkc: record.nppbkc,
      nama_nppbkc: record.nama_nppbkc,
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };

  handleSimpanRincian = () => {
    const { jenis_barang_kena_cukai_rusak, jumlah_barang_kena_cukai_rusak, catatan } = this.state;

    this.setState({
      dataSource: [
        ...this.state.dataSource,
        {
          key: new Date().getTime(),
          jenis_barang_kena_cukai_rusak,
          jumlah_barang_kena_cukai_rusak,
          catatan,
        },
      ],
    });

    this.setState({
      jenis_barang_kena_cukai_rusak: null,
      jumlah_barang_kena_cukai_rusak: null,
      catatan: null,
    });
  };
  handleEditRincian = (record, index) => {
    this.setState({
      isEditRincian: true,
      editIndexRincian: index,

      jenis_barang_kena_cukai_rusak: record.jenis_barang_kena_cukai_rusak,
      jumlah_barang_kena_cukai_rusak: record.jumlah_barang_kena_cukai_rusak,
      catatan: record.catatan,
    });
  };
  handleUbahRincian = () => {
    const { jenis_barang_kena_cukai_rusak, jumlah_barang_kena_cukai_rusak, catatan } = this.state;

    const newDataSource = this.state.dataSource.map((item) => item);
    newDataSource.splice(this.state.editIndexRincian, 1, {
      key: new Date().getTime(),
      jenis_barang_kena_cukai_rusak,
      jumlah_barang_kena_cukai_rusak,
      catatan,
    });

    this.setState({
      isEditRincian: false,
      editIndexRincian: null,

      jenis_barang_kena_cukai_rusak: null,
      jumlah_barang_kena_cukai_rusak: null,
      catatan: null,

      dataSource: newDataSource,
    });
  };
  handleDeleteRincian = (index) => {
    const newDataSource = this.state.dataSource.map((item) => item);
    newDataSource.splice(index, 1);
    this.setState({ dataSource: newDataSource });
  };
  handleDeleteApiRincian = async (index, id) => {
    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: "/back-ea-6-7/delete",
      body: { idBackEaDetail: id },
      setLoading: (bool) => this.setState({ isTableLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.handleDeleteRincian(index);
    }
  };
  handleBatalEditRincian = () => {
    this.setState({
      isEditRincian: false,
      editIndexRincian: null,

      jenis_barang_kena_cukai_rusak: null,
      jumlah_barang_kena_cukai_rusak: null,
      catatan: null,
    });
  };
  handleReset = () => {
    this.setState({
      nppbkc_id: null,
      nppbkc: null,
      nama_nppbkc: null,
      jenis_back: null,
      nomor_back: null,
      tanggal_back: null,

      jenis_barang_kena_cukai_rusak: null,
      jumlah_barang_kena_cukai_rusak: null,
      catatan: null,

      dataSource: [],
    });
  };
  handleUpdate = async () => {
    const { nppbkc_id, nppbkc, nama_nppbkc, jenis_back, nomor_back, tanggal_back, dataSource } =
      this.state;

    const payload = {
      idBackEaHeader: this.props.match.params.id,
      idNppbkc: nppbkc_id,
      jenisBackEa: jenis_back,
      namaPerusahaan: nama_nppbkc,
      nomorBackEa: nomor_back,
      nppbkc: nppbkc,
      tanggalBackEa: moment(tanggal_back, "DD-MM-YYYY").format("YYYY-MM-DD"),
      details: dataSource.map((item) => ({
        idBackEaDetail: item.back_ea_detail_id,
        jenisBkc: item.jenis_barang_kena_cukai_rusak,
        jumlah: item.jumlah_barang_kena_cukai_rusak,
        keterangan: item.catatan,
      })),
    };

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: "/back-ea-8-9/update",
      body: payload,
      setLoading: (bool) => this.setState({ isUpdateLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.props.history.push(`${pathName}/back-ea`);
    }
  };

  render() {
    return (
      <>
        <Container
          menuName="Buku Rekening Cukai"
          contentName="BACK EA 8 & 9 Perbaikan"
          hideContentHeader
        >
          {this.state.isDetailLoading ? (
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
                      <FormLabel>NPPBKC</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input id="nppbkc" value={this.state.nppbkc} disabled />
                      <Button
                        type="primary"
                        onClick={() => this.handleModalShow("isModalDaftarNppbkcVisible")}
                      >
                        Cari
                      </Button>
                      <Input id="nama_perusahaan" value={this.state.nama_nppbkc} disabled />
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis BACK</FormLabel>
                    </div>
                    <Select
                      id="jenis_back"
                      value={this.state.jenis_back}
                      onChange={(value) => this.handleSelectChange("jenis_back", value)}
                      style={{ width: "100%" }}
                    >
                      {this.state.list_jenis_back.length > 0 &&
                        this.state.list_jenis_back.map((item, index) => (
                          <Select.Option key={`jenis-back-${index}`} value={item.jenis_back_id}>
                            {item.jenis_back_name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Nomor BACK</FormLabel>
                    </div>
                    <Input
                      id="nomor_back"
                      value={this.state.nomor_back}
                      onChange={this.handleInputChange}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tanggal BACK</FormLabel>
                    </div>
                    <DatePicker
                      id="tanggal_back"
                      format="DD-MM-YYYY"
                      value={this.state.tanggal_back}
                      onChange={(date) => this.handleDatepickerChange("tanggal_back", date)}
                      style={{ width: "100%" }}
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
                    <Input
                      id="jenis_barang_kena_cukai_rusak"
                      value={this.state.jenis_barang_kena_cukai_rusak}
                      onChange={this.handleInputChange}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jumlah (LT)</FormLabel>
                    </div>
                    <InputNumber
                      id="jumlah_barang_kena_cukai_rusak"
                      value={this.state.jumlah_barang_kena_cukai_rusak}
                      onChange={(value) =>
                        this.handleInputNumberChange("jumlah_barang_kena_cukai_rusak", value)
                      }
                      style={{ width: "100%" }}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Catatan</FormLabel>
                    </div>
                    <Input.TextArea
                      id="catatan"
                      value={this.state.catatan}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </Row>

                <Row style={{ marginTop: 20 }}>
                  <Col span={8} offset={8}>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        {this.state.isEditRincian ? (
                          <ButtonCustom variant="warning" block onClick={this.handleUbahRincian}>
                            Ubah
                          </ButtonCustom>
                        ) : (
                          <Button type="primary" block onClick={this.handleSimpanRincian}>
                            Simpan
                          </Button>
                        )}
                      </Col>

                      <Col span={12}>
                        {this.state.isEditRincian ? (
                          <Button type="danger" block onClick={this.handleBatalEditRincian}>
                            Batal
                          </Button>
                        ) : (
                          <Button type="danger" block onClick={this.handleReset}>
                            Reset
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <div style={{ marginTop: 30, marginBottom: 20 }}>
                  <Table
                    loading={this.state.isTableLoading}
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    scroll={{ x: "max-content" }}
                    onChange={(page) => this.setState({ page: page.current })}
                    pagination={{ current: this.state.page }}
                    footer={() => (
                      <Table
                        style={{ margin: -16 }}
                        showHeader={false}
                        pagination={false}
                        columns={[
                          {
                            key: "title",
                            title: "Title",
                            dataIndex: "title",
                          },
                          {
                            key: "total_barang_kena_cukai_rusak",
                            title: "Total Barang Kena Cukai Rusak",
                            dataIndex: "total_barang_kena_cukai_rusak",
                            width: 120,
                            fixed: "right",
                            render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                          },
                        ]}
                        dataSource={[
                          {
                            key: "1",
                            title: "Total",
                            total_barang_kena_cukai_rusak: sumArrayOfObject(
                              this.state.dataSource,
                              "jumlah_barang_kena_cukai_rusak"
                            ),
                          },
                        ]}
                      />
                    )}
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
                      loading={this.state.isUpdateLoading}
                      onClick={this.handleUpdate}
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

        <ModalDaftarNPPBKC
          isVisible={this.state.isModalDaftarNppbkcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarNppbkcVisible")}
          onDataDoubleClick={this.handleDataNppbkc}
        />
      </>
    );
  }
}
