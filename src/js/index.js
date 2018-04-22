import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import './../css/index.css'
import 'antd/dist/antd.css';
// import { AppContainer } from 'react-hot-loader'
import Dashboard from './layout.js'
import 'ant-design-pro/dist/ant-design-pro.css';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state={

    }

    if (typeof web3 != 'undefined'){
      this.web3Provider = web3.currentProvider
    }else{
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }

    this.web3 = new Web3(this.web3Provider)
  }

  render(){
    return <Dashboard/>
  }

}

ReactDOM.render(
   <Dashboard/>,
   document.getElementById('app')
)

module.hot.accept();
