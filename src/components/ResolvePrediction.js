import React, { useState } from "react";
import { ethers } from "ethers";
import Bet from "../contracts/Bet.json";
import MetaMask from "../images/MetaMask.svg";
import { useMessage } from "../mesagebox/MessageContext";

const ResolvePrediction = ({ betAddress }) => {
  const [message, setMessage] = useState("");
  const [predictionId, setPredictionId] = useState("");
  const [outcome, setOutcome] = useState(true);
  const [loading, setLoading] = useState(false);
  const { addMessage } = useMessage();

  const resolvePrediction = async () => {
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

      const tx = await bet.resolvePrediction(predictionId, outcome);
      await tx.wait();
      addMessage("Success", "Prediction resolved successfully", 10000);
      setPredictionId("");
      setOutcome(true);
    } catch (err) {
      console.log(err);
      //   setMessage("An error occurred", err.message);
      addMessage("Danger", `An error occurred"${err.message}`, 0);
    }
    setLoading(false);
  };
  return (
    <div>
      <h2>Resolve Prediction (Only Admin)</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          resolvePrediction();
        }}
      >
        <div>
          <label>Prediction Id:</label>
          <input type="text" value={predictionId} onChange={(e) => setPredictionId(e.target.value)} required />
        </div>
        <h3>Outcome</h3>
        <div>
          <label>Outcome Yes:</label>
          <input type="radio" value={true} checked={outcome === true} onChange={() => setOutcome(true)} required />
        </div>
        <div>
          <label>Outcome No:</label>
          <input type="radio" value={false} checked={outcome === false} onChange={() => setOutcome(false)} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Resolving..." : "Resolve Prediction"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
export default ResolvePrediction;
