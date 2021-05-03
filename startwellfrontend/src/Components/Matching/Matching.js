import React, { Component } from "react";
import axios from "axios";
import { Button, Layout, Row, Col, Card } from "antd";
import Header2 from "../Header/Header2";
import "./Matching.css";

class Matching extends Component {
  constructor(props) {
    super(props);
    var token = JSON.parse(localStorage.getItem("user")).token;
    this.userdata = {};
    this.state = {
      UserID: "",
      userInfo: [],
      token: token,
      matching: [],
    };

    //this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }
//getting the results of matching prcentage
  displayMatchData = () => {
    var x = JSON.parse(localStorage.getItem("user"));
    console.log("trying to get through local storage", x);
    console.log("trying to get userid through local storage", x.UserID);
    console.log("trying to get userid through local storage", x.token);

    this.setState({
      addBucketClicked: false,
    });

    axios
      .get(`http://206.189.195.166:3200/user_response?UserID=${x.UserID}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            userInfo: response.data,
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

          console.log("fetching data", response);
          this.setState({
            matching: response.data[response.data.length - 1],
          });
          console.log(response.data[response.data.length - 1]);
          console.log(response[2]);
        } else {
          let Error = "Error while fetching  details";
          this.setState({ Error });
          console.log("Error while fetching details", response);
        }
      })

      .catch((error) => {
        console.log("error occured", error);
      });
  };
// Displaying the Math Percentage using cards
  render() {
    const userDataInfo = this.state.matching;
    const userInfohasData = userDataInfo.length;

    const CardStyle = {
      margin: "8%",
      fontSize: "16px",
      fontWeight: "bold",
      backgroundColor: "rgb(179, 250, 250",
    };

    return (
      <Layout>
        <Layout
          style={{ width: "100%", height: "120vh", backgroundColor: "white" }}
        >
          <div id="header">
            <Header2 />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5%",
            }}
          >
            <Button
              className=" match-button "
              shape="round"
              onClick={this.displayMatchData}
            >
              Match
            </Button>
          </div>
          <div>
            <br />
            <br />
            {userInfohasData === 0 ? (
              " "
            ) : (
              <div className="site-card-wrapper">
                <div>
                  <h1 style={{ fontSize: "200%" }}>
                    {" "}
                    These are top 3 matched provider profiles brought for you
                    today
                  </h1>
                  <h1 style={{ fontSize: "150%" }}>
                    {" "}
                    For Therapy please contact any of them{" "}
                  </h1>
                </div>

                <Row gutter={16}>
                  <Col span={8}>
                    <Card title="Provider 1" bordered={false} style={CardStyle}>
                      Match Score: &nbsp;{userDataInfo[1]} %
                      <br /> <br />
                      <h1> Contact Information </h1> Email: {userDataInfo[0]}
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="Provider 2" bordered={false} style={CardStyle}>
                      Match Score: &nbsp;{userDataInfo[3]} %
                      <br /> <br />
                      <h1> Contact Information </h1> Email: {userDataInfo[2]}
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="Provider 3" bordered={false} style={CardStyle}>
                      Match Score: &nbsp;{userDataInfo[5]} %
                      <br /> <br />
                      <h1> Contact Information </h1> Email: {userDataInfo[4]}
                    </Card>
                  </Col>
                </Row>
                <div>
                  <Button
                    shape="round"
                    className=" dashboard-button "
                    style={{ marginTop: "3%" }}
                    href={"/UserDashboard?token=" + String(this.state.token)}
                  >
                    Back to User dashboard
                  </Button>
                </div>
              </div>
            )}
            <br />
          </div>
        </Layout>
      </Layout>
    );
  }
}

export default Matching;
