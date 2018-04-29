import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
const { SubMenu } = Menu;
const {  Content, Sider } = Layout;
import React from 'react'
import ReactDOM from 'react-dom'

class Navigation extends React.Component{
  render(){
    return(
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['home']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="home" >
            <Icon type="home" />
            <span>Home</span>
          </Menu.Item>

          <SubMenu key="sub1" title={<span><Icon type="team" />Competition</span>}>
            <Menu.Item key="1">option1</Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="database" />Model</span>}>

          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}

export default Navigation
