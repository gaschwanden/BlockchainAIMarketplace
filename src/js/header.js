/**
 * Created by machenhan on 2018/3/24.
 *
 * Header of the application
 * Shows the name of application and a message for users
 * @component A logo and a message with user account passed in
 *
 */

import { Layout, Menu, Button } from 'antd';
const { Header } = Layout;
import React from 'react'
import './../css/layout.css'
import Alert from 'react-s-alert';
import ReactDOMServer from 'react-dom/server';

class TopBar extends React.Component{


    // An alert message for users not logged in
    alertMessage = (
        <div>
            <h3>Please ensure you have logged in with MetaMask</h3>
            <ul>
                <li>Install MetaMask in Google extension</li>
                <li>Set port 8545 to both Ganache and MetaMask</li>
                <li>Open Ganache, copy the private key</li>
                <li>Import account using private key in MetaMask</li>
                <li>Refresh the page!</li>
            </ul>
        </div>
    );

    // Onclick login button
    onClick = (e) => {
        e.preventDefault();
        Alert.error(ReactDOMServer.renderToStaticMarkup(this.alertMessage), {
            position: 'top',
            effect: 'jelly',
            html: true,
            timeout: 5000,
        });
    };

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

                        {   this.props.account.length === 1
                            ?
                            <p style={{color:'white'}}>
                                {"Welcome, " + this.props.account}
                            </p>
                            :
                            <Button onClick={this.onClick.bind(this)}>
                                Please Login use MetaMask
                            </Button>
                        }

                    </div>
                </Menu>

            </Header>
        )
    }
}

export default TopBar
