import React, { useState, useEffect, memo, useRef } from "react";
import Table from "antd/lib/table";
import Icon from "antd/lib/icon";
import Tooltip from "antd/lib/tooltip";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import DatePicker from "antd/lib/date-picker";
import { isEmpty, compact, isArray } from "lodash";
import "./custom.css";

const { Column } = Table;

function TableCustom({
  onClick = () => {},
  onPage = () => {},
  onSearch = () => {},
  onReload = () => {},
  rowClassName = () => null,
  total = 0,
  data = [],
  coloumn = [],
  button = [],
  onMultiSelect = () => {},
  multi = false,
  pagination = true,
  number = true,
  filter = true,
  loading = false,
  error = false,
}) {
  const search = useRef({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState(data);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dataSearch, setDataSearch] = useState([]);

  useEffect(setData, [data]);

  function setData() {
    if (isArray(data)) {
      SetDataSource(data);
      SetDataSearch(data.slice(0, pageSize), (page - 1) * pageSize);
    } else {
      SetDataSource([]);
      SetDataSearch([]);
    }
  }

  function SetDataSource(dt) {
    const temp = giveNumber(dt, 0);
    setDataSource(temp);
  }

  function SetDataSearch(dt, pg) {
    const temp = giveNumber(dt, pg);
    setDataSearch(temp);
  }

  const onSelectChange = (selectedRowKeys) => {
    const temp = selectedRowKeys.map((e) => {
      return page * pageSize + Number(e);
    });
    setSelectedRowKeys(temp);
    onMultiSelect(temp);
  };

  function onSelectAll(params) {
    if (params) {
      setSelectedRowKeys([]);
      onMultiSelect([]);
    } else {
      setSelectedRowKeys([]);
      onMultiSelect([], []);
    }
  }

  const pageChange = (e) => {
    setSelectedRowKeys([]);
    onPage({ ...search.current, size: pageSize, page: e });
    const pg = (e - 1) * pageSize;

    setPage(e);
    SetDataSearch(dataSource.slice(pg, pg + 10), pg);
  };

  const rowSelection = multi
    ? {
        selectedRowKeys,
        onChange: onSelectChange,
        onSelectAll: (e) => onSelectAll(e),
      }
    : null;

  function giveNumber(dt = [], pg = 0) {
    const temp = dt.map((e, i) => ({ ...e, no: pg + i + 1, key: pg + i + 1 }));
    return temp;
  }
  const onShowSizeChange = (current, pageSize) => {
    if (pagination) {
      onPage({ ...search.current, size: pageSize, page: 0 });
      setPage(1);
      setPageSize(pageSize);
    } else {
      setPageSize(pageSize);
    }
  };

  const findSearch = (item, key) => {
    const temp = Object.keys(key);
    const res = compact(
      temp.map((index) => {
        if (key[index]) {
          const flag = String(item[index]).indexOf(key[index]);
          if (flag === -1) {
            return "true";
          }
        }
        return false;
      })
    );
    return isEmpty(res);
  };

  const searchHandler = () => {
    onSearch({ ...search.current, size: pageSize, page });
    const temp = compact(dataSource.filter((e) => findSearch(e, search.current)));
    if (isEmpty(temp)) {
      SetDataSearch(dataSource.slice(0, page * pageSize), 0);
    } else {
      SetDataSearch(temp, 0);
    }
  };

  const inputSearchChange = (e, index) => {
    const temp = { ...search.current, [index]: e };
    search.current = temp;
  };

  const searchChange = (index, type) => {
    return (
      <div style={{ display: "inline-block", height: 25 }}>
        {type === "date" ? (
          <DatePicker
            suffixIcon={<Icon type="search" style={{ color: "#F5FAFA" }} />}
            format="DD-MM-YYYY"
            key={`in${index}`}
            style={{ border: "none", width: "100%" }}
            onChange={(a) => inputSearchChange(a, index)}
            disabled={loading}
            placeholder=""
            // onChange={() => searchHandler()}
          />
        ) : (
          <Input
            suffix={<Icon type="search" style={{ color: "#F5FAFA" }} />}
            key={`in${index}`}
            type="text"
            style={{ border: "none", width: "100%" }}
            onChange={(a) => inputSearchChange(a.target.value, index)}
            disabled={loading}
            onPressEnter={() => searchHandler()}
          />
        )}
      </div>
    );
  };

  return (
    <Table
      style={{ width: "100%", boxShadow: error ? "0px 0px 1px 1px red" : "", border: "1px solid rgba(0, 0, 0, 0.075)" }}
      onRow={(record) => {
        return {
          onDoubleClick: () => onClick(record),
        };
      }}
      scroll={{ x: true }}
      rowKey="key"
      dataSource={pagination ? dataSearch : data}
      rowSelection={rowSelection}
      rowClassName={(item) => rowClassName(item)}
      pagination={
        pagination
          ? {
              pageSize,
              onChange: (e) => pageChange(e),
              showSizeChanger: true,
              onShowSizeChange,
              total: total || data.length,
              showTotal: (e) => `Total ${total || e}`,
            }
          : {
              pageSize,
              showSizeChanger: true,
              onShowSizeChange,
              total: total || data.length,
              showTotal: (e) => `Total ${total || e}`,
            }
      }
      footer={
        error
          ? () => (
              <Button icon="reload" type="danger" style={{ width: "100%" }} onClick={() => onReload(search.current)}>
                Muat Ulang
              </Button>
            )
          : null
      }
      loading={loading}
    >
      {number ? <Column title="Nomor" dataIndex="no" fixed="left" width="50" /> : null}
      {coloumn.map((e, i) => {
        function renderRow(a) {
          if (typeof e.render === "function") {
            return e.render(a);
          }
          return a;
        }
        return (
          <Column
            style={{ height: 50 }}
            dataIndex={e.data}
            title={e.title}
            key={`cl${i}`}
            render={(q) => renderRow(q)}
            editable={e.edit}
            children={
              filter
                ? [
                    {
                      title: () => searchChange(e.data || e.key, e.type),
                      dataIndex: e.data,
                      render: (q) => renderRow(q),
                      width: e.width,
                    },
                  ]
                : null
            }
          />
        );
      })}
      {button ? (
        <Column
          title=""
          key="action"
          width={button.length * 40}
          fixed="right"
          render={(e) =>
            button.map((a, i) => {
              function renderRow() {
                if (typeof a.render === "function") {
                  return true;
                }
                return false;
              }
              function disibled() {
                if (typeof a.disibled === "function") {
                  return a.disibled(e);
                }
                return false;
              }
              return disibled() ? null : renderRow() ? (
                <Tooltip title={a.title} key={`tt${i}`}>
                  {a.render(e)}
                </Tooltip>
              ) : (
                <Tooltip title={a.title} key={`tt${i}`}>
                  <Icon type={a.icon} onClick={() => a.onClick(e)} style={{ color: "#1890FF", marginRight: 10, size: 20 }} key={`it${i}`} />
                </Tooltip>
              );
            })
          }
        />
      ) : null}
    </Table>
  );
}

export default memo(TableCustom);
