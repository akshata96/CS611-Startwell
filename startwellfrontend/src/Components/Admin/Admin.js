import React, { Component } from "react";
import props from 'prop-types';

import { Layout, Menu, Table } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import './Admin.css';


const columns = [
  {
    title: 'First Name',
    dataIndex: 'first_name',
    key: 'first_name',
    render: text => <p>{text}</p>,
  },
  {
    title: 'Last Name',
    dataIndex: 'Last_Name',
    key: 'Last_Name',
    render: text => <p>{text}</p>,
  },
  {
    title: 'Email',
    dataIndex: 'Email',
    key: 'Email',
  },

  {
    title: 'Gender',
    dataIndex: 'Gender',
    key: 'Gender',
  },


  {
    title: 'Date of Birth',
    dataIndex: 'Date of Birth',
    key: 'Date of Birth',

  },
  
  {
    title:'Status',
    dataIndex:'IS_Leader',
    key:'IS_Leader',
    render: text => <p>{text ? "Leader" :"Member"}</p>
  }
  
];



const { Header, Content, Footer, Sider } = Layout;



export default class Admin extends Component {
  
    render() {
    return (
      
         <Layout>
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div className="logo" />
      <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>

        <Menu.Item key="1" icon={<UserOutlined />}>
          StartWell Logo
        </Menu.Item>

        <br /> <br /> <br /> <br />  <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        
       
        <Menu.Item key="2" icon={<TeamOutlined />}>
          User Accounts
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          Survey Pages
        </Menu.Item>
        <Menu.Item key="4" icon={<VideoCameraOutlined />}>
          Newsletter Content
        </Menu.Item>
        <Menu.Item key="5" icon={<AppstoreOutlined />}>
          Self-help Content
        </Menu.Item>
        <Menu.Item key="6" icon={< BarChartOutlined />}>
          Payment Profile
        </Menu.Item>
        {/* <Menu.Item key="7" icon={< CloudOutlined />}>
          
        </Menu.Item> */}
       
      </Menu>
    </Sider>
    <Layout className="site-layout" style={{ marginLeft: 200 }}>
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
        
        <br />

        <br />

        <Table columns={columns} dataSource={props.data} />

        <br />
        <br />

        <br />
        <br />

        <br />
        <br />

        <br />
        <br />
        <br />
        <br />

        <br />
        <br />

        <br />
        
        
        
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>StartWell ©2021 </Footer>
    </Layout>
  </Layout>
      
    );
  }
}


