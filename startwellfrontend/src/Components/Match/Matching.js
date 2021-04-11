import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Form,  Input,  Button,  Checkbox,  Select,  Layout,  Menu, Row, Col, Card  } from 'antd';
import logo from '../../Assets/logo.PNG';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Header, Content, Footer } = Layout;

class Matching extends Component {
  constructor(props) {
    super(props);
    this.userdata = {};
    this.state = {
      email: '',
      UserType: '',
    }
}

displayMatchData = () => {
  this.setState({
    addBucketClicked: false
  });
  axios
    .get('http://localhost:9000/user_response')
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


render() {
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
        
   
        <Button block>Match</Button>
        
       
    </div>
  );}

}

export default Matching;
