import React, { Component } from 'react';
import { Button, Input, Form } from 'antd';
import axios from 'axios';

export default class EditUser extends Component {
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
        .put('http://localhost:9000/updateUserStatus', {
          UserID: values.UserID,
          Current_Status: values.Current_Status
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
    const submitSuccess = this.state.submitSuccess === 'Status Changed';

    return (
      <div>
        {submitSuccess ? (
          <div>User Status Updated</div>
        ) : (
          <Form {...layout} name='basic' onFinish={onFinish}>
            <Form.Item
              label='User Id'
              name='UserID'
              rules={[
                {
                  required: true,
                  message: 'User Id is mandetory Filed'
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Current Status'
              name='Current_Status'
              rules={[
                {
                  required: true,
                  message: 'Staus is mandetory field'
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
