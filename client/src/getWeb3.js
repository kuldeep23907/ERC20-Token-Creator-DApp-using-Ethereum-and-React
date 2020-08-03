import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      let web3, web3Raghu;
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          // resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // // Legacy dapp browsers...
      // else if (window.web3) {
      //   // Use Mist/MetaMask's provider.
      //   const web3 = window.web3;
      //   console.log("Injected web3 detected.");
      //   resolve(web3);
      // }
      // Fallback to localhost; use dev console port by default...
      
        // const provider = new HDWalletProvider(
        //  "abuse culture whale flight narrow panther garage sail crime snack custom you",
        //  "https://rinkeby.infura.io/v3/64c8dc6e626e4fe48c73666d6a1406a8"
        // )
        // web3Raghu = new Web3(provider);

        web3Raghu = new Web3(
          new Web3.providers.HttpProvider(
            "https://rinkeby.infura.io/v3/64c8dc6e626e4fe48c73666d6a1406a8"
          )
        )
        
        console.log("No web3 instance injected, using Local web3.");
        // resolve(web3Raghu);
        resolve({'user':web3, 'raghu':web3Raghu});
      
    });
  });

export default getWeb3;
