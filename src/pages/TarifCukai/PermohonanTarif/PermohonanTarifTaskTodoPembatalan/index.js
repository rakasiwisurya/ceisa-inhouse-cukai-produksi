import { Button, Card, Col, DatePicker, Input, InputNumber, Row, Select, notification } from "antd";
import ButtonCustom from "components/Button/ButtonCustom";
import Container from "components/Container";
import FormLabel from "components/FormLabel";
import LoadingWrapperSkeleton from "components/LoadingWrapperSkeleton";
import ModalDaftarPenjabatBc from "components/ModalDaftarPenjabatBc";
import { baseUrlCeisaInhouse, endpoints } from "configs/constants";
import moment from "moment";
import React, { Component } from "react";
import { download } from "utils/files";
import { getTokenPayload } from "utils/jwt";
import { requestApi } from "utils/requestApi";

export default class PermohonanTarifTaskToDoPembatalan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Header",
      subtitle2: "Pabrik/Importir",
      subtitle3: "Rincian",
      subtitle4: "Tampilan Kemasan",
      subtitle5: "Dokumen Pembatalan",
      subtitle6: "Dasar Pembatalan",

      isDetailLoading: true,
      isDownloadLoading: false,
      isSimpanTasktodoLoading: false,
      isModalDaftarPenjabatBcVisible: false,

      tokenData: null,
      kodeKantor: null,
      namaKantor: null,

      idJenisBkc: null,
      namaJenisBkc: null,
      nomorPermohonan: null,
      tanggalPermohonan: null,
      idLokasiPerekaman: null,
      namaLokasiPerekaman: null,
      tanggalKep: null,
      awalBerlaku: null,

      idNppbkc: null,
      nppbkc: null,
      namaNppbkc: null,
      npwpNppbkc: null,
      alamatNppbkc: null,

      idJenisPita: null,

      idMerkHt: null,
      merkHt: null,
      idJenisProduksiHt: null,
      kodeJenisProduksiHt: null,
      idGolongan: null,
      namaGolongan: null,
      idJenisHtlRelHt: null,
      namaJenisHtlRelHt: null,
      satuanJenisHtlRelHt: null,
      isiHt: null,
      beratHt: null,
      hjePerkemasanHt: null,
      hjePersatuanHt: null,
      tarifHt: null,
      bahanKemasanHt: null,
      idAsalProdukHt: null,
      namaAsalProdukHt: null,
      tujuanPemasaranHt: null,

      idMerkMmea: null,
      merkMmea: null,
      idNegaraAsalMmea: null,
      namaNegaraAsalMmea: null,
      isiMmea: null,
      tarifCukaiPerLiter: null,
      tarifCukaiPerKemasan: null,
      idAsalProdukMmea: null,
      namaAsalProdukMmea: null,

      personal: null,
      seriPita: null,

      nomorSuratLisensi: null,
      tanggalSuratLisensi: null,

      sisiDepan: null,
      sisiBelakang: null,
      sisiKiri: null,
      sisiKanan: null,
      sisiAtas: null,
      sisiBawah: null,
      kodeFoto: null,
      fileGambarEtiket: null,
      previewGambarEtiket: null,

      kodeUploadDokumen: null,

      tasktodoStatus: "SETUJU",
      tasktodoNomorPembatalan: null,
      tasktodoTanggalPembatalan: null,
      tasktodoNipPenjabatBc: null,
      tasktodoNamaPenjabatBc: null,
      tasktodoKeterangan: null,

      listJenisBkc: [],
      listBahanKemasan: [
        {
          idBahanKemasan: "KERTAS DAN SEJENISNYA",
          namaBahanKemasan: "KERTAS DAN SEJENISNYA",
          seriPita: "III DP",
        },
        {
          idBahanKemasan: "BOTOL DAN SEJENISNYA",
          namaBahanKemasan: "BOTOL DAN SEJENISNYA",
          seriPita: "III TP",
        },
        {
          idBahanKemasan: "LAINNYA",
          namaBahanKemasan: "LAINNYA",
          seriPita: "III DP",
        },
      ],
      listAsalProdukHt: [
        {
          idAsalProdukHt: "DN",
          namaAsalProdukHt: "IMPOR",
        },
        {
          idAsalProdukHt: "",
          namaAsalProdukHt: "NON IMPOR",
        },
      ],
      listAsalProdukMmea: [
        {
          idAsalProdukMmea: "DALAM_NEGERI",
          namaAsalProdukMmea: "DALAM NEGERI",
        },
        {
          idAsalProdukMmea: "LUAR_NEGERI",
          namaAsalProdukMmea: "LUAR NEGERI / IMPOR",
        },
      ],
      listTujuanPemasaran: [
        {
          idTujuanPemasaran: "DALAM NEGERI",
          namaTujuanPemasaran: "DALAM NEGERI",
        },
        {
          idTujuanPemasaran: "EKSPOR",
          namaTujuanPemasaran: "EKSPOR",
        },
        {
          idTujuanPemasaran: "BAHAN BAKU",
          namaTujuanPemasaran: "BAHAN BAKU",
        },
        {
          idTujuanPemasaran: "LABORATORIUM",
          namaTujuanPemasaran: "LABORATORIUM",
        },
      ],
      listStatus: [
        {
          idStatus: "SETUJU",
          namaStatus: "SETUJU",
        },
        {
          idStatus: "TOLAK",
          namaStatus: "TOLAK",
        },
      ],
    };
  }

  componentDidMount() {
    this.getToken();
    this.getPermohonanTarifDetail();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.idJenisProduksiHt !== this.state.idJenisProduksiHt) {
      this.setState({ hjePersatuanHt: this.state.isiHt / this.state.hjePerkemasanHt });
    }
  }

  getToken = async () => {
    try {
      const tokenData = await getTokenPayload();
      this.setState({ tokenData });
    } catch (error) {
      notification.error({
        message: "Failed",
        description: "There's something error with token data",
      });
    }
  };

  getPermohonanTarifDetail = async () => {
    const payload = { idProses: this.props.match.params.id };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: endpoints.permohonanTarifDetailTasktodo,
      params: payload,
      setLoading: (bool) => this.setState({ isDetailLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState({
        idJenisBkc: data.idJenisBkc,
        namaJenisBkc: data.namaJenisBkc,
        nomorPermohonan: data.nomorPermohonan,
        tanggalPermohonan: moment(data.tanggalPermohonan),
        namaLokasiPerekaman: data.kotaPermohonan,
        tanggalKep: moment(data.tanggalSkep),
        awalBerlaku: moment(data.awalBerlaku),

        idNppbkc: data.idNppbkc,
        nppbkc: data.nppbkc,
        namaNppbkc: data.namaPerusahaan,
        npwpNppbkc: data.npwp,
        alamatNppbkc: data.alamatPerusahaan,

        idJenisPita: data.idJenisPitaCukai,

        idMerkHt: data.idJenisBkc === 3 ? data.idMerk : null,
        merkHt: data.idJenisBkc === 3 ? data.namaMerk : null,
        idJenisProduksiHt: data.idJenisProduksiBkc,
        kodeJenisProduksiHt: data.jenisProduksiBkc,
        idGolongan: data.idGolongan,
        namaGolongan: data.namaGolongan,
        idJenisHtlRelHt: data.idJenisHtlRel,
        namaJenisHtlRelHt: data.jenisHtlRel,
        satuanJenisHtlRelHt: data.kodeSatuanRel,
        isiHt: data.idJenisBkc === 3 ? data.isiPerkemasan : null,
        beratHt: data.beratVolume,
        hjePerkemasanHt: data.hjePerKemasan,
        hjePersatuanHt: data.hjePerBatang,
        tarifHt: data.idJenisBkc === 3 ? data.tarifSpesifik : null,
        bahanKemasanHt: data.bahanKemasan,
        idAsalProdukHt: data.idJenisBkc === 3 ? (data.asalProduksi === "IMPOR" ? "DN" : "") : null,
        namaAsalProdukHt: data.idJenisBkc === 3 ? data.asalProduksi : null,
        tujuanPemasaranHt: data.tujuanPemasaran,

        idMerkMmea: data.idJenisBkc === 3 ? data.idMerk : null,
        merkMmea: data.idJenisBkc === 2 ? data.namaMerk : null,
        namaNegaraAsalMmea: data.negaraAsal,
        isiMmea: data.idJenisBkc === 2 ? data.isiPerkemasan : null,
        tarifCukaiPerLiter: data.idJenisBkc === 2 ? data.tarifSpesifik : null,
        tarifCukaiPerKemasan: data.tarifPerKemasan,
        idAsalProdukMmea:
          data.idJenisBkc === 2
            ? data.asalProduksi === "DALAM NEGERI"
              ? "DALAM_NEGERI"
              : "LUAR_NEGERI"
            : null,
        namaAsalProdukMmea: data.idJenisBkc === 2 ? data.asalProduksi : null,

        personal: data.personalisasi,
        seriPita: data.seriPita,

        nomorSuratLisensi: data.nomorLisensi,
        tanggalSuratLisensi: moment(data.tanggalLisensi),

        sisiDepan: data.sisiDepan,
        sisiBelakang: data.sisiBelakang,
        sisiKiri: data.sisiKiri,
        sisiKanan: data.sisiKanan,
        sisiAtas: data.sisiAtas,
        sisiBawah: data.sisiBawah,
        kodeFoto: data.kodeFoto,

        kodeKantor: data.kodeKantor,
        namaKantor: data.namaKantor,
      });
    }
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

  handleDataPenjabatBc = (record) => {
    this.setState({
      tasktodoNipPenjabatBc: record.nipPenjabatBc,
      tasktodoNamaPenjabatBc: record.namaPenjabatBc,
    });
    this.handleModalClose("isModalDaftarPenjabatBcVisible");
  };
  handleDownload = async (kodeUpload) => {
    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: `${endpoints.s3Download}/${this.state[kodeUpload]}`,
      setLoading: (bool) => this.setState({ isDownloadLoading: bool }),
      config: { responseType: "blob" },
    });

    if (response) download(response.data, "etiket");
  };

  handleSimpanTasktodo = async () => {
    const {
      tasktodoStatus,
      tasktodoNomorPembatalan,
      tasktodoTanggalPembatalan,
      tasktodoNipPenjabatBc,
      tasktodoNamaPenjabatBc,
      tasktodoKeterangan,
    } = this.state;

    const payload = {
      idProses: this.props.match.params.id,
      status: tasktodoStatus,
      nomorPembatalan: tasktodoNomorPembatalan,
      tanggalPembatalan: moment(tasktodoTanggalPembatalan).format("YYYY-MM-DD"),
      nipPenjabatBc: tasktodoNipPenjabatBc,
      namaPenjabatBc: tasktodoNamaPenjabatBc,
      keterangan: tasktodoKeterangan,
    };

    const response = await requestApi({
      service: "produksi",
      method: "post",
      endpoint: endpoints.permohonanTarifPembatalanTasktodo,
      body: payload,
      setLoading: (bool) => this.setState({ isSimpanTasktodoLoading: bool }),
    });

    if (response) {
      notification.success({ message: "Success", description: response.data.message });
      const timeout = setTimeout(() => {
        window.location.href = `${baseUrlCeisaInhouse}/tasktodo`;
        clearTimeout(timeout);
      }, 1000);
    }
  };

  render() {
    if (this.state.isDetailLoading) return <LoadingWrapperSkeleton />;

    return (
      <>
        <Container menuName="Task To Do" contentName="Permohonan Tarif Task To Do Pembatalan">
          <Card title={this.state.subtitle1} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jenis BKC</FormLabel>
                </div>
                <Select
                  id="jenisBkc"
                  value={this.state.idJenisBkc}
                  style={{ width: "100%" }}
                  disabled
                >
                  <Select.Option value={this.state.idJenisBkc}>
                    {this.state.namaJenisBkc}
                  </Select.Option>
                </Select>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>No. Permohonan</FormLabel>
                </div>
                <Input id="nomorPermohonan" value={this.state.nomorPermohonan} disabled />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Permohonan</FormLabel>
                </div>
                <DatePicker
                  id="tanggalPermohonan"
                  format="DD-MM-YYYY"
                  value={this.state.tanggalPermohonan}
                  style={{ width: "100%" }}
                  disabled
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Lokasi Perekaman</FormLabel>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Input id="lokasiPerekaman" value={this.state.namaLokasiPerekaman} disabled />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal KEP</FormLabel>
                </div>
                <DatePicker
                  id="tanggalKep"
                  format="DD-MM-YYYY"
                  value={this.state.tanggalKep}
                  style={{ width: "100%" }}
                  disabled
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Awal Berlaku</FormLabel>
                </div>
                <DatePicker
                  id="awalBerlaku"
                  format="DD-MM-YYYY"
                  value={this.state.awalBerlaku}
                  style={{ width: "100%" }}
                  disabled
                />
              </Col>
            </Row>
          </Card>

          <Card title={this.state.subtitle2} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>NPPBKC</FormLabel>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Input id="nppbkc" value={this.state.nppbkc} disabled />
                  <Input id="namaPerusahaan" value={this.state.namaNppbkc} disabled />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>NPWP</FormLabel>
                </div>
                <Input id="npwpNppbkc" value={this.state.npwpNppbkc} disabled />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Alamat</FormLabel>
                </div>
                <Input id="alamatNppbkc" value={this.state.alamatNppbkc} disabled />
              </Col>
            </Row>
          </Card>

          <Card title={this.state.subtitle3} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Jenis Pita</FormLabel>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Input
                    id="jenisPita"
                    value={`${[
                      this.state.personal,
                      this.state.isiHt || this.state.isiMmea,
                      this.state.seriPita,
                      this.state.tarifHt || this.state.tarifCukaiPerLiter,
                    ]
                      .filter((str) => str !== null)
                      .join("_")}`}
                    disabled
                  />
                </div>
              </Col>

              {this.state.idJenisBkc === 3 && (
                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Merk HT</FormLabel>
                  </div>
                  {this.state.idJenisProduksiHt === 2 || this.state.idJenisProduksiHt === 5 ? (
                    <Input
                      id="merkHt"
                      value={`${[
                        this.state.personal,
                        this.state.isiHt,
                        this.state.hjePerkemasanHt,
                        this.state.idAsalProdukHt,
                        this.state.seriPita,
                        this.state.tarifHt,
                      ]
                        .filter((str) => str !== null)
                        .join("_")}`}
                      disabled
                    />
                  ) : (
                    <Input id="merkHt" value={this.state.merkHt} disabled />
                  )}
                </Col>
              )}

              {this.state.idJenisBkc === 3 && (
                <>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Jenis Produksi</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Input
                        id="jenisProduksiHt"
                        value={
                          this.state.kodeJenisProduksiHt && this.state.namaGolongan
                            ? `${this.state.kodeJenisProduksiHt} - ${this.state.namaGolongan}`
                            : this.state.kodeJenisProduksiHt
                        }
                        disabled
                      />
                      {(this.state.idJenisProduksiHt === 2 ||
                        this.state.idJenisProduksiHt === 5) && (
                        <>
                          <Input
                            id="namaJenisHtlRelHt"
                            value={this.state.namaJenisHtlRelHt}
                            disabled
                          />
                        </>
                      )}
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Isi / kemasan</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="isiHt"
                        value={this.state.isiHt}
                        style={{ width: "100%" }}
                        disabled
                      />

                      {this.state.satuanJenisHtlRelHt && (
                        <div>{this.state.satuanJenisHtlRelHt}</div>
                      )}
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Berat / Volume (per kemasan)</FormLabel>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <InputNumber
                        id="beratHt"
                        value={this.state.beratHt}
                        style={{ width: "100%" }}
                        disabled
                      />

                      {(this.state.idJenisHtlRelHt === 4 || this.state.idJenisHtlRelHt === 6) && (
                        <div>{this.state.satuanJenisHtlRelHt}</div>
                      )}
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>HJE per kemasan</FormLabel>
                    </div>
                    <InputNumber
                      id="hjePerkemasanHt"
                      value={this.state.hjePerkemasanHt}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>HJE / satuan</FormLabel>
                    </div>
                    <InputNumber
                      id="hjePersatuanHt"
                      value={this.state.hjePersatuanHt}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif Spesifik</FormLabel>
                    </div>
                    <InputNumber
                      id="tarifHt"
                      value={this.state.tarifHt}
                      style={{ width: "100%" }}
                      disabled
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Bahan Kemasan</FormLabel>
                    </div>
                    <Select
                      id="bahanKemasanHt"
                      value={this.state.bahanKemasanHt}
                      style={{ width: "100%" }}
                      disabled
                    >
                      {this.state.listBahanKemasan.length > 0 &&
                        this.state.listBahanKemasan.map((item, index) => (
                          <Select.Option
                            key={`bahan-kemasan-${index}`}
                            value={`${item.idBahanKemasan}-${item.seriPita}`}
                          >
                            {item.namaBahanKemasan}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Asal Produk</FormLabel>
                    </div>
                    <Select
                      id="asalProdukHt"
                      value={this.state.idAsalProdukHt}
                      style={{ width: "100%" }}
                      disabled
                    >
                      {this.state.listAsalProdukHt.length > 0 &&
                        this.state.listAsalProdukHt.map((item, index) => (
                          <Select.Option
                            key={`asal-produk-ht-${index}`}
                            value={item.idAsalProdukHt}
                          >
                            {item.namaAsalProdukHt}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tujuan Pemasaran</FormLabel>
                    </div>
                    <Select
                      id="tujuanPemasaranHt"
                      value={this.state.tujuanPemasaranHt}
                      style={{ width: "100%" }}
                      disabled
                    >
                      {this.state.listTujuanPemasaran.length > 0 &&
                        this.state.listTujuanPemasaran.map((item, index) => (
                          <Select.Option
                            key={`tujuan-pemasaran-${index}`}
                            value={item.idTujuanPemasaran}
                          >
                            {item.namaTujuanPemasaran}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  {this.state.idAsalProdukHt === "DN" && (
                    <>
                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Nomor Surat Lisensi Pemegang Merk</FormLabel>
                        </div>
                        <Input
                          id="nomorSuratLisensi"
                          value={this.state.nomorSuratLisensi}
                          disabled
                        />
                      </Col>

                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Tanggal Surat Lisensi</FormLabel>
                        </div>
                        <DatePicker
                          id="tanggalSuratLisensi"
                          format="DD-MM-YYYY"
                          value={this.state.tanggalSuratLisensi}
                          style={{ width: "100%" }}
                          disabled
                        />
                      </Col>
                    </>
                  )}
                </>
              )}

              {this.state.idJenisBkc === 2 && (
                <>
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Merk MMEA</FormLabel>
                    </div>
                    <Input id="merkMmea" value={this.state.merkMmea} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Asal Produk</FormLabel>
                    </div>
                    <Select
                      id="asalProdukMmea"
                      value={this.state.idAsalProdukMmea}
                      style={{ width: "100%" }}
                      disabled
                    >
                      {this.state.listAsalProdukMmea.length > 0 &&
                        this.state.listAsalProdukMmea.map((item, index) => (
                          <Select.Option
                            key={`asal-produk-mmea-${index}`}
                            value={item.idAsalProdukMmea}
                          >
                            {item.namaAsalProdukMmea}
                          </Select.Option>
                        ))}
                    </Select>
                  </Col>

                  {this.state.idAsalProdukMmea === "LUAR_NEGERI" && (
                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Negara Asal</FormLabel>
                      </div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <Input
                          id="namaNegaraAsalMmea"
                          value={this.state.namaNegaraAsalMmea}
                          disabled
                        />
                      </div>
                    </Col>
                  )}

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Isi Kemasan</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <InputNumber
                        id="isiMmea"
                        value={this.state.isiMmea}
                        style={{ width: "100%" }}
                        disabled
                      />
                      <div>ml</div>
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Golongan</FormLabel>
                    </div>
                    <Input id="namaGolongan" value={this.state.namaGolongan} disabled />
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif Cukai Per Liter</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <InputNumber
                        id="tarifCukaiPerLiter"
                        value={this.state.tarifCukaiPerLiter}
                        style={{ width: "100%" }}
                        disabled
                      />
                      <div>(Rp)</div>
                    </div>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Tarif Cukai Per Kemasan</FormLabel>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <InputNumber
                        id="tarifCukaiPerKemasan"
                        value={this.state.tarifCukaiPerKemasan}
                        style={{ width: "100%" }}
                        disabled
                      />
                      <div>(Rp)</div>
                    </div>
                  </Col>
                </>
              )}
            </Row>
          </Card>

          {this.state.idJenisBkc === 3 &&
            !(this.state.idJenisProduksiHt === 2 || this.state.idJenisProduksiHt === 5) && (
              <Card title={this.state.subtitle4} style={{ marginBottom: 30 }}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Sisi Depan</FormLabel>
                        </div>
                        <Input.TextArea id="sisiDepan" value={this.state.sisiDepan} disabled />
                      </Col>

                      <Col span={24}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Sisi Belakang</FormLabel>
                        </div>
                        <Input.TextArea
                          id="sisiBelakang"
                          value={this.state.sisiBelakang}
                          disabled
                        />
                      </Col>

                      <Col span={24}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Sisi Kiri</FormLabel>
                        </div>
                        <Input.TextArea id="sisiKiri" value={this.state.sisiKiri} disabled />
                      </Col>

                      <Col span={24}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Sisi Kanan</FormLabel>
                        </div>
                        <Input.TextArea id="sisiKanan" value={this.state.sisiKanan} disabled />
                      </Col>

                      <Col span={24}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Sisi Atas</FormLabel>
                        </div>
                        <Input.TextArea id="sisiAtas" value={this.state.sisiAtas} disabled />
                      </Col>

                      <Col span={24}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Sisi Bawah</FormLabel>
                        </div>
                        <Input.TextArea id="sisiBawah" value={this.state.sisiBawah} disabled />
                      </Col>
                    </Row>
                  </Col>

                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Etiket</FormLabel>
                    </div>
                    <Button
                      type="primary"
                      loading={this.state.isDownloadLoading}
                      onClick={() => this.handleDownload("kodeFoto")}
                      disabled={!this.state.kodeFoto}
                    >
                      Download
                    </Button>
                  </Col>
                </Row>
              </Card>
            )}

          <Card title={this.state.subtitle5} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Dokumen Pembatalan</FormLabel>
                </div>
                <Button
                  type="primary"
                  loading={this.state.isDownloadLoading}
                  onClick={() => this.handleDownload("kodeUploadDokumen")}
                  disabled={!this.state.kodeUploadDokumen}
                >
                  Download
                </Button>
              </Col>
            </Row>
          </Card>

          <Card title={this.state.subtitle6} style={{ marginBottom: 30 }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Persetujuan</FormLabel>
                </div>
                <Select
                  id="tasktodoStatus"
                  onChange={(value) => this.handleSelectChange("tasktodoStatus", value)}
                  value={this.state.tasktodoStatus}
                  style={{ width: "100%" }}
                >
                  {this.state.listStatus.length > 0 &&
                    this.state.listStatus.map((item, index) => (
                      <Select.Option key={`tasktodoStatus-${index}`} value={item.idStatus}>
                        {item.namaStatus}
                      </Select.Option>
                    ))}
                </Select>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Nomor Pembatalan</FormLabel>
                </div>
                <Input
                  id="tasktodoNomorPembatalan"
                  onChange={this.handleInputChange}
                  value={this.state.tasktodoNomorPembatalan}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Tanggal Pembatalan</FormLabel>
                </div>
                <DatePicker
                  id="tasktodoTanggalPembatalan"
                  format="DD-MM-YYYY"
                  value={this.state.tasktodoTanggalPembatalan}
                  style={{ width: "100%" }}
                  onChange={(date) =>
                    this.handleDatepickerChange("tasktodoTanggalPembatalan", date)
                  }
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>Penjabat BC</FormLabel>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Input
                    id="tasktodoNipPenjabatBc"
                    onChange={this.handleInputChange}
                    value={this.state.tasktodoNipPenjabatBc}
                    style={{ flex: 1 }}
                    disabled
                  />
                  <Button
                    type="primary"
                    onClick={() => this.handleModalShow("isModalDaftarPenjabatBcVisible")}
                  >
                    Cari
                  </Button>
                  <Input
                    id="tasktodoNamaPenjabatBc"
                    onChange={this.handleInputChange}
                    value={this.state.tasktodoNamaPenjabatBc}
                    style={{ flex: 2 }}
                    disabled
                  />
                </div>
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: 10 }}>
                  <FormLabel>
                    {this.state.tasktodoStatus === "SETUJU" ? "Keterangan" : "Alasan"}
                  </FormLabel>
                </div>
                <Input.TextArea
                  id="tasktodoKeterangan"
                  onChange={this.handleInputChange}
                  value={this.state.tasktodoKeterangan}
                  rows={4}
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
          </Card>

          <Row gutter={[16, 16]}>
            <Col span={4}>
              <ButtonCustom variant="secondary" onClick={() => this.props.history.goBack()} block>
                Kembali
              </ButtonCustom>
            </Col>

            {this.state.tokenData?.kode_kantor === this.state.kodeKantor &&
              this.state.tokenData?.role ===
                "a565468f-bbfa-43ab-b6b1-7c3c33631b33,a565468f-bbfa-43ab-b6b1-7c3c33631b33" && (
                <Col span={4}>
                  <Button
                    type="primary"
                    loading={this.state.isSimpanTasktodoLoading}
                    onClick={this.handleSimpanTasktodo}
                    block
                  >
                    Simpan
                  </Button>
                </Col>
              )}
          </Row>
        </Container>

        <ModalDaftarPenjabatBc
          isVisible={this.state.isModalDaftarPenjabatBcVisible}
          onCancel={() => this.handleModalClose("isModalDaftarPenjabatBcVisible")}
          onDataDoubleClick={this.handleDataPenjabatBc}
        />
      </>
    );
  }
}
