import React, { Component } from 'react';
import { Button, Input, Form } from 'antd';
import axios from 'axios';

export default class BucketType extends Component {
  constructor() {
    super();
    this.state = {
      submitSuccess: false
    };
  }

  componentDidMount = () => {
    this.setState({
      submitSuccess: false
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

    const onFinish = values => {
      axios
        .post('http://localhost:3200/addBucket', {
          BucketType: values.BucketType,
          BucketDesc: values.BucketDesc
        })
        .then(response => {
          if (response.status === 200) {
            console.log(JSON.stringify(response.data));
            this.setState({
              submitSuccess: response.data.status
            });
            this.render();
          } else if (response.data.code === 204) {
            console.log('Bucket Submission failed with response: ', response);
          }
        })
        .catch(error => {
          console.log('error occured', error);
        });
    };
    const submitSuccess = this.state.submitSuccess;

    return (
      <div>
        {submitSuccess ? (
          <div>Bucket Added</div>
        ) : (
          <Form {...layout} name='basic' onFinish={onFinish}>
            <Form.Item
              label='Bucket Type'
              name='BucketType'
              rules={[
                {
                  required: true,
                  message: 'Bucket Type is mandetory Filed'
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Bucket Description'
              name='BucketDesc'
              rules={[
                {
                  required: true,
                  message: 'Bucket Type is mandetory Filed'
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
