import React, { Component } from "react";
import { Layout, Menu } from "antd";
import UserList from "../UserList/UserList";
import { Link } from "react-router-dom";
import ContactUsList from "../ContactUs/ContactUsList";
import UserBucketInfo from "../UserBucketInfo/UserBucketInfo";
import PageContent from "../PageContent/PageContent";
import AddPageContent from "../CrossReference/CrossReference";
import AddCategory from "../AddAll/AddCategory";
import AddQuest from "../AddAll/AddQuest";
import AddSurvey from "../AddAll/AddSurvey";
import AddBucket from "../AddAll/AddBucket";
import AddOption from "../AddAll/AddOption";
import SurveyHeader from "../SurveyHeader/SurveyHeader";
import logo from "../../Assets/logo_color3.jpg";

const { SubMenu } = Menu;
const { Header } = Layout;
export default class Admin extends Component {
  constructor() {
    super();
    var x = JSON.parse(localStorage.getItem("user"));
    this.state = {
      adminTabSelected: "none",
      userTypeValue: "all",
      pageContentValue: "",
      SurveyHeaderValue: "",
      token: x.token,
    };
  }

  setNaviagtionClick = (value) => {
    localStorage.setItem("adminTabSelected", value);
    this.setState({
      adminTabSelected: value,
    });
  };

  setNaviagtionClickForUser = (value, type) => {
    localStorage.setItem("adminTabSelected", value);
    this.setState({
      adminTabSelected: value,
      userTypeValue: type,
    });
  };

  setNaviagtionClickForSurvey = (value, type) => {
    localStorage.setItem("adminTabSelected", value);
    this.setState({
      adminTabSelected: value,
      bucketTypeSelected: type,
    });
  };

  setNaviagtionForPageContent = (value, type) => {
    localStorage.setItem("adminTabSelected", value);
    this.setState({
      adminTabSelected: value,
      pageContentValue: type,
    });
  };

  setNaviagtionForSurveyHeader = (value, type) => {
    localStorage.setItem("adminTabSelected", value);
    this.setState({
      adminTabSelected: value,
      SurveyHeaderValue: type,
    });
  };

