import React, { PureComponent } from 'react';
import { Empty, Input, Table, notification, Button,Select } from 'antd';
import axios from 'axios';
import EditUser from './EditUser';
import EdiText from "react-editext";
const { Option } = Select;
const { Search } = Input;

export default class UserList extends PureComponent {
  constructor() {
    super();
    this.state = {
      userInfo: [],
      callMade: false,
      searchData: '',
      hasEditbeenCalled: false,
      UserType:'',
      Current_Status:'',
      isUserFetched:'False'


    };
  }

  componentDidMount() {
    this.displayUserData();
  }

  componentDidUpdate() {
    if (this.props.UserType === 'edit' && !this.state.hasEditbeenCalled) {
      this.setState({
        callMade: false,
        userInfo: [],
        hasEditbeenCalled: true
      });
    }
    if (this.state.userInfo?.length === 0 && this.state.callMade === false && this.props.UserType !== 'edit') {
      this.displayUserData();
      this.setState({
        callMade: true,
        hasEditbeenCalled: false
      });
    }
  }

  displayUserData = () => {
    this.setState({
      addBucketClicked: false
    });
    axios
      .get('http://localhost:3200/displayAllUsers')
      .then(response => {
        if (response.status === 200) {
          //console.log(JSON.stringify(response.data));
          this.setState({
            userInfo: response.data
          });
          console.log('User Bucket', response);
        } else {
          let surveyError = 'Error while fetching user details';
          this.setState({ surveyError });
          console.log('Error while fetching user details', response);
        }
      })
      .catch(error => {
        console.log('error occured', error);
      });
  };


  editUser = async (record,rowIndex) => {
    // console.log({weight1:record.Weights})
    // console.log({sateweight:this.state.Weights})
    console.log({record:record})
    await axios
      .put("http://localhost:3200/updateUserStatus", {
        Current_Status: this.state.Current_Status || this.props.Current_Status || record.Current_Status,
        UserType : this.state.UserType||record.UserType|| this.props.UserType,
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

  deleteprofile =  (record) => {
    console.log("In delete",record)
    
     axios
      .delete("http://localhost:3200/Userdelete", {
        params:{
          UserID: record.UserID,
      }
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          console.log("Deleted Survey Question", response);
        } else {
          console.log(
            "Error occured while trying to delete User",
            response
          );
        }
      })
      .then(() => this.displayUserData())
      .then(() => this.openDeleteNotification())
      .catch((error) => {
        console.log("User deletion error occured", error);
      });
  };


  onSearch = value => {
    this.setState({
      searchData: value
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

    const handleStatusEdit = (value) => {
      this.setState({
        Current_Status: value.value,
      });
      console.log(value.value)
      
    };
    const handleTypeEdit = (value) => {
      this.setState({
        UserType: value.value,
      });
      console.log({newtype:value.value})
    };

    const userData = userList.length;
    const userDataInfo = this.state.userInfo;
    let userFilterData = userDataInfo;
    let { UserType } = this.props;
    const searchData = this.state.searchData;

   
    if (searchData.length > 0) {
      UserType = 'all';
      userFilterData = userDataInfo.filter(
        data =>
          data.First_Name === searchData ||
          data.Last_Name === searchData ||
          data.UserID + '' === searchData ||
          data.LicenseID + '' === searchData 
      );
    }
    if (UserType !== 'all' && userDataInfo.length) {
      userFilterData = userDataInfo.filter(data => data.UserType === UserType);
    }

    const userInfohasData = userFilterData.length;

    const userColumnInfo = [
      {
        title: 'User ID',
        dataIndex: 'UserID',
        key:'UserID',
      },
      {
        title: 'First Name',
        dataIndex: 'First_Name',
        key:'First_Name',
      },
      {
        title: 'Last Name',
        dataIndex: 'Last_Name',
        key:'Last_Name',

      },
      {
        title: 'User-Type',
        dataIndex: 'UserType',
        key:'UserType',
      },
      {
        title: 'Current Status',
        dataIndex: 'Current_Status',
        key:'Current_Status',
      },
      {
        title: 'License ID',
        dataIndex: 'LicenseID',
        key:'LicenseID',
      }
    ];

    const ut = editableSurvey.map((v) => v.UserType);
    const cs=editableSurvey.map((v) => v.Current_Status);

    return (
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        {UserType === 'edit' ? (
          <div style={{ width: '50%', marginTop: '50px' }}>
            <EditUser />
          </div>
        ) : (
          <div>
            <div style={{ marginLeft: '40px', marginTop: '20px', marginRight: '1150px', width: '500px' }}>
              <Search
                placeholder='input search text'
                allowClear
                enterButton='Search'
                size='large'
                onSearch={this.onSearch}
              />
            </div>
            <div id='body'>
              {userDataInfo && userInfohasData ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Table
                    style={{ width: '1000px', marginTop: '20px' }}
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
                defaultValue={{ value: 'Active' }}
                style={{ width: '200px' }}
                onChange={handleStatusEdit}
              >
                <Option value='Active'>Active</Option>
                <Option value='Inactive'>Inactive</Option>
                <Option value='Blocked'>Blocked</Option>
              </Select>
              </div> 
                          
              <Select
                labelInValue
                defaultValue={{ value: 'Customer' }}
                style={{ width: '200px' }}
                onChange={handleTypeEdit}
              >
                <Option value='Admin'>Admin</Option>
                <Option value='Provider'>Provider</Option>
                <Option value='Customer'>Customer</Option>
              </Select>
                            
                          <div>
                            <Button
                              style={{
                                display: "inline-block",
                                marginLeft: "10%",
                                marginTop: "40px"
                              }}
                              onClick={() => this.editUser(record)}
                            >
                              Update
                            </Button>
                            <Button
                              type="primary"
                              danger
                              style={{ display: "inline-block", marginLeft: "40%" }}
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