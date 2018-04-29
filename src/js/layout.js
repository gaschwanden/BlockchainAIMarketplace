import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
const { SubMenu } = Menu;
const {  Content, Sider } = Layout;
import React from 'react'
import ReactDOM from 'react-dom'
import './../css/layout.css'
import TopBar from './header.js'
import Navigation from './navigation.js'

class Dashboard extends React.Component{
  render(){
    return(
      <Layout className="OutLayout">
        <TopBar account={this.props.account}/>
        <Layout>
          <Navigation />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}


export default Dashboard
