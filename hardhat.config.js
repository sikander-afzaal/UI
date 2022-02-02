require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    artifacts: './src/artifacts',
  },
///Paste network
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/40fe31c43a4d4914a81b1ad071795532",
      accounts: ['0xa70e8043f31af4442fe304b900393b239fd91e51067aca55817b44887227fb1b']
    }
  },
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/40fe31c43a4d4914a81b1ad071795532", //My infura API Key 
      accounts: ['0xa70e8043f31af4442fe304b900393b239fd91e51067aca55817b44887227fb1b'] //My Metamask private key it should be secret 
    }
  },
  etherscan: {
    apiKey: "EBR3R86J2BBXEITDYGRBG5HTIVJ9BBYP9E" //My API key of etherscan it should be secret 
  }
};