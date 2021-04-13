import React, { Component } from 'react';
import { Empty, Table } from 'antd';
import axios from 'axios';

export default class ContactUsList extends Component {
  constructor() {
    super();
    this.state = {
      dataInfo: [],
      callMade: false
    };
  }

  componentDidMount() {
    this.displayContactUsData();
  }

  componentDidUpdate() {
    if (this.state.userInfo?.length === 0 && this.state.userInfo.callMade === false) {
      this.displayContactUsData();
      this.setState({
        callMade: true
      });
    }
  }

  displayContactUsData = () => {
    this.setState({
      addBucketClicked: false
    });
    axios
      .get('http://localhost:9000/DisplayContactUs')
      .then(response => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            dataInfo: response.data
          });
          console.log('Contact Us response', response);
        } else {
          let surveyError = 'Error while fetching conatact us details';
          this.setState({ surveyError });
          console.log('Error while fetching user details', response);
        }
      })
      .catch(error => {
        console.log('error occured', error);
      });
  };

  render() {
    const dataInfo = this.state.dataInfo;
    let dataInfoAvailable = dataInfo.length;
    const dataColumnInfo = [
      {
        title: '#',
        dataIndex: 'SNo'
      },
      {
        title: 'Email Id  ',
        dataIndex: 'email'
      },
      {
        title: 'Subject',
        dataIndex: 'subject'
      },
      {
        title: 'Message',
        dataIndex: 'message'
      }
    ];
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {dataInfoAvailable ? (
            <Table style={{ width: '1000px', marginTop: '20px' }} dataSource={dataInfo} columns={dataColumnInfo} />
          ) : (
            <Empty />
          )}{' '}
        </div>
      </div>
    );
  }
}
