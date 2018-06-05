/*
 * Model contract
 * Each model contract represents a model
 * The method in this contract can be called using the model contract
 * e.g. address.get_count()
 *
 * @File instruction: constructor, variables, getter, setter
 * @Auther: Chenhan Ma, Kevin, kevinma2222@gmail.com
 */

pragma solidity ^0.4.22;

contract Model {
    address public owner;       // Model creator
    bytes public ipfs_address;  // IPFS storage address of current model
    int public id;              // Unique identifier of models
    string public name;         // Model name
    string public description;  // Model description
    int public parent;          // Parent model ID, 0 if current model is Genesis
    int[] public children;      // Deprecated List of subordinate model IDs
    bool public genesis;        // Boolean if genesis model
    int public accuracy;        // Float type model accuracy
    string public category;     // Model belonged category
    int public iterationLevel;  // Level of current model in its tree
    int public price;           // Model price set by the creator
    address public factory;     // Factory contract address


    // Constructor
    constructor(
        address _owner,
        int _id,
        string _name,
        string _description,
        bytes _ipfs,
        int _parent,
        int _accuracy,
        string _category,
        int _iterationLevel,
        int _price
    )
        public
    {
        owner          = _owner;
        factory        = msg.sender;
        id             = _id;
        name           = _name;
        description    = _description;
        ipfs_address   = _ipfs;
        parent         = _parent;
        accuracy       = _accuracy;
        category       = _category;
        iterationLevel = _iterationLevel;
        price          = _price;

        // Set parent and bool type genesis model
        if(int(_parent) == 0){
            genesis = true;
        }else{
            parent = _parent;
            genesis = false;
        }
    }


    /** Modifier
      * @param _caller caller of this method
      */
    modifier isOwner(address _caller) {
        require(msg.sender == factory);
        require(_caller == owner);
        _;
    }


    /** Get All Data of current model
      * returns a tuple of 11 elements
      * can be accessed using index
      */
    function get_model_all() public constant
    returns(
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
        string description_
    )
    {
        return (
        id,
        owner,
        name,
        accuracy,
        category,
        price,
        parent,
        genesis,
        ipfs_address,
        iterationLevel,
        description
        );
    }


    /** get model accuracy
      * @return model accuracy
      */
    function get_accuracy() public view returns(int){
        return accuracy;
    }


    /** Deprecated
      * Append child model to parent
      *
      */
    function append_child(int _child) public{
        children.push(_child);
    }


    /** Deprecated
      * Get model child list
      */
    function get_children() public view returns (int[]){
        return children;
    }


    /** Get the parent model id of current model
      * @return int parent id
      */
    function get_parent() public view returns (int){
        return parent;
    }


    /** Get model name
      * @return model name
      */
    function get_name() public view returns(string){
        return name;
    }


    /** Get model's level in the tree
      * @return model iteration level
      */
    function get_iterationLevel() public view returns (int) {
        return iterationLevel;
    }


    /** Get model if genesis or not
      * @return bool is genesis
      */
    function get_genesis() public view returns (bool){
        return genesis;
    }


    /** Set model ipfs address
      * @param caller caller address
      * @param _ipfs model new ipfs
      */
    function set_ipfs(address caller, bytes _ipfs) public isOwner(caller){
        ipfs_address = _ipfs;
    }


    /** Set model accuracy
      * @param caller category
      * @param _accuracy model accuracy
      */
    function set_accuracy(address caller, int _accuracy) public isOwner(caller) {
        accuracy  = _accuracy;
    }


    /** Delete current model
      * Not used for now
      */
    function kill() public {
        require(children.length==0);
        require(msg.sender == owner);
        selfdestruct(owner);
    }
}
