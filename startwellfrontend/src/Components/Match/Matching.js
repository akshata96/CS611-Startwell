import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Form,  Input,  Button,  Checkbox,  Select,  Layout,  Menu, Row, Col, Card, Table  } from 'antd';
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
      userInfo: [],
     
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
        console.log('fetching data', response);
      } else {
        let Error = 'Error while fetching  details';
        this.setState({ Error });
        console.log('Error while fetching details', response);
      }
    })
    .catch(error => {
      console.log('error occured', error);
    });
};


render() {
  const userDataInfo = this.state.userInfo;
  const userInfohasData = userDataInfo.length;
  const userColumnInfo = [
    {
      title: 'EmailID',
      dataIndex: 'EmailID'
    },
   
    {
      title: 'Score',
      dataIndex: 'Score'
    }
  ];

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
        <Button block onClick={this.displayMatchData}>Match</Button> 
        <div>
        {userDataInfo && userInfohasData ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Table
                style={{ width: '1000px', marginTop: '20px' }}
                dataSource={userDataInfo}
                columns={userColumnInfo}
              />
            </div>
          ) : null}
    </div> 
    </div>
    
  );}

}

export default Matching;
