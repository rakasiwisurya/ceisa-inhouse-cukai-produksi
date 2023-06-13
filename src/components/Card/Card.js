import React, { Fragment } from "react";
import { Col } from "antd";

export const Card = (props) => {
  const { title, buttons, bordered, className, size } = props;
  return (
    <Col span={size || 24}>
      <div className={`ant-card p-0 mb-2 ${bordered && "ant-card-bordered"} ${className}`}>
        <div className="ant-card-head" style={{ background: "#DEF" }}>
          <div className="ant-card-head-wrapper">
            {!buttons && <div className="ant-card-head-title text-center">{title}</div>}
            {buttons && (
              <Fragment>
                <div className="ant-card-head-title">{title}</div>
                <div className="ant-card-extra">
                  {buttons.map((button, buttonIndex) => (
                    <button key={buttonIndex} className={`ml-1 ${button.className}`} onClick={button.onClick}>
                      <i className={button.icon}></i> {button.text}
                    </button>
                  ))}
                </div>
              </Fragment>
            )}
          </div>
        </div>
        {props.children && <div className={`ant-card-body ${props.collapse && "d-none"}`}>{props.children}</div>}
      </div>
    </Col>
  );
};
