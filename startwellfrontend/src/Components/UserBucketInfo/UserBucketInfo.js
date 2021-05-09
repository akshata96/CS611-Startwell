import React, {  Component } from "react";
import { Table, Button, notification } from "antd";
import axios from "axios";
import SurveyQuestionInfo from "./SurveyQuestionInfo";
import EdiText from "react-editext";


export default class UserBucketInfo extends Component {
  constructor() {
    super();
    this.state = {
      userBucketInfo: [],
      shouldShowCategoryView: false,
      bucketType: [],
      categoryData: [],
      surveyData: [],
      displaySurveyData:[],
      questionViewSelected: false,
      displaySurveyList: true,
      SurveyID:"",
      SurveyTitle:"",
      CategoryID:"",
      BucketType:"",
    };
  }

  componentDidMount() {
    this.setState({
      shouldShowCategoryView: false,
    });
    this.displaySurveyData();
  }

  componentDidUpdate() {
    if (
       !this.state.displaySurveyData) {
    this.displaySurveyData();

      this.setState({
        shouldShowCategoryView: false,
      });
    }
  }
     // editing Survey  for the admin dashboard
  editSurvey = async (record,rowIndex) => {
    console.log("testedit", record)
    console.log("checking",this.state.SurveyTitle)
    await axios
      .put("http://localhost:3200/EditSurveyDetails", {
        SurveyID: record.SurveyID ,
        SurveyTitle:this.state.SurveyTitle || record.SurveyTitle,
        BucketType: this.state.BucketType || record.BucketType,
        CategoryID: this.state.CategoryID || record.CategoryID,
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
      .then(()=> this.displaySurveyData())
      .then(() => this.openUpdateNotification())
      .catch((error) => {
        console.log("error occured", error);
      });
  };
     // deleting who;e survey for the admin dashboard

  deleteSurvey = async (record) => {
    console.log("In delete",record)
    console.log()
    await axios
      .delete("http://localhost:3200/deleteWholeSurvey", {
        params:{
        SurveyID: record.SurveyID || this.state.SurveyID,}
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
      .then(()=> this.displaySurveyData())
      .then(() => this.openDeleteNotification())
      .catch((error) => {
        console.log("Survey question deletion error occured", error);
      });
  };


  displayUserBucket = async () => {
    this.setState({
      questionViewSelected: false,
    });
    axios
      .get('http://localhost:3200/displayUserbucket')
      .then(response => {
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
            `http://localhost:3200/CateogryUnderEachBucket?BucketType=${b}`
          )
        );

        await Promise.all(promiseArray)
          .then((results) => {
            const data = results.map((el) => el.data);
            this.setState({ categoryData: data });
            console.log({CATDATA: this.state.categoryData});
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
            `http://localhost:3200/SurveyUnderEachCateogry?CategoryID=${c}`
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

       // displaying all Surveys for the admin dashboard

  displaySurveyData = async () => {
    await axios
    .get("http://localhost:3200/displayingAllSurveys")
    .then((response) => {
      if (response.status === 200) {
        console.log(JSON.stringify(response.data));
        this.setState({
         displaySurveyData: response.data,
          // shouldShowCategoryView: false,
        });
        console.log("User Survey Bucket", response);
      } else {
        let surveyError = "Error while fetching survey details";
        this.setState({ surveyError });
        console.log("Error while fetching survey details", response);
      }
    })
    .catch((error) => {
      console.log("error occured", error);
    });
  }

  setQuestionView = (values) => {
    this.setState({
      selectedSurveyId: values.SurveyID,
      questionViewSelected: true,
    });
  };
  openUpdateNotification = () => {
    notification.open({
      message: "Updated Survey Succesfully",
      // description:
      // "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  
  openDeleteNotification = () => {
    notification.open({
      message: "Survey Deleted Succesfully",
      // description:
      // "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  
  render() {
    console.log("bucket info",this.state.userBucketInfo)
  const surveyList1=this.state.displaySurveyData;
  const editableSurvey = surveyList1.map((d, index) => {
    return (d = { ...d, ...{ Edit: "EDIT", key: index } });
  });

  const userSurveyDataAvailable = surveyList1.length;
   
  console.log({ Survey: editableSurvey });
  console.log({ q1: this.state.SurveyTitle, q2: this.props.SurveyTitle });
  const handleSurveyTitle = (value) => {
    this.setState({
      SurveyTitle: value,
    });
  };
  const handleBucketType = (value) => {
    this.setState({
      BucketType: value,
    });
    console.log({newweight:this.state.BucketType})
  };

  const handleCategoryID = (value) => {
    this.setState({
      CategoryID: value,
    });
    console.log({newweight:this.state.CategoryID})
  };

    const surveyList = [
      {
        title: "Survey Id",                  // Survey Id of User Survey table
        dataIndex: "SurveyID",
        key:"SurveyID",
      },
      {
        title: "Survey Title",                  //Survey Title of User Survey table
        dataIndex: "SurveyTitle",
        key:"SurveyTitle",
      },
      {
        title: "Category Id",                  //Category Id of User Survey table
        dataIndex: "CategoryID",
        key:"CategoryID",
      },
      {
        title: "Bucket Type",                  //Bucket Type of User Survey table
        dataIndex: "BucketType",
        key:"BucketType",
      },
    ];

    const surveytitle = editableSurvey.map((v) => v.SurveyTitle);
    const buckettype=editableSurvey.map((v) => v.BucketType);
    const categoryid=editableSurvey.map((v) => v.CategoryID);

    console.log({survey: editableSurvey});
    return (
      <div style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", justifyContent: "flex-start", marginLeft: "5%" }}>
          <Button
            type="primary"
            shape="round"
            onClick={this.displayUserBucket}
          >
            Display Survey List
          </Button>
        </div>

            {/*Surveys displayed in editable table format */}

        {this.state.questionViewSelected ? (
          <div>
            <SurveyQuestionInfo surveyId={this.state.selectedSurveyId} />
          </div>
        ) : (
          <div>
            <Table
              style={{ width: "95%", height: "80%" , margin: "25px" }}
              dataSource={editableSurvey}
              columns={surveyList}
              
              onRow={(record, index) => {
                return {
                  onClick: (event) => {
                    this.setQuestionView(record);
                  },
                };
              }}

              expandable={{
                onExpand: (index, record) =>
                  this.displaySurveyData(record, index),
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
                        margin: "20px",

                      }}
                    >
                      <EdiText
                        value={`${surveytitle[rowIndex]}`}
                        type="text"
                        onSave={ handleSurveyTitle}
                      />
                     
                    </div> 
                 
                   
                    <div>
                      <Button
                        style={{
                          display: "inline-block",
                          marginRight: "20px",
                        }}
                        onClick={() => this.editSurvey(record,rowIndex)}
                      >
                        Update
                      </Button>
                      
                      <Button
                        type="primary"
                        danger
                        style={{ display: "inline-block", marginLeft: "40%" }}
                        onClick={() => this.deleteSurvey(record)}
                      >
                        Delete
                      </Button>
                    </div>
                  </>
                ),
              }}
             
            
            />
          </div>
          
        )}
      </div>
    );
  }
}