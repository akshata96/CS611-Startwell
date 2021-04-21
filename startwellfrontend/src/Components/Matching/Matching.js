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
      UserID: '',
      userInfo: [],
     
    }
}

displayMatchData = () => {
  this.setState({
    addBucketClicked: false
  });
  var x = JSON.parse(localStorage.getItem('user'))
  console.log("trying to get userid through local storage",x.UserID)
  axios
    .get(`http://localhost:9000/user_response?UserID=${x.UserID}`)
    .then(response => {
      if (response.status === 200) {
        console.log(JSON.stringify(response.data));
        this.setState({
          userInfo: response.data
        });
        console.log('fetching data', response);
        
        console.log(response[1])
        console.log(response[2])
      } else 
      {
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
        <br/> 
        <Button block onClick={this.displayMatchData}>Match</Button> 
        <div>
          <br/>
          <br/>
          {userInfohasData === 0 ?(" ") :(<div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Provider 1" bordered={false}>
        You are matched with the following provider please contact them <br/> Email: {userDataInfo[0]} 
          <br/> with score 
          <br/> {userDataInfo[1]}
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Provider 2" bordered={false}>
      You are matched with the following provider please contact them <br/> Email: {userDataInfo[2]} 
         <br/> with score 
          <br/>{userDataInfo[3]}
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Provider 3" bordered={false}>
        You are matched with the following provider please contact them <br/> Email: {userDataInfo[4]} 
        <br/> with score 
          <br/>
          {userDataInfo[5]}
        </Card>
      </Col>
    </Row>
  </div>)  }
        
    </div> 
    </div>
    
  );}

}

export default Matching;
