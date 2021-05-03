import React, { Component } from "react";
import axios from "axios";
import { Form, Input, Button, Layout } from "antd";
import Header1 from "../Header/Header";
import "./ForgotPassword.css";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      showError: "",
      message: "",
      showEmailbox: true,
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.submitEmail = this.submitEmail.bind(this);
  }
  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
// Forgot Password maiil is sent
  submitEmail(event) {
    console.log("in ");
    axios
      .post("http://206.189.195.166:3200/user/forgotpassword", {
        email: this.state.email,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.code === 210) {
          this.setState({
            showError: true,
            message: "",
          });
        } else if (response.data.code === 200) {
          this.setState({
            showError: false,
            message: "recovery email sent",
            showEmailbox: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return false;
  }
// Form for a forgot password
  render() {
    return (
      <div>
        <Layout
          style={{ width: "100%", height: "100vh", backgroundColor: "white" }}
        >
          <div id="header">
            <Header1 />
          </div>

          <div className="fp_container">
            {" "}
            {!(this.state.message === "recovery email sent") && (
              <div>
                <h1 style={{ fontSize: "250%", marginTop: "1%" }}>
                  {" "}
                  Forgot your Password ?
                </h1>
                <Form onFinish={this.submitEmail}>
                  <Form.Item
                    style={{
                      textAlign: "center",
                      margin: "4%",
                      width: "30%",
                      marginTop: "7%",
                      marginLeft: "33%",
                      fontSize: "18px",
                    }}
                    name="email"
                    label={<h1 style={{ marginright: "15%" }}>Email</h1>}
                    rules={[
                      { type: "email", message: "Please enter a valid Email" },
                    ]}
                  >
                    <Input
                      className="forgot-password-input"
                      style={{ fontSize: "18px", marginLeft: "3%" }}
                      placeholder="Enter your Email address"
                      id="success"
                      onChange={this.handleChangeEmail}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      className="Submit-button"
                      htmlType="submit"
                      onSubmit={this.submitEmail}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}
            {this.state.showError && (
              <div>
                <p className="e_not_rec">
                  The given email address does not recognized, Please try again
                  or register for a new account.
                </p>
              </div>
            )}
            {this.state.message === "recovery email sent" && (
              <div>
                {" "}
                <h3 className="resetSuccess">
                  {" "}
                  Password Reset Email sent successfully
                </h3>
              </div>
            )}
          </div>
        </Layout>
      </div>
    );
  }
}

export default ForgotPassword;
