import React, { Component } from 'react';
import { Button, Input, Form, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;
export default class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      submitSuccess: false,
      userStatus: 'Active'
    };
  }

  componentDidMount = () => {
    this.setState({
      submitSuccess: false
    });
  };

  handleChange = response => {
    this.setState({
      userStatus: response.value
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
      //  updating User Status for the admin dashboard

    const onFinish = values => {
      axios
        .put('http://localhost:3200/updateUserStatus', {
          UserID: values.UserID,
          Current_Status: this.state.userStatus
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
            <Form.Item style={{ marginLeft: '53px' }}>
              <span style={{ marginRight: '13px' }}>Status:</span>

                {/* updating User Status */}
                
              <Select
                labelInValue
                defaultValue={{ value: 'Active' }}
                style={{ width: 120 }}
                onChange={this.handleChange}
              >
                <Option value='Active'>Active</Option>
                <Option value='Inactive'>Inactive</Option>
                <Option value='Blocked'>Blocked</Option>
              </Select>
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