import React, { Component } from 'react';
import {  Layout, Typography, Col, Row} from 'antd';
import Header from "../Header/Header";
import 'antd/dist/antd.css';


const { Footer } = Layout;

export default class About extends Component {


    render() {
        return (
            <div>    
                <div id='header'>
                    <Header />
                </div>
                <Layout className=' section' >

                    <div className = 'heading 1' style={{  marginTop: "50px" }} >
                            <h1 className='BigMessage' style={{color:'black', fontSize:'250%' }} >What is our vision? </h1>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'italic', textAlign:'center'}} > We believe in a world where anyone that wants mental health care can access the services that are right for them at the price they can afford.</h2>
                    </div>
                    <div className = 'heading 2' style={{ marginTop: "40px" }} >
                            <h1 className='BigMessage'  style={{color:'black', fontSize:'250%' }} >What is our mission? </h1>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'italic', textAlign:'center' }} > StartWell is here to ensure that anyone who is ready to start improving their mental health matches with the appropriate services, and maintains their wellness over time. </h2>
                    </div>
                    <div className = 'heading 3' style={{ marginTop: "40px" }} >
                            <h1 className='BigMessage' style={{color:'black', fontSize:'250%' }} >What do we do? </h1>
                            <h2 className='SectionText' style={{color:'black', textAlign:'left',fontSize:'170%', marginLeft: '3%', marginRight: '3%' }} >We are the online platform where you can match to the right local therapists, book appointments instantly and monitor your progress over time. </h2>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'italic', textAlign:'left', marginLeft: '7%', marginRight: '3%', marginBottom: '20px' }} >1. &nbsp;  Our primary service is our matching.  Users match with the top 3 therapists tailored to their needs and preferences which empowers an informed choice. </h2>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'italic', textAlign:'left', marginLeft: '7%', marginRight: '3%', marginBottom: '20px' }} >2. &nbsp; We are integrating with electronic health records (EHRs) so that you can schedule and pay for your therapy appointment directly on the website </h2>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'italic', textAlign:'left', marginLeft: '7%', marginRight: '3%', marginBottom: '20px' }} >3. &nbsp; To make sure you don’t waste time on therapy that doesn’t work, we offer monitoring services to track your progress and outcomes in order to maintain your wellness over time </h2>
                    </div>
                    <div className = 'heading 4' style={{ marginTop: "40px" }} >
                            <h1 className='BigMessage' style={{color:'black', fontSize:'250%' }} >Why are we different? </h1>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'italic', textAlign:'left', marginLeft: '5%', marginRight: '3%', marginBottom: '25px' }} >  We narrow down the choice and will match you to your top five therapists, instead of a traditional directory where you pick at random from a long list of local therapists, when you fill out a StartWell profile, we tailor matches to your identity, needs and preferences</h2>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'italic', textAlign:'left', marginLeft: '5%', marginRight: '3%', marginBottom: '25px' }} >  We utilize micro-preferences from evidence based assessments that target how you want therapy to look like in order to reduce drop out and find you the perfect match  </h2>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'italic', textAlign:'left', marginLeft: '5%', marginRight: '3%', marginBottom: '25px' }} >  After you match to the right  local therapist , we help you schedule your first consultation or appointment and you can even pay directly on our site.  </h2>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'italic', textAlign:'left', marginLeft: '5%', marginRight: '3%', marginBottom: '25px' }} >  Track how you’re doing with monitoring of progress and outcomes on your dashboard  </h2>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'italic', textAlign:'left', marginLeft: '5%', marginRight: '3%', marginBottom: '70px' }} >  We value autonomy, if you’re ready to try therapy, or just curious, StartWell’s here to help  </h2>               
                    </div>
                    <div className = 'heading 5' style={{ marginTop: "40px" }} >
                            <h1 className='BigMessage' style={{color:'black', fontSize:'250%', marginBottom: '35px' }} >Who are we? </h1>
                            <h2 className='SectionText' style={{color:'black', textAlign:'center',  marginBottom: '5px', fontSize:'170%' }} > AVISHAI AFEK </h2>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'italic', textAlign:'center', marginBottom: '25px', fontSize:'115%' }} > Founder / Mental Health Specialist  </h2>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'italic', textAlign:'left', marginLeft: '5%', marginRight: '3%', marginBottom: '10px' }} > Avishai Afek is a mental health advocate living in Buffalo, NY. Born in Israel and moved to WNY for college, he holds a B.A. in psychology from SUNY Fredonia and is graduating with an M.S. in Mental Health Counseling from University at Buffalo in May of 2021.  </h2>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'italic', textAlign:'left', marginLeft: '5%', marginRight: '3%', marginBottom: '10px' }} > Afek  has worked as a counselor for individuals with serious mental illness and substance use disorders for more than three years. He has co-founded multiple non-profit projects and is also a WNY Prosperity Fellow. Through the fellowship he has become committed to entrepreneurship and business leadership. Avishai is currently working as a clinician at the Research Institute on Addiction and is also an organizer for various groups that advocate for individuals who struggle with mental health and substance use issues.  </h2>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'italic', textAlign:'left', marginLeft: '5%', marginRight: '3%', marginBottom: '10px' }} > As a company we are committed to reducing mental health stigma and aren't afraid to share our stories. Afek founded StartWell because of his personal experience with therapy which inspired his professional pursuits. After many years in therapy with some counselors that really helped and some that really didn't, Avishai understands the difficulty of finding the right one, and how much a good therapist can impact mental health. </h2>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'italic', textAlign:'left', marginLeft: '5%', marginRight: '3%', marginBottom: '70px' }} > After friends started asking him how to find the right therapist he realized how many more people struggled with this problem. Following that he started supporting friends and family to navigate the current system and find the proper therapists using the latest research and he realized he could help more people by digitizing the process. StartWell was created to impact the lives of many people who are confused by the impersonal system of finding a therapist and want a better, easier, and faster system to find a therapist that will actually help.  </h2>
                    </div>
                    <div className = 'heading 5' style={{ marginTop: "40px" }} >
                            <h2 className='SectionText' style={{color:'black', textAlign:'center',  marginBottom: '5px', fontSize:'170%' }} > JOSEPH CASCIOLI </h2>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'italic', textAlign:'center', marginBottom: '25px', fontSize:'115%' }} > Co-Founder / Software Specialist  </h2>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'italic', textAlign:'left', marginLeft: '5%', marginRight: '3%', marginBottom: '10px' }} > Joe is a full-stack software engineer of four years currently working at Frontier Science in Buffalo, NY. He graduated with his B.S. in computer science at University at Buffalo, but Joe has always had a passion for engineering and computer programming. Joseph worked for three years at Architecture Technology Company where he designed and prototyped projects from the ground up, targeting new and exciting technologies. This has given him great experience in designing, developing, and testing projects as well as producing software from ideas. He currently has several patents pending from his previous work.  </h2>
                            <h2 className='SectionText' style={{color:'black', fontStyle:'italic', textAlign:'left', marginLeft: '5%', marginRight: '3%', marginBottom: '70px'}} > Joe came on as a technical co-founder one afternoon after long time friend Afek shared the idea of StartWell with him, he could personally relate to the struggle of finding a good therapist. </h2>
                    </div>

                    <Row>
                    <Col span={24}>
                        <Footer className='footer'>
                            <br></br>
                            <h1 style={{color:'white'}}>Copyright Startwell</h1>
                            <br></br>
                        </Footer>
                    </Col>
                </Row>
                </Layout>
            </div>



        )

    }




}