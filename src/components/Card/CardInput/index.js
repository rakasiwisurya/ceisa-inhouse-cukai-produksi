import React, { Fragment, memo } from "react";
import { Row, Col, Card, Input, Form, Tabs, Typography, Alert, Select } from "antd";
import "../Card.css";
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Text } = Typography;

const Index = ({ title = "Title Card", data, children }) => {
  return (
    <Card title={title}>
      {data && (
        <Row gutter={16}>
          <Col span={24}>
            {data.type === "textarea" && (
              <Fragment>
                <TextArea
                  rows={data.rows}
                  disabled={data.disabled}
                  onChange={data.onChange}
                  value={data.value}
                  name={data.name}
                />
                {data.validation && (
                  <p
                    style={{
                      margin: 0,
                      textAlign: "left",
                      color: "#FF0000",
                    }}
                  >
                    {data.validation}
                  </p>
                )}
              </Fragment>
            )}

            {data.type === "form" && (
              <Form
                layout={data.layout}
                labelCol={{ span: data.layout === "horizontal" ? 6 : null }}
                wrapperCol={{ span: data.layout === "horizontal" ? 18 : null }}
              >
                {data.input &&
                  data.input.length > 0 &&
                  data.input.map((input, indexInput) => {
                    return (
                      <Col key={indexInput} span={input.colSpan ? input.colSpan : 24}>
                        <Form.Item label={input.label}>
                          {input.type === "text" && (
                            <Fragment>
                              {!input.children && (
                                <Input
                                  placeholder={input.placeholder}
                                  name={input.name}
                                  disabled={input.disabled}
                                  onChange={input.onChange}
                                  onClick={input.onClick ? input.onClick : () => {}}
                                  value={input.value}
                                  readOnly={input.readOnly}
                                />
                              )}
                              {input.children && (
                                <Fragment>
                                  <Row gutter={16}>
                                    {input.children.length > 0 &&
                                      input.children.map((children, indexChildren) => {
                                        return (
                                          <Fragment key={indexChildren}>
                                            <Col span={children.colSpan}>
                                              {children.type === "text" && (
                                                <Input
                                                  placeholder={children.placeholder}
                                                  name={children.name}
                                                  disabled={children.disabled}
                                                  onChange={children.onChange}
                                                  value={children.value}
                                                  readOnly={children.readOnly}
                                                />
                                              )}
                                            </Col>
                                          </Fragment>
                                        );
                                      })}
                                  </Row>
                                </Fragment>
                              )}
                            </Fragment>
                          )}

                          {input.type === "select" && (
                            <Select
                              value={input.value}
                              onChange={input.onChange}
                              style={{
                                textAlign: "left",
                                borderRadius: 4,
                                border: input.validation ? "1px solid #FF0000" : "",
                              }}
                              allowClear
                              disabled={input.disabled ? input.disabled : false}
                            >
                              {input.placeholder && <Option value="">{input.placeholder}</Option>}

                              {input.option &&
                                input.option.length > 0 &&
                                input.option.map((opt, indexOpt) => {
                                  return (
                                    <Option key={indexOpt} value={opt.value}>
                                      {opt.label}
                                    </Option>
                                  );
                                })}
                            </Select>
                          )}

                          {input.type === "textarea" && (
                            <TextArea
                              rows={input.rows}
                              disabled={input.disabled}
                              onChange={input.onChange}
                              value={input.value}
                              name={input.name}
                            />
                          )}

                          {input.type === "alert" && (
                            <Alert
                              style={{
                                textAlign: "left",
                                borderRadius: 4,
                              }}
                              // message={
                              //   <Fragment>
                              //     {dataInput.message}{' '}
                              //     {dataInput.link && (
                              //       <Link onClick={() => handleClickLink(dataInput.link)}>
                              //         {dataInput.link}
                              //       </Link>
                              //     )}
                              //   </Fragment>
                              // }
                              message={input.message}
                              type={input.alertType}
                              showIcon
                            />
                          )}

                          {input.type === "children" && (
                            <Row gutter={16}>
                              {input.children &&
                                input.children.length > 0 &&
                                input.children.map((child, indexChild) => {
                                  return (
                                    <Col span={child.colSpan} key={indexChild}>
                                      {child.type === "text" && (
                                        <Input
                                          placeholder={child.placeholder}
                                          name={child.name}
                                          disabled={child.disabled}
                                          onChange={child.onChange}
                                          value={child.value}
                                          readOnly={child.readOnly}
                                        />
                                      )}
                                    </Col>
                                  );
                                })}
                            </Row>
                          )}
                        </Form.Item>
                      </Col>
                    );
                  })}
              </Form>
            )}

            {data.type === "tab" && (
              <Tabs onChange={() => {}} type="card">
                {data.tab &&
                  data.tab.length > 0 &&
                  data.tab.map((tabs, indexTab) => {
                    return (
                      <TabPane tab={`${tabs.title}`} key={`${indexTab + 1}`}>
                        <Row gutter={16}>
                          {tabs.data &&
                            tabs.data.length > 0 &&
                            tabs.data.map((data, indexData) => {
                              return (
                                <Fragment key={indexData}>
                                  <Col span={12} style={{ marginBottom: 15 }}>
                                    <Text
                                      style={{
                                        fontFamily: "Poppins",
                                        fontStyle: "normal",
                                        fontWeight: 600,
                                        fontSize: "14px",
                                        lineHeight: "21px",
                                        color: "#000000",
                                      }}
                                    >
                                      {data.textLeft}
                                    </Text>
                                  </Col>
                                  <Col span={12} style={{ marginBottom: 15 }}>
                                    <Text
                                      style={{
                                        fontFamily: "Poppins",
                                        fontStyle: "normal",
                                        fontWeight: "normal",
                                        fontSize: "14px",
                                        lineHeight: "21px",
                                        color: "#848484",
                                      }}
                                    >
                                      {data.textRight}
                                    </Text>
                                  </Col>
                                </Fragment>
                              );
                            })}
                        </Row>
                      </TabPane>
                    );
                  })}
              </Tabs>
            )}
          </Col>
        </Row>
      )}
      {children}
    </Card>
  );
};

export default memo(Index);
