import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Descriptions, Divider, Progress, Radio, Select, Tag, Typography } from 'antd';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
  PoweroffOutlined,
  FrownOutlined,
  MehOutlined
} from '@ant-design/icons';
import {
  Layout,
  Menu,
  Breadcrumb,
  Avatar,
  Card,
  Col,
  Row,
  Spin,
  Image,
  Collapse,
  Badge,
  Rate,
  Carousel,
  Form,
  Input,
  Checkbox,
  Pagination
} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import './Survey.css';
import logo from '../../Assets/logo_color3.jpg';
import { Link } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
var maxQuestions = 5; // Variable controlling max number of questions per page

var previous = '< Previous'; // String for the previous button
var next = 'Next >'; // String for the next button

class Survey extends React.Component {
  
  constructor(props) {
    super(props);
    const queryParams = new URLSearchParams(window.location.search); // Parsing URL for token, survey id and user type
    var tok = queryParams.get('token');
    var sid = queryParams.get('surveyid');
    var typ = queryParams.get('usertype');
    this.state = {
      fname: "", // Storing name of user for top navbar
      token: tok, // JWT
      surveyid: sid, // id of the survey
      userid: "", // user id
      usertype: typ, // type of user
      title: "",
      desc: "",
      pageCounter: 0, // page index
      questions: [], // questions array
      responses: [], // storing responses of user
      totques: 0, // total number of questions
      subDisabled: true, // disabling of submit button until last page
      qDisabled: false, // disabling questions after submit button is clicked
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  componentDidMount(){
    console.log(this.state.surveyid)
    // Accessing the questions and options of the survey via API call
    axios.get("http://206.189.195.166:3200/surveyQandOpt", {
      params:{
        surveyId: String(this.state.surveyid),
      } 
    }).then(
      res =>{
        const q = res.data;
        const noq = res.data.length;
        this.setState({totques:noq});
        this.setState({questions: q});
      }
    )

    // Accessing the survey title and description via API call
    axios.get("http://206.189.195.166:3200/displaySurveyDetails", {
      params:{
        surveyId: this.state.surveyid,
      } 
    }).then(
      res =>{
        const q = res.data;
        this.setState({title: q.surveyTitle});
        this.setState({title: q.surveyTitle});
        this.setState({desc: q.OptDesc});
      }
    )


    // Accessing details of the currently logged in user
    axios.get("http://206.189.195.166:3200/profiledetails", {
        headers:{
            token: this.state.token,
        } 
        }).then(
            res =>{
              const q = res.data;
              this.setState({fname: q.First_Name});
              this.setState({userid: q.userid});
            }
        )

  }
  
  // handler function for an option selection
  handleChange = q => e => {
    var newArr = this.state.responses; // Responses array
    newArr[q] = e.target.value; // response stored at index of the question number
    this.setState({ responses: newArr }); // state updation
  };

  // Handler function for survey submission
  handleSubmit = (e) => {
    var valid = this.validate(); // Validation function test to check if all questions are answered
    if(!valid)
    {
      alert("Survey Incomplete. Please answer all questions"); // Alerting user to respond to all questions
    }
    else
    {
      this.setState({qDisabled:true}); // Disabling all questions to prevent change after submission
      var resp = this.state.responses;
      var x = [];
      var i;
      for(i=0;i<this.state.questions.length;i++) // Structuring responses array as per API requirements
      { 
        var addition = {
          QuesID: i+1,
          optionId: String(resp[i]),
          OptionText: String(this.state.questions[i].options[parseInt(resp[i])-1].OptionText),
        }
        x.push(addition)
      }
      
      // Calling API to record a submission of this particular survey by this particular user
      axios.post("http://206.189.195.166:3200/addSurveyHeader", {
      SurveyID: this.state.surveyid,      
      UserID: this.state.userid,
      });

      // Calling API to submit the reponses of the user to the survey
      axios.post("http://206.189.195.166:3200/saveUserResponse", {
      token:this.state.token,
      SurveyID: this.state.surveyid,      
      UserResponse: x,
      }).then(
        res => {
          if(this.state.usertype=='C') // Redeirecting to dashboard based on the user type
          {
            window.location = '/UserDashboard?token=' + String(this.state.token);
          }
          else
          {
            window.location = '/ProviderDashboard?token=' + String(this.state.token);
          }
        }
      );

      
  }

    
  }

  handleCheckChange = q => e => {
    var newArr = this.state.responses;
    var ss = newArr[q];
    if (typeof ss === 'undefined') {
      ss = '';
    }
    if (ss.includes(e)) {
      ss.replace(e, '');
    } else {
      ss = e;
    }
    newArr[q] = ss;
    this.setState({ responses: newArr });
  };

  // onChange = e => {
  //     console.log('radio checked', e.target.value);
  //     setValue(e.target.value);
  //   };

  // Validation function to check if all questions have been answered
  validate(){
    var i;
    for(i=0;i<this.state.questions.length;i++)
    {
      if(!this.state.responses[i])
      {
        return false;
      }
    }
    return true;
  }
  
  // Card Generator function as explained in Code Explanation document
  CardGen(q, n) {

    if (n == 'T') {
      // Text field with value as the response of user and a handler function to save any change
      return <TextArea disabled={this.state.qDisabled} value={this.state.responses[q]} onChange={this.handleChange(q)} rows={2}></TextArea>; 
    } else if (n == 'R'||n=='C') {
      var i;
      var s = [];
      // Iterating through options of this particular question and generating required no of radio buttons
      for (i = 0; i < this.state.questions[q].options.length; i++) {
        s.push(
          <Radio value={i+1}> // Radio buttons with appropriate value 
            <h2 className='OptTexts'>{this.state.questions[q].options[i].OptionText}</h2>
          </Radio>
        );
        s.push(<br></br>);
      }
      return (
              // Radio group with value as that of user's response and handler function to deal with any change
        <Radio.Group disabled={this.state.qDisabled} value={this.state.responses[q]} onChange={this.handleChange(q)}>
          {s}
        </Radio.Group>
      );
    } 
    // Sample code for checkbox, not implemented
    else if (n == 'C') {
      var i;
      var j;
      var s = [];
      var ans = [];
      var ans2 = [];
      var checked = this.state.responses[q];
      
      if (checked == null) {
        ans = [];
      } else {
        for (j = 0; j < checked.length; j++) {
          ans.push(String(checked.charAt(j)));
        }
      }

      if (checked == null) {
        ans2 = [];
      } 
      else 
      {
        var xx = "";
        for (j = 0; j < checked.length; j++) 
        {
          if(checked.charAt(j)==',')
          {
            ans2.push(String(xx));
            xx = "";
          }
          else
          {
            xx = xx + checked.charAt(j);
          }  
        }
      }

      for (i = 0; i < this.state.questions[q].options.length; i++) {
        s.push(
          <Checkbox value={String(i + 1)}>
            <h2 className='OptTexts'>{this.state.questions[q].options[i].OptionText}</h2>
          </Checkbox>
        );
        s.push(<br></br>);
      }
      return (
        <Checkbox.Group disabled={this.state.qDisabled} value={ans2} onChange={this.handleCheckChange2(q)}>
          {s}
        </Checkbox.Group>
      );
    }
  }
  
  // Page generator function as described in Code Explanation document
  pageGen(pageCounter, maxQuestions) {
    var done = pageCounter * maxQuestions; // Questions displayed so far
    var left = this.state.questions.length - done; // Questions for this page
    if (left >= maxQuestions) {
      left = maxQuestions;
    }
    var s = [];
    var i;
    for (i = 0; i < left; i++) //iterating through questions 
    {
      s.push(
        <Form.Item className='formcomponents' name={pageCounter * maxQuestions + i + 1}>
          // Question text and cardgen function called for options
          <h2 className='formlabels'>{this.state.questions[pageCounter * maxQuestions + i + 0].QText}</h2> 
          <br></br>
          {this.CardGen(pageCounter * maxQuestions + i, this.state.questions[pageCounter * maxQuestions + i].RespType)}
        </Form.Item>
      );
    }
    return s;
  }

  // handler function for next button
  nextClick = () => {
    var last = Math.floor(this.state.totques / maxQuestions); // last page number
    if (this.state.pageCounter == last) {
      alert('You are on the last page'); // cannot go next beyond last page
    } else {
      this.setState({ pageCounter: this.state.pageCounter + 1 }); // increasing page count
    }
    if(this.state.pageCounter+1 == last)
    {
      this.setState({subDisabled:false}); // enabling submit button on last page
    }
  };

  // handler function for previous button
  prevClick = () => {
    if (this.state.pageCounter == 0) {
      alert('You are on the first page!');
    } else {
      this.setState({ pageCounter: this.state.pageCounter - 1 });
    }
    this.setState({subDisabled:true});
    
  };


  render() {
    
    return (
      <Layout style={{ width: '100%', backgroundColor: 'gray' }}>
        <Header style={{ backgroundColor: 'gray', height: '100%' }}>
          <Menu mode='horizontal' style={{ width: '100%', height: '100%', backgroundColor: 'gray' }}>
            <img src={logo} width={180} />
            <Menu.Item key='Sign Up/Log In' className='Topnav'>
              <a href={'/UserDashboard?token='+String(this.state.token)} style={{ color: 'white' }}>
                {this.state.fname}
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
        <Layout className='SurveySection'>
          <br></br>
          <Row>
            <Col span={6}></Col>
            <Col span={12}>
              <h1 className='BigMessage'>{this.state.title}</h1>
              <Divider className='divide' />
              <h2 className='Descrip'>{this.state.desc}</h2>
            </Col>
            <Col span={6}></Col>
          </Row>
          <br></br>
          <br></br>
          <Row>
            <Col span={4}></Col>
            <Col span={16}>
              <Progress
                className='ProgBar'
                strokeWidth='15px'
                strokeColor={{ '0%': 'darkblue', '100%': 'blue' }}
                showInfo='false'
                percent={(this.state.pageCounter / Math.ceil(this.state.totques / maxQuestions)) * 100}
              ></Progress>
              <br></br>
              <br></br>
              <Form className='surveycards' layout='vertical'>
                {/* <Form.Item className='formcomponents' name={pageCounter*maxQuestions + 1}>
                                    <h2 className='formlabels'>{questions[pageCounter*maxQuestions + 0].QText}</h2>
                                    <br></br>
                                    {CardGen(pageCounter*maxQuestions + 0,questions[pageCounter*maxQuestions + 0].responseType)}
                                </Form.Item>
                                
                                <Form.Item className='formcomponents' name={pageCounter*maxQuestions + 2}>
                                    <h2 className='formlabels'>{questions[pageCounter*maxQuestions + 1].QText}</h2>
                                    <br></br>
                                    {CardGen(pageCounter*maxQuestions + 1,questions[pageCounter*maxQuestions + 1].responseType)}
                                </Form.Item>
    
                                <Form.Item className='formcomponents' name={pageCounter*maxQuestions + 3}>
                                    <h2 className='formlabels'>{questions[pageCounter*maxQuestions + 2].QText}</h2>
                                    <br></br>
                                    {CardGen(pageCounter*maxQuestions + 2,questions[pageCounter*maxQuestions + 2].responseType)}
                                </Form.Item> */}
                {this.pageGen(this.state.pageCounter, maxQuestions)} // Calling the page Generator function
                <Form.Item>
                  <Button className='PrevNext' style={{ float: 'left' }} onClick={() => this.prevClick()}>
                    {previous}
                  </Button>
                  <Button className='PrevNext' disabled={this.state.subDisabled} style={{ float: 'center' }} onClick={() => this.handleSubmit()}>
                    Submit&nbsp;<Spin spinning={this.state.qDisabled}/>
                  </Button>
                  <Button className='PrevNext' style={{ float: 'right' }} onClick={() => this.nextClick()}>
                    {next}
                  </Button>
                </Form.Item>
              </Form>
              <br></br>
              
              <br></br>
              <br></br>
              <br></br>
            </Col>
            <Col span={4}></Col>
          </Row>
        </Layout>
      </Layout>
    );
  }
}

// function Survey()
// {
//     const [visible, setVisible] = useState(false);
//     // return(
//     //     <Layout style={{width:'100%', backgroundColor:'gray'}}>
//     //         <Header style={{backgroundColor:'gray', height:'100%'}}>
//     //             <Menu mode='horizontal' style={{width:'100%', height:'100%', backgroundColor:'gray'}}>
//     //                 <img src={logo} width={70}/>
//     //                 <text className='Toptitle'>&nbsp;&nbsp; Startwell</text>
//     //                 <Menu.Item key='Sign Up/Log In' className='Topnav'>
//     //                     <a href='/SignUp' style={{color:'white'}}>Sign Up/Log In</a>
//     //                 </Menu.Item>
//     //                 <Menu.Item key='About' className='Topnav'>
//     //                     <a href='/About' style={{color:'white'}}>About</a>
//     //                 </Menu.Item>
//     //                 <Menu.Item key='Match' className='Topnav'>
//     //                     <a href='/Match' style={{color:'white'}}>Match</a>
//     //                 </Menu.Item>
//     //                 <Menu.Item key='Home' className='Topnav'>
//     //                     <a href='/Homepage' style={{color:'white'}}>Home</a>
//     //                 </Menu.Item>
//     //             </Menu>
//     //         </Header>
//     //         <Layout className='SurveySection'>
//     //             <br></br>
//     //             <Row>
//     //                 <Col span={6}></Col>
//     //                 <Col span={12}>
//     //                     <h1 className='BigMessage'>{SurveyTitle}</h1>
//     //                     <Divider className='divide'/>
//     //                     <h2 className='Descrip'>{optDesc}</h2>
//     //                 </Col>
//     //                 <Col span={6}></Col>
//     //             </Row>
//     //             <br></br>
//     //             <br></br>
//     //             <Row>
//     //                 <Col span={4}></Col>
//     //                 <Col span={16}>
//     //                     <Form className='surveycards' layout='vertical'>
//     //                         {/* <Form.Item className='formcomponents' name={pageCounter*maxQuestions + 1}>
//     //                             <h2 className='formlabels'>{questions[pageCounter*maxQuestions + 0].QText}</h2>
//     //                             <br></br>
//     //                             {CardGen(pageCounter*maxQuestions + 0,questions[pageCounter*maxQuestions + 0].responseType)}
//     //                         </Form.Item>

//     //                         <Form.Item className='formcomponents' name={pageCounter*maxQuestions + 2}>
//     //                             <h2 className='formlabels'>{questions[pageCounter*maxQuestions + 1].QText}</h2>
//     //                             <br></br>
//     //                             {CardGen(pageCounter*maxQuestions + 1,questions[pageCounter*maxQuestions + 1].responseType)}
//     //                         </Form.Item>

//     //                         <Form.Item className='formcomponents' name={pageCounter*maxQuestions + 3}>
//     //                             <h2 className='formlabels'>{questions[pageCounter*maxQuestions + 2].QText}</h2>
//     //                             <br></br>
//     //                             {CardGen(pageCounter*maxQuestions + 2,questions[pageCounter*maxQuestions + 2].responseType)}
//     //                         </Form.Item> */}
//     //                         {pageGen(pageCounter, maxQuestions)}
//     //                     </Form>
//     //                 </Col>
//     //                 <Col span={4}></Col>
//     //             </Row>
//     //         </Layout>
//     //     </Layout>
//     // )
// }
export default Survey;
