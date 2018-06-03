import { Layout } from 'antd';
const {  Content } = Layout;
import React from 'react'
import './../css/layout.css'
import TopBar from './header.js'
import Navigation from './navigation.js'
import { BrowserRouter as Router, Route } from "react-router-dom";
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
        super(props);
        this.state = {
            category: this.props.category,
            web3: null,
            instance: null,
        }

    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps !== prevState) {
            return {
                web3: nextProps.web3,
                instance: nextProps.instance,
                account : nextProps.account,
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
              // :param refers to "category", "children" or "user"
              // :paramKey refers to "category name", "parent model ID" or "user address"
              path: "/models/:param/:paramKey",
              component: ModelList
          },
          {
              path: "/model/:modelID",
              component: ModelDetail,
              exact: true
          }
      ];

    return(
      <Layout className="OutLayout">
        <TopBar account={this.props.account}/>
        <Router>
        <Layout>
          <Navigation account={this.props.account}/>
          <Layout style={{ padding: '0 0 24px 24px',  }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 400 ,overflow: 'auto'}}>
              {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    render={(props) =>
                        <route.component
                            account={this.props.account}
                            data={route.category}
                            web3={this.state.web3}
                            instance={this.state.instance}
                            {...props}/>}
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
