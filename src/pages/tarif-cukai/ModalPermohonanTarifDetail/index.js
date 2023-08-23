import { Card, Col, DatePicker, Input, InputNumber, Modal, Row, Select, Skeleton } from "antd";
import FormLabel from "components/FormLabel";
import moment from "moment";
import React, { Component } from "react";
import { requestApi } from "utils/requestApi";

export default class ModalPermohonanTarifDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle1: "Header",
      subtitle2: "Pabrik/Importir",
      subtitle3: "Rincian",
      subtitle4: "Tampilan Kemasan",

      isDetailLoading: true,

      jenis_bkc_id: null,
      jenis_bkc_name: null,
      nomor_permohonan: null,
      tanggal_permohonan: null,
      lokasi_perekaman_id: null,
      lokasi_perekaman_name: null,
      tanggal_kep: null,
      awal_berlaku: null,

      nppbkc_id: null,
      nppbkc: null,
      nama_nppbkc: null,
      npwp_nppbkc: null,
      alamat_nppbkc: null,

      jenis_pita_id: null,

      merk_ht_id: null,
      merk_ht: null,
      jenis_produksi_ht_id: null,
      jenis_produksi_ht_code: null,
      golongan_id: null,
      golongan_name: null,
      jenis_htl_rel_ht_id: null,
      jenis_htl_rel_ht_name: null,
      jenis_htl_rel_ht_satuan: null,
      isi_ht: null,
      berat_ht: null,
      hje_perkemasan_ht: null,
      hje_persatuan_ht: null,
      tarif_ht: null,
      bahan_kemasan_ht: null,
      asal_produk_ht_id: null,
      asal_produk_ht_name: null,
      tujuan_pemasaran_ht: null,

      merk_mmea_id: null,
      merk_mmea: null,
      negara_asal_mmea_id: null,
      negara_asal_mmea_name: null,
      isi_mmea: null,
      tarif_cukai_per_liter: null,
      tarif_cukai_per_kemasan: null,
      asal_produk_mmea_id: null,
      asal_produk_mmea_name: null,

      personal: null,
      seri_pita: null,

      nomor_surat_lisensi: null,
      tanggal_surat_lisensi: null,

      sisi_depan: null,
      sisi_belakang: null,
      sisi_kiri: null,
      sisi_kanan: null,
      sisi_atas: null,
      sisi_bawah: null,
      file_gambar_etiket: null,
      preview_gambar_etiket: null,

      list_jenis_bkc: [],
      list_bahan_kemasan: [
        {
          bahan_kemasan_id: "KERTAS DAN SEJENISNYA",
          bahan_kemasan_name: "KERTAS DAN SEJENISNYA",
          seri_pita: "III DP",
        },
        {
          bahan_kemasan_id: "BOTOL DAN SEJENISNYA",
          bahan_kemasan_name: "BOTOL DAN SEJENISNYA",
          seri_pita: "III TP",
        },
        {
          bahan_kemasan_id: "LAINNYA",
          bahan_kemasan_name: "LAINNYA",
          seri_pita: "III DP",
        },
      ],
      list_asal_produk_ht: [
        {
          asal_produk_ht_id: "DN",
          asal_produk_ht_name: "IMPOR",
        },
        {
          asal_produk_ht_id: "",
          asal_produk_ht_name: "NON IMPOR",
        },
      ],
      list_asal_produk_mmea: [
        {
          asal_produk_mmea_id: "DALAM_NEGERI",
          asal_produk_mmea_name: "DALAM NEGERI",
        },
        {
          asal_produk_mmea_id: "LUAR_NEGERI",
          asal_produk_mmea_name: "LUAR NEGERI / IMPOR",
        },
      ],
      list_tujuan_pemasaran: [
        {
          tujuan_pemasaran_id: "DALAM NEGERI",
          tujuan_pemasaran_name: "DALAM NEGERI",
        },
        {
          tujuan_pemasaran_id: "EKSPOR",
          tujuan_pemasaran_name: "EKSPOR",
        },
        {
          tujuan_pemasaran_id: "BAHAN BAKU",
          tujuan_pemasaran_name: "BAHAN BAKU",
        },
        {
          tujuan_pemasaran_id: "LABORATORIUM",
          tujuan_pemasaran_name: "LABORATORIUM",
        },
      ],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id && this.props.id) {
      this.getPermohonanTarifDetail();
    }

    if (prevState.jenis_produksi_ht_id !== this.state.jenis_produksi_ht_id) {
      this.setState({ hje_persatuan_ht: this.state.isi_ht / this.state.hje_perkemasan_ht });
    }
  }

  getPermohonanTarifDetail = async () => {
    const payload = { idTarifMerkHeader: this.props.id };

    const response = await requestApi({
      service: "produksi",
      method: "get",
      endpoint: "/pita-cukai/browse-tarif-cukai-detail",
      params: payload,
      setLoading: (bool) => this.setState({ isDetailLoading: bool }),
    });

    if (response) {
      const { data } = response.data;

      this.setState({
        jenis_bkc_id: data.idJenisBkc,
        jenis_bkc_name: data.namaJenisBkc,
        nomor_permohonan: data.nomorPermohonan,
        tanggal_permohonan: moment(data.tanggalPermohonan),
        lokasi_perekaman_name: data.kotaPermohonan,
        tanggal_kep: moment(data.tanggalSkep),
        awal_berlaku: moment(data.awalBerlaku),

        nppbkc_id: data.idNppbkc,
        nppbkc: data.nppbkc,
        nama_nppbkc: data.namaPerusahaan,
        npwp_nppbkc: data.npwp,
        alamat_nppbkc: data.alamatPerusahaan,

        jenis_pita_id: data.idJenisPitaCukai,

        merk_ht_id: data.idJenisBkc === 3 ? data.idMerk : null,
        merk_ht: data.idJenisBkc === 3 ? data.namaMerk : null,
        jenis_produksi_ht_id: data.idJenisProduksiBkc,
        jenis_produksi_ht_code: data.jenisProduksiBkc,
        golongan_id: data.idGolongan,
        golongan_name: data.namaGolongan,
        jenis_htl_rel_ht_id: data.idJenisHtlRel,
        jenis_htl_rel_ht_name: data.jenisHtlRel,
        jenis_htl_rel_ht_satuan: data.kodeSatuanRel,
        isi_ht: data.idJenisBkc === 3 ? data.isiPerkemasan : null,
        berat_ht: data.beratVolume,
        hje_perkemasan_ht: data.hjePerKemasan,
        hje_persatuan_ht: data.hjePerBatang,
        tarif_ht: data.idJenisBkc === 3 ? data.tarifSpesifik : null,
        bahan_kemasan_ht: data.bahanKemasan,
        asal_produk_ht_id:
          data.idJenisBkc === 3 ? (data.asalProduksi === "IMPOR" ? "DN" : "") : null,
        asal_produk_ht_name: data.idJenisBkc === 3 ? data.asalProduksi : null,
        tujuan_pemasaran_ht: data.tujuanPemasaran,

        merk_mmea_id: data.idJenisBkc === 3 ? data.idMerk : null,
        merk_mmea: data.idJenisBkc === 2 ? data.namaMerk : null,
        negara_asal_mmea_name: data.negaraAsal,
        isi_mmea: data.idJenisBkc === 2 ? data.isiPerkemasan : null,
        tarif_cukai_per_liter: data.idJenisBkc === 2 ? data.tarifSpesifik : null,
        tarif_cukai_per_kemasan: data.tarifPerKemasan,
        asal_produk_mmea_id:
          data.idJenisBkc === 2
            ? data.asalProduksi === "DALAM NEGERI"
              ? "DALAM_NEGERI"
              : "LUAR_NEGERI"
            : null,
        asal_produk_mmea_name: data.idJenisBkc === 2 ? data.asalProduksi : null,

        personal: data.personalisasi,
        seri_pita: data.seriPita,

        nomor_surat_lisensi: data.nomorLisensi,
        tanggal_surat_lisensi: moment(data.tanggalLisensi),

        sisi_depan: data.sisiDepan,
        sisi_belakang: data.sisiBelakang,
        sisi_kiri: data.sisiKiri,
        sisi_kanan: data.sisiKanan,
        sisi_atas: data.sisiAtas,
        sisi_bawah: data.sisiBawah,
        preview_gambar_etiket: data.etiket,
      });
    }
  };

  render() {
    return (
      <Modal
        title="Permohonan Tarif Detail"
        width="70%"
        visible={this.props.isVisible}
        onCancel={this.props.onCancel}
        footer={null}
        centered
        style={{ top: 20 }}
      >
        {this.state.isDetailLoading ? (
          <Skeleton active avatar paragraph={{ rows: 10 }} />
        ) : (
          <>
            <Card title={this.state.subtitle1} style={{ marginBottom: 10 }}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Jenis BKC</FormLabel>
                  </div>
                  <Select
                    id="jenis_bkc"
                    value={this.state.jenis_bkc_id}
                    style={{ width: "100%" }}
                    disabled
                  >
                    <Select.Option value={this.state.jenis_bkc_id}>
                      {this.state.jenis_bkc_name}
                    </Select.Option>
                  </Select>
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>No. Permohonan</FormLabel>
                  </div>
                  <Input id="nomor_permohonan" value={this.state.nomor_permohonan} disabled />
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Tanggal Permohonan</FormLabel>
                  </div>
                  <DatePicker
                    id="tanggal_permohonan"
                    format="DD-MM-YYYY"
                    value={this.state.tanggal_permohonan}
                    style={{ width: "100%" }}
                    disabled
                  />
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Lokasi Perekaman</FormLabel>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Input
                      id="lokasi_perekaman"
                      value={this.state.lokasi_perekaman_name}
                      disabled
                    />
                  </div>
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Tanggal KEP</FormLabel>
                  </div>
                  <DatePicker
                    id="tanggal_kep"
                    format="DD-MM-YYYY"
                    value={this.state.tanggal_kep}
                    style={{ width: "100%" }}
                    disabled
                  />
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Awal Berlaku</FormLabel>
                  </div>
                  <DatePicker
                    id="awal_berlaku"
                    format="DD-MM-YYYY"
                    value={this.state.awal_berlaku}
                    style={{ width: "100%" }}
                    disabled
                  />
                </Col>
              </Row>
            </Card>

            <Card title={this.state.subtitle2} style={{ marginBottom: 10 }}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>NPPBKC</FormLabel>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Input id="nppbkc" value={this.state.nppbkc} disabled />
                    <Input id="nama_perusahaan" value={this.state.nama_nppbkc} disabled />
                  </div>
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>NPWP</FormLabel>
                  </div>
                  <Input id="npwp_nppbkc" value={this.state.npwp_nppbkc} disabled />
                </Col>

                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Alamat</FormLabel>
                  </div>
                  <Input id="alamat_nppbkc" value={this.state.alamat_nppbkc} disabled />
                </Col>
              </Row>
            </Card>

            <Card title={this.state.subtitle3} style={{ marginBottom: 10 }}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div style={{ marginBottom: 10 }}>
                    <FormLabel>Jenis Pita</FormLabel>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Input
                      id="jenis_pita"
                      value={`${[
                        this.state.personal,
                        this.state.isi_ht || this.state.isi_mmea,
                        this.state.seri_pita,
                        this.state.tarif_ht || this.state.tarif_cukai_per_liter,
                      ]
                        .filter((str) => str !== null)
                        .join("_")}`}
                      disabled
                    />
                  </div>
                </Col>

                {this.state.jenis_bkc_id === 3 && (
                  <Col span={12}>
                    <div style={{ marginBottom: 10 }}>
                      <FormLabel>Merk HT</FormLabel>
                    </div>
                    {this.state.jenis_produksi_ht_id === 2 ||
                    this.state.jenis_produksi_ht_id === 5 ? (
                      <Input
                        id="merk_ht"
                        value={`${[
                          this.state.personal,
                          this.state.isi_ht,
                          this.state.hje_perkemasan_ht,
                          this.state.asal_produk_ht_id,
                          this.state.seri_pita,
                          this.state.tarif_ht,
                        ]
                          .filter((str) => str !== null)
                          .join("_")}`}
                        disabled
                      />
                    ) : (
                      <Input id="merk_ht" value={this.state.merk_ht} disabled />
                    )}
                  </Col>
                )}

                {this.state.jenis_bkc_id === 3 && (
                  <>
                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Jenis Produksi</FormLabel>
                      </div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <Input
                          id="jenis_produksi_ht"
                          value={
                            this.state.jenis_produksi_ht_code && this.state.golongan_name
                              ? `${this.state.jenis_produksi_ht_code} - ${this.state.golongan_name}`
                              : this.state.jenis_produksi_ht_code
                          }
                          disabled
                        />
                        {(this.state.jenis_produksi_ht_id === 2 ||
                          this.state.jenis_produksi_ht_id === 5) && (
                          <>
                            <Input
                              id="jenis_htl_rel_ht_name"
                              value={this.state.jenis_htl_rel_ht_name}
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
                          id="isi_ht"
                          value={this.state.isi_ht}
                          style={{ width: "100%" }}
                          disabled
                        />

                        {this.state.jenis_htl_rel_ht_satuan && (
                          <div>{this.state.jenis_htl_rel_ht_satuan}</div>
                        )}
                      </div>
                    </Col>

                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Berat / Volume (per kemasan)</FormLabel>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <InputNumber
                          id="berat_ht"
                          value={this.state.berat_ht}
                          style={{ width: "100%" }}
                          disabled
                        />

                        {(this.state.jenis_htl_rel_ht_id === 4 ||
                          this.state.jenis_htl_rel_ht_id === 6) && (
                          <div>{this.state.jenis_htl_rel_ht_satuan}</div>
                        )}
                      </div>
                    </Col>

                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>HJE per kemasan</FormLabel>
                      </div>
                      <InputNumber
                        id="hje_perkemasan_ht"
                        value={this.state.hje_perkemasan_ht}
                        style={{ width: "100%" }}
                        disabled
                      />
                    </Col>

                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>HJE / satuan</FormLabel>
                      </div>
                      <InputNumber
                        id="hje_persatuan_ht"
                        value={this.state.hje_persatuan_ht}
                        style={{ width: "100%" }}
                        disabled
                      />
                    </Col>

                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Tarif Spesifik</FormLabel>
                      </div>
                      <InputNumber
                        id="tarif_ht"
                        value={this.state.tarif_ht}
                        style={{ width: "100%" }}
                        disabled
                      />
                    </Col>

                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Bahan Kemasan</FormLabel>
                      </div>
                      <Select
                        id="bahan_kemasan_ht"
                        value={this.state.bahan_kemasan_ht}
                        style={{ width: "100%" }}
                        disabled
                      >
                        {this.state.list_bahan_kemasan.length > 0 &&
                          this.state.list_bahan_kemasan.map((item, index) => (
                            <Select.Option
                              key={`bahan-kemasan-${index}`}
                              value={`${item.bahan_kemasan_id}-${item.seri_pita}`}
                            >
                              {item.bahan_kemasan_name}
                            </Select.Option>
                          ))}
                      </Select>
                    </Col>

                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Asal Produk</FormLabel>
                      </div>
                      <Select
                        id="asal_produk_ht"
                        value={this.state.asal_produk_ht_id}
                        style={{ width: "100%" }}
                        disabled
                      >
                        {this.state.list_asal_produk_ht.length > 0 &&
                          this.state.list_asal_produk_ht.map((item, index) => (
                            <Select.Option
                              key={`asal-produk-ht-${index}`}
                              value={item.asal_produk_ht_id}
                            >
                              {item.asal_produk_ht_name}
                            </Select.Option>
                          ))}
                      </Select>
                    </Col>

                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Tujuan Pemasaran</FormLabel>
                      </div>
                      <Select
                        id="tujuan_pemasaran_ht"
                        value={this.state.tujuan_pemasaran_ht}
                        style={{ width: "100%" }}
                        disabled
                      >
                        {this.state.list_tujuan_pemasaran.length > 0 &&
                          this.state.list_tujuan_pemasaran.map((item, index) => (
                            <Select.Option
                              key={`tujuan-pemasaran-${index}`}
                              value={item.tujuan_pemasaran_id}
                            >
                              {item.tujuan_pemasaran_name}
                            </Select.Option>
                          ))}
                      </Select>
                    </Col>

                    {this.state.asal_produk_ht_id === "DN" && (
                      <>
                        <Col span={12}>
                          <div style={{ marginBottom: 10 }}>
                            <FormLabel>Nomor Surat Lisensi Pemegang Merk</FormLabel>
                          </div>
                          <Input
                            id="nomor_surat_lisensi"
                            value={this.state.nomor_surat_lisensi}
                            disabled
                          />
                        </Col>

                        <Col span={12}>
                          <div style={{ marginBottom: 10 }}>
                            <FormLabel>Tanggal Surat Lisensi</FormLabel>
                          </div>
                          <DatePicker
                            id="tanggal_surat_lisensi"
                            format="DD-MM-YYYY"
                            value={this.state.tanggal_surat_lisensi}
                            style={{ width: "100%" }}
                            disabled
                          />
                        </Col>
                      </>
                    )}
                  </>
                )}

                {this.state.jenis_bkc_id === 2 && (
                  <>
                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Merk MMEA</FormLabel>
                      </div>
                      <Input id="merk_mmea" value={this.state.merk_mmea} disabled />
                    </Col>

                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Asal Produk</FormLabel>
                      </div>
                      <Select
                        id="asal_produk_mmea"
                        value={this.state.asal_produk_mmea_id}
                        style={{ width: "100%" }}
                        disabled
                      >
                        {this.state.list_asal_produk_mmea.length > 0 &&
                          this.state.list_asal_produk_mmea.map((item, index) => (
                            <Select.Option
                              key={`asal-produk-mmea-${index}`}
                              value={item.asal_produk_mmea_id}
                            >
                              {item.asal_produk_mmea_name}
                            </Select.Option>
                          ))}
                      </Select>
                    </Col>

                    {this.state.asal_produk_mmea_id === "LUAR_NEGERI" && (
                      <Col span={12}>
                        <div style={{ marginBottom: 10 }}>
                          <FormLabel>Negara Asal</FormLabel>
                        </div>
                        <div style={{ display: "flex", gap: 10 }}>
                          <Input
                            id="negara_asal_mmea_name"
                            value={this.state.negara_asal_mmea_name}
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
                          id="isi_mmea"
                          value={this.state.isi_mmea}
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
                      <Input id="golongan_name" value={this.state.golongan_name} disabled />
                    </Col>

                    <Col span={12}>
                      <div style={{ marginBottom: 10 }}>
                        <FormLabel>Tarif Cukai Per Liter</FormLabel>
                      </div>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <InputNumber
                          id="tarif_cukai_per_liter"
                          value={this.state.tarif_cukai_per_liter}
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
                          id="tarif_cukai_per_kemasan"
                          value={this.state.tarif_cukai_per_kemasan}
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

            {this.state.jenis_bkc_id === 3 &&
              !(this.state.jenis_produksi_ht_id === 2 || this.state.jenis_produksi_ht_id === 5) && (
                <>
                  <Card title={this.state.subtitle4}>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Row gutter={[16, 16]}>
                          <Col span={24}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Sisi Depan</FormLabel>
                            </div>
                            <Input.TextArea
                              id="sisi_depan"
                              value={this.state.sisi_depan}
                              disabled
                            />
                          </Col>

                          <Col span={24}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Sisi Belakang</FormLabel>
                            </div>
                            <Input.TextArea
                              id="sisi_belakang"
                              value={this.state.sisi_belakang}
                              disabled
                            />
                          </Col>

                          <Col span={24}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Sisi Kiri</FormLabel>
                            </div>
                            <Input.TextArea id="sisi_kiri" value={this.state.sisi_kiri} disabled />
                          </Col>

                          <Col span={24}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Sisi Kanan</FormLabel>
                            </div>
                            <Input.TextArea
                              id="sisi_kanan"
                              value={this.state.sisi_kanan}
                              disabled
                            />
                          </Col>

                          <Col span={24}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Sisi Atas</FormLabel>
                            </div>
                            <Input.TextArea id="sisi_atas" value={this.state.sisi_atas} disabled />
                          </Col>

                          <Col span={24}>
                            <div style={{ marginBottom: 10 }}>
                              <FormLabel>Sisi Bawah</FormLabel>
                            </div>
                            <Input.TextArea
                              id="sisi_bawah"
                              value={this.state.sisi_bawah}
                              disabled
                            />
                          </Col>
                        </Row>
                      </Col>

                      <Col span={12}>
                        {this.state.preview_gambar_etiket && (
                          <div style={{ marginTop: 20 }}>
                            <img
                              src={this.state.preview_gambar_etiket}
                              alt="Foto Etiket"
                              style={{ maxWidth: "100%" }}
                            />
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Card>
                </>
              )}
          </>
        )}
      </Modal>
    );
  }
}