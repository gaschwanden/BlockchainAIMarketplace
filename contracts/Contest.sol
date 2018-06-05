/*
 * Contest contract
 * Has the same function with model contract
 * Each contest contract represents a contest
 * The method in this contract can be called using the contest contract address
 * e.g. address.get_count()
 *
 * @File instruction: constructor, variables, getter, setter
 * @Auther: Chenhan Ma, Kevin, kevinma2222@gmail.com
 */

pragma solidity ^0.4.22;

contract Contest {
    address owner;
    int id;
    string title;
    string category;
    string description;
    int winner_id;
    address[] organizer;
    int reward;
    string deadline;
    bool ended;


    constructor(
        int _id,
        string _title,
        string _category,
        string _description,
        int _winner_id,
        address[] _organizer,
        int _reward,
        string _deadline
    )
        public
    {
        owner       = msg.sender;
        id          = _id;
        title       = _title;
        category    = _category;
        description = _description;
        winner_id   = _winner_id;
        organizer   = _organizer;
        reward      = _reward;
        deadline    = _deadline;
    }


    function get_contest_all()
        public
        constant
        returns(
            address owner_,
            int id_,
            string title_,
            string category_,
            string description_,
            int winner_id_,
            address[] organizer_,
            int reward_,
            string deadline_
        )
    {
        return (
            owner,
            id,
            title,
            category,
            description,
            winner_id,
            organizer,
            reward,
            deadline
        );
    }


    function get_organizer() public view returns(address[]){
        return organizer;
    }


    function get_winner() public view returns(int){
        return winner_id;
    }


    // Only the owner of this contest can set the winner
    function set_winner(int _id, address _caller) public returns(bool){
        require(_caller==owner);
        winner_id = _id;
        return true;
    }

}
