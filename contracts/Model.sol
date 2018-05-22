pragma solidity ^0.4.18;

contract Model {
  address public owner;
  bytes public ipfs_address;
  uint public id;
  string public description;
  uint public parent;
  uint[] children;
  bool genesis;
  int256 public accuracy;
  bytes32 category;
  uint level;
  uint count;
  int256 public price;
  address factory;


  // Constructor
  constructor(
	  address _owner, uint _id, string _description, bytes _ipfs, uint _parent)
	  public {
	owner = _owner;
	factory = msg.sender;
	id = _id;
	description = _description;
	ipfs_address = _ipfs;
	parent = _parent;
  }

  modifier isOwner(address _caller) {
	  require(msg.sender == factory);
	  require(_caller == owner);
	  _;
  }

	function set_accuracy(address caller, int256 _accuracy) public isOwner(caller) {
	   accuracy  = _accuracy;
	}

  bytes32[] public categories;

  function append_child(uint _child) public{
	  children.push(_child);
  }

  function get_children() public view returns (uint[]){
	return children;
  }

  function get_parent() public view returns (uint){
	return parent;
  }

	function set_ipfs(address caller, bytes _ipfs) public isOwner(caller){
		ipfs_address = _ipfs;
	}

  function get_name() public view returns(string){
	  return description;
  }

  function get_Model() public constant returns(uint, string, int256, bytes32, int256){

	return (id, description, accuracy, category, price);
  }

}
