import React, { Component } from 'react';
import { Button, Table } from 'antd';
import axios from 'axios';
import BucketType from '../BucketType/BucketType';
import { json } from 'body-parser';

export default class UserServey extends Component {
  constructor() {
    super();
    this.state = {
      bucketInfo: [],
      addBucketClicked: false,
      selectedRowKeys: [],
      loading: false,
      surveyQuestionsFetched: false
    };
  }

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: []
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  addBucket = () => {
    this.setState({
      addBucketClicked: true,
      bucketInfo: []
    });
  };
  displayUserBucket = () => {
    this.setState({
      addBucketClicked: false
    });
    axios
      .get('http://localhost:9000/displayUserbucket')
      .then(response => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            bucketInfo: [response.data]
          });
          console.log('Survey Bucket', response);
        } else {
          let surveyError = 'Error while processing survey bucket';
          this.setState({ surveyError });
          console.log('Survey buxcket API failed', response);
        }
      })
      .catch(error => {
        console.log('error occured', error);
      });
  };

  getSurveyQuestions = record => {
    axios
      .get(`http://localhost:9000/surveyQandOpt?surveyId=${record.SNo}`)
      .then(response => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            questionInfo: response.data,
            surveyQuestionsFetched: true,
            addBucketClicked: false,
            bucketInfo: []
          });
          console.log('Question Bucket', response);
        } else {
          let surveyError = 'Error while processing survey bucket';
          this.setState({ surveyError });
          console.log('Fetch Question API failed', response);
        }
      })
      .catch(error => {
        console.log('error occured', error);
      });
  };

  render() {
    const buckeyDataInfo = this.state.bucketInfo;
    const bucketInfohasData = buckeyDataInfo.length;
    const quetionDataInfo = this.state.questionInfo;
    const isQuestionDataAvailable = quetionDataInfo?.length;
    const bucketColumnInfo = [
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
    const addBucketClicked = this.state.addBucketClicked;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <div id='header' style={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between' }}>
          <div style={{ marginLeft: '40px', marginTop: '20px' }}>
            <Button type='primary' shape='round' onClick={this.displayUserBucket}>
              Display User Bucket
            </Button>
          </div>
          <div>
            <Button
              type='primary'
              shape='round'
              style={{ marginRight: '40px', marginTop: '20px' }}
              onClick={this.addBucket}
            >
              Add Bucket
            </Button>
          </div>
        </div>
        <div id='body' style={{ height: '700px', marginTop: '40px' }}>
          {buckeyDataInfo && bucketInfohasData ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                height: '400px',
                marginTop: '20px'
              }}
            >
              <Table
                style={{ width: '70%', height: '100%' }}
                dataSource={buckeyDataInfo}
                columns={bucketColumnInfo}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: event => {
                      this.getSurveyQuestions(record);
                    }
                  };
                }}
              />
            </div>
          ) : addBucketClicked ? (
            <div style={{ width: '75%', marginTop: '150px' }}>
              <BucketType submitSuccess={false} />
            </div>
          ) : quetionDataInfo && isQuestionDataAvailable ? (
            <div style={{ height: '600px', overflow: 'hidden', overflowY: 'auto' }}>
              {quetionDataInfo.map((question, index) => (
                <div>
                  <div key={index} style={{ display: 'flex', flexFlow: 'column' }}>
                    <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'flex-start' }}>
                      <span style={{ color: 'Tomato' }}>Sno: </span> {question.SNo}
                    </div>
                    <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'flex-start' }}>
                      <span style={{ color: 'Tomato', fontWeight: 'bold', fontSize: '14px' }}>Survey Id: </span>
                      {question.SurveyID}
                    </div>
                    <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'flex-start' }}>
                      <span style={{ color: 'Tomato' }}>Question Id: </span>
                      {question.QuesID}
                    </div>
                    <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'flex-start' }}>
                      <span style={{ color: 'Tomato' }}>Question: </span> {question.QText}
                    </div>
                    <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'flex-start' }}>
                      <span style={{ color: 'Tomato' }}>Response Type: </span> {question.RespType}
                    </div>
                    <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'flex-start' }}>
                      <span style={{ color: 'Tomato' }}>Weight: </span> {question.Weights}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexFlow: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start'
                      }}
                    >
                      <div>
                        <span
                          style={{ display: 'flex', flexFlow: 'column', justifyContent: 'flex-start', color: 'Tomato' }}
                        >
                          Options:{' '}
                        </span>
                      </div>
                      <div>
                        {question.options.map((option, index) => (
                          <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'flex-start' }}>
                            <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'flex-start' }}>
                              Option Id: {option.optionId}
                            </div>
                            <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'flex-start' }}>
                              Text: {option.OptionText}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ border: '1px solid' }} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
