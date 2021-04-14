import React, { Component } from 'react';
import { Table, Empty } from 'antd';
import axios from 'axios';
import SurveyOptions from './SurveyOptions';

export default class SurveyCategory extends Component {
  constructor() {
    super();
    this.state = {
      isSurveyQuestionsFetched: false,
      surveyQuestionsList: [],
      selectedQuestionId: '',
      optionViewSelected: false,
      questionText: ''
    };
  }

  componentDidMount = () => {
    this.displaySurveyQuestions();
  };

  componentDidUpdate = () => {
    if (!this.state.isSurveyQuestionsFetched && !this.state.surveyQuestionsList.length) {
      this.displaySurveyQuestions();
    }
  };

  displaySurveyQuestions = () => {
    axios
      .get(`http://localhost:9000/displaySQuestions?SurveyID=${this.props.surveyId}`)
      .then(response => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            surveyQuestionsList: response.data,
            isSurveyQuestionsFetched: true
          });
          console.log('User Survey Category', response);
        } else {
          let surveyError = 'Error while processing user survey bucket';
          this.setState({ surveyError });
          console.log('User Survey Questions failed', response);
        }
      })
      .catch(error => {
        console.log('error occured', error);
      });
  };

  setOptionView = values => {
    this.setState({
      selectedQuestionId: values.QuesID,
      optionViewSelected: true,
      questionText: values.QText
    });
  };

  render() {
    const userSurveyQuestionsInfoColumn = [
      {
        title: 'Sno',
        dataIndex: 'SNo'
      },
      {
        title: 'Survey ID',
        dataIndex: 'SurveyID'
      },
      {
        title: 'Question ID',
        dataIndex: 'QuesID'
      },
      {
        title: 'Question',
        dataIndex: 'QText'
      },
      {
        title: 'Response Type',
        dataIndex: 'RespType'
      },
      {
        title: 'Weights',
        dataIndex: 'Weights'
      }
    ];

    const userSurveyQuestionsList = this.state.surveyQuestionsList;
    const userSurveyQuestionsDataAvailable = userSurveyQuestionsList.length;
    return (
      <div style={{ marginTop: '20px' }}>
        {this.state.optionViewSelected ? (
          <div>
            <SurveyOptions
              surveyId={this.props.surveyId}
              questionId={this.state.selectedQuestionId}
              questionText={this.state.questionText}
            />
          </div>
        ) : (
          <div>
            {!userSurveyQuestionsDataAvailable ? (
              <Empty />
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Table
                    style={{ width: '90%', height: '80%' }}
                    dataSource={userSurveyQuestionsList}
                    columns={userSurveyQuestionsInfoColumn}
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: event => {
                          this.setOptionView(record);
                        }
                      };
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
