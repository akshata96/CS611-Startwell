import React, { Component } from 'react';
import { Table, Empty, Button } from 'antd';
import axios from 'axios';
import UserCategory from './UserCategory';

export default class UserBucketInfo extends Component {
  constructor() {
    super();
    this.state = {
      isUserBucketDataFetched: false,
      userBucketInfo: [],
      shouldShowCategoryView: false,
      bucketTypeSelected: ''
    };
  }

  componentDidMount() {
    this.displayUserBucket();
    this.setState({
      isUserBucketDataFetched: true,
      shouldShowCategoryView: false
    });
  }

  componentDidUpdate() {
    if (!this.state.isUserBucketDataFetched && !this.state.userBucketInfo.length) {
      this.displayUserBucket();
      this.setState({
        isUserBucketDataFetched: true,
        shouldShowCategoryView: false
      });
    }
  }

  displayUserBucket = () => {
    this.setState({
      isUserBucketDataFetched: false,
      userBucketInfo: []
    });
    axios
      .get('http://localhost:9000/displayUserbucket')
      .then(response => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            userBucketInfo: response.data,
            isUserBucketDataFetched: true,
            shouldShowCategoryView: false
          });
          console.log('User Survey Bucket', response);
        } else {
          let surveyError = 'Error while processing user survey bucket';
          this.setState({ surveyError });
          console.log('User Survey bucket API failed', response);
        }
      })
      .catch(error => {
        console.log('error occured', error);
      });
  };

  setCategoryView = values => {
    this.setState({
      shouldShowCategoryView: true,
      isUserBucketDataFetched: false,
      bucketTypeSelected: values.BucketType
    });
  };

  render() {
    const userBucketInfoColumn = [
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
      }
    ];

    const userBucketInfoRawData = this.state.userBucketInfo;
    const userBucketDataAvailable = userBucketInfoRawData.length;
    const shouldShowCategory = this.state.shouldShowCategoryView;
    return (
      <div style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button type='primary' shape='round' onClick={this.displayUserBucket}>
            Display User Bucket
          </Button>
        </div>

        {shouldShowCategory ? (
          <div>
            <UserCategory bucketType={this.state.bucketTypeSelected} />
          </div>
        ) : (
          <div>
            {!userBucketDataAvailable ? (
              <Empty />
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', fontWeight: 'bold' }}>
                  User Survey Bucket
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Table
                    style={{ width: '70%', height: '80%' }}
                    dataSource={userBucketInfoRawData}
                    columns={userBucketInfoColumn}
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: event => {
                          this.setCategoryView(record);
                        }
                      };
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
