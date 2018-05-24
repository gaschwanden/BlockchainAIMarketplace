import React from 'react'
import ReactDOM from 'react-dom'
import './../css/index.css'
import 'antd/dist/antd.css';
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
        categories: [],
        instance: null,
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
    var marketPlace = contract(MarketPlace);
    marketPlace.setProvider(this.state.web3.currentProvider);
    var marketInstance;

    this.state.web3.eth.getAccounts((error, account) => {
      this.setState({account})
      console.log(account);
      marketPlace.deployed().then((instance)=>{
        marketInstance = instance;
        this.setState({instance});

        return marketInstance.get_count.call()
      }).then((result)=>{
          var category_count = result.c[0];
          // console.log("2", category_count)
          return category_count
      }).then((result)=>{
          var temp = [];
          for (var i=0 ; i<result ; i++){
            marketInstance.get_category.call(i).then((result)=>{
              // console.log(result);
              temp.push(result);
            })
          }
          return temp
      }).then((result)=>{
          this.setState({ categories: result })
          // console.log("3", this.state.categories);

      })
    })
  }


  render(){
    return <Dashboard
        account={this.state.account}
        category={this.state.categories}
        web3={this.state.web3}
        instance={this.state.instance}/>
  }

}

ReactDOM.render(
   <App />,
   document.getElementById('app')
)

module.hot.accept();
