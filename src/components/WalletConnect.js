import React, { useState } from "react";
import { ethers } from "ethers";

const WalletConnect = ({ setWalletAddress }) => {
    const [message, setMessage] = useState("");

    const connectWallet = async () => {
        if(!window.ethereum){
            alert("Install Metamask");
            setMessage("Install Metamask");
            return;
        }try{
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setWalletAddress(address);
        }catch(err){
            console.error("Error connecting to the wallet", err);
            setMessage("Error connecting to the wallet");
        }
    };
    return(
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
            {message && <p>{message}</p>}
        </div>
    );
};
export default WalletConnect;