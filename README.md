# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
# Steps how to run Minting Dapp:
1) Install dependencies
npm install

2) Clean all hardhat dependencies
npx hardhat clean

3) deploy the contract to the rinkeby test network 
npx hardhat run scripts/deploy.js --network rinkeby

4)copy the contract address from console:
Greeter deployed to: 0x5057Cd609f573379B219E9F0f4d88BFD07Fa1Ee4

5)paste the address in app.js
const address = "0x5057Cd609f573379B219E9F0f4d88BFD07Fa1Ee4";

5) run the app
npm start

6)connect your wallet if you want or no doesnt matter 



