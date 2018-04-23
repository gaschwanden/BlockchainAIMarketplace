pragma solidity ^0.4.18;

import './Model.sol';

contract MarketPlace {

  string[] categories;
  address owner;
  Model model;

  function MarketPlace() public{
    owner = msg.sender;
  }

  function create_model_contract()
    public
    returns
    (address model_contract)
  {
    model = Model(msg.sender);
    return model;
  }

  function() public payable {}

  struct User {
    address user_address;
    bytes[] submitted_data;
    uint balance;

  }

  mapping (address => User) users;

  function kill() public{
    if(msg.sender==owner)
      selfdestruct(owner);
  }

  /* function upload() public{

  } */

  function get_model(uint id) public view
    returns(uint, bytes32, int256, bytes32, int256){
    return model.get_Model(id);
  }
}
