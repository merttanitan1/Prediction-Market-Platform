import React, { useState } from "react";
import { ethers } from 'ethers';
import Bet from '../contracts/Bet.json';

const ClaimReward = ({betAddress}) => {
    const [message, setMessage] = useState("");
    const [predictionId, setPredictionId] = useState("");
    const [loading, setLoading] = useState("");

    const claimReward = async () => {
        if(!window.ethereum){
            setMessage("Please Install Metamask");
            return;
        }

        setLoading(true);
        try{
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const bet = new ethers.Contract(betAddress, Bet.abi, signer);

            const tx = bet.claimReward(predictionId);
            await tx.wait();
            setMessage("Claim Reward Successful");
            setPredictionId("");
        }catch(err){
            setMessage("Claim Reward Error." + err.message);
            console.error(err);
        }
        setLoading(false);
    };

    return(
        <div>
            <h2>Claim Reward</h2>
            <form onSubmit={(e) => {e.preventDefault(); claimReward();}}>
                <div>
                    <label>Prediction Id:</label>
                    <input
                        type="text"
                        value={predictionId}
                        onChange={(e) => setPredictionId(e.target.value)}
                        required
                    />
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