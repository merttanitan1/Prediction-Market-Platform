import React, { useState } from "react";
import Bet from '../contracts/Bet.json';
import { ethers } from 'ethers';

const CreatePrediction = ({betAddress}) => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(0);

    const createPrediction = async () => {
        if(!window.ethereum){
            alert("Please Install MetaMask!");
            setMessage("Please Install MetaMask!");
            return;
        }
        setLoading(true);
        try{
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const bet = new ethers.Contract(betAddress, Bet.abi, signer);

            const tx = await bet.createPrediction(description, duration);
            await tx.wait();
            setMessage("Prediction Created Successfully!");
            setDescription("");
            setDuration("");
        }catch(err){
            console.error("Create Prediction Error: ", err);
            setMessage("Create Prediction Error: " + err.message);
        }
        setLoading(false);
    };
    return(
        <div>
            <h2>Create Prediction</h2>
            <form onSubmit={(e) => {e.preventDefault(); createPrediction();}}>
                <div>
                    <label>Description: </label>
                    <input 
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Duration (in seconds): </label>
                    <input 
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
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