  render() {
    const { Sider } = Layout;
    const data = [
      {
        title: "User Data",
      },
      {
        title: "Survey Data",
      },
      {
        title: "Page Content",
      },
      {
        title: "New Request",
      },
      {
        title: "Survey log",
      },
    ];

    const userData = JSON.parse(window.localStorage.user);
    const userType = this.state.userTypeValue;
    var x = JSON.parse(localStorage.getItem("user"));
    var firstname = x.First_Name;
    var lastname = x.Last_Name;

    return (
      <div>
        <div id="header">
          <Header style={{ backgroundColor: "gray", height: "100%" }}>
            <Menu
              mode="horizontal"
              style={{ width: "100%", height: "100%", backgroundColor: "gray" }}
            >
              <a href={"/Homepage?token=" + String(this.state.token)}>
                {" "}
                <img src={logo} width={180} />
              </a>
              <Menu.Item key="Sign Up/Log In" className="Topnav">
                <a
                  href={"/Admin?token=" + String(this.state.token)}
                  style={{ color: "white" }}
                >
                  {firstname}
                </a>
              </Menu.Item>
              <Menu.Item key="About" className="Topnav">
                <a
                  href={"/About?token=" + String(this.state.token)}
                  style={{ color: "white" }}
                >
                  About
                </a>
              </Menu.Item>
              <Menu.Item key="Home" className="Topnav">
                <a
                  href={"/Homepage?token=" + String(this.state.token)}
                  style={{ color: "white" }}
                >
                  Home
                </a>
              </Menu.Item>
            </Menu>
          </Header>
        </div>

        <div id="abcd" style={{ display: "flex", flexFlow: "row" }}>
          <div style={{ width: "15%" }}>
            <Sider
              width="100%"
              style={{ background: "#A9A9A9", marginTop: "10px" }}
            >
              <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
                <SubMenu key="sub1" title={<span>User Data</span>}>
                  <Menu.Item
                    key="1"
                    onClick={() => {
                      this.setNaviagtionClickForUser("User Data", "all");
                    }}
                  >
                    Display User Data
                  </Menu.Item>
                </SubMenu>
              </Menu>
              <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
                <SubMenu key="sub2" title={<span>Survey Data</span>}>
                  <Menu.Item
                    key="1"
                    onClick={() => {
                      this.setNaviagtionClickForSurvey(
                        "Survey Data",
                        "surveyList"
                      );
                    }}
                  >
                    Fetch Survey Info
                  </Menu.Item>
                  <Menu.Item
                    key="2"
                    onClick={() => {
                      this.setNaviagtionClickForSurvey(
                        "Survey Data",
                        "AddCategory"
                      );
                    }}
                  >
                    Add Category
                  </Menu.Item>
                  <Menu.Item
                    key="3"
                    onClick={() => {
                      this.setNaviagtionClickForSurvey(
                        "Survey Data",
                        "AddSurvey"
                      );
                    }}
                  >
                    Add Survey
                  </Menu.Item>
                </SubMenu>
              </Menu>
              <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
                <SubMenu key="sub3" title={<span>Cross Reference Table</span>}>
                  <Menu.Item
                    key="1"
                    onClick={() => {
                      this.setNaviagtionForPageContent(
                        "Page Content",
                        "displayCrossReference"
                      );
                    }}
                  >
                    Display Cross Reference
                  </Menu.Item>
                  <Menu.Item
                    key="2"
                    onClick={() => {
                      this.setNaviagtionForPageContent(
                        "Page Content",
                        "addCrossReference"
                      );
                    }}
                  >
                    Add Cross Reference
                  </Menu.Item>
                </SubMenu>
              </Menu>
              <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
                <SubMenu key="sub4" title={<span> Survey log </span>}>
                  <Menu.Item
                    key="1"
                    onClick={() => {
                      this.setNaviagtionForSurveyHeader("Survey log");
                    }}
                  >
                    Display Survey log
                  </Menu.Item>
                </SubMenu>
              </Menu>
              <Menu mode="inline" style={{ height: "100%", width: "100%" }}>
                <SubMenu key="sub5" title={<span>Contact Us Request</span>}>
                  <Menu.Item
                    key="1"
                    onClick={() => {
                      this.setNaviagtionClick("New Request");
                    }}
                  >
                    Display New Requests
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key="1">
                  <Link to="/Homepage">Sign Out</Link>
                </Menu.Item>
              </Menu>
            </Sider>
          </div>
          <div
            style={{
              backgroundColor: "white",
              height: "100%",
              minHeight: "750px",
              width: "85%",
              margin: "10px",
            }}
          >
            {this.state.adminTabSelected === "none" ? (
              <div>
                <h1 style={{ marginTop: "50px" }}>
                  Welcome {firstname} {lastname}
                </h1>
              </div>
            ) : this.state.adminTabSelected === "User Data" ? (
              <div id="user">
                <UserList userType={userType} />
              </div>
            ) : this.state.adminTabSelected === "Survey Data" ? (
              <div id="user">
                {this.state.bucketTypeSelected === "surveyList" ? (
                  <UserBucketInfo />
                ) : this.state.bucketTypeSelected === "AddCategory" ? (
                  <AddCategory />
                ) : this.state.bucketTypeSelected === "AddSurvey" ? (
                  <AddSurvey />
                ) : this.state.bucketTypeSelected === "AddQuest" ? (
                  <AddQuest />
                ) : this.state.bucketTypeSelected === "AddOption" ? (
                  <AddOption />
                ) : (
                  <AddBucket />
                )}
              </div>
            ) : this.state.adminTabSelected === "Page Content" ? (
              <div id="user">
                {this.state.pageContentValue === "displayCrossReference" ? (
                  <PageContent />
                ) : (
                  <AddPageContent />
                )}
              </div>
            ) : this.state.adminTabSelected === "Survey log" ? (
              <div id="user">
                <SurveyHeader />
              </div>
            ) : this.state.adminTabSelected === "New Request" ? (
              <div id="user">
                <ContactUsList />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
