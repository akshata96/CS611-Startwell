import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { Button, Descriptions, Divider, Select, Tag, Typography, Affix} from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined, PoweroffOutlined, FrownOutlined, MehOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb, Avatar, Card, Col, Row, Image, Collapse, Badge, Rate, Carousel, Form, Input} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import './Subscriptions.css';
import logo from '../../Assets/logo.PNG'
import { Link } from 'react-router-dom';
const {Option} = Select;
const { Header, Content, Footer, Sider } = Layout;
const{Title}=Typography;
const {SubMenu} = Menu;
var sub = 'Gold';
var allsubs = ['Gold','Silver','Free'];
var allcolors = ['gold','silver','saddlebrown'];
var subcolor = sub;
var i;
var othersubs = [];
var othercolors = [];
for(i=0;i<allsubs.length;i++)
{
    if(allsubs[i]!=sub)
    {
        othersubs.push(allsubs[i]);
        othercolors.push(allcolors[i]);
    }
}
if(sub=='Free')
{
    subcolor = 'saddlebrown';
}

class Subscriptions extends React.Component
{
    pageGen(sub)
    {
        return(
            <Row>
                <Col span={2}></Col>
                <Col span={5}>
                    <Card hoverable className = 'Cards'>
                        <Button style={{backgroundColor:subcolor}} className='headButtons'>{sub}</Button>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <h2 className='cardText'>&nbsp;&nbsp;- Feature 1</h2>
                        <br></br>
                        <h2 className='cardText'>&nbsp;&nbsp;- Feature 2</h2>
                        <br></br>
                        <h2 className='cardText'>&nbsp;&nbsp;- Feature 3</h2>
                        <br></br>
                        <h2 className='cardText'>&nbsp;&nbsp;- Feature 4</h2>
                        <br></br>
                        <h2 className='cardText'>&nbsp;&nbsp;- Feature 5</h2>
                        <br></br>
                        <h2 className='cardText'>&nbsp;&nbsp;- Feature 6</h2>
                        <br></br>
                        <h2 className='cardText'>&nbsp;&nbsp;- Feature 7</h2>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <h2 style={{fontSize:'400%', fontWeight:'normal', textAlign:'center'}} className='cardText'>$45/m</h2>
                        <br></br>
                    </Card>
                </Col>
                <Col span={3}></Col>
                <Col span={5}>
                    <Card hoverable className = 'Cards'>
                        <Button style={{backgroundColor:othercolors[0]}} className='headButtons'>{othersubs[0]}</Button>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <h2 className='cardText'>&nbsp;&nbsp;- Feature 1</h2>
                        <br></br>
                        <h2 className='cardText'>&nbsp;&nbsp;- Feature 2</h2>
                        <br></br>
                        <h2 className='cardText'>&nbsp;&nbsp;- Feature 3</h2>
                        <br></br>
                        <h2 className='cardText'>&nbsp;&nbsp;- Feature 4</h2>
                        <br></br>
                        <h2 className='cardText'>&nbsp;&nbsp;- Feature 5</h2>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <h2 style={{fontSize:'400%', fontWeight:'normal', textAlign:'center'}} className='cardText'>$25/m</h2>
                        <br></br>
                        <Button className='switchButtons'>Switch</Button>
                        <br></br>
                    </Card>
                </Col>
                <Col span={1}></Col>
                <Col span={5}>
                    <Card hoverable className = 'Cards'>
                        <Button style={{backgroundColor:othercolors[1]}} className='headButtons'>{othersubs[1]}</Button>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <h2 className='cardText'>&nbsp;&nbsp;- Feature 1</h2>
                        <br></br>
                        <h2 className='cardText'>&nbsp;&nbsp;- Feature 2</h2>
                        <br></br>
                        <h2 className='cardText'>&nbsp;&nbsp;- Feature 3</h2>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <h2 style={{fontSize:'400%', fontWeight:'normal', textAlign:'center'}} className='cardText'>FREE</h2>
                        <br></br>
                        <Button className='switchButtons'>Switch</Button>
                        <br></br>
                    </Card>
                </Col>
                <Col span={3}></Col>
            </Row>
        )
    }

    render()
    {
        return(
            <Layout style={{width:'100%', backgroundColor:'gray'}}>
                <Affix offsetTop={0}>
                    <Header style={{backgroundColor:'gray', height:'100%'}}>        
                        <Menu mode='horizontal' style={{width:'100%', height:'100%', backgroundColor:'gray'}}>
                            <img src={logo} width={70}/>
                            <text className='Toptitle'>&nbsp;&nbsp; Startwell</text>
                            <Menu.Item key='Sign Up/Log In' className='Topnav'>
                                <a href='/SignUp' style={{color:'white'}}>Sign Up/Log In</a>
                            </Menu.Item>
                            <Menu.Item key='About' className='Topnav'>
                                <a href='/About' style={{color:'white'}}>About</a>
                            </Menu.Item>
                            <Menu.Item key='Match' className='Topnav'>
                                <a href='/Match' style={{color:'white'}}>Match</a>
                            </Menu.Item>
                            <Menu.Item key='Home' className='Topnav'>
                                <a href='/Homepage' style={{color:'white'}}>Home</a>
                            </Menu.Item>
                        </Menu>
                    </Header>
                </Affix>
                <Row className='subSection'>
                    <Col span={6}></Col>
                    <Col span={12}>
                        <br></br>
                        <h1 className='subTitle'>Subscriptions</h1>
                        <Divider className='dividerclass'/>
                        <h2 className='subDesc'>At Startwell, we offer a variety of subscriptions so you can find what suits you best</h2>
                    </Col>
                    <Col span={6}></Col>
                </Row>
                <Row className='subSection'>
                    <Col span={2}></Col>
                    <Col span={5}>
                        <h3 className='currentPlan'>Current Plan:</h3>
                        <Divider className='planDivide'></Divider>
                    </Col>
                    <Col span={17}></Col>
                </Row>
                <Row className='subSection'>
                    <Col span={24}>
                        {this.pageGen(sub)}
                        <br></br>
                        <br></br>
                    </Col>
                </Row>
                <Row className='subSection'>
                    <Col span={2}></Col>
                    <Col span={19}>
                        <Button href='/UserDashboard' className='dashButton'>Back to Dashboard</Button>
                        <br></br>
                        <br></br>
                    </Col>
                    <Col span={3}></Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Footer className='footer'>
                            <h1 style={{color:'white'}}>Copyright Startwell</h1>
                        </Footer>
                    </Col>
                </Row>
    
            </Layout>
        )
    }
}
export default Subscriptions;