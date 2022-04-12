import './App.css';
import {useState} from 'react';
import {ethers} from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import Token from './artifacts/contracts/Token.sol/Token.json'

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const tokenAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"

function App() {
  const [greeting, setGreetingValue] = useState('')
  const [userAccount, setUserAccount] = useState('')
  const [amount, setAmount] = useState('')

  //fetch wallet
  async function requestAccount(){
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  //know how many coins the connected wallet has
  async function getbalance(){
    //has wallet connected
    if (typeof window.ethereum !== 'undefined') {
      //request array of eth accounts
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
      //create provider
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      //create contract
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      //fetch balance
      const balance = await contract.balanceOf(account);
      //log it
      console.log(`${userAccount} Balance: `, balance.toString());
    }
  }

  async function sendCoins(){
    if (typeof window.ethereum !== 'undefined'){
      //get access to wallet
      await requestAccount()
      //create provider
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      //create signer
      const signer = provider.getSigner()
      //create contract
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer)
      //call transfer function and pass account and amount
      const transaction = await contract.transfer(userAccount,amount)
      //wait for the transfer to complete
      await transaction.wait()
      //log
      console.log(`${amount} Monies successfully transferred to ${userAccount}`)
    }
  }


  async function fetchGreeting(){
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      // const test = await provider.getCode("Greeter.sol")
      try {
        const data = await contract.greet()
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      } 
    }    
  }

  async function  setGreeting(){
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      setGreetingValue('')
      await transaction.wait()
      fetchGreeting()
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input 
          onChange={e => setGreetingValue(e.target.value)} 
          placeholder="Set greeting" 
          value={greeting}
          />

          <br />
          <button onClick={getbalance}>Get Balance</button>
          <button onClick={sendCoins}>Send Coins</button>
          <input 
            onChange={e => setUserAccount(e.target.value)} 
            placeholder="Account ID"
            />
          <input 
            onChange={e => setAmount(e.target.value)} 
            placeholder="Amount" 
            />
      </header>
    </div>
  );
}

export default App;
