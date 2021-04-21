import React, { Component } from 'react';
import { Table, Empty } from 'antd';
import axios from 'axios';

export default class PageContent extends Component {
  constructor() {
    super();
    this.state = {
      isPageContentFetched: false,
      pageContentList: []
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
      .get('http://localhost:9000/displayCrossReference')
      .then(response => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            pageContentList: response.data,
            isPageContentFetched: true
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
        title: '#',
        dataIndex: 'SNo'
      },
      {
        title: 'Customer Survey ID',
        dataIndex: 'SurveyID_Customer'
      },
      {
        title: 'Customer Question ID',
        dataIndex: 'QuesID_Customer'
      },
      {
        title: 'Provider Survey ID',
        dataIndex: 'SurveyID_Provider'
      },
      {
        title: 'Provider Question ID',
        dataIndex: 'QuesID_Provider'
      }
    ];

    const userSurveyQuestionsList = this.state.pageContentList;
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
