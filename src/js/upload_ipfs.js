import {Grid, Form } from 'react-bootstrap';
import React, { Component } from 'react';
//import logo from './logo.svg';
import './../css/ipfs.css';
import web3 from './../utils/web3.js';
import getWeb3 from './../utils/getWeb3.js';

import ipfs from './ipfs.js';
import storehash from './storehash.js';
import { Button, Table } from 'antd';



class Ipfs extends Component {

    state = {
      ipfsHash:null,
      buffer:'',
      ethAddress:'',
      blockNumber:'',
      transactionHash:'',
      gasUsed:'',
      txReceipt: ''
    };



    captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)
      };

    convertToBuffer = async(reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
        const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
        this.setState({buffer});
    };

    onClick = async () => {

    try{
        this.setState({blockNumber:"waiting.."});
        this.setState({gasUsed:"waiting..."});
        console.log("Data Source", this.dataSource);
        console.log(this.state);
        // get Transaction Receipt in console on click
        // See: https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt
        await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
          console.log(err,txReceipt);
          this.setState({txReceipt});
        }); //await for getTransactionReceipt

        await this.setState({blockNumber: this.state.txReceipt.blockNumber});
        await this.setState({gasUsed: this.state.txReceipt.gasUsed});
      } //try
    catch(error){
        console.log(error);
      } //catch
  } //onClick

    onSubmit = async (event) => {
      event.preventDefault();

      //bring in user's metamask account address
      const accounts = await web3.eth.getAccounts();

      console.log('Sending from Metamask account: ' + accounts[0]);

      //obtain contract address from storehash.js
      const ethAddress= await storehash.options.address;
      this.setState({ethAddress});

      //save document to IPFS,return its hash#, and set hash# to state
      //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add
      await ipfs.add(this.state.buffer, (err, ipfsHash) => {
        console.log(err,ipfsHash);
        //setState by setting ipfsHash to ipfsHash[0].hash
        this.setState({ ipfsHash:ipfsHash[0].hash });

        // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract
        //return the transaction hash from the ethereum contract
        //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send

        storehash.methods.sendHash(this.state.ipfsHash).send({
          from: accounts[0]
        }, (error, transactionHash) => {
          console.log(transactionHash);
          this.setState({transactionHash});
        }); //storehash
      }) //await ipfs.add
    }; //onSubmit

    render() {

        const dataSource = [{
            key: '1',
            name: 'IPFS Hash stored on Eth Contract',
            value: this.state.ipfsHash,
        }, {
            key: '2',
            name: 'Ethereum Contract Address',
            value: this.state.ethAddress,
        },{
            key: '3',
            name: 'Transaction Hash',
            value: this.state.transactionHash,
        },{
            key: '4',
            name: 'Block Number',
            value: this.state.blockNumber,
        },{
            key: '5',
            name: 'Gas Used',
            value: this.state.gasUsed,
        }];

        const columns = [{
            title: 'Receipt Category',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Values',
            dataIndex: 'value',
            key: 'value',
        }];

      return (
        <div className="App">

          <hr />

        <Grid>
          <h2> Choose file to send to IPFS </h2>
          <Form onSubmit={this.onSubmit}>
            <input
              type = "file"
              onChange = {this.captureFile}
            />
             <Button
             type="primary"
             htmlType="submit">
             Send it
             </Button>
          </Form>

          <hr/>
            <Button onClick = {this.onClick}> Get Transaction Receipt </Button>
            <hr />
            <Table dataSource={dataSource} columns={columns} />
        </Grid>
     </div>
      );
    } //render
}

export default Ipfs;
