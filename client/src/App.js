import React, { Component } from "react";
import TokenGenerator from "./contracts/TokenGenerator.json";
import getWeb3 from "./getWeb3";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

class App extends Component {
  state = { 
    deployedTokenAddressList: [], 
    web3: null, 
    accounts: null, 
    raghuAccounts:null,
    contract: null,
    name:'',
    symbol:'',
    decimals:0,
    address:'',
    message: '',
    msgColor:'black',
    totalSupply:0
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.user.eth.getAccounts();
      const raghuAccounts = process.env.ACCOUNT;;

      console.log(accounts);
      // console.log(raghuAccounts);

      // Get the contract instance.
      const networkId = await web3.raghu.eth.net.getId();
      console.log('id'+networkId);
      const deployedNetwork = TokenGenerator.networks[networkId];
      const instance = new (web3.raghu).eth.Contract(
        TokenGenerator.abi,
        deployedNetwork.address,
        {
          from: raghuAccounts,
          gasLimit: 3000000,
        }
      );

      console.log(instance.options.address);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, raghuAccounts,  contract: instance });
      const addressess = await this.state.contract.methods.getAllAddresses().call();
      this.setState({deployedTokenAddressList:addressess});
      console.log(this.state.deployedTokenAddressList);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  makeToken = async(event) => {
    console.log(this.state.name + this.state.symbol + this.state.decimals+ this.state.totalSupply);
    console.log(this.state.raghuAccounts + " " + this.state.accounts[0]);
    this.setState({message:'Generating new token...'});

    var encodedABI = this.state.contract.methods.generateToken((this.state.name), (this.state.symbol), (this.state.decimals),(this.state.totalSupply),(this.state.accounts[0])).encodeABI();
    console.log(encodedABI);
    // var nonce = (await this.state.web3.raghu.eth.getTransactionCount(this.state.raghuAccounts));
    // nonce += 16;
    // console.log(nonce);
    // console.log(this.state.contract.options.address);
    // var _nonce = nonce.toString(16);
    const tx = await this.state.web3.raghu.eth.accounts.signTransaction({
      // nonce:'0x' + _nonce,
      to: this.state.contract.options.address,
      gas: '2000000',
      // gasPrice: '60',
      data:encodedABI,
      chainId:4,
      chain:"rinkeby",
      hardfork:"petersburg"
    }, process.env.PVT_KEY);
    console.log(tx);
    console.log(await this.state.web3.raghu.eth.accounts.recoverTransaction(tx.rawTransaction));

    const resp = await this.state.web3.raghu.eth.sendSignedTransaction(tx.rawTransaction);
    console.log(resp);

    this.setState({message: 'Generated new token'});
    const addressess = await this.state.contract.methods.getAllAddresses().call();
    this.setState({deployedTokenAddressList:addressess});
    this.setState({address:this.state.deployedTokenAddressList[this.state.deployedTokenAddressList.length - 1]});
    this.setState({name:'', symbol:'', decimals:'', totalSupply:''})
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App" >
        <Image style={{width:"100%", height:100}}src={require('./assets/images/banner.jpg')} rounded />
        <div style={{width:500, height:500, margin:"0 auto", marginTop:"100"}}>
        <Form style={{paddingTop:50}} onSubmit={(event) => {
                                this.makeToken();
                                event.preventDefault();
          }}>
          <Form.Group controlId="tokenName">
            <Form.Label>Token Name</Form.Label>
            <Form.Control value={this.state.name} onChange={(event) => {this.setState({name:event.target.value}); console.log(this.state.name)}} type="text" placeholder="Enter Token Name" />
          </Form.Group>

          <Form.Group controlId="tokenSymbol">
            <Form.Label>Token Symbol</Form.Label>
            <Form.Control value={this.state.symbol} onChange={(event) => {this.setState({symbol:event.target.value})}} type="text" placeholder="Enter Token Symbol" />
          </Form.Group>

          <Form.Group controlId="tokenDecimals">
            <Form.Label>Decimal places</Form.Label>
            <Form.Control value={this.state.decimals} onChange={(event) => {this.setState({decimals:event.target.value})}} type="int" placeholder="Enter Decimal Places" />
          </Form.Group>

          <Form.Group controlId="totalSupply">
            <Form.Label>Total Supply</Form.Label>
            <Form.Control  value={this.state.totalSupply} onChange={(event) => {var temp = (event.target.value); this.setState({totalSupply:temp})}} type="int" placeholder="Enter Total Supply" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Generate Token
          </Button>
        </Form>

          <div>
        <p>The <span style={{color: this.state.name ? 'red' : 'black'}}> {this.state.name ? this.state.name : '<<Token-name>>'} </span> Token with symbol  <span style={{color: this.state.symbol ? 'red' : 'black'}}>{this.state.symbol ? this.state.symbol : '<<symbol>>'} </span> with <span style={{color: this.state.totalSupply ? 'red' : 'black'}}>{this.state.totalSupply ? this.state.totalSupply : '<<total supply>>'} </span> Tokens (total-supply/10^decimals) generated at address <span style={{color: this.state.address ? 'red' : 'black'}}> {this.state.address ? this.state.address : '<<address>>'} </span></p>
        <p style={{color:this.state.msgColor}}>Message: {this.state.message}</p>
          </div>
        </div>
       
    </div>
    );
  }
}

export default App;