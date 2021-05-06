import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { Button, Descriptions, Divider, Tag, Typography, Affix, Select} from 'antd';
import { UserOutlined, LogoutOutlined, PlusSquareOutlined, MonitorOutlined} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Breadcrumb, Avatar, Card, Col, Row, Image, Collapse, Badge, Rate} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import './CrossReference.css';
import logo from '../../Assets/SmartLogo.png'
import axios from 'axios';
import { Redirect } from "react-router-dom";
import profimg from '../../Assets/prof.png'
import { Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const{Title}=Typography;
const {SubMenu} = Menu;
const { Panel } = Collapse;
const { Option } = Select;

class CrossReference extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            usid: 0, // Index of the user survey in List. NOT USER SELECTED SURVEY ID
            thid: 0, // Index of the user survey in List. NOT USER SELECTED SURVEY ID
            usq: 0, // Index of the question selected in user List. NOT USER SELECTED QUESTION ID
            thq: 0, // Index of the question selected in user List. NOT USER SELECTED QUESTION ID
            userSurveyList: [], // List storing all user surveys
            userIdList: [], // List storing all the database ids of the user surveys
            userQuestions: [{
                QText:"",
                options: {
                    optionId: 1,
                    OptionText: "",
                }
            }], // Dummy user questions list for inititalization before API call 
            userQID: 0, // ID of the Question selected on user side
            therapistQID: 0, // ID of the Question selected on user side
            therapistQuestions: [{
                QText:"",
                options: {
                    optionId: 1,
                    OptionText: "",
                }
            }], // Dummy therapist questions list for inititalization before API call
            therapistSurveyList: [], // List storing all therapist surveys
            therapistIdList: [], // List storing all the database ids of the therapist surveys
            unoq: 0, // User survey no of questions
            tnoq: 0, // Therapist survey no of questions
            success: "", // String of successful linking
            disabControl: true, // Disabling button initially to prevent submission before surveys are selected
            userOID: 0, // Option id of user section selection
            therapistOID: 0, // Option id of therapist section selection
            userOText: "", // Text content of the user selected option
            therapistOText: "", // Text content of the therapist selected option
        };
    }


    componentDidMount()
    {
        var usid = "123"; // Dummy token since the API requires one
        // API call to access all user accessible surveys
        axios.get("http://206.189.195.166:3200/displayUserSurvey", {
        headers:{
            token: usid,
        } 
        }).then(
            res =>{
                var tit = [];
                var desc = [];
                var sid = [];
                const q = res.data;
                var i;
                for(i=0;i<q.length;i++)
                {
                    sid.push(q[i].SurveyID)
                    tit.push(q[i].SurveyTitle);
                }
                this.setState({userSurveyList:tit});
                this.setState({userIdList:sid});
            }
        )
        
        // API call to access all therapist accessible surveys
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
                var i;
                for(i=0;i<q.length;i++)
                {
                    sid.push(q[i].SurveyID)
                    tit.push(q[i].SurveyTitle);
                }
                this.setState({therapistSurveyList:tit});
                this.setState({therapistIdList:sid});
            }
        )
    }
    
    // Function to generate the menu items that display the surveys on the user section
    UserSurveyDisplay() {
        var i;
        var s = [];
        for(i=0;i<this.state.userSurveyList.length;i++)
        {
            s.push(
                <Menu.Item className='SurveyLists' key={i}> // pushing each survey from the main list as a menu item with corresponding key
                    {this.state.userSurveyList[i]}
                </Menu.Item>
            )
            s.push(
                // Pushing a divider after each menu item for better visual clarity
                <Menu.Divider></Menu.Divider>
            )
        }
        return s;
    }
    
    // Function to generate the menu items that display the surveys on the therapist section
    TherapistSurveyDisplay() {
        var i;
        var s = [];
        for(i=0;i<this.state.therapistSurveyList.length;i++)
        {
            s.push(
                <Menu.Item className='SurveyLists' key={i}> // pushing each survey from the main list as a menu item with corresponding key
                    {this.state.therapistSurveyList[i]}
                </Menu.Item>
            )
            s.push(
                // Pushing a divider after each menu item for better visual clarity
                <Menu.Divider></Menu.Divider>
            )
        }
        return s;
    }
    
    // Handler to deal with user survey selection
    userClick = (e) => {
        var x = parseInt(e.key);
        this.setState({usid:x});
    }

    // Handler to deal with therapist survey selection
    therapistClick = (e) => {
        var x = parseInt(e.key);
        this.setState({thid:x});
    }
    
    // Handler to deal with survey selection submission
    selected = (e) => {
        axios.get("http://206.189.195.166:3200/surveyQandOpt", {
        params:{
            surveyId: String(this.state.userIdList[this.state.usid]), // Index used to get database id from the idlist array
        } 
        }).then(
        res =>{
            const q = res.data;
            this.setState({userQuestions: q});
            this.setState({unoq:q.length});
        }
        )
        this.setState({usfinid:this.state.userIdList[this.state.usid]})


        axios.get("http://206.189.195.166:3200/surveyQandOpt", {
        params:{
            surveyId: String(this.state.therapistIdList[this.state.thid]), // Index used to get database id from the idlist array
        } 
        }).then(
        res =>{
            const q = res.data;
            this.setState({therapistQuestions: q});
            this.setState({tnoq:res.data.length});
        }
        )
        this.setState({thfinid:this.state.therapistIdList[this.state.thid]})
        this.setState({disabControl:false})

    }

    // Function to generate the quesion numbers in the dropdown list for user section
    UserGen()
    {
        var q = this.state.unoq;
        var s = [];
        var i = 0;
        for(i=0;i<q;i++) // iterating through number of options
        {
            s.push(
                <Option value = {String(i+1)}> // pushing options with appropriate id number
                    <p>Question {i+1}</p>
                </Option>
            )
        }
        return s;
    }

    // Function to generate the question numbers in the dropdown list for therapist section
    TherapistGen()
    {
        var q = this.state.tnoq;
        var s = [];
        var i = 0;
        for(i=0;i<q;i++) // iterating through number of options
        {
            s.push(
                <Option value = {String(i+1)}> // pushing options with appropriate id number
                    <p>Question {i+1}</p>
                </Option>
            )
        }
        return s;
    }

    // Handler for user question selection
    userSelection = (e) => {
        this.setState({success:""})
        this.setState({userQID:e-1})
    }

    // Handler for user question selection
    therapistSelection = (e) => {
        this.setState({success:""})
        this.setState({therapistQID:e-1})
    }

    // Generator function for Option text display for user section
    userOptGen(){
        var x = this.state.userQuestions[this.state.userQID].options;
        var i;
        var s = []; 
        for(i=0;i<x.length;i++) // iterating through number of options
        {
            s.push(
                // Pushing options with the proper option text and id
                <Option value={i+1} className='Options'>
                    {x[i].OptionText}
                </Option>
            )
        }
        return s;
    }

    // Generator function for Option text display for therapist section
    therapistOptGen(){
        var x = this.state.therapistQuestions[this.state.therapistQID].options;
        var i;
        var s = []; 
        for(i=0;i<x.length;i++)  // iterating through number of options
        {
            s.push(
                // Pushing options with the proper option text and id
                <Option value={i+1} className='Options'>
                    {x[i].OptionText}
                </Option>
            )
        }
        return s;
    }

    // Handler function for submission of the linked options
    submitLink = (e) => {
        console.log("------------------------------------")
        console.log(this.state.userIdList[this.state.usid])
        console.log(this.state.userSurveyList[this.state.usid])
        console.log(this.state.userQID+1)
        console.log(this.state.userQuestions[this.state.userQID].QText)
        console.log(this.state.userOID)
        console.log(this.state.userOText)

        console.log("------------------------------------")
        console.log(this.state.therapistIdList[this.state.thid])
        console.log(this.state.therapistSurveyList[this.state.thid])
        console.log(this.state.therapistQID+1)
        console.log(this.state.therapistQuestions[this.state.therapistQID].QText)
        console.log(this.state.therapistOID)
        console.log(this.state.therapistOText)

        
        // Calling the API to submit details
        axios.post("http://206.189.195.166:3200/addCrossReference", {
            SurveyID_Customer: this.state.userIdList[this.state.usid], // Survey id from the idlist array, accessed via survey index
            SurveyTitle_Customer: this.state.userSurveyList[this.state.usid],
            QuesID_Customer: this.state.userQID+1,
            QText_Customer:this.state.userQuestions[this.state.userQID].QText,
            OptID_Customer: this.state.userOID,
            OptText_Customer: this.state.userOText,

            SurveyID_Provider: this.state.therapistIdList[this.state.thid], // Survey id from the idlist array, accessed via survey index
            SurveyTitle_Provider: this.state.therapistSurveyList[this.state.thid],
            QuesID_Provider: this.state.therapistQID+1,
            QText_Provider: this.state.therapistQuestions[this.state.therapistQID].QText,
            OptID_Provider: this.state.therapistOID,
            OptText_Provider: this.state.therapistOText,
        }).then(
            res => {
                this.setState({success:"Questions linked Successfully!"}) // After submission, message to show successful linking
            }
        );
        
    }

    // Handler function for option selection
    userOptSel = (e) => {
        var x = this.state.userQuestions[this.state.userQID].options;
        
        this.setState({userOID:e})
        this.setState({userOText:x[e-1].OptionText})
    }
    
    // Handler function for option selection
    therapistOptSel = (e) => {
        var x = this.state.therapistQuestions[this.state.therapistQID].options;
        
        this.setState({therapistOID:e})
        this.setState({therapistOText:x[e-1].OptionText})
    }

    render()
    {
        
        return(
            <Layout>
                <Row>
                    <Col span = {3}></Col>
                    <Col span = {8}>
                        <br></br>
                        <br></br>
                        <h1>User Survey List</h1>
                        <Menu onClick={this.userClick}> // Menu for survey list
                            {this.UserSurveyDisplay()} // Display of surveys via function
                        </Menu>
                    </Col>
                    <Col span = {2}>
                        <Divider style={{backgroundColor:'black', height:'100%'}} type='vertical'></Divider>
                    </Col>
                    <Col span = {8}>
                        <br></br>
                        <br></br>
                        <h1>Therapist Survey List</h1>
                        <Menu onClick={this.therapistClick}> // Menu for survey list
                            {this.TherapistSurveyDisplay()} // Display of surveys via function
                        </Menu>
                    </Col>
                    <Col span = {3}></Col>
                </Row>
                
                <Row>
                    <Col span={3}></Col>
                    <Col span={8}>
                        <br></br>
                        <h3>Current Selection:</h3>
                        // Displaying the currently selected survey
                        <h2>{this.state.userSurveyList[this.state.usid]}</h2> 
                    </Col>
                    <Col span={2}>
                        <Divider style={{backgroundColor:'black', height:'100%'}} type='vertical'></Divider>
                    </Col>
                    <Col span={8}>
                        <br></br>
                        <h3>Current Selection:</h3>
                        // Displaying the currently selected survey
                        <h2>{this.state.therapistSurveyList[this.state.thid]}</h2>
                    </Col>
                    <Col span={3}></Col>
                </Row>
                
                <Row>
                    <Col span={3}></Col>
                    <Col span={18}>
                        <br></br>
                        <br></br>
                        <Button className='LinkButton' onClick={this.selected}>
                            Submit Selection
                        </Button>
                    </Col>
                    <Col span={3}></Col>
                </Row>
                
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Divider style={{backgroundColor:'black'}}></Divider>
                    </Col>
                    <Col span={2}></Col>
                </Row>

                <Row>
                    <Col span={24} style={{textAlign:'center'}}>
                        <h2>Please choose the questions you'd like to link together</h2>
                        <br></br>
                    </Col>
                </Row>

                <Row>
                    <Col span={3}></Col>
                    <Col span={8}>
                        <Select onChange={this.userSelection} defaultValue="Question 1" placeholder="Please select a question" style={{width:'100%'}}>
                            {this.UserGen()}
                        </Select>
                        <br></br>
                        <br></br>
                        <h3 className='Questions'>
                            {this.state.userQuestions[this.state.userQID].QText}
                        </h3>
                        <Select onChange={this.userOptSel} placeholder="Please select an option" style={{width:'60%'}}>
                            {this.userOptGen()}
                        </Select>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={8}>
                        <Select onChange={this.therapistSelection} defaultValue="Question 1" placeholder="Please select a question" style={{width:'100%'}}>
                            {this.TherapistGen()}
                        </Select>
                        <br></br>
                        <br></br>
                        <h3 className='Questions'>
                            {this.state.therapistQuestions[this.state.therapistQID].QText}
                        </h3>
                        <Select onChange={this.therapistOptSel} placeholder="Please select an option" style={{width:'60%'}}>
                            {this.therapistOptGen()}
                        </Select>
                    </Col>
                    <Col span={3}></Col>
                </Row>

                <Row>
                    <Col span={3}></Col>
                    <Col span={18}>
                        <br></br>
                        <br></br>
                        <Button disabled={this.state.disabControl} onClick={this.submitLink} className='LinkButton'>
                            Link Options
                        </Button>
                        <p>{this.state.success}</p>
                    </Col>
                    <Col span={3}></Col>
                </Row>

                

            </Layout>
        )
    }
}
export default CrossReference
