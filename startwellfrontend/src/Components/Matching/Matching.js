import React, { Component } from 'react';
import axios from 'axios';
import { Button,  Select,  Layout, Row, Col, Card } from 'antd';
import Header2 from "../Header/Header2";
import "./Matching.css";

const { Option } = Select;
const { Header, Content, Footer } = Layout;

class Matching extends Component {
  constructor(props) {
    super(props);
    var token = JSON.parse(localStorage.getItem('user')).token
    this.userdata = {};
    this.state = {
      UserID: '',
      userInfo: [],
      token: token,
      matching:[]
    }
    
    //this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
}


displayMatchData = () => {
  var x = JSON.parse(localStorage.getItem('user'))
  console.log("trying to get through local storage",x)
  console.log("trying to get userid through local storage",x.UserID)
  console.log("trying to get userid through local storage",x.token)
  
  this.setState({
    addBucketClicked: false
  });
  
  axios
    .get(`http://localhost:9000/user_response?UserID=${x.UserID}`)
    .then(response => {
      if (response.status === 200) {
        console.log(JSON.stringify(response.data));
        this.setState({
          userInfo: response.data
        });
        // let MatchArray=[]
        // for (let i = 0; i < response.data.length-1; i++) 
        // {
        //   if(i===response.data.length)
        //   {
        //     MatchArray.push(response.data[i])
        //     this.setState({
        //       matching : MatchArray
        //     })
        //   }

        // }
       
        console.log('fetching data', response);
        this.setState({
                matching : response.data[response.data.length-1]
              })
        console.log(response.data[response.data.length-1])
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
 
  const userDataInfo = this.state.matching;
  const userInfohasData = userDataInfo.length;

  return (
    <Layout>

      <Layout style={{width:"100%", height: '100vh', backgroundColor: 'white' }}>

      <div id="header">
          <Header2 />
      </div >
      <div 
        style={{ 
          display: "flex",
          justifyContent: "center", marginTop: "5%" }}
          >
       
        <Button className = " match-button " 

          shape="round" 
          onClick={this.displayMatchData}
          >
            Match
        </Button> 
        </div>
        <div>
          <br/>
          <br/>
          {userInfohasData === 0 ?(" ") :(<div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Provider 1" bordered={false}>
        You are matched with the following provider please contact them <br/> Email: {userDataInfo[0]} 
          <br/> with  
          <br/> {userDataInfo[1]}%
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Provider 2" bordered={false}>
      You are matched with the following provider please contact them <br/> Email: {userDataInfo[2]} 
         <br/> with  
          <br/>{userDataInfo[3]} %
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Provider 3" bordered={false}>
        You are matched with the following provider please contact them <br/> Email: {userDataInfo[4]} 
        <br/> with 
          <br/>
          {userDataInfo[5]}%
        </Card>
      </Col>
    </Row>
  </div>)  }
  <br/>
    <Button style = {{ marginTop: "20%"}} href={'/UserDashboard?token=' + String(this.state.token)}>Back to UserDashboard Page</Button>
        
    </div> 
    </Layout>
</Layout>    
  );}
  

}

export default Matching;
