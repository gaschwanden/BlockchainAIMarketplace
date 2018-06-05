/**
 * Created by machenhan on 2018/3/24.
 *
 * Truffle configuration, set to localhost and port number 8545
 * Make sure Metamask and Ganache have the same port number as this one
 */

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
