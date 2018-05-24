import React from 'react'
import Ipfs from './upload_ipfs.js'


class MyModels extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            web3: this.props.web3,
            instance: this.props.instance,
        }
    }

  render(){


    return(
      <div>
        <Ipfs web3={this.state.web3} instance={this.state.instance}/>
      </div>
    )
  }
}

export default MyModels
