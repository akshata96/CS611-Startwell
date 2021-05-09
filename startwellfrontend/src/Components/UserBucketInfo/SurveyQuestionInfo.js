import React, { Component } from "react";
import { Radio, Table, Empty, Button, notification, Tooltip } from "antd";
import axios from "axios";
import SurveyOptions from "./SurveyOptions";
import EdiText from "react-editext";
import QuestionForm from "../QuestionForm";
import Modal from "../AddAll/QuestionModal";
import Close from "../QuestionModal/cancel.svg";
import "../QuestionModal/modal.css";

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
      Weights: "",
    };
  }

  componentDidMount = () => {
    this.displaySurveyQuestions();
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
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

        // displaying Survey questions for the admin dashboard

  displaySurveyQuestions = () => {
    axios
      .get(
        `http://localhost:3200/displaySQuestions?SurveyID=${this.props.surveyId}`
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            surveyQuestionsList: response.data,
            isSurveyQuestionsFetched: true,
          });
          this.setState({
            SurveyTitle: this.state.surveyQuestionsList[2].SurveyTitle,
          });
          console.log("getting the surveyy title", this.state.SurveyTitle);
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
      .get("http://localhost:3200/surveyOptions", {
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

          // editing Survey questions for the admin dashboard

  editSurveyQuestion = async (record) => {
    console.log({ weight1: record.Weights });
    console.log({ sateweight: this.state.Weights });
    console.log({ record: record });
    await axios
      .put("http://localhost:3200/EditQues", {
        QText: this.state.qstnText || this.props.questionText || record.QText,
        Weights: this.state.Weights,
        SurveyID: record.SurveyID,
        QuesID: record.QuesID,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
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
          axios.put(`http://localhost:3200/EditOption`, {
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
          })
          .catch((error) => console.log("Error", error));
      })
      .then(() => this.displaySurveyQuestions())
      .then(() => this.openUpdateNotification())
      .catch((error) => {
        console.log("error occured", error);
      });
  };
          // deleting Survey question for the admin dashboard
  deleteSurveyQuestion = (record) => {
    console.log("In delete", record);
    console.log("In delete", record.SurveyID);
    console.log("In delete", record.QuesID);
    axios
      .delete("http://localhost:3200/deleteSurveyQuestion", {
        params: {
          SurveyID: record.SurveyID,
          QuesID: record.QuesID,
        },
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

    console.log({ QSTNS: editableQuestions });
    console.log({ q1: this.state.qstnText, q2: this.props.questionText });
    const question = this.state.qstnText || this.props.questionText;
    const handleQstnEdit = (value) => {
      this.setState({
        qstnText: value.substr(3),
      });
    };
    const handleWeightEdit = (value) => {
      this.setState({
        Weights: value,
      });
      console.log({ newweight: this.state.Weights });
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

    const customColors = ["#000000"];

    const userSurveyQuestionsInfoColumn = [
      {
        title: "Question No",
        dataIndex: "QuesID",
        key: "QuesID",
      },
      
      {
        title: "Question",
        dataIndex: "QText",
        key: "QText",
      },
      
      {
        title: "Weights",
        dataIndex: "Weights",
        key: "Weights",
      },
    ];

    const ab = editableQuestions.map((v) => v.QText);
    const weight = editableQuestions.map((v) => v.Weights);
    const userSurveyOptionList = this.state.surveyOptionsList;

    console.log({ qstns: editableQuestions });
    return (
      <div style={{ marginTop: "20px" }}>
        <div> 
          <h1 style={{ fontSize: '200%', fontWeight:'bold'}} >{this.state.SurveyTitle} </h1>
          </div>

                   {/*Survey questions and options are displayed in editable table format */}

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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <Table
                    columns={userSurveyQuestionsInfoColumn}
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
                                      />
                                    </Radio>
                                  </div>
                                </>
                              );
                            })}
                          </Radio.Group>
                          {customColors.map((color) => (
                            <Tooltip
                              placement="left"
                              title="Weights range from 0 - 40"
                              color={"#000000"}
                            >
                              <div style={radioStyle}>
                                <h1 style={{ fontSize: "120%" }}>
                                  {" "}
                                  Question weight: &nbsp;&nbsp;
                                </h1>
                                <EdiText
                                  value={`${weight[rowIndex]}`}
                                  type="text"
                                  onSave={handleWeightEdit}
                                />
                              </div>
                            </Tooltip>
                          ))}
                          <div>
                            <Button
                              style={{
                                display: "inline-block",
                                marginLeft: "10%",
                                marginTop: "40px",
                              }}
                              onClick={() => this.editSurveyQuestion(record)}
                            >
                              Update
                            </Button>
                            <Button
                              type="primary"
                              danger
                              style={{
                                display: "inline-block",
                                marginLeft: "40%",
                              }}
                              onClick={() => this.deleteSurveyQuestion(record)}
                            >
                              Delete
                            </Button>
                          </div>
                        </>
                      ),
                    }}
                    style={{ width: "90%", height: "80%" }}
                    dataSource={editableQuestions}
                  />
                </div>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    marginBottom: "20px",
                  }}
                  onClick={this.toggleModal}
                >
                  Add Questions to the Survey
                </Button>

                <Modal
                  show={this.state.isOpen}
                  onRequestClose={this.toggleModaltoggleModal}
                  contentLabel="Question Modal"
                >
                  <div className="modal-header">
                    <p />
                    <p>Add a question</p>
                    <span onClick={this.toggleModal} className="close">
                      <img src={Close} alt="Press button to close modal" />
                    </span>
                  </div>
                  <QuestionForm
                    toggleModal={this.toggleModal}
                    surveyID={this.props.surveyId}
                  />
                </Modal>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
