import React, { Component } from 'react';
import { Button, Table } from 'antd';
import axios from 'axios';
import BucketType from '../BucketType/BucketType';

export default class UserServey extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: []
    };
  }

  addBucket = () => {
    this.setState({
      addBucketClicked: true,
      bucketInfo: []
    });
  };
  displayUserBucket = () => {
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
          let surveyError = 'Error while processing survey bucket';
          this.setState({ surveyError });
          console.log('Survey buxcket API failed', response);
        }
      })
      .catch(error => {
        console.log('error occured', error);
      });
  };

  render() {
    const buckeyDataInfo = this.state.bucketInfo;
    const bucketInfohasData = buckeyDataInfo.length;
    const bucketColumnInfo = [
      {
        title: '#',
        dataIndex: 'SNo'
      },
      {
        title: 'Bucket Type',
        dataIndex: 'BucketType'
      },
      {
        title: 'Bucket Description',
        dataIndex: 'BucketDesc'
      },
      {
        title: 'Status',
        dataIndex: 'status'.toString()
      }
    ];
    const addBucketClicked = this.state.addBucketClicked;

    return (
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <div id='header' style={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between' }}>
          <div style={{ marginLeft: '40px', marginTop: '20px' }}>
            <Button type='primary' shape='round' onClick={this.displayUserBucket}>
              Display User Bucket
            </Button>
          </div>
          <div>
            <Button
              type='primary'
              shape='round'
              style={{ marginRight: '40px', marginTop: '20px' }}
              onClick={this.addBucket}
            >
              Add Bucket
            </Button>
          </div>
        </div>
        <div id='body'>
          {buckeyDataInfo && bucketInfohasData ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Table
                style={{ width: '1000px', marginTop: '50px' }}
                dataSource={buckeyDataInfo}
                columns={bucketColumnInfo}
              />
            </div>
          ) : addBucketClicked ? (
            <div style={{ width: '75%', marginTop: '150px' }}>
              <BucketType />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
