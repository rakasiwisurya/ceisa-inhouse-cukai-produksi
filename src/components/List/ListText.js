import React, { Fragment } from "react";
import { Row, Col, Typography, Divider } from "antd";

const { Text } = Typography;

export const ListText = ({
  dataSource,
  data = [],
  sizeLeft = 10,
  sizeRight = 14,
}) => {
  return (
    <Fragment>
      {data.map((row,rowIndex) => (
        <Fragment key={rowIndex}>
          {row.title && (
            <Row gutter={[16,16]}>
              <Col span={24} className="text-center">
                <Text style={{fontSize: '14px'}} strong={true}>{row.title}</Text>
              </Col>
            </Row>
          )}
          {row.content.map((text,textIndex) => (
            <Row gutter={[16,16]} key={textIndex}>
              <Col span={sizeLeft}>
                <Text strong={true}>
                  {text.label}
                </Text>
              </Col>
              <Col span={sizeRight}>
                {(dataSource && dataSource[text.name]) || text.value}
              </Col>
            </Row>
          ))}
          {row.divider && <Divider />}
        </Fragment>
      ))}
    </Fragment>
  );
};

