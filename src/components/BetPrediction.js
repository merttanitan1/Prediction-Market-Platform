import React, { useState } from "react";
import { ethers } from "ethers";
import Bet from "../contracts/Bet.json";
import MetaMask from "../images/MetaMask.svg";
import { useMessage } from "../mesagebox/MessageContext";

const BetPrediction = ({ betAddress }) => {
  const [predictionId, setPredictionId] = useState(0);
  const [betOnYes, setBetOnYes] = useState(true);
  const [betAmount, setBetAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { addMessage } = useMessage();

  const betPrediction = async () => {
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

      const tx = await bet.betPrediction(predictionId, betOnYes, { value: ethers.parseEther(betAmount) });
      await tx.wait();
    //   setMessage("Bet Placed Successfully!");
      addMessage("Success", "Bet Placed Successfully!", 10000);

    } catch (err) {
      console.log(err);
    //   setMessage("An error occurred", err.message);
      addMessage("Danger", `An error occurred"${err.message}`, 0);
    }
    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          betPrediction();
        }}
      >
        <div>
          <label>Id of Prediction</label>
          <input type="text" value={predictionId} onChange={(e) => setPredictionId(e.target.value)} required />
        </div>
        <div>
          <label>Amount (ETH): </label>
          <input type="text" value={betAmount} onChange={(e) => setBetAmount(e.target.value)} required />
        </div>
        <div>
          <label>Bet On Yes: </label>
          <input type="radio" value={true} checked={betOnYes === true} onChange={() => setBetOnYes(true)} />
        </div>
        <div>
          <label>Bet On No: </label>
          <input type="radio" value={false} checked={betOnYes === false} onChange={() => setBetOnYes(false)} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Betting..." : "Bet Prediction"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
export default BetPrediction;
