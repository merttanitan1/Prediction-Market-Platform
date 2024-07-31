import React, { useState } from "react";

import { MessageProvider } from "./mesagebox/MessageContext";
import MessagePopup from "./mesagebox/MessagePopup";
import WalletConnect from "./components/WalletConnect";
import CreatePrediction from "./components/CreatePrediction";
import BetPrediction from "./components/BetPrediction";
import ResolvePrediction from "./components/ResolvePrediction";
import ClaimReward from "./components/ClaimReward";
import "./App.css";

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const betAddress = "0xEf484E8055C2892801C06aCAfef5Fe3580E09147";

  return (
    <div className="App">
      {/* MessageProvider Mesaj kutularının görünmesi için en dış kısımda bulunmalı */}
      <MessageProvider> 
        <main>
          <WalletConnect setWalletAddress={setWalletAddress} />
          {walletAddress && (
            <div className="container">
              <div className="wallet-address-container">
                <p>Wallet Address</p>
                <p>{walletAddress}</p>
              </div>
              <div className="Predictions">
                <div>
                  <CreatePrediction betAddress={betAddress} />
                  <BetPrediction betAddress={betAddress} />
                </div>
                <div>
                  <ResolvePrediction betAddress={betAddress} />
                  <ClaimReward betAddress={betAddress} />
                </div>
              </div>
            </div>
          )}
          <MessagePopup />
        </main>
      </MessageProvider>
    </div>
  );
};
export default App;
