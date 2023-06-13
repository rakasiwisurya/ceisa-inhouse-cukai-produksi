//Home component
import {useDispatch, useSelector} from "react-redux";
import Container from "components/Container";
import SampleRoutingMenu from "components/SampleRoutingMenu";
import {DecrementalAction, IncrementalAction} from "appRedux/action/IncrementalAction";
import React, {useEffect, useState} from "react";
import HttpRequest from "utils/HttpRequest";
import {Tabs, Radio, Modal, notification, Tag} from "antd";
const {REACT_APP_LHP } = process.env
const Home = props => {
  const [modeTab, setModeTab] = useState('top');
  const incrementalData = useSelector(state => state.incrementalData)
  const dispatch = useDispatch()
  const doClick1 = () => {
    alert('doClick1')
  }

  const doClick2 = () => {
    alert('doClick2')
  }

  const doClick3 = () => {
    alert('doClick3')
  }

  const test = async () => {
    try {
      const {data, status} = await HttpRequest.post({url: REACT_APP_LHP + '/v1/src', data: {
        nama: 'dimas'
        }, config: {
        headers: {
          'application': 'text',
        }
        }})
      alert('sukses')
    } catch (e) {
      alert(e.message)
    }
  }

  useEffect(() => {
  }, []);

  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  const openModalWithIcon = type => {
    Modal[type]({
      content: 'some messages...some messages...',
    });
  };

  const handleModeChange = e => {
    const mode = e.target.value;
    setModeTab(mode)
  };

  return (
    <Container menuName={props.menuName} onClick1={()=>doClick1()} onClick2={()=>doClick2()} onClick3={()=>doClick3()} >
      <SampleRoutingMenu pathName={props.pathName} />
      Redux incrementalData: {incrementalData} <button onClick={()=>dispatch(IncrementalAction())}>+</button><button onClick={()=>dispatch(DecrementalAction())}>-</button> <br/>
      <div>Test</div>
      <div>
        <h5>Notification Antd</h5>
        <button onClick={() => openNotificationWithIcon('success')}>Success</button>
        <button onClick={() => openNotificationWithIcon('info')}>Info</button>
        <button onClick={() => openNotificationWithIcon('warning')}>Warning</button>
        <button onClick={() => openNotificationWithIcon('error')}>Error</button>
      </div>
      <div>
        <h5>Modal Antd</h5>
        <button onClick={() => openModalWithIcon('success')}>Success</button>
        <button onClick={() => openModalWithIcon('info')}>Info</button>
        <button onClick={() => openModalWithIcon('warning')}>Warning</button>
        <button onClick={() => openModalWithIcon('error')}>Error</button>
      </div>
      <div>
        <h5>Tag Antd</h5>
        <div>
          <span style={{ marginBottom: 16 }}>Presets:</span>
          <div>
            <Tag color="magenta">magenta</Tag>
            <Tag color="red">red</Tag>
            <Tag color="volcano">volcano</Tag>
            <Tag color="orange">orange</Tag>
            <Tag color="gold">gold</Tag>
            <Tag color="lime">lime</Tag>
            <Tag color="green">green</Tag>
            <Tag color="cyan">cyan</Tag>
            <Tag color="blue">blue</Tag>
            <Tag color="geekblue">geekblue</Tag>
            <Tag color="purple">purple</Tag>
          </div>
          <span style={{ margin: '16px 0' }}>Custom:</span>
          <div>
            <Tag color="#f50">#f50</Tag>
            <Tag color="#2db7f5">#2db7f5</Tag>
            <Tag color="#87d068">#87d068</Tag>
            <Tag color="#108ee9">#108ee9</Tag>
          </div>
        </div>
      </div>
      <div>
        <h5>Tabs Antd</h5>
        <Radio.Group onChange={handleModeChange} value={modeTab} style={{ marginBottom: 8 }}>
          <Radio.Button value="top">Horizontal</Radio.Button>
          <Radio.Button value="left">Vertical</Radio.Button>
        </Radio.Group>
        <Tabs defaultActiveKey="1" tabPosition={modeTab} style={{ height: 220 }}>
          {[...Array(20).keys()].map(i => (
            <Tabs.TabPane tab={`Tab-${i}`} key={i}>
              Content of tab {i}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </Container>
  )
};

export default Home
