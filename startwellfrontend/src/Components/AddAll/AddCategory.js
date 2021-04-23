import React, { Component } from 'react';
import { Button, Input, Form, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;
export default class AddCategory extends Component {
  constructor() {
    super();
    this.state = {
      submitSuccess: false,
      bucketType: 'All',
      userBucketInfo: [],
      isUserBucketDataFetched: false
    };
  }

  componentDidMount = () => {
    this.setState({
      submitSuccess: false
    });
  };

  componentDidUpdate = () => {
    this.getBucketData();
  };

  handleChange = response => {
    this.setState({
      bucketType: response.value
    });
  };

  getBucketData = () => {
    if (!this.state.userBucketInfo.length) {
      axios
        .get('http://206.189.195.166:3200/displayUserbucket')
        .then(response => {
          if (response.status === 200) {
            console.log(JSON.stringify(response.data));
            this.setState({
              userBucketInfo: response.data,
              isUserBucketDataFetched: true
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
    }
  };

  onFinish = values => {
    axios
      .post('http://206.189.195.166:3200/addSCategories', {
        CategoryID: values.CategoryID,
        BucketType: this.state.bucketType,
        CatDesc: values.CatDesc
      })
      .then(response => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            submitSuccess: response.data.message
          });
          this.render();
        } else if (response.data.code === 204) {
          console.log('User Status Submission failed with response: ', response);
        }
      })
      .catch(error => {
        console.log('error occured', error);
      });
  };

  render() {
    const layout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      }
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16
      }
    };
    const submitSuccess = this.state.submitSuccess === 'Status Changed';
    const bucketTypeDataInfo = this.state.userBucketInfo ? this.state.userBucketInfo : [];
    const dataArray = [];
    for (const data of bucketTypeDataInfo) {
      dataArray.push(data.BucketType);
    }

    return (
      <div style={{ marginTop: '50px', width: '80%' }}>
        {submitSuccess ? (
          <div>Category Added</div>
        ) : (
          <Form {...layout} name='basic' onFinish={this.onFinish}>
            <Form.Item
              label='Category Name'
              name='CategoryID'
              rules={[
                {
                  required: true,
                  message: 'CategoryID is mandetory Filed'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item style={{ marginLeft: '77px' }}>
              <span style={{ marginRight: '13px' }}>Bucket Type:</span>

              <Select
                labelInValue
                defaultValue={{ value: 'All' }}
                style={{ width: '200px' }}
                onChange={this.handleChange}
              >
                {dataArray.map(data => (
                  <Option value={data}>{data}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label='Category Description'
              name='CatDesc'
              rules={[
                {
                  required: true,
                  message: 'Category Description is mandetory Filed'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    );
  }
}