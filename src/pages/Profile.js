import Container from "components/Container";
import React, {useEffect, useState} from "react";
import {getUser} from "utils/DataUser";
import SampleRoutingMenu from "components/SampleRoutingMenu";
import HttpRequest from "utils/HttpRequest";
const REACT_APP_REFERENSI = '/Referensi'
const Profile = props => {
  useEffect(() => {
    fetchData()
  }, []);

  const [listData, setListData] = useState([]);

  const fetchData = async () => {
    try {
      const {data} = await HttpRequest.get({
        url: REACT_APP_REFERENSI + '/v1/alasan-pkb'
      })
      setListData(data.data)
    } catch (e) {
      console.error('error.fetchData', e)
    }
  }

  const fetchDataWithConfig = async () => {
    const {data} = await HttpRequest.get({
      url: REACT_APP_REFERENSI + '/v1/alasan-pkb',
      config: {
        headers: {
          'nama-key': 'value'
        }
      }
    })
    setListData(data.data)
  }

  const fetchDataPost = async () => {
    const {data} = await HttpRequest.post({
      url: REACT_APP_REFERENSI + '/v1/alasan-pkb',
      data: {
        username: 'username',
        password: 'password'
      }
    })
    setListData(data.data)
  }
  return (
    <Container menuName={props.menuName}>
      <SampleRoutingMenu pathName={props.pathName} />
      <h4>User Data from props</h4>
      <pre>
      {JSON.stringify(props.dataUser, null, 3)}
    </pre>
      <h4>User Data from <code>DataUser.js</code></h4>
      <pre>
      {JSON.stringify(getUser(), null, 3)}
    </pre>
    <code>Fetch Data Get</code>
    <pre>
      {JSON.stringify(listData, null, 3)}
    </pre>
    </Container>
  )
};

export default Profile
