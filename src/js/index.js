/**
 * Created by machenhan on 2018/3/24.
 *
 * Entry for all components,
 * @component Dashboard, the bone for sub components
 * @instruction Connect to web3 and save contract as an instance in componentWillMount
 *
 */

import React from 'react'
import ReactDOM from 'react-dom'
import './../css/index.css'
import 'antd/dist/antd.css';
import Dashboard from './dashboard.js'
import 'ant-design-pro/dist/ant-design-pro.css';
import getWeb3 from './../utils/getWeb3';
import MarketPlace from '../../build/contracts/MarketPlace.json';
import 'babel-polyfill';

class App extends React.Component {

    constructor(props){
        super(props);

        this.state={
            web3: null,
            account: '0x0',
            categories: [],
            instance: null,
        }
    }

    // Setup web3 connection before mount component
    // Save web3 object in state
    componentWillMount(){
        // Setup Web3 Connection
        getWeb3.then(results => {
            this.setState({
                web3: results.web3
            });
            console.log(results.web3)
            // Instantiate contract once web3 provided.
            this.instantiateContract()
        }).catch(() => {
            console.log('Error finding web3.')
        })

    }


    // Do the initialization work in component will mount
    instantiateContract(){
        let contract = require('truffle-contract');              // Require truffle-contract
        let marketPlace = contract(MarketPlace);                 // Convert marketplace json to instance
        marketPlace.setProvider(this.state.web3.currentProvider);// Set web3 provider
        let marketInstance;

        this.state.web3.eth.getAccounts((error, account) => {

            this.setState({account})

            marketPlace.deployed().then((instance)=>{

                // Set contract instance
                marketInstance = instance;
                this.setState({instance});
                return marketInstance.get_count.call()      // Call built-in category array length
            }).then((result)=>{

                return result.c[0]   // Integer number of category array length
            }).then((result)=>{
                let temp = [];
                // Encapsulate built-in category array value
                for (let i=0 ; i<result ; i++){
                    marketInstance.get_category.call(i).then((result)=>{
                        temp.push(result);
                    })
                }
                return temp  // An array of categories, odd index for name, even index points to description
            }).then((result)=>{
                // Set category to component state
                this.setState({ categories: result })
                // console.log("3", this.state.categories);
            })
        })

    }


  render(){
      // console.log("Index", this.state.web3, this.state.instance,this.state.categories)

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
);

module.hot.accept();
