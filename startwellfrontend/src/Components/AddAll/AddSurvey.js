import React, { Component } from 'react';
import { Button, Input, Form, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;
export default class AddSurvey extends Component {
  constructor() {
    super();
    this.state = {
      submitSuccess: false,
      categoryDataInfo: [],
      categorytDataFetched: false,
      selectedCategory: 'Demograph Survey',
      selectedStatus: 'A'
    };
  }

  componentDidMount = () => {
    this.setState({
      submitSuccess: false
    });
  };

  componentDidUpdate = () => {
    this.getCategoryData();
  };

  handleChangeCategory = response => {
    this.setState({
      selectedCategory: response.value
    });
  };

  handleChangeSurveyStatus = response => {
    this.setState({
      selectedStatus: response.value === 'Active' ? 'A' : 'I'
    });
  };

  getCategoryData = () => {
    if (!this.state.categoryDataInfo.length) {
      axios
        .get('http://206.189.195.166:3200/displayCategoryID')
        .then(response => {
          if (response.status === 200) {
            console.log(JSON.stringify(response.data));
            this.setState({
              categoryDataInfo: response.data,
              categorytDataFetched: true
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
        .post('http://206.189.195.166:3200/addSurvey', {
          SurveyTitle: values.SurveyTitle,
          NoQues: values.NoQues,
          OptDesc: values.OptDesc,
          CategoryID: this.state.selectedCategory,
          SurveyStatus: this.state.selectedStatus
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
    const categoryDataInfo = this.state.categoryDataInfo ? this.state.categoryDataInfo : [];
    const dataArray = [];
    for (const data of categoryDataInfo) {
      dataArray.push(data.CategoryID);
    }

    return (
      <div style={{ marginTop: '50px', width: '80%' }}>
        {submitSuccess ? (
          <div>Survey Added</div>
        ) : (
          <Form {...layout} name='basic' onFinish={onFinish}>
            <Form.Item
              label='SurveyTitle'
              name='SurveyTitle'
              rules={[
                {
                  required: true,
                  message: 'SurveyTitle is mandetory Filed'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='NoQues'
              name='NoQues'
              rules={[
                {
                  required: true,
                  message: 'Number of Questions is mandetory Filed'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='OptDesc'
              name='OptDesc'
              rules={[
                {
                  required: true,
                  message: 'Option Description is mandetory Filed'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item style={{ marginLeft: '77px' }}>
              <span style={{ marginRight: '13px' }}>CategoryID:</span>

              <Select
                labelInValue
                defaultValue={{ value: 'All' }}
                style={{ width: '200px' }}
                onChange={this.handleChangeCategory}
              >
                {dataArray.map(data => (
                  <Option value={data}>{data}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item style={{ marginLeft: '77px' }}>
              <span style={{ marginRight: '13px' }}>Survey Status:</span>
              <Select
                labelInValue
                defaultValue={{ value: 'Active' }}
                style={{ width: '200px' }}
                onChange={this.handleChangeSurveyStatus}
              >
                <Option value='Active'>Active</Option>
                <Option value='Inactive'>Inactive</Option>
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