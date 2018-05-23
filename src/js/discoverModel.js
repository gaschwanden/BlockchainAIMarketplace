import React from 'react'
import ReactDOM from 'react-dom'
import { List, Card } from 'antd';

class DiscoverModels extends React.Component{
    constructor(props){
        super(props)
        console.log("Category",this.props.data);

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log("Clicked")
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

      console.log("data", data[0].get("title"))

      return(
      <div>
          <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={data}
              renderItem={item => (
                  <List.Item onClick={this.handleClick}>
                      <Card title={item.get("title")}>{item.get("desc")}</Card>
                  </List.Item>
              )}
          />
      </div>
    )
  }
}

export default DiscoverModels
