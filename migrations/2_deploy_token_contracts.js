var SafeMath = artifacts.require("./SafeMath.sol");
var Token = artifacts.require("./Token.sol");


module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.deploy(Token);
};
