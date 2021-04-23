import React, { PureComponent } from "react";
import { Empty, Input, Table, notification, Button, Select } from "antd";
import axios from "axios";
import EditUser from "./EditUser";
import EdiText from "react-editext";
const { Option } = Select;
const { Search } = Input;

export default class UserList extends PureComponent {
  constructor() {
    super();
    this.state = {
      userInfo: [],
      callMade: false,
      searchData: "",
      hasEditbeenCalled: false,
      UserType: "",
      Current_Status: "",
      isUserFetched: "False",
    };
  }

  componentDidMount() {
    this.displayUserData();
  }

  componentDidUpdate() {
    if (this.props.userType === "edit" && !this.state.hasEditbeenCalled) {
      this.setState({
        callMade: false,
        userInfo: [],
        hasEditbeenCalled: true,
      });
    }
    if (
      this.state.userInfo?.length === 0 &&
      this.state.callMade === false &&
      this.props.userType !== "edit"
    ) {
      this.displayUserData();
      this.setState({
        callMade: true,
        hasEditbeenCalled: false,
      });
    }
  }

  displayUserData = () => {
    this.setState({
      addBucketClicked: false,
    });
    axios
      .get("http://206.189.195.166:3200/displayAllUsers")
      .then((response) => {
        if (response.status === 200) {
          //console.log(JSON.stringify(response.data));
          this.setState({
            userInfo: response.data,
          });
          console.log("User Bucket", response);
        } else {
          let surveyError = "Error while fetching user details";
          this.setState({ surveyError });
          console.log("Error while fetching user details", response);
        }
      })
      .catch((error) => {
        console.log("error occured", error);
      });
  };

  editUser = async (record, rowIndex) => {
    // console.log({weight1:record.Weights})
    // console.log({sateweight:this.state.Weights})
    console.log({ record: record });
    console.log({ record: record.UserType });
    await axios
      .put("http://206.189.195.166:3200/updateUserStatus", {
        Current_Status:
          this.state.Current_Status ||
          this.props.Current_Status ||
          record.Current_Status,
        UserType:  this.state.UserType,
        UserID: record.UserID,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            // surveyOptionsList: response.data,
            isSurveyOptionsFetched: true,
          });
          console.log("Edited user", response);
        } else {
          let surveyError = "Error while processing user update";
          this.setState({ surveyError });
          console.log("User updation failed", response);
        }
      })

      .then(() => this.displayUserData())
      .then(() => this.openUpdateNotification())
      .catch((error) => {
        console.log("error occured", error);
      });
  };

  deleteprofile = (record) => {
    console.log("In delete", record);

    axios
      .delete("http://206.189.195.166:3200/Userdelete", {
        params: {
          UserID: record.UserID,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          console.log("Deleted Survey Question", response);
        } else {
          console.log("Error occured while trying to delete User", response);
        }
      })
      .then(() => this.displayUserData())
      .then(() => this.openDeleteNotification())
      .catch((error) => {
        console.log("User deletion error occured", error);
      });
  };

  onSearch = (value) => {
    this.setState({
      searchData: value,
    });
  };

  openUpdateNotification = () => {
    notification.open({
      message: "Updated Succesfully",
      // description:
      // "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  openDeleteNotification = () => {
    notification.open({
      message: "Deleted User Succesfully",
      // description:
      // "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  render() {
    const userList = this.state.userInfo;

    const editableSurvey = userList.map((d, index) => {
      return (d = { ...d, ...{ Edit: "EDIT", key: index } });
    });
    const userData = userList.length;
    const userDataInfo = this.state.userInfo;
    let userFilterData = userDataInfo;
    let { userType } = this.props;
    const searchData = this.state.searchData;

    const handleStatusEdit = (value) => {
      this.setState({
        Current_Status: value.value,
      });
      console.log(value.value);
    };
    const handleTypeEdit = (value) => {
      this.setState({
        UserType: value.value,
      });
      console.log({ newtype: value.value });
    };

    if (searchData.length > 0) {
      userType = "all";
      userFilterData = userDataInfo.filter(
        (data) =>
          data.First_Name === searchData ||
          data.Last_Name === searchData ||
          data.UserID + "" === searchData ||
          data.LicenseID + "" === searchData
      );
    }
    if (userType !== "all" && userDataInfo.length) {
      userFilterData = userDataInfo.filter(
        (data) => data.UserType === userType
      );
    }

    const userInfohasData = userFilterData.length;

    const userColumnInfo = [
      {
        title: "User ID",
        dataIndex: "UserID",
        key: "UserID",
      },
      {
        title: "First Name",
        dataIndex: "First_Name",
        key: "First_Name",
      },
      {
        title: "Last Name",
        dataIndex: "Last_Name",
        key: "Last_Name",
      },
      {
        title: "User-Type",
        dataIndex: "UserType",
        key: "UserType",
      },
      {
        title: "Current Status",
        dataIndex: "Current_Status",
        key: "Current_Status",
      },
      {
        title: "License ID",
        dataIndex: "LicenseID",
        key: "LicenseID",
      },
    ];

    const ut = editableSurvey.map((v) => v.UserType);
    const cs = editableSurvey.map((v) => v.Current_Status);

    return (
      <div style={{ display: "flex", flexFlow: "column" }}>
        {userType === "edit" ? (
          <div style={{ width: "30%", marginTop: "50px" }}>
            <EditUser />
          </div>
        ) : (
          <div>
            <div style={{ marginLeft: "5%", marginTop: "20px", width: "50%" }}>
              <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={this.onSearch}
              />
            </div>
            <div id="body">
              {userDataInfo && userInfohasData ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Table
                    style={{ width: "100%", margin: "3%" }}
                    dataSource={userFilterData}
                    columns={userColumnInfo}
                    expandable={{
                      onExpand: (index, record) =>
                        this.displayUserData(record, index),
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
                            
                            <Select
                              labelInValue
                              defaultValue={{ value: "Active" }}
                              style={{ width: "200px" }}
                              onChange={handleStatusEdit}
                            >
                              <Option value="Active">Active</Option>
                              <Option value="Inactive">Inactive</Option>
                              <Option value="Blocked">Blocked</Option>
                            </Select>
                            </div>
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
                          <Select
                            labelInValue
                            defaultValue={{ value: "Customer" }}
                            style={{ width: "200px"}}
                            onChange={handleTypeEdit}
                          >
                            <Option value="Admin">Admin</Option>
                            <Option value="Provider">Provider</Option>
                            <Option value="Customer">Customer</Option>
                          </Select>
                          
                          </div>
                          <div>
                            <Button
                              style={{
                                display: "inline-block",
                                marginLeft: "5%",
                                marginTop: "20px",
                              }}
                              onClick={() => this.editUser(record)}
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
                              onClick={() => this.deleteprofile(record)}
                            >
                              Delete
                            </Button>
                          </div>
                        </>
                      ),
                      // rowExpandable: (record) =>
                      //   record.QText !== "Not Expandable",
                    }}
                  />
                </div>
              ) : (
                <div>
                  <Empty />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
