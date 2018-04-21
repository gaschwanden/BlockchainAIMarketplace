var ProofOfExistence1 = artifacts.require("./ProofOfExistence1.sol");
var ProofOfExistence2 = artifacts.require("./ProofOfExistence2.sol");


module.exports = function(deployer) {
  deployer.deploy(ProofOfExistence1);
  deployer.deploy(ProofOfExistence2);
};
