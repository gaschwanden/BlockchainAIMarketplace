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

class ModelDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            web3: null,
            instance: null,
            owner: null,
            modelName: null,
            price: null,
            ipfsHash: null,
            accuracy: null,

        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps !== prevState) {
            return {
                web3: nextProps.web3,
                instance: nextProps.instance,
            };
        }
        // Return null to indicate no change to state.
        return null;
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


        const data = [{
            key: '1',
            name: 'Model owner',
            value: this.props.owner
        }, {
            key: '2',
            name: 'Model name',
            value: this.props.modelName
        }, {
            key: '3',
            name: 'Category',
            value: this.props.category
        }, {
            key: '4',
            name: 'Accuracy',
            value: this.props.accuracy
        }, {
            key: '5',
            name: 'Price',
            value: this.props.price
        }, {
            key: '6',
            name: 'Parent Model',
            value: this.props.parent
        }, {
            key: '7',
            name: 'Child Models',
            value: this.props.child
        }, {
            key: '8',
            name: 'IPFS Hash Address',
            value: <Button type="primary" icon="download" >Download From IPFS</Button>
        }, {
            key: '9',
            name: 'Is Genesis Model',
            value: this.props.store
        }, {
            key: '10',
            name: 'Parent Model',
            value: this.props.store === true
                ? <div><Button type="primary" disabled>Parent Model</Button></div>
                : <div><Button type="primary">Parent Model</Button></div>
        }];


        return(
            <div>
                <Table columns={columns} dataSource={data} />
                <Button/>
            </div>
        )
    }
}

export default ModelDetail