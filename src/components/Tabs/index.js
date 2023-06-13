import React, { Fragment } from 'react';
import { Tabs } from 'antd';
import './Tabs.css';

const Index = ({ activeKey, disabled, dataTab, onChange }) => {
  return (
    <Tabs activeKey={activeKey} tabPosition={'top'} onChange={onChange}>
      {dataTab &&
        dataTab.length > 0 &&
        dataTab.map((tab, i) => (
          <Tabs.TabPane
            tab={
              <Fragment>
                {tab.name}{' '}
                {tab.required && <span className="text-danger">*</span>}
              </Fragment>
            }
            key={tab.key}
            disabled={tab.key !== '1' ? disabled : false}
          />
        ))}
    </Tabs>
  );
};

export default Index;
