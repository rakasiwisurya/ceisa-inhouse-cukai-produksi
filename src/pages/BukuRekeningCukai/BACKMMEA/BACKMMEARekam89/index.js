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
import ModalDaftarMerkMMEA from "components/ModalDaftarMerkMMEA";
import ModalDaftarNPPBKC from "components/ModalDaftarNppbkc";
import { pathName } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";
import { sumArrayOfObject } from "utils/sumArrayOfObject";

export default class BACKMMEARekam89 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Perekaman Berita Acara Cukai (BACK)",
      subtitle2: "Rincian",

      isEditRincian: false,
      editIndexRincian: null,

      isRekamLoading: false,
      isModalDaftarNppbkcVisible: false,
      isModalDaftarMerkMmeaVisible: false,

      idNppbkc: null,
      nppbkc: null,
      namaNppbkc: null,
      jenisBack: null,
      nomorBack: null,
      tanggalBack: null,

      idMerk: null,
      namaMerk: null,
      tarif: null,
      isi: null,
      kadar: null,
      jumlahKemasan: null,
      jumlahLt: null,

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
          title: "Merk",
          dataIndex: "namaMerk",
          key: "namaMerk",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("namaMerk"),
        },
        {
          title: "Kadar",
          dataIndex: "kadar",
          key: "kadar",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("kadar"),
        },
        {
          title: "Tarif",
          dataIndex: "tarif",
          key: "tarif",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("tarif"),
        },
        {
          title: "Isi",
          dataIndex: "isi",
          key: "isi",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("isi"),
        },
        {
          title: "Jumlah Kemasan",
          dataIndex: "jumlahKemasan",
          key: "jumlahKemasan",
          fixed: "right",
          width: 120,
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("jumlahKemasan"),
        },
        {
          title: "Jumlah Liter",
          dataIndex: "jumlahLt",
          key: "jumlahLt",
          fixed: "right",
          width: 120,
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("jumlahLt"),
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
    this.setState({ searchText: "" });
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
  handleDataMerkMmea = (record) => {
    this.setState({
      idMerk: record.idMerk,
      namaMerk: record.namaMerk,
      kadar: record.kadar,
      tarif: record.tarif,
      isi: record.isi,
    });
    this.handleModalClose("isModalDaftarMerkMmeaVisible");
  };

  handleSimpanRincian = () => {
    const { idMerk, namaMerk, tarif, isi, kadar, jumlahKemasan, jumlahLt } = this.state;

    if (!idMerk || !namaMerk || !tarif || !isi || !kadar || !jumlahKemasan || !jumlahLt) {
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
          idMerk,
          namaMerk,
          tarif,
          isi,
          kadar,
          jumlahKemasan,
          jumlahLt,
        },
      ],
    });

    this.setState({
      idMerk: null,
      namaMerk: null,
      tarif: null,
      isi: null,
      kadar: null,
      jumlahKemasan: null,
      jumlahLt: null,
    });
  };
  handleEditRincian = (record) => {
    this.setState({
      isEditRincian: true,
      editIndexRincian: record.key,

      idMerk: record.idMerk,
      namaMerk: record.namaMerk,
      tarif: record.tarif,
      isi: record.isi,
      kadar: record.kadar,
      jumlahKemasan: record.jumlahKemasan,
      jumlahLt: record.jumlahLt,
    });
  };
  handleUbahRincian = () => {
    const { idMerk, namaMerk, tarif, isi, kadar, jumlahKemasan, jumlahLt } = this.state;

    const newDataSource = [...this.state.dataSource];
    const index = newDataSource.findIndex((item) => item.key === this.state.editIndexRincian);
    newDataSource.splice(index, 1, {
      key: new Date().getTime(),
      idMerk,
      namaMerk,
      tarif,
      isi,
      kadar,
      jumlahKemasan,
      jumlahLt,
    });

    this.setState({
      isEditRincian: false,
      editIndexRincian: null,

      idMerk: null,
      namaMerk: null,
      tarif: null,
      isi: null,
      kadar: null,
      jumlahKemasan: null,
      jumlahLt: null,

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

      idMerk: null,
      namaMerk: null,
      tarif: null,
      isi: null,
      kadar: null,
      jumlahKemasan: null,
      jumlahLt: null,
    });
  };
  handleReset = () => {
    this.setState({
      idMerk: null,
      namaMerk: null,
      tarif: null,
      isi: null,
      kadar: null,
      jumlahKemasan: null,
      jumlahLt: null,
    });
  };
  handleRekam = async () => {
    const { idNppbkc, nppbkc, namaNppbkc, jenisBack, nomorBack, tanggalBack, dataSource } =
      this.state;

    const payload = {
      idNppbkc: idNppbkc,
      jenisBackMmea: jenisBack,
      namaPerusahaan: namaNppbkc,
      nomorBackMmea: nomorBack,
      nppbkc: nppbkc,
      tanggalBackMmea: moment(tanggalBack, "DD-MM-YYYY").format("YYYY-MM-DD"),
      details: dataSource.map((item) => ({
        idMerk: item.idMerk,
        isiPerKemasan: item.isi,
        jumlah: item.jumlahLt,
        jumlahKemasan: item.jumlahKemasan,
        kadarEa: item.kadar,
        namaMerk: item.namaMerk,
        tarifSpesifik: item.tarif,
      })),
    };

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: "/back-mmea/rekam",
      body: payload,
      setLoading: (bool) => this.setState({ isRekamLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      this.props.history.push(`${pathName}/back-mmea`);
    }
  };

  render() {
    return (
      <>
        <Container menuName="Buku Rekening Cukai" contentName="BACK MMEA 8 & 9 Rekam">
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
                  <Input id="nama_perusahaan" value={this.state.namaNppbkc} disabled />
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
                  <FormLabel>Merk</FormLabel>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Input
                    id="namaMerk"
                    value={this.state.namaMerk}
                    onChange={this.handleInputChange}
                    disabled
                  />
                  <Button
                    type="primary"
                    onClick={() => this.handleModalShow("isModalDaftarMerkMmeaVisible")}
                  >
                    Cari
                  </Button>
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tarif</FormLabel>
                </div>
                <InputNumber
                  id="tarif"
                  value={this.state.tarif}
                  onChange={(value) => this.handleInputNumberChange("tarif", value)}
                  style={{ width: "100%" }}
                  disabled
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Isi</FormLabel>
                </div>
                <InputNumber
                  id="isi"
                  value={this.state.isi}
                  onChange={(value) => this.handleInputNumberChange("isi", value)}
                  style={{ width: "100%" }}
                  disabled
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Kadar</FormLabel>
                </div>
                <InputNumber
                  id="kadar"
                  value={this.state.kadar}
                  onChange={(value) => this.handleInputNumberChange("kadar", value)}
                  style={{ width: "100%" }}
                  disabled
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jumlah Kemasan</FormLabel>
                </div>
                <InputNumber
                  id="jumlahKemasan"
                  value={this.state.jumlahKemasan}
                  onChange={(value) => this.handleInputNumberChange("jumlahKemasan", value)}
                  style={{ width: "100%" }}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jumlah (lt)</FormLabel>
                </div>
                <InputNumber
                  id="jumlahLt"
                  value={this.state.jumlahLt}
                  onChange={(value) => this.handleInputNumberChange("jumlahLt", value)}
                  style={{ width: "100%" }}
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
                    key: "total_kemasan",
                    title: "Total Kemasan",
                    dataIndex: "total_kemasan",
                    width: 120,
                    fixed: "right",
                    render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                  },
                  {
                    key: "total_lt",
                    title: "Total Liter",
                    dataIndex: "total_lt",
                    width: 120,
                    fixed: "right",
                    render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
                  },
                ]}
                dataSource={[
                  {
                    key: "1",
                    title: "Total",
                    total_kemasan: sumArrayOfObject(this.state.dataSource, "jumlahKemasan"),
                    total_lt: sumArrayOfObject(this.state.dataSource, "jumlahLt"),
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

        <ModalDaftarMerkMMEA
          isVisible={this.state.isModalDaftarMerkMmeaVisible}
          onCancel={() => this.handleModalClose("isModalDaftarMerkMmeaVisible")}
          onDataDoubleClick={this.handleDataMerkMmea}
        />
      </>
    );
  }
}
