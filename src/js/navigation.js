import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
const { SubMenu } = Menu;
const {  Content, Sider } = Layout;
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";


class Navigation extends React.Component{
  render(){
    return(
      <Sider width={250} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['home']}
          style={{ height: '100%', borderRight: 0 }}
        >

          <Menu.Item key="home" >
            <Link to="/">
              <Icon type="home" />
              <span>Home</span>
            </Link>
          </Menu.Item>

          <SubMenu key="sub1" title={<span><Icon type="team" />Contest</span>}>
            <Menu.Item key="1">
              <Link to="/mycontest">
                <Icon type="code" />My Contests
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/contests">
                <Icon type="appstore-o" />Discover Contest
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" title={<span><Icon type="database" />Model</span>}>
            <Menu.Item key="3">
              <Link to="/mymodel">
                <Icon type="file" />My Models
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/models">
                <Icon type="appstore" />Discover Models
              </Link>
            </Menu.Item>
          </SubMenu>

        </Menu>
      </Sider>
    )
  }
}

export default Navigation
