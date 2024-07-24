import React, { useState } from "react";

import WalletConnect from "./components/WalletConnect";
import CreatePrediction from "./components/CreatePrediction";
import BetPrediction from "./components/BetPrediction";

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const betAddress = "0xEf484E8055C2892801C06aCAfef5Fe3580E09147";

  return(
    <div className="App">
      <header className="App-header">
        <WalletConnect setWalletAddress={setWalletAddress}/>
        {walletAddress && <p>Wallet Address: {walletAddress}</p>}
        {walletAddress && <CreatePrediction betAddress={betAddress}/>}
        {walletAddress && <BetPrediction betAddress={betAddress}/>}
      </header>
    </div>
  );
};
export default App;