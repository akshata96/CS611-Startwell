import React, { Component } from "react";
import { Radio, Table, Empty, Button, notification } from "antd";
import axios from "axios";
import SurveyOptions from "./SurveyOptions";
import EdiText from "react-editext";

export default class SurveyCategory extends Component {
  constructor() {
    super();
    this.state = {
      isSurveyQuestionsFetched: false,
      surveyQuestionsList: [],
      selectedQuestionId: "",
      optionViewSelected: false,
      questionText: "",
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
      !this.state.isSurveyQuestionsFetched &&
      !this.state.surveyQuestionsList.length
    ) {
      this.displaySurveyQuestions();
      this.displaySurveyOptions();
    }
  };

  displaySurveyQuestions = () => {
    axios
      .get(
        `http://206.189.195.166:3200/displaySQuestions?SurveyID=${this.props.surveyId}`
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            surveyQuestionsList: response.data,
            isSurveyQuestionsFetched: true,
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

  displaySurveyOptions = (record, index) => {
    console.log({ record: record });
    console.log({ index: index });
    console.log("OPTIONS");
    axios
      .get("http://206.189.195.166:3200/surveyOptions", {
        params: {
          SurveyID: record.SurveyID,
          QuesID: record.QuesID,
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

  setOptionView = (values) => {
    this.setState({
      selectedQuestionId: values.QuesID,
      optionViewSelected: true,
      questionText: values.QText,
    });
  };

  openUpdateNotification = () => {
    notification.open({
      message: "Updated Question Succesfully",
      // description:
      // "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  openDeleteNotification = () => {
    notification.open({
      message: "Question Deleted Succesfully",
      // description:
      // "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  editSurveyQuestion = async (record) => {
    await axios
      .put("http://206.189.195.166:3200/EditQues", {
        QText: this.state.qstnText || this.props.questionText,
        SurveyID: record.SurveyID,
        QuesID: record.QuesID,
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
        // console.log({ list: this.state.surveyOptionsList });

        let promiseArray = this.state.surveyOptionsList.map((b) =>
          axios.put(`http://206.189.195.166:3200/EditOption`, {
            OptID: b.OptID,
            OptText: b.OptText,
            SurveyID: record.SurveyID,
            QuesID: record.QuesID,
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
      .then(() => this.openUpdateNotification())
      .catch((error) => {
        console.log("error occured", error);
      });
  };

  deleteSurveyQuestion = async (record) => {
    await axios
      .delete("http://206.189.195.166:3200/deleteQues", {
        SurveyID: record.SurveyID,
        QuesID: record.QuesID,
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
      .then(() => this.displaySurveyQuestions())
      .then(() => this.openDeleteNotification())
      .catch((error) => {
        console.log("Survey question deletion error occured", error);
      });
  };

  render() {
    const userSurveyQuestionsList = this.state.surveyQuestionsList;

    const editableQuestions = userSurveyQuestionsList.map((d, index) => {
      return (d = { ...d, ...{ Edit: "EDIT", key: index } });
    });
    const userSurveyQuestionsDataAvailable = userSurveyQuestionsList.length;

    console.log({ QSTNS: editableQuestions.map((v) => v.QText) });
    console.log({ q1: this.state.qstnText, q2: this.props.questionText });
    const question = this.state.qstnText || this.props.questionText;
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
      console.log({ OPTION: this.state.surveyOptionsList });
    };

    const radioStyle = {
      display: "flex",
      height: "30px",
      lineHeight: "30px",
    };

    const userSurveyQuestionsInfoColumn = [
      {
        title: "Sno",
        dataIndex: "SNo",
        key: "Sno",
      },
      // {
      //   title: "Survey ID",
      //   dataIndex: "SurveyID",
      //   key: "SurveyID",
      // },
      // {
      //   title: "Question ID",
      //   dataIndex: "QuesID",
      //   key: "QuesID",
      // },
      {
        title: "Question",
        dataIndex: "QText",
        key: "QText",
      },
      // {
      //   title: "Response Type",
      //   dataIndex: "RespType",
      //   key: "RespType",
      // },
      {
        title: "Weights",
        dataIndex: "Weights",
        key: "Weights",
      },
      // {
      //   title: "Edit",
      //   dataIndex: "",
      //   key: "Edit",
      // },
    ];

    const ab = editableQuestions.map((v) => v.QText);
    const userSurveyOptionList = this.state.surveyOptionsList;

    return (
      <div style={{ marginTop: "20px" }}>
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
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Table
                    columns={userSurveyQuestionsInfoColumn}
                    // onRow={(record, rowIndex) => {
                    //   return {
                    //     onClick: (event) => {
                    //       this.setOptionView(record);
                    //     },
                    //   };
                    // }}
                    expandable={{
                      onExpand: (index, record) =>
                        this.displaySurveyOptions(record, index),
                      expandedRowRender: (record, rowIndex) => (
                        <>
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
                              value={`Q. ${ab[rowIndex]}`}
                              type="text"
                              onSave={handleQstnEdit}
                            />
                          </div>
                          <Radio.Group>
                            {userSurveyOptionList.map((option, index) => {
                              return (
                                <>
                                  <div style={{ height: "80px" }}>
                                    <Radio
                                      style={radioStyle}
                                      value={option.OptID}
                                    >
                                      <EdiText
                                        value={option.OptText}
                                        type="text"
                                        onSave={(value) =>
                                          handleOptionEdit(value, index)
                                        }
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
                              style={{
                                display: "inline-block",
                                marginRight: "20px",
                              }}
                              onClick={() => this.editSurveyQuestion(record)}
                            >
                              Update
                            </Button>
                            <Button
                              type="primary"
                              danger
                              style={{ display: "inline-block" }}
                              onClick={() => this.deleteSurveyQuestion(record)}
                            >
                              Delete
                            </Button>
                          </div>
                        </>
                      ),
                      // rowExpandable: (record) =>
                      //   record.QText !== "Not Expandable",
                    }}
                    style={{ width: "90%", height: "80%" }}
                    dataSource={editableQuestions}
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
