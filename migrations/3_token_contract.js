var TokenGenerator = artifacts.require("./TokenGenerator.sol");

module.exports = function(deployer) {
  deployer.deploy(TokenGenerator);
};
