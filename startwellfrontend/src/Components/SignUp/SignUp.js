import React, { Component } from "react";
import axios from "axios";
import {
  Form,
  Select,
  Row,
  Col,
  Input,
  Button,
  Layout,
  Tooltip,
  notification,
} from "antd";
import Header from "../Header/Header";
import "./SignUp.css";

const { Option } = Select;
const { Content } = Layout;



class SignUp extends Component {
  constructor(props) {
    super(props);
    this.userdata = {};
    this.state = {
      form: "Sign-up",
      firstname: "",
      lastname: "",
      email: "", // Holds the email of the user. Initially the db value is null, gets inserted on change
      password: "", // Holds the password of the user. Initially the db value is null, gets inserted on change
      password_confirmation: "",
      registration_errors: "",
      hasError: "",
      emailError: "",
      passwordError: "",
      userType: "Customer", // Holds the usertype of the user. Initially the db value is null, gets inserted on change
      nameError: "",
      Current_Status: "",
      LicenceID: "", // Holds the License ID of the user, in case it is a provider. Initially the db value, gets updated on change
      status: "False",
      Regi: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUserType = this.handleChangeUserType.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleChangePass2 = this.handleChangePass2.bind(this);
    //this.handleChange = this.handleChange.bind(this);
    this.handleSuccessfulRegister = this.handleSuccessfulRegister.bind(this);
    //this.handlecurrentstatus=this.handlecurrentstatus.bind(this);
    this.handleChangeLicenceID = this.handleChangeLicenceID.bind(this);
  }
  // Validation of all the forms and fields in signup
  validate() {
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let isValid = true;

    // let input = this.state.input;

    if (!this.state.email) {
      isValid = false;
      emailError = "Please enter your email Address."; // Updating the email error if the email is blank 
    }

    if (!this.state.firstname || !this.state.lastname) {
      isValid = false;
      nameError = "Please enter your Firstname/LastName"; //Updating the name error if the name is blank 
    }
    if (typeof this.state.email !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      ); //Checking if entered valid email 

      if (!pattern.test(this.state.email)) {
        isValid = false;
        emailError = "Please enter valid email address.";
      }
    }

    if (this.state.password.length < 7) {
      console.log("in password");
      isValid = false;
      passwordError = "Password length should be greater than 7."; // Updating the password error if the password is less than 7 
    }
    if (!isValid || emailError) {
      this.setState({ passwordError });
      this.setState({ emailError });
      return false;
    }
    if (this.state.password !== this.state.password_confirmation) {
      isValid = false;
      passwordError = "Both password doesn't match"; // checking if both passwords are same or not
    }

    if (!isValid) {
      this.setState({ passwordError });
      return false;
    }

    return true;
  }
  // After Registration the signup routes to login page
  handleSuccessfulRegister(data) {
    window.location = "/Login";
  }

  //   handleChange(event){

  //     this.setState({
  //         [event.target.name]:event.target.value,
  //         emailError:"",
  //         passwordError:"",
  //     })

  // }
  handleChangeLicenceID(event) {
    this.setState({ LicenceID: event.target.value });
  }
  handleChangeFirstName(event) {
    this.setState({ firstname: event.target.value });
  }
  handleChangeLastName(event) {
    this.setState({ lastname: event.target.value });
  }
  // Changing the Usertype
  handleChangeUserType(event) {
    this.setState({ userType: event });
    if (this.state.userType === "Provider") {
      this.setState({ Current_Status: "Inactive" });
    } else {
      this.setState({ Current_Status: "Active" });
    }
  }
  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  handleChangePass(event) {
    this.setState({ password: event.target.value });
  }

  handleChangePass2(event) {
    this.setState({ password_confirmation: event.target.value });
  }

