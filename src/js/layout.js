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
import ModelList from './models.js'

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            category: this.props.category,
            web3: this.props.web3,
            instance: this.props.instance,
        }
    }

  render(){

      const routes =[
          {
              path: "/",
              exact: true,
              component: UserHome
          },
          {
              path: "/mycontest",
              component: MyContests
          },
          {
              path: "/contests",
              component: DiscoverContests
          },
          {
              path: "/mymodel",
              component: MyModel
          },
          {
              path: "/models",
              component: DiscoverModels,
              category: this.props.category,
              routes:[
                  {
                      path: "/models/:categoryName",
                      component: ModelList
                  },
              ]
          }
      ];

      console.log("Constructor", routes[4].category)
      console.log("Instance",this.props.instance)

    return(
      <Layout className="OutLayout">
        <TopBar account={this.props.account}/>
        <Router>
        <Layout>
          <Navigation />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component= {() =>
                        <route.component
                            data={route.category}
                            web3={this.state.web3}
                            instance={this.state.instance}/>}
                  />
              ))}


            </Content>
          </Layout>
        </Layout>
        </Router>
      </Layout>
    )
  }
}


export default Dashboard
