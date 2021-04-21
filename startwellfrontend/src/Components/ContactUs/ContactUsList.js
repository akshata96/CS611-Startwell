import React, { Component } from 'react';
import { Empty, Table, Button, notification, Select } from 'antd';
import axios from 'axios';
import EdiText from "react-editext";
const { Option } = Select;
export default class ContactUsList extends Component {
  constructor() {
    super();
    this.state = {
      dataInfo: [],
      callMade: false,
      status:'',
    };
  }

  componentDidMount() {
    this.displayContactUsData();
  }

  componentDidUpdate() {
    if (this.state.userInfo?.length === 0 && this.state.userInfo.callMade === false) {
      this.displayContactUsData();
      this.setState({
        callMade: true
      });
    }
  }

  displayContactUsData = () => {
    this.setState({
      addBucketClicked: false
    });
    axios
      .get('http://localhost:9000/DisplayContactUs')
      .then(response => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            dataInfo: response.data
          });
          console.log('Contact Us response', response);
        } else {
          let surveyError = 'Error while fetching conatact us details';
          this.setState({ surveyError });
          console.log('Error while fetching user details', response);
        }
      })
      .catch(error => {
        console.log('error occured', error);
      });
  };

  
  openUpdateNotification = () => {
    notification.open({
      message: "Updated Status Succesfully",
      // description:
      // "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  
  editContactus = async (record,rowIndex) => {
    console.log("testedit", record)
    console.log("checking",record.status)
    
    await axios
      .put("http://localhost:9000/EditContactUs", {
        status: record.status ,
        SNo:this.state.SNo || record.SNo,
       
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            // surveyOptionsList: response.data,
            callMade: true,
          });
          console.log("Update status", response);
        } else {
          let surveyError = "Error while processing status update";
          this.setState({ surveyError });
          console.log("updation failed", response);
        }
      })
      .then(()=> this.displayContactUsData())
      .then(() => this.openUpdateNotification())
      .catch((error) => {
        console.log("error occured", error);
      });
  };

  render() {
    const dataInfo = this.state.dataInfo;
    let dataInfoAvailable = dataInfo.length;
    
    const editabledata = dataInfo.map((d, index) => {
      return (d = { ...d, ...{ Edit: "EDIT", key: index } });
    });

    const userDataAvailable = dataInfo.length;
   
  //console.log({ Survey: editabledata });
  const handlestatus = (value) => {
    this.setState({
      status: value.value,
    });
    console.log("setting status change",value.value)
  };

    const dataColumnInfo = [
      {
        title: '#',
        dataIndex: 'SNo',
        key:"Sno",
      },
      {
        title: 'Email Id  ',
        dataIndex: 'email',
        key:'email'
      },
      {
        title: 'Subject',
        dataIndex: 'subject',
        key:'subject'
      },
      {
        title: 'Message',
        dataIndex: 'message',
        key:'message'
      },
      {
        title: 'status',
        dataIndex: 'status',
        key:'status'
      }
    ];

    const status = editabledata.map((v) => v.status);
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {dataInfoAvailable ? (
            <Table style={{ width: '1000px', marginTop: '20px' }} 
            dataSource={dataInfo} 
            columns={dataColumnInfo} 
            expandable={{
              onExpand: (index, record) =>
                this.displayContactUsData(record, index),
              expandedRowRender: (record, rowIndex) => (
                <>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "flex-start",
                      marginBottom: "30px",
                    }}
                  >

                <Select
                  labelInValue
                  defaultValue={{ value: 'Unresolved' }}
                  style={{ width: '200px' }}
                  onChange={handlestatus}
                  onSave={handlestatus}
                 >
               <Option value='Resolved'>Resolved</Option>
               <Option value='Unresolved'>Unresolved</Option>
       
              </Select>
              </div> 
                  <div>
                    <Button
                      style={{
                        display: "inline-block",
                        marginLeft: "10%",
                        marginTop: "40px"
                      }}
                      onClick={() => this.editContactus(record)}
                    >
                      Update
                    </Button>
                   
                  </div>
                </>
              ),
              // rowExpandable: (record) =>
              //   record.QText !== "Not Expandable",
            }}
            
            />
          ) : (
            <Empty />
          )}
        </div>
      </div>
    );
  }
}
