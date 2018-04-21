pragma solidity ^0.4.17;

contract Model {
  function Model() public {
  }


  struct Node {

    string Description;
    uint parent;
    uint[] children;
    bool genesis;
    int256 accurarcy;
    string category;
    uint level;
    uint count;
    uint childrenCount;
  }

  uint public modelCount;
  mapping (uint => Node) nodes;

  function insert_node(unit parent, Node node) {
    nodes[parent].children.push(node.)
    modelCount += 1;
    childrenCount += 1;
    
  }

  function get_children(unit node) returns (unit[] child){
    return nodes[node].children;
  }

  function get_parent(unit node) returns (unit parent){
    return nodes[node].parent;
  }

}