  openUpdateNotification = () => {
    notification.open({
      message: "Registered Succesfully",
      style: { color: "red" },
      // description:
      // "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
// Submitting all the fields values
  handleSubmit(e) {
    e.preventDefault();
    this.state.passwordError = "";
    this.state.emailError = "";
    this.state.registration_errors = "";
    console.log(this.state.userType);
    if (this.state.userType === "Provider") {
      console.log("in if");
      this.state.Current_Status = "Inactive";
      this.setState({ Current_Status: "Inactive" });
      console.log("inside if", this.state.Current_Status);
    } else {
      console.log("in else");
      this.state.Current_Status = "Active";
      this.setState({ Current_Status: "Active" });
    }
    console.log("after if", this.state.Current_Status);
    const {
      firstname,
      lastname,
      email,
      password,
      userType,
      password_confirmation,
      Current_Status,
      LicenceID,
    } = this.state;
    const isValid = this.validate();
    console.log("validation true or false", isValid);
    console.log("in Registration");
    console.log(this.state.form);
    console.log(this.state.firstname);
    console.log(this.state.email);
    console.log(this.state.userType);
    console.log(this.state.Current_Status);

    if (isValid) {
      console.log("Posting");
      axios
        .post("http://206.189.195.166:3200/user/signup", {
          user: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            userType: userType,
            password_confirmation: password_confirmation,
            Current_Status: Current_Status,
            LicenceID: LicenceID,
          },
        })
        .then((response) => {
          if (response.data.code === 200) {
            this.setState({ Regi: "Registered Successfully" });
            this.openUpdateNotification();
            console.log("Respone for registration", response.data);
            console.log("registration succesfull", response);
            this.handleSuccessfulRegister(response.data);
          } else if (response.data.code === 210) {
            let emailError = "Email Already Exists";
            this.setState({ emailError });
            console.log("Email Already Exists");
          }
        })
        .catch((error) => {
          console.log("error occured", error);
        });
    }
  }
// Creating a Signup form
  render() {
    return (
      <div className="Signup-body">
        <div id="header">
          <Header />
        </div>

        <Content>
          <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Row>
              <Col span={2}></Col>
              <Col span={9}>
                <br></br>
                <h1 className="BigMessage">Welcome to Startwell </h1>
                <h1 className="BigMessage">Get our Best Advices </h1>
              </Col>
            </Row>
          </div>

          <div className="container">
            <Form
              name="normal_SignUp"
              className="SignUp-form"
              initialValues={{
                remember: true,
              }}
              onSubmit={this.handleSubmit}
            >
              <h1 style={{ marginTop: "80px", fontFamily: "Cooper Black" }}>
                {" "}
                SIGN UP{" "}
              </h1>

              <Form.Item
                name="First-Name"
                label="First-Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your FirstName!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  placeholder="FirstName"
                  type="text"
                  value={this.state.firstname}
                  onChange={this.handleChangeFirstName}
                  required
                />
              </Form.Item>
              <Form.Item
                name="Last-Name"
                label="Last-Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Last-Name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  placeholder="lastname"
                  type="text"
                  value={this.state.lastname}
                  onChange={this.handleChangeLastName}
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input
                  placeholder="Email-ID"
                  value={this.state.email}
                  onChange={this.handleChangeEmail}
                />
              </Form.Item>
              <Tooltip
                placement="top"
                title="The password length should be greater than 6"
              >
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChangePass}
                  />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input
                    placeholder="Re-typed password"
                    type="password"
                    value={this.state.password_confirmation}
                    onChange={this.handleChangePass2}
                  />
                </Form.Item>
              </Tooltip>
              <Form.Item
                name="User-Type"
                label="User-Type"
                hasFeedback
                rules={[
                  { required: true, message: "Please select your User Type!" },
                ]}
              >
                <Select
                  placeholder="Please select a User Type"
                  value={this.state.userType}
                  onChange={this.handleChangeUserType}
                >
                  <Option value="Customer">Customer</Option>
                  <Option value="Provider">Provider</Option>
                </Select>
              </Form.Item>
              {this.state.userType === "Customer" ? (
                ""
              ) : (
                <Form.Item
                  name="LicenceID"
                  label="LicenceID"
                  rules={[
                    {
                      required: true,
                      message: "Please input your LicenceID!",
                      whitespace: true,
                    },
                  ]}
                >
                  <input
                    name="LicenceID"
                    placeholder="LicenceID"
                    type="text"
                    value={this.state.LicenceID}
                    onChange={this.handleChangeLicenceID}
                    required
                  />{" "}
                </Form.Item>
              )}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !this.state.email ||
                    !this.state.password ||
                    !this.state.password_confirmation ||
                    !this.state.firstname ||
                    !this.state.lastname ||
                    !this.state.userType
                  }
                  onClick={this.handleSubmit}
                >
                  Register
                </Button>
              </Form.Item>
              <div style={{ fontSize: 15, color: "red" }}>
                {this.state.Regi}
              </div>
              <div style={{ fontSize: 15, color: "red" }}>
                {this.state.emailError}
              </div>
              <div style={{ fontSize: 15, color: "red" }}>
                {this.state.passwordError}
              </div>
              <div style={{ fontSize: 15, color: "red" }}>
                {this.state.nameError}
              </div>
            </Form>
          </div>
        </Content>
      </div>
    );
  }
}

export default SignUp;
