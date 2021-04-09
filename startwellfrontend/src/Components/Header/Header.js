import React, { Component } from 'react';
import { Menu, Layout } from 'antd';
import logo from '../../Assets/logo.PNG';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { Header } = Layout;
    return (
      <div>
        <Header style={{ backgroundColor: 'gray', height: '100%' }}>
          <Menu mode='horizontal' style={{ width: '100%', height: '100%', backgroundColor: 'gray' }}>
            <img src={logo} width={70} />
            <text className='Toptitle'>&nbsp;&nbsp; Startwell</text>
            <Menu.Item key='Sign Up/Log In' className='Topnav'>
              <a href='/Login' style={{ color: 'white' }}>
                Sign Up/Log In
              </a>
            </Menu.Item>
            <Menu.Item key='About' className='Topnav'>
              <a href='/About' style={{ color: 'white' }}>
                About
              </a>
            </Menu.Item>
            <Menu.Item key='Match' className='Topnav'>
              <a href='/Match' style={{ color: 'white' }}>
                Match
              </a>
            </Menu.Item>
            <Menu.Item key='Home' className='Topnav'>
              <a href='/Homepage' style={{ color: 'white' }}>
                Home
              </a>
            </Menu.Item>
          </Menu>
        </Header>
      </div>
    );
  }
}
