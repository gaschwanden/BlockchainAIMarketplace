var Ipfs = artifacts.require('./Ipfs.sol')

module.exports = function(deployer) {
  deployer.deploy(Ipfs);
};
