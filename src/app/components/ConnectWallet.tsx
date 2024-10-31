import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useSolanaWallet } from "../hooks/useSolanaWallet";

interface ConnectWalletProps {
  onEthereumConnect: (address: string) => void;
  onSolanaConnect: (address: string) => void;
}

export default function ConnectWallet({
  onEthereumConnect,
  onSolanaConnect,
}: ConnectWalletProps) {
  const [ethAddress, setEthAddress] = useState<string | null>(null);
  const { solanaAddress, WalletMultiButton } = useSolanaWallet();

  const connectEthereumWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      try {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setEthAddress(address);
        onEthereumConnect(address); // Pass the Ethereum address to the parent component
      } catch (error) {
        console.error("Ethereum wallet connection failed", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    if (solanaAddress) {
      onSolanaConnect(solanaAddress); // Pass the Solana address to the parent component
    }
  }, [solanaAddress, onSolanaConnect]);

  return (
    <div>
      <h2>Connect Wallet</h2>
      {ethAddress ? (
        <p>
          Ethereum Connected:{" "}
          {ethAddress.slice(0, 6) + "..." + ethAddress.slice(-4)}
        </p>
      ) : (
        <button onClick={connectEthereumWallet}>Connect Ethereum Wallet</button>
      )}
      {solanaAddress ? (
        <p>
          Solana Connected:{" "}
          {solanaAddress.slice(0, 6) + "..." + solanaAddress.slice(-4)}
        </p>
      ) : (
        <WalletMultiButton />
      )}
    </div>
  );
}
