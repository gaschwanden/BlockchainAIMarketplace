pragma solidity ^0.4.18;

import './Model.sol';

contract MarketPlace {

    string[] categories;
    address owner;

    uint public model_count;
    mapping (address => User) users;
    mapping (address => address[]) model_by_user;
    mapping (uint => Model) models;

    mapping (address => bytes[]) ipfs_by_address;
    mapping (address => uint[]) contestId;


    uint public best_submission_index;
    int256 public best_submission_accuracy = 0;

    constructor() public{
      owner = msg.sender;
    }

    function() public payable {}

    struct User {
      address user_address;
      uint balance;
    }

    function create_model(string _description, bytes _ipfs, uint _parent)
    public returns (bool)
    {
      uint id = model_count + 1;
      Model new_model =new Model(msg.sender, id, _description, _ipfs, _parent);
      model_by_user[msg.sender].push(new_model);
      models[id] = new_model;
      model_count = model_count + 1;
      return true;
    }

    function set_accuracy(uint id, int256 _accuarcy) public {
        require(model_by_user[msg.sender].length != 0);
        models[id].set_accuracy(msg.sender, _accuarcy);
    }


    function get_model_desc(uint _id) public view
    returns(string){
        return models[_id].get_name();
    }

    function get_model_by_id(uint _id) public view returns(address){
        return models[_id];
    }

    function get_all_model_by_user(address _user) public view returns (address[]){
      address[] storage model_list = model_by_user[_user];
      return model_list;
    }

    function set_ipfshash( bytes _ipfs, uint _id) public{
        models[_id].set_ipfs(msg.sender, _ipfs);
    }

    function get_model_count() public view returns(uint){
        return model_count;
    }
}
