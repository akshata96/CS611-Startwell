import React, { Component } from 'react';
import { Button, Table } from 'antd';
import axios from 'axios';

export default class UserList extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: []
    };
  }

  displayUserData = () => {
    this.setState({
      addBucketClicked: false
    });
    axios
      .get('http://localhost:9000/displayAllUsers')
      .then(response => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            userInfo: response.data
          });
          console.log('Survey Bucket', response);
        } else {
          let surveyError = 'Error while fetching user details';
          this.setState({ surveyError });
          console.log('Error while fetching user details', response);
        }
      })
      .catch(error => {
        console.log('error occured', error);
      });
  };

  render() {
    const userDataInfo = this.state.userInfo;
    const userInfohasData = userDataInfo.length;
    const userColumnInfo = [
      {
        title: 'User ID',
        dataIndex: 'UserID'
      },
      {
        title: 'First Name',
        dataIndex: 'First_Name'
      },
      {
        title: 'Last Name',
        dataIndex: 'Last_Name'
      },
      {
        title: 'Type',
        dataIndex: 'UserType'
      }
    ];

    return (
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <div id='header' style={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between' }}>
          <div style={{ marginLeft: '40px', marginTop: '20px' }}>
            <Button type='primary' shape='round' onClick={this.displayUserData}>
              Display User Data
            </Button>
          </div>
        </div>
        <div id='body'>
          {userDataInfo && userInfohasData ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Table
                style={{ width: '1000px', marginTop: '20px' }}
                dataSource={userDataInfo}
                columns={userColumnInfo}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
