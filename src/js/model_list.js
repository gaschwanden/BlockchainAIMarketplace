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
import {withRouter} from 'react-router-dom';
import '../css/index.css'

class ModelList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            web3: null,
            instance: null,
            modelIdList: [], // List of Int, model ids
            modelList: [], // List of Model details
            account: null,
            params: null,
            data: null,
        };

        this.getModelList(this.props)

    }// End of constructor

    getModelList = (prop) => {
        const { match: { params } } = prop;
        console.log("Params", params);
        this.setState({params: params});

        getWeb3.then(results => {
            this.setState({
                web3: results.web3
            });

            var instance;
            results.web3.eth.getAccounts((error, accounts) => {
                instance = prop.instance;
                console.log("Model List instance", instance, accounts)
                this.setState({account: accounts[0]});
                return accounts[0];
            }).then((result) => {
                console.log("Model list account", result)
                if (params.param==="user"){
                    console.log("User")
                    return instance.get_all_models_by_user.call(result[0], {from: result[0]})
                }else if (params.param==="category"){
                    console.log("category")

                    return instance.get_models_by_category.call(params.paramKey, {from: result[0]})
                }else{
                    console.log("parent")

                    return instance.get_models_by_parent.call(parseInt(params.paramKey), {from: result[0]})
                }
            }).then((result)=>{

                console.log("User model list", result)
                var modelIdList = result

                for (var i = 0; i < modelIdList.length; i++) {
                    console.log(modelIdList[i],modelIdList[i].c);
                    var index = 0;
                    instance.get_model_all.call(modelIdList[i].c[0]).then((result) => {
                        var map            = {};
                        map["key"]         = index + 1;
                        map["id"]          = result[0].c[0];
                        map["owner"]       = result[1];
                        map["name"]        = result[2];
                        map["accuracy"]    = result[3].c[0] + "%";
                        map["category"]    = result[4];
                        map["price"]       = result[5].c[0];
                        map["parent"]      = result[6].c[0];
                        map["genesis"]     = result[7];
                        map["ipfs"]        = result[8];
                        map["level"]       = result[9].c[0];
                        map["description"] = result[10];
                        index += 1;

                        this.setState(previousState => ({
                            modelList: [...previousState.modelList, map]
                        }));

                        console.log("Model List Map", map);
                    })
                }
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


    onChange = (pagination, filters, sorter) => {
        console.log('params', pagination, filters, sorter);
    };


    onClickButton = () =>{
        const { match: { params } } = this.props;
        this.props.history.push({
            pathname: `/upload/${params.paramKey}/0`,
            state: {
                account: this.props.account,
            }
        });
    };

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
            sorter: (a, b) => parseFloat(a.accuracy) - parseFloat(b.accuracy)
        }, {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price
        }];


        // TODO click on row direct
        return(
            <div className="App">
                {
                    this.props.match.params.param === "user" &&
                        <h2>
                            Models created by {this.props.match.params.paramKey}
                        </h2>
                }
                {
                    this.props.match.params.param === "category" &&
                    <h2>
                        Models of category {this.props.match.params.paramKey}
                    </h2>
                }
                {
                    this.props.match.params.param === "parent" &&
                    <h2>
                        Children Models of {this.props.match.params.paramKey}
                    </h2>
                }
                <Table
                    className='Table'
                    columns={columns}
                    dataSource={data}
                    onChange={this.onChange}
                    onRow={(record) => {
                        const data = record;
                        return {
                            onClick: () =>{
                                console.log("Clicked on row", data, data['id']);
                                this.props.history.push({
                                    pathname: `/model/${data['id']}`,
                                    state: {
                                        account: this.state.account,
                                        parent: -1,
                                    }
                                });
                            }
                        };
                    }}
                />
                { this.props.match.params.param === "category" &&
                    <div>
                        <Divider/>
                        <Button type="primary" icon="upload" style={{textAlign: 'center'}} onClick={this.onClickButton.bind(this)} >
                            Click to upload a new genesis model
                        </Button>
                    </div>

                }




            </div>
        )
    }
}

export default ModelList
