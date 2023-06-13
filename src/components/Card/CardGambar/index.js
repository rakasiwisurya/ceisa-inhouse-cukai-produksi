import React, { Fragment, useState, useCallback, useRef } from 'react';
import {
  Row,
  Col,
  Button,
  Card,
  Icon,
  Typography,
  Upload,
  Modal,
  Spin,
  notification
} from 'antd';
import '../Card.css';
import './CardGambar.css';
const { Text } = Typography;

const Index = ({
  title = '',
  setData = () => {},
  isDisabledButtonUnggah = false,
  isDisabledButtonAktifkan = false,
}) => {
  const {Meta} = Card
  const cameraRef = useRef(null);
  const photoRef = useRef(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [isVideo, setIsVideo] = useState(true);
  const [isCanvas, setIsCanvas] = useState(false);
  const [listPreviewGambar, setListPreviewGambar] = useState([]);
  const [camImage, setcamImage] = useState(null)
  // const [gambarTerlaluBesar, setgambarTerlaluBesar] = useState([])

  const handleChangeUploadFile = useCallback(
    (list) => {
      const dataList = list.fileList[list.fileList.length - 1];
      let reader = new FileReader();
      reader.readAsDataURL(dataList.originFileObj);
      if(dataList.size > 800000){
        const args = {
          message: 'Maksimal Ukuran Foto 10mb',
          description:
            `Foto dengan nama "${dataList.name}" terlalu besar`,
          duration: 5,
        };
        notification.error(args);
        // reader.onloadend = function (e) {
        //   const data = {
        //     uid: dataList.uid,
        //     src: reader.result,
        //     name: dataList.name,
        //     size: dataList.size
        //   };
        //   setgambarTerlaluBesar((oldState) => [...oldState, data]);
        // };
      }else{
        setData((oldState) => [...oldState, dataList.originFileObj]);
        reader.onloadend = function (e) {
          const data = { uid: dataList.uid, src: reader.result };
          setListPreviewGambar((oldState) => [...oldState, data]);
        };
      }
    },
    [setData]
  );

  const handleClickDelete = useCallback(
    (index) => {
      setData((oldState) => {
        const state = [...oldState];
        state.splice(index, 1);
        return state;
      });
      setListPreviewGambar((oldState) => {
        const state = [...oldState];
        state.splice(index, 1);
        return state;
      });
    },
    [setData]
  );

  const handleStartCamera = useCallback((params) => {
    setTimeout(() => {
      if (navigator.mediaDevices.getUserMedia) {
        if (params === 'button') {
          setIsShowModal(true);
        }
        setIsModalLoading(true);
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(function (stream) {
            setIsModalLoading(false);
            let video = cameraRef.current;
            video.srcObject = stream;
            video.play();
          })
          .catch(function (error) {
            setIsShowModal(false)
            setIsModalLoading(false)
            Modal.info({
              title: 'Kamera tidak diijinkan',
              content: (
                <div>
                  <p>Anda tidak mengijinkan aplikasi untuk mengakses kamera</p>
                  <p>Silahkan berikan izin lebih dahulu untuk menggunakan fitur ini.</p>
                </div>
              ),
              onOk() {},
            });
          });
      }
    }, 100);
  }, []);

  const handleStopCamera = useCallback(
    (params) => {
      const video = cameraRef.current;
      const stream = video.srcObject;
      const tracks = stream.getTracks();

      for (let i = 0; i < tracks.length; i++) {
        let track = tracks[i];
        track.stop();
      }

      video.srcObject = null;
      if (params === 'button') {
        setIsShowModal(false);
      } else {
        setIsVideo(false);
      }
    },
    [cameraRef]
  );

  const handleTakeImage = useCallback(() => {
    setTimeout(() => {
      const video = cameraRef.current;
      const photo = photoRef.current;
      const context = photoRef.current.getContext('2d');
      const width = 472;
      const height = 340;
      photo.width = width;
      photo.height = height;
      context.drawImage(video, 0, 0, width, height);
      const data = photo.toDataURL('image/jpeg');
      setcamImage(data)
      photo.setAttribute('src', data);
      handleStopCamera();
    }, 100);
  }, [photoRef, cameraRef, handleStopCamera]);

  const handleKlikAmbilGambar = useCallback(() => {
    setIsCanvas(true);
    handleTakeImage();
  }, [handleTakeImage]);

  const handleUlangiGambar = useCallback(() => {
    setIsVideo(true);
    setIsCanvas(false);
    handleStartCamera();
  }, [handleStartCamera]);

  const base64ToFile = (dataurl, filename) => {

    var arr = dataurl.split(','),
       mime = arr[0].match(/:(.*?);/)[1],
       bstr = atob(arr[1]),
       n = bstr.length,
       u8arr = new Uint8Array(n);

    while (n--) {
       u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {
       type: mime
    });
 }

  const handleTambahGambarCaptured = () => {
    setListPreviewGambar((oldState) => [...oldState, {
      uid: `${Math.floor(100000000 + Math.random() * 900000000)}`,
      src: camImage
    }]);
    const objImage = base64ToFile(camImage, `${Math.floor(100000000 + Math.random() * 900000000)}.jpg`)
    setData((oldState) => [...oldState, objImage]);
    setIsShowModal(false);
    setcamImage(null)
    setIsVideo(true);
    setIsCanvas(false);
  }

  return (
    <Fragment>
      <Card title={title}>
        <Row gutter={16}>
          <Col span={14} style={{ textAlign: 'left' }}>
            <Row gutter={16}>
              <Col span={7} className="gutter-row"  style={{marginRight: "15px"}}>
                {!isDisabledButtonUnggah && (
                  <Upload
                    onChange={(e) => handleChangeUploadFile(e)}
                    multiple={true}
                    showUploadList={false}
                    previewFile={false}
                    customRequest={() => {}}
                    accept=".jpeg,.jpg,.png"
                  >
                    <Button type="primary">
                      <Icon type="upload" />
                      Unggah Foto
                    </Button>
                  </Upload>
                )}
              </Col>
              <Col span={6} className="gutter-row">
                {!isDisabledButtonAktifkan && (
                  <Button
                    type="primary"
                    onClick={() => handleStartCamera('button')}
                  >
                    <Icon type="camera" />
                    Aktifkan Kamera
                  </Button>
                )}
              </Col>
            </Row>
          </Col>

          <Col
            md={24}
            style={{
              textAlign: !listPreviewGambar.length ? 'center' : '',
              marginTop: '20px',
              padding: '43px 0px',
              border: '1px solid #C8C8C8',
              borderRadius: '5px',
            }}
          >
            {!listPreviewGambar.length > 0 ? (
              <Fragment>
                <Col span={24} style={{ marginBottom: '20px' }}>
                  <Icon
                    type="picture"
                    theme="twoTone"
                    style={{ fontSize: '58px' }}
                  />
                </Col>
                <Col span={24}>
                  <Text
                    style={{
                      color: '#1890FF',
                      fontFamily: 'Poppins',
                      fontStyle: 'normal',
                      fontWeight: '600',
                      fontSize: '16px',
                      lineHeight: '21px',
                    }}
                  >
                    File foto LHP tidak ditemukan
                  </Text>
                </Col>
              </Fragment>
            ) : (
              <Col style={{ padding: '0px 20px' }}>
                <Row gutter={[16, 16]}>
                  {listPreviewGambar.map((data, i) => {
                    return (
                      <Col span={6} key={i}>
                        <div className="card-image-area">
                          <img
                            className="image"
                            style={{ borderRadius: '10px' }}
                            src={data.src}
                            alt="img"
                            width="100%"
                            height="300px"
                          />
                          <div className="overlay"></div>
                          <div className="button-close">
                            <Button
                              type="danger"
                              onClick={() => handleClickDelete(i)}
                            >
                              <Icon type="close" />
                            </Button>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            )}
          </Col>
        </Row>
      </Card>

      {isShowModal && (
        <Modal centered visible={isShowModal} closable={false} footer={null}>
          {isModalLoading && (
            <div style={{ textAlign: 'center' }}>
              <Spin size="large" tip="Loading..." />
            </div>
          )}
          {!isModalLoading && (
            <Fragment>
              {isVideo && <video ref={cameraRef} width="100%" height="100%" />}
              {isCanvas && <canvas ref={photoRef} />}
              <Row
                type="flex"
                justify="end"
                style={{ padding: '20px 0px 0px 0px' }}
              >
                {isVideo ? (
                  <Fragment>
                    <Col style={{ marginRight: '10px' }}>
                      <Button
                        type="danger"
                        onClick={() => handleStopCamera('button')}
                      >
                        <Icon type="stop" />
                        Matikan Kamera
                      </Button>
                    </Col>
                    <Col>
                      <Button type="primary" onClick={handleKlikAmbilGambar}>
                        <Icon type="picture" />
                        Ambil Gambar
                      </Button>
                    </Col>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Col style={{ marginRight: '10px' }}>
                      <Button type="warning" onClick={handleUlangiGambar}>
                        Ulangi Gambar
                      </Button>
                    </Col>
                    <Col>
                      <Button type="primary" onClick={() => {
                        handleTambahGambarCaptured()
                      }}>
                        Tambah Gambar
                      </Button>
                    </Col>
                  </Fragment>
                )}
              </Row>
            </Fragment>
          )}
        </Modal>
      )}
      {/* <Modal
      visible={gambarTerlaluBesar.length > 0 ? true : false}
      title="Gambar Terlalu Besar"
      width={['80%']}
      closeIcon={<></>}
      footer={[
        <Button key="back" onClick={() => setgambarTerlaluBesar([])}>
          OK
        </Button>
      ]}
      >
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          {
            gambarTerlaluBesar.map((image, index) => (
              <>
                <div style={{width: '24%', marginTop: '10px'}}>
                  <Card
                  cover={<img alt={index} src={image.src} />}
                  >
                    <Meta title={image.name}/>
                  </Card>
                </div>
              </>
            ))
          }
        </div>
      </Modal> */}
    </Fragment>
  );
};

export default Index;
