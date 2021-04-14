import React, { PureComponent } from 'react';
import { Empty, Input, Table } from 'antd';
import axios from 'axios';
import EditUser from './EditUser';

const { Search } = Input;

export default class UserList extends PureComponent {
  constructor() {
    super();
    this.state = {
      userInfo: [],
      callMade: false,
      searchData: '',
      hasEditbeenCalled: false
    };
  }

  componentDidMount() {
    this.displayUserData();
  }

  componentDidUpdate() {
    if (this.props.userType === 'edit' && !this.state.hasEditbeenCalled) {
      this.setState({
        callMade: false,
        userInfo: [],
        hasEditbeenCalled: true
      });
    }
    if (this.state.userInfo?.length === 0 && this.state.callMade === false && this.props.userType !== 'edit') {
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
      .get('http://localhost:9000/displayAllUsers')
      .then(response => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            userInfo: response.data
          });
          console.log('Survey Bucket', response);
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

  onSearch = value => {
    this.setState({
      searchData: value
    });
  };

  render() {
    const userDataInfo = this.state.userInfo;
    let userFilterData = userDataInfo;
    let { userType } = this.props;
    const searchData = this.state.searchData;
    if (searchData.length > 2) {
      userType = 'all';
      userFilterData = userDataInfo.filter(data => data.First_Name === searchData || data.Last_Name === searchData);
    }
    if (userType !== 'all' && userDataInfo.length) {
      userFilterData = userDataInfo.filter(data => data.UserType === userType);
    }

    const userInfohasData = userFilterData.length;

    const userColumnInfo = [
      {
        title: 'User ID',
        dataIndex: 'UserID'
      },
      {
        title: 'First Name',
        dataIndex: 'First_Name'
      },
      {
        title: 'Last Name',
        dataIndex: 'Last_Name'
      },
      {
        title: 'Type',
        dataIndex: 'UserType'
      },
      {
        title: 'Current Status',
        dataIndex: 'Current_Status'
      }
    ];
    return (
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        {userType === 'edit' ? (
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
