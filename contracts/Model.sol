pragma solidity ^0.4.18;

contract Model {
  address owner;
  function Model() public {
    owner = msg.sender;
  }


  struct Node {
    uint id;
    string description;
    uint parent;
    uint[] children;
    bool genesis;
    int256 accurarcy;
    string category;
    uint level;
    uint count;
    uint childrenCount;
    int256 price;
  }

  address public organizer;
  uint public best_submission_index;
  int256 public best_submission_accuracy = 0;
  uint public modelCount;

  mapping (uint => Node) nodes;

  function get_totalModel() public view returns(uint count){
    return modelCount;
  }

  function insert_node(uint parent, uint node) public {
    nodes[node].parent = parent;
    nodes[parent].children.push(node);
    modelCount += 1;
    nodes[parent].childrenCount += 1;
  }

  function get_children(uint node) public view returns (uint[] child){
    return nodes[node].children;
  }

  function get_parent(uint node) public view returns (uint parent){
    return nodes[node].parent;
  }

  function get_Model(uint node) public constant returns(uint, string, int256, string, int256){
    Node memory node_ = nodes[node];
    return (node_.id, node_.description, node_.accurarcy, node_.category, node_.price);
  }
}
