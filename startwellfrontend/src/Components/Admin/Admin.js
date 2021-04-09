import React, { Component } from 'react';
import Header from '../Header/Header';
import { Layout, List } from 'antd';
import UserServey from '../UserServey/UserServey';
import UserList from '../UserList/UserList';

export default class Admin extends Component {
  constructor() {
    super();
    this.state = {
      adminTabSelected: 'none'
    };
  }

  setNaviagtionClick = value => {
    localStorage.setItem('adminTabSelected', value);
    this.setState({
      adminTabSelected: value
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
    return (
      <div>
        <div id='header'>
          <Header />
        </div>
        <div id='body' style={{ display: 'flex', flexFlow: 'row' }}>
          <div>
            <Sider
              style={{ backgroundColor: 'gray', height: '210px', marginTop: '300px', width: '25%', cursor: 'pointer' }}
            >
              <List
                itemLayout='horizontal'
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={<span>{item.title}</span>}
                      onClick={() => this.setNaviagtionClick(item.title)}
                    />
                  </List.Item>
                )}
              />
            </Sider>
          </div>
          <div style={{ backgroundColor: 'white', height: '750px', width: '85%', margin: '60px' }}>
            {this.state.adminTabSelected === 'none' ? (
              <div>
                <div>
                  <h1 style={{ marginTop: '50px' }}>CONTENT</h1>
                </div>
                <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between' }}>
                  <div style={{ marginLeft: '100px', cursor: 'pointer' }}>
                    <h1> User Count</h1>
                  </div>
                  <div style={{ marginRight: '100px', cursor: 'pointer' }}>
                    <h1> Provider Count</h1>
                  </div>
                </div>
              </div>
            ) : this.state.adminTabSelected === 'User Data' ? (
              <div id='user'>
                <UserList />
              </div>
            ) : this.state.adminTabSelected === 'Survey Data' ? (
              <div id='user'>
                <UserServey />
              </div>
            ) : this.state.adminTabSelected === 'Page Content' ? (
              <div id='user'>Page Content</div>
            ) : this.state.adminTabSelected === 'New Request' ? (
              <div id='user'>New Request</div>
            ) : null}
          </div>
        </div>
        <div id='footer'></div>
      </div>
    );
  }
}
