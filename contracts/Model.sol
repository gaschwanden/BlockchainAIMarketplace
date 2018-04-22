pragma solidity ^0.4.17;

contract Model {
  function Model() public {
    owner = msg.sender;
  }


  struct Node {
    unit id;
    string description;
    uint parent;
    uint[] children;
    bool genesis;
    int256 accurarcy;
    string category;
    uint level;
    uint count;
    uint childrenCount;
    int 256 price;
  }

  address public organizer;
  uint public best_submission_index;
  int256 public best_submission_accuracy = 0;
  uint public modelCount;

  mapping (uint => Node) nodes;

  function get_totalModel(){
    return modelCount;
  }

  function insert_node(uint parent, Node node) {
    nodes[parent].children.push(node)
    modelCount += 1;
    childrenCount += 1;
  }

  function get_children(uint node) public returns (uint[] child){
    return nodes[node].children;
  }

  function get_parent(uint node) public returns (uint parent){
    return nodes[node].parent;
  }

  function get_Model(uint node) public constant returns(uint, string, int256, string, int256){
    Node node_ = node;
    return (node_.id, node_.description, node_.accurarcy, node_.category, node_.price);
  }
}
