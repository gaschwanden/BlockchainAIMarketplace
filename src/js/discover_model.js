import React from 'react'
import { List, Card } from 'antd';
import '../css/layout.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ModelDetails from './model_detail.js';

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

    handleClick() {
        console.log("Clicked", this.state.web3, this.state.instance)

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


      console.log(category)
      return(
      <div>
          <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={data}
              renderItem={item => (
                  <Link to={`/models/${item.get("title")}`}>
                      <List.Item onClick={this.handleClick}
                                 className="ToClick"
                                 web3={this.state.web3}
                                 instance={this.state.instance}>
                          <Card title={item.get("title")}>{item.get("desc")}</Card>
                      </List.Item>
                  </Link>
              )}
          />
          <ModelDetails/>
      </div>
    )
  }
}

export default DiscoverModels
