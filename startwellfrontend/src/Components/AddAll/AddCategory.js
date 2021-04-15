import React, { Component } from 'react';
import { Button, Input, Form, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;
export default class AddCategory extends Component {
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
      //alert(values.QuesID_Customer);
      axios
        .post('http://206.189.195.166:3200/addSCategories', {
          CategoryID: values.CategoryID,
          BucketType: values.BucketType,
          CatDesc: values.CatDesc,
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
          <div>Category Added</div>
        ) : (
          <Form {...layout} name='basic' onFinish={onFinish}>
            <Form.Item
              label='CategoryID'
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
            <Form.Item
              label='Bucket Type'
              name='BucketType'
              rules={[
                {
                  required: true,
                  message: 'Bucket Type  is mandetory Filed'
                }
              ]}
            >
              <Input />
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
