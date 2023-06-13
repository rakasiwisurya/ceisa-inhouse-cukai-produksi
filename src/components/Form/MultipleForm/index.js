import React, {
  Fragment,
  memo,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  Row,
  Col,
  Card,
  Input,
  Form,
  Select,
  Alert,
  Checkbox,
  DatePicker,
  Spin,
} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import moment from 'moment';
import './MultipleForm.css';
const { Option } = Select;
const { TextArea } = Input;

const RenderWrapperForm = memo(({ inputs }) => {
  return (
    <Fragment>
      {inputs.map((dataInputs, indexDataInputs) => {
        return <RenderCard key={indexDataInputs} dataInputs={dataInputs} />;
      })}
    </Fragment>
  );
});

const RenderCard = memo(({ dataInputs }) => {
  return (
    <Col className="wrapper-card" span={dataInputs.colSpan}>
      {dataInputs.data &&
        dataInputs.data.length > 0 &&
        dataInputs.data.map((datas, indexDatas) => {
          return <RenderForm key={indexDatas} datas={datas} />;
        })}
    </Col>
  );
});

const RenderForm = memo(({ datas }) => {
  return (
    <Row gutter={16}>
      <Col className="gutter-row" span={datas.colSpan}>
        <Card className="content-card" type="inner" title={datas.title}>
          <Form layout={datas.layout}>
            <Row gutter={16}>
              {datas.input &&
                datas.input.length > 0 &&
                datas.input.map((dataInput, indexDataInput) => {
                  return (
                    <RenderInput
                      indexInput={indexDataInput}
                      key={indexDataInput}
                      dataInput={dataInput}
                    />
                  );
                })}

              {datas.form &&
                datas.form.length > 0 &&
                datas.form.map((form, indexForm) => {
                  return (
                    <Col
                      key={indexForm}
                      className="gutter-row"
                      span={form.colSpan}
                    >
                      <Row gutter={16}>
                        {form.data &&
                          form.data.length > 0 &&
                          form.data.map((data, indexData) => {
                            return (
                              <RenderFormCheckbox key={indexData} data={data} />
                            );
                          })}
                      </Row>
                    </Col>
                  );
                })}
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
});

const RenderFormCheckbox = memo(({ data }) => {
  return (
    <Col className="gutter-row" span={data.colSpan}>
      <Card
        className="content-card check-box-card"
        type="inner"
        title={
          <Fragment>
            {data.title} <Checkbox />
          </Fragment>
        }
      >
        <Row gutter={16}>
          {data.input &&
            data.input.length > 0 &&
            data.input.map((dataInput, indexDataInput) => {
              return (
                <RenderInput
                  indexInput={indexDataInput}
                  key={indexDataInput}
                  dataInput={dataInput}
                />
              );
            })}
        </Row>
      </Card>
    </Col>
  );
});

const RenderInput = memo(({ dataInput }) => {
  const handleOnKeyUp = useCallback(
    (e) => {
      if (dataInput.isCapital) {
        if (e.target.value) {
          e.persist();
          setTimeout(() => {
            e.target.value = e.target.value.toUpperCase();
            dataInput.onChange(e);
          }, 700);
        }
      }
    },
    [dataInput]
  );

  return (
    <Col className="gutter-row" span={dataInput.colSpan || 24}>
      <Form.Item noStyle>
        <Form.Item
          label={dataInput.label}
          name={dataInput.name}
          rules={[{ required: dataInput.required }]}
        >
          <Fragment>
            {(dataInput.type === 'text' || dataInput.type === 'number') && (
              <Input
                type={dataInput.type}
                name={dataInput.name}
                value={dataInput.value}
                onChange={dataInput.onChange}
                placeholder={dataInput.placeholder}
                style={{
                  borderRadius: 4,
                  border: dataInput.validation ? '1px solid #FF0000' : '',
                }}
                disabled={dataInput.disabled ? dataInput.disabled : false}
                onKeyUp={handleOnKeyUp}
              />
            )}

            {dataInput.type === 'date' && (
              <DatePicker
                style={{ width: '100%' }}
                value={
                  dataInput.value ? moment(dataInput.value, 'YYYY-MM-DD') : ''
                }
                onChange={(date, dateString) => dataInput.onChange(dateString)}
              />
            )}

            {dataInput.type === 'checkbox' && (
              <Row>
                {dataInput.data &&
                  dataInput.data.length &&
                  dataInput.data.map((checkbox, indexCheckBox) => {
                    return (
                      <Col
                        key={indexCheckBox}
                        style={{
                          textAlign: 'left',
                          marginBottom: '10px',
                        }}
                        span={12}
                      >
                        <Checkbox
                          value={checkbox.value}
                          onChange={dataInput.onChange}
                          disabled={dataInput.disabled}
                          checked={dataInput.value.includes(checkbox.value)}
                        >
                          {checkbox.label}
                        </Checkbox>
                      </Col>
                    );
                  })}
              </Row>
            )}

            {dataInput.type === 'select' && (
              <Select
                value={dataInput.value}
                onChange={dataInput.onChange}
                style={{
                  textAlign: 'left',
                  borderRadius: 4,
                  border: dataInput.validation ? '1px solid #FF0000' : '',
                }}
                allowClear
                disabled={dataInput.disabled ? dataInput.disabled : false}
              >
                {dataInput.placeholder && (
                  <Option value="">{dataInput.placeholder}</Option>
                )}

                {dataInput.option &&
                  dataInput.option.length > 0 &&
                  dataInput.option.map((opt, indexOpt) => {
                    return (
                      <Option key={indexOpt} value={opt.value}>
                        {opt.value} - {opt.label}
                      </Option>
                    );
                  })}
              </Select>
            )}

            {dataInput.type === 'textarea' && (
              <TextArea
                name={dataInput.name}
                value={dataInput.value}
                onChange={dataInput.onChange}
                rows={4}
              />
            )}

            {dataInput.type === 'autocomplete' && (
              <RenderAutoComplete
                value={dataInput.value}
                option={dataInput.option}
                onChange={dataInput.onChange}
                placeholder={dataInput.placeholder}
                isLabelValue={dataInput.isLabelValue}
              />
            )}

            {dataInput.type === 'alert' && (
              <Alert
                style={{
                  textAlign: 'left',
                  borderRadius: 4,
                }}
                message={dataInput.message}
                type={dataInput.alertType}
                // showIcon
              />
            )}

            {dataInput.isLoading && <Spin />}

            {dataInput.validation && (
              <p
                style={{
                  margin: 0,
                  marginTop: 5,
                  textAlign: 'left',
                  color: '#FF0000',
                }}
              >
                {dataInput.validation}
              </p>
            )}
          </Fragment>
        </Form.Item>
      </Form.Item>
    </Col>
  );
});

const RenderAutoComplete = memo(
  ({ value, option, onChange, placeholder, isLabelValue }) => {
    const useRefWrapperDropdown = useRef();
    // const cache = useRef(
    //   new CellMeasurerCache({
    //     fixedWidth: true,
    //     defaultHeight: 100,
    //   })
    // );
    const [showDropdown, setShowDropdown] = useState(false);
    const [search, setSearch] = useState('');
    const [labelAutocomplete, setLabelAutocomplete] = useState('');
    const [filterData, setFilterData] = useState([]);
    // R&D
    const [startLimit, setStartLimit] = useState(0);
    const [endLimit, setEndLimit] = useState(0);

    useEffect(() => {
      if (useRefWrapperDropdown.current) {
        const handleScroll = (e) => {
          if (
            useRefWrapperDropdown.current.scrollTop +
              useRefWrapperDropdown.current.clientHeight >=
            useRefWrapperDropdown.current.scrollHeight - 20
          ) {
            handleLoadMore();
          }
        };

        const ulElement = useRefWrapperDropdown.current;
        ulElement.addEventListener('scroll', handleScroll);

        return () => {
          ulElement.removeEventListener('scroll', handleScroll);
        };
      }
    });

    useEffect(() => {
      if (option && option.length > 0) {
        // Logic for displaying current todos
        const startlimits = 0;
        const endlimits = 50;
        // const indexOfLastData = currenthash * limits;
        // const indexOfFirstData = indexOfLastData - limits;
        const currentData = option.slice(startlimits, endlimits);
        setFilterData(currentData);
        setStartLimit(50);
        setEndLimit(100);
        // const pageNumbers = [];
        // for (let i = 1; i <= Math.ceil(option.length / limit); i++) {
        //   pageNumbers.push(i);
        // }
        // console.log('pageNumbers', pageNumbers);
      }
    }, [option]);

    useEffect(() => {
      if (value) {
        const findData = option.find((d) => d.value === value);
        if (isLabelValue) {
          setLabelAutocomplete(`${findData.value} - ${findData.label}`);
        } else {
          setLabelAutocomplete(findData.label);
        }
      }
    }, [option, isLabelValue, value]);

    const handleShowUpDropdown = useCallback(() => {
      if (showDropdown) {
        setShowDropdown(false);
        setSearch('');
      } else {
        setShowDropdown(true);
      }
    }, [showDropdown]);

    const handleChangeSearch = useCallback((e) => {
      const { value } = e.target;
      setSearch(value);

      // const resultFilter =
      //   option &&
      //   option.filter((item) => {
      //     const lowerCase = value.toLowerCase();
      //     return Object.keys(item.label).some((key) =>
      //       item.label.toLowerCase().includes(lowerCase)
      //     );
      //   });
      // setFilterData(resultFilter);
      // option
    }, []);

    const handleSelectValueAutoComplete = useCallback(
      (value, label) => {
        onChange(value);
        // if (isLabelValue) {
        //   setLabelAutocomplete(`${value} - ${label}`);
        // } else {
        //   setLabelAutocomplete(label);
        // }
        setShowDropdown(false);
      },
      [onChange]
    );

    const handleLoadMore = useCallback(() => {
      if (filterData.length !== option.length) {
        const currentData = option.slice(startLimit, endLimit);
        setStartLimit(startLimit + 50);
        setEndLimit(endLimit + 50);
        setFilterData([...filterData, ...currentData]);
      }
    }, [startLimit, endLimit, option, filterData]);

    return (
      <Fragment>
        <div className="wrapper-autocomplete" onClick={handleShowUpDropdown}>
          <div>{labelAutocomplete ? labelAutocomplete : placeholder}</div>
          <div>{showDropdown ? <UpOutlined /> : <DownOutlined />}</div>
        </div>

        {showDropdown && (
          <div className="dropdown-wrapper">
            <div className="area-dropdown">
              <input
                value={search}
                placeholder="Search..."
                onChange={handleChangeSearch}
              />

              <ul
                ref={useRefWrapperDropdown}
                style={{ maxHeight: 160, overflow: 'auto' }}
              >
                {filterData.length > 0 &&
                  filterData.map((d, i) => {
                    return (
                      <li
                        key={i}
                        onMouseDown={() =>
                          handleSelectValueAutoComplete(d.value, d.label)
                        }
                      >
                        {d.value} - {d.label}
                      </li>
                    );
                  })}
              </ul>

              {/* <div style={{ height: '160px' }}>
              <AutoSizer>
                {({ width, height }) => (
                  <List
                    width={width}
                    height={height}
                    rowHeight={cache.current.rowHeight}
                    deferredMeasurementCache={cache.current}
                    rowCount={filterData.length}
                    rowRenderer={({ key, index, style, parent }) => {
                      const filterdata = filterData[index];
                      return (
                        <CellMeasurer
                          key={key}
                          cache={cache.current}
                          parent={parent}
                          columnIndex={0}
                          rowIndex={index}
                        >
                          <li
                            onMouseDown={() =>
                              handleSelectValueAutoComplete(
                                filterdata.value,
                                filterdata.label
                              )
                            }
                            style={style}
                          >
                            {filterdata.label}
                          </li>
                        </CellMeasurer>
                      );
                    }}
                  />
                )}
              </AutoSizer>
            </div> */}
            </div>
          </div>
        )}
      </Fragment>
    );
  }
);

const MultipleForm = ({ input }) => {
  return (
    <Row gutter={16}>
      {input.map((inputs, indexInputs) => {
        return <RenderWrapperForm key={indexInputs} inputs={inputs} />;
      })}
    </Row>
  );
};

export default memo(MultipleForm);
