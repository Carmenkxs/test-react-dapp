pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NDToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
       //mints a total of a total of 100,000 tokens, each with 18 decimal places 
       _mint(msg.sender, 100000 * (10 ** 18));
    }
}