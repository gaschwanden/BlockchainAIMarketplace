import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
const { SubMenu } = Menu;
const {  Content, Sider } = Layout;
import React from 'react'
import ReactDOM from 'react-dom'
import './../css/layout.css'
import TopBar from './header.js'
import Navigation from './navigation.js'
import { BrowserRouter as Router, Link, NavLink, Route } from "react-router-dom";
import DiscoverContests from './discoverContest.js'
import DiscoverModels from './discoverModel.js'
import MyContests from './myContests.js'
import MyModel from './myModels.js'
import UserHome from './home.js'


class Dashboard extends React.Component{
  render(){
    return(
      <Layout className="OutLayout">
        <TopBar account={this.props.account}/>
        <Router>
        <Layout>
          <Navigation />
          <Layout style={{ padding: '0 24px 24px' }}>
            {/*}<Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>*/}
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              <Route exact={true} path="/" component={UserHome}/>
              <Route path="/mycontest" component={MyContests}/>
              <Route path="/contests" component={DiscoverContests}/>
              <Route path="/mymodel" component={MyModel}/>
              <Route path="/models" component={DiscoverModels}/>
            </Content>
          </Layout>
        </Layout>
        </Router>
      </Layout>
    )
  }
}


export default Dashboard
