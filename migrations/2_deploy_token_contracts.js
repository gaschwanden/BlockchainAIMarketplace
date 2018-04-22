var Math = artifacts.require("./Math.sol");
var Token = artifacts.require("./Token.sol");


module.exports = function(deployer) {
  deployer.deploy(Math);
  deployer.deploy(Token);
};
