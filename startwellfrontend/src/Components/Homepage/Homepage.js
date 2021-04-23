import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { Button, Descriptions, Divider, Select, Tag, Typography, Affix} from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined, PoweroffOutlined, FrownOutlined, MehOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb, Avatar, Card, Col, Row, Image, Collapse, Badge, Rate, Carousel, Form, Input} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import './Homepage.css';
import logo from '../../Assets/logo.PNG'
import woundimg from '../../Assets/wound.jpg'
// import caro1 from '../../Assets/caro1.jpg'
// import caro2 from '../../Assets/caro2.jpg'
// import caro3 from '../../Assets/caro3.jpg'
import matchimg from '../../Assets/matchimg.JPG'
import { Link } from 'react-router-dom';
import axios from 'axios';
const {Option} = Select;

// const onFinish = (values: any) => {
//     console.log('Success:', values);
// };

//   const onFinishFailed = (errorInfo: any) => {
//     console.log('Failed:', errorInfo);
// };
var q = 1;
var caro1 = "https://i.imgur.com/99dWPKN.jpg"
var caro2 = "https://i.imgur.com/a8XZArI.jpg"
var caro3 = "https://i.imgur.com/xD8vFun.jpg"
var caro4 = "https://i.imgur.com/PlWiKaV.jpg"

const { Header, Content, Footer, Sider } = Layout;
const{Title}=Typography;
const {SubMenu} = Menu;
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const {TextArea} = Input;


