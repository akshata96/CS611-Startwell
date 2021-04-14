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
import logo from '../../Assets/logo.PNG';
import { Link } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
var maxQuestions = 5;

var previous = '< Previous';
var next = 'Next >';

class Survey extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      token:"",
      surveyid: 0,
      title: "",
      desc: "",
      pageCounter: 0,
      questions: [],
      responses: [],
      totques: 0,
      subDisabled: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.get("http://localhost:9000/surveyQandOpt", {
      params:{
        surveyId: "1"
      } 
    }).then(
      res =>{
        const q = res.data;
        const noq = res.data.length;
        this.setState({totques:noq});
        this.setState({questions: q});
      }
    )

    axios.get("http://localhost:9000/displaySurveyDetails", {
      params:{
        surveyId: "1"
      } 
    }).then(
      res =>{
        const q = res.data;
        this.setState({title: q.surveyTitle});
        this.setState({title: q.surveyTitle});
        this.setState({desc: q.OptDesc});
      }
    )

    const queryParams = new URLSearchParams(window.location.search);
    var tok = queryParams.get('token');
    var sid = queryParams.get('surveyid');
    this.setState({token:tok});
    this.setState({surveyid:sid})
  }

  handleChange = q => e => {
    var newArr = this.state.responses;
    newArr[q] = e.target.value;
    this.setState({ responses: newArr });
  };


  handleSubmit = (e) => {
    var resp = this.state.responses;
    var x = [];
    var i;
    
    for(i=0;i<this.state.questions.length;i++)
    { 
      console.log(i);
      console.log(resp[i]);
      console.log(this.state.questions[i].options);
      console.log(this.state.questions[i].options[parseInt(resp[i])-1].OptionText);
      console.log("-------");
      var addition = {
        QuesID: i+1,
        optionId: String(resp[i]),
        OptionText: String(this.state.questions[i].options[parseInt(resp[i])-1].OptionText),
      }
      x.push(addition)
    }

    axios.post("http://localhost:9000/saveUserResponse", {
      token: this.state.token,
      SurveyID: 1,      
      UserResponse: x,
    });
    
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

  


  CardGen(q, n) {

    if (n == 'T') {
      return <TextArea value={this.state.responses[q]} onChange={this.handleChange(q)} rows={2}></TextArea>;
    } else if (n == 'R'||n=='C') {
      var i;
      var s = [];
      for (i = 0; i < this.state.questions[q].options.length; i++) {
        s.push(
          <Radio value={i+1}>
            <h2 className='OptTexts'>{this.state.questions[q].options[i].OptionText}</h2>
          </Radio>
        );
        s.push(<br></br>);
      }
      return (
        <Radio.Group value={this.state.responses[q]} onChange={this.handleChange(q)}>
          {s}
        </Radio.Group>
      );
    } else if (n == 'C') {
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
        <Checkbox.Group value={ans2} onChange={this.handleCheckChange2(q)}>
          {s}
        </Checkbox.Group>
      );
    }
  }

  pageGen(pageCounter, maxQuestions) {
    var done = pageCounter * maxQuestions;
    var left = this.state.questions.length - done;
    if (left >= maxQuestions) {
      left = maxQuestions;
    }
    var s = [];
    var i;
    for (i = 0; i < left; i++) {
      s.push(
        <Form.Item className='formcomponents' name={pageCounter * maxQuestions + i + 1}>
          <h2 className='formlabels'>{this.state.questions[pageCounter * maxQuestions + i + 0].QText}</h2>
          <br></br>
          {this.CardGen(pageCounter * maxQuestions + i, this.state.questions[pageCounter * maxQuestions + i].RespType)}
        </Form.Item>
      );
    }
    return s;
  }

  nextClick = () => {
    var last = Math.floor(this.state.totques / maxQuestions);
    if (this.state.pageCounter == last) {
      alert('You are on the last page');
    } else {
      this.setState({ pageCounter: this.state.pageCounter + 1 });
    }
    if(this.state.pageCounter+1 == last)
    {
      this.setState({subDisabled:false});
    }
  };
  prevClick = () => {
    if (this.state.pageCounter == 0) {
      alert('You are on the first page!');
    } else {
      this.setState({ pageCounter: this.state.pageCounter - 1 });
    }
  };

  pageChange = page => {
    this.setState({ pageCounter: page - 1 });
  };

  render() {
    return (
      <Layout style={{ width: '100%', backgroundColor: 'gray' }}>
        <Header style={{ backgroundColor: 'gray', height: '100%' }}>
          <Menu mode='horizontal' style={{ width: '100%', height: '100%', backgroundColor: 'gray' }}>
            <img src={logo} width={70} />
            <text className='Toptitle'>&nbsp;&nbsp; Startwell</text>
            <Menu.Item key='Sign Up/Log In' className='Topnav'>
              <a href='/SignUp' style={{ color: 'white' }}>
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
                strokeColor={{ '0%': '#606060', '100%': '#000000' }}
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
                {this.pageGen(this.state.pageCounter, maxQuestions)}
                <Form.Item>
                  <Button className='PrevNext' style={{ float: 'left' }} onClick={() => this.prevClick()}>
                    {previous}
                  </Button>
                  <Button className='PrevNext' disabled={this.state.subDisabled} style={{ float: 'center' }} onClick={() => this.handleSubmit()}>
                    Submit
                  </Button>
                  <Button className='PrevNext' disabled={!this.state.subDisabled} style={{ float: 'right' }} onClick={() => this.nextClick()}>
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
