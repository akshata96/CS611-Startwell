import React, { Component } from 'react';
import { Button, Input, Form, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;
export default class AddPageContent extends Component {
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

    const onFinish = values => {
      alert(values.QuesID_Customer);
      axios
        .post('http://localhost:9000/addCrossReference', {
          email: values.email,
          QuesID_Customer: values.QuesID_Customer,
          SurveyID_Provider: values.SurveyID_Provider,
          QuesID_Provider: values.QuesID_Provider
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
      <div style={{ marginTop: '50px', width: '80%' }}>
        {submitSuccess ? (
          <div>Cross Reference Added</div>
        ) : (
          <Form {...layout} name='basic' onFinish={onFinish}>
            <Form.Item
              label='Email'
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Email is mandetory Filed'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Customer ID'
              name='QuesID_Customer'
              rules={[
                {
                  required: true,
                  message: 'Customer ID is mandetory Filed'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Provider Survey ID'
              name='SurveyID_Provider'
              rules={[
                {
                  required: true,
                  message: 'Provider Survey ID is mandetory Filed'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Provider Question ID'
              name='QuesID_Provider'
              rules={[
                {
                  required: true,
                  message: 'Provider Question ID is mandetory Filed'
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
