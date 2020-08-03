pragma solidity >=0.4.21 <0.7.0;

contract ERC20TokenTemplate {
    string public name;
    string public symbol;
    uint256 public decimals;

    uint256 public supply;
    address public founder;

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) allowed;

    
    event Transfer(address indexed from, address indexed to, uint256 tokens);
    event Approval(
        address indexed tokenOwner,
        address indexed spender,
        uint256 tokens
    );
    
    constructor(string memory _name, string memory _symbol, uint256 _decimals, uint256 _supply, address tokenOwner) public {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        supply = _supply * 10**_decimals;
        founder = tokenOwner;
        balances[founder] = supply;
    }

    function allowance(address tokenOwner, address spender)
        public
        view
        returns (uint256 remaining)
    {
        return allowed[tokenOwner][spender];
    }

    function approve(address spender, uint256 tokens)
        public
        returns (bool success)
    {
        require(balances[msg.sender] >= tokens);
        require(tokens > 0);
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }

    function transferFrom(address from, address to, uint256 tokens)
        public
        returns (bool success)
    {
        require(balances[from] >= tokens);
        balances[from] -= tokens;
        balances[to] += tokens;
        return true;
    }

    function totalSupply() public view returns (uint256) {
        return supply;
    }

    function balanceOf(address tokenOwner)
        public
        view
        returns (uint256 balance)
    {
        return balances[tokenOwner];
    }

    function transfer(address to, uint256 tokens)
        public
        returns (bool success)
    {
        require(tokens > 0, "token < 0 ");
        balances[to] += tokens;
        emit Transfer(msg.sender, to, tokens);
        return true;
    }
}