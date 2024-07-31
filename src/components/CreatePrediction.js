import React, { useState } from "react";
import Bet from "../contracts/Bet.json";
import { ethers } from "ethers";
import MetaMask from "../images/MetaMask.svg";
import { useMessage } from "../mesagebox/MessageContext";

const CreatePrediction = ({ betAddress }) => {
  const { addMessage } = useMessage();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);

  const createPrediction = async () => {
    if (!window.ethereum) {
      // alert("Please Install MetaMask!");
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

      const tx = await bet.createPrediction(description, duration);
      await tx.wait();
      // setMessage("Prediction Created Successfully!");
      addMessage("Success", "Prediction resolved successfully", 10000);
      setDescription("");
      setDuration("");
    } catch (err) {
      console.error("Create Prediction Error: ", err);
      // setMessage("Create Prediction Error: " + err.message);
      addMessage("Danger", `Create Prediction Error: ${err.message}`, 10000);

    }
    setLoading(false);
  };
  return (
    <div>
      <h2>Create Prediction</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPrediction();
        }}
      >
        <div>
          <label>Description: </label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Duration (in seconds): </label>
          <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Prediction"}
        </button>
      </form>
      {message && <p className="message-popup warning">{message}</p>}
    </div>
  );
};
export default CreatePrediction;
