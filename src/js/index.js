import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import './../css/index.css'
import 'antd/dist/antd.css';
// import { AppContainer } from 'react-hot-loader'
import Dashboard from './layout.js'
import 'ant-design-pro/dist/ant-design-pro.css';


class App extends React.Component {
  //
  // constructor(props){
  //
  // }

  render(){
    return <Dashboard/>
  }

}

ReactDOM.render(
   <Dashboard/>,
   document.getElementById('app')
)

module.hot.accept();
