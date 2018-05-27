/**
 * Created by machenhan on 2018/5/24.
 *
 * List of models of a user
 *
 */
import React from 'react'
import UploadModel from './upload_model.js'


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
        <UploadModel
            account={this.props.account}
            web3={this.props.web3}
            instance={this.props.instance}/>
      </div>
    )
  }
}

export default MyModels
