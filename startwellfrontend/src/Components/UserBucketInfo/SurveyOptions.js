import React, { Component } from "react";
import { Radio, Empty, Button, notification } from "antd";
import axios from "axios";
import EdiText from "react-editext";

export default class SurveyCategory extends Component {
  constructor() {
    super();
    this.state = {
      isSurveyOptionsFetched: false,
      surveyOptionsList: [],
      qstnText: "",
      optionText: "",
    };
  }

  componentDidMount = () => {
    this.displaySurveyQuestions();
  };

  componentDidUpdate = () => {
    if (
      !this.state.isSurveyOptionsFetched &&
      !this.state.surveyOptionsList?.length
    ) {
      this.displaySurveyQuestions();
    }
  };

  displaySurveyQuestions = () => {
    axios
      .get('http://localhost:3200/surveyOptions', {
        params: {
          SurveyID: this.props.surveyId,
          QuesID: this.props.questionId,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            surveyOptionsList: response.data,
            isSurveyOptionsFetched: true,
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

  openNotification = () => {
    notification.open({
      message: "Updated Question Succesfully",
      // description:
      // "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  editSurveyQuestion = async () => {
    await axios
      .put("http://206.189.195.166:3200/EditQues", {
        QText: this.state.qstnText || this.props.questionText,
        SurveyID: this.props.surveyId,
        QuesID: this.props.questionId,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            // surveyOptionsList: response.data,
            isSurveyOptionsFetched: true,
          });
          console.log("Update Survey Question", response);
        } else {
          let surveyError = "Error while processing question update";
          this.setState({ surveyError });
          console.log("Survey Question updation failed", response);
        }
      })
      .then(async () => {
        console.log({ list: this.state.surveyOptionsList });

        let promiseArray = this.state.surveyOptionsList.map((b) =>
          axios.put(`http://206.189.195.166:3200/EditOption`, {
            OptID: b.OptID,
            OptText: b.OptText,
            SurveyID: this.props.surveyId,
            QuesID: this.props.questionId,
          })
        );

        await Promise.all(promiseArray)
          .then((results) => {
            const data = results.map((el) => el.data);
            console.log("Updated Options", data);
            // this.setState({ categoryData: data });
          })
          .catch((error) => console.log("Error", error));
      })
      .then(() => this.displaySurveyQuestions())
      .then(() => this.openNotification())
      .catch((error) => {
        console.log("error occured", error);
      });
  };

  deleteSurveyQuestion = async () => {
    await axios
      .delete("http://206.189.195.166:3200/deleteQues", {
        SurveyID: this.props.surveyId,
        QuesID: this.props.questionId,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          console.log("Deleted Survey Question", response);
        } else {
          console.log(
            "Error occured while trying to delete survey question",
            response
          );
        }
      })
      .catch((error) => {
        console.log("Survey question deletion error occured", error);
      });
  };

  render() {
    const userSurveyOptionList = this.state.surveyOptionsList;
    const userSurveyOptionDataAvailable = userSurveyOptionList?.length;

    const question = this.state.qstnText || this.props.questionText;
    console.log({ q1: this.state.qstnText, q2: this.props.questionText });
    const radioStyle = {
      display: "flex",
      height: "30px",
      lineHeight: "30px",
    };

    const handleQstnEdit = (value) => {
      this.setState({
        qstnText: value.substr(3),
      });
    };

    const handleOptionEdit = (value, id) => {
      const x = this.state.surveyOptionsList.map((v, index) => {
        if (index === id) {
          console.log("TRUE");
          v.OptText = value;
        }
      });

      this.setState({
        optionText: x,
      });
    };

    return (
      <div>
        {!userSurveyOptionDataAvailable ? (
          <Empty />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexFlow: "column",
              marginLeft: "100px",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "14px",
                marginTop: "20px",
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: "30px",
              }}
            >
              <EdiText
                value={`Q. ${question}`}
                type="text"
                onSave={handleQstnEdit}
              />
            </div>
            <Radio.Group>
              {userSurveyOptionList.map((option, index) => {
                return (
                  <>
                    <div style={{ height: "80px" }}>
                      <Radio style={radioStyle} value={option.OptID}>
                        <EdiText
                          value={option.OptText}
                          type="text"
                          onSave={(value) => handleOptionEdit(value, index)}
                          // editButtonClassName={{ height: "30px" }}
                        />
                      </Radio>
                    </div>
                  </>
                );
              })}
            </Radio.Group>
            <div>
              <Button
                style={{ display: "inline-block", marginRight: "20px" }}
                onClick={() => this.editSurveyQuestion()}
              >
                Update
              </Button>
              <Button
                type="primary"
                danger
                style={{ display: "inline-block" }}
                onClick={() => this.deleteSurveyQuestion()}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
