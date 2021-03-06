import React, { Component } from 'react';
import { Menu, Layout } from 'antd';
import logo from '../../Assets/logo_color3.jpg';

export default class Header2 extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    };
      //this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);   
  }

  // handleSuccessfulAuth() {
  //   var data=JSON.parse(localStorage.getItem('user'))
  //   var x = JSON.parse(localStorage.getItem('user')).token
  //   var usertype=JSON.parse(localStorage.getItem('user')).UserType
  //   var fname=JSON.parse(localStorage.getItem('user')).First_Name
      
  //   //this.props.handleLogin(data);
  //   var data=JSON.parse(localStorage.getItem('user'))
  //   console.log("data in auth",data)
  //   console.log("checking for usertype",data.UserType)
  //   if(data.UserType === "Customer")
  //   {
  //     window.location = `/UserDashboard?token=${data.token}`}
  //   if(data.UserType ==="Admin")
  //   {
  //     window.location = `/Admin?token=${data.token}`
  //   }
  //   if(data.UserType === "Provider")
  //   {
  //     window.location = `/ProviderDashboard?token=${data.token}`
  //   }
   
  //       //window.location = `/Matching?token=${data.token}`
    
  // }

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
