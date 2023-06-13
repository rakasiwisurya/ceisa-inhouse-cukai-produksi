import React, { Fragment } from "react";
import { Modal, Button, Row, Col, Icon, Typography } from "antd";

const { Text } = Typography;

export const ModalMessage = ({
  visible = false,
  type = "",
  title = "",
  message = "",
  textSubmit = "OK",
  textCancel = "Batal",
  showSubmit = true,
  showCancel = false,
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
      {(showSubmit && showCancel) ? (
        <Row gutter={[16,16]}>
          <Col span={6} />
          <Col span={6}>
            <Button type="primary" onClick={onSubmit} block>
              {textSubmit}
            </Button>
          </Col>
          <Col span={6}>
            <Button type="danger" onClick={onCancel} block>
              {textCancel}
            </Button>
          </Col>
          <Col span={6} />
        </Row>
      ) : (
        <Fragment>
          {showSubmit && (
            <Row gutter={[16,16]}>
              <Col span={9} />
              <Col span={6}>
                <Button type="primary" onClick={onSubmit} block>
                  {textSubmit}
                </Button>
              </Col>
              <Col span={9} />
            </Row>
          )}
          {showCancel && (
            <Row gutter={[16,16]}>
              <Col span={9} />
              <Col span={6}>
                <Button type="danger" onClick={onCancel} block>
                  {textCancel}
                </Button>
              </Col>
              <Col span={9} />
            </Row>
          )}
        </Fragment>
      )}
    </Modal>
  );
};