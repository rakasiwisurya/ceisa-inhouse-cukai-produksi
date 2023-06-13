import React, { Fragment, memo } from 'react';
import {
  // Row,
  Col,
  Card,
  Typography,
  // Alert
} from 'antd';
import '../Card.css';
const { Text } = Typography;

const Index = ({ title, data }) => {
  return (
    <Card title={title}>
      {data &&
        data.length > 0 &&
        data.map((data, indexData) => {
          return (
            <Fragment key={indexData}>
              <Col span={12} style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    fontFamily: 'Poppins',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '21px',
                    color: '#000000',
                  }}
                >
                  {data.textLeft}
                </Text>
              </Col>
              <Col span={12} style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    fontFamily: 'Poppins',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '14px',
                    lineHeight: '21px',
                    color: '#848484',
                  }}
                >
                  {data.textRight}
                </Text>
              </Col>
            </Fragment>
          );
        })}
    </Card>
  );
};

export default memo(Index);
