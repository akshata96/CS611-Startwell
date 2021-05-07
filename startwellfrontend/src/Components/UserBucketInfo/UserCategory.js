import React, { Component } from "react";
import { Table, Empty } from "antd";
import axios from "axios";
import SurveyCategory from "./SurveyCategory";

export default class UserCategory extends Component {
  constructor() {
    super();
    this.state = {
      isUserCategoryInfoDataFetched: false,
      userCategoryInfo: [],
      selectedCategoryId: "",
      surveyCategoryViewSelected: false,
    };
  }

  componentDidMount = () => {
    this.displayUserCategory();
  };

  componentDidUpdate = () => {
    if (
      !this.state.isUserCategoryInfoDataFetched &&
      !this.state.userCategoryInfo.length
    ) {
      this.displayUserCategory();
    }
  };
     // displaying survey Category for the admin dashboard
  displayUserCategory = () => {
    axios
      .get(`http://206.189.195.166:3200/CateogryUnderEachBucket?BucketType=${this.props.bucketType}`)
      .then(response => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            userCategoryInfo: response.data,
            isUserCategoryInfoDataFetched: true,
          });
          console.log("User Survey Bucket", response);
        } else {
          let surveyError = "Error while processing user survey bucket";
          this.setState({ surveyError });
          console.log("User Survey bucket API failed", response);
        }
      })
      .catch((error) => {
        console.log("error occured", error);
      });
  };

  setQuestionView = (values) => {
    this.setState({
      selectedCategoryId: values.CategoryID,
      surveyCategoryViewSelected: true,
    });
  };

  render() {
    const userCategoryInfoColumn = [
      {
        title: "#",                  // SNo of User Survey Category
        dataIndex: "SNo",
      },
      {
        title: "Category ID",                  // Category Id of User Survey Category
        dataIndex: "CategoryID",
      },
      {
        title: "Bucket Type",                  // Bucket Type of User Survey Category
        dataIndex: "BucketType",
      },
      {
        title: "Category Description",                  // Category Descriptionof User Survey Category
        dataIndex: "CatDesc",
      },
    ];

    const userCategoryInfoRawData = this.state.userCategoryInfo;
    const userCategoryDataAvailable = userCategoryInfoRawData.length;

    return (
      <div style={{ marginTop: "20px" }}>
        {this.state.surveyCategoryViewSelected ? (
          <div>

                     {/* User Survey Category table are displayed in table format */}
                     
            <SurveyCategory categoryId={this.state.selectedCategoryId} />
          </div>
        ) : (
          <div>
            {!userCategoryDataAvailable ? (
              <Empty />
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {`User Category data for ${this.props.bucketType} Bucket type`}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Table
                    style={{ width: "70%", height: "80%" }}
                    dataSource={userCategoryInfoRawData}
                    columns={userCategoryInfoColumn}
                    onRow={(record, rowIndex) => {
                      console.log({
                        userCategoryInfoRawData: userCategoryInfoRawData,
                      });
                      console.log({ record: record });
                      return {
                        onClick: (event) => {
                          this.setQuestionView(record);
                        },
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
