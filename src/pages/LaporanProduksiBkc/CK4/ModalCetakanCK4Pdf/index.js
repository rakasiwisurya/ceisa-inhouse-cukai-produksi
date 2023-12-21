import { PDFViewer } from "@react-pdf/renderer";
import { Modal, Skeleton } from "antd";
import PdfCetakanCK4 from "components/PdfCetakanCK4";
import React, { Component } from "react";

export default class ModalCetakanCK4Pdf extends Component {
  render() {
    const { isVisible, onCancel, isLoading, pdfContent } = this.props;

    return (
      <Modal
        title={`Cetakan CK4 ${pdfContent?.namaPerusahaan || ""}`}
        visible={isVisible}
        onCancel={onCancel}
        footer={null}
        width="75vw"
        style={{ marginTop: 20 }}
        centered
      >
        {isLoading ? (
          <Skeleton active avatar paragraph={{ rows: 10 }} />
        ) : (
          <PDFViewer width="100%" height={500}>
            <PdfCetakanCK4 {...pdfContent} />
          </PDFViewer>
        )}
      </Modal>
    );
  }
}
