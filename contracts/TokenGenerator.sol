pragma solidity >=0.4.21 <0.7.0;
import "./ERC20TokenTemplate.sol";

contract TokenGenerator {
    
    address[] public deployedTokensAddresses;
    
    constructor() public {
        
    }
    
    function generateToken(string memory _name, string memory _symbol, uint256 _decimals ) public returns(address) {
        address newToken = address(new ERC20TokenTemplate(_name,_symbol,_decimals));
        deployedTokensAddresses.push(newToken);
        return newToken;
    }

    function getAllAddresses() public view returns (address[] memory){
        return deployedTokensAddresses;
    }
}