class Homepage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            form: 'contact',
            email: '',
            subject: "Subj1",
            mes:'',
            fname: "Log In",
            chang: ""
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handleSubject = this.handleSubject.bind(this);
        this.handleMes = this.handleMes.bind(this);
        this.submitContact = this.submitContact.bind(this);
    }

    componentDidMount(){
        const queryParams = new URLSearchParams(window.location.search);
        var usid = queryParams.get('token');
        var typ = queryParams.get('usertype');
        this.setState({token:usid});
        if(!usid)
        {
            this.setState({chang:"/Login"})
        }
        else
        {
            axios.get("http://206.189.195.166:3200/profiledetails", {
            headers:{
                token: usid,
            } 
            }).then(
                res => {
                    const q = res.data;
                    var x = JSON.parse(localStorage.getItem('user'))
                    localStorage.setItem('user', JSON.stringify(x));
                
                    this.setState({fname: q.First_Name});
                    if(typ=='C')
                    {
                        this.setState({chang:"/UserDashboard?token=" + String(usid)})
                    }
                    else
                    {
                        this.setState({chang:"/ProviderDashboard?token=" + String(usid)})
                    }
                
                }
            )
        }
    }

    handleEmail = (event) => {
        document.getElementById('subMessage').innerHTML="";
        this.setState({email: event.target.value });
    }

    handleSubject = (event) => {
        document.getElementById('subMessage').innerHTML="";
        this.setState({subject:event});
    }

    handleMes = (event) => {
        document.getElementById('subMessage').innerHTML="";
        this.setState({mes: event.target.value });
    }

    submitContact = (e) => {
        // const arg1 = 'Test@jj.com'
        // const arg2 = 'Subj1'
        // const arg3 = 'Works?'
        console.log(this.state.email);
        console.log(this.state.subject);
        console.log(this.state.mes);
        axios.post("http://206.189.195.166:3200/contactUs", {
            email: this.state.email,
            subject: this.state.subject,
            mes: this.state.mes,
        });
        document.getElementById('ContactUs').reset();
        document.getElementById('subMessage').innerHTML = "Thank you so much! We will get in touch with you shortly!";
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
                                <a href={this.state.chang} style={{color:'white'}}>{this.state.fname}</a>
                            </Menu.Item>
                            <Menu.Item key='About' className='Topnav'>
                                <a href='/About' style={{color:'white'}}>About</a>
                            </Menu.Item>
                            <Menu.Item key='Match' className='Topnav'>
                                <a href='/Login' style={{color:'white'}}>Match</a>
                            </Menu.Item>
                            <Menu.Item key='Home' className='Topnav'>
                                <a href='/Homepage' style={{color:'white'}}>Home</a>
                            </Menu.Item>
                        </Menu>
                    </Header>
                </Affix>
                <Layout className='section1'>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h1 style={{color:'black'}} className='BigMessage'>Start your journey to better mental health and wellness</h1>
                    <h1 style={{color:'black'}} className='BigMessage'>We are here to help you start well and stay well</h1>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div>
                        <Button href='#Explore' className='letsgo' size='large'><text className='buttontext'>FIND OUT MORE</text></Button>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </Layout>
                <Layout id='Explore' className='section2'>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={9}>
                            <br></br>
                            <Image src={caro4} width={500} height={400}></Image>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={9}>
                            <h1 className='BigMessage' style={{color:'black', fontSize:'200%', textAlign:'left'}}>Explore Your Options</h1>
                            <br></br>
                            <br></br>
                            <h2 className='SectionText' style={{color:'black'}}>Mental health is not a one size fits all. Everyone is different, and what options you decide to use to improve may be different from the next person. Using the mental health continuum model we can help you explore your options. Whether you are healthy and looking to focus on wellness and thriving, are feeling anxious or depressed and want help managing your symptoms, or need a variety of support from therapy, medication and extra support there are different services that exist along the continuum of mental health care.</h2>
                            <br></br>
                            <h2 className='SectionText' style={{color:'black'}}>StartWell believes that each individual is an expert in their own life and deserves to feel empowered in the choices they make to better their mental health. While we specialize in matching you to therapists we believe it's important that you know what your options are and if our services are right for you.</h2>
                            <br></br>
                            <div>
                                <Button href='/Login' className='sec2buttons' size='large'>Explore</Button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button href='Match' className='sec2buttons' size='large'>Match</Button>
                            </div>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    
                </Layout>
                <Layout className='section3'>
                    <br></br>
                    <br></br>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={9}>
                            
                        <h1 className='BigMessage' style={{color:'black', fontSize:'200%', textAlign:'left'}}>Match with a therapist</h1>
                            <br></br>
                            <br></br>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'italic'}}>- How do we match?</h2>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'normal'}}>Matching with the right therapist is fundamental. Studies show that the alliance you have with your therapist is as powerful, if not more powerful, than the particular treatment method a therapist is using. In addition to asking you what problems you face or treatment method you prefer, we match you with a therapist who understands you, is sensitive to your needs and preferences and works together with you to improve your mental wellness.</h2>
                            <br></br>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'normal'}}>We primarily focus on the micro-preferences that people may have regarding how they want therapy to look like. For example, would you prefer to have a therapist that focuses more on the past or more on the present? A therapist that is more focused and challenging? or emotionally supportive? Everyone has different preferences and StartWell will help you reflect, and identify your preferences so that you feel more prepared for therapy, and make the best choice when picking a therapist.</h2>
                            <br></br>
                        </Col>
                        
                        <Col span={11}>
                            <br></br>
                            <Image src={matchimg} width={'70%'} ></Image>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20}>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'italic', fontSize:'150%'}}>"The working alliance between a client and a therapist requires two elements for an ideal match. A relational bond of trust and understanding, and a procedural bond of shared goals to work on during therapy. StartWell is here to ensure that anyone seeking therapy can find their ideal match towards improving their mental health" - Avishai Afek (Co-Founder)</h2>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
    
    
    
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    
                </Layout>
                <Layout className='section4'>
                    <br></br>
                    <br></br>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={12}>
                            <Carousel id='Caro' effect='fade' autoplay>
                                <div>
                                    <Image className='caroimgs' src={caro1} width={900} height={500}></Image>
                                </div>
                                <div>
                                    <Image className='caroimgs' src={caro2} width={900} height={500}></Image>
                                </div>
                                <div>
                                    <Image className='caroimgs' src={caro3} width={900} height={500}></Image>
                                </div>
                            </Carousel>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={8}>
                            <br></br>
                            <Button className="sec4buttons" href="/Login" size='large'>Explore Your Options</Button>
                            <br></br>
                            <br></br>
                            
                            <Button className="sec4buttons" href = "/Login" size='large'>Find Your Match</Button>
                            <br></br>
                            <br></br>
                            
                            <Button className="sec4buttons" href = "/Login" size='large'>About Us</Button>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
    
    
    
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    
                </Layout>
                <Layout id="contactUs" className='section5'>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h1 className='sec5header'>We'd love to hear from you</h1>
                    <h2 className='sec5text'>Whether it is a question about features, pricing or anything else,<br></br>our team is always ready for you!</h2>
                    <br></br>
                    <br></br>
                    <h1 style={{color:'darkslategray', fontSize:'200%', fontWeight:'bold'}}>CONTACT US</h1>
                    <Row>
                        <Col span={8}></Col>
                        <Col span={8}>
                        <Form id='ContactUs' name='ContactUs' layout='vertical' size='large' style={{textAlign:'center'}} onSubmit={this.submitContact}>
                            <Form.Item label='Email ID' className='formtext' name='Email ID' rules={[{required:true, message:'Email ID Required!', whitespace: true}]}>
                                <Input 
                                placeholder='Email ID' 
                                type='text' 
                                value={this.state.email} 
                                onChange={this.handleEmail} />
                            </Form.Item>
                            <Form.Item label='Subject' className='formtext' name='Subject' rules={[{required:true, message:'Subject Required', whitespace:true}]}>
                                <Select onChange={this.handleSubject} placeholder='Select an option'>
                                    <Option value = "Subj1">Subj1</Option>
                                    <Option value = "Subj2">Subj2</Option>
                                    <Option value = "Subj3">Subj3</Option>
                                    <Option value = "Other">Other</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item className='formtext' label='Message' name='Message' rules={[{required:true, message:'Message Required', whitespace:true}]}>
                                <TextArea 
                                placeholder='Type Message' 
                                value={this.state.mes} 
                                onChange={this.handleMes} 
                                rows={6} />
                            </Form.Item>
                            <Form.Item>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button onClick={this.submitContact} className='submitbutton'>Submit</Button>
                            </Form.Item>
    
                        </Form>
                        <br></br>
                        <text id='subMessage'></text>
                        <br></br>
                        </Col>
                        <Col span={8}></Col>
                    </Row>
                </Layout>
                <Footer className='footer'>
                    <br></br>
                    <h1 style={{color:'white'}}>Copyright Startwell</h1>
                    <br></br>
                </Footer>
                
            </Layout>
        )
    }
}
export default Homepage