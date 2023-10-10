import { pdf } from "@react-pdf/renderer";
import { Form, Input, Modal, notification } from "antd";
import FormLabel from "components/FormLabel";
import PdfPenetapanTarifTTE from "components/PdfPenetapanTarifTTE";
import React, { Component } from "react";
import { base64toBlob } from "utils/converter";
import { requestApi } from "utils/requestApi";

export class ModalProcessTTE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProcessTteLoading: false,
    };
  }

  handleProcessTte = (e) => {
    const { form, pdfContent, onCancel } = this.props;

    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (err) console.error(err);

      this.setState({ isProcessTteLoading: true });

      const responseNikHris = await requestApi({
        service: "fasilitas",
        method: "get",
        endpoint: `/nadine/nik-hris/${values.nip}`,
      });

      if (responseNikHris) {
        const qrCodeBlob = await pdf(
          <PdfPenetapanTarifTTE
            {...pdfContent}
            tte_jabatan={responseNikHris.data.data.Jabatan}
            tte_nama={responseNikHris.data.data.Nama}
            qr_data_url={document.getElementById(pdfContent?.permohonan_tarif_id)?.toDataURL()}
          />
        ).toBlob();

        const formData = new FormData();

        formData.set("multipartFile", qrCodeBlob);
        formData.set("nip", values.nip);
        formData.set("pass", values.password);

        const responseUploadUnsignedTte = await requestApi({
          service: "fasilitas",
          contentType: "formData",
          method: "post",
          endpoint: "/nadine/uploadFile",
          body: formData,
        });

        if (responseUploadUnsignedTte) {
          const blobTteUnsigned = base64toBlob(
            responseUploadUnsignedTte.data.data.byteOfpdf,
            "application/pdf"
          );

          const formData = new FormData();
          formData.set(
            "file",
            blobTteUnsigned,
            `penetapan_tarif_${pdfContent?.permohonan_tarif_id}`
          );
          formData.set("s3pathTarget", "produksi");

          const responseUploadSignedTte = await requestApi({
            service: "fasilitas",
            contentType: "formData",
            method: "post",
            endpoint: "nadine/uploadSignedFile",
            body: formData,
          });

          if (responseUploadSignedTte) {
            const blobUrl = URL.createObjectURL(blobTteUnsigned);
            const downloadLink = document.createElement("a");
            downloadLink.href = blobUrl;
            downloadLink.download = `penetapan_tarif_${pdfContent?.nama_perusahaan}.pdf`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            URL.revokeObjectURL(blobUrl);

            notification.success({
              message: "Success",
              description: responseUploadSignedTte.data.message,
            });
            onCancel();
            form.resetFields();
          }
        }
      }

      this.setState({ isProcessTteLoading: false });
    });
  };

  render() {
    const {
      isVisible,
      onCancel,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleProcessTte} layout="vertical">
        <Modal
          title="Process TTE"
          visible={isVisible}
          onCancel={onCancel}
          onOk={this.handleProcessTte}
          okButtonProps={{ loading: this.state.isProcessTteLoading, htmlType: "submit" }}
          okText="Process"
          style={{ marginTop: 20 }}
          centered
        >
          <Form.Item label={<FormLabel>NIP</FormLabel>}>
            {getFieldDecorator("nip", { rules: [{ required: true }] })(<Input name="nip" />)}
          </Form.Item>

          <Form.Item label={<FormLabel>Password</FormLabel>} style={{ marginBottom: 0 }}>
            {getFieldDecorator("password", { rules: [{ required: true }] })(
              <Input.Password name="password" />
            )}
          </Form.Item>
        </Modal>
      </Form>
    );
  }
}

export default Form.create({ name: "form_process_tte" })(ModalProcessTTE);
