import React, { Component } from 'react';
import { Menu, Layout } from 'antd';
import logo from '../../Assets/logo_color3.jpg';

export default class Header2 extends Component {
  constructor(props){
    super(props);
    var x = JSON.parse(localStorage.getItem('user')).token
      this.state = {
        token:x,
      };
      
      
  }
  
  render() {
    const { Header } = Layout;
    
    return (
      <div>
         <Header style={{ backgroundColor: 'gray', height: '100%' }}>
          <Menu mode='horizontal' style={{ width: '100%', height: '100%', backgroundColor: 'gray' }}>
         <a href = {'/Homepage?token=' + String(this.state.token)}> <img src={logo} width={180} /> </a>
            <Menu.Item key='Sign Up/Log In' className='Topnav'>
              <a href={'/Login'} style={{ color: 'white' }}>
                Log In
              </a>
            </Menu.Item>
            <Menu.Item key='About' className='Topnav'>
              <a href={'/About?token=' + String(this.state.token)} style={{ color: 'white' }}>
                About
              </a>
            </Menu.Item>
            <Menu.Item key='Home' className='Topnav'>
              <a href={'/Homepage?token=' + String(this.state.token)} style={{ color: 'white' }}>
                Home
              </a>
            </Menu.Item>
          </Menu>
        </Header>
      </div>
    );
  }
}
