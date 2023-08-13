import React, { Fragment, Component } from "react";
import { Table } from "antd";
import axios from "axios";
import Container from "components/Container";
import { IconBars } from "components/IconSVG";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: [
        {
          title: "Number",
          dataIndex: "number",
          key: "number",
          render: (text) => <a>{text}</a>,
        },
        {
          title: "Name",
          dataIndex: "englishName",
          key: "englishName",
          render: (text) => <a>{text}</a>,
        },
        {
          title: "Translation",
          dataIndex: "englishNameTranslation",
          key: "englishNameTranslation",
          render: (text) => <a>{text}</a>,
        },
        {
          title: "Text",
          dataIndex: "name",
          key: "name",
          render: (text) => <a>{text}</a>,
        },
        {
          title: "Type",
          dataIndex: "revelationType",
          key: "revelationType",
          render: (text) => <a>{text}</a>,
        },
      ],
      data: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      var config = {
        method: "get",
        url: "http://api.alquran.cloud/v1/quran/quran-uthmani",
      };

      const response = await axios(config, null, {
        headers: {
          accept: "application/json",
          "Access-Control-Allow-Origin": "**",
          "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
          "Access-Control-Allow-Headers":
            "X-Requested-With, Content-Length, Content-Type, Authorization, Accept",
          "Access-Control-Allow-Credentials": "true",
        },
      });

      if (response.data.code == 200) {
        this.setState({
          data: response.data.data.surahs,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <Fragment>
        <Container
          menuName="Dashboard"
          contentIcon={<IconBars />}
          contentName={this.state.selectedFilter1}
        >
          <h1>Hello World</h1>

          <Table dataSource={this.state.data} columns={this.state.headers} />
        </Container>
      </Fragment>
    );
  }
}
export default Dashboard;
