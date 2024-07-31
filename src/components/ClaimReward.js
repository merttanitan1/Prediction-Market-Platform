import React, { useState } from "react";
import { ethers } from "ethers";
import Bet from "../contracts/Bet.json";
import MetaMask from "../images/MetaMask.svg";
import { useMessage } from "../mesagebox/MessageContext";

const ClaimReward = ({ betAddress }) => {
  const [message, setMessage] = useState("");
  const [predictionId, setPredictionId] = useState("");
  const [loading, setLoading] = useState("");
  const { addMessage } = useMessage();

  const claimReward = async () => {
    if (!window.ethereum) {
      addMessage(
        "Danger",
        `Please download MetaMask to connect your wallet<br><a href="https://metamask.io/download/" target="_blank">Install Metamask<br/><img src="${MetaMask}" alt="MetaMask"/></a>`,
        10000
      );
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const bet = new ethers.Contract(betAddress, Bet.abi, signer);

      const tx = bet.claimReward(predictionId);
      await tx.wait();
    //   setMessage("Claim Reward Successful");
      addMessage("Success", "Claim Reward Successful", 10000);
      setPredictionId("");
    } catch (err) {
    //   setMessage("Claim Reward Error." + err.message);
      addMessage("Danger", `Claim Reward Error"${err.message}`, 10000);
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Claim Reward</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          claimReward();
        }}
      >
        <div>
          <label>Prediction Id:</label>
          <input type="text" value={predictionId} onChange={(e) => setPredictionId(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Claiming..." : "Claim Reward"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
export default ClaimReward;
