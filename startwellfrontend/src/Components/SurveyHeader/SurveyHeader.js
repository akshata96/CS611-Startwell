import React, { Component } from 'react';
import { Table, Empty } from 'antd';
import axios from 'axios';

export default class SurveyHeader extends Component {
  constructor() {
    super();
    this.state = {
      isSurveyHeaderFetched: false,
      SurveyHeaderList: []
    };
  }

  componentDidMount = () => {
    this.displaySurveyQuestions();
  };

  componentDidUpdate = () => {
    if (!this.state.isSurveyQuestionsFetched && !this.state.surveyQuestionsList?.length) {
      this.displaySurveyQuestions();
    }
  };

  displaySurveyQuestions = () => {
    axios
      .get('http://206.189.195.166:3200/displaySurveyHeader')
      .then(response => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            SurveyHeaderList: response.data,
            isSurveyHeaderFetched: true
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

  render() {
    const userSurveyQuestionsInfoColumn = [
      
      {
        title: 'First Name',
        dataIndex: 'First_Name'
      },
      {
        title: 'User Type',
        dataIndex: 'UserType'
      },
      {
        title: 'Survey Title',
        dataIndex: 'SurveyTitle'
      },
      {
        title: 'Attempt Time',
        dataIndex: 'Time_stamp'
      },
      
    ];

    const userSurveyQuestionsList = this.state.SurveyHeaderList;
    const userSurveyQuestionsDataAvailable = userSurveyQuestionsList?.length;
    return (
      <div style={{ marginTop: '20px' }}>
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
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}