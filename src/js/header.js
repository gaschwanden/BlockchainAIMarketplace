/**
 * Created by machenhan on 2018/3/24.
 *
 * Header of the application
 * Shows the name of application and a message for users
 * @component A logo and a message with user account passed in
 *
 */

import { Layout, Menu, Button } from 'antd';
const { Header, Content, Sider } = Layout;
import React from 'react'
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

                        {   this.props.account.length !== 42
                            ?   <p style={{color:'white'}}>
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
