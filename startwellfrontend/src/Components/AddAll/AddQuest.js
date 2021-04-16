import React, { Component } from 'react';
import { Button, Input, Form, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;
export default class AddQuest extends Component {
  constructor() {
    super();
    this.state = {
      submitSuccess: false,
      selectedSurveyId: 1,
      SurveyIDInfo: [],
      responseType: 'R',
      surveyIdFetched: false
    };
  }

  componentDidMount = () => {
    this.setState({
      submitSuccess: false
    });
  };

  handleSelectedSurvey = response => {
    this.setState({
      selectedSurveyId: response.value
    });
  };

  handleChangeResponseStatus = response => {
    this.setState({
      responseType: response.value
    });
  };

  getSurveyId = () => {
    if (!this.state.categoryDataInfo.length) {
      axios
        .get('http://206.189.195.166:3200/displaySurveyID')
        .then(response => {
          if (response.status === 200) {
            console.log(JSON.stringify(response.data));
            this.setState({
              SurveyIDInfo: response.data,
              surveyIdFetched: true
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
      // alert(values.QuesID_Customer);
      axios
        .post('http://206.189.195.166:3200/addSurveyQuestion', {
          SurveyID: this.state.selectedSurveyId,
          QuesID: values.QuesID,
          QText: values.QText,
          RespType: this.state.responseType,
          Weights: values.Weights
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
    const surveyIDInfo = this.state.SurveyIDInfo ? this.state.SurveyIDInfo : [];
    const dataArray = [];
    for (const data of surveyIDInfo) {
      dataArray.push(data.SurveyID);
    }
    return (
      <div style={{ marginTop: '50px', width: '80%' }}>
        {submitSuccess ? (
          <div>Questions Added</div>
        ) : (
          <Form {...layout} name='basic' onFinish={onFinish}>
            <Form.Item style={{ marginLeft: '77px' }}>
              <span style={{ marginRight: '13px' }}>Survey ID:</span>
              <Select
                labelInValue
                defaultValue={{ value: 1 }}
                style={{ width: '200px' }}
                onChange={this.handleSelectedSurvey}
              >
                {dataArray.map(data => (
                  <Option value={data}>{data}</Option>
                ))}
              </Select>
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
            <Form.Item style={{ marginLeft: '77px' }}>
              <span style={{ marginRight: '13px' }}>Response Type:</span>
              <Select
                labelInValue
                defaultValue={{ value: 'R' }}
                style={{ width: '200px' }}
                onChange={this.handleChangeResponseStatus}
              >
                <Option value='R'>R</Option>
              </Select>
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