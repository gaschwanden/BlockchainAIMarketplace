import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import './../css/index.css'
import 'antd/dist/antd.css';
// import { AppContainer } from 'react-hot-loader'
import Dashboard from './layout.js'
import 'ant-design-pro/dist/ant-design-pro.css';
import getWeb3 from './../utils/getWeb3';

 App extends React.Component {

  constructor(props){
    super(props);
    const Contract = window.web3.eth.contract();


    this.state={
        ContractInstance: Contract.at('');
    }

    // Setup Web3 Connection
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })


  }

  componentDidMount() {

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
