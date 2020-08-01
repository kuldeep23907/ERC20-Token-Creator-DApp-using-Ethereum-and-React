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
    contract: null,
    name:'',
    symbol:'',
    decimals:0,
    address:'',
    message: '',
    msgColor:'black'
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TokenGenerator.networks[networkId];
      const instance = new web3.eth.Contract(
        TokenGenerator.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
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
    console.log(this.state.name + this.state.symbol + this.state.decimals);
    this.setState({message:'Generating new token...'});
    const result = await this.state.contract.methods.generateToken(this.state.name, this.state.symbol, this.state.decimals).send({from: this.state.accounts[0]});
    console.log(result);
    this.setState({message: 'Generated new token'});
    const addressess = await this.state.contract.methods.getAllAddresses().call();
    this.setState({deployedTokenAddressList:addressess});
    this.setState({address:this.state.deployedTokenAddressList[this.state.deployedTokenAddressList.length - 1]});
    this.setState({name:'', symbol:'', decimals:''})
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

          <Button variant="primary" type="submit">
            Generate Token
          </Button>
        </Form>

          <div>
        <p>The <span style={{color: this.state.name ? 'red' : 'black'}}> {this.state.name ? this.state.name : '<<Token-name>>'} </span> Token with symbol  <span style={{color: this.state.symbol ? 'red' : 'black'}}>{this.state.symbol ? this.state.symbol : '<<symbol>>'} </span> generated at address <span style={{color: this.state.address ? 'red' : 'black'}}> {this.state.address ? this.state.address : '<<address>>'} </span></p>
        <p style={{color:this.state.msgColor}}>Message: {this.state.message}</p>
          </div>
        </div>
       
    </div>
    );
  }
}

export default App;
