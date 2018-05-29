/**
 * Created by machenhan on 2018/5/24.
 *
 * List of Models based on corresponding filters
 *
 */
import React from 'react'
import { List, Card } from 'antd';
import '../css/layout.css';
import { Button, Table, Icon, Divider } from 'antd';
import getWeb3 from './../utils/getWeb3';

class ModelList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            web3: null,
            instance: null,
            modelIdList: [], // List of Int, model ids
            modelList: [] // List of Model details
        };

        console.log("Model list instantiateContract");
        getWeb3.then(results => {
            this.setState({
                web3: results.web3
            });

            var instance;
            results.web3.eth.getAccounts((error, accounts) => {
                instance = this.state.instance;
                console.log("Model List instance", instance, accounts)
                this.setState({account: accounts[0]});
                return accounts[0];
            }).then((result) => {
                console.log(result[0]);
                return instance.get_all_model_by_user.call(result[0], {from: result[0]})
            }).then((result) => {

                console.log("User model list", result)
                var modelIdList = result;

                var modelList = [];
                for (var i = 0; i < modelIdList.length; i++) {
                    console.log(modelIdList[i]);
                    var index = 0;
                    instance.get_model_all.call(modelIdList[i].c[0]).then((result) => {
                        var map = {};
                        map["key"] = index + 1;
                        map["id"] = result[0].c[0];
                        map["owner"] = result[1];
                        map["name"] = result[2];
                        map["accuracy"] = result[3].c[0];
                        map["category"] = result[4];
                        map["price"] = result[5].c[0];
                        map["parent"] = result[6].c[0];
                        map["children"] = result[7];
                        map["genesis"] = result[8];
                        map["ipfs"] = result[9];
                        map["level"] = result[10].c[0];
                        index += 1;
                        modelList.push(map);
                        this.setState(previousState => ({
                            modelList: [...previousState.modelList, map]
                        }));
                        console.log("Model List Map", map);
                    })
                }
            }) // End of processing model data
        }) // End of get3 promise
    }// End of constructor

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps !== prevState) {
            return {
                web3: nextProps.web3,
                instance: nextProps.instance,
            };
        }
        return null;
    }


    onChange = (pagination, filters, sorter) => {
        console.log('params', pagination, filters, sorter);
    }


    render(){
        var data = this.state.modelList;

        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
        }, {
            title: 'Name',
            dataIndex: 'name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.name - b.name,
        }, {
            title: 'Owner',
            dataIndex: 'owner',
            sorter: (a, b) => a.owner - b.owner
        }, {
            title: 'Description',
            dataIndex: 'description',
            sorter: (a, b) => a.description - b.description
        }, {
            title: 'Category',
            dataIndex: 'category',
            sorter: (a, b) => a.category - b.category
        }, {
            title: 'Accuracy',
            dataIndex: 'accuracy',
            sorter: (a, b) => a.accuracy - b.accuracy
        }, {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price
        }];


        return(
            <div>
                <Table columns={columns} dataSource={data} onChange={this.onChange}/>
                { data === null
                    ? <Button> Click to upload a new model </Button>
                    : <div/>
                }
            </div>
        )
    }
}

export default ModelList
