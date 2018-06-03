import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import React from 'react'
import ReactDOM from 'react-dom'
import './../css/layout.css'

class TopBar extends React.Component{
  render(){
    return(
      <Header className="header">

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <div className="logo" >
            <p className="title" >Market Place</p>
          </div>
          <div style={{float:'right', paddingRight:'1%'}}>
            {
              this.props.account !== '0x0' || this.props.account !== "" ?
              <p style={{color:'white'}}>
                {"Welcome, " + this.props.account}
              </p>
              : <Button>Please Login use MetaMask</Button>
            }
          </div>
        </Menu>


      </Header>
    )
  }
}

export default TopBar
