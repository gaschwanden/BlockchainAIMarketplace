pragma solidity ^0.4.22;

import './Model.sol';

contract MarketPlace {

    string[4]  Categories = [
        "Image Recognition",
        "Models for image recognition, such as categorizing animals",
        "Medical Diagnosis",
        "Models for disease diagnosis, such as cancer classification"];

    int category_count = 4;

    address owner;

    // Global data storage for models
    int public model_count;
    mapping (address => User) users;
    mapping (string => int[]) models_by_category;
    mapping (address => int[]) models_by_user;
    mapping (int => Model) models;
    mapping (int => int[]) models_by_contest;
    mapping (int => int[]) children_models;
    int[] indexes; // List of Model IDs for enumeration

    mapping (address => int[]) contestId;


    int public best_submission_index;
    int256 public best_submission_accuracy = 0;

    constructor() public{
      owner = msg.sender;

    }

    function set_default(int _num) public{
        category_count = _num;
        Categories[0] = "ImageData";
        Categories[1] = "MedicalData";
    }

    function get_count() public view returns(int){
        return category_count;
    }

    function get_category(int _id) public view returns(string){
        return Categories[uint(_id)];
    }

    function() public payable {}

    struct User {
      address user_address;
      int balance;
    }

    function create_model(
        string _name,
        int _parent,
        string _description,
        bytes _ipfs,
        int256 _accuracy,
        string _category,
        int _iterationLevel,
        int _price
    )
        public
        returns (bool)
    {
        // Calculate current model ID
        int id = model_count + 1;
        // Create new Model
        Model new_model = new Model(
            msg.sender, id, _name, _description, _ipfs, _parent, _accuracy,
            _category, _iterationLevel, _price
        );
        // Add new model to global variables
        models_by_user[msg.sender].push(id);
        models_by_category[_category].push(id);
        models[id] = new_model;
        indexes.push(id);
        model_count = model_count + 1;

        // Add current model to parent model's children
        if ( _parent != -1){
            children_models[_parent].push(id);
        }
        return true;
    }

    function set_accuracy(int _id, int256 _accuarcy) public {
        require(models_by_user[msg.sender].length != 0);
        models[_id].set_accuracy(msg.sender, _accuarcy);
        if (_accuarcy > best_submission_accuracy){
            best_submission_accuracy = _accuarcy;
            best_submission_index = _id;
        }
    }

    function get_models_by_category(string _category) public view returns (int[]){
      int[] storage model_list = models_by_category[_category];
      return model_list;
    }

    function get_model_desc(int _id) public view returns(string){
        return models[_id].get_name();
    }

    function get_model_accuracy(int _id) public view returns(int256){
        return models[_id].get_accuracy();
    }

    function get_model_by_id(int _id) public view returns(address){
        return models[_id];
    }

    function get_model_all(int _id) public view returns (
      int id_,
      address owner_,
      string name_,
      int256 accuracy_,
      string category_,
      int price_,
      int parent_,
      bool genesis_,
      bytes ipfs_,
      int iterationLevel_,
      string description_)
    {
      return models[_id].get_model_all();
    }

    function get_all_models_by_user(address _user) public view returns (int[]){
      int[] storage model_list = models_by_user[_user];
      return model_list;
    }

    function set_ipfshash( bytes _ipfs, int _id) public{
        models[_id].set_ipfs(msg.sender, _ipfs);
    }

    function get_model_count() public view returns(int){
        return model_count;
    }

    function get_models_by_parent(int _id) public view returns (int[]){
        return children_models[_id];
    }

    function append_child(int _parent, int _child) public returns (bool){
        models[_parent].append_child(_child);
        return true;
    }


    function get_iterationLevel(int _id) public view returns (int){
        return models[_id].get_iterationLevel();
    }

    // TODO send reward function

    // TODO contest functions


}
