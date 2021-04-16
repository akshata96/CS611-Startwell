import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { Button, Descriptions, Divider, Tag, Typography, Affix} from 'antd';
import { UserOutlined, LogoutOutlined, PlusSquareOutlined, MonitorOutlined} from '@ant-design/icons';
import { Layout, Menu, Breadcrumb, Avatar, Card, Col, Row, Image, Collapse, Badge, Rate} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import './UserDashboard.css';
import logo from '../../Assets/SmartLogo.png'
import axios from 'axios';
import { Redirect } from "react-router-dom";
import profimg from '../../Assets/prof.png'
import { Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const{Title}=Typography;
const {SubMenu} = Menu;
var currentUser = 'Kkmehta12';
var first_name = 'Kunal'
var last_name = 'Mehta'
var dob = '01/12/1998'
var sex = 'M'
var subscription = 'Gold'
var subscriptionColor = subscription;
var SurveyDesc = 'Lorem ipsum dolor sit amet'
if(subscription=='Free')
{
    subscriptionColor='Brown'
}
var linkedprovider = 'AHunt'
var providerfname = 'Alan'
var providerlname = 'Hunt'
var providerrating = 5;
var Ratetext = 'Rate ' + providerfname + ' ' + providerlname + '?';
var userimg = 'https://i.pinimg.com/474x/0e/94/ee/0e94ee478645638ce3c4fb911b2baa55.jpg';
var provimg = 'https://cutewallpaper.org/21/deathwing/And-a-detail-wowtcg-warcraft-worldofwarcraft-.jpg'

const { Panel } = Collapse;

class UserDashboard extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
          token:"",
          fname: "",
          lname: "",
          DOB:"",
          Sex: "",
          Subscription: "",
          changelink:"",
          redirect:null,
          surveylist: [],
          desclist:[]
        };
    }

    componentDidMount(){
        const queryParams = new URLSearchParams(window.location.search);
        var usid = queryParams.get('token');
        this.setState({token:usid});


        axios.get("http://localhost:9000/displayAllSurvey", {
        headers:{
            token: usid,
        } 
        }).then(
            res =>{
                var tit = [];
                var desc = [];
                const q = res.data;
                var i;
                for(i=0;i<q.length;i++)
                {
                    tit.push(q[0].SurveyTitle);
                    desc.push(q[0].OptDesc);
                }
                this.setState({surveylist:tit});
                this.setState({desclist:desc});
                // console.log(this.state.surveylist);
            }
        )


        axios.get("http://localhost:9000/profiledetails", {
        headers:{
            token: usid,
        } 
        }).then(
            res =>{
              const q = res.data;
              var date = q.dob;
              if(date==null)
              {
                date = "Update your details!"
              }
              var sx = q.sex;
              if(sx==null)
              {
                sx = "Update your details!"
              }
              this.setState({fname: q.First_Name});
              this.setState({lname: q.lastname});
              this.setState({DOB: date});
              this.setState({Sex: sx})
              var chang = "/ChangePersonalDetails?usertype=C&token=" + String(usid);
              this.setState({changelink: chang})
            }
        )
    }

    delAcc = (e) => {
        var tokn = this.state.token;
        axios.delete("http://localhost:9000/profiledelete", {
        headers:{
            token: tokn,
        } 
        }).then(res => {
            this.setState({redirect:"/homepage"})
        })
    }

    render()
    {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        
        return(
            <Layout style={{width:"100%", height:'100vh'}}>
                <Row>
                    <Col span={24}>
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
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Layout height='100%'>
                            <Row>
                                <Col span={4}>
                                    <Sider width='100%' style={{background:"#A9A9A9"}}>
                                        <Menu mode="inline" style={{height:"100%", borderRight:0}}>
                                            <SubMenu key="sub1" title={<span><UserOutlined/>Account Details</span>}>
                                                <Menu.Item key="1"><Link to={this.state.changelink}>Change Personal Details</Link></Menu.Item>
                                                <Menu.Item key="2"><Link to={'/Survey?surveyid=1&token=' + String(this.state.token)+"&usertype=C"}>Change Preferences</Link></Menu.Item>
                                                <Menu.Item key="3"><Link to={'/Subscriptions?token=' + String(this.state.token)}>Change Subscription</Link></Menu.Item>
                                                <Menu.Item key="4" onClick={this.delAcc}>Delete Account</Menu.Item>
                                            </SubMenu>
                                            <SubMenu key="sub2" title={<span><PlusSquareOutlined/>Treatment Plan</span>}>
                                                <Menu.Item key="5">Goal1</Menu.Item>
                                                <Menu.Item key="6">Goal2</Menu.Item>
                                                <Menu.Item key="7">Goal3</Menu.Item>
                                                <Menu.Item key="8">Goal4</Menu.Item>
                                            </SubMenu>
                                            <SubMenu key="sub3" title={<span><MonitorOutlined />Monitor</span>}>
                                                <Menu.Item key="9">option9</Menu.Item>
                                                <Menu.Item key="10">option10</Menu.Item>
                                                <Menu.Item key="11">option11</Menu.Item>
                                                <Menu.Item key="12">option12</Menu.Item>
                                            </SubMenu>
                                            <Menu.Item key="13">
                                                <LogoutOutlined /><Link to='SignOut'>Sign Out</Link>
                                            </Menu.Item>
                                        </Menu>
                                    </Sider> 
                                </Col>
                                <Col span={20}>     
                                    <h3 className='welcometext'>&nbsp;&nbsp;&nbsp;Welcome, {this.state.fname}!</h3>  
                                    <Layout style={{width:'80vw', height:'80vh', padding: '24px 24px 24px', background:'darkgray'}}>
                                        <Row style={{ background: 'white', padding: 24}}>
                                            <Col span={24}>
                                                <div className="site-card-wrapper">
                                                    <Row gutter = {16} height={'80%'}>
                                                        <Card hoverable style={{ width: '45%', height:'80%'}}>
                                                            <Image width={'50%'} height={'50%'} src={userimg} fallback="data:image/png;base64,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"/>
                                                            <br></br>
                                                            <br></br>
                                                            <br></br>
                                                            <Descriptions width={'50%'} bordered size="middle" layout="horizontal" column={1}>
                                                                <Descriptions.Item label="First_Name">{this.state.fname}</Descriptions.Item>
                                                                <Descriptions.Item label="Last_Name">{this.state.lname}</Descriptions.Item>
                                                                <Descriptions.Item label="DOB">{this.state.DOB}</Descriptions.Item>
                                                                <Descriptions.Item label="Sex">{this.state.Sex}</Descriptions.Item>
                                                                <Descriptions.Item label="Subscription"><Badge status="processing"/><Tag color={subscriptionColor}>{subscription}</Tag></Descriptions.Item>
    
                                                            </Descriptions>
                                                        </Card>
                                                        <Col span = {12}>
                                                        <Row>
                                                            <Card hoverable style={{ width: '100%', float:'right'}}>
                                                                <text className="SurveysTitle">Surveys</text>
                                                                <Collapse accordion>
                                                                    <Panel header={this.state.surveylist[0]} key="1">
                                                                    <p><text>{this.state.desclist[0]}</text></p>
                                                                    <Button href={'/Survey?surveyid=1&token=' + String(this.state.token)+"&usertype=C"} type='link'>Take Survey</Button>
                                                                    </Panel>
                                                                    <Panel header={this.state.surveylist[1]} key="2">
                                                                    <p><text>{this.state.desclist[1]}</text></p>
                                                                    <Button href={'/Survey?surveyid=2&token=' + String(this.state.token)+"&usertype=C"} type='link'>Take Survey</Button>
                                                                    </Panel>
                                                                    <Panel header="Need to talk? We're here" key="3">
                                                                    <Button href='/homepage#contactUs' type='link'>Contact Us</Button>
                                                                    </Panel>
                                                                    <Panel header="Ready for therapy? Let's match you!" key="4">
                                                                    <Button type='link'>Take Survey</Button>
                                                                    </Panel>
                                                                </Collapse>
                                                            </Card>
                                                        </Row>
                                                        <Row>
                                                            <Card hoverable style={{ width: '100%', float:'right'}}>
                                                                <Row>
                                                                    <Col span = {8}>
                                                                        <Image width={'90%'} height={'90%'} src={provimg} fallback="data:image/png;base64,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"/>
                                                                        <text className="SurveysTitle" style={{textAlign:"center"}}>{linkedprovider}</text>
                                                                    </Col>
                                                                    <Col span = {14} offset = {2}>
                                                                    <Descriptions bordered size='small' layout="horizontal" column={1}>
                                                                        <Descriptions.Item label="First_Name">{providerfname}</Descriptions.Item>
                                                                        <Descriptions.Item label="Last_Name">{providerlname}</Descriptions.Item>
                                                                        <Descriptions.Item label="Avg. Rating"><Rate disabled count={5} value={providerrating}/></Descriptions.Item>
                                                                    </Descriptions>
                                                                    <p></p>
                                                                    <Collapse accordion>
                                                                        <Panel header={Ratetext} key="1">
                                                                            <p><text>Link to Survey</text></p>
                                                                            <Button href={'/Survey?surveyid=1&token=' + String(this.state.token)+"&usertype=C"} type='link'>{'Rate ' + providerfname + ' ' + providerlname}</Button>
                                                                        </Panel>
                                                                    </Collapse>
                                                                    </Col>
                                                                </Row>
                                                            </Card>
                                                        </Row>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Layout> 
                                </Col>
                            </Row>
                        </Layout>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default UserDashboard