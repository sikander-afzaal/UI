import { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import Contract from "./artifacts/contracts/Billionaire.sol/Billionaire.json";
import "./App.css";

const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const tokens = require("./tokens.json");

const address = "0x80A18a709f2362A13B95E0384689D0E6049E498d";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    requestAccount();
  }, []);

  async function requestAccount() {
    if (typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

  async function mintPresale() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, Contract.abi, signer);

      let tab = [];
      tokens.map((token) => {
        tab.push(token.address);
      });

      const leaves = tab.map((v) => keccak256(v));
      const tree = new MerkleTree(leaves, keccak256, { sort: true });
      const leaf = keccak256(accounts[0]);
      const proof = tree.getHexProof(leaf);

      try {
        const cost = await contract.pricePresale();

        let overrides = {
          from: accounts[0],
          value: cost * amount,
        };

        const transaction = await contract.presaleMint(
          accounts[0],
          proof,
          amount,
          overrides
        );

        await transaction.wait();
      } catch (err) {
        console.log(err);
      }
    }
  }
  async function Salemint() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, Contract.abi, signer);
      try {
        const cost = await contract.priceSale();
        let overrides = {
          from: accounts[0],
          value: cost * amount,
        };
        const transaction = await contract.saleMint(
          BigNumber.from(amount),
          overrides
        );

        await transaction.wait();
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="App">
      <div class="snowflake">
        <i style={{ transform: "rotate(20deg)" }} class="fab fa-ethereum"></i>
      </div>
      <div class="snowflake">
        <i style={{ transform: "rotate(-20deg)" }} class="fab fa-ethereum"></i>
      </div>
      <div class="snowflake">
        <i style={{ transform: "rotate(8deg)" }} class="fab fa-ethereum"></i>
      </div>
      <div class="snowflake">
        <i style={{ transform: "rotate(0deg)" }} class="fab fa-ethereum"></i>
      </div>
      <div class="snowflake">
        <i style={{ transform: "rotate(-16deg)" }} class="fab fa-ethereum"></i>
      </div>
      <div class="snowflake">
        <i style={{ transform: "rotate(22deg)" }} class="fab fa-ethereum"></i>
      </div>
      <div class="snowflake">
        <i style={{ transform: "rotate(-10deg)" }} class="fab fa-ethereum"></i>
      </div>
      <div class="snowflake">
        <i style={{ transform: "rotate(20deg)" }} class="fab fa-ethereum"></i>
      </div>
      <div class="snowflake">
        <i style={{ transform: "rotate(-20deg)" }} class="fab fa-ethereum"></i>
      </div>
      <div class="snowflake">
        <i style={{ transform: "rotate(8deg)" }} class="fab fa-ethereum"></i>
      </div>
      <div class="snowflake">
        <i style={{ transform: "rotate(0deg)" }} class="fab fa-ethereum"></i>
      </div>

      <div className="childElement">
        <div className="top-child">
          {/* dummy text */}
          <p className="big">0/11</p>
          <p className="green-add">0x80A18a709f2362A1...</p>
          <p className="big-2">1 BE costs 0.05 ETH</p>
          <p className="small">Excluding gas fees</p>
          {/* ---------------- */}
        </div>
        <div className="bottom-child">
          <div className="change-div">
            <button
              onClick={() => {
                setAmount(amount + 1);
              }}
            >
              +
            </button>
            <p>{amount}</p>
            <button
              onClick={() => {
                if (amount <= 0) {
                  return;
                } else {
                  setAmount(amount - 1);
                }
              }}
            >
              -
            </button>
          </div>
          <div className="sale-div">
            <button onClick={mintPresale}>MINT Presale</button>
            <button onClick={Salemint}>MINT PublicSale</button>
          </div>

          <button onClick={requestAccount}>Connect</button>
        </div>
      </div>
    </div>
  );
}

export default App;
/**
 * const [price, setPrice] = useState();
 * async function getPrice() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(address, Contract.abi, provider);
      try {
        const cost = await contract.pricePresale();
        var data = String(cost);
        setPrice(data);
      }
      catch(err) {
        console.log(err);
      }
    }
  } */
