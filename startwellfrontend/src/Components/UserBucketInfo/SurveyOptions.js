import React, { Component } from 'react';
import { Radio, Empty } from 'antd';
import axios from 'axios';

export default class SurveyCategory extends Component {
  constructor() {
    super();
    this.state = {
      isSurveyOptionsFetched: false,
      surveyOptionsList: []
    };
  }

  componentDidMount = () => {
    this.displaySurveyQuestions();
  };

  componentDidUpdate = () => {
    if (!this.state.isSurveyOptionsFetched && !this.state.surveyOptionsList?.length) {
      this.displaySurveyQuestions();
    }
  };

  displaySurveyQuestions = () => {
    axios
      .get('http://localhost:9000/surveyOptions', {
        params: {
          SurveyID: this.props.surveyId,
          QuesID: this.props.questionId
        }
      })
      .then(response => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            surveyOptionsList: response.data,
            isSurveyOptionsFetched: true
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
    const userSurveyOptionList = this.state.surveyOptionsList;
    const userSurveyOptionDataAvailable = userSurveyOptionList?.length;
    const radioStyle = {
      display: 'flex',
      height: '30px',
      lineHeight: '30px'
    };
    return (
      <div>
        {!userSurveyOptionDataAvailable ? (
          <Empty />
        ) : (
          <div style={{ display: 'flex', justifyContent: 'flex-start', flexFlow: 'column', marginLeft: '100px' }}>
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '14px',
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'flex-start',
                marginBottom: '30px'
              }}
            >
              Q. {this.props.questionText}
            </div>
            <Radio.Group>
              {userSurveyOptionList.map(option => {
                return (
                  <Radio style={radioStyle} value={option.OptID}>
                    {option.OptText}
                  </Radio>
                );
              })}
            </Radio.Group>
          </div>
        )}
      </div>
    );
  }
}

//<Radio.Group onChange={onChange} value={value}>
