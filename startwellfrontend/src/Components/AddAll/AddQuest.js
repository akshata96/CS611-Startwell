import React, { Component } from 'react';
import { Button, Input, Form, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;
export default class AddQuest extends Component {
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
     // alert(values.QuesID_Customer);
      axios
        .post('http://206.189.195.166:3200/addSurveyQuestion', {
          SurveyID: values.SurveyID,
          QuesID: values.QuesID,
          QText: values.QText,
          RespType:values.RespType,
          Weights:values.Weights
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
          <div>Questions Added</div>
        ) : (
          <Form {...layout} name='basic' onFinish={onFinish}>
            <Form.Item
              label='SurveyID'
              name='SurveyID'
              rules={[
                {
                  required: true,
                  message: 'SurveyID is mandetory Filed'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='QuesID'
              name='QuesID'
              rules={[
                {
                  required: true,
                  message: 'Questions ID is mandetory Filed'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='QText'
              name='QText'
              rules={[
                {
                  required: true,
                  message: 'QText is mandetory Filed'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='RespType'
              name='RespType'
              rules={[
                {
                  required: true,
                  message: 'RespType is mandetory Filed'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Weights'
              name='Weights'
              rules={[
                {
                  required: true,
                  message: 'Weights is mandetory Filed'
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
