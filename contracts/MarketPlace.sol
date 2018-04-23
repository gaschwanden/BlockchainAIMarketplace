pragma solidity ^0.4.18;

contract MarketPlace {


  /* Define variable owner of the type address */
  address owner;
  address[] models;
  /* This function is executed at initialization and sets the owner of the contract */
  function MarketPlace() public{
    owner = msg.sender;
  }

  struct User {
    address user_address;
    address[] submitted_data;
    uint balance;




  }

  mapping (address => User) users;

  function kill() public{
    if(msg.sender==owner)
      selfdestruct(owner);
  }

  function upload() public{

  }

  function getModel() public{

  }
}
