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
// displaying Cross Reference table for the admin dashboard  
  displaySurveyQuestions = () => {
    axios
      .get('http://206.189.195.166:3200/displayCrossReference')
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
        title: 'Customer Survey Title',           // Customer Survey Title of SurveyTitle_Customer
        dataIndex: 'SurveyTitle_Customer'
      },
      {
        title: 'Question No',                    // Question No of QuesID_Customer
        dataIndex: 'QuesID_Customer'
      },
      {
        title: 'Question',                    // Question of QText_Customer
        dataIndex: 'QText_Customer'
      },
      {
        title: 'option',                    // option of OptText_Customer
        dataIndex: 'OptText_Customer'
      },
      {
        title: 'Provider Survey Title',        // Provider Survey Title of SurveyTitle_Provider
        dataIndex: 'SurveyTitle_Provider'
      },
      {
        title: 'Question No',                    // Question No of QuesID_Provider
        dataIndex: 'QuesID_Provider'
      },
      {
        title: 'Question',                    // Question of QText_Provider
        dataIndex: 'QText_Provider'
      },
      {
        title: 'option',                  // option of OptText_Provider
        dataIndex: 'OptText_Provider'
      }
    ];

    const userSurveyQuestionsList = this.state.pageContentList;
    const userSurveyQuestionsDataAvailable = userSurveyQuestionsList?.length;
    return (
      <div style={{ marginTop: '20px' }}>

        
                      {/*Cross-Reference Table are displayed in editable table format */}
        <div>
          {!userSurveyQuestionsDataAvailable ? (
            <Empty />
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Table size="small"
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