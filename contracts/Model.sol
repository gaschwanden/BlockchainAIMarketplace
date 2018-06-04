pragma solidity ^0.4.22;

contract Model {
    address public owner;       // Model creator
    bytes public ipfs_address;  // IPFS storage address of current model
    int public id;              // Unique identifier of models
    string public name;         // Model name
    string public description;  // Model description
    int public parent;          // Parent model ID, 0 if current model is Genesis
    int[] public children;      // List of subordinate model IDs
    bool public genesis;        // Boolean if genesis model
    int public accuracy;     // Float type model accuracy
    string public category;     // Model belonged category
    int public iterationLevel;  // Level of current model in its tree
    int public price;        // Model price set by the creator
    address public factory;


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



    modifier isOwner(address _caller) {
        require(msg.sender == factory);
        require(_caller == owner);
        _;
    }

    function set_accuracy(address caller, int _accuracy) public isOwner(caller) {
       accuracy  = _accuracy;
    }

    function get_accuracy() public view returns(int){
        return accuracy;
    }

    function append_child(int _child) public{
        children.push(_child);
    }

    function get_children() public view returns (int[]){
        return children;
    }

    function get_parent() public view returns (int){
        return parent;
    }

    function set_ipfs(address caller, bytes _ipfs) public isOwner(caller){
        ipfs_address = _ipfs;
    }

    function get_name() public view returns(string){
        return name;
    }

    function get_iterationLevel() public view returns (int) {
        return iterationLevel;
    }

    function get_genesis() public view returns (bool){
        return genesis;
    }

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

    function kill() public {
        require(children.length==0);
        require(msg.sender == owner);
        selfdestruct(owner);
    }
}
