/**
 * Created by machenhan on 2018/5/24.
 *
 * Details of a specific model
 *
 */
// TODO render model detail component

import React from 'react'
import { List, Card } from 'antd';
import '../css/layout.css';
import { Button, Table, Icon, Divider } from 'antd';
import getWeb3 from './../utils/getWeb3';
import '../css/index.css'

class ModelDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            web3: null,
            instance: null,
            owner: null,
            modelName: null,
            price: null,
            ipfsHash: null,
            accuracy: null,
            data: null,
            childModels: null
        };



    }

    componentWillMount() {
        console.log("Model detail passed props", this.props);
        const {match: {params}} = this.props;
        console.log("Params", params, params.modelID);
        this.setState({params: params});

        getWeb3.then(results => {
            this.setState({
                web3: results.web3
            });

            var instance;
            results.web3.eth.getAccounts((error, accounts) => {
                instance = this.props.instance;
                console.log("Model detail instance", instance, accounts)
                this.setState({account: accounts[0]});
                return accounts[0];
            }).then((result) => {
                var map            = {};
                instance.get_model_all.call(params.modelID).then((result) => {
                    map["id"]          = result[0].c[0];
                    map["owner"]       = result[1];
                    map["name"]        = result[2];
                    map["accuracy"]    = result[3].c[0];
                    map["category"]    = result[4];
                    map["price"]       = result[5].c[0];
                    map["parent"]      = result[6].c[0];
                    map["genesis"]     = result[7];
                    map["ipfs"]        = result[8];
                    map["level"]       = result[9].c[0];
                    map["description"] = result[10];

                    this.setState({data:map});

                    console.log("Model detail Map", map);
                })
                return map;
            }).then((result)=>{
                instance.get_models_by_parent.call(params.modelID).then((result) =>{
                    console.log("Get children", result)
                })
                this.setState({childModels:result})
            }) // End of processing model data
        }) // End of get3 promise
    }



    downloadModel = (e) =>{
        console.log("Clicked on download model from IPFS")
    }


    render(){

        const columns = [{
            title: 'Model Attribute',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Values',
            dataIndex: 'value',
            key: 'value',
        }];
        console.log("Model detail render", this.state.data)
        console.log("Child models", this.state.childModels)
        var data;
        var name;
        if (!this.state.data){
            data = []
        }else{
            data = [{
                key: '1',
                name: 'Model owner',
                value: this.state.data['owner']
            }, {
                key: '2',
                name: 'Model name',
                value: this.state.data['name']
            }, {
                key: '3',
                name: 'Category',
                value: this.state.data['category']
            }, {
                key: '4',
                name: 'Accuracy',
                value: this.state.data['accuracy']
            }, {
                key: '5',
                name: 'Price',
                value: this.state.data['price']
            }, {
                key: '6',
                name: 'Parent Model',
                value: this.state.data['genesis'] === true
                    ?
                    <div><p>This model is a genesis model.</p>
                        <Button type="primary" disabled>Parent Model</Button>
                    </div>
                    :
                    <div>
                        <p>{this.state.data['parent']}</p>
                        <Button type="primary">Parent Model</Button>
                    </div>
            }, {
                key: '7',
                name: 'Child Models',
                value:
                    <div>
                        <p></p>
                        <Button type="primary">Child Models</Button>
                    </div>
            }, {
                key: '8',
                name: 'IPFS Hash Address',
                value:
                    <div>
                        <p>{this.state.data['ipfs']}</p>
                        <Button type="primary" icon="download" >Download From IPFS</Button>
                    </div>
            }, {
                key: '9',
                name: 'Is Genesis Model',
                value: this.state.data['genesis'].toString()
            }];

            name = this.state.data['name'];
        }


        console.log("Model detail", data)


        return(
            <div className="App">
                <h2>{name} Model Details</h2>
                <Table columns={columns} dataSource={data} className="Table" />
                <br/>
                <Button type="primary" icon="upload" > Improve this model </Button>
            </div>
        )
    }
}

export default ModelDetail