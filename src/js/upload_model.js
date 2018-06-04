import React, { Component } from 'react';
import './../css/ipfs.css';
import web3 from './../utils/web3.js';
import Alert from 'react-s-alert';
import ipfs from '../utils/ipfs.js';
import storehash from '../utils/storehash.js';
import {    Button, Table, Form,
            Input, Divider, Icon,
            InputNumber, message,
            Spin, Alert as Notification} from 'antd';
const FormItem = Form.Item;


class UploadModel extends Component {
    constructor(props){
        super(props)
        this.state = {
            web3: null,
            instance: null,
            loading: false,

            // Model part
            category:'Image Recognition',
            account: this.props.account,
            description: "",
            parent: -1,
            price: 0,
            accuracy: 0,

            // IPFS part
            ipfsHash:null,
            buffer:'',
            ethAddress:'',
            blockNumber:'',
            transactionHash:'',
            gasUsed:'',
            txReceipt: '',
        };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps!== prevState) {
            return {
                web3: nextProps.web3,
                instance: nextProps.instance,
            };
        }
        // Return null to indicate no change to state.
        return null;
    }



    // Model file buffer
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


    // Display transaction receipt
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


    // Function for handling upload the model to IPFS
    onSubmit = async (event) => {
      event.preventDefault();
        this.setState({loading:true});
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
          this.setState({loading:false})
        }); //storehash
      }) //await ipfs.add
    }; //onSubmit


    // Function for handling upload the whole form to Blockchain
    handleSubmit = (e) => {
        e.preventDefault();
        const { match: { params } } = this.props;

        var category = e.target.category.value;
        var author = this.props.account;
        var modelName = e.target.modelName.value;
        var description = e.target.modelDescription.value;
        var price = e.target.price.value;
        var ipfs = this.state.ipfsHash;
        var parent = params.parentID;

        if (ipfs===null){
            console.log("Fired")
            Alert.info('Please upload your model', {
                position: 'top-right',
                effect: 'genie'
            });

            return false
        }

        let instance = this.props.instance;
        console.log(this.props.instance, parent)
        instance.get_iterationLevel.call(parseInt(parent), {from: this.props.account[0]}).then((result) =>{

            let iterationLevel = result.c[0];
            console.log("Iterate:", result)
            let accuracy = Math.floor(Math.random() * 101);
            console.log("Accuracy", accuracy)

            console.log(modelName, parent, description, ipfs, accuracy, category, iterationLevel, price)

            return instance.create_model(
                modelName, parent, description, ipfs, accuracy, category, iterationLevel, price,
                {from:this.props.account[0]})
        }).then((result)=>{

            console.log("Create model result", result)
            return instance.get_model_count.call()

        }).then((result)=>{
            console.log("Model count created", result)

            return instance.get_all_models_by_user(this.props.account, {from:this.props.account[0]})
        }).then((result)=>{
            console.log(result)
            message.success('Model Upload success!');
        }).catch((err)=>{
            console.log(err)
            message.error('An error occured when uploading model!');
        })

    };


    render() {

        const { match: { params } } = this.props;

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
            <Form onSubmit={this.handleSubmit} className="Form">
                <Divider><h2> Upload Model </h2></Divider>

                <div className="Formitems">
                    <FormItem label="Name">
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                               defaultValue={this.props.account}
                               size="large"
                               name="author"
                               disabled="true"/>
                    </FormItem>
                    <FormItem label="Model Category">
                        <Input prefix={<Icon type="bars" style={{ color: 'rgba(0,0,0,.25)' }} />}
                               defaultValue={params.category}
                               size="large"
                               name="category"
                               disabled="true"/>
                    </FormItem>
                    <FormItem label="Model Name">
                        <Input prefix={<Icon type="file" style={{ color: 'rgba(0,0,0,.25)' }} />}
                               placeholder="Input your model name"
                               size="large"
                               name="modelName"
                               required="true"
                        />
                    </FormItem>
                    <FormItem label="Model Description">
                        <Input prefix={<Icon type="file" style={{ color: 'rgba(0,0,0,.25)' }} />}
                               placeholder="Input your model description"
                               size="large"
                               name="modelDescription"
                               required="true"
                               rows={4}
                        />
                    </FormItem>
                    <FormItem label="Model Price (Set your relative model price 1-100)">
                        <InputNumber prefix={<Icon type="file" style={{ color: 'rgba(0,0,0,.25)' }} />}
                               placeholder="Price"
                               size="large"
                               name="price"
                               required="true"
                               min={1}
                               max={10}
                        />
                    </FormItem>
                </div>
                <div>
                    <Spin size="large"
                              spinning={this.state.loading}
                              className="Float"
                              tip="Waiting for MetaMask to send the Transaction...">
                    </Spin>

                    <Divider><h3> Choose file to send to IPFS </h3></Divider>

                      <Form onSubmit={this.onSubmit}>
                          <div>
                              <input className="input"
                                  type = "file"
                                  onChange = {this.captureFile}
                              />
                              <Button
                                  type="primary"
                                  htmlType="submit"
                                  name="submitFile">
                                  Send it
                              </Button>
                          </div>

                      </Form>
                    <Divider/>
                        <Button className="getReceipt" onClick = {this.onClick}> Get Transaction Receipt </Button>
                        <br />
                        <Table dataSource={dataSource} columns={columns} />
                </div>
                <FormItem>
                    <Button type="primary" htmlType="submit" name="submitModel">Submit Model</Button>
                </FormItem>
            </Form>
        </div>
      );
    } //render
}

export default UploadModel;
