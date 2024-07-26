import React, { useState } from "react";
import { ethers } from "ethers";
import MetaMask from "../images/MetaMask.svg";

const WalletConnect = ({ setWalletAddress }) => {
  const [message, setMessage] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      // alert("Install Metamask");
      setMessage(`<a href='https://metamask.io/download/' target='_blank'>Install Metamask<br/><img src='${MetaMask}' alt='MetaMask' /></a>`);
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
    } catch (err) {
      console.error("Error connecting to the wallet", err);
      setMessage("Error connecting to the wallet");
    }
  };
  return (
    <div className="connect-container">
      <button className="connect-button" onClick={connectWallet}>
        Connect Wallet
      </button>
      {message && <p className="connect-message" dangerouslySetInnerHTML={{ __html: message }} />}
    </div>
  );
};
export default WalletConnect;
