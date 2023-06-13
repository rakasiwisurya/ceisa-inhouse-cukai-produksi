import React, {useState} from "react";
import SampleRoutingMenu from "../components/SampleRoutingMenu";
import Container from "../components/Container";
import {Button, Spin} from 'antd'
import HttpRequest from "../utils/HttpRequest";

const REACT_APP_REFERENSI = '/Referensi'


const Test = (props) => {
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        setLoading(true)
        try {
            const {data} = await HttpRequest.get({
                url: REACT_APP_REFERENSI + '/v1/alasan-pkb'
            })
            setLoading(false)
            setListData(data.data)
        } catch (e) {
            setListData(e?.response?.data || {message: 'Tiba tiba error'})
            setLoading(false)
            console.error('error.fetchData', e)
        }
    }

    const fetchDataWithConfig = async () => {
        setLoading(true)
        try {
            const {data} = await HttpRequest.get({
                url: REACT_APP_REFERENSI + '/v1/alasan-pkb',
                config: {
                    headers: {
                        'nama-key': 'value'
                    }
                }
            })
            setLoading(false)
            setListData(data.data)
        } catch (e) {
            setListData(e?.response?.data || {message: 'Tiba tiba error'})
            setLoading(false)
            console.error('error.fetchData', e)
        }
    }

    const fetchDataPost = async () => {
        setLoading(true)
        try {
            const {data} = await HttpRequest.post({
                url: REACT_APP_REFERENSI + '/v1/alasan-pkb',
                data: {
                    username: 'username',
                    password: 'password'
                }
            })
            setLoading(false)
            setListData(data.data)
        } catch (e) {
            setListData(e?.response?.data || {message: 'Tiba tiba error'})
            setLoading(false)
            console.error('error.fetchData', e)
        }
    }
    return (
        <Container contentName={'Test Menu'} menuName={props.menuName} >
            <SampleRoutingMenu pathName={props.pathName} />
            <h4>Referensi API</h4>
            <Button onClick={() => fetchData()}>fetchData</Button>
            <Button onClick={() => fetchDataWithConfig()}>fetchDataWithConfig</Button>
            <Button onClick={() => fetchDataPost()}>fetchDataPost</Button>
            <br/>
            <h4>Result</h4>
            <Spin spinning={loading}>
                <pre>
              {JSON.stringify(listData, null, 3)}
            </pre>
            </Spin>
        </Container>
    )
}

export default Test
