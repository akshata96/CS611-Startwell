import React, { Component } from 'react';
import { Table, Empty } from 'antd';
import axios from 'axios';
import SurveyQuestionInfo from './SurveyQuestionInfo';

export default class SurveyCategory extends Component {
  constructor() {
    super();
    this.state = {
      isSurveyCategoryFetched: false,
      surveyCategoryList: [],
      selectedSurveyId: '',
      questionViewSelected: false
    };
  }

  componentDidMount = () => {
    this.displaySurveyCategory();
  };

  componentDidUpdate = () => {
    if (!this.state.isSurveyCategoryFetched && !this.state.surveyCategoryList.length) {
      this.displaySurveyCategory();
    }
  };

  displaySurveyCategory = () => {
    axios
      .get(`http://localhost:9000/SurveyUnderEachCateogry?CategoryID=${this.props.categoryId}`)
      .then(response => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            surveyCategoryList: response.data,
            isSurveyCategoryFetched: true
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

  setQuestionView = values => {
    this.setState({
      selectedSurveyId: values.SurveyID,
      questionViewSelected: true
    });
  };

  render() {
    const userSurveyCategoryInfoColumn = [
      {
        title: 'Survey Id',
        dataIndex: 'SurveyID'
      },
      {
        title: 'Survey Title',
        dataIndex: 'SurveyTitle'
      },
      {
        title: 'No. of Questions',
        dataIndex: 'NoQues'
      },
      {
        title: 'Option Description',
        dataIndex: 'OptDesc'
      },
      {
        title: 'Category Id',
        dataIndex: 'CategoryID'
      },
      {
        title: 'Survey Status',
        dataIndex: 'SurveyStatus'
      }
    ];

    const userSurveyCategoryList = this.state.surveyCategoryList;
    const userSurveyCategoryDataAvailable = userSurveyCategoryList.length;
    return (
      <div style={{ marginTop: '20px' }}>
        {this.state.questionViewSelected ? (
          <div>
            <SurveyQuestionInfo surveyId={this.state.selectedSurveyId} />
          </div>
        ) : (
          <div>
            {!userSurveyCategoryDataAvailable ? (
              <Empty />
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Table
                    style={{ width: '90%', height: '80%' }}
                    dataSource={userSurveyCategoryList}
                    columns={userSurveyCategoryInfoColumn}
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: event => {
                          this.setQuestionView(record);
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
