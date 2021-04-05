import React, { Component } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';

export default class LoginSuccess extends Component {
  constructor() {
    super();
    this.state = {
      h: false,
      data: {},
      surveyError: '',
      questionData: {},
      surveyQuestionError: ''
    };
  }

  clearSurveyData = () => {
    this.setState({
      data: {},
      questionData: {}
    });
  };

  getSurveyData = () => {
    axios
      .get('http://localhost:3200/displayAllSurvey')
      .then(response => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            data: response.data
          });
          console.log('Survey Data', response);
        } else {
          let surveyError = 'Error while processing survey data';
          this.setState({ surveyError });
          console.log('Survey API failed', response);
        }
      })
      .catch(error => {
        console.log('error occured', error);
      });
  };

  getSurveyQuestion = () => {
    axios
      .get('http://localhost:3200/surveyQuestion', {
        params: { surveyId: 1 }
      })
      .then(response => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            questionData: response.data
          });
          console.log('Survey Question Data', response);
        } else {
          let surveyQuestionError = 'Error while processing survey question data';
          this.setState({ surveyQuestionError });
          console.log('Survey Questions API failed', response);
        }
      })
      .catch(error => {
        console.log('error occured', error);
      });
  };
  render() {
    console.log(this.state.data);
    const data = [this.state.data];
    const surveyQuestions = this.state.questionData;
    const isDataAvailable = data[0].surveyId;
    const isSurveyQuestionsAvailable = surveyQuestions.length ? surveyQuestions[0].SurveyID : undefined;
    const columnsSurvey = [
      {
        title: 'Survey Id',
        dataIndex: 'surveyId'
      },
      {
        title: 'Survey Title',
        dataIndex: 'surveyTitle'
      },
      {
        title: ' NoQues',
        dataIndex: 'NoQues'
      },
      {
        title: 'Category ID',
        dataIndex: 'CategoryID'
      },
      {
        title: 'Option Description',
        dataIndex: 'OptDesc'
      },
      {
        title: 'Survey Status',
        dataIndex: 'SurveyStatus'
      }
    ];

    const columnsSurveyQuestions = [
      {
        title: 'Sno',
        dataIndex: 'SNo'
      },
      {
        title: 'Question ID',
        dataIndex: 'QuesID'
      },
      {
        title: 'Question Text',
        dataIndex: 'QText'
      },
      {
        title: ' Response Type',
        dataIndex: 'RespType'
      },
      {
        title: 'Survey ID',
        dataIndex: 'SurveyID'
      },
      {
        title: 'Weights',
        dataIndex: 'Weights'
      }
    ];

    return (
      <div>
        {!isDataAvailable ? (
          <Button
            type='primary'
            htmlType='submit'
            onClick={this.getSurveyData}
            style={{ display: 'flex', alignItems: 'flex-start', marginTop: '50px' }}
          >
            Get Survey Results
          </Button>
        ) : null}
        {isDataAvailable ? (
          <div>
            <div>
              <Table style={{ width: '1000px', marginTop: '50px' }} dataSource={data} columns={columnsSurvey} />
              <Button
                type='primary'
                htmlType='submit'
                onClick={this.clearSurveyData}
                style={{ display: 'flex', alignItems: 'flex-start', marginTop: '50px' }}
              >
                Clear Survey Data
              </Button>
            </div>
            <div>
              <Button
                type='primary'
                htmlType='submit'
                onClick={this.getSurveyQuestion}
                style={{ display: 'flex', alignItems: 'flex-start', marginTop: '50px' }}
              >
                Get Survey Question
              </Button>
              {isSurveyQuestionsAvailable ? (
                <Table
                  style={{ width: '1000px', marginTop: '50px' }}
                  dataSource={surveyQuestions}
                  columns={columnsSurveyQuestions}
                />
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}