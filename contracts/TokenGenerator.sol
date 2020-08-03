pragma solidity >=0.4.21 <0.7.0;
import "./ERC20TokenTemplate.sol";

contract TokenGenerator {
    
    address[] public deployedTokensAddresses;
    address owner;
    
    constructor() public {
        owner = msg.sender;
    }
    
    function generateToken(string memory _name, string memory _symbol, uint256 _decimals, uint256 _supply, address payable tokenOwner ) public returns(address) {
        address newToken = address(new ERC20TokenTemplate(_name,_symbol,_decimals, _supply, tokenOwner));
        deployedTokensAddresses.push(newToken);
        tokenOwner.transfer(0.05 ether);
        return newToken;
    }

    function getAllAddresses() public view returns (address[] memory){
        return deployedTokensAddresses;
    }

    function addMoney() public payable returns(string memory) {
        require(msg.sender == owner, "Only owner is allowed!");
        return 'added';
    }
}