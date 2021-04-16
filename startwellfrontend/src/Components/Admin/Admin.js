import React, { Component } from 'react';
import Header from '../Header/Header';
import { Layout, List, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UserList from '../UserList/UserList';
import { Link } from 'react-router-dom';
import ContactUsList from '../ContactUs/ContactUsList';
import UserBucketInfo from '../UserBucketInfo/UserBucketInfo';
import PageContent from '../PageContent/PageContent';
import AddPageContent from '../PageContent/AddPageContent';
import AddCategory from '../AddAll/AddCategory';
import AddQuest from '../AddAll/AddQuest';
import AddSurvey from '../AddAll/AddSurvey';
import AddBucket from '../AddAll/AddBucket'
import AddOption from '../AddAll/AddOption'

const { SubMenu } = Menu;

export default class Admin extends Component {
  constructor() {
    super();
    this.state = {
      adminTabSelected: 'none',
      userTypeValue: 'all',
      pageContentValue: ''
    };
  }

  setNaviagtionClick = value => {
    localStorage.setItem('adminTabSelected', value);
    this.setState({
      adminTabSelected: value
    });
  };
  setNaviagtionClickForUser = (value, type) => {
    localStorage.setItem('adminTabSelected', value);
    this.setState({
      adminTabSelected: value,
      userTypeValue: type
    });
  };

  setNaviagtionClickForSurvey = (value, type) => {
    localStorage.setItem('adminTabSelected', value);
    this.setState({
      adminTabSelected: value,
      bucketTypeSelected: type
    });
  };

  setNaviagtionForPageContent = (value, type) => {
    localStorage.setItem('adminTabSelected', value);
    this.setState({
      adminTabSelected: value,
      pageContentValue: type
    });
  };

  render() {
    const { Sider } = Layout;
    const data = [
      {
        title: 'User Data'
      },
      {
        title: 'Survey Data'
      },
      {
        title: 'Page Content'
      },
      {
        title: 'New Request'
      }
    ];
    const userData = JSON.parse(window.localStorage.user);
    const userType = this.state.userTypeValue;
    return (
      <div>
        <div id='header'>
          <Header />
        </div>
        <div id='body' style={{ display: 'flex', flexFlow: 'row' }}>
          <div style={{ width: '15%' }}>
            <Sider width='100%' style={{ background: '#A9A9A9', marginTop: '10px' }}>
              <Menu mode='inline' style={{ height: '100%', borderRight: 0 }}>
                <SubMenu
                  key='sub1'
                  title={
                    <span>
                      <UserOutlined />
                      User Data
                    </span>
                  }
                >
                  <Menu.Item
                    key='1'
                    onClick={() => {
                      this.setNaviagtionClickForUser('User Data', 'Provider');
                    }}
                  >
                    Get Provider Data
                  </Menu.Item>
                  <Menu.Item
                    key='2'
                    onClick={() => {
                      this.setNaviagtionClickForUser('User Data', 'Customer');
                    }}
                  >
                    Get Customer Data
                  </Menu.Item>
                  <Menu.Item
                    key='3'
                    onClick={() => {
                      this.setNaviagtionClickForUser('User Data', 'all');
                    }}
                  >
                    Get All Data
                  </Menu.Item>
                  <Menu.Item
                    key='3'
                    onClick={() => {
                      this.setNaviagtionClickForUser('User Data', 'edit');
                    }}
                  >
                    Edit User Status
                  </Menu.Item>
                </SubMenu>
              </Menu>
              <Menu mode='inline' style={{ height: '100%', borderRight: 0 }}>
                <SubMenu
                  key='sub1'
                  title={
                    <span>
                      <UserOutlined />
                      Survey Data
                    </span>
                  }
                >
                  <Menu.Item
                    key='1'
                    onClick={() => {
                      this.setNaviagtionClickForSurvey('Survey Data', 'surveyList');
                    }}
                  >
                    Fetch Survey Info
                  </Menu.Item>
                  <Menu.Item
                    key='2'
                    onClick={() => {
                      this.setNaviagtionClickForSurvey('Survey Data', 'AddCategory');
                    }}
                  >
                    Add Category
                  </Menu.Item>
                  <Menu.Item
                    key='3'
                    onClick={() => {
                      this.setNaviagtionClickForSurvey('Survey Data', 'AddSurvey');
                    }}
                  >
                    Add Survey
                  </Menu.Item>
                  <Menu.Item
                    key='4'
                    onClick={() => {
                      this.setNaviagtionClickForSurvey('Survey Data', 'AddQuest');
                    }}
                  >
                    Add Question
                  </Menu.Item>
                  <Menu.Item
                    key='5'
                    onClick={() => {
                      this.setNaviagtionClickForSurvey('Survey Data', 'AddOption');
                    }}
                  >
                    Add Option
                  </Menu.Item>
                  <Menu.Item
                    key='6'
                    onClick={() => {
                      this.setNaviagtionClickForSurvey('Survey Data', 'AddBucket');
                    }}
                  >
                    Add Bucket
                  </Menu.Item>
                </SubMenu>
              </Menu>
              <Menu mode='inline' style={{ height: '100%', borderRight: 0 }}>
                <SubMenu
                  key='sub1'
                  title={
                    <span>
                      <UserOutlined />
                      Cross Reference Table
                    </span>
                  }
                >
                  <Menu.Item
                    key='1'
                    onClick={() => {
                      this.setNaviagtionForPageContent('Page Content', 'displayCrossReference');
                    }}
                  >
                    Display Cross Reference
                  </Menu.Item>
                  <Menu.Item
                    key='2'
                    onClick={() => {
                      this.setNaviagtionForPageContent('Page Content', 'addCrossReference');
                    }}
                  >
                    Add Cross Reference
                  </Menu.Item>
                </SubMenu>
              </Menu>
              <Menu mode='inline' style={{ height: '100%', borderRight: 0 }}>
                <SubMenu
                  key='sub1'
                  title={
                    <span>
                      <UserOutlined />
                      Contact Us Request
                    </span>
                  }
                >
                  <Menu.Item
                    key='1'
                    onClick={() => {
                      this.setNaviagtionClick('New Request');
                    }}
                  >
                    Display New Requests
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
          </div>
          <div style={{ backgroundColor: 'white', height: '725px', width: '85%', margin: '10px' }}>
            {this.state.adminTabSelected === 'none' ? (
              <div>
                <div>
                  <h1 style={{ marginTop: '50px' }}>Welcome Admin .</h1>
                </div>
              </div>
            ) : this.state.adminTabSelected === 'User Data' ? (
              <div id='user'>
                <UserList userType={userType} />
              </div>
            ) : this.state.adminTabSelected === 'Survey Data' ? (
              <div id='user'>
                {this.state.bucketTypeSelected==='surveyList' ? <UserBucketInfo /> : 
                this.state.bucketTypeSelected==='AddCategory' ? <AddCategory />:
                 this.state.bucketTypeSelected==='AddSurvey' ? <AddSurvey />:
                 this.state.bucketTypeSelected==='AddQuest' ? <AddQuest /> : 
                 this.state.bucketTypeSelected==='AddOption' ? <AddOption />:<AddBucket />
                }
                
              </div>
            ) : this.state.adminTabSelected === 'Page Content' ? (
              <div id='user'>
                {this.state.pageContentValue === 'displayCrossReference' ? <PageContent /> : <AddPageContent />}
              </div>
            ) : this.state.adminTabSelected === 'New Request' ? (
              <div id='user'>
                <ContactUsList />
              </div>
            ) : null}
          </div>
        </div>
        <div id='footer'></div>
      </div>
    );
  }
}
