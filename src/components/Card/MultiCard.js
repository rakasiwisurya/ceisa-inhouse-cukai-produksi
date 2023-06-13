import React, { Fragment } from "react";
import { Row, Col, Card, Spin } from "antd";


export const MultiCard = ({
  data = [],
  drawListInput = () => (<></>),
  drawListText = () => (<></>),
  className = "",
  loading = false,
}) => {
  return (
    <Fragment>
      {data.map((row,rowIndex) => (
        <Row gutter={[16,16]} key={rowIndex} className={className}>
          {row.map((col, colIndex) => (
            <Col span={col.size} key={colIndex}>
              {col.content.map((card, cardIndex) => (
                <Spin spinning={loading} key={cardIndex}>
                  <Card
                    title={card.title}
                    bordered={true}
                    style={card.style || {borderRadius: "8px"}}
                    headStyle={card.headStyle || {textAlign: "center"}}
                    className="mb-4"
                  >
                    <>
                    {card.type === "component" && card.content}
                    {card.type === "list-input" && card.content.map(drawListInput)}
                    {card.type === "list-text" && card.content.map(drawListText)}
                    </>
                  </Card>
                </Spin>
              ))}
            </Col>
          ))}
        </Row>
      ))}
    </Fragment>
  );
}