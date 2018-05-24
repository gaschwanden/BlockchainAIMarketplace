import React from 'react'
import ReactDOM from 'react-dom'
import { List, Card } from 'antd';
import '../css/layout.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class DiscoverModels extends React.Component{
    constructor(props){
        super(props)
        console.log("Category",this.props.data);
        this.state = {
            category: this.props.data,
            web3: this.props.web3,
            instance: this.props.instance,
        }

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log("Clicked",this.id)
        history.push('/new-location')
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
      </div>
    )
  }
}

export default DiscoverModels
