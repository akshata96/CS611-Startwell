import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "antd";
import { Form, Input, Layout } from "antd";
import Header from "../Header/Header";
import "./ResetPassword.css";

const FormItem = Form.Item;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default class ResetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "", // Holds the email of the user.
      password: "", // Holds the password of the user.
      Confirm_password: "", // Holds the email of the user.
      update: "",
      isLoading: "",
      error: "",
      passwordError: "",
    };
    this.updatePassword = this.updatePassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
  }

  componentDidMount() {
    var lastPart = window.location.href.split("=").pop();
    console.log("removing the link", lastPart); //rem
    axios
      .get("http://206.189.195.166:3200/user/resetpassword/", {
        params: { resetPasswordToken: window.location.href.split("=").pop() },
      })
      .then((response) => {
        if (response.data.code === 200) {
          console.log(" EmailID", response.data.results[0].EmailID);
          this.setState({
            email: response.data.results[0].EmailID,
            update: false,
            isLoading: false,
            error: false,
          });
        } else {
          this.setState({
            update: false,
            isLoading: false,
            error: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // handles when ever we change the password field
  handleChange(event) {
    //console.log(event.target.value)
    this.setState({
      password: event.target.value,
    });
  }
  // handles when ever we change the confirm password field
  handleChange1(event) {
    //console.log(event.target.value)
    this.setState({
      confirm_password: event.target.value,
    });
  }

//sending the updated password to the backend
  
updatePassword(e) {
    const isValid = this.validate();
    if (isValid) {
      console.log("in updatepassword");
      axios
        .put("http://206.189.195.166:3200/user/updatepassword/", {
          email: this.state.email,
          password: this.state.password,
          confirm_password: this.state.Confirm_password,
        })
        .then((response) => {
          if (response.data.code === 200) {
            console.log("success");
            this.setState({
              update: true,
              error: false,
            });
          } else {
            this.setState({
              update: false,
              error: true,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return false;
  }
// Validation for the passwords

  validate = () => {
    // let nameError = "";

    let passwordError = "";
    let isValid = true;
    // let input = this.state.input;

    if (this.state.password.length < 7) {
      console.log("in password");
      isValid = false;
      passwordError = "Password length should be greater than seven."; // Updating the password error if the password is less than 7 
    }
    if (!isValid) {
      this.setState({ passwordError });
      return false;
    }
    if (this.state.password !== this.state.confirm_password) {
      isValid = false;
      passwordError = "Both password doesn't match"; // Updating the password error if the passwords do not match 
    }
    if (!isValid) {
      this.setState({ passwordError });
      return false;
    }

    return true;
  };

// Form for the reset password  
  
  render() {
    if (this.state.error === true) {
      return (
        <div>
          <div className="up_password">
            <h4>
              Problem resetting password. click below to send another link
            </h4>
            <Link to="/ForgotPassword">
              <Button type="Primary">Generate Link</Button>
            </Link>
            <Link to="/">
              <Button type="Primary">Go Home</Button>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Layout
            style={{ width: "100%", height: "100vh", backgroundColor: "white" }}
          >
            <div id="header">
              <Header />
            </div>
            <h1 style={{ fontSize: "210%", marginTop: "7%" }}>
              Reset Password
            </h1>
            <div>
              {!this.state.update && (
                <div className="up_password">
                  <Form name="nest-messages" onFinish={this.updatePassword}>
                    <FormItem
                      style={{
                        margin: "20pt",
                        marginTop: "3%",
                        width: "15%",
                        marginLeft: "32%",
                      }}
                      label={<h1 style={{ fontSize: " 120%" }}>Password</h1>}
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input
                        style={{
                          width: "200%",
                          marginLeft: "47%",
                        }}
                        type="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                      />
                      <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.passwordError}
                      </div>
                    </FormItem>

                    <FormItem
                      style={{
                        margin: "20pt",
                        width: "25%",
                        marginLeft: "32%",
                      }}
                      label={
                        <h1 style={{ fontSize: " 120%" }}>Re-type Password</h1>
                      }
                      name="confirm_password"
                      rules={[
                        {
                          required: true,
                          message: "Please confrim your password!",
                        },
                      ]}
                    >
                      <Input
                        type="password"
                        style={{
                          width: "120%",
                        }}
                        placeholder="Confirm Password"
                        onChange={this.handleChange1}
                      />
                    </FormItem>
                    <FormItem>
                      <Button
                        onClick={this.updatePassword}
                        htmlType="submit"
                        style={{
                          color: "white",
                          backgroundColor: "#014183",
                          marginTop: "1%",
                        }}
                      >
                        Update Password
                      </Button>
                    </FormItem>
                  </Form>
                </div>
              )}
              {this.state.update && (
                <div className="up_password">
                  <h3 className="resetSuccess">
                    Your password has been successfully updated please click on
                    login button to login
                  </h3>
                  <Link to="/Login">
                    <Button type="Primary"> Log In</Button>
                  </Link>
                </div>
              )}
            </div>
          </Layout>
        </div>
      );
    }
  }
}
