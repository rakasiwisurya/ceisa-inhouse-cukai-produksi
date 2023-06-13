import React from "react";
import { Table, Input, DatePicker } from "antd";
import "./custom.css";

const { Search } = Input;

const TableCustom = ({
  columns = [],
  dataSource = [],
  loading = false,
  bordered = true,
  rowSelection = {},
  rowStriped = true,
  rowKey = "key",
  scroll = { x: true },
  pagination = "bottom",
  search = false,
  onRow = (record) => {
    return {
      onDoubleClick: (e) => console.log,
    };
  },
  handleSearch = () => {},
  header = (<></>),
  footer = (<></>),
}) => {
  const handleChange = (params) => {
    const { key, value } = params;
    handleSearch(key, value);
  };

  if (search) {
    columns = columns.map((col) => {
      if (!col.search) return col;
      return {
        ...col,
        title: (
          <>
            {col.title}
            <div>
              {col.type === "date" && (
                <DatePicker
                  style={{
                    minWidth: '120px',
                    marginTop: '2px',
                  }}
                  onChange={(value) => handleChange({...col,value})}
                />
              )}
              {col.type !== "date" && (
                <Search 
                  style={{
                    minWidth: '120px',
                    marginTop: '2px',
                  }}
                  onSearch={(value) => handleChange({...col,value})}
                />
              )}
            </div>
          </>
        )
      }
    })
  }
  return (
    <div className="wrapper-rounded">
      {header}
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        bordered={bordered}
        rowKey={rowKey}
        onRow={onRow}
        scroll={scroll}
        pagination={pagination}
        className={`${!pagination && 'table-no-footer'} ${rowStriped && 'table-row-striped'}`}
        // style={{borderTop: '0px', borderLeft: '0px', borderRight: '0px'}}
      >
      </Table>
      {footer}
    </div>
  );
};

export default TableCustom;
