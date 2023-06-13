import React, { useState, useCallback, useRef } from "react";
import { Modal, Button } from "antd";
import Webcam from "react-webcam";

const WebCam = ({
  visible = false,
  setImage = () => {},
}) => {
  const [src, setSrc] = useState("");
  const webcamRef = useRef({});
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  const handleCaptureImage = useCallback(() => {
    setSrc(webcamRef.current.getScreenshot());
  }, [webcamRef]);
  return (
    <Modal
      visible={visible}
      title={"WEBCAM"}
      width={1000}
    >
      <div className="row text-center mb-4">
        <div className="col-sm-12">
          <div className="btn-group">
            {src ? (
              <Button type="primary" onClick={() => setSrc("")} block>Ambil Ulang</Button>
            ) : (
              <Button type="primary" onClick={handleCaptureImage} block>Ambil Foto</Button>
            ) }
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          {src ? (
            <img src={src} width="100%" height="auto" alt="Preview" />
          ) : (
            <Webcam
              audio={false}
              height={"auto"}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={"100%"}
              videoConstraints={videoConstraints}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default WebCam;
