pragma solidity ^0.4.18;

contract Model {
  address owner;
  function Model() public {
    owner = msg.sender;
  }


  struct Node {
    bytes ipfs_address;
    uint id;
    bytes32 description;
    uint parent;
    uint[] children;
    bool genesis;
    int256 accuracy;
    bytes32 category;
    uint level;
    uint count;
    uint childrenCount;
    int256 price;
  }

  address public organizer;
  uint public best_submission_index;
  int256 public best_submission_accuracy = 0;
  uint public modelCount;
  bytes32[] public categories;

  mapping (uint => Node) nodes;
  mapping (bytes32 => uint[]) categoryModels;


  function get_model_from_category(bytes32 category)
    public
    returns (uint[] , int256[])
  {
    uint[] memory models = categoryModels[category];
    int256[] storage accuracies;

    for(uint i = 0; i<models.length; i++){
      accuracies.push(nodes[models[i]].accuracy);
    }
    return (models, accuracies);
  }


  function add_category(bytes32 new_category)
    public
    returns (bool)
  {
    require(check_category(new_category)==false);
    uint[] memory temp;
    categoryModels[new_category] = temp;
    categories.push(new_category);
    return true;
  }


  function check_category(bytes32 category)
    public view
    returns (bool exist)
  {
    for (uint i = 0; i < categories.length; i++){
      if(keccak256(categories[i]) == keccak256(category)){
        return false;
      }
    }
    return true;
  }

  // For now Solidity can't return variably-sized data
  /* function get_categories() public view returns (string[] categories){

  }  */

  function get_model_count() public view returns(uint count){
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

  function get_Model(uint node) public constant returns(uint, bytes32, int256, bytes32, int256){
    Node memory node_ = nodes[node];
    return (node_.id, node_.description, node_.accuracy, node_.category, node_.price);
  }
}
