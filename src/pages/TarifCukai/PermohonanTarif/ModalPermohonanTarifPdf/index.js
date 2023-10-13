import { PDFViewer } from "@react-pdf/renderer";
import { Button, Col, Modal, Row } from "antd";
import PdfPenetapanTarifTTE from "components/PdfPenetapanTarifTTE";
import React, { Component } from "react";

export default class ModalPermohonanTarifPdf extends Component {
  render() {
    const { isVisible, onButtonTteClick, onCancel, pdfContent } = this.props;

    return (
      <Modal
        title={
          <Row type="flex" justify="space-between" align="middle" style={{ marginRight: 26 }}>
            <Col>Penetapan Tarif Cukai TTE</Col>
            <Col>
              <Button type="primary" onClick={onButtonTteClick}>
                Process TTE
              </Button>
            </Col>
          </Row>
        }
        visible={isVisible}
        onCancel={onCancel}
        footer={null}
        width="75vw"
        style={{ marginTop: 20 }}
        centered
      >
        <PDFViewer width="100%" height={500}>
          <PdfPenetapanTarifTTE {...pdfContent} />
        </PDFViewer>
      </Modal>
    );
  }
}
