import React from 'react'
import { List, Card } from 'antd';
import '../css/layout.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ModelDetails from './model_detail.js';
import ModelList from "./model_list";

class DiscoverModels extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            category: this.props.data,
            web3: null,
            instance: null,
        }

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.web3 !== prevState.web3 || nextProps.instance !== prevState.instance) {
            return {
                web3: nextProps.web3,
                instance: nextProps.instance,
            };
        }
        // Return null to indicate no change to state.
        return null;
    }

    handleClick(e) {
        console.log("Clicked", e)

    }

  render(){
      var data = [];
      var category = this.props.data;
      for (var i= 0;i<category.length;i+=2){
          var temp = new Map();
          temp.set("title", category[i]);
          temp.set("desc", category[i+1]);
          data.push(temp)
      }

      return(
          <div>
              <List
                  grid={{ gutter: 18, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3}}
                  dataSource={data}
                  renderItem={item => (
                      <Link to={`/models/category/${item.get("title")}`}>
                          <List.Item onClick={this.handleClick}
                                     className="ToClick"
                                     web3={this.state.web3}
                                     instance={this.state.instance}
                                     account={this.props.account}>
                              <Card title={item.get("title")}>{item.get("desc")}</Card>
                          </List.Item>
                      </Link>
                  )}
              />
              {/*<ModelDetails/>*/}
          </div>
      )
  }
}

export default DiscoverModels
