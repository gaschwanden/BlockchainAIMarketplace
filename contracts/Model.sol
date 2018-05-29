pragma solidity ^0.4.22;

contract Model {
    address public owner;
    bytes public ipfs_address;
    int public id;
    string public name;
    string public description;
    int public parent;
    int[] children;
    bool genesis;
    int256 public accuracy;
    string category;
    int iterationLevel;
    int256 public price;
    address factory;


    // Constructor
    constructor(
        address _owner, int _id, string _name, bytes _ipfs, int _parent)
        public {
        owner = _owner;
        factory = msg.sender;
        id = _id;
        name = _name;
        ipfs_address = _ipfs;

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

    function set_accuracy(address caller, int256 _accuracy) public isOwner(caller) {
       accuracy  = _accuracy;
    }

    function get_accuracy() public view returns(int256){
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

    function get_model_all() public constant returns(
        int id_,
        address owner_,
        string name_,
        int256 accuracy_,
        string category_,
        int256 price_,
        int parent_,
        int[] children_,
        bool genesis_,
        bytes ipfs_,
        int iterationLevel_){

        return (id, owner, name, accuracy, category, price, parent, children, genesis, ipfs_address, iterationLevel);
    }

    function kill() public {
        require(children.length==0);
        require(msg.sender == owner);
        selfdestruct(owner);
    }
}
