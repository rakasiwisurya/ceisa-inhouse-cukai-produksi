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

export default class BACKEARekam67 extends Component {
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

      jumlahEaYangAkanDicampur: null,
      jumlahBahanPencampur: null,
      satuan: null,
      jenisBahan: null,
      jumlahSetelahDicampur: null,
      hasilAkhir: null,

      searchText: null,
      searchedColumn: null,
      page: 1,

      listJenisBack: [
        {
          idJenisBack: "BACK-6",
          namaJenisBack: "BACK-6",
        },
        {
          idJenisBack: "BACK-7",
          namaJenisBack: "BACK-7",
        },
      ],
      listSatuan: [
        {
          idSatuan: "lt",
          namaSatuan: "lt",
        },
        {
          idSatuan: "gr",
          namaSatuan: "gr",
        },
        {
          idSatuan: "cc",
          namaSatuan: "cc",
        },
      ],
      listJenisBahan: [
        {
          idJenisBahan: "BIT-SDA BIT 6",
          namaJenisBahan: "BIRTEX",
        },
        {
          idJenisBahan: "IPA-SDA IPA 5",
          namaJenisBahan: "ISOPROPIL ALCOHOL",
        },
        {
          idJenisBahan: "EAC-SDA EAC 2",
          namaJenisBahan: "ETIL ACETAT",
        },
        {
          idJenisBahan: "BPE-SPIRTUS BAKAR",
          namaJenisBahan: "BAHAN PERUSAK EA",
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
          title: "Jumlah EA Sebelum Dicampur/Dirusak (lt)",
          dataIndex: "jumlahEaYangAkanDicampur",
          key: "jumlahEaYangAkanDicampur",
          render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
          ...this.getColumnSearchProps("jumlahEaYangAkanDicampur"),
        },
        {
          title: "Bahan Pencampur/Perusak",
          children: [
            {
              title: "Jumlah",
              dataIndex: "jumlahBahanPencampur",
              key: "jumlahBahanPencampur",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jumlahBahanPencampur"),
            },
            {
              title: "Satuan",
              dataIndex: "satuan",
              key: "satuan",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("satuan"),
            },
            {
              title: "Jenis",
              dataIndex: "jenisBahan",
              key: "jenisBahan",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jenisBahan"),
            },
          ],
        },
        {
          title: "Hasil Akhir Pencampur/Perusakan EA",
          children: [
            {
              title: "Jumlah (Lt)",
              dataIndex: "jumlahSetelahDicampur",
              key: "jumlahSetelahDicampur",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("jumlahSetelahDicampur"),
            },
            {
              title: "Jenis",
              dataIndex: "hasilAkhir",
              key: "hasilAkhir",
              render: (text) => <div style={{ textAlign: "center" }}>{text ? text : "-"}</div>,
              ...this.getColumnSearchProps("hasilAkhir"),
            },
          ],
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
    const {
      jumlahEaYangAkanDicampur,
      jumlahBahanPencampur,
      satuan,
      jenisBahan,
      jumlahSetelahDicampur,
      hasilAkhir,
    } = this.state;

    if (
      !jumlahEaYangAkanDicampur ||
      !jumlahBahanPencampur ||
      !satuan ||
      !jenisBahan ||
      !jumlahSetelahDicampur ||
      !hasilAkhir
    ) {
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
          jumlahEaYangAkanDicampur,
          jumlahBahanPencampur,
          satuan,
          jenisBahan,
          jumlahSetelahDicampur,
          hasilAkhir,
        },
      ],
    });

    this.setState({
      jumlahEaYangAkanDicampur: null,
      jumlahBahanPencampur: null,
      satuan: null,
      jenisBahan: null,
      jumlahSetelahDicampur: null,
      hasilAkhir: null,
    });
  };
  handleEditRincian = (record) => {
    this.setState({
      isEditRincian: true,
      editIndexRincian: record.key,

      jumlahEaYangAkanDicampur: record.jumlahEaYangAkanDicampur,
      jumlahBahanPencampur: record.jumlahBahanPencampur,
      satuan: record.satuan,
      jenisBahan: record.jenisBahan,
      jumlahSetelahDicampur: record.jumlahSetelahDicampur,
      hasilAkhir: record.hasilAkhir,
    });
  };
  handleUbahRincian = () => {
    const {
      jumlahEaYangAkanDicampur,
      jumlahBahanPencampur,
      satuan,
      jenisBahan,
      jumlahSetelahDicampur,
      hasilAkhir,
    } = this.state;

    const newDataSource = [...this.state.dataSource];
    const index = newDataSource.findIndex((item) => item.key === this.state.editIndexRincian);
    newDataSource.splice(index, 1, {
      key: new Date().getTime(),
      jumlahEaYangAkanDicampur,
      jumlahBahanPencampur,
      satuan,
      jenisBahan,
      jumlahSetelahDicampur,
      hasilAkhir,
    });

    this.setState({
      isEditRincian: false,
      editIndexRincian: null,

      jumlahEaYangAkanDicampur: null,
      jumlahBahanPencampur: null,
      satuan: null,
      jenisBahan: null,
      jumlahSetelahDicampur: null,
      hasilAkhir: null,

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

      jumlahEaYangAkanDicampur: null,
      jumlahBahanPencampur: null,
      satuan: null,
      jenisBahan: null,
      jumlahSetelahDicampur: null,
      hasilAkhir: null,
    });
  };
  handleReset = () => {
    this.setState({
      jumlahEaYangAkanDicampur: null,
      jumlahBahanPencampur: null,
      satuan: null,
      jenisBahan: null,
      jumlahSetelahDicampur: null,
      hasilAkhir: null,
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
        hasilAkhir: item.hasilAkhir,
        jenisBahanPencampur: item.jenisBahan,
        jumlah: item.jumlahEaYangAkanDicampur,
        jumlahPencampur: item.jumlahBahanPencampur,
        jumlahSetelah: item.jumlahSetelahDicampur,
        kodeSatuanPencampur: item.satuan,
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
        <Container menuName="Buku Rekening Cukai" contentName="BACK EA 6 & 7 Rekam">
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
                  <FormLabel>Jumlah EA Yang Akan Dicampur/Dirusak</FormLabel>
                </div>
                <InputNumber
                  id="jumlahEaYangAkanDicampur"
                  value={this.state.jumlahEaYangAkanDicampur}
                  onChange={(value) =>
                    this.handleInputNumberChange("jumlahEaYangAkanDicampur", value)
                  }
                  style={{ width: "100%" }}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jumlah Bahan Pencampur/Perusak</FormLabel>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <InputNumber
                    id="jumlahBahanPencampur"
                    value={this.state.jumlahBahanPencampur}
                    onChange={(value) =>
                      this.handleInputNumberChange("jumlahBahanPencampur", value)
                    }
                    style={{ width: "100%" }}
                  />
                  <Select
                    id="satuan"
                    value={this.state.satuan}
                    onChange={(value) => this.handleSelectChange("satuan", value)}
                    style={{ width: 100 }}
                  >
                    {this.state.listSatuan.length > 0 &&
                      this.state.listSatuan.map((item, index) => (
                        <Select.Option key={`satuan-${index}`} value={item.idSatuan}>
                          {item.namaSatuan}
                        </Select.Option>
                      ))}
                  </Select>
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jenis Bahan</FormLabel>
                </div>
                <Select
                  id="jenisBahan"
                  value={
                    this.state.jenisBahan && this.state.hasilAkhir
                      ? `${this.state.jenisBahan}-${this.state.hasilAkhir}`
                      : null
                  }
                  onChange={(value) => {
                    const splitValue = value.split("-");
                    this.handleSelectChange("jenisBahan", splitValue[0]);
                    this.handleSelectChange("hasilAkhir", splitValue[1]);
                  }}
                  style={{ width: "100%" }}
                >
                  {this.state.listJenisBahan.length > 0 &&
                    this.state.listJenisBahan.map((item, index) => (
                      <Select.Option key={`jenis-bahan-${index}`} value={item.idJenisBahan}>
                        {item.namaJenisBahan}
                      </Select.Option>
                    ))}
                </Select>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jumlah Setelah Dicampur/Dirusak</FormLabel>
                </div>
                <InputNumber
                  id="jumlahSetelahDicampur"
                  value={this.state.jumlahSetelahDicampur}
                  onChange={(value) => this.handleInputNumberChange("jumlahSetelahDicampur", value)}
                  style={{ width: "100%" }}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Hasil Akhir</FormLabel>
                </div>
                <Input
                  id="hasilAkhir"
                  value={this.state.hasilAkhir}
                  style={{ width: "100%" }}
                  disabled
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
