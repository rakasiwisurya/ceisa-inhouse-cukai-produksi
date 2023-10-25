import { PDFViewer } from "@react-pdf/renderer";
import { Modal } from "antd";
import PdfTandaTerimaCK4 from "components/PdfTandaTerimaCK4";
import React, { Component } from "react";

export default class ModalCK4Pdf extends Component {
  render() {
    const { isVisible, onCancel, pdfContent } = this.props;

    return (
      <Modal
        title={`Tanda Terima ${pdfContent?.namaPerusahaan || ""}`}
        visible={isVisible}
        onCancel={onCancel}
        footer={null}
        width="75vw"
        style={{ marginTop: 20 }}
        centered
      >
        <PDFViewer width="100%" height={500}>
          <PdfTandaTerimaCK4 {...pdfContent} />
        </PDFViewer>
      </Modal>
    );
  }
}
