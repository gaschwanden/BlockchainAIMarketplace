pragma solidity ^0.4.18;

contract Contest {
  address owner;
  function Contest() public{
    owner = msg.sender;
  }

  struct Competition{
    uint id;
    bytes32 title;
    bytes32 category;
    bytes32 description;
    uint winner_id;
    uint[] models;
    address organizer;
    int256 reward;
    int256 deadline;
  }

  mapping (uint => Competition) competitions;
  uint[] public competition_ids;
  uint public competitionCount;

  function get_competitions()
    view public
    returns (uint[])
  {
      return competition_ids;
  }

  function get_competition_counts()
    view public
    returns (uint)
  {
    return competition_ids.length;
  }

  function get_competition_models(uint _id)
    view public
    returns(uint[])
  {
    return competitions[_id].models;
  }

  function get_competition_details(uint _id)
    view public
    returns (uint, bytes32, bytes32, address, int256)
    {
      Competition memory c = competitions[_id];
      return (c.id, c.title, c.category, c.organizer, c.reward);
    }

  /* function create_competition() */
}
