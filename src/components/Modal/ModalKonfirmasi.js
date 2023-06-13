import React from "react";
import { Modal, Button, Row, Col, Icon, Typography } from "antd";

const { Text } = Typography;

export const ModalKonfirmasi = ({
  visible = false,
  type = "",
  title = "",
  message = "",
  textSubmit = "OK",
  textCancel = "Batal",
  showSubmit = true,
  showCancel = true,
  onSubmit = () => {},
  onCancel = () => {},
  buttons = [],
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      footer={null}
      style={{textAlign: "center"}}
      onCancel={onCancel}
    >
      <Row gutter={[16,16]} style={{fontSize: "51px"}}>
        <Col span={24}>
          {type === "warning" && (
            <Icon style={{verticalAlign: "text-top"}} type="info" theme="twoTone" />
          )}
          {type === "danger" && (
            <Icon style={{verticalAlign: "text-top"}} type="close-circle" theme="twoTone" twoToneColor="#FF1818" />
          )}
          {type === "info" && (
            <Icon style={{verticalAlign: "text-top"}} type="info-circle" theme="twoTone" twoToneColor="#EFF400" />
          )}
          {type === "success" && (
            <Icon style={{verticalAlign: "text-top"}} type="check-circle" theme="twoTone" twoToneColor="#34C700" />
          )}
        </Col>
      </Row>
      <Row gutter={[16,16]}>
        <Col span={24}>
          <Text strong={true}>
            {message}
          </Text>
        </Col>
      </Row>

      {buttons.length ? (
        <Row gutter={[16,16]} style={{textAlign: "center"}}>
          <Col span={24}>
            {buttons.map((button, buttonIndex) => (
              <div className={`btn-group ${button.parentClassName}`} key={buttonIndex}>
                <Button 
                  type={button.type || "secondary"}
                  onClick={button.onClick}
                  className={`mr-1 ml-1 ${button.className}`}
                  block
                >
                  {button.label}
                </Button>
              </div>
            ))}
          </Col>
        </Row>
      ) : (<></>)}

      {(!buttons.length && (showSubmit || showCancel)) && (
        <Row gutter={[16,16]}>
          <Col span={24}>
            {showSubmit && (
              <Button type="primary" onClick={onSubmit} className="btn-group">
                {textSubmit}
              </Button>
            )}
            {showCancel && (
              <Button type="danger" onClick={onCancel} className="btn-group">
                {textCancel}
              </Button>
            )}
          </Col>
        </Row>
      )}

    </Modal>
  );
};