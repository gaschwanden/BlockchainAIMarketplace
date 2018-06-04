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

        this.getModelData(this.props);

    }

    getModelData = (prop) => {
        console.log("Model detail passed props", prop);
        const {match: {params}} = prop;
        console.log("Params", params, params.modelID);
        this.setState({params: params});

        getWeb3.then(results => {
            this.setState({
                web3: results.web3
            });

            var instance;
            results.web3.eth.getAccounts((error, accounts) => {
                instance = prop.instance;
                console.log("Model detail instance", instance, accounts)
                this.setState({account: accounts[0]});
                return accounts[0];
            }).then((result) => {
                var map = {};
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
                });
                return map;
            }).then((result)=>{
                instance.get_models_by_parent.call(params.modelID).then((result) =>{
                    var array = [];
                    for( var i=0; i<result.length;i++){
                        let temp = result[i].c[0];
                        console.log("Get children", temp)

                        array.push(temp)
                    }
                    this.setState({childModels:array})

                })
            }) // End of processing model data
        }) // End of get3 promise
    };

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps);
        if (this.props !== nextProps) {
            console.log("Not  Sameeeeeeeeeeeeeeeeeeeeeeeeee")
            this.getModelData(nextProps);
        }
    }

    openParentModel = () => {
        console.log("Open parent")
        this.props.history.push({
            pathname: `/model/${this.state.data['parent']}`,
            state: {
                account: this.state.account,
                parent: this.state.data['parent'],
            }
        });
    };

    openChildModels = () =>{
        console.log("Open child")
        this.props.history.push({
            pathname: `/models/parent/${this.state.data['id']}`,
            state: {
                account: this.state.account,
            }
        });
    };

    onClickDownload = () =>{
        window.open(`https://gateway.ipfs.io/ipfs/${this.state.data['ipfs']}`)
    };

    uploadModel = () => {
        this.props.history.push({
            pathname: `/upload/${this.state.data['category']}/${this.state.data['id']}`,
            state: {
                account: this.state.account,
            }
        });
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

        var children = [];
        if (this.state.childModels){
            console.log("Child models", this.state.childModels)
            children = this.state.childModels
        }

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
                value: this.state.data['accuracy'] + "%"
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
                        <Button type="primary" onClick={this.openParentModel.bind(this)}>
                            Parent Model
                        </Button>
                    </div>
            }, {
                key: '7',
                name: 'Child Models',
                value: children.length === 0
                    ?
                    <div>
                        This model doesn't have child models.
                    </div>
                    :
                    <div>
                        <p>{children}</p>
                        <Button type="primary" onClick={this.openChildModels.bind(this)}>
                            Child Models
                        </Button>
                    </div>
            }, {
                key: '8',
                name: 'IPFS Hash Address',
                value:
                    <div>
                        <p>{this.state.data['ipfs']}</p>
                        <Button type="primary" icon="download" onClick={this.onClickDownload.bind(this)}>
                            Download From IPFS
                        </Button>
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
                <h2>{name} Model Details </h2>
                <Table columns={columns} dataSource={data} className="Table" />
                <br/>
                <Button type="primary" icon="upload" onClick={this.uploadModel.bind(this)} >
                    Improve this model
                </Button>
            </div>
        )
    }
}

export default ModelDetail