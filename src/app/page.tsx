"use client";

import NFTGallery from "./components/NFTGallery";
import ConnectWallet from "./components/ConnectWallet";
import { useState } from "react";

export default function Home() {
  const [ethAddress, setEthAddress] = useState<string | null>(null);
  const [solanaAddress, setSolanaAddress] = useState<string | null>(null);

  const handleEthereumConnected = (address: string) => setEthAddress(address);
  const handleSolanaConnected = (address: string) => setSolanaAddress(address);

  return (
    <div>
      <h1>Cross-Chain NFT Gallery</h1>
      <ConnectWallet
        onEthereumConnect={handleEthereumConnected}
        onSolanaConnect={handleSolanaConnected}
      />
      <NFTGallery ethAddress={ethAddress} solanaAddress={solanaAddress} />
    </div>
  );
}
