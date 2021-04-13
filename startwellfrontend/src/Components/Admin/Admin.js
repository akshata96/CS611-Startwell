import React, { Component } from 'react';
import Header from '../Header/Header';
import { Layout, List, Menu } from 'antd';
import UserServey from '../UserServey/UserServey';
import { UserOutlined } from '@ant-design/icons';
import UserList from '../UserList/UserList';
import { Link } from 'react-router-dom';
import ContactUsList from '../ContactUs/ContactUsList';

const { SubMenu } = Menu;

export default class Admin extends Component {
  constructor() {
    super();
    this.state = {
      adminTabSelected: 'none',
      userTypeValue: 'all'
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
                </SubMenu>
              </Menu>
              <Menu mode='inline' style={{ height: '100%', borderRight: 0 }}>
                <SubMenu
                  key='sub1'
                  title={
                    <span>
                      <UserOutlined />
                      Page Content
                    </span>
                  }
                >
                  <Menu.Item key='1'>
                    <Link to='ChangePersonalDetails'>Fetch User Details</Link>
                  </Menu.Item>
                  <Menu.Item key='2'>
                    <Link to='Survey'>Change User Status</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
              <Menu mode='inline' style={{ height: '100%', borderRight: 0 }}>
                <SubMenu
                  key='sub1'
                  title={
                    <span>
                      <UserOutlined />
                      New Request
                    </span>
                  }
                >
                  <Menu.Item
                    key='1'
                    onClick={() => {
                      this.setNaviagtionClick('New Request');
                    }}
                  >
                    Get Customer Data
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
          </div>
          <div style={{ backgroundColor: 'white', height: '725px', width: '85%', margin: '10px' }}>
            {this.state.adminTabSelected === 'none' ? (
              <div>
                <div>
                  <h1 style={{ marginTop: '50px' }}>Welcome Admin.</h1>
                </div>
              </div>
            ) : this.state.adminTabSelected === 'User Data' ? (
              <div id='user'>
                <UserList userType={userType} />
              </div>
            ) : this.state.adminTabSelected === 'Survey Data' ? (
              <div id='user'>
                <UserServey />
              </div>
            ) : this.state.adminTabSelected === 'Page Content' ? (
              <div id='user'>Page Content</div>
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
