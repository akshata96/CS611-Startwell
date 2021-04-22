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
      //this.displaySurveyQuestions();
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
      [
      {
        title: 'Customer Survey ID',
        dataIndex: 'SurveyID_Customer'
      },
      {
        title: 'Customer Question ID',
        dataIndex: 'QuesID_Customer'
      },
      {
        title: 'Question',
        dataIndex: 'QText'
      }],
      [{
        title: 'Provider Survey ID',
        dataIndex: 'SurveyID_Provider'
      },
      {
        title: 'Provider Question ID',
        dataIndex: 'QuesID_Provider'
      },
      {
        title: 'Question',
        dataIndex: 'QText'
      }
    ]];
   const userSurveyQuestionsList0=this.state.pageContentList[0];
    const userSurveyQuestionsList1 = this.state.pageContentList[1];
    const userSurveyQuestionsDataAvailable0 = userSurveyQuestionsList0?.length;
    const userSurveyQuestionsDataAvailable = userSurveyQuestionsList1?.length;
    return (
      <div style={{ marginTop: '20px' }}>
        <div>
          {!userSurveyQuestionsDataAvailable && !userSurveyQuestionsDataAvailable0 ? (
            <Empty />
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Table
                  style={{ width: '90%', height: '80%' }}
                  dataSource={userSurveyQuestionsList0}
                  columns={userSurveyQuestionsInfoColumn[0]}
                />
                 <Table
                  style={{ width: '90%', height: '80%' }}
                  dataSource={userSurveyQuestionsList1}
                  columns={userSurveyQuestionsInfoColumn[1]}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
