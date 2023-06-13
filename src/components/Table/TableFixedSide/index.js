import React, { useState, useEffect, Fragment } from 'react';
import { Table, Button, Card } from 'antd';
import './TableFixedSide.css';

const TableFixedColumns = (props) => {
  const [columnsTable, setColumnTable] = useState([]);
  const [dataTable, setDataTable] = useState([]);

  const replaceSpaceLowerCase = (str) => {
    return str.replace(/\s/g, '').toLowerCase();
  };

  useEffect(() => {
    const { columns, data } = props;

    if (columns) {
      if (columns.length > 0) {
        const columnsArr = [];
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].type === 'text') {
            columnsArr.push({
              align: 'center',
              title: columns[i].name,
              dataIndex: replaceSpaceLowerCase(columns[i].name),
              key: replaceSpaceLowerCase(columns[i].name),
            });
          } else if (columns[i].type === 'action') {
            columnsArr.push({
              align: 'center',
              title: columns[i].name,
              dataIndex: replaceSpaceLowerCase(columns[i].name),
              key: replaceSpaceLowerCase(columns[i].name),
              width: 300,
              fixed: 'right',
              render: () => (
                <Fragment>
                  {columns[i].action.map((action, i) => {
                    return (
                      <Button
                        key={i}
                        type={action.type}
                        onClick={action.onClick}
                      >
                        {action.text}
                      </Button>
                    );
                  })}
                </Fragment>
              ),
            });
          }
        }
        setColumnTable(columnsArr);
      }
    }

    if (data) {
      if (data.length > 0) {
        setDataTable(data);
      }
    }
  }, [props]);

  return (
    <Card style={{ borderRadius: '10px' }}>
      <Table
        columns={columnsTable}
        dataSource={dataTable}
        scroll={{ x: 1300 }}
        bordered
      />
    </Card>
  );
};

export default TableFixedColumns;
