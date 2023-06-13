import React from "react";
import { Button, Collapse, Icon } from "antd";
import { ArrowLeftOutlined, FullscreenOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const {Panel} = Collapse;

const ControlCollapse = () => (
  <>
  <Button size="small" style={{borderRadius: '100%', width: '20px', height: '20px', marginRight: 3}} type='primary'></Button>
  <Button size="small" style={{borderRadius: '100%', width: '20px', height: '20px', backgroundColor: '#ffc241', borderColor: '#ffc241', marginRight: 3}}></Button>
  <Button size="small" style={{borderRadius: '100%', width: '20px', height: '20px'}} type='danger'></Button>
  </>
)

const CollapsedContainer = ({
  children,
  menuName = "Dashboard",
  contentIcon = <i className="kt-font-brand flaticon2-folder"></i>,
  contentName = "Content Name",
  contentHeaderStyle = {
    borderBottom: "1px solid #EBEBEB",
    padding: "16px",
    margin: "0px 0px 0px 0px",
  },
  subContentName = "",
  subContentRight = () => {},
  hideContentHeader = false,
  subHeaderLoading = false,
  headers = [],
  buttons = [],
}) => (
  <div>
    {subHeaderLoading ? (
      <div className="kt-subheader   kt-grid__item" id="kt_subheader">
        <div className="kt-subheader__main">
          <h3 className="kt-subheader__title">{"Mohon Tunggu ..."}</h3>
        </div>
      </div>
    ) : (
      <div
        className="kt-subheader   kt-grid__item overider_kt_subheader"
        id="kt_subheader"
        style={{ zIndex: 10 }}
      >
        <div className="kt-subheader__main">
          <h3 className="kt-subheader__title">{menuName}</h3>
          <span className="kt-subheader__separator kt-subheader__separator--v"></span>
          <span className="kt-subheader__desc"></span>
          {headers
            .filter((item) => item.position === "left")
            .map((item, index) => (
              <span key={index}>{item.content}</span>
            ))}
          <div className="kt-input-icon kt-input-icon--right kt-subheader__search kt-hidden">
            <input
              type="text"
              className="form-control"
              placeholder="Search order..."
              id="generalSearch"
            />
            <span className="kt-input-icon__icon kt-input-icon__icon--right">
              <span>
                <i className="flaticon2-search-1"></i>
              </span>
            </span>
          </div>
        </div>
        <div className="kt-subheader__toolbar">
          <div className="kt-subheader__wrapper">
            {buttons
              .filter((item) => item.position === "right")
              .map((item, index) => (
                item.mark === "back" ?
                <Button
                key={index}
                type={item.buttonType}
                onClick={item.onClick}
                className={`${item.className} ${item.active && "active"}`}
                style={item.buttonStyle || {
                  backgroundColor: '#414141',
                  borderColor: '#414141'
                }}
                size={'small'}
              >
                <ArrowLeftOutlined />
                <i className={`mr-1 ${item.iconClassName}`}></i>
                {item.label}
              </Button>
                :
                  <Button
                    key={index}
                    type={item.buttonType}
                    onClick={item.onClick}
                    className={`${item.className} ${item.active && "active"}`}
                    style={item.buttonStyle || {}}
                    size={'small'}
                  >
                    {item.icon}
                    {item.iconPosition === "left" && item.iconClassName && (
                      <i className={`mr-1 ${item.iconClassName}`}></i>
                    )}
                    {item.label}
                    {item.iconPosition === "right" && item.iconClassName && (
                      <i className={`ml-1 ${item.iconClassName}`}></i>
                    )}
                  </Button>
              ))}
          </div>
        </div>
      </div>
    )}

    <div className="kt-portlet kt-portlet--mobile">
      <Collapse defaultActiveKey={['1']} expandIcon={() => contentIcon}>
        <Panel header={<span className="ml-2 my-auto" style={{fontSize: 'large', fontWeight: 500}}>{contentName}</span>} key="1" extra={<ControlCollapse/>}>
          {children}
        </Panel>
      </Collapse>
    </div>
  </div>
);

export default CollapsedContainer;
