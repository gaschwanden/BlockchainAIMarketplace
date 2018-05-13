import React from 'react'
import ReactDOM from 'react-dom'
import './../css/index.css'
import 'antd/dist/antd.css';
// import { AppContainer } from 'react-hot-loader'
import Dashboard from './layout.js'
import 'ant-design-pro/dist/ant-design-pro.css';
import getWeb3 from './../utils/getWeb3';
import MarketPlace from '../../build/contracts/MarketPlace.json';
import 'babel-polyfill';

class App extends React.Component {

  constructor(props){
    super(props)

    this.state={
        web3: null,
        account: '0x0',

    }
  }

  componentWillMount(){
    // Setup Web3 Connection
    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    }).catch(() => {
      console.log('Error finding web3.')
    })

  }


  instantiateContract(){
    console.log("instantiateContract");

    var contract = require('truffle-contract');
    var marketPlace = contract(MarketPlace)
    marketPlace.setProvider(this.state.web3.currentProvider)
    var marketInstance


    this.state.web3.eth.getAccounts((error, account) => {
      this.setState({account})
      console.log(account);
      marketPlace.deployed().then((instance) => {
        console.log("Deployed marketplace contract");
        marketInstance = instance
      })
    })
  }


  render(){
    return <Dashboard account={this.state.account}/>
  }

}

ReactDOM.render(
   <App />,
   document.getElementById('app')
)

module.hot.accept();
