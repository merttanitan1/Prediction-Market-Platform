import React, { useState } from "react";
import { ethers } from 'ethers';
import Bet from '../contracts/Bet.json';

const ResolvePrediction = ({betAddress}) => {
    const [message, setMessage] = useState("");
    const [predictionId, setPredictionId] = useState("");
    const [outcome, setOutcome] = useState(true);
    const [loading, setLoading] = useState(false);

    const resolvePrediction = async () => {
        if(!window.ethereum)
    };
};
export default ResolvePrediction