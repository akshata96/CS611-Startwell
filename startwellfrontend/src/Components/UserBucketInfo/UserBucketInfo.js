import React, { useState, Component } from "react";
import { Table, Empty, Button } from "antd";
import axios from "axios";
import UserCategory from "./UserCategory";
import SurveyCategory from "./SurveyCategory";
import SurveyOptions from "./SurveyOptions";
import SurveyQuestionInfo from "./SurveyQuestionInfo";

export default class UserBucketInfo extends Component {
  constructor() {
    super();
    this.state = {
      userBucketInfo: [],
      shouldShowCategoryView: false,
      bucketType: [],
      categoryData: [],
      surveyData: [],
      questionViewSelected: false,
      displaySurveyList: true,
    };
  }

  componentDidMount() {
    this.displayUserBucket();
    this.setState({
      shouldShowCategoryView: false,
    });
  }

  componentDidUpdate() {
    if (!this.state.surveyData) {
      this.displayUserBucket();
      this.setState({
        shouldShowCategoryView: false,
      });
    }
  }

  displayUserBucket = async () => {
    this.setState({
      questionViewSelected: false,
    });

    await axios
      .get("http://206.189.195.166:3200/displayUserbucket")
      .then((response) => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            userBucketInfo: response.data,
            shouldShowCategoryView: false,
          });
          console.log("User Survey Bucket", response);
        } else {
          let surveyError = "Error while processing user survey bucket";
          this.setState({ surveyError });
          console.log("User Survey bucket API failed", response);
        }
      })
      .then(async () => {
        const bucketType = this.state.userBucketInfo.map((v) => v.BucketType);
        this.setState({
          bucketType: bucketType,
        });

        let promiseArray = bucketType.map((b) =>
          axios.get(
            `http://206.189.195.166:3200/CateogryUnderEachBucket?BucketType=${b}`
          )
        );

        await Promise.all(promiseArray)
          .then((results) => {
            const data = results.map((el) => el.data);
            this.setState({ categoryData: data });
          })
          .catch((error) => console.log("Error", error));
      })
      .then(async () => {
        const categoryId = this.state.categoryData.map((v) =>
          v.map((data) => data.CategoryID)
        );

        //Flat category list from all sbucket types
        const flatCategoryIds = categoryId.flat(100);

        let promiseArray = flatCategoryIds.map((c) =>
          axios.get(
            `http://206.189.195.166:3200/SurveyUnderEachCateogry?CategoryID=${c}`
          )
        );

        await Promise.all(promiseArray)
          .then((results) => {
            console.log({ BCKTINFO: this.state.userBucketInfo });
            const data = results.map((el) => el.data);
            this.setState({
              surveyData: data.flat(100),
            });
          })
          .catch((error) => console.log("Error", error));
      })
      .catch((error) => {
        console.log("error occured", error);
      });
  };

  setQuestionView = (values) => {
    this.setState({
      selectedSurveyId: values.SurveyID,
      questionViewSelected: true,
    });
  };

  render() {
    const surveyList = [
      {
        title: "Survey Id",
        dataIndex: "SurveyID",
      },
      {
        title: "Survey Title",
        dataIndex: "SurveyTitle",
      },
      // {
      //   title: "No. of Questions",
      //   dataIndex: "NoQues",
      // },
      // {
      //   title: "Option Description",
      //   dataIndex: "OptDesc",
      // },
      {
        title: "Category Id",
        dataIndex: "CategoryID",
      },
      // {
      //   title: "Survey Status",
      //   dataIndex: "SurveyStatus",
      // },
    ];

    return (
      <div style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <Button
            type="primary"
            shape="round"
            onClick={this.displayUserBucket}
            style={{ color: "black" }}
          >
            Display Survey List
          </Button>
        </div>

        {/* Questions View */}
        {this.state.questionViewSelected ? (
          <div>
            <SurveyQuestionInfo surveyId={this.state.selectedSurveyId} />
          </div>
        ) : (
          <div>
            <Table
              style={{ width: "90%", height: "80%" }}
              dataSource={this.state.surveyData}
              columns={surveyList}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    this.setQuestionView(record);
                  },
                };
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
