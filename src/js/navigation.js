/**
 * Created by machenhan on 2018/3/24.
 *
 * Navigation bar on the left
 * @component Menus wraps sub menus, to trigger React Router using Link to
 *
 */
import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Sider } = Layout;
import React from 'react'
import { Link } from "react-router-dom";


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


          <SubMenu key="sub1" title={<span><Icon type="database" />Model</span>}>

            <Menu.Item key="1">
              <Link to={`/models/user/${this.props.account}`}>
                <Icon type="file" />My Models
              </Link>
            </Menu.Item>

            <Menu.Item key="2">
              <Link to="/models">
                <Icon type="appstore" />Discover Models
              </Link>
            </Menu.Item>

          </SubMenu>

          <SubMenu key="sub2" title={<span><Icon type="team" />Contest</span>}>

            <Menu.Item key="3">
              <Link to="/mycontest">
                <Icon type="code" />My Contests
              </Link>
            </Menu.Item>

            <Menu.Item key="4">
              <Link to="/contests">
                <Icon type="appstore-o" />Discover Contest
              </Link>
            </Menu.Item>

          </SubMenu>

        </Menu>
      </Sider>
    )
  }
}

export default Navigation
