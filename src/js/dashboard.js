import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
const { SubMenu } = Menu;
const {  Content, Sider } = Layout;
import React from 'react'
import './../css/layout.css'
import TopBar from './header.js'
import Navigation from './navigation.js'
import { BrowserRouter as Router, Link, NavLink, Route } from "react-router-dom";
import DiscoverContests from './discover_contest.js'
import DiscoverModels from './discover_model.js'
import MyContests from './my_contests.js'
import MyModel from './my_models.js'
import UserHome from './home.js'
import ModelList from './model_list.js'
import ModelDetail from './model_detail.js'
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';


class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            category: this.props.category,
            web3: null,
            instance: null,
        }

    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.web3 !== prevState.web3 || nextProps.instance !== prevState.instance) {
            return {
                web3: nextProps.web3,
                instance: nextProps.instance,
            };
        }
        // Return null to indicate no change to state.
        return null;
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
              component: MyModel,
              category: this.props.category,
          },
          {
              path: "/models",
              component: DiscoverModels,
              category: this.props.category,
              exact: true
          },
          {
              path: "/models/:categoryName",
              component: ModelList
          },
          {
              path: "/model/:modelID",
              component: ModelDetail,
              exact: true
          }
      ];

      console.log("Instance",this.state.instance,)

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
                            account={this.props.account}
                            data={route.category}
                            web3={this.state.web3}
                            instance={this.state.instance}/>} // TODO pass state
                  />
              ))}


            </Content>
          </Layout>
        </Layout>
        </Router>
          <Alert stack={{limit: 3}} />
      </Layout>
    )
  }
}


export default Dashboard
