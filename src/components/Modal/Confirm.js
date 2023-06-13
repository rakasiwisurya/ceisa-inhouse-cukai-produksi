import { InfoCircleTwoTone } from "@ant-design/icons";
import { Button, Col, Modal, Row } from "antd";
import * as React from "react";

export default class ConfirmStatusChange extends React.Component {
  state = {
    open: false,
    callback: null,
  };

  show = (callback) => (event) => {
    event.preventDefault();

    event = {
      ...event,
      target: { ...event.target, value: event.target.value },
    };

    this.setState({
      open: true,
      callback: () => callback(event),
    });
  };

  hide = () => this.setState({ open: false, callback: null });

  confirm = () => {
    this.state.callback();
    this.hide();
  };

  render() {
    return (
      <React.Fragment>
        {this.props.children(this.show)}

        {this.state.open && (
          <Modal
            key={1}
            title={this.props.title}
            centered
            visible={this.state.open}
            footer={[
              <Row>
                <Col style={{ textAlign: "center" }}>
                  <Button
                    type="primary"
                    disabled={this.props.loading}
                    onClick={this.confirm}
                    style={{ width: "100px" }}
                  >
                    OK
                  </Button>
                  <Button
                    type="danger"
                    disabled={this.props.loading}
                    onClick={this.hide}
                    style={{ width: "100px" }}
                  >
                    Batal
                  </Button>
                </Col>
              </Row>,
            ]}
          >
            <p style={{ textAlign: "center" }}>
              <InfoCircleTwoTone
                twoToneColor="#EFF400"
                style={{ fontSize: "45px" }}
              />
            </p>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              {this.props.description}
            </p>
          </Modal>

          // <Modal
          //   title={this.props.title}
          //   centered
          //   visible={this.state.open}
          //   footer={false}
          //   closable={false}
          // >
          //   <Result
          //     status={"warning"}
          //     title={this.props.description}
          //     extra={[
          //       <>
          //         <Button
          //           type="primary"
          //           disabled={this.props.loading}
          //           onClick={this.confirm}
          //         >
          //           <div style={{ marginRight: "10px", marginLeft: "10px" }}>
          //             Oke
          //           </div>
          //         </Button>
          //         <Button
          //           type="danger"
          //           disabled={this.props.loading}
          //           onClick={this.hide}
          //         >
          //           <div style={{ marginRight: "10px", marginLeft: "10px" }}>
          //             Batal
          //           </div>
          //         </Button>
          //       </>,
          //     ]}
          //   ></Result>
          // </Modal>
        )}
      </React.Fragment>
    );
  }
}
