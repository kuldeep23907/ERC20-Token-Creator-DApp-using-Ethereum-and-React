# ERC20-Token-Creator-DApp-using-Ethereum-and-React
A platform to create your own TOKEN with few clicks!!!

Youtube link for the demo: https://www.youtube.com/watch?v=KX519Rfi3mc&feature=youtu.be

## Add a .env in the root directory and /client directory

### Add these variables in .env file in root directory:

MNEMONIC=#mnemonic

API_KEY=# rinkeby api url

ACCOUNT=#owner's address

PVT_KEY=#owner's private key

### Add the following in your .env file of /client directory:

REACT_APP_MNEMONIC=#mnemonic

REACT_APP_API_KEY=#api key url

REACT_APP_ACCOUNT=#owner's account

REACT_APP_PVT_KEY=#owner's pvt key

Then from the root folder, do the following steps:

#### truffle compile --all
#### truffle migrate --reset --network rinkeby

after that, move to /client directory and run:

#### npm start

and you will see the following page:

![token-creator](https://user-images.githubusercontent.com/24249646/89321436-94560c00-d6a0-11ea-8f6a-5214d6904347.png)




