import React, { Component } from 'react';
import { Menu, Layout } from 'antd';
import logo from '../../Assets/logo_color3.jpg';

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
         <a href = '/Homepage'> <img src={logo} width={180} /> </a>
            <Menu.Item key='Sign Up/Log In' className='Topnav'>
              <a href='/Login' style={{ color: 'white' }}>
                Log In
              </a>
            </Menu.Item>
            <Menu.Item key='About' className='Topnav'>
              <a href='/About' style={{ color: 'white' }}>
                About
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
