import React from 'react'
import ReactDOM from 'react-dom'
import { List, Card } from 'antd';

class DiscoverModels extends React.Component{




  render(){
      const data = [
          {
              title: 'Title 1',
          },
          {
              title: 'Title 2',
          },
          {
              title: 'Title 3',
          },
          {
              title: 'Title 4',
          },
      ];


      return(
      <div>
          <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={data}
              renderItem={item => (
                  <List.Item>
                      <Card title={item.title}>Card content</Card>
                  </List.Item>
              )}
          />
      </div>
    )
  }
}

export default DiscoverModels
