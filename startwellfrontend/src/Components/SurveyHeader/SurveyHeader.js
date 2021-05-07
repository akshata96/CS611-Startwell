import React, { Component } from "react";
import { Table, Empty } from "antd";
import axios from "axios";

export default class SurveyHeader extends Component {
  constructor() {
    super();
    this.state = {
      isSurveyHeaderFetched: false,
      SurveyHeaderList: [],
    };
  }

  componentDidMount = () => {
    this.displaySurveyQuestions();
  };

  componentDidUpdate = () => {
    if (
      !this.state.isSurveyQuestionsFetched &&
      !this.state.surveyQuestionsList?.length
    ) {
      this.displaySurveyQuestions();
    }
  };


  // displaying Survey Log table for the admin dashboard
  
  displaySurveyQuestions = () => {
    axios
      .get("http://206.189.195.166:3200/displaySurveyHeader")
      .then((response) => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            SurveyHeaderList: response.data,
            isSurveyHeaderFetched: true,
          });
          console.log("User Survey Category", response);
        } else {
          let surveyError = "Error while processing user survey bucket";
          this.setState({ surveyError });
          console.log("User Survey Questions failed", response);
        }
      })
      .catch((error) => {
        console.log("error occured", error);
      });
  };

  render() {
    const userSurveyQuestionsInfoColumn = [
      {
        title: "First Name",         // First Name of Survey Log
        dataIndex: "First_Name",
      },
      {
        title: "User Type",         // User Type of Survey Log
        dataIndex: "UserType",
      },
      {
        title: "Survey Title",         // Survey Title of Survey Log
        dataIndex: "SurveyTitle",
      },
      {
        title: "Attempt Time",         // Time stamp of Survey Log 
        dataIndex: "Time_stamp",
      },
    ];

    const userSurveyQuestionsList = this.state.SurveyHeaderList;
    const userSurveyQuestionsDataAvailable = userSurveyQuestionsList?.length;
    return (
      <div style={{ marginTop: "20px" }}>
        <div>

      {/*Survey Log Table are displayed in table format */}

          {!userSurveyQuestionsDataAvailable ? (
            <Empty />
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Table
                  style={{ width: "90%", height: "80%" }}
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
