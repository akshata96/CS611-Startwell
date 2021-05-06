import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { Button, Descriptions, Divider, Tag, Typography, Affix} from 'antd';
import { UserOutlined, LogoutOutlined, PlusSquareOutlined, MonitorOutlined} from '@ant-design/icons';
import { Layout, Menu, Breadcrumb, Avatar, Card, Col, Row, Image, Collapse, Badge, Rate} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import './ProviderDashboard.css';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import logo from '../../Assets/logo_color3.jpg'
import profimg from '../../Assets/prof.png'
import { Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const{Title}=Typography;
const {SubMenu} = Menu;
var subscription = 'Gold'
var subscriptionColor = subscription;
if(subscription=='Free')
{
    subscriptionColor='Brown'
}

var userimg = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';
var linkedUsersNumber = 5;
const { Panel } = Collapse;
// Dummy linked users as described in code explanation document
const LinkedUsers = [
    {
        fname: 'McTominay',
        lname: 'User1',
        profpic: '',
    },
    {
        fname: 'Fred',
        lname: 'User2',
        profpic: '',
    },
    {
        fname: 'Martial',
        lname: 'User3',
        profpic: '',
    },
    {
        fname: 'Marcus',
        lname: 'User4',
        profpic: '',
    },
    {
        fname: 'Edinson',
        lname: 'User5',
        profpic: '',
    },
    {
        fname: 'Bruno',
        lname: 'User6',
        profpic: '',
    },
    {
        fname: 'Greenwood',
        lname: 'User7',
        profpic: '',
    }
]



class ProviderDashboard extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
          token:"", // All attributes of provider stored in parent component state
          fname: "",
          lname: "",
          DOB:"",
          Sex: "",
          Subscription: "",
          changelink:"",
          license:"",
          redirect:null,
          surveylist: [],
          desclist:[],
          sidlist:[],
          userid:"",
          linked: [],
          headerArr: [],
          headerTime: [],
        };
    }

    componentDidMount(){
        const queryParams = new URLSearchParams(window.location.search); // Parsing URl for token parameter
        var usid = queryParams.get('token');
        this.setState({token:usid});
    
        // Accessing all the surveys that therapists can undertake
        axios.get("http://206.189.195.166:3200/displayTherapistSurvey", {
        headers:{
            token: usid,
        } 
        }).then(
            res =>{
                var tit = [];
                var desc = [];
                var sid = [];
                const q = res.data;
                console.log(q);
                var i;
                for(i=0;i<q.length;i++)
                {
                    sid.push(q[i].SurveyID)
                    tit.push(q[i].SurveyTitle);
                    desc.push(q[i].OptDesc);
                }
                this.setState({surveylist:tit});
                this.setState({desclist:desc});
                this.setState({sidlist:sid});
            }
        )


        // Accessing all the attributes of the provider via API call
        axios.get("http://206.189.195.166:3200/profiledetails", {
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
              this.setState({license: q.LicenseID});
              this.setState({Subscription: q.Subscription});
              this.setState({Sex: sx})
              var chang = "/ChangePersonalDetails?usertype=P&token=" + String(usid); // Link to change personal details page that is designed for provider
              this.setState({changelink: chang})
              this.setState({userid:q.userid});
              this.tickDisplay(q.userid)
            }
        )
        if(this.state.Subscription=="")
        {
            this.setState({Subscription:"None"})
        }



        // axios.get("http://localhost:9000/displayLinkedUser",{
        //     headers:{
        //         UserID: this.state.userid,
        //     },    
        // }).then(
        //     res => {
        //         const q = res.data;
        //         console.log(q);
        //         this.setState({linked:q})
        //     }
        // )

    }

    // Handler function to display ticks based on whether or not this particular user has undertaken a survey or not
    tickDisplay = (x) => {
        var q;
        var i;
        var ans = [];
        var ans2 = [];
        // Checking survey header table for entries having this user id
        axios.get("http://206.189.195.166:3200/checkSurveyHeader", {
            params:{
                UserID: x,
            },
        }).then(
            res => {
                console.log(res.data);
                q = res.data;
                for(i=0;i<q.length;i++)
                {
                    ans.push(q[i].SurveyID);
                    ans2.push(q[i].Time_stamp);
                }
                console.log(ans);
                // saving survey id and time stamp of each attempt of a survey to state
                this.setState({headerArr:ans})
                this.setState({headerTime:ans2})
            }
        )

    }
    
    // Display function to handle survey display, with tick marks for surveys that already have been taken
    SurveyDisplay() {
        var i;
        var s = [];
        for(i=0;i<this.state.surveylist.length;i++)
        {
            if(this.state.headerArr.includes(this.state.sidlist[i])) // if survey id is part of the header array, it has been taken and hence needs a tick mark
            {
                s.push(
                    <Panel header={this.state.surveylist[i] + " ✔"} key={i+1}>
                        <p><text>{this.state.desclist[i]}</text></p>
                        <Button href={'/Survey?surveyid=' + String(this.state.sidlist[i]) + '&token=' + String(this.state.token)+"&usertype=P"} type='link'>Take Survey</Button>
                    </Panel>
                )
            }
            else
            {
                s.push(
                    <Panel header={this.state.surveylist[i]} key={i+1}>
                        <p><text>{this.state.desclist[i]}</text></p>
                        <Button href={'/Survey?surveyid=' + String(this.state.sidlist[i]) + '&token=' + String(this.state.token)+"&usertype=P"} type='link'>Take Survey</Button>
                    </Panel>
                )
            }
        }
        return s;
    }

    render()
    {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return(
            <Layout>
            <Layout style={{width:"100%", height:'120vh'}}>
                <Row>
                    <Col span={24}>
                        <Affix offsetTop={0}>
                            <Header style={{backgroundColor:'gray', height:'100%'}}>        
                                <Menu mode='horizontal' style={{width:'100%', height:'100%', backgroundColor:'gray'}}>
                                    <img src={logo} width={180}/>

                                    <Menu.Item key='Sign Up/Log In' className='Topnav'>
                                        <a href={'/ProviderDashboard?token=' + String(this.state.token)} style={{color:'white'}}>{this.state.fname}</a>
                                    </Menu.Item>
                                    <Menu.Item key='About' className='Topnav'>
                                        <a href={'/About?token=' + String(this.state.token)} style={{color:'white'}}>About</a>
                                    </Menu.Item>
                                    <Menu.Item key='Home' className='Topnav'>
                                        <a href={'/Homepage?token=' + String(this.state.token) + "&usertype=P"} style={{color:'white'}}>Home</a>
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
                                    
                                                <Menu.Item key="3"><Link to='/Subscriptions'>Change Subscription</Link></Menu.Item>
                                                <Menu.Item key="4"><Link to='DeleteAccount'>Delete Account</Link></Menu.Item>
                                            </SubMenu>
                                            
                                            <Menu.Item key="13">
                                                <LogoutOutlined /><Link to='/Homepage'>Sign Out</Link>
                                            </Menu.Item>
                                        </Menu>
                                    </Sider> 
                                </Col>
                                <Col span={20}>     
                                    <h3 className='welcometext'>&nbsp;&nbsp;&nbsp;Welcome, {this.state.fname}!</h3>  
                                    <Layout style={{width:'80vw', height:'95vh', padding: '24px 24px 24px', background:'darkgray'}}>
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
                                                                <Descriptions.Item label="License ID">{this.state.license}</Descriptions.Item>
        
                                                            </Descriptions>
                                                        </Card>
                                                        <Col span = {12}>
        
        
                                                        <Row>
                                                            <Card hoverable style={{ width: '100%', float:'right'}}>
                                                                <text className="SurveysTitle">Surveys</text>
                                                                <Collapse accordion>
                                                                    {/* <Panel header={this.state.surveylist[0]} key="1">
                                                                    <p><text>{this.state.desclist[0]}</text></p>
                                                                    <Button href={'/Survey?surveyid=1&token=' + String(this.state.token)+"&usertype=P"} type='link'>Take Survey</Button>
                                                                    </Panel>
                                                                    <Panel header={this.state.surveylist[1]} key="2">
                                                                    <p><text>{this.state.desclist[1]}</text></p>
                                                                    <Button href={'/Survey?surveyid=2&token=' + String(this.state.token)+"&usertype=P"} type='link'>Take Survey</Button>
                                                                    </Panel>
                                                                    <Panel header="Need to talk? We're here" key="3">
                                                                    <Button href='/homepage#contactUs' type='link'>Contact Us</Button>
                                                                    </Panel>
                                                                    <Panel header="Ready for therapy? Let's match you!" key="4">
                                                                    <Button type='link'>Take Survey</Button>
                                                                    </Panel> */}
                                                                    {this.SurveyDisplay()} // Survey Display function called here
                                                                </Collapse>
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
            </Layout>
        )
    }
}
export default ProviderDashboard
