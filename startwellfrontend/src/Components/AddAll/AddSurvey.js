import React, { useState ,Component} from 'react'
import { Button, Input, Form, Select } from 'antd';
import axios from 'axios';
import QuestionForm from "../QuestionForm"
import Modal from "./QuestionModal"
import Close from "../QuestionModal/cancel.svg"
import "../QuestionModal/modal.css"
const { Option } = Select;

export default class AddSurvey extends Component {
  constructor() {
    super();
    this.state = {
      showForm : false,
      submitSuccess: false,
      categoryDataInfo: [],
      categorytDataFetched: false,
      selectedCategory: null,
      selectedBucket: null,
      showAddQuestions : false,
      surveyID:'',
      isOpen: false
    };
  }

  componentDidMount = () => {
    this.setState({
      submitSuccess: false
    });
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  // componentDidUpdate = () => {
  //   this.getCategoryData();
  // };
  handleChangeCategory = response => {
    this.setState({
      selectedCategory: response.value
    });
  };  

  // handleChangeBucket = response => {
  //   // this.setState({
  //   //  selectedBucket: response.value
  //   // });
  //   getCategoryData(response.value)
  // };



  getCategoryData = (selectedBucketParam) => {
    console.log("f")
    
    // if (!this.state.categoryDataInfo.length) {
      axios
        .get('http://206.189.195.166:3200/CateogryUnderEachBucket',{ params: {BucketType: selectedBucketParam.value } })
        .then(response => {
          if (response.status === 200) {
            console.log(JSON.stringify(response.data));
            this.setState({
              selectedBucket: selectedBucketParam.value,
              categoryDataInfo: response.data,
              categorytDataFetched: true
            });
            console.log('User Survey Bucket', response);
          } else {
            let surveyError = 'Error while processing survey bucket';
            this.setState({ surveyError });
            console.log(' Survey bucket API failed', response);
          }
        })
        .catch(error => {
          console.log('error occured', error);
        });
    // }
  };

  render() {
    const layout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      }
    }
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16
      }
    };

    const onFinish = values => {
      axios
        .post('http://206.189.195.166:3200/addSurvey', {
          SurveyTitle: values.SurveyTitle,
          CategoryID: this.state.selectedCategory,
          BucketType: this.state.selectedBucket
        })
        .then(response => {
          if (response.status === 200) {
            console.log(JSON.stringify(response.data));
            console.log("surveyID",response.data[0].SurveyID);
            this.setState({
              submitSuccess: response.data.message,
              showAddQuestions : true,
              surveyID : response.data[0].SurveyID
            })

            this.render();
          } else if (response.data.code === 204) {
            console.log('User Status Submission failed with response: ', response);
          }
        })
        .catch(error => {
          console.log('error occured', error);
        });
    };
    const submitSuccess = this.state.submitSuccess === 'Status Changed';
    const categoryDataInfo = this.state.categoryDataInfo ? this.state.categoryDataInfo : [];
    const dataArray = [];
    for (const data of categoryDataInfo) {
      dataArray.push(data.CategoryID);
    }
  
    const showForm = () => {
      return (
        <div> 
       <Form.Item
              label='Question No:'
              name='Question No:'
              rules={[
                {
                  required: true,
                  message: 'Question No is a mandatory Filed'
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Question Text'
              name='Question Text'
              rules={[
                {
                  required: true,
                  message: 'Question is mandatory Filed'
                }
              ]}
            >
              <Input />
              </Form.Item>

              <Form.Item
              label='Weights'
              name=' Weights'
              rules={[
                {
                  required: true,
                  message: 'Question is mandatory Filed'
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type='primary' htmlType='submit'>
                submit
              </Button>
            </Form.Item>

          
         </div>
        );
    }
   

    return (
      <div style={{ marginTop: '50px', width: '80%' }}>
        {submitSuccess ? (
          <div>Survey Added</div>
        ) : (
          <Form {...layout} name='basic' onFinish={onFinish}>
            <Form.Item
              label='SurveyTitle'
              name='SurveyTitle'
              rules={[
                {
                  required: true,
                  message: 'SurveyTitle is mandatory Filed'
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item style={{ marginLeft: '77px' }}>
              <span style={{ marginRight: '13px' }}>Bucket Type:</span>

              <Select labelInValue
                defaultValue={{ value: 'All' }}
                style={{ width: '200px' }}
                onChange={this.getCategoryData}>
                
                  <Option value="Customer"> Customer  </Option>
                  <Option value="Provider">  Provider </Option>
                  <Option value="All"> All </Option>
              </Select>
            </Form.Item>

        
            <Form.Item style={{ marginLeft: '77px' }}>
              <span style={{ marginRight: '13px' }}>Category:</span>

              <Select
                labelInValue
                defaultValue={{ value: 'All' }}
                style={{ width: '200px' }}
                onChange={this.handleChangeCategory}
              >
                {dataArray.map(data => (
                  <Option value={data}>{data}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
              {(this.state.showAddQuestions) ? 
                <Button  onClick={this.toggleModal}>Add Questions to the Survey</Button> : null }
            
            </Form.Item>


            <Modal show={this.state.isOpen}
      onRequestClose={this.toggleModaltoggleModal}
     
      contentLabel="Question Modal"
    >
      <div className="modal-header">
        <p />
        <p>Add a question</p>
        <span onClick={this.toggleModal} className="close">
         <img src={Close} alt="Press button to close modal" /> 
        </span>
      </div>
      <QuestionForm toggleModal={this.toggleModal} surveyID={this.state.surveyID} />
    </Modal>

          </Form>
        )}
      </div>
    );
  }
}