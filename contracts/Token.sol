pragma solidity ^0.8.4;

import "hardhat/console.sol"; 

contract Token {
    string public name = "Carmie Token";
    string public symbol = "CT";
    uint public totalSupply = 1000000;
    //mapping here means balances needs to be the address stored as a uint
    //this is like const balances = {address:int}
    mapping(address=>uint) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
    }

    function transfer(address to, uint amount) external {
        // check that sender has enough tokens
        require(balances[msg.sender] >= amount, "Insufficient Funds");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint) {
        return balances[account];
    }
}