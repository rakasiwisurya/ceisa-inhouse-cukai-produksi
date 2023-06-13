import React, { Fragment } from 'react';
import { Form, Input, Select } from 'antd';
import './SingleForm.css';
const { Option } = Select;

const Index = ({ layout, input }) => {
  return (
    <Form
      className="single-form"
      labelCol={{ span: layout === 'horizontal' ? 10 : 24 }}
      wrapperCol={{ span: layout === 'horizontal' ? 14 : 24 }}
      layout={layout}
    >
      {input &&
        input.length > 0 &&
        input.map((inputs, indexInputs) => {
          return (
            <Form.Item key={indexInputs} noStyle>
              <Form.Item
                label={inputs.label}
                name={inputs.name}
                rules={[{ required: inputs.required }]}
              >
                <Fragment>
                  {(inputs.type === 'text' || inputs.type === 'number') && (
                    <Input
                      type={inputs.type}
                      name={inputs.name}
                      value={inputs.value}
                      onChange={inputs.onChange}
                      placeholder={inputs.placeholder}
                      style={{
                        borderRadius: 4,
                        border: inputs.validation ? '1px solid #FF0000' : '',
                      }}
                      disabled={inputs.disabled ? inputs.disabled : false}
                    />
                  )}

                  {inputs.type === 'select' && (
                    <Select
                      value={inputs.value}
                      onChange={inputs.onChange}
                      style={{
                        textAlign: 'left',
                        borderRadius: 4,
                        border: inputs.validation ? '1px solid #FF0000' : '',
                      }}
                      allowClear
                      disabled={inputs.disabled ? inputs.disabled : false}
                    >
                      {inputs.placeholder && (
                        <Option value="">{inputs.placeholder}</Option>
                      )}

                      {inputs.option &&
                        inputs.option.length > 0 &&
                        inputs.option.map((opt, indexOpt) => {
                          return (
                            <Option key={indexOpt} value={opt.value}>
                              {opt.label}
                            </Option>
                          );
                        })}
                    </Select>
                  )}

                  {inputs.validation && (
                    <p
                      style={{
                        margin: 0,
                        marginTop: 10,
                        textAlign: 'left',
                        color: '#FF0000',
                      }}
                    >
                      {inputs.validation}
                    </p>
                  )}
                </Fragment>
              </Form.Item>
            </Form.Item>
          );
        })}
    </Form>
  );
};

export default Index;
