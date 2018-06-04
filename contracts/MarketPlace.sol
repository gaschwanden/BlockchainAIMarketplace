/*
 * Main smart contract, logic entry
 * also is the factory contract for model contract
 * and contest contract
 *
 * @File instruction: constructor, variables, getter, setter
 * @Auther: Chenhan Ma, Kevin, kevinma2222@gmail.com
 */

pragma solidity ^0.4.22;

import './Model.sol';

contract MarketPlace {

    // Constructor
    constructor() public{
      creator = msg.sender;
    }


    // Payable method, will apply in the future
    function() public payable {}

    /** Built-in model categories
      * @type - string
      */
    string[4] Categories = [
        "Image Recognition",
        "Models for image recognition, such as categorizing animals",
        "Medical Diagnosis",
        "Models for disease diagnosis, such as cancer classification"];
    int category_count = 4;


    /** User struct
      * @params user_address and balance
      */
    struct User {
        address user_address;
        int balance;
    }


    // Global data storage for models
    address creator;
    int public model_count;                         // Model ID incrementor
    mapping (address => User) users;                // Users storage
    mapping (string => int[]) models_by_category;   // Models by category name
    mapping (address => int[]) models_by_user;      // Models owned by user
    mapping (int => Model) models;                  // Find model by ID
    mapping (int => int[]) models_by_contest;       // Models by contest id
    mapping (int => int[]) children_models;         // Child models by parent
    int[] indexes;                                  // Model ID storage list
    mapping (address => int[]) contests;            // Contest IDs by user
    int public best_submission_index;               // Best model index
    int public best_submission_accuracy = 0;        // Best model accuracy



    /************************ Getter Functions ******************************/

    /** Get the category_count value
      * @return int
      */
    function get_count() public view returns(int){
        return category_count;
    }

    /** Get the built-in category name and description
      * @return string
      */
    function get_category(int _id) public view returns(string){
        return Categories[uint(_id)];
    }



    /** Get model ID list by a category
      * @param _category category
      * @return int[] list of model ID
      */
    function get_models_by_category(string _category)
        public
        view
        returns (int[]){
        int[] storage model_list = models_by_category[_category];
        return model_list;
    }


    /** Get description of a model
      * @param _id model id
      * @return string model description
      */
    function get_model_desc(int _id) public view returns(string){
        return models[_id].get_name();
    }


    /** Get accuracy of a model
      * @param  _id model id
      * @return int model accuracy
      */
    function get_model_accuracy(int _id) public view returns(int){
        return models[_id].get_accuracy();
    }


    /** Get model contract address by model id
      * @param  _id model id
      * @return address model contract address
      */
    function get_model_by_id(int _id) public view returns(address){
        return models[_id];
    }


    /** Get all the info of a model
      * @param  _id model id
      * @return   int id_,
      *           address owner_,
      *           string name_,
      *           int accuracy_,
      *           string category_,
      *           int price_,
      *           int parent_,
      *           bool genesis_,
      *           bytes ipfs_,
      *           int iterationLevel_,
      *           string description_,
      */
    function get_model_all(int _id) public view returns (
        int id_,
        address owner_,
        string name_,
        int accuracy_,
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


    /** Get all model IDs created by a user
      * @param _user user address
      * @return int[] a ID list
      */
    function get_all_models_by_user(address _user)
        public
        view
        returns (int[]){
        int[] storage model_list = models_by_user[_user];
        return model_list;
    }


    /** get the current number of models in the marketplace
      * @return int number of models
      */
    function get_model_count() public view returns(int){
        return model_count;
    }

    /** Get the child models by a parent model's ID
      * @param _id parent model ID
      * @return int[] child models ID list
      */
    function get_models_by_parent(int _id) public view returns (int[]){
        return children_models[_id];
    }


    /** Get an iteration level of a model
      * @param _id model ID
      * @return int iteration level
      */
    function get_iterationLevel(int _id) public view returns (int){
        if (_id == 0){
            return 1;
        }
        return models[_id].get_iterationLevel();
    }


    /************************ Setter Functions ******************************/


    /** Create a new model contract
      * Store ID and contract address in global variables
      * Update model_count, which is ID incrementor
      * @return bool successful
      */
    function create_model(
        string _name,
        int _parent,
        string _description,
        bytes _ipfs,
        int _accuracy,
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
        if ( _parent != 0){
            children_models[_parent].push(id);
        }
        return true;
    }


    /** Set IPFS hash of a model
      * @param _id model id
      * @param _ipfs ipfs new_address
      */
    function set_ipfshash( bytes _ipfs, int _id) public{
        models[_id].set_ipfs(msg.sender, _ipfs);
    }


    /** Set the model's accuracy
      * @param _id model ID
      * @param _accuarcy accuracy
      */
    function set_accuracy(int _id, int _accuarcy) public {
        require(models_by_user[msg.sender].length != 0);
        models[_id].set_accuracy(msg.sender, _accuarcy);
        if (_accuarcy > best_submission_accuracy){
            best_submission_accuracy = _accuarcy;
            best_submission_index = _id;
        }
    }


    /** Save user detail into mapping when user login in
      * @param _account user_account
      * @return bool successful
      */
    function register_user(address _account) public returns (bool) {
        users[_account] = User(_account, 100);
        return true;
    }


    /** Add a child model ID to parent model's child model list
      * @param _parent  model ID
      * @param _child  model ID
      * @return bool successful
      */
    function append_child(int _parent, int _child) public returns (bool){
        models[_parent].append_child(_child);
        return true;
    }

    // TODO send reward function
    // TODO contest functions
}
