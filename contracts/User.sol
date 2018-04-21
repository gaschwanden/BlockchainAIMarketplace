pragma solidity ^0.4.17;

contract User {


  /* Define variable owner of the type address */
  address owner;

  /* This function is executed at initialization and sets the owner of the contract */
  function User() {
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


}
