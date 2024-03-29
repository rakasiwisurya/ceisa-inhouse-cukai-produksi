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
import ModalDaftarNPPBKC from "components/ModalDaftarNppbkc";
import { endpoints, pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";
import { sumArrayOfObject } from "utils/sumArrayOfObject";

export default class BACKEARekam89 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Perekaman Berita Acara Cukai (BACK)",
      subtitle2: "Rincian",

      isEditRincian: false,
      editIndexRincian: null,

      isRekamLoading: false,
      isModalDaftarNppbkcVisible: false,

      idNppbkc: null,
      nppbkc: null,
      namaNppbkc: null,
      jenisBack: null,
      nomorBack: null,
      tanggalBack: null,

      jenisBarangKenaCukaiRusak: null,
      jumlahBarangKenaCukaiRusak: null,
      catatan: null,

      searchText: null,
      searchedColumn: null,
      page: 1,

      listJenisBack: [
        {
          idJenisBack: "BACK-8",
          namaJenisBack: "BACK-8",
        },
        {
          idJenisBack: "BACK-9",
          namaJenisBack: "BACK-9",
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
                onClick={() => this.handleEditRincian(record)}
              />
              <Button type="danger" icon="close" onClick={() => this.handleDeleteRincian(record)} />
            </div>
          ),
        },
        {
          title: "Barang Kena Cukai Yang Rusak",
          children: [
            {
              title: "Jenis",
              dataIndex: "jenisBarangKenaCukaiRusak",
              key: "jenisBarangKenaCukaiRusak",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jenisBarangKenaCukaiRusak"),
            },
            {
              title: "Jumlah (lt)",
              dataIndex: "jumlahBarangKenaCukaiRusak",
              key: "jumlahBarangKenaCukaiRusak",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jumlahBarangKenaCukaiRusak"),
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
    this.setState({ searchText: null });
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
  handleModalShow = (visibleState) => {
    this.setState({ [visibleState]: true });
  };
  handleModalClose = (visibleState) => {
    this.setState({ [visibleState]: false });
  };

  handleDataNppbkc = (record) => {
    this.setState({
      idNppbkc: record.idNppbkc,
      nppbkc: record.nppbkc,
      namaNppbkc: record.namaNppbkc,
    });
    this.handleModalClose("isModalDaftarNppbkcVisible");
  };

  handleSimpanRincian = () => {
    const { jenisBarangKenaCukaiRusak, jumlahBarangKenaCukaiRusak, catatan } = this.state;
    if (!jenisBarangKenaCukaiRusak || !jumlahBarangKenaCukaiRusak || !catatan) {
      return notification.info({
        message: "Info",
        description: "Data rincian tidak boleh kosong",
      });
    }

    this.setState({
      dataSource: [
        ...this.state.dataSource,
        {
          key: new Date().getTime(),
          jenisBarangKenaCukaiRusak,
          jumlahBarangKenaCukaiRusak,
          catatan,
        },
      ],
    });

    this.setState({
      jenisBarangKenaCukaiRusak: null,
      jumlahBarangKenaCukaiRusak: null,
      catatan: null,
    });
  };
  handleEditRincian = (record) => {
    this.setState({
      isEditRincian: true,
      editIndexRincian: record.key,

      jenisBarangKenaCukaiRusak: record.jenisBarangKenaCukaiRusak,
      jumlahBarangKenaCukaiRusak: record.jumlahBarangKenaCukaiRusak,
      catatan: record.catatan,
    });
  };
  handleUbahRincian = () => {
    const { jenisBarangKenaCukaiRusak, jumlahBarangKenaCukaiRusak, catatan } = this.state;

    const newDataSource = [...this.state.dataSource];
    const index = newDataSource.findIndex((item) => item.key === this.state.editIndexRincian);
    newDataSource.splice(index, 1, {
      key: new Date().getTime(),
      jenisBarangKenaCukaiRusak,
      jumlahBarangKenaCukaiRusak,
      catatan,
    });

    this.setState({
      isEditRincian: false,
      editIndexRincian: null,

      jenisBarangKenaCukaiRusak: null,
      jumlahBarangKenaCukaiRusak: null,
      catatan: null,

      dataSource: newDataSource,
    });
  };
  handleDeleteRincian = (record) => {
    const updatedDataSource = this.state.dataSource.filter((item) => item.key !== record.key);
    this.setState({ dataSource: updatedDataSource });
  };
  handleBatalEditRincian = () => {
    this.setState({
      isEditRincian: false,
      editIndexRincian: null,

      jenisBarangKenaCukaiRusak: null,
      jumlahBarangKenaCukaiRusak: null,
      catatan: null,
    });
  };
  handleReset = () => {
    this.setState({
      jenisBarangKenaCukaiRusak: null,
      jumlahBarangKenaCukaiRusak: null,
      catatan: null,
    });
  };
  handleRekam = async () => {
    const { idNppbkc, nppbkc, namaNppbkc, jenisBack, nomorBack, tanggalBack, dataSource } =
      this.state;

    const payload = {
      idNppbkc: idNppbkc,
      jenisBackEa: jenisBack,
      namaPerusahaan: namaNppbkc,
      nomorBackEa: nomorBack,
      nppbkc: nppbkc,
      tanggalBackEa: moment(tanggalBack, "DD-MM-YYYY").format("YYYY-MM-DD"),
      details: dataSource.map((item) => ({
        jenisBkc: item.jenisBarangKenaCukaiRusak,
        jumlah: item.jumlahBarangKenaCukaiRusak,
        keterangan: item.catatan,
      })),
    };

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: endpoints.backEa67Rekam,
      body: payload,
      setLoading: (bool) => this.setState({ isRekamLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.props.history.push(`${pathName}/back-ea`);
    }
  };

  render() {
    return (
      <>
        <Container menuName="Buku Rekening Cukai" contentName="BACK EA 8 & 9 Rekam">
          <Card title={this.state.subtitle1} style={{ marginBottom: 30 }}>
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
                  <Input id="namaPerusahaan" value={this.state.namaNppbkc} disabled />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jenis BACK</FormLabel>
                </div>
                <Select
                  id="jenisBack"
                  value={this.state.jenisBack}
                  onChange={(value) => this.handleSelectChange("jenisBack", value)}
                  style={{ width: "100%" }}
                >
                  {this.state.listJenisBack.length > 0 &&
                    this.state.listJenisBack.map((item, index) => (
                      <Select.Option key={`jenis-back-${index}`} value={item.idJenisBack}>
                        {item.namaJenisBack}
                      </Select.Option>
                    ))}
                </Select>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Nomor BACK</FormLabel>
                </div>
                <Input
                  id="nomorBack"
                  value={this.state.nomorBack}
                  onChange={this.handleInputChange}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal BACK</FormLabel>
                </div>
                <DatePicker
                  id="tanggalBack"
                  format="DD-MM-YYYY"
                  value={this.state.tanggalBack}
                  onChange={(date) => this.handleDatepickerChange("tanggalBack", date)}
                  style={{ width: "100%" }}
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
                <Input
                  id="jenisBarangKenaCukaiRusak"
                  value={this.state.jenisBarangKenaCukaiRusak}
                  onChange={this.handleInputChange}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jumlah (LT)</FormLabel>
                </div>
                <InputNumber
                  id="jumlahBarangKenaCukaiRusak"
                  value={this.state.jumlahBarangKenaCukaiRusak}
                  onChange={(value) =>
                    this.handleInputNumberChange("jumlahBarangKenaCukaiRusak", value)
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
          </Card>

          <Row>
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

          <Table
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            scroll={{ x: "max-content" }}
            onChange={(page) => this.setState({ page: page.current })}
            pagination={{ current: this.state.page }}
            style={{ marginTop: 30, marginBottom: 30 }}
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
                    key: "totalBarangKenaCukaiRusak",
                    title: "Total Barang Kena Cukai Rusak",
                    dataIndex: "totalBarangKenaCukaiRusak",
                    width: 120,
                    fixed: "right",
                    render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                  },
                ]}
                dataSource={[
                  {
                    key: "1",
                    title: "Total",
                    totalBarangKenaCukaiRusak: sumArrayOfObject(
                      this.state.dataSource,
                      "jumlahBarangKenaCukaiRusak"
                    ),
                  },
                ]}
              />
            )}
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

        <ModalDaftarNPPBKC
          isVisible={this.state.isModalDaftarNppbkcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarNppbkcVisible")}
          onDataDoubleClick={this.handleDataNppbkc}
        />
      </>
    );
  }
}
